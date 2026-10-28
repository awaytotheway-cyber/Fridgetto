"use client";

/**
 * GSAP is loaded on demand: nothing above the fold waits for it, and on phones the
 * desktop-only effects (cursor, magnetic buttons, smooth scroll) never load it at all.
 * Effects call loadGsap() after their own checks and bail out if they unmounted meanwhile.
 */
export type GsapModule = typeof import("./gsap-core");

let loading: Promise<GsapModule> | null = null;

export function loadGsap() {
  loading ??= import("./gsap-core");
  return loading;
}

/**
 * Runs `callback` once `el` comes within half a screen of the viewport, or at once if the
 * page is already scrolled past it. Lets below-the-fold effects load GSAP only when needed.
 */
export function whenNear(el: Element, callback: () => void) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
      io.disconnect();
      callback();
    },
    { rootMargin: "0px 0px 50% 0px" },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Re-measures scroll-linked animations after a layout change, if any have loaded. */
export function refreshScrollTriggers() {
  loading?.then(({ ScrollTrigger }) => ScrollTrigger.refresh());
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fired once the preloader has finished (or was skipped). */
export const READY_EVENT = "protomation:ready";

export function onSiteReady(callback: () => void) {
  const w = window as Window & { __protomationReady?: boolean };
  if (w.__protomationReady) {
    callback();
    return () => {};
  }
  window.addEventListener(READY_EVENT, callback, { once: true });
  return () => window.removeEventListener(READY_EVENT, callback);
}

export function markSiteReady() {
  const w = window as Window & { __protomationReady?: boolean };
  if (w.__protomationReady) return;
  w.__protomationReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}
