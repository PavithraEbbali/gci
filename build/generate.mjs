/* =============================================================================
 *  Static HTML generator.
 *
 *  Reads the same data the Next app reads (lib/content.ts, lib/legal.ts, via
 *  esbuild bundles) and emits plain HTML. Nothing is retyped by hand, so the
 *  static build cannot drift from the app's content.
 * ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import * as C from './content.mjs';
import * as L from './legal.mjs';
import { esc, escAttr, icon, phoneGlyph, priceLockup, disclosureBar, header, footer, page } from './lib.mjs';

const OUT = path.resolve('html');
const img = (a) => a.src.replace('/images/', 'assets/images/');

/* ---------------------------------------------------------------- hero --- */

function heroSection() {
  const { hero, featuredOffer, imageAssets, heroInclusions, zipCheck } = C;
  const entry = C.entryInternetPlan();

  return `<section id="top" class="canvas-hero relative isolate overflow-hidden">
  <div id="hero-bg" class="absolute inset-0 -z-10 will-change-transform">
    <img src="${img(imageAssets.hero)}" alt="" fetchpriority="high" decoding="async"
      class="absolute inset-0 h-full w-full scale-105 object-cover object-[58%_center] lg:object-center">

    <div aria-hidden="true" class="absolute inset-0 hidden lg:block" style="background:linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.88) 38%, rgba(255,255,255,0) 56%)"></div>
    <div aria-hidden="true" class="absolute inset-0 lg:hidden" style="background:linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.88) 100%)"></div>
    <canvas id="aurora" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full opacity-50"></canvas>
  </div>

  <div class="shell">
    <div class="grid items-center gap-14 pt-14 pb-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10 lg:pt-20 lg:pb-16">
      <div class="max-w-[40rem]">
        <div class="rise inline-flex items-center gap-2.5 rounded-full border border-gci-red/25 bg-white py-1.5 pr-4 pl-1.5 shadow-[0_2px_12px_-6px_rgba(183,18,52,0.4)]">
          <span class="shrink-0 rounded-full bg-gci-red px-2.5 py-1 text-[0.625rem] font-extrabold tracking-[0.12em] whitespace-nowrap text-white uppercase">${esc(hero.medallion.eyebrow)}</span>
          <span class="text-[0.8125rem] font-semibold text-gci-darkest">${esc(featuredOffer.title)}</span>
        </div>

        <h1 style="--delay:0.08s" class="rise display mt-6 text-[clamp(1.95rem,8.5vw,4.05rem)] text-gci-darkest">
          ${esc(hero.headline)} <span class="bg-gradient-to-r from-gci-glacier-deep to-gci-glacier bg-clip-text text-transparent">${esc(hero.headlineAccent)}</span>
        </h1>

        <p style="--delay:0.18s" class="rise mt-5 max-w-[34rem] text-[0.9375rem] leading-[1.68] sm:text-[1.0625rem] text-gci-mid">${esc(hero.subheadline)}</p>

        <div style="--delay:0.24s" class="rise mt-7 flex items-center gap-4">
          <p class="max-w-[6.5rem] text-[0.8125rem] leading-tight font-semibold text-gci-mid">${esc(hero.priceAnchorLabel)}</p>
          ${priceLockup(entry, 'lg')}
        </div>

        <div style="--delay:0.3s" class="rise mt-8">
          <div class="w-full">
            <label for="zip" class="mb-2.5 block text-[0.8125rem] font-semibold tracking-[0.02em] text-gci-mid">${esc(hero.zipLabel)}</label>
            <form id="zip-form" class="flex flex-col gap-3 sm:flex-row" novalidate>
              <div class="relative flex-1">
                <span aria-hidden="true" class="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-gci-light">
                  <svg viewBox="0 0 24 24" fill="none" class="h-[1.15rem] w-[1.15rem]"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.7"/></svg>
                </span>
                <input id="zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5"
                  placeholder="${escAttr(hero.zipPlaceholder)}" aria-describedby="zip-result"
                  class="h-[3.5rem] w-full rounded-full border border-gci-border bg-white pr-5 pl-13 font-medium text-gci-darkest shadow-[0_2px_10px_-6px_rgba(4,32,70,0.25)] transition-colors duration-300 placeholder:text-gci-light focus:border-gci-glacier focus:outline-none">
              </div>
              <div class="magnetic inline-block will-change-transform" data-strength="0.2">
                <button type="submit" class="relative inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-full bg-gci-glacier px-9 font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_10px_34px_-10px_rgba(0,169,224,0.7)] transition-colors duration-300 select-none hover:bg-gci-glacier-deep">
                  <span class="magnetic-label relative z-10 flex items-center gap-2">Check availability</span>
                </button>
              </div>
            </form>
            <div id="zip-result" aria-live="polite"></div>
          </div>
          <p class="mt-3 text-[0.75rem] font-medium text-gci-mid">${esc(hero.zipReassurance)}</p>
        </div>
      </div>

      <div style="--delay:0.34s;--rise-from:30px" class="rise flex justify-center lg:justify-end">
        <a href="#offers" aria-label="${escAttr(featuredOffer.title)} — see all current offers" class="group relative block">
          <span aria-hidden="true" class="animate-glow absolute -inset-6 rounded-full bg-gci-red/25 blur-3xl sm:-inset-10"></span>

          <svg aria-hidden="true" viewBox="0 0 100 100" class="animate-orbit absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] sm:-inset-[1.15rem] sm:h-[calc(100%+2.3rem)] sm:w-[calc(100%+2.3rem)]">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#b71234" stroke-opacity="0.45" stroke-width="0.5" stroke-dasharray="0.6 3.4" stroke-linecap="round"/>
          </svg>
          <svg aria-hidden="true" viewBox="0 0 100 100" class="animate-orbit-reverse absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] sm:-inset-8 sm:h-[calc(100%+4rem)] sm:w-[calc(100%+4rem)]">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#00a9e0" stroke-opacity="0.4" stroke-width="0.35" stroke-dasharray="10 8" stroke-linecap="round"/>
          </svg>

          <div class="relative flex aspect-square w-[12rem] sm:w-[16rem] md:w-[18rem] lg:w-[clamp(16rem,28vw,21rem)] flex-col items-center justify-center rounded-full bg-gradient-to-br from-gci-red via-gci-red to-gci-red-deep px-8 text-center text-white shadow-[0_34px_80px_-26px_rgba(183,18,52,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]">
            <span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-full" style="background:radial-gradient(70% 60% at 30% 18%, rgba(49,204,255,0.34) 0%, transparent 62%)"></span>
            <span aria-hidden="true" class="pointer-events-none absolute inset-[0.4rem] rounded-full border border-white/20 sm:inset-[0.55rem]"></span>
            <p class="relative text-[0.625rem] font-extrabold tracking-[0.22em] text-white/80 uppercase">${esc(hero.medallion.eyebrow)}</p>
            <p class="relative mt-2 font-display text-[0.9375rem] font-bold tracking-[-0.02em] sm:mt-3 sm:text-[1.125rem]">${esc(hero.medallion.product)}</p>
            <p class="relative font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[clamp(2.9rem,6.4vw,4rem)] leading-[0.9] font-extrabold tracking-[-0.05em]">${esc(hero.medallion.punch)}</p>
            <p class="relative mt-2 max-w-[11rem] text-[0.6875rem] leading-snug text-white/80 sm:mt-3 sm:text-[0.75rem]">${esc(hero.medallion.qualifier)}</p>
            <span class="relative mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] sm:mt-5 font-bold tracking-[0.08em] text-white/85 uppercase">See all offers <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-0.5">→</span></span>
          </div>
        </a>
      </div>
    </div>
  </div>

  <div class="relative border-t border-gci-border bg-white">
    <ul class="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
      ${heroInclusions
        .map(
          (i) =>
            `<li class="flex items-center gap-2">${icon('check', 'h-4 w-4 shrink-0 text-gci-glacier-deep')}<span class="text-[0.8125rem] font-semibold text-gci-dark">${esc(i)}</span></li>`,
        )
        .join('\n      ')}
    </ul>
  </div>
</section>

<script id="zip-data" type="application/json">${JSON.stringify({
    prefixes: zipCheck.statePrefixes,
    served: { t: zipCheck.successTitle, b: zipCheck.successBody },
    outside: { t: zipCheck.outOfStateTitle, b: zipCheck.outOfStateBody },
    invalid: { t: zipCheck.invalidTitle, b: zipCheck.invalidBody },
    phone: C.site.phoneHref,
  })}</script>`;
}

