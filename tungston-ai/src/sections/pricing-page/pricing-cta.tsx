import { QuoteButton } from "@/components/pricing/pricing-buttons";
import { ButtonLink } from "@/components/ui/button";
import { RevealText } from "@/components/fx/reveal-text";
import { siteConfig } from "@/site.config";

export function PricingCta() {
  return (
    <section aria-labelledby="pricing-cta-title" className="relative overflow-hidden py-24 sm:py-36">
      <div aria-hidden="true" className="ambient top-0 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(232_16_26/0.35)_1px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(60%_50%_at_50%_0%,#000,transparent)]"
      />
      <div className="shell relative">
        <RevealText id="pricing-cta-title" className="max-w-4xl font-display text-display font-semibold text-bone">
          Your next business advantage starts with one conversation.
        </RevealText>
        <p className="mt-6 max-w-xl text-lede text-ash">
          Tell us what slows your business down. We&apos;ll help you identify the right AI system, the implementation
          required and a realistic investment.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <QuoteButton size="lg" magnetic={false}>
            Get a Custom Quote
          </QuoteButton>
          <ButtonLink href={siteConfig.contact.bookingUrl} variant="ghost" size="lg" magnetic={false}>
            Book a Discovery Call
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
