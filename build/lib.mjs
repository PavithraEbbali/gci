/* =============================================================================
 *  Shared building blocks for the static HTML generator.
 *
 *  Markup here mirrors the React components class-for-class, so the compiled
 *  Tailwind output is byte-comparable and nothing drifts visually.
 * ========================================================================== */

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const escAttr = (s = '') => esc(s).replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ icons -- */
/* Paths copied verbatim from components/ui/Icon.tsx. */

const ICON_PATHS = {
  check: '<path d="M4.5 12.5 9 17l10.5-10" />',
  download: '<path d="M12 4v12" /><path d="m6.5 11.5 5.5 5.5 5.5-5.5" /><path d="M5 20h14" />',
  upload: '<path d="M12 20V8" /><path d="m6.5 12.5 5.5-5.5 5.5 5.5" /><path d="M5 4h14" />',
  fiber:
    '<circle cx="5" cy="12" r="1.6" /><path d="M9.2 7.8a6 6 0 0 1 0 8.4" /><path d="M13 4a11.3 11.3 0 0 1 0 16" /><path d="M16.8 0.9a16.6 16.6 0 0 1 0 22.2" />',
  bundle:
    '<path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="m4 12.5 8 4.5 8-4.5" /><path d="m4 17 8 4.5 8-4.5" />',
  mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.6" /><path d="M10.5 18.5h3" />',
  handset:
    '<path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z" />',
  wifi:
    '<path d="M3.5 9a13 13 0 0 1 17 0" /><path d="M6.8 12.6a8.4 8.4 0 0 1 10.4 0" /><path d="M10 16.2a3.6 3.6 0 0 1 4 0" /><circle cx="12" cy="19.6" r="1" />',
  bolt: '<path d="M13.5 2.5 5 13.5h5.5L10 21.5 19 10h-5.6l.1-7.5Z" />',
  shield:
    '<path d="M12 2.7 4.8 5.6v6c0 4.3 3 8.2 7.2 9.7 4.2-1.5 7.2-5.4 7.2-9.7v-6L12 2.7Z" /><path d="m9 12 2.2 2.2L15.4 10" />',
  device:
    '<rect x="3" y="4.5" width="13" height="12" rx="2" /><rect x="17.5" y="9" width="4" height="10.5" rx="1.4" /><path d="M7 20h5" />',
  tablet: '<rect x="4" y="2.5" width="16" height="19" rx="2.4" /><path d="M10.5 18.3h3" />',
  headphones:
    '<path d="M4 14v-1.5a8 8 0 0 1 16 0V14" /><path d="M4 14.5h2.6a1.4 1.4 0 0 1 1.4 1.4v3.2A1.4 1.4 0 0 1 6.6 20H5.4A1.4 1.4 0 0 1 4 18.6v-4.1Z" /><path d="M20 14.5h-2.6a1.4 1.4 0 0 0-1.4 1.4v3.2a1.4 1.4 0 0 0 1.4 1.4h1.2a1.4 1.4 0 0 0 1.4-1.4v-4.1Z" />',
  tag:
    '<path d="M11.2 3H20a1 1 0 0 1 1 1v8.8a1.5 1.5 0 0 1-.44 1.06l-7.2 7.2a1.5 1.5 0 0 1-2.12 0l-7.3-7.3a1.5 1.5 0 0 1 0-2.12l7.2-7.2A1.5 1.5 0 0 1 11.2 3Z" /><circle cx="16.6" cy="7.4" r="1.4" />',
  award: '<circle cx="12" cy="9" r="6" /><path d="m8.4 14.3-1.6 7 5.2-2.8 5.2 2.8-1.6-7" />',
  map: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" />',
  route:
    '<circle cx="5.5" cy="6" r="2.5" /><circle cx="18.5" cy="18" r="2.5" /><path d="M8 6h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h6" />',
  snowflake:
    '<path d="M12 2.5v19" /><path d="m3.8 7.2 16.4 9.6" /><path d="m20.2 7.2-16.4 9.6" /><path d="m9 4.8 3 2.4 3-2.4" /><path d="m9 19.2 3-2.4 3 2.4" />',
  globe:
    '<circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />',
};

