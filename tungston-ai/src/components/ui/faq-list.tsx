export type FaqItem = { question: string; answer: string };

/**
 * A list of questions as <details>, so the answers open with JavaScript switched off
 * and are in the DOM for search engines either way.
 *
 * Shared by the homepage and the pricing page. Their questions are deliberately
 * disjoint — see the note on `homeFaqs` in src/lib/content.ts.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="mt-12 border-t border-white/[0.08]">
      {items.map((faq) => (
        <details key={faq.question} className="group border-b border-white/[0.08] py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-title font-semibold text-bone transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-ash">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** The same questions as schema.org FAQPage, for the rich result. */
export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
