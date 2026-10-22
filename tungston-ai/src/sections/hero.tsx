"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { DotGrid, type DotGridHandle } from "@/components/fx/dot-grid";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/fx/counter";
import { gsap, onSiteReady, prefersReducedMotion } from "@/lib/gsap";
import { heroStats } from "@/lib/content";
import { siteConfig } from "@/site.config";

function Line({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-clip pb-[0.06em]">
      <span data-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  const gridRef = useRef<DotGridHandle>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLSpanElement>(null);

  // Layout effect so the intro's starting state is set before the first paint on client navigation
  useLayoutEffect(() => {
    const content = contentRef.current;
    const hot = hotRef.current;
    if (!content || !hot) return;

    const ignite = () => {
      const r = hot.getBoundingClientRect();
      gridRef.current?.rippleAt(r.left + r.width / 2, r.top + r.height / 2, 30);
    };

    const lines = content.querySelectorAll<HTMLElement>("[data-line]");
    // Line masks are only needed while the headline rises; afterwards they would crop the glow.
    const setMasked = (masked: boolean) => {
      lines.forEach((line) => {
        line.style.willChange = masked ? "" : "auto";
        if (line.parentElement) line.parentElement.style.overflow = masked ? "" : "visible";
      });
    };
    const unmask = () => setMasked(false);
    // The page may be coming back from Next's hidden route cache, so start masked again
    setMasked(true);

    if (prefersReducedMotion()) {
      gsap.set(content, { autoAlpha: 1 });
      gsap.set(hot, { opacity: 1 });
      unmask();
      return;
    }

    let tl: gsap.core.Timeline | null = null;
    const off = onSiteReady(() => {
      tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: unmask });
      tl.set(content, { autoAlpha: 1 })
        .from(lines, { yPercent: 112, rotate: 3, transformOrigin: "0% 100%", duration: 1.25, stagger: 0.1 })
        // The filament warms up with a couple of flickers, then the water answers
        .fromTo(hot, { opacity: 0 }, { opacity: 0.55, duration: 0.07, ease: "none" }, 0.75)
        .to(hot, { opacity: 0.1, duration: 0.06, ease: "none" })
        .to(hot, { opacity: 0.85, duration: 0.07, ease: "none" })
        .to(hot, { opacity: 0.3, duration: 0.05, ease: "none" })
        .to(hot, { opacity: 1, duration: 0.5, ease: "power2.out" })
        .add(ignite, "<")
        .from(content.querySelectorAll("[data-fade]"), { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.55);
    });

    return () => {
      off();
      // Finish rather than freeze, so a page hidden mid-intro comes back whole
      tl?.progress(1).kill();
    };
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden">
      {siteConfig.assets.heroTexture && (
        <Image
          src={siteConfig.assets.heroTexture}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%] opacity-35 [mask-image:linear-gradient(100deg,transparent_30%,#000_80%)]"
        />
      )}
      <DotGrid
        ref={gridRef}
        className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(140%_100%_at_60%_35%,#000_45%,transparent_100%)]"
        spacing={24}
      />
      <div aria-hidden="true" className="ambient -z-10 -right-40 bottom-[-20%] h-[38rem] w-[56rem] opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-void"
      />

      <div ref={contentRef} data-intro className="shell relative flex min-h-svh flex-col justify-end pt-32 pb-8 sm:pb-10">
        <h1
          id="hero-title"
          className="max-w-[16ch] font-display text-hero font-semibold text-bone"
        >
          <Line>We Build AI</Line>
          <Line>That Works While</Line>
          <Line>
            You{" "}
            <span className="relative inline-block">
              <span className="text-void [paint-order:stroke_fill] [-webkit-text-stroke:2px_rgb(158_10_18/0.9)]">Sleep.</span>
              <span ref={hotRef} aria-hidden="true" className="filament-text absolute inset-0 opacity-0">
                <span className="absolute -inset-x-[0.25em] inset-y-[0.05em] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(232_16_26/0.4),transparent)] blur-2xl" />
                Sleep.
              </span>
            </span>
          </Line>
        </h1>

        <div className="mt-8 grid items-end gap-8 sm:mt-10 lg:grid-cols-12">
          <p data-fade className="max-w-xl text-lede text-ash lg:col-span-6">
            AI agents, voice agents, chatbots, automations and end-to-end content systems, engineered for your business
            and shipped in weeks.
          </p>
          <div data-fade className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink href={siteConfig.contact.bookingUrl} size="lg">
              Book a Free AI Audit
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost" size="lg">
              See What We Build <span aria-hidden="true">↓</span>
            </ButtonLink>
          </div>
        </div>

        <dl data-fade className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6 sm:mt-16">
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.8125rem] leading-snug text-smoke sm:text-sm">{stat.label}</dt>
              <dd className="font-display text-3xl font-medium tracking-[-0.01em] text-bone tabular-nums sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} delay={0.9 + i * 0.12} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
