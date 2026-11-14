import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { needs, solutions, solutionsHero } from "@/content/solutions";
import { siteConfig } from "@/site.config";
import { PageHero } from "@/sections/page-hero";
import { Process } from "@/sections/process";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.solutions);

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": solutions.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.line,
    url: `${siteConfig.url}/solutions#${s.id}`,
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@id": `${siteConfig.url}/#organization` },
  })),
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Solutions", seo.solutions.path)} />
      <JsonLd data={servicesJsonLd} />
      <PageHero eyebrow={solutionsHero.eyebrow} title={solutionsHero.title}>
        {solutionsHero.lead}
      </PageHero>

      <nav aria-label="Solutions" className="shell -mt-4 mb-16 flex flex-wrap gap-2.5 sm:mb-20">
        {solutions.map((s) => (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-white/12 px-4 py-2.5 text-[0.9375rem] text-ash transition-colors hover:border-filament hover:text-bone"
          >
            {s.title}
          </Link>
        ))}
      </nav>

      {solutions.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="scroll-mt-24 border-t border-white/[0.08] py-20 sm:py-28"
        >
          <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="font-display text-sm font-medium text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h2
                id={`${s.id}-title`}
                className="mt-4 font-display text-[clamp(1.9rem,1.4rem+1.8vw,3rem)] leading-[1.02] font-semibold text-bone"
              >
                {s.title}
              </h2>
              <p className="mt-4 text-lede text-ash">{s.line}</p>
            </div>
            <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {s.points.map((point) => (
                <div key={point.title}>
                  <dt className="font-medium text-bone">{point.title}</dt>
                  <dd className="mt-1.5 text-ash">{point.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      <Process />

      <section aria-labelledby="needs-title" className="py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="needs-title" className="font-display text-display font-semibold text-bone lg:col-span-5">
            {needs.title}
          </h2>
          <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
            {needs.items.map((item) => (
              <li key={item} className="flex gap-3 text-lg text-bone/90">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-filament" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
