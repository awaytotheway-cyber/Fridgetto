import { Money } from "@/components/currency/money";
import { Counter } from "@/components/fx/counter";
import { InView } from "@/components/illustrations/in-view";
import { at } from "@/components/illustrations/stagger";
import { computeSavings, defaultInputs } from "@/lib/services/savings";
import type { ServiceDetail } from "@/lib/services/types";
import type { ReactNode } from "react";

function Stat({ label, children, i }: { label: string; children: ReactNode; i: number }) {
  return (
    <div className="flex flex-col-reverse gap-2 border-white/[0.07] lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
      <dt className="text-sm text-ash">{label}</dt>
      <dd style={at(i)} className="il-in font-display text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-none font-semibold tracking-[-0.015em] text-bone tabular-nums">
        {children}
      </dd>
    </div>
  );
}

/** Headline numbers, worked out from the calculator's starting values so the page always agrees with itself. */
export function ServiceStats({ s }: { s: ServiceDetail }) {
  const inr = computeSavings(s.savings, defaultInputs(s.savings, "inr"));
  const usd = computeSavings(s.savings, defaultInputs(s.savings, "usd"));
  return (
    <section aria-label="Typical results" className="border-y border-white/[0.07] bg-white/[0.015]">
      <InView>
        <dl className="shell grid grid-cols-2 gap-x-6 gap-y-9 py-10 sm:py-12 lg:grid-cols-4">
          <Stat label="Hours saved every month" i={0}>
            <Counter value={Math.round(inr.hoursPerMonth)} />
          </Stat>
          <Stat label="Saved every month" i={1}>
            <Money inr={inr.moneyPerMonth} usd={usd.moneyPerMonth} compact />
          </Stat>
          <Stat label="Saved every year" i={2}>
            <Money inr={inr.moneyPerYear} usd={usd.moneyPerYear} compact />
          </Stat>
          <Stat label={s.highlight.label} i={3}>
            <span className="text-signal">{s.highlight.value}</span>
          </Stat>
        </dl>
      </InView>
      <p className="shell pb-6 text-xs text-smoke">
        Estimates for a typical business at the calculator&apos;s starting values.{" "}
        <a href="#savings" className="text-ash underline decoration-filament/60 underline-offset-4 hover:text-bone">
          Work out yours
        </a>
      </p>
    </section>
  );
}