/* -------------------------------------------------------------- marquee --- */

function marquee(items, speed, separator, itemClass) {
  const track = [...items, ...items]
    .map(
      (it) =>
        `<span class="flex shrink-0 items-center ${itemClass}"><span class="whitespace-nowrap">${esc(it)}</span><span aria-hidden="true" class="mx-6 text-[0.5em] opacity-45">${esc(separator)}</span></span>`,
    )
    .join('');
  return `<div class="marquee-host marquee-mask relative overflow-hidden">
  <div class="animate-marquee flex w-max items-center" style="--marquee-duration:${speed}s">${track}</div>
</div>`;
}

/* --------------------------------------------------------------- offers --- */

function offersSection() {
  const { specialOffers, trustMarkers, site } = C;
  const [lead, ...rest] = specialOffers;

  return `<div class="border-b border-gci-border bg-gci-lightest py-4">
  ${marquee(trustMarkers, 56, '◆', 'font-display text-[0.8125rem] font-bold uppercase tracking-[0.13em] text-gci-mid')}
</div>

<div class="wipe">
<section id="offers" class="canvas-white relative isolate">
  <div class="shell section-pad">
    <div class="max-w-[44rem]">
      <p class="eyebrow text-gci-red reveal">Current offers</p>
      <h2 class="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest reveal" style="--delay:0.05s">Current promotions and device offers</h2>
      <p class="mt-5 text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid reveal" style="--delay:0.12s">Device and service promotions available on GCI accounts today. Trade-in offers require a qualifying device and, where noted, an eligible GCI Internet plan.</p>
    </div>

    <div class="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-6">
      <div class="reveal">
        <div class="tilt group/tilt h-full" data-max="5">
          <article class="tilt-inner relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gci-red p-8 text-white lg:p-10">
            <img src="${img(C.imageAssets.offers)}" alt="" loading="lazy" decoding="async"
              class="absolute inset-0 h-full w-full object-cover object-[58%_30%] opacity-80 mix-blend-luminosity">
            <span aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gci-red/55"></span>
            <span aria-hidden="true" class="pointer-events-none absolute inset-0" style="background:linear-gradient(160deg, rgba(183,18,52,0.18) 0%, rgba(183,18,52,0.72) 52%, rgba(128,13,36,0.92) 100%)"></span>
            <span aria-hidden="true" class="pointer-events-none absolute inset-0" style="background:radial-gradient(75% 65% at 88% 10%, rgba(49,204,255,0.26) 0%, transparent 62%)"></span>
            <div class="relative">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white/18">${icon(lead.icon, 'h-[1.35rem] w-[1.35rem] text-white')}</span>
                ${lead.kicker ? `<span class="inline-flex rounded-full bg-white/18 px-3 py-1 text-[0.625rem] font-extrabold tracking-[0.14em] uppercase">${esc(lead.kicker)}</span>` : ''}
              </div>
              <h3 class="display mt-5 text-[clamp(1.35rem,5.5vw,2.25rem)] text-white">${esc(lead.title)}</h3>
              <p class="mt-4 max-w-[26rem] text-[0.9375rem] leading-relaxed text-white/85">${esc(lead.detail)}</p>
              ${
                lead.points
                  ? `<ul class="mt-7 space-y-3.5 border-t border-white/22 pt-7">${lead.points
                      .map(
                        (pt) =>
                          `<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"></span><span class="text-[0.875rem] leading-relaxed text-white/80">${esc(pt)}</span></li>`,
                      )
                      .join('')}</ul>`
                  : ''
              }
            </div>
            <div class="relative mt-9">
              <div class="magnetic inline-block will-change-transform" data-strength="0.2">
                <a href="${site.phoneHref}" class="relative inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-full bg-white px-9 font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap text-gci-midnight shadow-[0_10px_34px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300 select-none hover:bg-gci-lightest">
                  <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}Call to order</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="stagger grid gap-4 sm:grid-cols-2">
        ${rest
          .map(
            (o) => `<div class="stagger-item h-full">
          <article class="card flex h-full flex-col rounded-[1.25rem] p-6">
            <div class="mb-3 flex items-center justify-between gap-3">
              ${o.kicker ? `<span class="inline-flex w-fit rounded-full bg-gci-lightest px-2.5 py-1 text-[0.5625rem] font-extrabold tracking-[0.14em] text-gci-mid uppercase">${esc(o.kicker)}</span>` : '<span></span>'}
              ${icon(o.icon, 'h-[1.15rem] w-[1.15rem] shrink-0 text-gci-light')}
            </div>
            <h3 class="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] text-gci-darkest">${esc(o.title)}</h3>
            <p class="mt-2.5 text-[0.8125rem] leading-relaxed text-gci-mid">${esc(o.detail)}</p>
            <a href="${site.phoneHref}" class="mt-auto flex items-center gap-2 pt-5 font-display text-[0.8125rem] font-bold text-gci-red transition-colors hover:text-gci-red-hover">${phoneGlyph()}Call to order</a>
          </article>
        </div>`,
          )
          .join('\n        ')}
      </div>
    </div>

    <p class="mt-9 max-w-[52rem] text-[0.8125rem] leading-relaxed text-gci-mid/90 reveal" style="--delay:0.1s">All offers are limited-time and subject to change, availability, credit approval and qualification. Trade-in values depend on device model and condition. Device promotions are applied as monthly bill credits over a financing term; cancelling service early makes the remaining device balance due.</p>
  </div>
</section>
</div>`;
}

