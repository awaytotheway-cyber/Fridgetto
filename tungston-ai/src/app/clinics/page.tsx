import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/components/ui/faq-list";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { seo } from "@/content/seo";
import { clinicsHero, specialties } from "@/content/clinics";
import { clinicFaqs } from "@/content/faqs";
import { PageHero } from "@/sections/page-hero";
import { SpecialtySection } from "@/sections/specialty";
import { CalculatorSection } from "@/sections/home/calculator-section";
import { Faq } from "@/sections/faq";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.clinics);

export default function ClinicsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Clinics", seo.clinics.path)} />
      <JsonLd
        data={serviceJsonLd({
          name: "AI automation for clinics",
          description: clinicsHero.lead,
          path: seo.clinics.path,
          areaServed: { "@type": "Country", name: "India" },
        })}
      />
      <JsonLd data={faqJsonLd(clinicFaqs)} />
      <PageHero eyebrow={clinicsHero.eyebrow} title={clinicsHero.title}>
        {clinicsHero.lead}
      </PageHero>

      <nav aria-label="Specialties" className="shell -mt-4 mb-16 flex flex-wrap gap-2.5 sm:mb-20">
        {specialties.map((s) => (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-white/12 px-4 py-2.5 text-[0.9375rem] text-ash transition-colors hover:border-filament hover:text-bone"
          >
            {s.short}
          </Link>
        ))}
      </nav>

      {specialties.map((s) => (
        <SpecialtySection key={s.id} specialty={s} calculatorHref={`/clinics?specialty=${s.preset}#calculator`} />
      ))}

      <CalculatorSection fromUrl title="Run your clinic's numbers" />
      <Faq items={clinicFaqs} />
      <FinalCta />
    </>
  );
}
