"use client";

import { useState, type CSSProperties } from "react";
import { CurrencySwitch } from "@/components/currency/currency-switch";
import { useMarket } from "@/components/currency/use-market";
import { SavingsMeter } from "@/components/illustrations/savings-meter";
import { formatMoney, MARKETS, type Market, type RateSpec } from "@/lib/currency";
import { computeSavings, defaultInputs, hourlyRate, type SavingsInputs } from "@/lib/services/savings";
import { fromPosition, SLIDER_STOPS, toPosition } from "@/lib/services/slider";
import type { SavingsModel, SliderSpec } from "@/lib/services/types";
import { SectionHeading } from "./section-heading";

const counts: Record<Market, Intl.NumberFormat> = {
  inr: new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }),
  usd: new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }),
};

type SliderProps = {
  id: string;
  label: string;
  range: Pick<SliderSpec | RateSpec, "min" | "max" | "step">;
  value: number;
  display: string;
  onChange: (value: number) => void;
};

function Slider({ id, label, range, value, display, onChange }: SliderProps) {
  const position = toPosition(range, value);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium text-bone">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 font-display text-lg font-medium text-bone tabular-nums">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={SLIDER_STOPS}
        step={1}
        value={position}
        aria-valuetext={display}
        data-cursor
        onChange={(e) => onChange(fromPosition(range, Number(e.target.value)))}
        className="range mt-3"
        style={{ "--fill": `${((position / SLIDER_STOPS) * 100).toFixed(2)}%` } as CSSProperties}
      />
    </div>
  );
}

function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col-reverse gap-1.5">
      <dt className="text-sm leading-snug text-ash">
        {label}
        {sub && <span className="mt-0.5 block text-[0.8125rem] text-smoke">{sub}</span>}
      </dt>
      <dd className="font-display text-[clamp(1.6rem,1.3rem+0.9vw,2.2rem)] leading-none font-semibold tracking-[-0.01em] text-bone tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/** The service's own savings calculator. Switching ₹ / $ swaps in that market's salaries. */
export function SavingsCalculator({ model, title }: { model: SavingsModel; title: string }) {
  const market = useMarket();
  const [inputs, setInputs] = useState<SavingsInputs>(() => defaultInputs(model, "usd"));
  const [inputsMarket, setInputsMarket] = useState<Market>("usd");
  // A new market brings its own cost of an hour; volume and minutes stay as the visitor set them
  if (market !== inputsMarket) {
    setInputsMarket(market);
    setInputs((current) => ({ ...current, hourly: hourlyRate(model, market).value }));
  }

  const result = computeSavings(model, inputs);
  const count = counts[market];
  const rate = hourlyRate(model, market);
  const money = (n: number) => formatMoney(n, market, { compact: true });
  const fte = result.fte;
  const meterLabel =
    fte < 1
      ? `${Math.round(fte * 100)}% of a full-time person's month`
      : `${fte.toFixed(1)} full-time people's worth`;

  return (
    <section id="savings" aria-labelledby="savings-title" className="relative scroll-mt-24 overflow-x-clip py-20 sm:py-28">
      <div aria-hidden="true" className="ambient top-10 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 opacity-50" />
      <div className="shell relative">
        <SectionHeading id="savings-title" index="05" eyebrow="Your savings" title="See what you'd save">
          Move the sliders to match your business. Every figure updates as you go.
        </SectionHeading>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="rounded-card border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-display text-title font-semibold text-bone">Your numbers</p>
              <CurrencySwitch />
            </div>
            <div className="mt-8 space-y-8">
              <Slider
                id="calc-volume"
                label={model.volume.label}
                range={model.volume}
                value={inputs.volume}
                display={count.format(inputs.volume)}
                onChange={(volume) => setInputs((c) => ({ ...c, volume }))}
              />
              <Slider
                id="calc-minutes"
                label={model.minutes.label}
                range={model.minutes}
                value={inputs.minutes}
                display={`${count.format(inputs.minutes)} min`}
                onChange={(minutes) => setInputs((c) => ({ ...c, minutes }))}
              />
              <Slider
                id="calc-hourly"
                label="Cost of an hour of your team's time"
                range={rate}
                value={inputs.hourly}
                display={`${formatMoney(inputs.hourly, market)} / hr`}
                onChange={(hourly) => setInputs((c) => ({ ...c, hourly }))}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-card border border-filament/35 bg-[radial-gradient(120%_90%_at_100%_0%,rgb(232_16_26/0.16),rgb(12_12_13/0.6)_60%)] p-6 sm:p-8 lg:col-span-5">
            <p className="text-sm font-semibold tracking-widest text-signal uppercase">With {title}</p>
            <div className="mx-auto mt-4 max-w-xs">
              <SavingsMeter fraction={Math.min(1, fte)} label={meterLabel} />
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
              <Result label="Hours saved a month" value={count.format(Math.round(result.hoursPerMonth))} />
              <Result label="Saved every month" value={money(result.moneyPerMonth)} />
              <Result label="Saved every year" value={money(result.moneyPerYear)} />
              <Result label="Team time freed" value={`${fte < 10 ? fte.toFixed(1) : Math.round(fte)} FTE`} sub="full-time people" />
            </dl>
            <p aria-live="polite" className="sr-only">
              {`Estimate: ${Math.round(result.hoursPerMonth)} hours and ${money(result.moneyPerMonth)} saved a month.`}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-panel border border-white/[0.06] p-5 text-sm text-smoke sm:p-6">
          <p className="font-medium text-ash">This is an estimate. Your free audit gives exact numbers. It assumes:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            {model.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
            <li>
              {MARKETS.inr.label} figures use Indian salaries and {MARKETS.usd.label} figures use US salaries. Switching
              currency swaps the salary, it does not convert.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
