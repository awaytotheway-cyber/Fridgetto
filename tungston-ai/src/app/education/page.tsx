import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/components/ui/faq-list";
import { SectionIntro } from "@/components/ui/section-intro";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { seo } from "@/content/seo";
import { admissionsJobs, adultsOnly, audiences, educationCalculator, educationHero, worldwide } from "@/content/education";
import { educationFaqs } from "@/content/faqs";
import { PageHero } from "@/sections/page-hero";
import { CalculatorSection } from "@/sections/home/calculator-section";
import { Faq } from "@/sections/faq";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.education);

export default function EducationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Education", seo.education.path)} />
      <JsonLd
        data={serviceJsonLd({
          name: "AI admissions front desk for education businesses",
          description: educationHero.lead,
          path: seo.education.path,
          areaServed: "Worldwide",
        })}
      />
      <JsonLd data={faqJsonLd(educationFaqs)} />
      <PageHero eyebrow={educationHero.eyebrow} title={educationHero.title}>
        {educationHero.lead}
      </PageHero>

      <section aria-label="Who it's for" className="pb-16 sm:pb-24">
        <div className="shell">
          <ul className="grid gap-4 md:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.title} className="rounded-card border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">
                <h2 className="font-display text-title font-semibold text-bone">{a.title}</h2>
                <p className="mt-3 text-ash">{a.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-smoke">{adultsOnly}</p>
        </div>
      </section>

      <section aria-labelledby="admissions-title" className="py-16 sm:py-24">
        <div className="shell">
          <SectionIntro id="admissions-title" title={admissionsJobs.title}>
            {worldwide}
          </SectionIntro>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-white/[0.08] bg-white/[0.08] sm:mt-20 md:grid-cols-2 lg:grid-cols-5">
            {admissionsJobs.jobs.map((job, i) => (
              <li key={job.title} className="bg-void p-7 sm:p-8">
                <p className="font-display text-sm font-medium text-signal tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-title font-semibold text-bone">{job.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-ash">{job.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CalculatorSection vertical="education" title={educationCalculator.title} lead={educationCalculator.lead} />
      <Faq items={educationFaqs} title="Questions from admissions teams." />
      <FinalCta
        title="Find out how many enrolments you're missing."
        lead="Book a free 20-minute call. We'll look at how leads reach you today and tell you honestly whether a front desk would pay for itself."
      />
    </>
  );
}
