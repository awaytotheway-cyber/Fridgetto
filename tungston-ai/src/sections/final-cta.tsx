import { ContactForm } from "@/components/contact-form";
import { RevealText } from "@/components/fx/reveal-text";
import { siteConfig } from "@/site.config";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-24 sm:py-36">
      <div aria-hidden="true" className="ambient top-0 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(232_16_26/0.35)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(60%_50%_at_50%_0%,#000,transparent)]"
      />
      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <RevealText id="cta-title" className="font-display text-display font-semibold text-bone">
            Your Competitors Are Already Using AI.
          </RevealText>
          <p className="mt-6 max-w-md text-lede text-ash">
            Tell us one task that eats your week. We&apos;ll come back within one business day with how we&apos;d
            automate it, free.
          </p>
          <dl className="mt-12 grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-smoke">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.contact.email}`} className="text-bone hover:text-volt">
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            {siteConfig.contact.phone && (
              <div>
                <dt className="text-sm text-smoke">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="text-bone hover:text-volt">
                    {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
