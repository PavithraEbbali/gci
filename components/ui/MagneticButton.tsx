'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import useFinePointer from './useFinePointer';

type Variant = 'red' | 'glacier' | 'ghost-light' | 'ghost-dark' | 'white';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  red: 'bg-gci-red text-white hover:bg-gci-red-hover shadow-[0_10px_34px_-10px_rgba(183,18,52,0.72)]',
  glacier:
    'bg-gci-glacier text-white hover:bg-gci-glacier-deep shadow-[0_10px_34px_-10px_rgba(0,169,224,0.7)]',
  white: 'bg-white text-gci-midnight hover:bg-gci-lightest shadow-[0_10px_34px_-12px_rgba(0,0,0,0.5)]',
  'ghost-light':
    'bg-transparent text-gci-darkest border border-gci-light hover:border-gci-midnight hover:bg-white',
  'ghost-dark':
    'bg-white/5 text-white border border-white/25 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm',
};

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.8125rem]',
  md: 'h-12 px-7 text-[0.9375rem]',
  lg: 'h-[3.5rem] px-9 text-base',
};

/**
 * Magnetic CTA. The button eases toward the cursor within its hit area and
 * springs back on exit; the label drifts slightly further for parallax depth.
 *
 * Renders <a> when `href` is set, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'red',
  size = 'md',
  className = '',
  strength = 0.32,
  type = 'button',
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  strength?: number;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Same reasoning as TiltCard: no hovering pointer, no magnetic pull.
  const finePointer = useFinePointer();
  const off = reduced || !finePointer;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 210, damping: 18, mass: 0.5 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const labelX = useTransform(x, (v) => v * 0.42);
  const labelY = useTransform(y, (v) => v * 0.42);

  function handleMove(e: React.MouseEvent) {
    if (off || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full font-display font-bold ' +
    'tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 will-change-transform ' +
    'select-none';

  const inner = (
    <motion.span style={off ? undefined : { x: labelX, y: labelY }} className="relative z-10 flex items-center gap-2">
      {children}
    </motion.span>
  );

  const shared = `${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={off ? undefined : { x, y }}
      className="inline-block will-change-transform"
    >
      {href ? (
        <a href={href} className={shared} aria-label={ariaLabel} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type={type} className={shared} aria-label={ariaLabel} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
