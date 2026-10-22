"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, markSiteReady } from "@/lib/gsap";

const SIZE = 7;
const cells = Array.from({ length: SIZE * SIZE }, (_, i) => ({ row: Math.floor(i / SIZE), col: i % SIZE }));
const inT = (row: number, col: number) => (row === 1 && col >= 1 && col <= 5) || (col === 3 && row >= 1 && row <= 5);

/**
 * A dot field that burns the T mark into itself, then lifts away. Under 1.5s,
 * once per session. The inline script in the root layout sets `data-preloaded`
 * on <html> for returning visits so this never flashes.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || html.dataset.preloaded === "true" || reduced) {
      html.dataset.preloaded = "true";
      // Defer one frame so section listeners are attached before they're told to start.
      requestAnimationFrame(() => markSiteReady());
      queueMicrotask(() => setDone(true));
      return;
    }

    const dots = root.querySelectorAll<SVGCircleElement>("[data-dot]");
    const lit = root.querySelectorAll<SVGCircleElement>("[data-lit]");
    const core = root.querySelector<SVGCircleElement>("[data-core]");
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("tungston:preloaded", "1");
        } catch {}
        html.dataset.preloaded = "true";
        setDone(true);
      },
    });

    tl.from(dots, { scale: 0, transformOrigin: "50% 50%", duration: 0.35, stagger: { each: 0.006, from: "center" }, ease: "back.out(2)" })
      .to(lit, { fill: "var(--color-filament)", attr: { r: 4.2 }, duration: 0.3, stagger: { each: 0.025, from: "center" }, ease: "power2.out" }, 0.2)
      .to(core, { fill: "var(--color-volt)", attr: { r: 5 }, duration: 0.2, ease: "power2.out" }, 0.55)
      .to(root.querySelector("[data-glow]"), { opacity: 1, duration: 0.25 }, 0.55)
      .add(() => markSiteReady(), 0.95)
      .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut" }, 0.9);

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-preloader
      className="fixed inset-0 z-[80] grid place-items-center bg-void [clip-path:inset(0_0_0_0)]"
      role="status"
      aria-label="Loading"
    >
      <div className="relative">
        <div
          data-glow
          className="absolute inset-[-60%] rounded-full bg-[radial-gradient(closest-side,rgb(232_16_26/0.35),transparent)] opacity-0"
        />
        <svg viewBox="0 0 112 112" className="relative size-28">
          {cells.map(({ row, col }) => {
            const lit = inT(row, col);
            const isCore = row === 1 && col === 3;
            return (
              <circle
                key={`${row}-${col}`}
                data-dot
                data-lit={lit ? "" : undefined}
                data-core={isCore ? "" : undefined}
                cx={8 + col * 16}
                cy={8 + row * 16}
                r={2}
                fill="var(--color-ember)"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
