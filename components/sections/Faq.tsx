'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs, site } from '@/lib/content';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import { SectionWipe } from '@/components/ui/Motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { PhoneGlyph } from './Header';

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({
  item,
  index,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-400 ${
        open ? 'border-gci-glacier/45 bg-white shadow-[0_18px_50px_-30px_rgba(4,32,70,0.4)]' : 'border-gci-border bg-white'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-300 hover:bg-gci-lightest/60 lg:px-7"
        >
          <span className="font-display text-[1rem] font-bold tracking-[-0.02em] text-gci-darkest lg:text-[1.0625rem]">
            {item.q}
          </span>

          <span
            aria-hidden
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
              open
                ? 'rotate-45 border-gci-glacier bg-gci-glacier text-white'
                : 'border-gci-border text-gci-mid'
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[0.9375rem] leading-[1.75] text-gci-mid lg:px-7 lg:pb-7 lg:pr-16">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWipe direction="up">
      {/* No `overflow-hidden` here: an ancestor with a scrolling box would trap
          the sticky intro column inside a box that never scrolls, so it would
          silently stop sticking. Nothing in this section overflows anyway. */}
      <section id="faq" className="canvas-tint relative isolate">
        <div className="shell section-pad">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
            {/* ---- sticky intro ---- */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <p className="eyebrow text-gci-red">Questions</p>
              </Reveal>

              <RevealText
                text="Frequently asked questions"
                as="h2"
                className="display mt-5 text-[clamp(1.6rem,6vw,3rem)] text-gci-darkest"
                delay={0.05}
              />

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[26rem] text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem] text-gci-mid">
                  The answers below are drawn from GCI&rsquo;s published plan terms and current
                  offers. For anything not covered here, our team is available by phone.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8">
                  <MagneticButton href={site.phoneHref} variant="red" size="md">
                    <PhoneGlyph />
                    Call to order
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            {/* ---- accordion ---- */}
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={Math.min(i * 0.035, 0.2)}>
                  <Row
                    item={f}
                    index={i}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWipe>
  );
}
