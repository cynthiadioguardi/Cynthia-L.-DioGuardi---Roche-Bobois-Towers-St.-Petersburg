# Workshop Runbook — Personalize & Launch (for the presenter)

A field-tested guide for running a hands-on session where non-technical real-estate
agents each turn this template into their own live site. The flow below reflects an
actual end-to-end test run — including what Claude does automatically and where a
human still has to click.

---

## How the flow REALLY works (automatic vs. manual)

| Step | Who does it |
|---|---|
| Read/understand the template | 🤖 Claude — automatic |
| Interview the agent & write `brand.config.ts` | 🤖 Claude — automatic |
| Confirm "I'm a licensed FL brokerage / keep the 718.503 notice" | 🧑 Human — one "yes" (legal gate, by design) |
| Add logo + headshot | 🧑 Human — drop/upload two files |
| Type-check / verify the edit | 🤖 Claude — automatic |
| **First deploy to Vercel** | 🧑 **Human — GitHub → Vercel import (one-time, browser)** |
| Every deploy AFTER the first | 🤖 Automatic — Vercel rebuilds on each push/commit |
| Check a domain's availability + price | 🤖 Claude — automatic (via Vercel connector) |
| Buy the domain & attach it | 🧑 Human — click the purchase link, add in Vercel |

> **The single most important thing to script around:** the Vercel connector does
> **not** create-and-push the first deployment. It returns deploy *instructions* and
> can read status/logs + check domains. The first deploy is a short browser step
> (import the GitHub repo on vercel.com). Once imported, Vercel auto-deploys on every
> later change — so it's "manual once, automatic forever."

---

## Recommended path: GitHub-centric, browser-only (Path A)

Because the easy first deploy needs the repo on GitHub anyway, keep everything on
GitHub from the start. **Zero local installs.**

```
Use this template (GitHub)  →  Personalize in Claude  →  Import to Vercel  →  Live
        (browser)                    (browser)              (browser, 1×)
```

---

## Presenter pre-work (before the room)

### 1. Publish the template as a GitHub "template repository"

