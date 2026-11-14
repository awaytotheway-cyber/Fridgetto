import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";
import { pricingIntro } from "@/content/home";
import { pricingTeaser } from "@/content/pricing";

/** The three prices, from the same data as the Pricing page (COPY.md §2.10). */
export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/2 left-1/2 h-[34rem] w-[60rem] -translate-1/2 opacity-50" />
      <div className="shell relative">
        <SectionIntro id="pricing-title" title={pricingIntro.title}>
          {pricingIntro.line}
        </SectionIntro>
        <dl className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {pricingTeaser.map((item) => (
            <div key={item.name} className="flex flex-col-reverse rounded-card border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">
              <dt className="mt-3">
                <span className="block font-medium text-bone">{item.name}</span>
                <span className="mt-1 block text-sm text-smoke">{item.note}</span>
              </dt>
              <dd className="font-display text-[clamp(1.9rem,1.5rem+1.2vw,2.6rem)] leading-tight font-semibold text-bone">
                {item.price}
              </dd>
            </div>
          ))}
        </dl>
        <Link
          href="/pricing"
          className="mt-8 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
        >
          See full pricing <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
