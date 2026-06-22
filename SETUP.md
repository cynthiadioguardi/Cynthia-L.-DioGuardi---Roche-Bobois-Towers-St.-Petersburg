# Make this site yours — Setup Guide

This is a ready-to-launch marketing website for **Roche Bobois Residences St.
Petersburg**. Everything about the *building* is already built. You only need to
add **your** branding — your brokerage details, your agent info, your logo, your
contact form, and (optionally) your analytics — and then go live.

You do **not** need to know how to code.

---

## The easiest way: let the AI do it

Open this project folder in your AI coding assistant (the same place you're
reading this) and type:

```
/personalize
```

The assistant will **interview you one question at a time**, fill everything in
for you, show you the result, and then walk you through going live. If `/personalize`
isn't available, just say: **"Read SETUP.md and walk me through personalizing this
site."**

Everything you provide gets written into a single file —
`src/config/brand.config.ts` — plus two image files you drop in. You never have to
hunt through code.

---

## What you'll be asked for

Have these handy before you start. Anything optional can be added later.

### 1. Your brokerage (required — appears in the legal footer)
- **Legal brokerage name** (e.g. "Acme Realty Partners LLC")
- **DBA / "doing business as" name**, if you have one (otherwise skip)
- **Florida real estate license number** (e.g. "CQ1234567")
- **Office address**, one line (e.g. "123 Main St, Ste 100, Tampa, FL 33602")
- **Public phone number**
- **Public email address**

### 2. You, the agent (optional — shows a headshot + name in the footer)
- **Your name**
- **Your title** (e.g. "Licensed Real Estate Advisor")
- **Your headshot photo** — a square photo (we'll save it as `public/brand/agent.jpg`)

### 3. Your logo (recommended)
- A **transparent PNG** of your brokerage logo (we'll save it as `public/brand/logo.png`)

### 4. Your contact form (so leads reach you)
Pick **one**:
- **Option A — JotForm (recommended):** Duplicate the provided JotForm template so
  the form fields match, then give us your **JotForm form ID** (the number in your
  form's web address). This keeps the beautiful built-in form *and* automatic
  conversion tracking.
- **Option B — Paste your own form:** Paste the **iframe embed code** from JotForm,
  Typeform, Calendly, or similar. This replaces the built-in form. (Automatic
  conversion tracking is not available on this path — your form provider tracks its
  own submissions.)

> Why the JotForm ID isn't enough on its own: the built-in form sends specific
> field names. They only line up if your JotForm is a **duplicate of the provided
> template**. If you build a brand-new JotForm from scratch, use **Option B** and
> paste its iframe instead.

### 5. Analytics & ads (optional — leave blank to skip)
- **GA4 Measurement ID** (looks like `G-XXXXXXXXXX`)
- **Google Ads tag ID** (looks like `G-XXXXXXXXXX` or `AW-XXXXXXXXX`)
- **Google Ads conversion ID** (`AW-XXXXXXXXX`) and **conversion label**

If you leave these blank, no tracking code loads at all — nothing breaks.

### 6. Your domain (optional now, needed to go fully live)
- The web address you'll use (e.g. `luxurycondosstpete.com`)

---

## Where everything lands (for reference)

| What you give | Where it goes |
|---|---|
| Brokerage + agent + analytics + form + domain | `src/config/brand.config.ts` |
| Your logo file | `public/brand/logo.png` |
| Your headshot file | `public/brand/agent.jpg` |

The building content (renderings, address, amenities, developer/architect/brand
profiles) is shared across every copy and is **not** something you edit.

---

## ⚖️ Important: the legal footer (please read)

Florida law requires specific disclaimers on pre-construction marketing. This
template includes them in the footer, and they will automatically show **your**
brokerage name, license, and address from the config above:

1. A disclaimer stating your brokerage is **not** the developer/owner/affiliate of
   Roche Bobois Residences and acts as a **buyer's representative**.
2. The mandatory **Florida Statute 718.503** "oral representations" notice
   (in all-caps italics). **This must stay on the page** — do not remove it.
3. An **Equal Housing Opportunity** notice.

During setup the assistant will show you this text with your details filled in and
ask you to confirm that (a) your brokerage details are correct and (b) **you are a
licensed Florida real estate brokerage** authorized to market this property. Please
confirm carefully — this text is legally significant.

---

## Preview it locally

After your details are in, you (or the assistant) can preview the site:

```
npm install      # first time only
npm run dev      # then open http://localhost:3000
```

To confirm a production build is clean:

```
npm run build
```

---

## Go live on Vercel + connect your domain

The assistant can do most of this for you. Here are the exact steps.

### A. Put the code on GitHub (one time)
1. Create a free account at https://github.com if you don't have one.
2. Create a new **empty** repository (no README).
3. In this project folder, connect and push:
   ```
   git init
   git add .
   git commit -m "My personalized Roche Bobois site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

### B. Deploy on Vercel
1. Create a free account at https://vercel.com (sign in with GitHub — easiest).
2. Click **Add New… → Project**, pick the repo you just pushed, and click **Deploy**.
   Vercel auto-detects Next.js — no settings to change.
3. In ~30–45 seconds you'll get a live preview URL like
   `your-project.vercel.app`. Open it and check everything looks right.

> **CLI alternative (the assistant can run this):**
> ```
> npm i -g vercel      # install the Vercel CLI once
> vercel               # link/create the project (follow prompts)
> vercel --prod        # deploy to production
> ```

### C. Connect your custom domain

**Easiest: let the assistant guide you — type `/connect-domain`.** It asks what you
want and gives you exact instructions (including a note you can forward to your web
developer). There are two common situations:

**If you already have a website (most agents): use a subdomain.**
Keep your existing site exactly as it is and put this one at something like
`residences.youragency.com`. That's a single **CNAME** record:
1. In your Vercel project: **Settings → Domains → Add** → type
   `residences.youragency.com`.
2. Vercel shows the record to add — for a subdomain it's almost always:
   **Type `CNAME`, Host `residences`, Value `cname.vercel-dns.com`**.
3. Send that one line to whoever manages your website's DNS (your web developer, or
   your GoDaddy/Namecheap/Cloudflare/Wix/Squarespace account). Your main site doesn't
   change. *(Cloudflare: set the record to "DNS only / grey cloud".)*

**If you want a brand-new domain:**
1. Buy it (Vercel can sell you one, or use Namecheap/GoDaddy/etc.). The assistant can
   check availability and price for you.
2. Vercel project → **Settings → Domains → Add** → type your domain → follow the
   prompts (automatic if bought through Vercel; a root domain uses an `A` record).

In both cases: it can take a few minutes to a few hours to go live, and HTTPS turns
on automatically. **Finally, set `domain` in `src/config/brand.config.ts` to your
full address** (e.g. `residences.youragency.com`, no `https://`) so share previews
and SEO are correct, then redeploy.

---

## After you're live

- **Change something later?** Edit `src/config/brand.config.ts` (or swap a file in
  `public/brand/`), commit, and push — Vercel redeploys automatically.
- **Stuck?** Tell the assistant what you see and it will help.
