import { CtaPair } from "@/components/cta-pair";
import { RevealText } from "@/components/fx/reveal-text";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { siteConfig } from "@/site.config";

type FinalCtaProps = { title?: string; lead?: string };

/** Every page ends here: one headline, the CTA pair, and the direct ways to reach us (COPY.md §2.13). */
export function FinalCta({
  title = "Find out how many patients you're missing.",
  lead = "A free 20-minute call. We'll tell you honestly whether it would pay for itself.",
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 sm:py-36">
      <div aria-hidden="true" className="ambient top-0 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(232_16_26/0.35)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(60%_50%_at_50%_0%,#000,transparent)]"
      />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <RevealText id="cta-title" className="font-display text-display font-semibold text-bone">
            {title}
          </RevealText>
          <p className="mt-6 max-w-xl text-lede text-ash">{lead}</p>
          <CtaPair className="mt-10" />
        </div>
        <dl className="grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
          {siteConfig.contact.whatsapp && (
            <div>
              <dt className="text-sm text-smoke">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="whatsapp_click"
                  className="inline-flex items-center gap-2.5 text-bone hover:text-volt"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" />
                  {siteConfig.contact.whatsapp}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-smoke">Email</dt>
            <dd className="mt-1 [overflow-wrap:anywhere]">
              <a href={`mailto:${siteConfig.contact.email}`} className="text-bone hover:text-volt">
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
