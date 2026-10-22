"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fired once the preloader has finished (or was skipped). */
export const READY_EVENT = "tungston:ready";

export function onSiteReady(callback: () => void) {
  const w = window as Window & { __tungstonReady?: boolean };
  if (w.__tungstonReady) {
    callback();
    return () => {};
  }
  window.addEventListener(READY_EVENT, callback, { once: true });
  return () => window.removeEventListener(READY_EVENT, callback);
}

export function markSiteReady() {
  const w = window as Window & { __tungstonReady?: boolean };
  if (w.__tungstonReady) return;
  w.__tungstonReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

export { gsap, ScrollTrigger, SplitText };
