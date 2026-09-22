'use client';

import { useEffect, useState } from 'react';

/**
 * True only for devices with a real hovering pointer.
 *
 * Touch screens synthesise `mousemove` on tap, which left the tilt and
 * magnetic effects stuck in a transformed state after a finger lifted — there
 * is no `mouseleave` to reset them. Gating on the pointer capability means
 * those effects simply never arm on a phone or tablet.
 *
 * Starts false so the server render and the first client paint agree; the
 * effect promotes it on desktop after mount.
 */
export default function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return fine;
}
