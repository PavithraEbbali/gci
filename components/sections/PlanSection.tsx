'use client';

import Image from 'next/image';
import {
  ctaLabel,
  splitSpeed,
  plansFor,
  sectionImage,
  site,
  type PlanItem,
  type ServiceSection,
} from '@/lib/content';
import Icon, { type IconName } from '@/components/ui/Icon';
import PriceLockup from '@/components/ui/PriceLockup';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { RevealText, Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { SectionWipe, SpeedPath } from '@/components/ui/Motion';
import { PhoneGlyph } from './Header';

/* ------------------------------------------------------------ speed stat --- */

function SpeedStat({
  label,
  mbps,
  className,
  direction,
}: {
  label: string;
  mbps: number;
  className: string;
  direction: 'download' | 'upload';
}) {
  const { value, unit } = splitSpeed(mbps);
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-gci-mid uppercase">
        <Icon name={direction} className="h-3.5 w-3.5 shrink-0" />
        {label}
      </p>
      <p
        className={`mt-1.5 font-display text-[1.375rem] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap ${className}`}
      >
        {value}
        <span className="ml-[0.15em] text-[0.6em] font-bold tracking-[-0.01em]">{unit}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ plan card --- */

function PlanCard({ plan, icon }: { plan: PlanItem; icon: IconName }) {
  const featured = Boolean(plan.isPopular);

  return (
    <TiltCard className="h-full">
      <div
        className={`relative flex h-full flex-col rounded-[1.5rem] p-6 lg:p-7 ${
          featured ? 'card-featured' : 'card'
        }`}
      >
        {/* badge slot — fixed height so every card's rows line up */}
        <div className="mb-5 flex h-7 items-center justify-between gap-3">
          {plan.badge ? (
            <span
              className={`inline-flex h-7 items-center rounded-full px-3 text-[0.625rem] font-extrabold tracking-[0.13em] uppercase ${
                featured ? 'bg-gci-red text-white' : 'bg-gci-lightest text-gci-mid'
              }`}
            >
              {plan.badge}
            </span>
          ) : (
            <span aria-hidden />
          )}
          {/*
            A visual anchor rather than new information — every card in a
            section shares its service line — so it is sized to read cleanly
            and tinted back, not competing with the badge beside it.
          */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              featured ? 'bg-gci-red/10 text-gci-red' : 'bg-gci-lightest text-gci-glacier-deep'
            }`}
          >
            <Icon name={icon} className="h-[1.1rem] w-[1.1rem]" />
          </span>
        </div>

        {/* name + tagline */}
        <h3 className="flex min-h-[3.4rem] items-start font-display text-[1.375rem] leading-[1.2] font-extrabold tracking-[-0.032em] text-gci-darkest lg:text-[1.5rem]">
          {plan.name}
        </h3>
        {plan.tagline && (
          <p className="mt-2.5 min-h-[4.2rem] text-[0.875rem] leading-relaxed text-gci-mid">
            {plan.tagline}
          </p>
        )}

        {/* speed readout */}
        {typeof plan.speedDown === 'number' && (
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gci-border pt-5">
            <SpeedStat
              label="Download"
              mbps={plan.speedDown}
              className="text-gci-glacier-deep"
              direction="download"
            />
            {typeof plan.speedUp === 'number' && (
              <SpeedStat
                label="Upload"
                mbps={plan.speedUp}
                className="text-gci-darkest"
                direction="upload"
              />
            )}
          </div>
        )}

        {/* price */}
        <div className="mt-6 border-t border-gci-border pt-6">
          <PriceLockup plan={plan} scale={featured ? 'lg' : 'md'} />
        </div>

        {/* features */}
        <ul className="mt-6 space-y-3 border-t border-gci-border pt-6">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2.5">
              <Icon name="check" className="mt-[0.15rem] h-4 w-4 shrink-0 text-gci-glacier-deep" />
              <span className="text-[0.8125rem] leading-relaxed text-gci-dark">{f}</span>
            </li>
          ))}
        </ul>

        {/* policy chips */}
        {(plan.dataPolicy || plan.contractTerm || plan.equipmentFee) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {[plan.dataPolicy, plan.contractTerm, plan.equipmentFee].filter(Boolean).map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-gci-lightest px-2.5 py-1 text-[0.6875rem] font-semibold text-gci-mid"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/*
          CTA is the last element in the card and `mt-auto` pins it to the
          bottom edge, so the button sits on a common baseline across the row
          no matter how many feature bullets a plan carries.
        */}
        <div className="mt-auto pt-7">
          <MagneticButton
            href={site.phoneHref}
            variant={featured ? 'red' : 'ghost-light'}
            size="md"
            className="w-full"
            strength={0.18}
            ariaLabel={`${ctaLabel(plan)} — ${plan.name}`}
          >
            <PhoneGlyph />
            {ctaLabel(plan)}
          </MagneticButton>
        </div>
      </div>
    </TiltCard>
  );
}

/* --------------------------------------------------------------- section --- */

export default function PlanSection({ section }: { section: ServiceSection }) {
  const plans = plansFor(section.serviceLine);
  if (plans.length === 0) return null;

  const photo = sectionImage(section.serviceLine);

  const cols = plans.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4';

  return (
    <SectionWipe direction="up">
      <section
        id={section.id}
        className={`relative isolate ${section.theme === 'tint' ? 'canvas-tint' : 'canvas-white'}`}
      >
        <div className="shell section-pad relative">
          {/* ---- heading block, paired with the section photograph ---- */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
            <div className="max-w-[40rem]">
              <Reveal>
                <p className="eyebrow flex items-center gap-2 text-gci-red">
                  <Icon name={section.icon} className="h-4 w-4 shrink-0" />
                  {section.eyebrow}
                </p>
              </Reveal>

              <RevealText
                text={section.heading}
                as="h2"
                className="display mt-5 text-[clamp(1.55rem,6vw,3rem)] text-gci-darkest"
                delay={0.05}
              />

              <Reveal delay={0.12}>
                <p className="mt-5 text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid">
                  {section.subheading}
                </p>
              </Reveal>
            </div>

            {photo && (
              <Reveal delay={0.1}>
                <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-[0_28px_64px_-34px_rgba(4,32,70,0.45)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />

                </figure>
              </Reveal>
            )}
          </div>

          {/*
            The speed-tier path draws in its own band rather than over the
            photograph, where the strokes had nothing to read against and
            looked like scratches. Here the four lines fanning out echo the
            four plan tiers directly below them.
          */}
          {section.serviceLine === 'fiber' && (
            <div aria-hidden className="mt-12 hidden lg:block">
              <SpeedPath className="h-[130px] w-full opacity-80" />
            </div>
          )}

          {/* ---- plan grid ---- */}
          <StaggerGrid className={`mt-14 grid gap-5 lg:gap-6 ${section.serviceLine === 'fiber' ? 'lg:mt-8' : 'lg:mt-16'} ${cols}`}>
            {plans.map((plan) => (
              <StaggerItem key={plan.id} className="h-full">
                <PlanCard plan={plan} icon={section.icon} />
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* ---- footnote ---- */}
          {section.footnote && (
            <Reveal delay={0.1}>
              <p className="mt-9 max-w-[52rem] text-[0.8125rem] leading-relaxed text-gci-mid/90">
                {section.footnote}
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </SectionWipe>
  );
}
