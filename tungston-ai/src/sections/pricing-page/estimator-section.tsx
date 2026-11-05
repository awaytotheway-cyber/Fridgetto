import { Estimator } from "@/components/pricing/estimator";
import { SectionIntro } from "@/components/ui/section-intro";

export function EstimatorSection() {
  return (
    <section id="estimator" aria-labelledby="estimator-title" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(232_16_26/0.3)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(60%_55%_at_50%_0%,#000,transparent)]"
      />
      <div className="shell relative">
        <SectionIntro id="estimator-title" title="What will your AI system cost?">
          Get an indicative estimate based on what you want to build. Your final quotation will depend on your exact
          requirements and integrations.
        </SectionIntro>
        <div className="mt-12 sm:mt-16">
          <Estimator />
        </div>
      </div>
    </section>
  );
}