/* ------------------------------------------------------------ speed path --- */

const SPEED_PATHS = [
  { d: 'M0,150 C160,150 200,44 380,44 C560,44 610,44 760,44', color: '#31ccff', w: 2.25, cy: 44 },
  { d: 'M0,150 C170,150 220,100 400,100 C580,100 640,100 760,100', color: '#00a9e0', w: 1.75, cy: 100 },
  { d: 'M0,150 C180,150 240,152 420,152 C600,152 660,152 760,152', color: '#5e636e', w: 1.4, cy: 152 },
  { d: 'M0,150 C190,150 250,206 440,206 C620,206 680,206 760,206', color: '#b71234', w: 1.4, cy: 206 },
];

function speedPath(cls) {
  return `<svg viewBox="0 0 760 250" fill="none" aria-hidden="true" preserveAspectRatio="none" class="speedpath ${cls}">
  <defs>
    <linearGradient id="sp-fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="18%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="1"/></linearGradient>
    <mask id="sp-mask"><rect width="760" height="250" fill="url(#sp-fade)"/></mask>
  </defs>
  <g mask="url(#sp-mask)">
    ${SPEED_PATHS.map(
      (p, i) =>
        `<path class="sp-line" d="${p.d}" stroke="${p.color}" stroke-width="${p.w}" stroke-linecap="round" style="--sp-delay:${i * 0.16}s;--sp-opacity:${i === 0 ? 0.95 : 0.55}"/>`,
    ).join('\n    ')}
    ${SPEED_PATHS.map(
      (p, i) =>
        `<circle class="sp-node" cx="752" cy="${p.cy}" r="${i === 0 ? 5 : 3.5}" fill="${p.color}" style="--sp-delay:${1.35 + i * 0.16}s;transform-origin:752px ${p.cy}px"/>`,
    ).join('\n    ')}
    <circle cx="4" cy="150" r="4" fill="#31ccff" opacity="0.9"/>
  </g>
</svg>`;
}

