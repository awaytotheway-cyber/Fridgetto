import { SectionIntro } from "@/components/ui/section-intro";
import { FaqList } from "@/components/ui/faq-list";
import type { FaqItem } from "@/components/ui/faq-list";
import { homeFaqs } from "@/content/faqs";

/** Sits immediately before the final CTA: answer the objection, then make the ask. */
export function Faq({ items = homeFaqs, title = "Before you book." }: { items?: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="faq-title" title={title}>
          Money questions are on the{" "}
          <a
            href="/pricing#pricing-faq-title"
            className="text-bone underline decoration-filament/50 underline-offset-4 transition-colors hover:decoration-volt"
          >
            pricing page
          </a>
          .
        </SectionIntro>
        <FaqList items={items} />
      </div>
    </section>
  );
}
