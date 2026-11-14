import type { Metadata } from "next";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { TrackView } from "@/components/event-tracker";
import { CtaPair } from "@/components/cta-pair";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { diagnostic, diagnosticHero } from "@/content/diagnostic";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";
import { siteConfig } from "@/site.config";
import { PRICES } from "@/content/pricing";

export const metadata: Metadata = pageMetadata(seo.diagnostic);

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Front-Desk Diagnostic",
  description: diagnostic.what,
  price: PRICES.diagnostic,
  priceCurrency: "INR",
  url: `${siteConfig.url}${seo.diagnostic.path}`,
  seller: { "@id": `${siteConfig.url}/#organization` },
};

export default function DiagnosticPage() {
  return (
    <>
      <TrackView event="diagnostic_view" />
      <JsonLd data={breadcrumbJsonLd("Front-Desk Diagnostic", seo.diagnostic.path)} />
      <JsonLd data={offerJsonLd} />
      <PageHero eyebrow={diagnosticHero.eyebrow} title={diagnosticHero.title}>
        {diagnosticHero.lead}
      </PageHero>

      <section aria-labelledby="included-title" className="pb-16 sm:pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-lede text-bone/90">{diagnostic.what}</p>
            <h2 id="included-title" className="mt-12 font-display text-title font-semibold text-bone">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-4">
              {diagnostic.includes.map((item) => (
                <li key={item} className="flex gap-3 text-bone/90">
                  <Check aria-hidden="true" className="mt-1 size-4.5 shrink-0 text-filament" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 font-display text-title font-semibold text-bone">What you get</h2>
            <p className="mt-3 text-ash">{diagnostic.deliverable}</p>
            <p className="mt-3 text-ash">{diagnostic.timing}</p>
            <h2 className="mt-12 font-display text-title font-semibold text-bone">Why it&apos;s paid</h2>
            <p className="mt-3 text-ash">{diagnostic.whyPaid}</p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-filament/60 bg-filament/[0.05] p-7 sm:p-9 lg:sticky lg:top-28">
              <p className="text-sm font-medium text-smoke">Front-Desk Diagnostic</p>
              <p className="mt-3 font-display text-[clamp(2.4rem,2rem+1.6vw,3.4rem)] leading-none font-semibold text-bone">
                {diagnostic.price}
              </p>
              <p className="mt-4 text-sm text-ash">{diagnostic.priceTerms}</p>
              <p className="mt-8 border-t border-white/[0.08] pt-6 text-bone/90">{diagnostic.next}</p>
              <CtaPair className="mt-6" note={false} />
            </div>
          </aside>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
