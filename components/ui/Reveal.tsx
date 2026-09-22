'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- *
 *  RevealText — scroll-triggered headline reveal.
 *  Splits on words and lifts each from behind a clip mask, staggered.
 * -------------------------------------------------------------------------- */

export function RevealText({
  text,
  as: Tag = 'h2',
  className = '',
  accent,
  accentClassName = '',
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Optional second phrase rendered in the accent colour on its own line. */
  accent?: string;
  accentClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const accentWords = accent ? accent.split(' ') : [];

  if (reduced) {
    return (
      <Tag className={className}>
        {text}
        {accent && (
          <>
            {' '}
            <span className={accentClassName}>{accent}</span>
          </>
        )}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: '110%', opacity: 0 },
    show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      className="block"
    >
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={`w-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.2em]">
            <motion.span variants={word} className="inline-block">
              {w}
              {/* A real space, not a CSS-width spacer: the gap before the accent
                  phrase must exist in the text layer too, or assistive tech and
                  copied text read the join as one word ("networkinvestment"). */}
              {i < words.length - 1 || accentWords.length > 0 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
        {accentWords.length > 0 && (
          <>
            {accentWords.map((w, i) => (
              <span
                key={`a-${i}`}
                className="inline-block overflow-hidden align-bottom pb-[0.2em]"
              >
                <motion.span variants={word} className={`inline-block ${accentClassName}`}>
                  {w}
                  {i < accentWords.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </>
        )}
      </Tag>
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- *
 *  Reveal — generic fade-and-lift for any block.
 * -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *  StaggerGrid / StaggerItem — staggered entrance for feature grids.
 * -------------------------------------------------------------------------- */

export function StaggerGrid({
  children,
  className = '',
  stagger = 0.085,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.975 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
