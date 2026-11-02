import type { CSSProperties } from "react";
import Image from "next/image";
import { InView } from "@/components/illustrations/in-view";
import { at } from "@/components/illustrations/stagger";
import type { ServiceDetail } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

export function UseCases({ s }: { s: ServiceDetail }) {
  const withPhoto = s.useCases.filter((u) => u.photo);
  const textOnly = s.useCases.filter((u) => !u.photo);
  return (
    <section aria-labelledby="use-cases-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHeading id="use-cases-title" index="06" eyebrow="Who it's for" title={`Where businesses use ${s.title}`} />
        <InView className="mt-12 grid gap-4 md:grid-cols-3">
          {withPhoto.map((u, i) => (
            <article key={u.title} style={at(i, { "--step": "0.15s" } as CSSProperties)} className="il-in group/use overflow-hidden rounded-card border border-white/[0.07] bg-white/[0.02]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={u.photo!.src}
                  alt={u.photo!.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale contrast-110 transition-transform duration-700 ease-out-expo group-hover/use:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(232_16_26/0.35),rgb(5_5_5/0.85))] mix-blend-multiply" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(5_5_5/0.9))]" />
                <a
                  href={u.photo!.credit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 bottom-2 text-[0.625rem] text-bone/60 hover:text-bone"
                >
                  Photo: {u.photo!.credit.name} / Unsplash
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-title font-semibold text-bone">{u.title}</h3>
                <p className="mt-3 text-ash">{u.body}</p>
              </div>
            </article>
          ))}
        </InView>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {textOnly.map((u) => (
            <article key={u.title} className="rounded-card border border-white/[0.07] p-6">
              <h3 className="text-lg font-semibold text-bone">{u.title}</h3>
              <p className="mt-2 text-ash">{u.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
