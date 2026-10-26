"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type GsapModule } from "@/lib/gsap";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";

/** Red dot that tracks the pointer exactly, with a ring that trails and swells over controls. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let cancelled = false;
    let teardown = () => {};
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      teardown = start(gsap, dot, ring);
    });
    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ringRef}
        data-cursor-ring
        className="group/cursor fixed top-0 left-0 size-9 rounded-full border border-filament/70 transition-[width,height,border-color,background-color,opacity] duration-300 ease-out-expo data-[state=hot]:size-16 data-[state=hot]:border-volt data-[state=hot]:bg-volt/10 data-[state=hover]:size-14 data-[state=hover]:border-filament data-[state=hover]:bg-filament/10 data-[state=text]:size-3 data-[state=text]:opacity-0"
      />
      <div ref={dotRef} data-cursor-dot className="fixed top-0 left-0 size-1.5 rounded-full bg-filament shadow-[0_0_12px_2px_rgb(232_16_26/0.7)]" />
    </div>
  );
}

/** Wires the dot and ring to the pointer. Returns the teardown. */
function start(gsap: GsapModule["gsap"], dot: HTMLDivElement, ring: HTMLDivElement) {
  document.documentElement.classList.add("has-cursor");
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
  const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
  const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
  const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
  const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

  let shown = false;
  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (!shown) {
      gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      shown = true;
    }
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  };
  const over = (e: PointerEvent) => {
    const target = (e.target as Element | null)?.closest?.(INTERACTIVE);
    const field = (e.target as Element | null)?.closest?.("input, textarea");
    ring.dataset.state = field ? "text" : target ? (target.closest("[data-cursor='hot']") ? "hot" : "hover") : "";
  };
  const leave = () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    shown = false;
  };
  const down = () => ring.classList.add("scale-75");
  const up = () => ring.classList.remove("scale-75");

  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerover", over, { passive: true });
  window.addEventListener("pointerdown", down, { passive: true });
  window.addEventListener("pointerup", up, { passive: true });
  document.documentElement.addEventListener("pointerleave", leave);
  return () => {
    document.documentElement.classList.remove("has-cursor");
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerover", over);
    window.removeEventListener("pointerdown", down);
    window.removeEventListener("pointerup", up);
    document.documentElement.removeEventListener("pointerleave", leave);
  };
}