/* ---------------------------------------------------------- plan section --- */

function speedStat(label, mbps, colorCls, direction) {
  const { value, unit } = C.splitSpeed(mbps);
  return `<div class="min-w-0">
  <p class="flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-gci-mid uppercase">${icon(direction, 'h-3.5 w-3.5 shrink-0')}${label}</p>
  <p class="mt-1.5 font-display text-[1.375rem] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap ${colorCls}">${value}<span class="ml-[0.15em] text-[0.6em] font-bold tracking-[-0.01em]">${unit}</span></p>
</div>`;
}

function planCard(plan, iconName) {
  const featured = Boolean(plan.isPopular);
  const label = C.ctaLabel(plan);
  return `<div class="tilt group/tilt h-full">
  <div class="tilt-inner relative flex h-full flex-col rounded-[1.5rem] p-6 lg:p-7 ${featured ? 'card-featured' : 'card'}">
    <div class="mb-5 flex h-7 items-center justify-between gap-3">
      ${
        plan.badge
          ? `<span class="inline-flex h-7 items-center rounded-full px-3 text-[0.625rem] font-extrabold tracking-[0.13em] uppercase ${featured ? 'bg-gci-red text-white' : 'bg-gci-lightest text-gci-mid'}">${esc(plan.badge)}</span>`
          : '<span aria-hidden="true"></span>'
      }
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${featured ? 'bg-gci-red/10 text-gci-red' : 'bg-gci-lightest text-gci-glacier-deep'}">${icon(iconName, 'h-[1.1rem] w-[1.1rem]')}</span>
    </div>

    <h3 class="flex min-h-[3.4rem] items-start font-display text-[1.375rem] leading-[1.2] font-extrabold tracking-[-0.032em] text-gci-darkest lg:text-[1.5rem]">${esc(plan.name)}</h3>
    ${plan.tagline ? `<p class="mt-2.5 min-h-[4.2rem] text-[0.875rem] leading-relaxed text-gci-mid">${esc(plan.tagline)}</p>` : ''}

    ${
      typeof plan.speedDown === 'number'
        ? `<div class="mt-6 grid grid-cols-2 gap-4 border-t border-gci-border pt-5">
      ${speedStat('Download', plan.speedDown, 'text-gci-glacier-deep', 'download')}
      ${typeof plan.speedUp === 'number' ? speedStat('Upload', plan.speedUp, 'text-gci-darkest', 'upload') : ''}
    </div>`
        : ''
    }

    <div class="mt-6 border-t border-gci-border pt-6">${priceLockup(plan, featured ? 'lg' : 'md')}</div>

    <ul class="mt-6 space-y-3 border-t border-gci-border pt-6">
      ${plan.features
        .map(
          (f) =>
            `<li class="flex gap-2.5">${icon('check', 'mt-[0.15rem] h-4 w-4 shrink-0 text-gci-glacier-deep')}<span class="text-[0.8125rem] leading-relaxed text-gci-dark">${esc(f)}</span></li>`,
        )
        .join('\n      ')}
    </ul>

    ${
      plan.dataPolicy || plan.contractTerm || plan.equipmentFee
        ? `<div class="mt-6 flex flex-wrap gap-2">${[plan.dataPolicy, plan.contractTerm, plan.equipmentFee]
            .filter(Boolean)
            .map(
              (c) =>
                `<span class="rounded-full bg-gci-lightest px-2.5 py-1 text-[0.6875rem] font-semibold text-gci-mid">${esc(c)}</span>`,
            )
            .join('')}</div>`
        : ''
    }

    <div class="mt-auto pt-7">
      <div class="magnetic block will-change-transform" data-strength="0.18">
        <a href="${C.site.phoneHref}" aria-label="${escAttr(label)} — ${escAttr(plan.name)}"
          class="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 font-display text-[0.9375rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 select-none ${
            featured
              ? 'bg-gci-red text-white shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)] hover:bg-gci-red-hover'
              : 'border border-gci-light bg-transparent text-gci-darkest hover:border-gci-midnight hover:bg-white'
          }">
          <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}${esc(label)}</span>
        </a>
      </div>
    </div>
  </div>
</div>`;
}

