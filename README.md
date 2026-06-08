# Loakim Integrated Services

A sophisticated, elegant, SEO-optimized website for **Loakim Integrated Services** — a premium brand growth consultancy based in Lagos, Nigeria.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui patterns + Supabase**.

---

## Features

- **6 Public Pages**: Home, Services, Results, About, Consult, Auth (Login/Register/Forgot/Reset)
- **Full SEO Optimization**: React Helmet Async with meta tags, Open Graph, Twitter Cards, canonical URLs
- **Premium Dark Theme**: Near-black palette with gold accents, inspired by luxury consultancy aesthetics
- **Scroll Animations**: IntersectionObserver-based reveal animations on all sections
- **Responsive Design**: Mobile-first, fully responsive across all breakpoints
- **Multi-Step Consult Form**: 3-step service selector with validation
- **Live Lagos Clock**: Real-time WAT timezone display in footer
- **Supabase Backend Ready**: Complete schema, RLS policies, seed data, and API layer
- **Auth System**: Login, Register, Forgot Password, Reset Password (Supabase Auth ready)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| SEO | React Helmet Async |

---

## Project Structure

```
loakim-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── SEO.tsx              # Meta tag management
│   │   ├── ScrollReveal.tsx     # IntersectionObserver animations
│   │   ├── Navbar.tsx           # Fixed header with mobile menu
│   │   ├── Footer.tsx           # Footer with live Lagos clock
│   │   └── Layout.tsx           # Main layout wrapper
│   ├── pages/
│   │   ├── Home.tsx             # Hero, pillars, stats, why us, CTA
│   │   ├── Services.tsx         # 4 service pillars + engagement models
│   │   ├── Results.tsx          # 4 case studies with metrics
│   │   ├── About.tsx            # Mission, vision, differentiators, sectors
│   │   ├── Consult.tsx          # 3-step multi-step form
│   │   ├── Login.tsx            # Auth login page
│   │   ├── Register.tsx         # Auth registration page
│   │   ├── ForgotPassword.tsx   # Password reset request
│   │   └── ResetPassword.tsx    # New password form
│   ├── lib/
│   │   ├── utils.ts             # Utility functions (cn, getLagosTime)
│   │   ├── supabase.ts          # Supabase client + TypeScript types
│   │   └── api/
│   │       ├── services-api.ts  # Services, case studies, content APIs
│   │       ├── consultations-api.ts # Form submission APIs
│   │       └── auth-api.ts      # Auth operations
│   ├── App.tsx                  # Route definitions
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tailwind directives + custom styles
├── index.html                   # HTML entry with Inter font
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── supabase-schema.sql          # Complete database schema + seed data
├── .env.example
└── .gitignore
```

---

## Quick Start

### 1. Install Dependencies

```bash
cd loakim-website
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Open the SQL Editor
3. Copy the entire contents of `supabase-schema.sql`
4. Run the SQL — this creates all tables, RLS policies, triggers, and seed data

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

---

## Database Schema

### Tables

| Table | Purpose | Access |
|-------|---------|--------|
| `services` | CMS-managed service offerings | Public read |
| `case_studies` | Portfolio / results items | Public read |
| `consultations` | Form submissions from /consult | Public insert, Auth read |
| `site_content` | Editable section content | Public read |
| `profiles` | Extended user data | Public read, Own update |

### RLS Policies

All tables have Row Level Security enabled with appropriate policies:
- **Public tables** (services, case_studies, site_content): Read-only for everyone
- **Consultations**: Anyone can submit, authenticated users can read
- **Profiles**: Public read, users can only update their own profile

### Seed Data Included

- 13 service entries across 4 categories
- 4 featured case studies with verified metrics
- 3 site content sections (hero, stats, CTA)

---

## SEO Implementation

Every page uses the `SEO` component with:
- Dynamic `<title>` and `<meta name="description">`
- `<meta name="keywords">` for search indexing
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags (`twitter:title`, `twitter:description`, `twitter:image`)
- Canonical URL (`<link rel="canonical">`)
- Author and robots meta tags

### Page SEO Targets

| Page | Primary Keywords |
|------|-----------------|
| Home | brand strategy, retail marketing, digital marketing, event management, brand consultancy Nigeria |
| Services | brand strategy Nigeria, retail marketing, digital marketing Lagos, SEO, social media management |
| Results | marketing results Nigeria, brand growth case study, retail marketing ROI, FMCG conversion |
| About | about Loakim, Temitope Oladapo, brand consultancy Nigeria, Lagos marketing agency |
| Consult | brand diagnostic Nigeria, free marketing consultation Lagos, brand strategy assessment |

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Netlify

```bash
# Build first
npm run build

# Deploy dist folder
netlify deploy --prod --dir=dist
```

### Supabase Auth Redirect URLs

Configure in Supabase Dashboard > Authentication > URL Configuration:
- **Site URL**: `https://your-domain.com`
- **Redirect URLs**: `https://your-domain.com/reset-password`

---

## Customization Guide

### Changing Brand Colors

Edit `tailwind.config.js`:

```js
colors: {
  loakim: {
    black: '#0a0a0a',      // Main background
    dark: '#111111',        // Section backgrounds
    charcoal: '#1a1a1a',    // Card backgrounds
    gray: '#737373',        // Secondary text
    lightgray: '#a3a3a3',   // Body text
    white: '#ffffff',       // Primary text
    gold: '#c9a96e',        // Primary accent
    goldlight: '#d4b87a',   // Hover accent
    border: '#262626',      // Borders
  }
}
```

### Adding New Services

Insert into Supabase `services` table or add to the static data in `Services.tsx`.

### Adding New Case Studies

Insert into Supabase `case_studies` table with:
- `metric_value` (e.g., "₦200M", "+85%")
- `metric_label` (e.g., "Annual Revenue Growth")
- `client_name`, `sector`, `description`, `services_used[]`

### Updating Site Content

Edit entries in the `site_content` table where `section_key` matches:
- `hero` — Homepage hero text
- `impact_stats` — Statistics displayed on home
- `consult_cta` — Consultation call-to-action text

---

## Pre-Flight Checklist (Before Deployment)

```bash
# 1. TypeScript compilation
npx tsc --noEmit

# 2. Build verification
npm run build

# 3. Verify all Supabase queries in SQL Editor
# Copy queries from /contracts/supabase-queries.md and execute

# 4. Check RLS policies are enabled
# Run: SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

# 5. Verify seed data loaded
# Check: SELECT COUNT(*) FROM services; SELECT COUNT(*) FROM case_studies;

# 6. Test auth flow
# Register → Login → Forgot Password → Reset Password

# 7. Test consultation form submission
# Submit form → Verify row in consultations table
```

---

## License

Proprietary — Loakim Integrated Services. All rights reserved.

---

## Credits

- **Agency Framework**: Temitope Omotayo Oladapo
- **Development**: BORI-TECH
- **Design**: Premium dark consultancy aesthetic with gold accents
