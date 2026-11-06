import { QuoteButton } from "@/components/pricing/pricing-buttons";
import { RevealText } from "@/components/fx/reveal-text";
import { maintenanceRows } from "@/lib/pricing";

export function Maintenance() {
  return (
    <section aria-labelledby="maintenance-title" className="py-16 sm:py-24">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <RevealText
            id="maintenance-title"
            className="font-display text-[clamp(2.1rem,1.3rem+3vw,3.75rem)] leading-[0.98] font-semibold text-bone"
          >
            Need us to keep everything running?
          </RevealText>
          <p className="mt-6 max-w-md text-lede text-ash">
            You don&apos;t need to subscribe to keep ownership of your system. If you only want upkeep for a single
            system, optional maintenance is available. For everything in one place, plus priority support and a
            designated engineer, see the Care Plan above.
          </p>
          <div className="mt-8">
            <QuoteButton size="lg" magnetic={false} detail={{ service: "Maintenance plan" }}>
              Explore Maintenance Plans
            </QuoteButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-sm text-smoke">Optional monthly maintenance, illustrative starting prices</p>
          <dl className="mt-4 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {maintenanceRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-bone">{row.label}</dt>
                <dd className="font-display font-semibold text-bone">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-ash">
            Content automation managed operations are quoted separately, based on your publishing and production
            responsibilities.
          </p>
          <p className="mt-3 text-sm text-smoke">
            Included support scope, response times, update limits and service levels are defined in the individual
            maintenance agreement.
          </p>
        </div>
      </div>
    </section>
  );
}
