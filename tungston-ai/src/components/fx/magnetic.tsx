"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  /** How far the element follows the pointer, as a fraction of the offset. */
  strength?: number;
  className?: string;
};

/** Pulls its child toward the pointer while hovered, then springs back. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
    const ix = inner ? gsap.quickTo(inner, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" }) : null;
    const iy = inner ? gsap.quickTo(inner, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" }) : null;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x(dx * strength);
      y(dy * strength);
      ix?.(dx * strength * 0.4);
      iy?.(dy * strength * 0.4);
    };
    const leave = () => {
      x(0);
      y(0);
      ix?.(0);
      iy?.(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className ?? ""}`}>
      {children}
    </span>
  );
}