function planSection(section) {
  const plans = C.plansFor(section.serviceLine);
  if (!plans.length) return '';
  const photo = C.sectionImage(section.serviceLine);
  const cols = plans.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4';
  const isFiber = section.serviceLine === 'fiber';

  return `<div class="wipe">
<section id="${section.id}" class="relative isolate ${section.theme === 'tint' ? 'canvas-tint' : 'canvas-white'}">
  <div class="shell section-pad relative">
    <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
      <div class="max-w-[40rem]">
        <p class="eyebrow flex items-center gap-2 text-gci-red reveal">${icon(section.icon, 'h-4 w-4 shrink-0')}${esc(section.eyebrow)}</p>
        <h2 class="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest reveal" style="--delay:0.05s">${esc(section.heading)}</h2>
        <p class="mt-5 text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid reveal" style="--delay:0.12s">${esc(section.subheading)}</p>
      </div>
      ${
        photo
          ? `<div class="reveal" style="--delay:0.1s">
        <figure class="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-[0_28px_64px_-34px_rgba(4,32,70,0.45)]">
          <img src="${img(photo)}" alt="${escAttr(photo.alt)}" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover">
        </figure>
      </div>`
          : ''
      }
    </div>

    ${isFiber ? `<div aria-hidden="true" class="mt-12 hidden lg:block">${speedPath('h-[130px] w-full opacity-80')}</div>` : ''}

    <div class="stagger mt-14 grid gap-5 lg:gap-6 ${isFiber ? 'lg:mt-8' : 'lg:mt-16'} ${cols}">
      ${plans.map((p) => `<div class="stagger-item h-full">${planCard(p, section.icon)}</div>`).join('\n      ')}
    </div>

    ${section.footnote ? `<p class="mt-9 max-w-[52rem] text-[0.8125rem] leading-relaxed text-gci-mid/90 reveal" style="--delay:0.1s">${esc(section.footnote)}</p>` : ''}
  </div>
</section>
</div>`;
}

/* ----------------------------------------------------------- fine print --- */

const FP_COLS = [
  { key: 'fiber', label: 'Fiber+ Internet' },
  { key: 'bundle', label: 'GCI+ Bundles' },
  { key: 'mobile', label: 'GCI Mobile' },
  { key: 'phone', label: 'Home Phone' },
];

