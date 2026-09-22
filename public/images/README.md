# Image drop folder

Save generated images here using **exactly these filenames**. The code reads
these paths from `imageAssets` in `lib/content.ts` — filenames must match or the
image will 404.

Format: **JPG** for all photographs (not PNG — 3–5× larger for no benefit).
Target **under 500 KB** each after export. Next.js re-encodes to WebP/AVIF and
generates responsive sizes automatically, so do not pre-resize below the
dimensions listed.

| Filename | Size (px) | Ratio | Used in | Text sits on top? |
|---|---|---|---|---|
| `hero-background.jpg` | 2560 × 1440 | 16:9 | Hero, full-bleed behind everything | **Yes** — heavy white scrim applied |
| `offers-lifestyle.jpg` | 1200 × 1500 | 4:5 | Offers section, behind the red lead card | **Yes** — red multiply overlay |
| `section-fiber.jpg` | 1400 × 1050 | 4:3 | Fiber+ section, beside the heading | No |
| `section-bundles.jpg` | 1400 × 1050 | 4:3 | GCI+ Bundles section, beside the heading | No |
| `section-mobile.jpg` | 1400 × 1050 | 4:3 | GCI Mobile section, beside the heading | No |
| `section-phone.jpg` | 1400 × 1050 | 4:3 | Home Phone section, beside the heading | No |
| `why-network.jpg` | 1600 × 1000 | 8:5 | Why GCI, as a grid tile among the metric cards | Small caption only |
| `og-image.jpg` | 1200 × 630 | 1.91:1 | Social share card (link previews) | No |

## Two things to avoid

**No visible branding on vehicles, uniforms, hard hats or buildings.** A
generated image that looks like a real GCI van or a real GCI facility is
fabricated corporate imagery. Keep logos, liveries and company names out of
frame — plain high-vis, unmarked trucks, generic equipment.

**No identifiable product shot for the iPhone 18 Pro offer.** That device has no
public imagery to be accurate against, so a generated "photo" of it would be
invented product photography. `offers-lifestyle.jpg` should show a phone
held at an angle, partly out of frame, or screen-side-away — a lifestyle shot,
not a product shot.

## After you drop the files in

Nothing else to do — the components already reference these paths.
