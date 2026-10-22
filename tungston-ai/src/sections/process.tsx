"use client";

import { useEffect, useRef } from "react";
import { SectionIntro } from "@/components/ui/section-intro";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { processSteps } from "@/lib/content";

/**
 * The four steps hang off one filament. Scrolling through the section heats it
 * from left to right (top to bottom on phones); each step lights as the heat reaches it.
 */
export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const steps = Array.from(track.querySelectorAll<HTMLElement>("[data-step]"));
    const set = (p: number) => {
      track.style.setProperty("--p", p.toFixed(4));
      steps.forEach((step, i) => {
        step.dataset.lit = p >= i / steps.length + 0.02 || p === 1 ? "true" : "false";
      });
    };
    if (prefersReducedMotion()) {
      set(1);
      return;
    }
    set(0);
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top 75%",
      end: "bottom 55%",
      scrub: 0.6,
      onUpdate: (self) => set(self.progress),
    });
    return () => st.kill();
  }, []);

  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/3 -left-60 h-[30rem] w-[40rem] opacity-40" />
      <div className="shell relative">
        <SectionIntro id="process-title" title="From first call to a running system in weeks.">
          No six-month discovery phase. Four steps, with a clear deliverable and a decision point at the end of each.
        </SectionIntro>

        <ol
          ref={trackRef}
          className="relative mt-16 grid gap-12 pl-10 [--p:1] sm:mt-24 lg:grid-cols-4 lg:gap-8 lg:pt-14 lg:pl-0"
        >
          {/* The filament */}
          <li aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-white/10 lg:top-[0.6875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto">
            <span className="absolute inset-0 origin-top scale-y-[var(--p)] bg-gradient-to-b from-filament-deep via-filament to-volt shadow-[0_0_14px_1px_rgb(232_16_26/0.6)] lg:origin-left lg:scale-x-[var(--p)] lg:scale-y-100 lg:bg-gradient-to-r" />
            <span className="absolute top-[calc(var(--p)*100%)] left-1/2 size-2.5 -translate-1/2 rounded-full bg-volt shadow-[0_0_18px_6px_rgb(255_212_0/0.45)] lg:top-1/2 lg:left-[calc(var(--p)*100%)]" />
          </li>

          {processSteps.map((step, i) => (
            <li key={step.title} data-step data-lit="true" className="group/step relative">
              <span
                aria-hidden="true"
                className="absolute top-1 -left-10 grid size-6 place-items-center rounded-full border border-white/15 bg-void transition-[border-color,box-shadow] duration-500 group-data-[lit=true]/step:border-filament group-data-[lit=true]/step:shadow-[0_0_20px_2px_rgb(232_16_26/0.45)] lg:-top-14 lg:left-0"
              >
                <span className="size-2 rounded-full bg-white/20 transition-colors duration-500 group-data-[lit=true]/step:bg-filament" />
              </span>
              <p className="font-display text-sm font-medium text-smoke tabular-nums">
                <span className="text-ash transition-colors duration-500 group-data-[lit=true]/step:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mx-2 text-white/20">/</span>
                {step.when}
              </p>
              <h3 className="mt-3 font-display text-title font-semibold text-bone/55 transition-colors duration-500 group-data-[lit=true]/step:text-bone">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] text-ash">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
