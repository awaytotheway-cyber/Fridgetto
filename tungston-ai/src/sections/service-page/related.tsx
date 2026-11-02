import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { catalogEntry } from "@/lib/services/catalog";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function Related({ s }: { s: ServiceDetail }) {
  return (
    <section aria-labelledby="related-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="related-title" index="09" eyebrow="Related services" title="Works even better with" />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {s.related.map((slug) => {
            const r = catalogEntry(slug);
            return (
              <li key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="group/rel flex h-full flex-col overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.02] transition-[border-color,box-shadow] duration-500 hover:border-filament/40 hover:shadow-[var(--shadow-glow-soft)]"
                >
                  <div className="relative h-40">
                    <Image
                      src={r.card.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover brightness-90 [mask-image:radial-gradient(closest-side,#000_62%,transparent)] transition-transform duration-700 ease-out-expo group-hover/rel:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex items-start justify-between gap-4 text-title font-semibold text-bone">
                      {r.title}
                      <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-signal transition-transform duration-300 group-hover/rel:translate-x-0.5 group-hover/rel:-translate-y-0.5" />
                    </h3>
                    <p className="mt-3 text-ash">{r.card.hook}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
