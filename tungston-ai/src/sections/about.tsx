"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DotGrid } from "@/components/fx/dot-grid";
import { loadGsap, prefersReducedMotion, whenNear, type GsapModule } from "@/lib/gsap";
import { founderNote } from "@/content/home";
import { siteConfig } from "@/site.config";
import { blurFor } from "@/lib/image-blur";

/** A head in profile, facing right. Drawn in a 100×120 box. */
const PROFILE =
  "M34 120 C34 110 33 102 30 96 C22 88 14 76 13 60 C12 36 26 12 52 8 C70 5 84 14 87 30 C88 36 87 40 86 43 C88 47 92 52 95 57 C96 59 94 61 90 61 C89 63 90 65 90 66 C91 67 89 69 88 70 C89 71 90 73 88 75 C87 77 87 79 87 81 C87 86 84 89 78 90 C72 91 67 92 64 96 C62 104 63 112 66 120 Z";

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const styles = getComputedStyle(document.documentElement);
    const lit = styles.getPropertyValue("--color-bone").trim();
    const hot = styles.getPropertyValue("--color-filament").trim();
    let tween: ReturnType<GsapModule["gsap"]["fromTo"]> | null = null;
    let cancelled = false;
    const stop = whenNear(el, () =>
      loadGsap().then(({ gsap }) => {
        if (cancelled) return;
        // Unread words sit at a dim grey that still clears 3:1 contrast, then warm up as you scroll
        tween = gsap.fromTo(
          words,
          { color: "#666563" },
          {
            color: (_: number, word: HTMLElement) => (word.dataset.hot ? hot : lit),
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 0.5 },
          },
        );
      }),
    );
    return () => {
      cancelled = true;
      stop();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.005em] text-bone"
    >
      {founderNote.text.split(" ").map((word, i) => (
        <span
          key={i}
          data-word
          data-hot={founderNote.hot.includes(word) || undefined}
          className={founderNote.hot.includes(word) ? "text-filament" : undefined}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

/** The founder note (COPY.md §2.11): a short paragraph that warms up as you scroll, signed, with a portrait. */
export function About() {
  const portrait = founderNote.image ?? siteConfig.assets.aboutImage;
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="about-title" className="font-mono text-xs font-normal tracking-[0.2em] text-smoke uppercase">
            {founderNote.eyebrow}
          </h2>
          <div className="mt-6">
            <Manifesto />
          </div>
          <p className="mt-8 text-ash">{founderNote.signature}</p>
        </div>

        <figure className="relative lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/[0.07] bg-[radial-gradient(80%_60%_at_70%_40%,rgb(232_16_26/0.12),transparent)]">
            {portrait ? (
              <Image
                src={portrait}
                alt={founderNote.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                placeholder="blur"
                blurDataURL={blurFor(portrait)}
                className="object-cover"
              />
            ) : (
              <DotGrid
                className="absolute inset-0 h-full w-full"
                spacing={8}
                dotRadius={1.35}
                rimHeat={0.85}
                maskPath={PROFILE}
                maskViewBox={[100, 120]}
                drips="always"
                idleDripAfter={0}
              />
            )}
          </div>
        </figure>
      </div>
    </section>
  );
}
