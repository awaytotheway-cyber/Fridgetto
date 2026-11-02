"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type InViewProps = {
  as?: "div" | "figure" | "section";
  className?: string;
  style?: CSSProperties;
  /** Share of the element that must be visible before it plays. */
  threshold?: number;
  children: ReactNode;
};

/**
 * Plays the illustration inside once it scrolls into view. The server renders it finished
 * (no attribute); after mount it is marked "pending" (hidden, see illustrations.css) and then
 * "true" when it appears, which starts the CSS animations. Reduced motion skips all of it.
 */
export function InView({ as: Tag = "div", className, style, threshold = 0.3, children }: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.inview = "true";
      return;
    }
    el.dataset.inview = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.inview = "true";
        io.disconnect();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
