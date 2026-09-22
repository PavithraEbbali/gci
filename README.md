# GCI Authorized Retailer — landing site

Marketing site for an independent authorized retailer of GCI, Alaska's
telecommunications provider. Plan data, pricing and promotions were transcribed
from [gci.com](https://www.gci.com) and are kept in a single source of truth.

The repository contains **two builds of the same site**:

| | Path | Use |
|---|---|---|
| **Next.js app** | repo root | Deployed to Vercel. Full React app. |
| **Static HTML** | `html/` | Plain HTML/CSS/JS. Opens by double-click, uploads to any static host. |

Both are generated from the same `lib/content.ts`, so they cannot drift apart.

---

## Running locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Deploying to Vercel

Vercel auto-detects the Next.js app at the repository root — no configuration
file is needed. Import the repo and deploy.

Social share image URLs need an absolute origin. On Vercel this is detected
automatically from the deployment, so a fresh import works without any
configuration.

**Once you point a real domain at it**, set `NEXT_PUBLIC_SITE_URL` to that
origin under **Project → Settings → Environment Variables** and redeploy —
otherwise link previews keep pointing at the `.vercel.app` URL. See
`.env.example`.

## Rebuilding the static HTML

```bash
npm run build:html
```

Bundles the content modules, regenerates every page in `html/`, recompiles the
stylesheet and copies the images across. Run this after any content change, or
the static build will lag behind the app. See `html/README.md`.

---

## Architecture

### Single source of truth

`lib/content.ts` holds **every** price, speed, plan name, feature bullet, fee
row, offer, FAQ and image path on the site. No component hard-codes content. To
change pricing, edit that one file.

Two helpers enforce rules that would otherwise rot:

- `ctaLabel(plan)` returns `"Call to order"` when a plan has a published price
  and `"Call for pricing"` when it does not.
- `entryInternetPlan()` picks the cheapest published plan, so the hero's "from"
  price cannot drift away from the plan grid.

`serviceSections` drives the page: removing an entry removes an entire section,
with no component changes.

### Service lines

Audited against gci.com. **Cable** and **TV** sections do not exist, because GCI
does not sell either as a residential product line — `/tv` redirects to their
homepage and there is no separate cable tier lineup. No placeholder sections
were left behind.

### Brand palette

Extracted from GCI's own design-token layer rather than sampled by eye:

| Token | Hex |
|---|---|
| Brand red | `#b71234` · hover `#9b0f2c` · deep `#800d24` |
| Midnight blue | `#042046` · link `#073473` |
| Glacier blue | `#00a9e0` · bright `#31ccff` · deep `#007aa1` |
| Neutrals | `#23252a` `#303139` `#5e636e` `#c6c9d2` `#e1e4ea` `#f2f5fa` |

GCI ships Gotham; Montserrat is the closest freely-licensable geometric sans and
carries the display type, with Inter for body copy.

---

## Layout

```
app/                    Next.js routes
  page.tsx              the landing page
  legal/[slug]/         the 8 legal pages
  globals.css           brand tokens + primitives
components/
  sections/             page sections
  ui/                   PriceLockup, Icon, MagneticButton, TiltCard, AuroraField …
lib/
  content.ts            SINGLE SOURCE OF TRUTH
  legal.ts              legal page content
build/                  static-HTML generator (see html/README.md)
html/                   the generated static build
public/images/          photography
ai.wing                 changelog
```

## Notes

- `site.phoneDisplay` / `site.phoneHref` in `lib/content.ts` hold a **placeholder**
  number in the reserved 555-01xx range. Replace before launch.
- The site origin resolves from `NEXT_PUBLIC_SITE_URL`, then Vercel's own
  deployment URL, then a placeholder. Empty and malformed values fall through
  rather than failing the build.
- The legal pages are editorial, not legal advice. Have counsel review them.
- This site is an independent authorized retailer's, not GCI's. The disclosure
  bar and footer attribution must stay.
