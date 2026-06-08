# AGENTS.md — Loakim Integrated Services Website

> Agent-focused reference for the Loakim Integrated Services React website. Read this first before making changes.

---

## Project Overview

A premium, SEO-optimized marketing website for **Loakim Integrated Services**, a brand growth consultancy based in Lagos, Nigeria. The site is a single-page-application (SPA) built with React 18, TypeScript, and Vite. It features a dark luxury aesthetic with gold accents, scroll-reveal animations, and a Supabase-powered backend for services, case studies, consultations, and authentication.

**Key characteristics:**
- 6 public pages inside a shared layout (Home, Services, Results, About, Consult)
- 4 auth pages outside the shared layout (Login, Register, Forgot Password, Reset Password)
- Fully static frontend — all dynamic data comes from Supabase
- No test suite is currently configured

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3.4 + custom `index.css` layers |
| Routing | React Router DOM 6 |
| Animation | Framer Motion + custom `ScrollReveal` (IntersectionObserver) |
| Icons | Lucide React |
| SEO | React Helmet Async |
| Backend | Supabase (PostgreSQL, Auth, Row Level Security) |
| Font | Inter (Google Fonts, loaded in `index.html`) |

---

## Project Structure

```
loakim-website/
├── public/
│   └── favicon.svg
├── scripts/
│   └── preflight.sh           # Pre-deployment health checks
├── src/
│   ├── components/
│   │   ├── SEO.tsx            # Helmet wrapper for meta tags
│   │   ├── ScrollReveal.tsx   # IntersectionObserver reveal wrapper
│   │   ├── Navbar.tsx         # Fixed header + mobile menu
│   │   ├── Footer.tsx         # Footer with live Lagos clock
│   │   └── Layout.tsx         # Main layout (Navbar + Outlet + Footer)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Results.tsx
│   │   ├── About.tsx
│   │   ├── Consult.tsx        # Multi-step form
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   ├── lib/
│   │   ├── utils.ts           # cn(), getLagosTime(), formatCurrency()
│   │   ├── supabase.ts        # Supabase client + TypeScript types
│   │   └── api/
│   │       ├── services-api.ts
│   │       ├── consultations-api.ts
│   │       └── auth-api.ts
│   ├── App.tsx                # Route definitions
│   ├── main.tsx               # Entry point (React, Router, HelmetProvider)
│   └── index.css              # Tailwind directives + custom styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── supabase-schema.sql        # Full DDL, RLS policies, seed data
├── .env.example
└── .gitignore
```

### Path Alias

Vite and TypeScript are both configured with `@/` pointing to `./src/`. Always use `@/components/...`, `@/lib/...`, etc. for imports.

---

## Build, Dev & Preview

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (usually `http://localhost:5173`) |
| `npm run build` | Type-check with `tsc` then build to `dist/` |
| `npm run preview` | Preview the production build locally |

There is **no test runner** configured. Do not add test commands to `package.json` unless explicitly asked.

### Pre-Flight Check

Run `bash scripts/preflight.sh` before deploying. It verifies:
1. TypeScript compiles (`tsc --noEmit`)
2. Vite build succeeds
3. `.env` file exists
4. `node_modules` exists

---

## Environment Variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon/public API key |
| `VITE_SITE_URL` | No | Public site URL (used in SEO fallbacks) |

**Important:** Only variables prefixed with `VITE_` are exposed to the client at build time. Never put secrets in `.env` without the `VITE_` prefix if the client needs them, and never commit `.env` to git.

---

## Code Style Guidelines

### Components
- Use **functional components** with default exports.
- Props interfaces are defined inline in the same file (e.g., `interface SEOProps { ... }`).
- Use the `SEO` component on every page for meta tags.
- Wrap section content in `ScrollReveal` for consistent scroll animations.

### Naming & File Conventions
- Components are PascalCase: `Navbar.tsx`, `ScrollReveal.tsx`.
- Utilities/API files are camelCase: `services-api.ts`, `utils.ts`.
- Pages live in `src/pages/` and share the same PascalCase naming.

