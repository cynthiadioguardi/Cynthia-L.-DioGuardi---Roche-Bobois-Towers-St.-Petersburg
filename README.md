# Roche Bobois Residences — White-Label Marketing Site (Template v1)

A ready-to-launch luxury marketing website for **Roche Bobois Residences St.
Petersburg**, built to be re-branded by any licensed real-estate broker/agent
marketing the building. The building content is already done — you just add your
branding and go live.

## 👉 Start here

Open this folder in your AI coding assistant and type:

```
/personalize
```

It will interview you, fill everything in, and walk you through going live. Prefer
to read first? See **[SETUP.md](./SETUP.md)**.

## What you customize

Everything per-broker lives in **one file** — `src/config/brand.config.ts` — plus
two images you drop into `public/brand/` (`logo.png`, `agent.jpg`). You don't edit
any other code.

- Brokerage name, dba, license, address, phone, email
- Agent name, title, headshot
- Logo
- Contact form (JotForm ID, or paste your own embed)
- Analytics tags (GA4 / Google Ads) — optional, blank by default
- Custom domain

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Tech

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · GSAP · Framer
Motion · Lenis. Deploys on Vercel.

For architecture, design tokens, animation inventory, and the full onboarding
contract, see **[CLAUDE.md](./CLAUDE.md)**.