function finePrintSection() {
  const rows = C.finePrint;
  const cell = (v) =>
    v === 'None'
      ? `<span class="inline-flex items-center gap-1.5 font-semibold text-gci-glacier-deep">${icon('check', 'h-3.5 w-3.5')}${esc(v)}</span>`
      : `<span class="text-gci-dark">${esc(v)}</span>`;

  return `<div class="wipe">
<section id="fine-print" class="canvas-white relative isolate">
  <div class="shell section-pad">
    <div class="max-w-[44rem]">
      <p class="eyebrow text-gci-red reveal">Inclusions and fees</p>
      <h2 class="display mt-5 text-[clamp(1.6rem,6vw,3.25rem)] text-gci-darkest reveal" style="--delay:0.05s">Every charge, shown side by side</h2>
      <p class="mt-6 text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid reveal" style="--delay:0.12s">Every recurring and one-time charge associated with a GCI residential order, compared across all four service lines so nothing has to be looked up separately.</p>
    </div>

    <div class="mt-14 hidden overflow-hidden rounded-[1.5rem] border border-gci-border lg:block reveal" style="--delay:0.16s">
      <table class="w-full border-collapse text-left">
        <caption class="sr-only">Inclusions and fees compared across GCI service lines</caption>
        <thead>
          <tr class="bg-gci-midnight">
            <th scope="col" class="w-[26%] px-6 py-5 font-display text-[0.75rem] font-bold tracking-[0.14em] text-white/55 uppercase">Inclusion or fee</th>
            ${FP_COLS.map((c) => `<th scope="col" class="px-6 py-5 font-display text-[0.8125rem] font-extrabold tracking-[-0.01em] text-white">${esc(c.label)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r, i) => `<tr class="border-t border-gci-border transition-colors duration-200 hover:bg-gci-lightest/70 ${i % 2 ? 'bg-gci-lightest/35' : 'bg-white'}">
            <th scope="row" class="px-6 py-4 font-display text-[0.875rem] font-bold text-gci-darkest">${esc(r.label)}</th>
            ${FP_COLS.map((c) => `<td class="px-6 py-4 text-[0.875rem]">${cell(r[c.key])}</td>`).join('')}
          </tr>`,
            )
            .join('\n          ')}
        </tbody>
      </table>
    </div>

    <div class="mt-12 space-y-4 lg:hidden">
      ${FP_COLS.map(
        (c, ci) => `<div class="reveal" style="--delay:${(ci * 0.05).toFixed(2)}s">
        <div class="overflow-hidden rounded-2xl border border-gci-border">
          <p class="bg-gci-midnight px-5 py-3.5 font-display text-[0.9375rem] font-extrabold text-white">${esc(c.label)}</p>
          <dl class="divide-y divide-gci-border">
            ${rows
              .map(
                (r) => `<div class="flex items-start justify-between gap-5 px-5 py-3">
              <dt class="text-[0.8125rem] font-semibold text-gci-mid">${esc(r.label)}</dt>
              <dd class="text-right text-[0.8125rem] ${r[c.key] === 'None' ? 'font-semibold text-gci-glacier-deep' : 'text-gci-darkest'}">${esc(r[c.key])}</dd>
            </div>`,
              )
              .join('')}
          </dl>
        </div>
      </div>`,
      ).join('\n      ')}
    </div>
  </div>
</section>
</div>`;
}

/* --------------------------------------------------------------- why GCI --- */

function whySection() {
  return `<div class="wipe">
<section id="why-gci" class="canvas-tint relative isolate overflow-hidden">
  <div class="parallax pointer-events-none absolute inset-0 -z-10" data-distance="80">
    <div class="absolute top-[10%] -left-[14%] h-[32rem] w-[32rem] rounded-full bg-gci-glacier/12 blur-[120px]"></div>
    <div class="absolute right-[-12%] bottom-[6%] h-[28rem] w-[28rem] rounded-full bg-gci-red/8 blur-[130px]"></div>
  </div>

  <div class="shell section-pad">
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-end lg:gap-16">
      <div>
        <p class="eyebrow text-gci-red reveal">Why Alaskans choose GCI</p>
        <h2 class="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest reveal" style="--delay:0.05s">Four decades of network <span class="bg-gradient-to-r from-gci-glacier-deep to-gci-glacier bg-clip-text text-transparent">investment in Alaska.</span></h2>
      </div>
      <p class="max-w-[34rem] text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid reveal" style="--delay:0.12s">Serving a state one-fifth the size of the Lower 48, with a fraction of its road network, requires subsea cable, microwave relay and fiber installed through permafrost. GCI has invested in that infrastructure since 1979, which is what extends multi-gigabit capability to communities of every size.</p>
    </div>

    <div class="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
      <div class="stagger-item h-full sm:col-span-2">
        <figure class="relative h-full min-h-[17rem] overflow-hidden rounded-[1.5rem] shadow-[0_28px_64px_-34px_rgba(4,32,70,0.45)]">
          <img src="${img(C.imageAssets.network)}" alt="${escAttr(C.imageAssets.network.alt)}" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover">
          <span aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-gci-midnight/88 via-gci-midnight/25 to-transparent"></span>
          <figcaption class="absolute inset-x-0 bottom-0 p-6 lg:p-7">
            <p class="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.025em] text-white">Nearly 15,000 miles of fiber, maintained year-round</p>
            <p class="mt-1.5 max-w-[26rem] text-[0.8125rem] leading-relaxed text-white/75">Splice crews work the backbone through freeze and thaw.</p>
          </figcaption>
        </figure>
      </div>

      ${C.whyGci
        .map(
          (f) => `<div class="stagger-item h-full">
        <article class="card group relative h-full overflow-hidden rounded-[1.5rem] p-7">
          <span aria-hidden="true" class="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gci-glacier to-transparent transition-transform duration-700 group-hover:scale-x-100"></span>
          <div class="flex items-start justify-between gap-4">
            ${f.metric ? `<p class="font-display text-[2.75rem] leading-none font-extrabold tracking-[-0.05em] text-gci-glacier-deep">${esc(f.metric)}</p>` : ''}
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gci-lightest text-gci-glacier-deep">${icon(f.icon, 'h-[1.15rem] w-[1.15rem]')}</span>
          </div>
          <h3 class="mt-5 font-display text-[1.125rem] font-bold tracking-[-0.025em] text-gci-darkest">${esc(f.title)}</h3>
          <p class="mt-3 text-[0.875rem] leading-[1.7] text-gci-mid">${esc(f.body)}</p>
        </article>
      </div>`,
        )
        .join('\n      ')}
    </div>

    <div class="reveal" style="--delay:0.1s">
      <div class="canvas-midnight-deep relative isolate mt-14 flex flex-col items-start justify-between gap-7 overflow-hidden rounded-[1.75rem] p-8 lg:mt-16 lg:flex-row lg:items-center lg:p-10">
        <img src="${img(C.imageAssets.og)}" alt="" loading="lazy" decoding="async" class="absolute inset-0 -z-10 h-full w-full object-cover object-center">
        <span aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-gci-midnight/78"></span>
        <div class="max-w-[36rem]">
          <h3 class="display text-[clamp(1.25rem,5vw,1.95rem)] text-white">Confirm what is available at your address</h3>
          <p class="mt-3.5 text-[0.9375rem] leading-relaxed text-white/70">Available speeds, bundle eligibility and installation windows are determined at the street level. A brief call confirms your options, and the order can be completed during that same call.</p>
        </div>
        <div class="shrink-0">
          <div class="magnetic inline-block will-change-transform">
            <a href="${C.site.phoneHref}" class="relative inline-flex h-[3.5rem] items-center justify-center gap-2 rounded-full bg-gci-red px-9 font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)] transition-colors duration-300 select-none hover:bg-gci-red-hover">
              <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}Call to order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>`;
}

/* ------------------------------------------------------------------ FAQ --- */

function faqSection() {
  return `<div class="wipe">
