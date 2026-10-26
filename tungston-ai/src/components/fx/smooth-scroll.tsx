"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const HEADER_OFFSET = -88;

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/**
 * Next keeps recently visited pages mounted but hidden, so an id can exist more
 * than once. Only the copy on the visible page is a valid scroll target.
 */
function visibleTarget(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  const matches = document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`);
  return Array.from(matches).find((el) => el.getClientRects().length > 0) ?? null;
}

function scrollToTarget(target: HTMLElement | null, immediate: boolean) {
  if (lenis) {
    lenis.scrollTo(target ?? 0, { immediate, force: true, offset: target ? HEADER_OFFSET : 0 });
  } else if (target) {
    // Match Lenis, which also honours the target's scroll-margin-top
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const top = target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET - margin;
    window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
  } else {
    window.scrollTo(0, 0);
  }
}

export function SmoothScroll() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // Touch screens already scroll smoothly, and Lenis would only add work on every frame
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Same-page anchor links: glide to the visible target
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.origin !== window.location.origin) return;
      if (link.pathname !== window.location.pathname || !link.hash) return;
      const target = visibleTarget(link.hash);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      history.pushState(history.state, "", link.hash);
      scrollToTarget(target, false);
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // On client navigation, land at the top of the new page, or on its #hash target.
  // The first render is left alone so reloads and deep links keep the browser's position.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToTarget(visibleTarget(window.location.hash), true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
