'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks, site } from '@/lib/content';
import MagneticButton from '@/components/ui/MagneticButton';

/* ------------------------------------------------------- disclosure bar --- */

/**
 * Charcoal utility bar, mirroring the strip that sits above the nav on
 * gci.com. It scrolls away; the white header below it is what sticks.
 */
export function DisclosureBar() {
  return (
    <div className="bg-gci-dark text-white">
      <div className="shell flex h-[var(--util-h)] items-center justify-center">
        <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-white/85 uppercase sm:tracking-[0.18em]">
          <span
            aria-hidden
            className="mr-2.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-gci-glacier-bright align-middle"
          />
          {site.disclosureShort}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- mark --- */

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="-my-1 flex items-center gap-2.5 py-1" aria-label={`${site.brandName} — home`}>
      <span className="flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
          <defs>
            <linearGradient id="mk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00a9e0" />
              <stop offset="52%" stopColor="#31ccff" />
              <stop offset="100%" stopColor="#b71234" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#mk)" strokeWidth="2.5" />
          <path
            d="M12 25.5 L18.5 14 L21.5 20.5 L28 12"
            fill="none"
            stroke="url(#mk)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.375rem] font-extrabold tracking-[-0.04em] text-gci-red">
          {site.brandName}
        </span>
        {!compact && (
          <span className="mt-[0.3rem] block text-[0.625rem] font-bold tracking-[0.14em] text-gci-mid uppercase">
            {site.brandSuffix}
          </span>
        )}
      </span>
    </a>
  );
}

/* --------------------------------------------------------------- header --- */

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav item for whichever service section owns the viewport
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    // Track which service sections are on screen so the highlight clears once
    // the reader is past them, rather than leaving the last one stuck lit.
    const onScreen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onScreen.add(e.target.id);
          else onScreen.delete(e.target.id);
        }
        setActive(ids.find((id) => onScreen.has(id)) ?? '');
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/*
        Solid white from the first paint. The header no longer fades from
        transparent over a dark hero, which is what produced the visible seam
        between the utility bar and the hero canvas.
      */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          elevated ? 'shadow-[0_1px_0_0_#e1e4ea,0_8px_24px_-18px_rgba(4,32,70,0.3)]' : ''
        }`}
      >
        <div className="shell flex h-[var(--head-h)] items-center justify-between gap-6">
          <Wordmark />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Service lines">
            {[...navLinks, { href: '#offers', label: 'Deals' }, { href: '#faq', label: 'FAQ' }].map(
              (l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`relative rounded-full px-4 py-2 text-[0.875rem] font-semibold transition-colors duration-300 ${
                      isActive ? 'text-gci-red' : 'text-gci-dark hover:text-gci-red'
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gci-red/8"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                );
              },
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton
                href={site.phoneHref}
                variant="red"
                size="sm"
                ariaLabel={`Call ${site.phoneDisplay}`}
              >
                <PhoneGlyph />
                Call {site.phoneDisplay}
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gci-border text-gci-darkest transition-colors hover:border-gci-light lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-gci-midnight/45 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[var(--head-h)] mx-4 rounded-3xl border border-gci-border bg-white p-6 shadow-2xl"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-1">
                {[
                  ...navLinks,
                  { href: '#offers', label: 'Deals' },
                  { href: '#faq', label: 'FAQ' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-bold tracking-[-0.02em] text-gci-darkest transition-colors hover:bg-gci-lightest"
                    >
                      {l.label}
                      <span aria-hidden className="text-gci-glacier">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-gci-border pt-5">
                <a
                  href={site.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gci-red py-4 font-display font-bold text-white transition-colors hover:bg-gci-red-hover"
                >
                  <PhoneGlyph />
                  Call {site.phoneDisplay}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function PhoneGlyph({ className = 'h-[0.95em] w-[0.95em]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