### Styling
- Tailwind utility classes are the primary styling method.
- Custom reusable classes are defined in `src/index.css` under `@layer components`:
  - `.section-label`, `.heading-xl`, `.heading-lg`, `.heading-md`, `.body-lg`, `.body-md`, `.card-hover`, `.gold-gradient`, `.text-gradient-gold`
- Custom animation delays: `.animate-delay-100` through `.animate-delay-500`.
- The brand color palette is defined in `tailwind.config.js` under `theme.extend.colors.loakim`. Always prefer `text-loakim-gold` over hardcoded hex values.

### TypeScript
- `strict: true` is enabled.
- `noUnusedLocals` and `noUnusedParameters` are enabled — unused variables will fail the build.
- `moduleResolution: bundler` with `allowImportingTsExtensions: true`.
- No `.d.ts` declaration files are emitted (`noEmit: true`).

### API Patterns
- Supabase queries live in `src/lib/api/`.
- Each API function `throw`s on error (no silent failures).
- Types are imported from `src/lib/supabase.ts` rather than redefined.

---

## Supabase Integration

### Client Setup
The Supabase client is created in `src/lib/supabase.ts` using `createClient` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Database Schema
Run `supabase-schema.sql` in the Supabase SQL Editor to create:
- `services` — CMS-managed offerings (public read)
- `case_studies` — Portfolio items (public read)
- `consultations` — Form submissions (public insert, auth read)
- `site_content` — Editable page sections (public read)
- `profiles` — Extended user data (public read, own update)

### Row Level Security (RLS)
All tables have RLS enabled. Public tables allow anonymous read. Consultations allow anonymous insert but require authentication to read. Profiles allow public read but only self-updates.

### Auth Flow
- Sign up → `auth-api.ts signUp()`
- Sign in → `auth-api.ts signIn()`
- Forgot password → `auth-api.ts resetPassword()` (redirects to `/reset-password`)
- Update password → `auth-api.ts updatePassword()`

Configure Supabase Auth redirect URLs in the Supabase Dashboard:
- Site URL: `https://your-domain.com`
- Additional redirect: `https://your-domain.com/reset-password`

---

## SEO Requirements

Every page **must** include the `<SEO />` component with at minimum:
- `title`
- `description`

Optional props: `keywords`, `ogImage`, `ogUrl`.

The `SEO` component automatically appends `| Loakim Integrated Services` to the title and injects Open Graph + Twitter Card tags.

---

## Deployment

### Build Output
Vite builds to the `dist/` directory. This is a static site — no Node.js server is required.

### Recommended Platforms
- **Vercel**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the dashboard.
- **Netlify**: Same environment variables, deploy `dist/` after `npm run build`.

### Post-Deploy Checklist
1. Run `supabase-schema.sql` in Supabase SQL Editor if this is a fresh project.
2. Verify RLS policies are active.
3. Confirm seed data loaded (`services`, `case_studies`, `site_content`).
4. Test auth flows end-to-end.
5. Submit a test consultation from `/consult` and verify the row appears.

---

## Security Considerations

- **Never** commit `.env` to version control.
- The Supabase `anon` key is safe to expose in the frontend — RLS policies enforce access control, not the key itself.
- All tables must have RLS enabled in production. Double-check after schema changes.
- The reset-password flow relies on the browser origin (`window.location.origin`). Ensure `VITE_SITE_URL` matches the actual deployed domain.

---

## Common Gotchas

- **Missing `.env`**: The dev server will start, but Supabase calls will fail at runtime with `undefined` URL/key errors.
- **Unused imports/variables**: TypeScript will error on build because `noUnusedLocals` is `true`.
- **Path aliases**: Do not use relative paths like `../../components/...` when `@/components/...` works.
- **No test runner**: There is no Jest, Vitest, or Playwright configured. If adding tests, install the runner and update `package.json` scripts.
- **ScrollReveal**: Uses inline styles + `IntersectionObserver`. Do not use Framer Motion inside `ScrollReveal` for the same element — choose one animation approach per element.
- **Consult form**: The `/consult` page is a multi-step form. State is local to the page component; there is no global form state library.

---

## License

Proprietary — Loakim Integrated Services. All rights reserved.
