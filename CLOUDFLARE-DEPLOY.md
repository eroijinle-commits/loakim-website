# Cloudflare Pages Deployment Guide

## Option 1: Deploy via Wrangler CLI (Fastest)

### Prerequisites
- Cloudflare account (free at [cloudflare.com](https://cloudflare.com))
- Wrangler CLI installed (`pnpm add -D wrangler`)

### Steps

1. **Authenticate with Cloudflare:**
   ```bash
   pnpm wrangler login
   ```
   This opens a browser window to authorize Wrangler.

2. **Deploy the `dist/` folder:**
   ```bash
   pnpm wrangler pages deploy dist --project-name=loakim-website
   ```

3. **Set environment variables** in the Cloudflare Dashboard:
   - Go to **Workers & Pages** → Select your project → **Settings** → **Environment Variables**
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
     - `VITE_SITE_URL` = your deployed Cloudflare Pages URL

4. **Configure SPA routing** — already done via `public/_redirects`:
   ```
   /* /index.html 200
   ```
   This ensures React Router handles all client-side routes.

---

## Option 2: Deploy via Git Integration (Recommended for CI/CD)

### Steps

1. **Push this repo to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare Pages deploy"
   git push origin main
   ```

2. **In Cloudflare Dashboard:**
   - Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Select your GitHub repository
   - Configure build settings:
     - **Framework preset:** None (or Vite)
     - **Build command:** `pnpm run build`
     - **Build output directory:** `dist`
   - Click **Save and Deploy**

3. **Set environment variables** in Cloudflare Dashboard under project Settings.

4. **Add custom domain** (optional):
   - Go to project **Custom domains** tab
   - Add your domain and follow DNS instructions

---

## Post-Deploy Verification

- [ ] Homepage loads at `https://your-project.pages.dev`
- [ ] All routes work (`/services`, `/results`, `/about`, `/consult`)
- [ ] Auth pages accessible (`/login`, `/register`)
- [ ] SEO meta tags render correctly (check with [metatags.io](https://metatags.io))
- [ ] Mobile responsive test
- [ ] Supabase connection working (if real credentials provided)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on page refresh | `public/_redirects` must be in `dist/` after build |
| Environment variables not working | Prefix with `VITE_` only for client; secrets need Workers |
| Build fails | Run `pnpm run build` locally first to verify |
| Slow initial load | Enable Cloudflare caching rules in Dashboard |
