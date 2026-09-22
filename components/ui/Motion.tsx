'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- *
 *  Parallax — depth drift tied to scroll progress through the viewport.
 * -------------------------------------------------------------------------- */

export function Parallax({
  children,
  className = '',
  /** Positive drifts slower than scroll (recedes); negative leads it. */
  distance = 70,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *  SectionWipe — clip-path transition between major service sections.
 *  The section unmasks from an angled edge as it enters the viewport.
 * -------------------------------------------------------------------------- */

export function SectionWipe({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const hidden =
    direction === 'left'
      ? 'inset(0% 100% 0% 0%)'
      : direction === 'right'
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(14% 0% 0% 0% round 40px 40px 0 0)';

  const shown =
    direction === 'up' ? 'inset(0% 0% 0% 0% round 0px)' : 'inset(0% 0% 0% 0%)';

  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden, opacity: 0.55 }}
      whileInView={{ clipPath: shown, opacity: 1 }}
      viewport={{ once: true, margin: '-14% 0px -14% 0px' }}
      transition={{ duration: 1.05, ease: EASE }}
      style={{ willChange: 'clip-path' }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- *
 *  Marquee — infinite horizontal ticker. Content is duplicated once and the
 *  track translates -50%, so the loop is seamless at any width.
 * -------------------------------------------------------------------------- */

export function Marquee({
  items,
  speed = 42,
  className = '',
  itemClassName = '',
  separator = '◆',
  reverse = false,
}: {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className={`marquee-host marquee-mask relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center"
        style={
          {
            '--marquee-duration': `${speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {track.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center ${itemClassName}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span aria-hidden className="mx-6 text-[0.5em] opacity-45">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *  SpeedPath — SVG path-draw illustrating throughput across the network.
 *  Strokes draw in on enter; a travelling pulse rides the finished path.
 * -------------------------------------------------------------------------- */

export function SpeedPath({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const paths = [
    { d: 'M0,150 C160,150 200,44 380,44 C560,44 610,44 760,44', color: '#31ccff', w: 2.25, delay: 0 },
    { d: 'M0,150 C170,150 220,100 400,100 C580,100 640,100 760,100', color: '#00a9e0', w: 1.75, delay: 0.16 },
    { d: 'M0,150 C180,150 240,152 420,152 C600,152 660,152 760,152', color: '#5e636e', w: 1.4, delay: 0.32 },
    { d: 'M0,150 C190,150 250,206 440,206 C620,206 680,206 760,206', color: '#b71234', w: 1.4, delay: 0.48 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 760 250"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sp-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="18%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="sp-mask">
          <rect width="760" height="250" fill="url(#sp-fade)" />
        </mask>
      </defs>

      <g mask="url(#sp-mask)">
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke={p.color}
            strokeWidth={p.w}
            strokeLinecap="round"
            initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
            animate={
              reduced
                ? undefined
                : inView
                  ? { pathLength: 1, opacity: i === 0 ? 0.95 : 0.55 }
                  : undefined
            }
            transition={{ duration: 1.6, ease: EASE, delay: p.delay }}
          />
        ))}

        {/* Node markers where each tier terminates */}
        {paths.map((p, i) => {
          const cy = [44, 100, 152, 206][i];
          return (
            <motion.circle
              key={`n-${i}`}
              cx={752}
              cy={cy}
              r={i === 0 ? 5 : 3.5}
              fill={p.color}
              initial={reduced ? undefined : { scale: 0, opacity: 0 }}
              animate={reduced ? undefined : inView ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 1.35 + p.delay }}
              style={{ transformOrigin: `752px ${cy}px` }}
            />
          );
        })}

        {/* Origin node */}
        <circle cx={4} cy={150} r={4} fill="#31ccff" opacity={0.9} />
      </g>
    </svg>
  );
}
