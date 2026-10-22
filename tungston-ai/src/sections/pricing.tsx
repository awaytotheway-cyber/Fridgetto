import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { pricingPlans } from "@/lib/content";
import { siteConfig } from "@/site.config";

export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/2 left-1/2 h-[34rem] w-[60rem] -translate-1/2 opacity-50" />
      <div className="shell relative">
        <SectionIntro id="pricing-title" title="Clear prices. No surprise invoices.">
          Start with a single project or keep a team on retainer. Either way you get a fixed number before any work
          begins.
        </SectionIntro>

        <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3 lg:items-stretch">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-card p-7 sm:p-9 ${
                plan.featured
                  ? "bg-[linear-gradient(180deg,rgb(232_16_26/0.16),rgb(232_16_26/0.03)_55%)] shadow-[var(--shadow-glow)] lg:-my-4 lg:py-13"
                  : "border border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-title font-semibold text-bone">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-volt px-3 py-1 text-[0.8125rem] font-semibold text-void shadow-[0_0_24px_rgb(255_212_0/0.45)]">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-3 text-ash">{plan.pitch}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-[clamp(2.75rem,2.2rem+1.6vw,3.75rem)] leading-none font-semibold tracking-[-0.05em] text-bone">
                  {plan.price}
                </span>
                <span className="text-sm text-smoke">{plan.cadence}</span>
              </p>
              <ul className="mt-8 space-y-3 border-t border-white/[0.08] pt-8 text-[0.9375rem]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-bone/90">
                    <Check aria-hidden="true" className={`mt-0.5 size-4.5 shrink-0 ${plan.featured ? "text-volt" : "text-filament"}`} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink
                  href={siteConfig.contact.bookingUrl}
                  variant={plan.featured ? "primary" : "ghost"}
                  magnetic={false}
                  className="w-full"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