export function icon(name, cls = 'h-5 w-5') {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="${cls}">${
    ICON_PATHS[name] || ''
  }</svg>`;
}

export const phoneGlyph = (cls = 'h-[0.95em] w-[0.95em]') =>
  `<svg viewBox="0 0 24 24" fill="none" class="${cls}" aria-hidden="true"><path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;

/* ----------------------------------------------------------- brand mark -- */

export function mark(id, size = 'h-9 w-9') {
  return `<svg viewBox="0 0 40 40" class="${size}" aria-hidden="true">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#00a9e0"/><stop offset="52%" stop-color="#31ccff"/><stop offset="100%" stop-color="#b71234"/>
  </linearGradient></defs>
  <circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#${id})" stroke-width="2.5"/>
  <path d="M12 25.5 L18.5 14 L21.5 20.5 L28 12" fill="none" stroke="url(#${id})" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

/* --------------------------------------------------------- price lockup -- */
/* Mirrors components/ui/PriceLockup.tsx, including the screen-reader line. */

export function priceLockup(plan, scale = 'md', cls = '') {
  const hasPrice = typeof plan.price === 'number';
  const integerSize =
    scale === 'lg'
      ? 'text-[3.5rem] leading-[0.86]'
      : scale === 'sm'
        ? 'text-[2.5rem] leading-[0.88]'
        : 'text-[3rem] leading-[0.87]';
  const symbolSize =
    scale === 'lg' ? 'text-[1.5rem]' : scale === 'sm' ? 'text-[1.125rem]' : 'text-[1.3rem]';
  const centsSize =
    scale === 'lg' ? 'text-[1.375rem]' : scale === 'sm' ? 'text-[1rem]' : 'text-[1.1875rem]';

  if (!hasPrice) {
    return `<div class="${cls}">
  <p class="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-gci-darkest">Custom pricing</p>
  ${plan.promoQualifier ? `<p class="mt-1.5 text-[0.8125rem] text-gci-mid">${esc(plan.promoQualifier)}</p>` : ''}
</div>`;
  }

  return `<div class="${cls}">
  ${plan.strikePrice ? `<p class="mb-1 text-[0.9375rem] font-medium line-through text-gci-mid/70">${esc(plan.strikePrice)}</p>` : ''}
  <div class="flex items-start">
    <span class="font-display font-bold ${symbolSize} text-gci-darkest mt-[0.18em] mr-[0.06em] tabular-nums" aria-hidden="true">$</span>
    <span class="font-display font-bold tracking-[-0.045em] tabular-nums ${integerSize} text-gci-darkest">${plan.price}</span>
    ${plan.cents ? `<span class="font-display font-bold ${centsSize} text-gci-mid mt-[0.2em] ml-[0.05em] tabular-nums">.${esc(plan.cents)}</span>` : ''}
  </div>
  ${plan.promoQualifier ? `<p class="mt-2 text-[0.8125rem] leading-snug font-medium text-gci-mid">${esc(plan.promoQualifier)}</p>` : ''}
  <span class="sr-only">${plan.strikePrice ? `Regularly ${esc(plan.strikePrice)}. Now ` : ''}${plan.price}${
    plan.cents ? ` dollars and ${esc(plan.cents)} cents` : ' dollars'
  } ${esc(plan.promoQualifier ?? '')}</span>
</div>`;
}

/* ---------------------------------------------------------------- chrome -- */

export function disclosureBar(site) {
  return `<div class="bg-gci-dark text-white">
  <div class="shell flex h-[var(--util-h)] items-center justify-center">
    <p class="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/85 uppercase sm:tracking-[0.18em]">
      <span aria-hidden="true" class="mr-2.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-gci-glacier-bright align-middle"></span>
      ${esc(site.disclosureShort)}
    </p>
  </div>
</div>`;
}

export function wordmark(site, href, markId) {
  return `<a href="${href}" class="-my-1 flex items-center gap-2.5 py-1" aria-label="${escAttr(site.brandName)} — home">
  <span class="flex h-9 w-9 items-center justify-center">${mark(markId)}</span>
  <span class="leading-none">
    <span class="block font-display text-[1.375rem] font-extrabold tracking-[-0.04em] text-gci-red">${esc(site.brandName)}</span>
    <span class="mt-[0.3rem] block text-[0.625rem] font-bold tracking-[0.14em] text-gci-mid uppercase">${esc(site.brandSuffix)}</span>
  </span>
</a>`;
}

/**
 * `home` is the path prefix back to index.html, so the legal pages can reuse
 * the same header without their anchors pointing at themselves.
 */
export function header(site, navLinks, home = '') {
  const links = [...navLinks, { href: '#offers', label: 'Deals' }, { href: '#faq', label: 'FAQ' }];
  const navHtml = links
    .map(
      (l) =>
        `<a href="${home}${l.href}" data-nav="${escAttr(l.href.slice(1))}" class="nav-link relative rounded-full px-4 py-2 text-[0.875rem] font-semibold text-gci-dark transition-colors duration-300 hover:text-gci-red">${esc(
          l.label,
        )}<span class="nav-pill pointer-events-none absolute inset-0 -z-10 rounded-full bg-gci-red/8 opacity-0 transition-opacity duration-300"></span></a>`,
    )
    .join('\n          ');

  const sheetHtml = links
    .map(
      (l) =>
        `<li><a href="${home}${l.href}" data-menu-link class="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-bold tracking-[-0.02em] text-gci-darkest transition-colors hover:bg-gci-lightest">${esc(
          l.label,
        )}<span aria-hidden="true" class="text-gci-glacier">→</span></a></li>`,
    )
    .join('\n            ');

  return `<header id="site-header" class="sticky top-0 z-50 bg-white transition-shadow duration-300">
  <div class="shell flex h-[var(--head-h)] items-center justify-between gap-6">
    ${wordmark(site, home || '#top', 'mk-head')}

    <nav class="hidden items-center gap-1 lg:flex" aria-label="Service lines">
      ${navHtml}
    </nav>

    <div class="flex items-center gap-3">
      <div class="hidden sm:block">
        <div class="magnetic inline-block will-change-transform">
          <a href="${site.phoneHref}" aria-label="Call ${escAttr(site.phoneDisplay)}" class="relative inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gci-red px-5 font-display text-[0.8125rem] font-bold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)] transition-colors duration-300 select-none hover:bg-gci-red-hover">
            <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}Call ${esc(site.phoneDisplay)}</span>
          </a>
        </div>
      </div>

      <button type="button" id="menu-toggle" aria-expanded="false" aria-label="Open menu"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-gci-border text-gci-darkest transition-colors hover:border-gci-light lg:hidden">
        <span class="relative block h-3 w-4">
          <span class="bar-1 absolute left-0 top-0 block h-[1.5px] w-4 bg-current transition-all duration-300"></span>
          <span class="bar-2 absolute left-0 top-3 block h-[1.5px] w-4 bg-current transition-all duration-300"></span>
        </span>
      </button>
    </div>
  </div>
</header>

<div id="mobile-menu" class="fixed inset-0 z-40 hidden lg:hidden">
  <div id="menu-scrim" class="absolute inset-0 bg-gci-midnight/45 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
  <nav id="menu-sheet" class="absolute inset-x-0 top-[var(--head-h)] mx-4 -translate-y-4 rounded-3xl border border-gci-border bg-white p-6 opacity-0 shadow-2xl transition-all duration-300" aria-label="Mobile navigation">
    <ul class="space-y-1">
      ${sheetHtml}
    </ul>
    <div class="mt-5 border-t border-gci-border pt-5">
      <a href="${site.phoneHref}" class="flex w-full items-center justify-center gap-2 rounded-full bg-gci-red py-4 font-display font-bold text-white transition-colors hover:bg-gci-red-hover">${phoneGlyph()}Call ${esc(site.phoneDisplay)}</a>
    </div>
  </div>
</div>`;
}

export function footer(data, home = '') {
  const { site, footerNav, footerDisclosures, legalPages } = data;

  const cols = footerNav
    .map(
      (col) => `<nav aria-label="${escAttr(col.heading)}">
      <h2 class="text-[0.75rem] font-extrabold tracking-[0.14em] text-white/50 uppercase">${esc(col.heading)}</h2>
      <ul class="mt-5">
        ${col.links
          .map(
            (l) =>
              `<li><a href="${home}${l.href}" class="flex min-h-11 items-center text-[0.875rem] text-white/78 transition-colors hover:text-gci-glacier-bright">${esc(l.label)}</a></li>`,
          )
          .join('\n        ')}
      </ul>
    </nav>`,
    )
    .join('\n    ');

  return `<footer class="canvas-midnight-deep relative isolate text-white">
  <div class="border-b border-white/10">
    <div class="shell flex flex-col items-start justify-between gap-7 py-12 lg:flex-row lg:items-center lg:py-14">
      <div>
        <h2 class="display text-[clamp(1.4rem,5.5vw,2.35rem)] text-white">Ready to get connected?</h2>
        <p class="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-white/65">We will confirm what is available at your address, review the plan tiers with you, and complete the order on the same call.</p>
      </div>
      <div class="shrink-0">
        <div class="magnetic inline-block will-change-transform">
          <a href="${site.phoneHref}" class="relative inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-full bg-gci-red px-9 font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)] transition-colors duration-300 select-none hover:bg-gci-red-hover">
            <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}Call to order</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="shell grid gap-10 py-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
    <div>
      <div class="flex items-center gap-2.5">
        ${mark('mk-foot')}
        <span class="leading-none">
          <span class="block font-display text-[1.375rem] font-extrabold tracking-[-0.04em] text-white">${esc(site.brandName)}</span>
          <span class="mt-[0.3rem] block text-[0.625rem] font-bold tracking-[0.14em] text-white/55 uppercase">${esc(site.brandSuffix)}</span>
        </span>
      </div>
      <p class="mt-6 max-w-[24rem] text-[0.875rem] leading-[1.7] text-white/62">Independent authorized retailer helping Alaskans order GCI Internet, Mobile and Home Phone service.</p>
    </div>

    ${cols}

    <div>
      <h2 class="text-[0.75rem] font-extrabold tracking-[0.14em] text-white/50 uppercase">Talk to a human</h2>
      <a href="${site.phoneHref}" class="mt-4 inline-flex min-h-11 items-center font-display text-[1.375rem] font-extrabold tracking-[-0.03em] text-white transition-colors hover:text-gci-glacier-bright">${esc(site.phoneDisplay)}</a>
      <p class="mt-3 text-[0.8125rem] leading-relaxed text-white/58">${esc(site.hours)}</p>
      <p class="mt-2 text-[0.8125rem] leading-relaxed text-white/58">${esc(site.address)}</p>
    </div>
  </div>

  <div class="shell border-t border-white/12 pt-8 pb-2">
    <h2 class="text-[0.75rem] font-extrabold tracking-[0.15em] text-white/62 uppercase">Offer details &amp; required disclosures</h2>
    <div class="mt-5 space-y-3.5 lg:columns-2 lg:gap-10 lg:space-y-0">
      ${footerDisclosures
        .map(
          (d) =>
            `<p class="mb-3.5 break-inside-avoid text-[0.75rem] leading-[1.75] text-white/50">${esc(d)}</p>`,
        )
        .join('\n      ')}
      <p class="mb-3.5 break-inside-avoid text-[0.75rem] leading-[1.75] text-white/50">${esc(site.disclosureLong)}</p>
    </div>
  </div>

  <div class="shell mt-8 border-t border-white/10 pt-7 pb-10">
    <nav aria-label="Legal">
      <ul class="flex flex-wrap gap-x-6 gap-y-3">
        ${legalPages
          .map(
            (p) =>
              `<li><a href="${home}legal/${p.slug}.html" class="inline-flex min-h-11 items-center text-[0.875rem] font-semibold text-white/78 transition-colors hover:text-gci-glacier-bright">${esc(p.title)}</a></li>`,
          )
          .join('\n        ')}
      </ul>
    </nav>
    <p class="mt-7 max-w-[78ch] text-[0.75rem] leading-[1.75] text-white/45">For compliance enquiries or complaints regarding this website, please call <a href="${site.phoneHref}" class="text-white/70 underline underline-offset-2">${esc(site.phoneDisplay)}</a>.</p>
    <p class="mt-3 max-w-[78ch] text-[0.75rem] leading-[1.75] text-white/45">© Independent Authorized Retailer of GCI. GCI and related marks are trademarks of GCI Communication Corp. All other trademarks are the property of their respective owners.</p>
  </div>
</footer>`;
}

/* ------------------------------------------------------------ page shell -- */

export function page({ title, description, body, home = '', ogImage }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#042046">
<title>${escAttr(title)}</title>
<meta name="description" content="${escAttr(description)}">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(description)}">
<meta property="og:type" content="website">
${ogImage ? `<meta property="og:image" content="${escAttr(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image" content="${escAttr(ogImage)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${home}assets/styles.css">
</head>
<body>
<a href="#top" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-gci-red focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-white">Skip to content</a>
${body}
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js"></script>
<script src="${home}assets/app.js"></script>
</body>
</html>
`;
}
