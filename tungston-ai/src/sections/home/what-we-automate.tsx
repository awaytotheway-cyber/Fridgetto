import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";
import { whatWeAutomate } from "@/content/home";
import { solutions } from "@/content/solutions";

/** The seven solutions, one line each, each linking to its section on /solutions. */
export function WhatWeAutomate() {
  return (
    <section aria-labelledby="automate-title" className="relative py-24 sm:py-36">
      <div className="shell">
        <SectionIntro id="automate-title" title={whatWeAutomate.title} />
        <ul className="mt-16 grid gap-5 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <li key={s.id}>
              <Link
                href={`/solutions#${s.id}`}
                className="group/sol flex h-full flex-col rounded-card border border-white/[0.08] bg-white/[0.02] p-8 transition-[border-color,background-color] duration-300 hover:border-filament/60 hover:bg-filament/[0.04]"
              >
                <h3 className="font-display text-title font-semibold text-bone transition-colors group-hover/sol:text-signal">
                  {s.title}
                </h3>
                <p className="mt-3 text-ash">{s.line}</p>
                <span aria-hidden="true" className="mt-auto pt-8 text-lg text-bone">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={whatWeAutomate.link.href}
          className="mt-10 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
        >
          {whatWeAutomate.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
