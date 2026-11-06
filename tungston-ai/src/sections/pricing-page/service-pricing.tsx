import { SectionIntro } from "@/components/ui/section-intro";
import { EstimateButton } from "@/components/pricing/pricing-buttons";
import { CARE_PLAN, subscriberPrice } from "@/lib/care-plan";
import { inr, pricingServices, startingPrice, type PricingService } from "@/lib/pricing";

function ServiceCard({ service, wide }: { service: PricingService; wide: boolean }) {
  const { price } = service;
  const base = startingPrice(service.id);
  return (
    <li
      className={`group flex flex-col rounded-card border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-filament/50 sm:p-8 ${
        wide ? "xl:col-span-3 xl:grid xl:grid-cols-2 xl:gap-x-14" : ""
      }`}
    >
      <article aria-labelledby={`price-${service.id}`} className={`flex flex-col ${wide ? "xl:contents" : "h-full"}`}>
        <div>
          <h3 id={`price-${service.id}`} className="font-display text-title font-semibold text-bone">
            {service.name}
          </h3>
          <p className="mt-3 text-ash">{service.description}</p>

          <p className="mt-8 text-xs tracking-wide text-smoke">One-time implementation</p>
          {price.custom ? (
            <>
              <p className="mt-2 inline-block rounded-full border border-filament/60 px-3 py-1 font-display text-lg font-semibold text-bone">
                {price.headline}
              </p>
              <p className="mt-3 text-sm text-ash">{price.detail}</p>
            </>
          ) : (
            <>
              <p className="mt-2 font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.01em] text-bone">
                {price.headline}
              </p>
              {price.detail && <p className="mt-1 font-display text-lg font-semibold text-bone">{price.detail}</p>}
            </>
          )}

          {base !== null && !price.custom && (
            <p className="mt-3 text-sm text-ash">
              <span className="font-semibold text-bone">Care Plan subscribers: from {inr(subscriberPrice(base))}</span>{" "}
              ({CARE_PLAN.buildDiscountPct}% off)
            </p>
          )}

          {service.ongoing && (
            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <p className="text-xs tracking-wide text-smoke">{service.ongoing.label}</p>
              <p className="mt-1 text-bone">{service.ongoing.value}</p>
            </div>
          )}
        </div>

        <div className={`mt-7 flex flex-1 flex-col ${wide ? "xl:mt-0" : ""}`}>
          <ul className="space-y-2.5 border-t border-white/[0.08] pt-6 text-[0.9375rem] text-bone/90 xl:border-t-0 xl:pt-0">
            {service.capabilities.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-0.5 w-3.5 shrink-0 bg-filament" />
                {c}
              </li>
            ))}
          </ul>

          {service.note && <p className="mt-5 text-sm text-ash">{service.note}</p>}

          <div
            className={`mt-5 text-sm ${
              service.usagePriority
                ? "rounded-panel border border-filament/40 bg-filament/[0.06] p-4 text-bone"
                : "text-smoke"
            }`}
          >
            <span className={service.usagePriority ? "font-semibold text-bone" : "font-semibold text-ash"}>
              Third-party usage billed directly.{" "}
            </span>
            {service.usage}
          </div>

          <div className="mt-auto pt-8">
            <EstimateButton service={service.id} className="w-full">
              {service.cta}
            </EstimateButton>
          </div>
        </div>
      </article>
    </li>
  );
}

export function ServicePricing() {
  return (
    <section aria-labelledby="services-pricing-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="services-pricing-title" title="Seven systems. Clear starting prices.">
          Every price below is a one-time implementation fee. Monthly support is optional and never needed to own what we
          build.
        </SectionIntro>
        <ul className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {pricingServices.map((service, i) => (
            // Seven cards leave one alone on the last row at three columns, so it spans the row
            <ServiceCard key={service.id} service={service} wide={i === pricingServices.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
