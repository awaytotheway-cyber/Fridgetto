"use client";

import { useEffect, useRef } from "react";
import { gsap, onSiteReady, prefersReducedMotion } from "@/lib/gsap";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  /** Seconds after the site is ready and the number is on screen. */
  delay?: number;
};

/** Counts up from zero once, when the number is first visible. Renders the final value for no-JS and reduced motion. */
export function Counter({ value, suffix = "", className, delay = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const state = { n: 0 };
    el.textContent = "0";
    let tween: gsap.core.Tween | null = null;

    const run = () => {
      tween = gsap.to(state, {
        n: value,
        duration: 1.8,
        delay,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = String(Math.round(state.n));
        },
      });
    };

    let off = () => {};
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        off = onSiteReady(run);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      off();
      tween?.kill();
    };
  }, [value, delay]);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  );
}