<section id="faq" class="canvas-tint relative isolate">
  <div class="shell section-pad">
    <div class="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
      <div class="lg:sticky lg:top-32 lg:self-start">
        <p class="eyebrow text-gci-red reveal">Questions</p>
        <h2 class="display mt-5 text-[clamp(1.6rem,6vw,3rem)] text-gci-darkest reveal" style="--delay:0.05s">Frequently asked questions</h2>
        <p class="mt-6 max-w-[26rem] text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid reveal" style="--delay:0.12s">The answers below are drawn from GCI&rsquo;s published plan terms and current offers. For anything not covered here, our team is available by phone.</p>
        <div class="mt-8 reveal" style="--delay:0.18s">
          <div class="magnetic inline-block will-change-transform">
            <a href="${C.site.phoneHref}" class="relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gci-red px-7 font-display text-[0.9375rem] font-bold tracking-[-0.01em] whitespace-nowrap text-white shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)] transition-colors duration-300 select-none hover:bg-gci-red-hover">
              <span class="magnetic-label relative z-10 flex items-center gap-2">${phoneGlyph()}Call to order</span>
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        ${C.faqs
          .map(
            (f, i) => `<div class="reveal" style="--delay:${Math.min(i * 0.035, 0.2).toFixed(3)}s">
          <div class="faq-item overflow-hidden rounded-2xl border border-gci-border bg-white transition-colors duration-400${i === 0 ? ' is-open' : ''}">
            <h3>
              <button type="button" id="faq-button-${i}" aria-expanded="${i === 0}" aria-controls="faq-panel-${i}"
                class="faq-trigger flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-300 hover:bg-gci-lightest/60 lg:px-7">
                <span class="font-display text-[1rem] font-bold tracking-[-0.02em] text-gci-darkest lg:text-[1.0625rem]">${esc(f.q)}</span>
                <span aria-hidden="true" class="faq-plus relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gci-border text-gci-mid transition-all duration-400">
                  <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5"><path d="M8 2.5v11M2.5 8h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </span>
              </button>
            </h3>
            <div id="faq-panel-${i}" role="region" aria-labelledby="faq-button-${i}" class="faq-panel">
              <div class="faq-panel-inner"><p class="px-6 pb-6 text-[0.9375rem] leading-[1.75] text-gci-mid lg:px-7 lg:pb-7 lg:pr-16">${esc(f.a)}</p></div>
            </div>
          </div>
        </div>`,
          )
          .join('\n        ')}
      </div>
    </div>
  </div>
</section>
</div>`;
}

/* ------------------------------------------------------------ legal page --- */

/* Brand mark used in the legal-page header. */
const legalMark = `<svg viewBox="0 0 40 40" class="h-9 w-9" aria-hidden="true"><defs><linearGradient id="lmk" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00a9e0"/><stop offset="52%" stop-color="#31ccff"/><stop offset="100%" stop-color="#b71234"/></linearGradient></defs><circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#lmk)" stroke-width="2.5"/><path d="M12 25.5 L18.5 14 L21.5 20.5 L28 12" fill="none" stroke="url(#lmk)" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="font-display text-[1.0625rem] font-extrabold tracking-[-0.03em] text-gci-darkest">${esc(C.site.brandName)}</span>`;


