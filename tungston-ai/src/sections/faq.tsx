import { SectionIntro } from "@/components/ui/section-intro";
import { FaqList } from "@/components/ui/faq-list";
import { homeFaqs } from "@/lib/content";

/** Sits immediately before the final CTA: answer the objection, then make the ask. */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="faq-title" title="Before you book.">
          The things people ask before the first call. Questions about money are answered on the{" "}
          <a
            href="/pricing#pricing-faq-title"
            className="text-bone underline decoration-filament/50 underline-offset-4 transition-colors hover:decoration-volt"
          >
            pricing page
          </a>
          .
        </SectionIntro>
        <FaqList items={homeFaqs} />
      </div>
    </section>
  );
}
