'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import {
  entryInternetPlan,
  featuredOffer,
  hero,
  heroInclusions,
  imageAssets,
  site,
  zipCheck,
} from '@/lib/content';
import AuroraField from '@/components/ui/AuroraField';
import Icon from '@/components/ui/Icon';
import MagneticButton from '@/components/ui/MagneticButton';
import PriceLockup from '@/components/ui/PriceLockup';
import { PhoneGlyph } from './Header';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------ ZIP check --- */

type ZipState = { kind: 'idle' } | { kind: 'invalid' } | { kind: 'served' } | { kind: 'outside' };

function ZipChecker() {
  const [zip, setZip] = useState('');
  const [state, setState] = useState<ZipState>({ kind: 'idle' });

  function check(e: React.FormEvent) {
    e.preventDefault();
    const clean = zip.replace(/\D/g, '');
    if (clean.length !== 5) return setState({ kind: 'invalid' });
    setState(
      zipCheck.statePrefixes.some((p) => clean.startsWith(p))
        ? { kind: 'served' }
        : { kind: 'outside' },
    );
  }

  const copy =
    state.kind === 'served'
      ? { title: zipCheck.successTitle, body: zipCheck.successBody, tone: 'good' as const }
      : state.kind === 'outside'
        ? { title: zipCheck.outOfStateTitle, body: zipCheck.outOfStateBody, tone: 'info' as const }
        : state.kind === 'invalid'
          ? { title: zipCheck.invalidTitle, body: zipCheck.invalidBody, tone: 'warn' as const }
          : null;

  return (
    <div className="w-full">
      <label
        htmlFor="zip"
        className="mb-2.5 block text-[0.8125rem] font-semibold tracking-[0.02em] text-gci-mid"
      >
        {hero.zipLabel}
      </label>

      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-gci-light"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-[1.15rem] w-[1.15rem]">
              <path
                d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </span>
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
              if (state.kind !== 'idle') setState({ kind: 'idle' });
            }}
            placeholder={hero.zipPlaceholder}
            aria-describedby="zip-result"
            className="h-[3.5rem] w-full rounded-full border border-gci-border bg-white pr-5 pl-13 font-medium text-gci-darkest shadow-[0_2px_10px_-6px_rgba(4,32,70,0.25)] transition-colors duration-300 placeholder:text-gci-light focus:border-gci-glacier focus:outline-none"
          />
        </div>

        <MagneticButton type="submit" variant="glacier" size="lg" strength={0.2}>
          Check availability
        </MagneticButton>
      </form>

      <div id="zip-result" aria-live="polite">
        <AnimatePresence mode="wait">
          {copy && (
            <motion.div
              key={state.kind}
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div
                className={`mt-4 rounded-2xl border bg-white p-4 ${
                  copy.tone === 'good'
                    ? 'border-gci-glacier'
                    : copy.tone === 'warn'
                      ? 'border-gci-border'
                      : 'border-gci-red/45'
                }`}
              >
                <p className="font-display text-[0.9375rem] font-bold text-gci-darkest">
                  {copy.title}
                </p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-gci-mid">{copy.body}</p>

                {state.kind === 'served' && (
                  <a
                    href={site.phoneHref}
                    className="mt-3 inline-flex items-center gap-2 font-display text-[0.875rem] font-bold text-gci-red underline decoration-gci-red/30 underline-offset-4 transition-colors hover:text-gci-red-hover"
                  >
                    <PhoneGlyph />
                    Call to order
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- hero --- */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const entryPlan = entryInternetPlan();

  // Parallax: the backdrop recedes more slowly than the copy layer
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section id="top" ref={ref} className="canvas-hero relative isolate overflow-hidden">
      {/* Photograph at full strength, with only the aurora canvas over it. */}
      <motion.div
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src={imageAssets.hero.src}
          alt={imageAssets.hero.alt}
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[58%_center] lg:object-center"
        />

        {/*
          A scrim confined to the copy column only.

          Measured against the photograph: with nothing here, body copy over
          the mountain ridge sits at 1.7:1 — below the 4.5:1 AA floor and
          genuinely hard to read. No crop fixes it, because this frame's bright
          region is featureless sky and its interesting region is too dark for
          dark text. So the wash covers the left 40% where the copy lives and
          is fully transparent past 56% — the ridge, the flats and everything
          around the offer card stay at full strength.
        */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0) 56%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.88) 100%)',
          }}
        />
        <AuroraField className="opacity-50" />
      </motion.div>

      <div className="shell">
        <div className="grid items-center gap-14 pt-14 pb-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 lg:pt-20 lg:pb-16">
          {/* ---- copy column ---- */}
          <div className="max-w-[40rem]">
            <div className="rise inline-flex items-center gap-2.5 rounded-full border border-gci-red/25 bg-white py-1.5 pr-4 pl-1.5 shadow-[0_2px_12px_-6px_rgba(183,18,52,0.4)]">
              <span className="shrink-0 rounded-full bg-gci-red px-2.5 py-1 text-[0.625rem] font-extrabold tracking-[0.12em] whitespace-nowrap text-white uppercase">
                {hero.medallion.eyebrow}
              </span>
              <span className="text-[0.8125rem] font-semibold text-gci-darkest">
                {featuredOffer.title}
              </span>
            </div>

            <h1
              style={{ '--delay': '0.08s' } as React.CSSProperties}
              className="rise display mt-6 text-[clamp(1.95rem,8.5vw,4.05rem)] text-gci-darkest"
            >
              {hero.headline}{' '}
              <span className="bg-gradient-to-r from-gci-glacier-deep to-gci-glacier bg-clip-text text-transparent">
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              style={{ '--delay': '0.18s' } as React.CSSProperties}
              className="rise mt-5 max-w-[34rem] text-[0.9375rem] leading-[1.68] sm:text-[1.0625rem] text-gci-mid"
            >
              {hero.subheadline}
            </p>

            {/*
              Price anchor sits inline with the copy rather than inside a card.
              It reuses PriceLockup, so the hero's "from" price can never drift
              away from the plan grid below.
            */}
            <div
              style={{ '--delay': '0.24s' } as React.CSSProperties}
              className="rise mt-7 flex items-center gap-4"
            >
              <p className="max-w-[6.5rem] text-[0.8125rem] leading-tight font-semibold text-gci-mid">
                {hero.priceAnchorLabel}
              </p>
              <PriceLockup plan={entryPlan} scale="lg" />
            </div>

            <div style={{ '--delay': '0.3s' } as React.CSSProperties} className="rise mt-8">
              <ZipChecker />
              <p className="mt-3 text-[0.75rem] font-medium text-gci-mid">
                {hero.zipReassurance}
              </p>
            </div>
          </div>

          {/* ---- offer medallion ---- */}
          <div
            style={{ '--delay': '0.34s', '--rise-from': '30px' } as React.CSSProperties}
            className="rise flex justify-center lg:justify-end"
          >
            {/*
              The medallion is the only thing in this column now, so it carries
              the emphasis on its own: a breathing glow, two counter-rotating
              dotted orbits and a lifted seal. It links to the offers rail
              rather than dialling — the header holds the call action.
            */}
            <a
              href="#offers"
              aria-label={`${featuredOffer.title} — see all current offers`}
              className="group relative block"
            >
              {/* breathing glow */}
              <span
                aria-hidden
                className="animate-glow absolute -inset-6 rounded-full bg-gci-red/25 blur-3xl sm:-inset-10"
              />

              {/* counter-rotating dotted orbits */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="animate-orbit absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] sm:-inset-[1.15rem] sm:h-[calc(100%+2.3rem)] sm:w-[calc(100%+2.3rem)]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#b71234"
                  strokeOpacity="0.45"
                  strokeWidth="0.5"
                  strokeDasharray="0.6 3.4"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="animate-orbit-reverse absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] sm:-inset-8 sm:h-[calc(100%+4rem)] sm:w-[calc(100%+4rem)]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#00a9e0"
                  strokeOpacity="0.4"
                  strokeWidth="0.35"
                  strokeDasharray="10 8"
                  strokeLinecap="round"
                />
              </svg>

              {/* the seal */}
              <div className="relative flex aspect-square w-[12rem] sm:w-[16rem] md:w-[18rem] lg:w-[clamp(16rem,28vw,21rem)] flex-col items-center justify-center rounded-full bg-gradient-to-br from-gci-red via-gci-red to-gci-red-deep px-8 text-center text-white shadow-[0_34px_80px_-26px_rgba(183,18,52,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(70% 60% at 30% 18%, rgba(49,204,255,0.34) 0%, transparent 62%)',
                  }}
                />
                {/* inner hairline, so the seal has an edge rather than a flat fill */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[0.4rem] rounded-full border border-white/20 sm:inset-[0.55rem]"
                />

                <p className="relative text-[0.625rem] font-extrabold tracking-[0.22em] text-white/80 uppercase">
                  {hero.medallion.eyebrow}
                </p>
                <p className="relative mt-2 font-display text-[0.9375rem] font-bold tracking-[-0.02em] sm:mt-3 sm:text-[1.125rem]">
                  {hero.medallion.product}
                </p>
                <p className="relative font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[clamp(2.9rem,6.4vw,4rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">
                  {hero.medallion.punch}
                </p>
                <p className="relative mt-2 max-w-[11rem] text-[0.6875rem] leading-snug text-white/80 sm:mt-3 sm:text-[0.75rem]">
                  {hero.medallion.qualifier}
                </p>

                <span className="relative mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] sm:mt-5 font-bold tracking-[0.08em] text-white/85 uppercase">
                  See all offers
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/*
        Inclusions run as a horizontal check-strip at the foot of the hero,
        which is how both reference sites carry them. Previously these were
        bullets inside the right-hand card.
      */}
      <div className="relative border-t border-gci-border bg-white">
        <ul className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
          {heroInclusions.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 shrink-0 text-gci-glacier-deep" />
              <span className="text-[0.8125rem] font-semibold text-gci-dark">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
