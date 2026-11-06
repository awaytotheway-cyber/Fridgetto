import { Check } from "lucide-react";
import { QuoteButton } from "@/components/pricing/pricing-buttons";
import { SectionIntro } from "@/components/ui/section-intro";
import { buildPackages } from "@/lib/pricing";

export function BuildPackages() {
  return (
    <section aria-labelledby="packages-title" className="py-16 sm:py-24">
      <div className="shell">
        <SectionIntro id="packages-title" title="Not sure where to start?">
          Three ways to begin. Each is a one-time build. Ongoing support via the Care Plan is always your choice.
        </SectionIntro>
        <ul className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {buildPackages.map((pkg) => (
            <li
              key={pkg.name}
              className={`relative flex flex-col rounded-card p-7 sm:p-9 ${
                pkg.featured
                  ? "border border-filament/70 bg-filament/[0.05]"
                  : "border border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-filament px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap text-white sm:left-9">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-display text-title font-semibold text-bone">{pkg.name}</h3>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[1.875rem] leading-tight font-semibold text-bone">{pkg.price}</span>
                {pkg.cadence && <span className="text-sm text-smoke">{pkg.cadence}</span>}
              </p>
              <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6 text-[0.9375rem]">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-bone/90">
                    <Check aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-filament" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              {pkg.optional && <p className="mt-6 text-sm text-ash">{pkg.optional}</p>}
              {pkg.note && <p className="mt-3 text-sm text-smoke">{pkg.note}</p>}
              <div className="mt-auto pt-9">
                <QuoteButton
                  variant={pkg.featured ? "primary" : "ghost"}
                  magnetic={false}
                  className="w-full"
                  detail={{ service: "Not sure yet", requirements: `I'm interested in the ${pkg.name}.` }}
                >
                  Discuss Your Project
                </QuoteButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
