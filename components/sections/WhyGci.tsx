'use client';

import Image from 'next/image';
import { imageAssets, whyGci, site } from '@/lib/content';
import { Reveal, RevealText, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { Parallax, SectionWipe } from '@/components/ui/Motion';
import Icon from '@/components/ui/Icon';
import MagneticButton from '@/components/ui/MagneticButton';
import { PhoneGlyph } from './Header';

/**
 * Premium staggered feature grid. Cards enter on a stagger, each leading with
 * a large metric so the section scans as evidence rather than as prose.
 */
export default function WhyGci() {
  return (
    <SectionWipe direction="up">
      <section id="why-gci" className="canvas-tint relative isolate overflow-hidden">
        {/* Parallax colour plates behind the grid */}
        <Parallax distance={80} className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[10%] -left-[14%] h-[32rem] w-[32rem] rounded-full bg-gci-glacier/12 blur-[120px]" />
          <div className="absolute right-[-12%] bottom-[6%] h-[28rem] w-[28rem] rounded-full bg-gci-red/8 blur-[130px]" />
        </Parallax>

        <div className="shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-end lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow text-gci-red">Why Alaskans choose GCI</p>
              </Reveal>
              <RevealText
                text="Four decades of network"
                accent="investment in Alaska."
                as="h2"
                className="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest"
                accentClassName="bg-gradient-to-r from-gci-glacier-deep to-gci-glacier bg-clip-text text-transparent"
                delay={0.05}
              />
            </div>

            <Reveal delay={0.12}>
              <p className="max-w-[34rem] text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid">
                Serving a state one-fifth the size of the Lower 48, with a fraction of its road
                network, requires subsea cable, microwave relay and fiber installed through
                permafrost. GCI has invested in that infrastructure since 1979, which is what
                extends multi-gigabit capability to communities of every size.
              </p>
            </Reveal>
          </div>

          {/* ---- staggered grid ---- */}
          <StaggerGrid
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
            stagger={0.075}
          >
            {/*
              The photograph occupies one cell of the metric grid rather than
              sitting above it, so the section reads as a single composition
              instead of a picture followed by a list.
            */}
            <StaggerItem className="h-full sm:col-span-2">
              <figure className="relative h-full min-h-[17rem] overflow-hidden rounded-[1.5rem] shadow-[0_28px_64px_-34px_rgba(4,32,70,0.45)]">
                <Image
                  src={imageAssets.network.src}
                  alt={imageAssets.network.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 62vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-gci-midnight/88 via-gci-midnight/25 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                  <p className="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.025em] text-white">
                    Nearly 15,000 miles of fiber, maintained year-round
                  </p>
                  <p className="mt-1.5 max-w-[26rem] text-[0.8125rem] leading-relaxed text-white/75">
                    Splice crews work the backbone through freeze and thaw.
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>

            {whyGci.map((f) => (
              <StaggerItem key={f.title} className="h-full">
                <article className="card group relative h-full overflow-hidden rounded-[1.5rem] p-7">
                  {/* hairline that lights up on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gci-glacier to-transparent transition-transform duration-700 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-4">
                    {f.metric && (
                      <p className="font-display text-[2.75rem] leading-none font-extrabold tracking-[-0.05em] text-gci-glacier-deep">
                        {f.metric}
                      </p>
                    )}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gci-lightest text-gci-glacier-deep">
                      <Icon name={f.icon} className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.125rem] font-bold tracking-[-0.025em] text-gci-darkest">
                    {f.title}
                  </h3>

                  <p className="mt-3 text-[0.875rem] leading-[1.7] text-gci-mid">{f.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* ---- closing CTA band ---- */}
          <Reveal delay={0.1}>
            <div className="canvas-midnight-deep relative isolate mt-14 flex flex-col items-start justify-between gap-7 overflow-hidden rounded-[1.75rem] p-8 lg:mt-16 lg:flex-row lg:items-center lg:p-10">
              {/*
                Lit homes in a remote coastal community, behind a heavy scrim.
                The same frame doubles as the social share card.
              */}
              <Image
                src={imageAssets.og.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="-z-10 object-cover object-center"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gci-midnight/78"
              />
              <div className="max-w-[36rem]">
                <h3 className="display text-[clamp(1.25rem,5vw,1.95rem)] text-white">
                  Confirm what is available at your address
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-white/70">
                  Available speeds, bundle eligibility and installation windows are determined at
                  the street level. A brief call confirms your options, and the order can be
                  completed during that same call.
                </p>
              </div>

              <div className="shrink-0">
                <MagneticButton href={site.phoneHref} variant="red" size="lg">
                  <PhoneGlyph />
                  Call to order
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SectionWipe>
  );
}
