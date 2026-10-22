"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, onSiteReady, prefersReducedMotion } from "@/lib/gsap";

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
};

/** Headline whose lines rise out of a mask the first time it scrolls into view. */
export function RevealText({ as: Tag = "h2", children, className, id, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | null = null;
    let io: IntersectionObserver | null = null;
    const create = () => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "reveal-line",
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            rotate: 2.5,
            transformOrigin: "0% 100%",
            duration: 1.15,
            delay,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    };
    // Wait for the preloader so above-the-fold headings don't play behind it,
    // then split each heading only as it approaches the viewport.
    const off = onSiteReady(() => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          create();
        },
        { rootMargin: "0px 0px 25% 0px" },
      );
      io.observe(el);
    });
    return () => {
      off();
      io?.disconnect();
      split?.revert();
    };
  }, [delay]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
