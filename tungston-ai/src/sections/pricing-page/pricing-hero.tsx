import { Check } from "lucide-react";
import { DotGrid } from "@/components/fx/dot-grid";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

const trust = ["One-time implementation fee", "No compulsory maintenance subscription", "You own your delivered system"];

export function PricingHero() {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-40 pb-16 sm:pt-52 sm:pb-24">
      <DotGrid
        className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(120%_90%_at_70%_30%,#000_35%,transparent_95%)]"
        spacing={24}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-void" />
      <div className="shell">
        <p className="page-intro font-mono text-xs tracking-[0.2em] text-signal uppercase">
          Transparent pricing. Custom built systems.
        </p>
        <h1
          id="page-title"
          className="page-intro mt-6 max-w-5xl font-display text-[clamp(2.5rem,1.4rem+4.6vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-bone"
        >
          AI systems built around your business. Pricing built around your needs.
        </h1>
        <p className="mt-8 max-w-2xl text-lede text-ash">
          From intelligent voice agents to advanced business automation, we build systems that take repetitive work off
          your plate. Start with a clear implementation price, then choose the level of ongoing support your business
          needs.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#estimator" size="lg" magnetic={false}>
            Estimate Your Project Cost
          </ButtonLink>
          <ButtonLink href={siteConfig.contact.bookingUrl} variant="ghost" size="lg" magnetic={false}>
            Book a Discovery Call
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-col gap-3 text-sm text-ash sm:flex-row sm:flex-wrap sm:gap-x-8">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <Check aria-hidden="true" className="size-4 shrink-0 text-filament" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
