import type { CSSProperties } from "react";
import { InView } from "@/components/illustrations/in-view";
import { at } from "@/components/illustrations/stagger";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function Benefits({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="benefits-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="benefits-title" index="02" eyebrow="What you gain" title="What this means for your business" />
        <InView className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.benefits.map((b, i) => (
            <article
              key={b.title}
              style={at(i, { "--step": "0.15s" } as CSSProperties)}
              className="il-in group/benefit relative overflow-hidden rounded-card border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] p-6 transition-[border-color,box-shadow] duration-500 hover:border-filament/40 hover:shadow-[var(--shadow-glow-soft)] sm:p-7"
            >
              <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-filament),transparent)] opacity-60" />
              <p className="font-display text-sm font-medium text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-title font-semibold text-bone">{b.title}</h3>
              <p className="mt-3 text-ash">{b.body}</p>
            </article>
          ))}
        </InView>
      </div>
    </section>
  );
}
