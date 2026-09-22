import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { legalDocs, getLegalDoc } from '@/lib/legal';
import { legalPages, site } from '@/lib/content';
import { DisclosureBar } from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: 'Not found' };
  return {
    title: `${doc.title} | ${site.brandName}`,
    description: doc.summary,
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <DisclosureBar />

      {/* simple header — no anchor nav, since there are no sections to jump to */}
      <header className="border-b border-gci-border bg-white">
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <a href="/" className="flex items-center gap-3" aria-label={`${site.brandName} — home`}>
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
              <defs>
                <linearGradient id="lmk" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#31ccff" />
                  <stop offset="55%" stopColor="#00a9e0" />
                  <stop offset="100%" stopColor="#b71234" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#lmk)" strokeWidth="2.5" />
              <path
                d="M12 25.5 L18.5 14 L21.5 20.5 L28 12"
                fill="none"
                stroke="url(#lmk)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.03em] text-gci-darkest">
              {site.brandName}
            </span>
          </a>

          <a
            href={site.phoneHref}
            className="inline-flex h-10 items-center rounded-full bg-gci-red px-5 font-display text-[0.8125rem] font-bold text-white transition-colors hover:bg-gci-red-hover"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </header>

      <main>
        {/* ---- title band ---- */}
        <div className="canvas-midnight grain relative isolate overflow-hidden text-white">
          <div className="shell py-16 lg:py-20">
            <nav aria-label="Breadcrumb" className="mb-6">
              <a
                href="/"
                className="text-[0.8125rem] font-medium text-white/50 transition-colors hover:text-gci-glacier-bright"
              >
                ← Back to plans
              </a>
            </nav>
            <p className="eyebrow text-gci-glacier-bright">Legal</p>
            <h1 className="display mt-4 max-w-[26ch] text-[clamp(2rem,4.6vw,3.25rem)] text-white">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-[46rem] text-[1.0625rem] leading-[1.7] text-white/62">
              {doc.summary}
            </p>
          </div>
        </div>

        {/* ---- body ---- */}
        <div className="bg-white">
          <div className="shell grid gap-14 py-16 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
            {/* index of the other seven */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow text-gci-mid">All policies</p>
              <ul className="mt-5 space-y-1">
                {legalPages.map((p) => {
                  const current = p.slug === doc.slug;
                  return (
                    <li key={p.slug}>
                      <a
                        href={`/legal/${p.slug}`}
                        aria-current={current ? 'page' : undefined}
                        className={`block rounded-xl px-4 py-2.5 text-[0.875rem] font-medium transition-colors ${
                          current
                            ? 'bg-gci-lightest font-semibold text-gci-red'
                            : 'text-gci-mid hover:bg-gci-lightest hover:text-gci-darkest'
                        }`}
                      >
                        {p.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <article className="max-w-[46rem]">
              {doc.sections.map((s, i) => (
                <section key={s.heading} className={i > 0 ? 'mt-12' : ''}>
                  <h2 className="font-display text-[1.375rem] font-extrabold tracking-[-0.028em] text-gci-darkest">
                    {s.heading}
                  </h2>

                  {s.paragraphs.map((p, j) => (
                    <p key={j} className="mt-4 text-[0.9375rem] leading-[1.8] text-gci-mid">
                      {p}
                    </p>
                  ))}

                  {s.bullets && (
                    <ul className="mt-5 space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3.5">
                          <span
                            aria-hidden
                            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gci-glacier"
                          />
                          <span className="text-[0.9375rem] leading-[1.8] text-gci-mid">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="mt-14 rounded-2xl border border-gci-border bg-gci-lightest p-6">
                <p className="text-[0.8125rem] leading-[1.75] text-gci-mid">
                  {site.disclosureLong}
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
