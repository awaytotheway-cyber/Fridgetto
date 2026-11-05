import { SectionIntro } from "@/components/ui/section-intro";
import { pricingFaqs } from "@/lib/pricing";

/** <details>, so the answers work with JavaScript switched off. */
export function PricingFaq() {
  return (
    <section aria-labelledby="pricing-faq-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="pricing-faq-title" title="Pricing questions, answered." />
        <div className="mt-12 border-t border-white/[0.08]">
          {pricingFaqs.map((faq) => (
            <details key={faq.question} className="group border-b border-white/[0.08] py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-title font-semibold text-bone transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span aria-hidden="true" className="mt-1 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-ash">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
