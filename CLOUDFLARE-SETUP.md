# Cloudflare Setup Guide — Complete Checklist

You need **two** Cloudflare products for this stack:
1. **Cloudflare Pages** — hosts the React frontend
2. **Cloudflare Workers** — runs the API backend

Both are free for your traffic volume.

---

## Step 1: Create Cloudflare Account

- [ ] Go to [cloudflare.com](https://cloudflare.com) and sign up (free)
- [ ] Verify your email

---

## Step 2: Set Up Neon Database

Before deploying the API, you need the database ready.

### 2.1 Create Neon Project
- [ ] Go to [neon.tech](https://neon.tech) → Sign up → Create project
- [ ] Choose region: `US East (N. Virginia)` or closest to Lagos
- [ ] Save the **connection string** — it looks like:
  ```
  postgresql://user:password@host.neon.tech/dbname?sslmode=require
  ```

### 2.2 Run the Schema
- [ ] Open Neon **SQL Editor**
- [ ] Copy the entire contents of `neon-schema.sql` (in this repo)
- [ ] Paste and run
- [ ] Verify tables were created:
  ```sql
  SELECT tablename FROM pg_tables WHERE schemaname = 'public';
  ```
  Should show: `services`, `case_studies`, `consultations`, `site_content`, `profiles`

### 2.3 Verify Seed Data
```sql
SELECT COUNT(*) FROM services;        -- should be 13
SELECT COUNT(*) FROM case_studies;    -- should be 4
SELECT COUNT(*) FROM site_content;    -- should be 3
```

---

## Step 3: Deploy the API Worker

### 3.1 Install Worker Dependencies
```bash
cd api
pnpm install
```

### 3.2 Set the Database Secret
```bash
npx wrangler secret put DATABASE_URL
# Paste your Neon connection string when prompted
```

### 3.3 Deploy
```bash
npx wrangler deploy
```

You will get a URL like:
```
https://loakim-api.your-account.workers.dev
```

Save this URL — you need it for the frontend.

### 3.4 Test the API
```bash
curl https://loakim-api.your-account.workers.dev/services
```
Should return the 13 services from Neon.

---

## Step 4: Deploy the Frontend (Cloudflare Pages)

### Option A: Git Integration (Recommended)

1. [ ] In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. [ ] Select the `loakim-website` GitHub repository
3. [ ] Configure build:
   | Setting | Value |
   |---------|-------|
   | Framework preset | `None` (or Vite) |
   | Build command | `pnpm install && pnpm run build` |
   | Build output directory | `dist` |
4. [ ] Add **Environment Variables** (under Settings during setup):
   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://loakim-api.your-account.workers.dev` |
   | `VITE_SITE_URL` | `https://loakim.pages.dev` (or your custom domain) |
5. [ ] Click **Save and Deploy**

### Option B: Wrangler Direct Deploy
```bash
# From project root
npx wrangler pages deploy dist --project-name=loakim-website
```

---

## Step 5: Add a Custom Domain (Optional)

1. [ ] In Cloudflare Dashboard → your Pages project → **Custom domains**
2. [ ] Click **Set up a custom domain**
3. [ ] Enter your domain (e.g., `loakim.com`)
4. [ ] Cloudflare will automatically configure DNS
5. [ ] Update `VITE_SITE_URL` env var to your custom domain
6. [ ] Redeploy

---

## Step 6: Update GitHub with API URL

After your Worker is deployed, update the frontend so it knows where the API lives:

```bash
# In project root
echo "VITE_API_URL=https://loakim-api.your-account.workers.dev" > .env
git add .env.example
git commit -m "docs: add deployed API URL"
git push
```

> ⚠️ **Never commit `.env`** — only `.env.example` goes to GitHub. The real values live in Cloudflare Dashboard.

---

## What You Pay For

| Service | Free Tier | Your Usage |
|---------|-----------|------------|
| **Cloudflare Pages** | Unlimited requests, 500 builds/mo | ✅ Free |
| **Cloudflare Workers** | 100,000 requests/day | ✅ Free |
| **Neon** | 500 MB storage, 190 compute hours/mo | ✅ Free |
| **Clerk** (future auth) | 10,000 MAU | ✅ Free |

**Total cost: $0/month** until you scale beyond these limits.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails with "Cannot find module" | Make sure `pnpm-lock.yaml` is committed to Git |
| API returns 500 | Check Worker logs: `npx wrangler tail` |
| API can't connect to Neon | Verify `DATABASE_URL` secret is set correctly |
| Pages shows blank page | Check `dist/_redirects` exists; SPA routing must be configured |
| CORS errors in browser | Update CORS origin in `api/src/index.ts` to match your Pages URL |
| Environment variables not working | Must prefix client vars with `VITE_`; secrets only in Workers |

---

## Architecture After Setup

```
User Browser
    │
    ▼
┌─────────────────────┐
│  Cloudflare Pages   │  ← React SPA (static, edge-cached)
│  (loakim.pages.dev) │
└─────────────────────┘
    │ fetch()
    ▼
┌─────────────────────┐
│  Cloudflare Workers │  ← Hono API (edge compute)
│  (loakim-api.…)     │
└─────────────────────┘
    │ SQL over TLS
    ▼
┌─────────────────────┐
│  Neon Postgres      │  ← Serverless database
│  (neon.tech)        │
└─────────────────────┘
```

---

## Next After This Setup

1. **Wire Clerk auth** — replace stubbed auth pages with real `<SignIn />`, `<SignUp />`
2. **Protect API routes** — add Clerk JWT verification to `/consultations` GET
3. **Add Cloudflare R2** — if you need file uploads (avatars, case study images)
4. **Analytics** — add Cloudflare Web Analytics (free, no JS snippet needed)