**a. Reset the config to blank first** (so no demo brokerage ships in the template).
`src/config/brand.config.ts` should hold the placeholder values — `"Your Brokerage
Name LLC"`, all analytics/JotForm/domain `""`. (Ask Claude: *"reset brand.config.ts
to blank placeholders"* if a test left real values in it.)

**b. Create an empty repo on github.com** — click **New repository**, name it (e.g.
`roche-bobois-template`), leave it empty (no README/.gitignore — this project already
has one), **Create**.

**c. Push this folder up** (run these from inside `roche-bobois-template-v1`). The
`.gitignore` already excludes `node_modules`, `.next`, `.env*.local`, and `.vercel`,
and **includes** `.claude/` so the `/personalize` command travels with the repo:

```bash
git init
git add .
git commit -m "Roche Bobois white-label template v1"
git branch -M main
git remote add origin https://github.com/<your-username>/roche-bobois-template.git
git push -u origin main
```

**d. Mark it a template** — on github.com open the repo → **Settings** → check
**✅ Template repository**. Now each agent gets their own clean copy with one
**"Use this template"** click (independent repo, fresh history — perfect for
per-broker copies).

### 2. Make a short link + QR code to that template repo.

### 3. Confirm the Vercel connector on your own account once
(Settings → Connectors → Vercel → Connect). Optional for attendees, but great for the
live domain-check demo and for reading build logs if someone's deploy fails.

### 4. Prepare the attendee one-pager (bottom of this doc) as a slide/handout.

## Attendee pre-work email (send a day before)

> **Before our session, please do three quick things (10 min):**
> 1. Make sure you can sign in at **claude.ai** (you'll use your existing paid plan).
> 2. Create a free account at **github.com** (this is where your site lives).
> 3. Bring **two images**: your **logo** (PNG, transparent if possible) and a
>    **square headshot** photo.
>
> Optional but recommended: create a free account at **vercel.com** using "Sign in
> with GitHub." That's what makes your site go live.

---

## The live script (what you walk them through)

### Stage 1 — Get their own copy  (~3 min)
1. Open the template link → **"Use this template" → Create a new repository** →
   name it (e.g. `my-residences-site`).

### Stage 2 — Add their brand images  (~3 min)
2. In the new repo, open **`public/brand/`** → **Add file → Upload files** → drag in
   their logo and headshot, renamed **exactly** `logo.png` and `agent.jpg`
   (replacing the placeholders) → **Commit**.

### Stage 3 — Personalize with Claude  (~10 min)
3. Go to **claude.ai/code**, connect GitHub, and select their new repo.
4. Type **`/personalize`**.
   - **If `/personalize` doesn't appear** (some Claude surfaces don't expose project
     slash commands), say instead:
     > *"Read `.claude/commands/personalize.md` and walk me through personalizing
     > this site."*
     Same result — Claude runs the interview either way.
5. Answer the plain-English questions. Claude shows the legal footer with their
   details and asks them to **confirm they're a licensed FL brokerage** and that the
   **718.503 notice stays** — that's their one required "yes." Claude commits the
   changes.

### Stage 4 — Go live on Vercel  (~5 min, one-time)
6. Go to **vercel.com → Sign in with GitHub**.
7. **Add New → Project → Import** their repo → **Deploy** (auto-detects Next.js; no
   settings to touch).
8. ~45 sec later: a live `something.vercel.app` URL. **From now on, every change
   Claude commits redeploys automatically** — no repeat of this step.

### Stage 5 — Custom domain  (optional / aftercare)

Most agents fall into one of two camps. Claude can guide either — they can just type
**`/connect-domain`** (or *"read `.claude/commands/connect-domain.md` and walk me
through it"*) and Claude produces the exact records, including a note to forward to
their web person.

**Camp A — "I already have a website" (the common one): use a subdomain.**
They keep their existing site and put this one at e.g. `residences.theiragency.com`.
That's **one CNAME record**, their main site untouched:
   1. Vercel → project → **Settings → Domains → Add** → type `residences.theiragency.com`.
   2. Vercel shows a record to add. For a subdomain it's almost always:
      **CNAME → `cname.vercel-dns.com`**.
   3. Claude hands them a copy-paste note for their web developer:
      ```
      Type:  CNAME    Name/Host:  residences    Value:  cname.vercel-dns.com
      ```
      (Cloudflare users: set it to **DNS only / grey cloud**, not proxied.)
   4. Set `brand.domain` to the full subdomain so SEO/share previews are correct.

**Camp B — "I want a brand-new domain."**
   1. Ask Claude (Vercel connector on): *"Check if `myresidences.com` is available
      and the price."* → returns availability + price + a purchase link
      (**buying is a manual click**).
   2. After purchase: Vercel → **Settings → Domains → Add** → follow the prompts
      (automatic if bought through Vercel; root domains use an A record to
      `76.76.21.21`).

**Total once everyone's logged in: ~20–25 minutes.**

---

## Known surface quirks (so nothing surprises you)

- **`/personalize` slash command** isn't available in every Claude surface (e.g. the
  Cowork tab reads the file instead). The "read `.claude/commands/personalize.md`"
  phrasing is the universal fallback — it's transparent to the user.
- **Don't rely on a local `npm run build` to "prove" it worked.** Some sandboxes
  can't complete Next's native build (SIGBUS). It doesn't matter: **Vercel runs the
  authoritative build at deploy time.** Claude can type-check (`tsc --noEmit`) to
  confirm the config edit is valid if you want reassurance.
- **The Vercel connector can't first-deploy.** It's read/query + deploy-instructions
  + domain tools. First deploy = GitHub→Vercel import (above). Don't promise the room
  that "Claude will deploy it for you" on the first launch — promise that Claude
  *personalizes* it and that going live is a 5-click import.
- **Leaving JotForm/analytics blank is fine for the demo.** The site renders; just
  flag that the contact form won't deliver leads until they add a JotForm ID or
  embed (aftercare). Same for analytics.

---

## Aftercare checklist (send home with them)

- [ ] Replace placeholder `logo.png` / `agent.jpg` if you used temporary images.
- [ ] Wire your contact form: add a **JotForm ID** (duplicate the provided form) or
      paste an **iframe embed** — otherwise leads go nowhere.
- [ ] Add your **analytics** (GA4 / Google Ads) if you run ads.
- [ ] Connect a **custom domain** — type **`/connect-domain`**. Most agents will use
      a **subdomain of their existing site** (e.g. `residences.youragency.com`); Claude
      gives you the one CNAME record to forward to your web developer.
- [ ] Re-read the footer once live to confirm your brokerage details are correct.

---

## 📄 Attendee one-pager (print or put on a slide)

> ### Make your Roche Bobois site in ~20 minutes
> **You'll need:** a claude.ai login · a github.com account · your logo + a headshot
>
> 1. **Copy it** — Open the template link → **Use this template** → name your repo.
> 2. **Add your images** — In `public/brand/`, **Upload files**: your logo as
>    `logo.png` and headshot as `agent.jpg` (exact names!). Commit.
> 3. **Personalize** — Go to **claude.ai/code**, pick your repo, type **`/personalize`**
>    (or say *"read .claude/commands/personalize.md and walk me through it"*). Answer
>    the questions; confirm you're a licensed FL brokerage.
> 4. **Go live** — **vercel.com** → Sign in with GitHub → **Import** your repo →
>    **Deploy**. You get a live link in under a minute.
> 5. **Your domain (optional)** — Type **`/connect-domain`**. Already have a website?
>    Claude sets you up on a subdomain (e.g. `residences.youragency.com`) and gives
>    you one DNS line to send your web person. Want a new domain? Claude checks
>    availability + price.
>
> *Questions? Just tell Claude what you see on screen and it'll help.*
