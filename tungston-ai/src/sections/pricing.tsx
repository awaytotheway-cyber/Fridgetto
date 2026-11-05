import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { buildPackages } from "@/lib/pricing";

/** The three ways to start, from the same data as the Pricing page. Details live there. */
export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/2 left-1/2 h-[34rem] w-[60rem] -translate-1/2 opacity-50" />
      <div className="shell relative">
        <SectionIntro id="pricing-title" title="Clear prices. No surprise invoices.">
          Every project starts with a one-time implementation price. Ongoing maintenance is optional, and you own what we
          build.
        </SectionIntro>

        <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3 lg:items-stretch">
          {buildPackages.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-card p-7 sm:p-9 ${
                plan.featured
                  ? "border border-filament/70 bg-filament/[0.05]"
                  : "border border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-filament px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap text-white sm:left-9">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-display text-title font-semibold text-bone">{plan.name}</h3>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[1.875rem] leading-tight font-semibold text-bone">{plan.price}</span>
                {plan.cadence && <span className="text-sm text-smoke">{plan.cadence}</span>}
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6 text-[0.9375rem]">
                {plan.includes.map((f) => (
                  <li key={f} className="flex gap-3 text-bone/90">
                    <Check aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-filament" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink href="/pricing" variant={plan.featured ? "primary" : "ghost"} magnetic={false} className="w-full">
                  See full pricing
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
