import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SampleReport } from "@/components/sample-report";
import { SectionIntro } from "@/components/ui/section-intro";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { seo } from "@/content/seo";
import { builtAlready, sampleReport, workHero } from "@/content/work";
import { PageHero } from "@/sections/page-hero";
import { LiveDemo } from "@/sections/live-demo";
import { FinalCta } from "@/sections/final-cta";

export const metadata: Metadata = pageMetadata(seo.work);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Work", seo.work.path)} />
      <PageHero eyebrow={workHero.eyebrow} title={workHero.title}>
        {workHero.lead}
      </PageHero>
      <LiveDemo />
      <section aria-labelledby="report-title" className="py-24 sm:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionIntro id="report-title" title={sampleReport.title} />
            <p className="mt-6 max-w-sm text-lede text-ash">On the managed plan, every month.</p>
          </div>
          <div className="lg:col-span-7">
            <SampleReport />
          </div>
        </div>
      </section>
      <section aria-labelledby="built-title" className="border-t border-white/[0.08] py-16 sm:py-24">
        <div className="shell grid gap-6 lg:grid-cols-12 lg:gap-10">
          <h2 id="built-title" className="font-display text-title font-semibold text-bone lg:col-span-4">
            {builtAlready.title}
          </h2>
          <p className="max-w-2xl text-ash lg:col-span-7 lg:col-start-6">{builtAlready.body}</p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
