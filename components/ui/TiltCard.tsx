'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import useFinePointer from './useFinePointer';

/**
 * 3D tilt-on-mouse-move wrapper, used for the plan / pricing cards.
 *
 * Tilt is intentionally restrained (max ~7deg) so pricing stays legible while
 * reading — the effect should register as depth, not as a toy. A specular
 * highlight tracks the cursor across the card surface.
 */
export default function TiltCard({
  children,
  className = '',
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Touch screens fire a synthetic mousemove on tap with no matching
  // mouseleave, which left cards stuck mid-tilt. Never arm without a pointer.
  const finePointer = useFinePointer();
  const off = reduced || !finePointer;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 170, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  // Hooks stay unconditional — `glare` only gates whether the node renders.
  const glareBg = useTransform(
    [sx, sy],
    ([gx, gy]: number[]) =>
      `radial-gradient(440px circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.14), transparent 62%)`,
  );

  function onMove(e: React.MouseEvent) {
    if (off || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  if (off) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1200 }} className="group/tilt h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full will-change-transform ${className}`}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}
