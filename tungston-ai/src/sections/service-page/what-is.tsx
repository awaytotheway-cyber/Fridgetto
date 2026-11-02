import { BeforeAfter } from "@/components/illustrations/before-after";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function WhatIs({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="what-is-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="what-is-title" index="01" eyebrow="In plain words" title={s.whatIs.question} />
        <div className="mt-10 grid gap-6 text-lg leading-relaxed text-ash md:grid-cols-2 md:gap-10">
          {s.whatIs.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="mt-12">
          <BeforeAfter before={s.whatIs.before} after={s.whatIs.after} />
        </div>
      </div>
    </section>
  );
}
