"use client";

import { useEffect, useRef } from "react";
import { onSiteReady, prefersReducedMotion } from "@/lib/gsap";

const DURATION = 1200;
/** Same curve as GSAP's power3.out. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

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
    el.textContent = "0";
    let raf = 0;
    let wait: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      wait = setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          el.textContent = String(Math.round(value * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      }, delay * 1000);
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
      clearTimeout(wait);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  );
}
