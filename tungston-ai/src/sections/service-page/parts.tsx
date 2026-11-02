import { Check } from "lucide-react";
import { Handoff } from "@/components/illustrations/handoff";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

function Column({ title, note, items, hot }: { title: string; note?: string; items: string[]; hot?: boolean }) {
  return (
    <div className={`rounded-card border p-6 sm:p-7 ${hot ? "border-filament/35 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(232_16_26/0.14),transparent_60%)]" : "border-white/[0.07] bg-white/[0.02]"}`}>
      <h3 className="text-title font-semibold text-bone">{title}</h3>
      {note && <p className="mt-2 text-sm font-medium text-volt">{note}</p>}
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ash">
            <Check aria-hidden="true" className={`mt-1 size-4 shrink-0 ${hot ? "text-volt" : "text-signal"}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Parts({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="parts-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="parts-title" index="04" eyebrow="Who does what" title="Your part is small. We handle the rest.">
          You share what you know about your business. We do the building, connecting, testing and upkeep.
        </SectionHeading>
        <div className="mt-12">
          <Handoff yourItems={s.yourPart.items} yourTotal={s.yourPart.total} ourItems={s.ourPart} timeline={s.timeline} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Column title="Your part" note={s.yourPart.total} items={s.yourPart.items} />
          <Column title="Our part" items={s.ourPart} />
          <Column title="What you get" items={s.youGet} hot />
        </div>
      </div>
    </section>
  );
}
