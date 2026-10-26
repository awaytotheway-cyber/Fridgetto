"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DotGrid, type DotGridHandle } from "@/components/fx/dot-grid";
import { ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/fx/counter";
import { onSiteReady, prefersReducedMotion } from "@/lib/gsap";
import { heroStats } from "@/lib/content";
import { siteConfig } from "@/site.config";

function Line({ children, index }: { children: ReactNode; index: number }) {
  return (
    <span data-line className="block pb-[0.06em]" style={{ "--i": index } as CSSProperties}>
      {children}
    </span>
  );
}

/**
 * The intro is CSS (see .hero-intro in globals.css), so the headline paints with the
 * first frame instead of waiting for JavaScript; that keeps the page's largest paint fast.
 */
export function Hero() {
  const gridRef = useRef<DotGridHandle>(null);
  const hotRef = useRef<HTMLSpanElement>(null);
  // The texture is decoration: fetch it once the page is up, so it never competes with the first paint.
  // Phones skip it (it is lazy and hidden there, so never fetched).
  const [texture, setTexture] = useState<"off" | "loading" | "shown">("off");

  useEffect(() => {
    const id = requestAnimationFrame(() => setTexture("loading"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Once the filament has flickered on, the water answers
  useEffect(() => {
    const hot = hotRef.current;
    if (!hot || prefersReducedMotion()) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const off = onSiteReady(() => {
      t = setTimeout(() => {
        const r = hot.getBoundingClientRect();
        gridRef.current?.rippleAt(r.left + r.width / 2, r.top + r.height / 2, 30);
      }, 700);
    });
    return () => {
      off();
      clearTimeout(t);
    };
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden">
      {siteConfig.assets.heroTexture && texture !== "off" && (
        <Image
          src={siteConfig.assets.heroTexture}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          onLoad={() => setTexture("shown")}
          className={`-z-20 hidden object-cover md:block object-[70%_50%] transition-opacity duration-1000 [mask-image:linear-gradient(100deg,transparent_30%,#000_80%)] ${texture === "shown" ? "opacity-35" : "opacity-0"}`}
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

      <div className="hero-intro shell relative flex min-h-svh flex-col justify-end pt-32 pb-8 sm:pb-10">
        <h1
          id="hero-title"
          className="max-w-[16ch] font-display text-hero font-semibold text-bone"
        >
          <Line index={0}>We Build AI</Line>
          <Line index={1}>That Works While</Line>
          <Line index={2}>
            You{" "}
            <span className="relative inline-block">
              <span className="text-void [paint-order:stroke_fill] [-webkit-text-stroke:2px_rgb(158_10_18/0.9)]">Sleep.</span>
              <span ref={hotRef} data-ignite aria-hidden="true" className="filament-text absolute inset-0">
                <span className="absolute -inset-x-[0.25em] inset-y-[0.05em] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(232_16_26/0.4),transparent)] blur-2xl" />
                Sleep.
              </span>
            </span>
          </Line>
        </h1>

        <div className="mt-8 grid items-end gap-8 sm:mt-10 lg:grid-cols-12">
          <p data-rise className="max-w-xl text-lede text-ash lg:col-span-6">
            AI agents, voice agents, chatbots, automations and end-to-end content systems, engineered for your business
            and shipped in weeks.
          </p>
          <div data-fade className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" style={{ "--i": 0 } as CSSProperties}>
            <ButtonLink href={siteConfig.contact.bookingUrl} size="lg">
              Book a Free AI Audit
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost" size="lg">
              See What We Build <span aria-hidden="true">↓</span>
            </ButtonLink>
          </div>
        </div>

        <dl data-fade className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6 sm:mt-16" style={{ "--i": 1 } as CSSProperties}>
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.8125rem] leading-snug text-smoke sm:text-sm">{stat.label}</dt>
              <dd className="font-display text-3xl font-medium tracking-[-0.01em] text-bone tabular-nums sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} delay={0.25 + i * 0.1} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
