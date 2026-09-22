'use client';

import type { PlanItem } from '@/lib/content';

type Scale = 'sm' | 'md' | 'lg';

/**
 * Universal price lockup.
 *
 * Every price on this site renders through this one component, so the dollar
 * sign, the large integer and the muted cents keep identical optical alignment
 * across fiber, bundle, mobile and phone cards.
 *
 * Typography:
 *   • dollar sign  — small, raised to the cap height of the integer
 *   • integer      — 2.5rem → 3.5rem depending on `scale`
 *   • cents        — muted, raised, roughly a third the integer size
 *
 * When a plan carries no published price the lockup degrades to a
 * "Custom pricing" label; the card's CTA independently switches to
 * "Call for pricing" via `ctaLabel()` in lib/content.ts.
 */
export default function PriceLockup({
  plan,
  scale = 'md',
  className = '',
}: {
  plan: PlanItem;
  scale?: Scale;
  className?: string;
}) {
  const hasPrice = typeof plan.price === 'number';

  const integerSize =
    scale === 'lg'
      ? 'text-[3.5rem] leading-[0.86]'
      : scale === 'sm'
        ? 'text-[2.5rem] leading-[0.88]'
        : 'text-[3rem] leading-[0.87]';

  const symbolSize =
    scale === 'lg' ? 'text-[1.5rem]' : scale === 'sm' ? 'text-[1.125rem]' : 'text-[1.3rem]';

  const centsSize =
    scale === 'lg' ? 'text-[1.375rem]' : scale === 'sm' ? 'text-[1rem]' : 'text-[1.1875rem]';

  const primary = 'text-gci-darkest';
  const muted = 'text-gci-mid';
  const strike = 'text-gci-mid/70';

  if (!hasPrice) {
    return (
      <div className={className}>
        <p className={`font-display text-[1.75rem] font-bold tracking-[-0.02em] ${primary}`}>
          Custom pricing
        </p>
        {plan.promoQualifier && (
          <p className={`mt-1.5 text-[0.8125rem] ${muted}`}>{plan.promoQualifier}</p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {plan.strikePrice && (
        <p className={`mb-1 text-[0.9375rem] font-medium line-through ${strike}`}>
          {plan.strikePrice}
        </p>
      )}

      <div className="flex items-start">
        <span
          className={`font-display font-bold ${symbolSize} ${primary} mt-[0.18em] mr-[0.06em] tabular-nums`}
          aria-hidden
        >
          $
        </span>

        <span
          className={`font-display font-bold tracking-[-0.045em] tabular-nums ${integerSize} ${primary}`}
        >
          {plan.price}
        </span>

        {plan.cents && (
          <span
            className={`font-display font-bold ${centsSize} ${muted} mt-[0.2em] ml-[0.05em] tabular-nums`}
          >
            .{plan.cents}
          </span>
        )}
      </div>

      {plan.promoQualifier && (
        <p className={`mt-2 text-[0.8125rem] leading-snug font-medium ${muted}`}>
          {plan.promoQualifier}
        </p>
      )}

      {/* Screen readers get one clean utterance instead of split fragments */}
      <span className="sr-only">
        {plan.strikePrice ? `Regularly ${plan.strikePrice}. Now ` : ''}
        {plan.price}
        {plan.cents ? ` dollars and ${plan.cents} cents` : ' dollars'} {plan.promoQualifier ?? ''}
      </span>
    </div>
  );
}
