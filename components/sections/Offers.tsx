'use client';

import Image from 'next/image';
import { imageAssets, specialOffers, site, trustMarkers } from '@/lib/content';
import { Reveal, RevealText, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { Marquee, SectionWipe } from '@/components/ui/Motion';
import Icon from '@/components/ui/Icon';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';
import { PhoneGlyph } from './Header';

/**
 * Current GCI promotions. Content comes straight from `specialOffers` in
 * lib/content.ts, so retiring an offer is a one-line edit.
 */
export default function Offers() {
  const [lead, ...rest] = specialOffers;

  return (
    <>
      {/* trust ticker bridges the hero and the offers grid */}
      <div className="border-b border-gci-border bg-gci-lightest py-4">
        <Marquee
          items={trustMarkers}
          speed={56}
          separator="◆"
          itemClassName="font-display text-[0.8125rem] font-bold uppercase tracking-[0.13em] text-gci-mid"
        />
      </div>

      <SectionWipe direction="up">
        <section id="offers" className="canvas-white relative isolate">
          <div className="shell section-pad">
            <div className="max-w-[44rem]">
              <Reveal>
                <p className="eyebrow text-gci-red">Current offers</p>
              </Reveal>
              <RevealText
                text="Current promotions and device offers"
                as="h2"
                className="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest"
                delay={0.05}
              />
              <Reveal delay={0.12}>
                <p className="mt-5 text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid">
                  Device and service promotions available on GCI accounts today. Trade-in offers
                  require a qualifying device and, where noted, an eligible GCI Internet plan.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-6">
              {/* ---- lead offer ---- */}
              <Reveal>
                <TiltCard className="h-full" max={5}>
                  <article className="group/tilt relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gci-red p-8 text-white lg:p-10">
                    {/*
                      Photograph sits under a heavy brand-red wash. The image
                      supplies depth and a human subject; the wash keeps the
                      card unmistakably GCI red and the copy fully legible.
                    */}
                    <Image
                      src={imageAssets.offers.src}
                      alt={imageAssets.offers.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      className="object-cover object-[58%_30%] opacity-80 mix-blend-luminosity"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gci-red/55"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(160deg, rgba(183,18,52,0.18) 0%, rgba(183,18,52,0.72) 52%, rgba(128,13,36,0.92) 100%)',
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(75% 65% at 88% 10%, rgba(49,204,255,0.26) 0%, transparent 62%)',
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/18">
                          <Icon name={lead.icon} className="h-[1.35rem] w-[1.35rem] text-white" />
                        </span>
                        {lead.kicker && (
                          <span className="inline-flex rounded-full bg-white/18 px-3 py-1 text-[0.625rem] font-extrabold tracking-[0.14em] uppercase">
                            {lead.kicker}
                          </span>
                        )}
                      </div>
                      <h3 className="display mt-5 text-[clamp(1.35rem,5.5vw,2.25rem)] text-white">
                        {lead.title}
                      </h3>
                      <p className="mt-4 max-w-[26rem] text-[0.9375rem] leading-relaxed text-white/85">
                        {lead.detail}
                      </p>

                      {lead.points && (
                        <ul className="mt-7 space-y-3.5 border-t border-white/22 pt-7">
                          {lead.points.map((pt) => (
                            <li key={pt} className="flex gap-3">
                              <span
                                aria-hidden
                                className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"
                              />
                              <span className="text-[0.875rem] leading-relaxed text-white/80">
                                {pt}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="relative mt-9">
                      <MagneticButton href={site.phoneHref} variant="white" size="lg" strength={0.2}>
                        <PhoneGlyph />
                        Call to order
                      </MagneticButton>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>

              {/* ---- remaining offers ---- */}
              <StaggerGrid className="grid gap-4 sm:grid-cols-2" stagger={0.07}>
                {rest.map((o) => (
                  <StaggerItem key={o.id} className="h-full">
                    <article className="card flex h-full flex-col rounded-[1.25rem] p-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        {o.kicker && (
                          <span className="inline-flex w-fit rounded-full bg-gci-lightest px-2.5 py-1 text-[0.5625rem] font-extrabold tracking-[0.14em] text-gci-mid uppercase">
                            {o.kicker}
                          </span>
                        )}
                        <Icon
                          name={o.icon}
                          className="h-[1.15rem] w-[1.15rem] shrink-0 text-gci-light"
                        />
                      </div>
                      <h3 className="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.02em] text-gci-darkest">
                        {o.title}
                      </h3>
                      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-gci-mid">
                        {o.detail}
                      </p>
                      <a
                        href={site.phoneHref}
                        className="mt-auto flex items-center gap-2 pt-5 font-display text-[0.8125rem] font-bold text-gci-red transition-colors hover:text-gci-red-hover"
                      >
                        <PhoneGlyph />
                        Call to order
                      </a>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-9 max-w-[52rem] text-[0.8125rem] leading-relaxed text-gci-mid/90">
                All offers are limited-time and subject to change, availability, credit approval and
                qualification. Trade-in values depend on device model and condition. Device
                promotions are applied as monthly bill credits over a financing term; cancelling
                service early makes the remaining device balance due.
              </p>
            </Reveal>
          </div>
        </section>
      </SectionWipe>
    </>
  );
}
