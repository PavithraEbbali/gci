# Static HTML build

Plain HTML, CSS and vanilla JavaScript. No React, no Node server, no build step
needed to run it.

## Using it

**To view locally:** double-click `index.html`. It works straight off the
filesystem — no server required.

**To deploy:** upload the whole `html/` folder to any static host — shared
hosting, cPanel, Netlify, S3, GitHub Pages. There is nothing to configure.

## What is in here

```
index.html            the landing page
legal/*.html          the 8 legal pages
assets/styles.css     compiled stylesheet (56 KB, ~9 KB gzipped)
assets/app.js         all interactivity
assets/images/*.jpg   the 8 photographs
```

Two things load from a CDN: the Montserrat and Inter webfonts from Google
Fonts, and the Lenis smooth-scroll library from jsDelivr. Everything else is
local. If a CDN is unreachable the page still works — the fonts fall back to
the system sans, and the scroll code checks whether Lenis loaded before using
it, so scrolling reverts to the browser default.

## Regenerating

The markup is **generated**, not hand-maintained. It is built from the same
`lib/content.ts` the Next app uses, so the two cannot drift apart. Editing the
HTML by hand works, but the next rebuild overwrites it.

After changing prices, plans, copy or images:

```bash
npm run build:html
```

That bundles the content files, regenerates every page, recompiles the CSS and
copies the images across.

## What was ported

Every effect from the Next app, reimplemented without a framework:

| Effect | How |
|---|---|
| Smooth scrolling | Lenis, same library and settings |
| Hero entrance | CSS keyframes with `backwards` fill |
| Scroll reveals, stagger grids | IntersectionObserver toggling a class, CSS transitions |
| Clip-path section wipes | Same, on `clip-path` |
| Parallax | Scroll handler on a single rAF tick |
| SVG speed-path draw | `getTotalLength()` feeding a dash-offset transition |
| Magnetic buttons | Pointer tracking with an eased follow, label at 42% travel |
| 3D card tilt | Pointer tracking, capped at 7° |
| Aurora canvas | The same canvas code, verbatim |
| Marquee, medallion orbits and glow | Already pure CSS |
| ZIP checker, FAQ accordion, mobile menu, scroll-spy | Plain event handlers |

`prefers-reduced-motion` is respected throughout, exactly as before.
