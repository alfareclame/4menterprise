// The one place GSAP plugins are registered (CLAUDE.md: ScrollTrigger registered once).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

// Phones and portrait touch screens show the whole 16:9 frame letterboxed, like on a computer
// (M, 2026-10-15: a portrait crop looked stretched and too close), from lighter 1280x720
// frames (frames/<leg>/phone; renamed from mobile so cached crops are never reused). Desktop windows of any shape keep the 1080p frames, cover-fit.
// globals.css uses the identical query for the poster.
// prefers-reduced-motion is deliberately NOT a gate (M, 2026-10-14): the film is driven by the
// visitor's own scrolling, never autoplays, and runs in a calm mode instead.
export const MOBILE_FRAMES_QUERY = "(orientation: portrait) and (pointer: coarse), (orientation: portrait) and (max-width: 720px)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
