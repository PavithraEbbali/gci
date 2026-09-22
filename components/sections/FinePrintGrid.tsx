'use client';

import { finePrint } from '@/lib/content';
import { Reveal, RevealText } from '@/components/ui/Reveal';
import { SectionWipe } from '@/components/ui/Motion';

const COLUMNS = [
  { key: 'fiber', label: 'Fiber+ Internet' },
  { key: 'bundle', label: 'GCI+ Bundles' },
  { key: 'mobile', label: 'GCI Mobile' },
  { key: 'phone', label: 'Home Phone' },
] as const;

/**
 * Honest fine-print grid — inclusions and fees across every service line,
 * laid out so nothing requires hunting through a terms page.
 */
export default function FinePrintGrid() {
  return (
    <>
      <SectionWipe direction="up">
        <section id="fine-print" className="canvas-white relative isolate">
          <div className="shell section-pad">
            <div className="max-w-[44rem]">
              <Reveal>
                <p className="eyebrow text-gci-red">Inclusions and fees</p>
              </Reveal>
              <RevealText
                text="Every charge, shown side by side"
                as="h2"
                className="display mt-5 text-[clamp(2rem,4.4vw,3.25rem)] text-gci-darkest"
                delay={0.05}
              />
              <Reveal delay={0.12}>
                <p className="mt-6 text-[1.0625rem] leading-[1.7] text-gci-mid">
                  Every recurring and one-time charge associated with a GCI residential order,
                  compared across all four service lines so nothing has to be looked up separately.
                </p>
              </Reveal>
            </div>

            {/* ---------- desktop table ---------- */}
            <Reveal delay={0.16}>
              <div className="mt-14 hidden overflow-hidden rounded-[1.5rem] border border-gci-border lg:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Inclusions and fees compared across GCI service lines
                  </caption>
                  <thead>
                    <tr className="bg-gci-midnight">
                      <th
                        scope="col"
                        className="w-[26%] px-6 py-5 font-display text-[0.75rem] font-bold tracking-[0.14em] text-white/55 uppercase"
                      >
                        Inclusion or fee
                      </th>
                      {COLUMNS.map((c) => (
                        <th
                          key={c.key}
                          scope="col"
                          className="px-6 py-5 font-display text-[0.8125rem] font-extrabold tracking-[-0.01em] text-white"
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {finePrint.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-t border-gci-border transition-colors duration-200 hover:bg-gci-lightest/70 ${
                          i % 2 ? 'bg-gci-lightest/35' : 'bg-white'
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-display text-[0.875rem] font-bold text-gci-darkest"
                        >
                          {row.label}
                        </th>
                        {COLUMNS.map((c) => {
                          const v = row[c.key];
                          const isNone = v === 'None';
                          return (
                            <td key={c.key} className="px-6 py-4 text-[0.875rem]">
                              <span
                                className={
                                  isNone
                                    ? 'inline-flex items-center gap-1.5 font-semibold text-gci-glacier-deep'
                                    : 'text-gci-dark'
                                }
                              >
                                {isNone && (
                                  <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                                    <path
                                      d="m4.5 10.5 3.5 3.5 7.5-8"
                                      stroke="currentColor"
                                      strokeWidth="2.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                                {v}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            {/* ---------- mobile stack ---------- */}
            <div className="mt-12 space-y-4 lg:hidden">
              {COLUMNS.map((c, ci) => (
                <Reveal key={c.key} delay={ci * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-gci-border">
                    <p className="bg-gci-midnight px-5 py-3.5 font-display text-[0.9375rem] font-extrabold text-white">
                      {c.label}
                    </p>
                    <dl className="divide-y divide-gci-border">
                      {finePrint.map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-5 px-5 py-3">
                          <dt className="text-[0.8125rem] font-semibold text-gci-mid">{row.label}</dt>
                          <dd
                            className={`text-right text-[0.8125rem] ${
                              row[c.key] === 'None'
                                ? 'font-semibold text-gci-glacier-deep'
                                : 'text-gci-darkest'
                            }`}
                          >
                            {row[c.key]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </SectionWipe>
    </>
  );
}
