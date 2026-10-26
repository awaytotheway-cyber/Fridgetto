"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/logo";
import { markSiteReady } from "@/lib/gsap";

/** Length of the CSS intro in ms; keep in step with the .preloader animations in globals.css. */
const DURATION = 950;

/**
 * The logo powers up, then the curtain lifts. Under a second, once per session.
 * The animation is pure CSS, so it plays and clears even before the JavaScript
 * arrives; the inline script in the root layout sets `data-preloaded` on <html>
 * for returning visits so this never shows twice.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (html.dataset.preloaded === "true" || reduced) {
      html.dataset.preloaded = "true";
      // Defer one frame so section listeners are attached before they're told to start.
      requestAnimationFrame(() => markSiteReady());
      queueMicrotask(() => setDone(true));
      return;
    }

    // The CSS started with the first paint, so finish in step with it (at once if the JS was slow)
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("protomation:preloaded", "1");
      } catch {}
      html.dataset.preloaded = "true";
      markSiteReady();
      setDone(true);
    }, Math.max(0, DURATION - performance.now()));
    // Later visits to the hero this session skip the wait, once this one's intro has played
    const quick = setTimeout(() => html.classList.add("quick-intro"), 3000);
    return () => {
      clearTimeout(t);
      clearTimeout(quick);
    };
  }, []);

  if (done) return null;

  return (
    <div
      data-preloader
      className="preloader fixed inset-0 z-[80] grid place-items-center bg-void"
      role="status"
      aria-label="Loading"
    >
      <div className="preloader-mark relative">
        <div className="preloader-glow absolute inset-[-70%] rounded-full bg-[radial-gradient(closest-side,rgb(232_16_26/0.4),transparent)]" />
        <LogoMark height={80} className="relative h-20 w-auto" />
      </div>
    </div>
  );
}
