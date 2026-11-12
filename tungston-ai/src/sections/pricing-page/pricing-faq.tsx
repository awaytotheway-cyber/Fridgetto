import { SectionIntro } from "@/components/ui/section-intro";
import { FaqList } from "@/components/ui/faq-list";
import { pricingFaqs } from "@/lib/pricing";

/** <details>, so the answers work with JavaScript switched off. */
export function PricingFaq() {
  return (
    <section aria-labelledby="pricing-faq-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="pricing-faq-title" title="Pricing questions, answered." />
        <FaqList items={pricingFaqs} />
      </div>
    </section>
  );
}
