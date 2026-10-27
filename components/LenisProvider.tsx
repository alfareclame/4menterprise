"use client";
// Lenis driven by gsap.ticker: ONE rAF loop in the whole app.
import Lenis from "lenis";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    // Smooth wheel stays on for everyone, also under "reduce motion" (M, 2026-10-15): with a
    // native 100px wheel jump the scrubbed film advanced ~9 frames at once (1 picture change
    // per notch vs 14-16 with the glide) and read as stuttering.
    let wired: Lenis | null = null;
    // The Lenis instance is created by ReactLenis after this effect runs, so it is wired up
    // lazily on the first tick. The ticker must always run: Lenis captures the wheel, and
    // without raf() the page cannot scroll at all (this froze the page for visitors with
    // "reduce motion" on, whose early return here never started the ticker).
    const update = (time: number) => {
      const lenis = ref.current?.lenis;
      if (!lenis) return;
      if (wired !== lenis) {
        wired = lenis;
        lenis.on("scroll", ScrollTrigger.update);
      }
      lenis.raf(time * 1000); // gsap gives seconds
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    // respectReducedMotion: false -> Lenis 1.3 would otherwise force lerp 1 (no glide) under
    // "reduce motion", which made the scrubbed film jump ~9 frames per wheel notch
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, respectReducedMotion: false }} ref={ref}>
      {children}
    </ReactLenis>
  );
}
