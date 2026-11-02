import { Plus } from "lucide-react";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function Faq({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="faq-title" index="08" eyebrow="FAQ" title={`${s.title}: your questions, answered`} />
        <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {s.faqs.map((f) => (
            <details key={f.q} className="group/faq">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium text-bone [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-signal transition-transform duration-300 group-open/faq:rotate-45"
                />
              </summary>
              <p className="max-w-3xl pb-7 text-ash">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
