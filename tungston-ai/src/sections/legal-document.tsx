import type { LegalDoc } from "@/lib/legal";
import { siteConfig } from "@/site.config";

/**
 * Renders one legal document: a column of plain prose, narrow enough to read
 * comfortably, with the contact line the last section of every such page.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <section className="shell pb-24 sm:pb-32">
      <div className="max-w-2xl">
        <p className="text-sm text-smoke">Last updated {siteConfig.legal.lastUpdated}</p>

        <div className="mt-12 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading} aria-labelledby={slug(section.heading)}>
              <h2
                id={slug(section.heading)}
                className="font-display text-title font-semibold tracking-[-0.01em] text-bone"
              >
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="space-y-2.5">
                      {block.map((item) => (
                        <li key={item} className="flex gap-3 text-ash">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-filament" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="text-ash">
                      {block}
                    </p>
                  ),
                )}
              </div>
            </section>
          ))}

          <section aria-labelledby="legal-contact">
            <h2 id="legal-contact" className="font-display text-title font-semibold tracking-[-0.01em] text-bone">
              Contact
            </h2>
            <p className="mt-4 text-ash">
              {siteConfig.legalName}, {siteConfig.legal.entity} based in India. Questions, requests and complaints go
              to{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="[overflow-wrap:anywhere] text-bone underline decoration-filament/50 underline-offset-4 transition-colors hover:decoration-volt"
              >
                {siteConfig.contact.email}
              </a>
              , and a person reads it.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

/** "What we collect" -> "what-we-collect", so each heading is linkable. */
function slug(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
