'use client';

import { useEffect, useRef } from 'react';

/**
 * Light-mode abstract hero backdrop: a luminous refracting lens with drifting
 * particles and slow aurora ribbons, drawn only in GCI's glacier blue and
 * brand red.
 *
 * Composited with normal alpha rather than additive blending — on a light
 * canvas, `lighter` washes everything toward white and kills the colour.
 *
 * Performance — this has to stay cheap enough not to move PageSpeed:
 *   • single canvas, no DOM churn, no per-frame allocations
 *   • DPR capped at 1.5
 *   • rAF suspended entirely when the hero scrolls out of view
 *   • disabled outright under prefers-reduced-motion (the CSS gradient remains)
 */
export default function AuroraField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let t = 0;

    /* ---------------------------------------------------------- particles */
    type Dot = { x: number; y: number; r: number; depth: number; ph: number; warm: boolean };
    let dots: Dot[] = [];

    function seed() {
      const density = Math.min(120, Math.floor((w * h) / 13000));
      dots = new Array(density).fill(0).map(() => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.9 + 0.7,
        depth: Math.random() * 0.75 + 0.25,
        ph: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.78,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    /* -------------------------------------------------------------- draw */
    function draw() {
      if (!running) return;
      t += 0.0030;

      ctx!.clearRect(0, 0, w, h);

      const narrow = w < 900;
      // Lens sits right of centre so hero copy on the left stays clear
      const cx = w * (narrow ? 0.72 : 0.74);
      const cy = h * (narrow ? 0.2 : 0.42);
      const R = Math.min(w, h) * (narrow ? 0.3 : 0.31);

      /* --- aurora ribbons ------------------------------------------- */
      for (let band = 0; band < 3; band++) {
        const phase = t * (0.55 + band * 0.2) + band * 2.1;
        const amp = h * (0.045 + band * 0.016);
        const baseY = h * (0.16 + band * 0.26);
        const a = 0.07 - band * 0.017;

        const grad = ctx!.createLinearGradient(0, baseY - amp, w, baseY + amp);
        grad.addColorStop(0, 'rgba(0,169,224,0)');
        grad.addColorStop(
          0.38,
          band === 1 ? `rgba(183,18,52,${a * 0.8})` : `rgba(0,169,224,${a})`,
        );
        grad.addColorStop(0.72, `rgba(49,204,255,${a * 0.85})`);
        grad.addColorStop(1, 'rgba(0,169,224,0)');

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 24) {
          const y =
            baseY +
            Math.sin(x * 0.0041 + phase) * amp +
            Math.sin(x * 0.0011 - phase * 0.7) * amp * 0.5;
          ctx!.lineTo(x, y);
        }
        ctx!.lineTo(w, baseY + h * 0.16);
        ctx!.lineTo(0, baseY + h * 0.16);
        ctx!.closePath();
        ctx!.fill();
      }

      /* --- the lens -------------------------------------------------- */
      const breathe = 1 + Math.sin(t * 1.5) * 0.014;

      // Outer bloom
      const bloom = ctx!.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 1.85);
      bloom.addColorStop(0, 'rgba(0,169,224,0.13)');
      bloom.addColorStop(0.5, 'rgba(49,204,255,0.06)');
      bloom.addColorStop(1, 'rgba(0,169,224,0)');
      ctx!.fillStyle = bloom;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.85, 0, Math.PI * 2);
      ctx!.fill();

      // Warm counter-glow, offset, gives the lens dimension
      const warm = ctx!.createRadialGradient(
        cx + R * 0.6, cy + R * 0.42, R * 0.12,
        cx + R * 0.6, cy + R * 0.42, R * 1.25,
      );
      warm.addColorStop(0, 'rgba(183,18,52,0.1)');
      warm.addColorStop(1, 'rgba(183,18,52,0)');
      ctx!.fillStyle = warm;
      ctx!.beginPath();
      ctx!.arc(cx + R * 0.6, cy + R * 0.42, R * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      // Clear core so the lens reads as glass, not a disc
      const core = ctx!.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * breathe);
      core.addColorStop(0, 'rgba(255,255,255,0.5)');
      core.addColorStop(0.62, 'rgba(255,255,255,0.22)');
      core.addColorStop(1, 'rgba(255,255,255,0)');
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * breathe, 0, Math.PI * 2);
      ctx!.fill();

      // Refraction rim
      ctx!.lineWidth = 1.25;
      ctx!.strokeStyle = 'rgba(0,169,224,0.3)';
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * breathe, 0, Math.PI * 2);
      ctx!.stroke();

      ctx!.lineWidth = 10;
      ctx!.strokeStyle = 'rgba(49,204,255,0.05)';
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.04 * breathe, 0, Math.PI * 2);
      ctx!.stroke();

      // Bright chromatic arc along the upper edge
      ctx!.lineWidth = 2;
      const arc = ctx!.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      arc.addColorStop(0, 'rgba(0,169,224,0)');
      arc.addColorStop(0.45, 'rgba(0,169,224,0.42)');
      arc.addColorStop(0.75, 'rgba(183,18,52,0.26)');
      arc.addColorStop(1, 'rgba(183,18,52,0)');
      ctx!.strokeStyle = arc;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * breathe, Math.PI * 1.06, Math.PI * 1.94);
      ctx!.stroke();

      /* --- particles, refracted around the lens ---------------------- */
      for (const d of dots) {
        const px0 = ((d.x + t * 0.013 * d.depth) % 1) * w;
        const py0 = d.y * h;

        // bend outward near the rim so the lens reads as refracting
        const dx = px0 - cx;
        const dy = py0 - cy;
        const dist = Math.hypot(dx, dy) || 1;
        let px = px0;
        let py = py0;

        if (dist < R * 2.1) {
          const bend = (R * 0.3) / Math.max(dist, R * 0.45);
          px = cx + dx * (1 + bend);
          py = cy + dy * (1 + bend);
        }

        const pulse = 0.5 + Math.sin(t * 5 + d.ph) * 0.3;
        ctx!.globalAlpha = pulse * d.depth * 0.5;
        ctx!.fillStyle = d.warm ? '#b71234' : '#00a9e0';
        ctx!.beginPath();
        ctx!.arc(px, py, d.r * d.depth, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    }

    /* ----------------------------------------------------- observers */
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
