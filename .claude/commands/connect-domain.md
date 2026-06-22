---
description: Connect a custom domain (or a subdomain of an existing website) and produce a developer-ready DNS note
---

You are helping a NON-TECHNICAL real estate agent point a web address at their
already-deployed Vercel site. Many agents already have a brokerage website and want
this property site on a **subdomain** of it (e.g. `residences.theirbrokerage.com`)
rather than moving their main domain. That's a single **CNAME** record their web
person adds — their existing site is untouched.

Be warm and plain-English. Your main deliverable is a **copy-paste DNS note** they
can forward to whoever manages their website's DNS.

## Step 1 — Find out what they want
Ask, one at a time:
1. "Do you want this on a brand-new domain (like `myresidences.com`), or as a
   section of your current website (like `residences.youragency.com`)?"
2. If **subdomain**: ask their existing website domain (e.g. `youragency.com`) and
   the sub-label they want (default suggestion: `residences`). The full address
   becomes `<label>.<their domain>`.
3. If **new domain**: ask the domain they want. Offer to check availability + price
   using the Vercel connector if it's enabled. (Buying is a manual click on the link
   Vercel returns — tell them that.)
4. Ask who controls their website's DNS: themselves, or a web developer / a host
   like GoDaddy, Namecheap, Cloudflare, Wix, Squarespace, WordPress, etc. (This only
   changes the wording of the note, not the record.)

## Step 2 — Tell them to add the domain in Vercel
Explain: in their Vercel project → **Settings → Domains → Add**, type the full
address (e.g. `residences.youragency.com`) and click Add. Vercel will then show the
exact record to create. For a **subdomain** it is almost always a CNAME to
`cname.vercel-dns.com`. For a **root/apex domain** it is an A record to
`76.76.21.21`.

## Step 3 — Produce the developer-ready DNS note (the key output)
Generate a clean block they can forward verbatim. Use their real values. For a
subdomain it looks like this:

```
Hi — please add ONE DNS record so my new property site works at
residences.youragency.com. Our main website does NOT change.

  Type:        CNAME
  Name / Host: residences        (some panels want the full
                                  "residences.youragency.com")
  Value/Target: cname.vercel-dns.com
  TTL:         Automatic (or 3600)

That's the only change. After it's saved it can take a few minutes to a few
hours to go live, and HTTPS turns on automatically.
```

Add registrar-specific notes when relevant:
- **Cloudflare:** set the record to **DNS only (grey cloud)**, not proxied/orange.
- **Wix / Squarespace / GoDaddy website builders:** they manage DNS in their domain
  settings; the same CNAME applies.
- If Vercel showed a slightly different target than `cname.vercel-dns.com`, use
  exactly what Vercel displayed.

## Step 4 — Record it in the site config
Set `brand.domain` in `src/config/brand.config.ts` to the **full** address
(e.g. `residences.youragency.com`, no `https://`). This makes social-share previews
and SEO use the right address. Then remind them to commit/redeploy (or that Vercel
redeploys automatically on the next push).

## Step 5 — Verify (optional)
If the Vercel connector is enabled, offer to check the domain's status/configuration
once the record has been added so they know it's live. If it isn't propagated yet,
reassure them it can take a little time and they can re-check later.

Begin at Step 1.
