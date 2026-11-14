import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { dataContact, notLegalAdvice, practices, securityHero } from "@/content/security";
import { PageHero } from "@/sections/page-hero";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.security);

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Security & data", seo.security.path)} />
      <PageHero eyebrow={securityHero.eyebrow} title={securityHero.title}>
        {securityHero.lead}
      </PageHero>
      <section aria-label="Our practices" className="pb-16 sm:pb-24">
        <div className="shell">
          <ul className="grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <li key={p.title} className="bg-void p-7 sm:p-9">
                <h2 className="font-display text-title font-semibold text-bone">{p.title}</h2>
                <p className="mt-3 text-ash">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <p className="max-w-xl text-sm text-smoke">{notLegalAdvice}</p>
            <p className="max-w-xl text-ash lg:justify-self-end">
              {dataContact.text}{" "}
              <a href={`mailto:${dataContact.email}`} className="text-bone underline decoration-filament/60 underline-offset-4 [overflow-wrap:anywhere]">
                {dataContact.email}
              </a>
              . {dataContact.reply}
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