function legalPage(doc) {
  const body = `${disclosureBar(C.site)}
<header class="border-b border-gci-border bg-white">
  <div class="shell flex h-[4.5rem] items-center justify-between">
    <a href="../index.html" class="flex items-center gap-3" aria-label="${escAttr(C.site.brandName)} — home">
      ${legalMark}
    </a>
    <a href="${C.site.phoneHref}" class="inline-flex h-10 items-center rounded-full bg-gci-red px-5 font-display text-[0.8125rem] font-bold text-white transition-colors hover:bg-gci-red-hover">Call ${esc(C.site.phoneDisplay)}</a>
  </div>
</header>

<main>
  <div class="canvas-midnight-deep relative isolate text-white">
    <div class="shell py-16 lg:py-20">
      <nav aria-label="Breadcrumb" class="mb-6"><a href="../index.html" class="text-[0.8125rem] font-medium text-white/50 transition-colors hover:text-gci-glacier-bright">← Back to plans</a></nav>
      <p class="eyebrow text-gci-glacier-bright">Legal</p>
      <h1 class="display mt-4 max-w-[26ch] text-[clamp(1.6rem,6vw,3.25rem)] text-white">${esc(doc.title)}</h1>
      <p class="mt-5 max-w-[46rem] text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-white/62">${esc(doc.summary)}</p>
    </div>
  </div>

  <div class="bg-white">
    <div class="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <p class="eyebrow text-gci-mid">All policies</p>
        <ul class="mt-5 space-y-1">
          ${C.legalPages
            .map(
              (p) =>
                `<li><a href="${p.slug}.html"${p.slug === doc.slug ? ' aria-current="page"' : ''} class="block rounded-xl px-4 py-2.5 text-[0.875rem] font-medium transition-colors ${p.slug === doc.slug ? 'bg-gci-lightest font-semibold text-gci-red' : 'text-gci-mid hover:bg-gci-lightest hover:text-gci-darkest'}">${esc(p.title)}</a></li>`,
            )
            .join('\n          ')}
        </ul>
      </aside>

      <article class="max-w-[46rem]">
        ${doc.sections
          .map(
            (s, i) => `<section class="${i > 0 ? 'mt-12' : ''}">
          <h2 class="font-display text-[1.375rem] font-extrabold tracking-[-0.028em] text-gci-darkest">${esc(s.heading)}</h2>
          ${s.paragraphs.map((p) => `<p class="mt-4 text-[0.9375rem] leading-[1.8] text-gci-mid">${esc(p)}</p>`).join('\n          ')}
          ${
            s.bullets
              ? `<ul class="mt-5 space-y-3">${s.bullets
                  .map(
                    (b) =>
                      `<li class="flex gap-3.5"><span aria-hidden="true" class="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gci-glacier"></span><span class="text-[0.9375rem] leading-[1.8] text-gci-mid">${esc(b)}</span></li>`,
                  )
                  .join('')}</ul>`
              : ''
          }
        </section>`,
          )
          .join('\n        ')}
        <div class="mt-14 rounded-2xl border border-gci-border bg-gci-lightest p-6">
          <p class="text-[0.8125rem] leading-[1.75] text-gci-mid">${esc(C.site.disclosureLong)}</p>
        </div>
      </article>
    </div>
  </div>
</main>

${footer(C, '../')}`;

  return page({
    title: `${doc.title} | ${C.site.brandName}`,
    description: doc.summary,
    body,
    home: '../',
  });
}

/* --------------------------------------------------------------- assemble -- */

const indexBody = `${disclosureBar(C.site)}
${header(C.site, C.navLinks)}
<main>
${heroSection()}
${offersSection()}
${C.serviceSections.map(planSection).join('\n')}
${finePrintSection()}
${whySection()}
${faqSection()}
</main>
${footer(C)}`;

fs.mkdirSync(path.join(OUT, 'legal'), { recursive: true });

fs.writeFileSync(
  path.join(OUT, 'index.html'),
  page({
    title: C.site.metaTitle,
    description: C.site.metaDescription,
    body: indexBody,
    // Absolute, not relative: social crawlers cannot resolve a relative
    // og:image. Regenerate after setting NEXT_PUBLIC_SITE_URL to a real domain.
    ogImage: `${C.site.siteUrl}/assets/images/og-image.jpg`,
  }),
);
console.log('wrote index.html');

for (const doc of L.legalDocs) {
  fs.writeFileSync(path.join(OUT, 'legal', `${doc.slug}.html`), legalPage(doc));
}
console.log(`wrote ${L.legalDocs.length} legal pages`);
