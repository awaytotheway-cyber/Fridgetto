import { Suspense } from "react";
import { MissedEnquiryCalculator } from "@/components/calculator/missed-enquiry-calculator";
import { CalculatorFromUrl } from "@/components/calculator/calculator-from-url";
import { SectionIntro } from "@/components/ui/section-intro";
import { calculatorIntro } from "@/content/home";
import type { Vertical } from "@/content/calculator";

type Props = {
  vertical?: Vertical;
  /** Read the starting preset from ?specialty= in the URL (on /clinics). */
  fromUrl?: boolean;
  title?: string;
  lead?: string;
};

/** The missed-enquiry calculator with its intro. Anchored at #calculator so specialty links can land on it. */
export function CalculatorSection({ vertical = "clinic", fromUrl = false, title = calculatorIntro.title, lead = calculatorIntro.lead }: Props) {
  return (
    <section id="calculator" aria-labelledby="calculator-title" className="relative scroll-mt-24 overflow-clip py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/3 -right-60 h-[34rem] w-[48rem] opacity-50" />
      <div className="shell relative">
        <p className="font-mono text-xs tracking-[0.2em] text-smoke uppercase">{calculatorIntro.eyebrow}</p>
        <SectionIntro id="calculator-title" title={title} className="mt-5">
          {lead}
        </SectionIntro>
        <div className="mt-14 sm:mt-20">
          {fromUrl ? (
            <Suspense fallback={<MissedEnquiryCalculator vertical={vertical} />}>
              <CalculatorFromUrl vertical={vertical} />
            </Suspense>
          ) : (
            <MissedEnquiryCalculator vertical={vertical} />
          )}
        </div>
      </div>
    </section>
  );
}
