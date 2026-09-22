'use client';

import { footerDisclosures, footerNav, legalPages, site } from '@/lib/content';
import MagneticButton from '@/components/ui/MagneticButton';
import { PhoneGlyph } from './Header';

/**
 * Deep-navy legal footer.
 *
 * Structure follows the reference layout: a four-column top band (brand,
 * two link columns, a contact column carrying the phone number), a full
 * required-disclosures block, then a bottom bar with the eight legal pages
 * and the retailer copyright.
 */
export default function Footer() {
  return (
    <footer className="canvas-midnight-deep relative isolate text-white">
      {/* ---------------- CTA band ---------------- */}
      <div className="border-b border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-7 py-12 lg:flex-row lg:items-center lg:py-14">
          <div>
            <h2 className="display text-[clamp(1.4rem,5.5vw,2.35rem)] text-white">
              Ready to get connected?
            </h2>
            <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-white/65">
              We will confirm what is available at your address, review the plan tiers with you,
              and complete the order on the same call.
            </p>
          </div>

          <div className="shrink-0">
            <MagneticButton href={site.phoneHref} variant="red" size="lg">
              <PhoneGlyph />
              Call to order
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ---------------- top: brand + nav + contact ---------------- */}
      <div className="shell grid gap-10 py-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        {/* brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
              <defs>
                <linearGradient id="fmk" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#31ccff" />
                  <stop offset="52%" stopColor="#00a9e0" />
                  <stop offset="100%" stopColor="#b71234" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#fmk)" strokeWidth="2.5" />
              <path
                d="M12 25.5 L18.5 14 L21.5 20.5 L28 12"
                fill="none"
                stroke="url(#fmk)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="leading-none">
              <span className="block font-display text-[1.375rem] font-extrabold tracking-[-0.04em] text-white">
                {site.brandName}
              </span>
              <span className="mt-[0.3rem] block text-[0.625rem] font-bold tracking-[0.14em] text-white/55 uppercase">
                {site.brandSuffix}
              </span>
            </span>
          </div>

          <p className="mt-6 max-w-[24rem] text-[0.875rem] leading-[1.7] text-white/62">
            Independent authorized retailer helping Alaskans order GCI Internet, Mobile and Home
            Phone service.
          </p>
        </div>

        {/* link columns */}
        {footerNav.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-[0.75rem] font-extrabold tracking-[0.14em] text-white/50 uppercase">
              {col.heading}
            </h2>
            <ul className="mt-5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <a
                    href={l.href}
                    className="flex min-h-11 items-center text-[0.875rem] text-white/78 transition-colors hover:text-gci-glacier-bright"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* contact */}
        <div>
          <h2 className="text-[0.75rem] font-extrabold tracking-[0.14em] text-white/50 uppercase">
            Talk to a human
          </h2>
          <a
            href={site.phoneHref}
            className="mt-4 inline-flex min-h-11 items-center font-display text-[1.375rem] font-extrabold tracking-[-0.03em] text-white transition-colors hover:text-gci-glacier-bright"
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/58">{site.hours}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/58">{site.address}</p>
        </div>
      </div>

      {/* ---------------- required disclosures ---------------- */}
      <div className="shell border-t border-white/12 pt-8 pb-2">
        <h2 className="text-[0.75rem] font-extrabold tracking-[0.15em] text-white/62 uppercase">
          Offer details &amp; required disclosures
        </h2>
        <div className="mt-5 space-y-3.5 lg:columns-2 lg:gap-10 lg:space-y-0">
          {footerDisclosures.map((d, i) => (
            <p key={i} className="mb-3.5 break-inside-avoid text-[0.75rem] leading-[1.75] text-white/50">
              {d}
            </p>
          ))}
          <p className="mb-3.5 break-inside-avoid text-[0.75rem] leading-[1.75] text-white/50">
            {site.disclosureLong}
          </p>
        </div>
      </div>

      {/* ---------------- bottom: legal + copyright ---------------- */}
      <div className="shell mt-8 border-t border-white/10 pt-7 pb-10">
        <nav aria-label="Legal">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {legalPages.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/legal/${p.slug}`}
                  className="inline-flex min-h-11 items-center text-[0.875rem] font-semibold text-white/78 transition-colors hover:text-gci-glacier-bright"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-7 max-w-[78ch] text-[0.75rem] leading-[1.75] text-white/45">
          For compliance enquiries or complaints regarding this website, please call{' '}
          <a href={site.phoneHref} className="text-white/70 underline underline-offset-2">
            {site.phoneDisplay}
          </a>
          .
        </p>

        <p className="mt-3 max-w-[78ch] text-[0.75rem] leading-[1.75] text-white/45">
          © Independent Authorized Retailer of GCI. GCI and related marks are trademarks
          of GCI Communication Corp. All other trademarks are the property of their respective
          owners.
        </p>
      </div>
    </footer>
  );
}
