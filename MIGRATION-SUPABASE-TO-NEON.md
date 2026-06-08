# Supabase → Neon Migration Checklist

## Overview

Migrating from **Supabase** to **Neon** on Cloudflare Pages requires replacing Supabase's all-in-one platform with specialized services:

| Supabase Feature | Replacement |
|-----------------|-------------|
| PostgreSQL Database | **Neon** (serverless Postgres) |
| Auth (Users, Sessions, OAuth) | **Clerk** (recommended) or **Lucia + Neon** |
| Auto REST API (PostgREST) | **Cloudflare Workers** + **Hono** (custom API) |
| Row Level Security (RLS) | **Application-level authorization** in Workers |
| Storage | **Cloudflare R2** (if needed later) |
| Edge Functions | **Cloudflare Workers** |
| Realtime | **Not needed** for this static site |

---

## Phase 1: Neon Database Setup

### 1.1 Create Neon Project
- [ ] Sign up at [neon.tech](https://neon.tech)
- [ ] Create new project → choose region closest to your users (e.g., `us-east-1`)
- [ ] Save the connection string (DSN):
  ```
  postgresql://user:password@host.neon.tech/dbname?sslmode=require
  ```
- [ ] Save the **unpooled** connection string for migrations
- [ ] Save the **pooled** connection string for application use

### 1.2 Schema Migration

- [ ] **Remove Supabase-specific dependencies** from `supabase-schema.sql`:
  ```sql
  -- REMOVE this entire block (Supabase Auth-specific):
  CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    ...
  );

  -- REMOVE this trigger (Supabase Auth-specific):
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'client');
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  ```

- [ ] **Adapt the profiles table** for Clerk (add `clerk_user_id`):
  ```sql
  CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_user_id text UNIQUE NOT NULL,  -- Clerk's user ID
    full_name text,
    company_name text,
    role text DEFAULT 'client',
    avatar_url text,
    phone text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
  ```

- [ ] **Keep all other tables unchanged** (`services`, `case_studies`, `consultations`, `site_content`)
- [ ] **Remove RLS policies** (Neon doesn't have RLS — auth moves to application layer):
  ```sql
  -- Run in Neon SQL Editor:
  -- Don't include ALTER TABLE ... ENABLE ROW LEVEL SECURITY;
  -- Don't include CREATE POLICY ... statements
  ```

- [ ] **Run adapted schema** in Neon SQL Editor
- [ ] **Migrate seed data** from Supabase to Neon (copy INSERT statements)

### 1.3 Data Migration (if production data exists)
- [ ] Use `pg_dump` from Supabase:
  ```bash
  pg_dump \
    --host=your-project.supabase.co \
    --port=5432 \
    --username=postgres \
    --dbname=postgres \
    --data-only \
    --no-privileges \
    --no-owner \
    --table=services \
    --table=case_studies \
    --table=consultations \
    --table=site_content \
    > data_dump.sql
  ```
- [ ] Import into Neon:
  ```bash
  psql "your-neon-connection-string" < data_dump.sql
  ```

---

## Phase 2: Auth Migration (Supabase Auth → Clerk)

### Why Clerk?
- Drop-in React SDK with hooks (`useAuth`, `useUser`)
- Handles OAuth, email/password, magic links, MFA
- JWT session management
- Built-in UI components (`<SignIn />`, `<SignUp />`, `<UserButton />`)

### 2.1 Clerk Setup
- [ ] Sign up at [clerk.com](https://clerk.com)
- [ ] Create application → choose "React"
- [ ] Copy **Publishable Key** and **Secret Key**
- [ ] Configure redirect URLs:
  - `http://localhost:5173` (dev)
  - `https://your-cloudflare-domain.pages.dev` (prod)
  - `https://your-custom-domain.com` (custom)

### 2.2 Install Clerk
```bash
pnpm remove @supabase/supabase-js
pnpm add @clerk/clerk-react
```

### 2.3 Frontend Auth Changes

#### Replace `src/lib/supabase.ts` types
Keep the TypeScript types (they're DB-agnostic), but remove Supabase client:
```ts
// src/lib/supabase.ts → src/lib/types.ts
export type Service = { ... }
export type CaseStudy = { ... }
export type Consultation = { ... }
export type SiteContent = { ... }
export type Profile = { ... }
```

#### Replace `src/lib/api/auth-api.ts`
```ts
// src/lib/api/auth-api.ts
import { useAuth, useUser } from '@clerk/clerk-react'

// Clerk replaces all these — use hooks in components instead:
// signUp() → <SignUp /> component or useSignUp() hook
// signIn() → <SignIn /> component or useSignIn() hook
// signOut() → useAuth().signOut()
// getCurrentUser() → useUser()
// getSession() → useAuth().getToken()
```

#### Update `src/main.tsx` — Wrap with ClerkProvider
```tsx
import { ClerkProvider } from '@clerk/clerk-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
```

#### Update Auth Pages
| File | Change |
|------|--------|
| `src/pages/Login.tsx` | Replace form with `<SignIn routing="path" path="/login" />` |
| `src/pages/Register.tsx` | Replace form with `<SignUp routing="path" path="/register" />` |
| `src/pages/ForgotPassword.tsx` | Use `<SignIn routing="path" path="/login">` with forgot password link |
| `src/pages/ResetPassword.tsx` | Use Clerk's `<SignIn>` with reset password flow |
| `src/components/Navbar.tsx` | Replace "Login/Get Started" with `<UserButton />` + conditional |

#### Add `src/components/AuthGuard.tsx` (optional)
```tsx
import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <Navigate to="/login" />
  return <>{children}</>
}
```

---

## Phase 3: API Layer (Supabase Client → Cloudflare Workers)

### 3.1 Why Workers + Hono?
- **Cloudflare Workers** run at the edge (fast globally)
- **Hono** is a lightweight, fast web framework for Workers
- **Neon serverless driver** connects directly from Workers to Neon
- Replaces Supabase's auto-generated REST API + RLS with explicit, type-safe endpoints

### 3.2 Create API Worker

```bash
# In project root or separate repo
mkdir api && cd api
pnpm init
pnpm add hono @neondatabase/serverless jose  # jose for JWT verification
```

Create `api/src/index.ts`:
```ts
import { Hono } from 'hono'
import { Client } from '@neondatabase/serverless'

const app = new Hono()

// Middleware: attach DB client
app.use('*', async (c, next) => {
  const client = new Client(c.env.DATABASE_URL)
  await client.connect()
  c.set('db', client)
  await next()
  await client.end()
})

// Public routes
app.get('/services', async (c) => {
  const db = c.get('db')
  const result = await db.query(
    'SELECT * FROM services WHERE is_active = true ORDER BY order_index'
  )
  return c.json(result.rows)
})

app.get('/case-studies', async (c) => {
  const db = c.get('db')
  const result = await db.query(
    'SELECT * FROM case_studies WHERE is_active = true ORDER BY display_order'
  )
  return c.json(result.rows)
})

app.get('/site-content/:key', async (c) => {
  const db = c.get('db')
  const key = c.param('key')
  const result = await db.query(
    'SELECT * FROM site_content WHERE section_key = $1',
    [key]
  )
  return c.json(result.rows[0] || null)
})

// Public: submit consultation (no auth required)
app.post('/consultations', async (c) => {
  const db = c.get('db')
  const body = await c.req.json()
  const result = await db.query(
    `INSERT INTO consultations 
     (full_name, email, phone, company_name, selected_services, budget_range, timeline, project_details, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')
     RETURNING *`,
    [body.full_name, body.email, body.phone, body.company_name,
     body.selected_services, body.budget_range, body.timeline, body.project_details]
  )
  return c.json(result.rows[0])
})

// Protected: list consultations (Clerk JWT verification)
app.get('/consultations', async (c) => {
  // Verify Clerk session token
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  // Verify JWT with Clerk's JWKS endpoint...

  const db = c.get('db')
  const result = await db.query(
    'SELECT * FROM consultations ORDER BY created_at DESC'
  )
  return c.json(result.rows)
})

export default app
```

### 3.3 Deploy API Worker
```bash
cd api
# Create wrangler.toml
npx wrangler deploy
```

Save the Worker URL (e.g., `https://api.loakim.workers.dev`)

---

## Phase 4: Frontend API Client Replacement

### 4.1 Create New API Client

Replace `src/lib/api/services-api.ts`:
```ts
const API_BASE = import.meta.env.VITE_API_URL // e.g., https://api.loakim.workers.dev

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_BASE}/services`)
  if (!res.ok) throw new Error('Failed to fetch services')
  return res.json()
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetch(`${API_BASE}/case-studies`)
  if (!res.ok) throw new Error('Failed to fetch case studies')
  return res.json()
}

export async function getSiteContent(sectionKey: string): Promise<SiteContent | null> {
  const res = await fetch(`${API_BASE}/site-content/${sectionKey}`)
  if (!res.ok) throw new Error('Failed to fetch site content')
  return res.json()
}
```

Replace `src/lib/api/consultations-api.ts`:
```ts
const API_BASE = import.meta.env.VITE_API_URL

export async function submitConsultation(input: ConsultationInput): Promise<Consultation> {
  const res = await fetch(`${API_BASE}/consultations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Failed to submit consultation')
  return res.json()
}
```

### 4.2 Update Pages to Use New APIs
- [ ] `src/pages/Home.tsx` — Replace static data with `getSiteContent('hero')`, `getCaseStudies()`
- [ ] `src/pages/Services.tsx` — Replace static data with `getServices()`
- [ ] `src/pages/Results.tsx` — Replace static data with `getCaseStudies()`
- [ ] `src/pages/Consult.tsx` — Wire `submitConsultation()` to actual API call

---

## Phase 5: Environment Variables

### Update `.env`
```env
# Remove Supabase
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=

# Add Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Add API URL (Cloudflare Workers)
VITE_API_URL=https://api.loakim.workers.dev

# Site URL
VITE_SITE_URL=https://loakim.pages.dev
```

### Cloudflare Pages Environment Variables
Set these in Cloudflare Dashboard → Workers & Pages → Project → Settings → Environment Variables:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL`
- `VITE_SITE_URL`

### Cloudflare Worker Secrets
Set these via Wrangler for the API Worker:
```bash
npx wrangler secret put DATABASE_URL
# Paste your Neon pooled connection string
```

---

## Phase 6: File-by-File Changes Summary

| File | Action | Effort |
|------|--------|--------|
| `package.json` | Remove `@supabase/supabase-js`, add `@clerk/clerk-react` | Low |
| `.env` / `.env.example` | Replace Supabase vars with Clerk + API URL | Low |
| `src/vite-env.d.ts` | Update env type definitions | Low |
| `src/main.tsx` | Add `<ClerkProvider>` wrapper | Low |
| `src/lib/supabase.ts` | Remove Supabase client, keep types only | Low |
| `src/lib/api/auth-api.ts` | **Delete** — Clerk handles auth via hooks | Low |
| `src/lib/api/services-api.ts` | Replace with `fetch()` calls to Workers | Medium |
| `src/lib/api/consultations-api.ts` | Replace with `fetch()` calls to Workers | Medium |
| `src/components/Navbar.tsx` | Add `<UserButton />`, conditional auth links | Medium |
| `src/pages/Login.tsx` | Replace with `<SignIn />` component | Low |
| `src/pages/Register.tsx` | Replace with `<SignUp />` component | Low |
| `src/pages/ForgotPassword.tsx` | Use Clerk's built-in flow | Low |
| `src/pages/ResetPassword.tsx` | Use Clerk's built-in flow | Low |
| `src/pages/Home.tsx` | Wire to API for dynamic content | Medium |
| `src/pages/Services.tsx` | Wire to API for dynamic content | Medium |
| `src/pages/Results.tsx` | Wire to API for dynamic content | Medium |
| `src/pages/Consult.tsx` | Wire form submission to API | Medium |
| *(new)* `api/src/index.ts` | Create Hono API on Workers | Medium |
| *(new)* `api/wrangler.toml` | Worker deployment config | Low |

---

## Phase 7: Testing Checklist

### Local Development
- [ ] `pnpm install` succeeds with new dependencies
- [ ] `pnpm run dev` starts without errors
- [ ] Homepage loads with dynamic content from API
- [ ] Services page loads from API
- [ ] Results/Case Studies page loads from API
- [ ] Consult form submits successfully
- [ ] Clerk sign-up flow works
- [ ] Clerk sign-in flow works
- [ ] Clerk sign-out works
- [ ] Navbar shows user avatar when logged in
- [ ] All routes work (`/services`, `/results`, `/about`, `/consult`)

### Production (Cloudflare)
- [ ] Cloudflare Pages builds successfully
- [ ] Cloudflare Worker deploys successfully
- [ ] Neon database connection works from Worker
- [ ] All pages load on custom domain
- [ ] SPA routing works (deep links, page refresh)
- [ ] Auth flows work on production domain
- [ ] Consult form submits and data appears in Neon
- [ ] SEO meta tags render correctly
- [ ] Mobile responsive across devices

---

## Phase 8: Cleanup

- [ ] Delete `supabase-schema.sql` (or archive it)
- [ ] Remove Supabase project (after confirming migration)
- [ ] Update `README.md` with new architecture
- [ ] Update `AGENTS.md` with new stack info
- [ ] Update deployment docs (`CLOUDFLARE-DEPLOY.md`)

---

## Estimated Timeline

| Phase | Effort |
|-------|--------|
| Phase 1: Neon DB Setup | 2–3 hours |
| Phase 2: Clerk Auth | 3–4 hours |
| Phase 3: API Worker | 4–6 hours |
| Phase 4: Frontend API | 3–4 hours |
| Phase 5: Env & Config | 1 hour |
| Phase 6: Testing & Debug | 3–4 hours |
| **Total** | **16–22 hours** |

---

## Alternative: Keep Supabase Auth, Migrate Only DB

If you want to minimize auth changes:
- Keep **Supabase Auth** for authentication
- Move **database** to Neon
- Use Supabase Auth JWT to authenticate API requests to Workers
- Workers verify the JWT and query Neon

This hybrid approach reduces auth migration effort but keeps a Supabase dependency.
