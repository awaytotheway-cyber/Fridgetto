"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/section-intro";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import {
  defaultInputs,
  defaultServices,
  estimate,
  serviceModels,
  serviceTitle,
  WORK_WEEK_HOURS,
  type EstimatorInputs,
} from "@/lib/estimator";
import { siteConfig } from "@/site.config";

const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const usd = (n: number) => {
  const v = Math.round(n);
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(v >= 10_000_000 ? 1 : 2)}M`;
  return `$${num.format(v)}`;
};
const fmtHours = (n: number) => num.format(Math.round(n));
const fmtFte = (n: number) => (n < 10 ? n.toFixed(1) : num.format(Math.round(n)));
const fmtPlus = (n: number) => `+${num.format(Math.round(n))}`;
const fmtPct = (n: number) => `+${Math.round(n)}%`;

/**
 * A number that counts to each new value instead of jumping. React renders it once;
 * after that the tween owns the text, so a re-render never flashes the end value.
 */
function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const [initial] = useState(() => format(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown.current === value) return;
    if (prefersReducedMotion()) {
      shown.current = value;
      el.textContent = format(value);
      return;
    }
    const state = { n: shown.current };
    const tween = gsap.to(state, {
      n: value,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => {
        shown.current = state.n;
        el.textContent = format(state.n);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, format]);

  return <span ref={ref}>{initial}</span>;
}

type Field = {
  key: keyof EstimatorInputs;
  label: string;
  hint?: string;
  min: number;
  max: number;
  step?: number;
  /** Spread the slider logarithmically, for ranges that span orders of magnitude. */
  log?: boolean;
  /** Rounds a raw slider value to something a person would type. */
  snap?: (v: number) => number;
  format: (v: number) => string;
};

const LOG_STOPS = 200;

const teamFields: Field[] = [
  {
    key: "team",
    label: "Team size",
    hint: "People whose week includes repetitive work",
    min: 1,
    max: 200,
    log: true,
    snap: (v) => (v < 20 ? Math.round(v) : v < 100 ? Math.round(v / 5) * 5 : Math.round(v / 10) * 10),
    format: (v) => `${v} ${v === 1 ? "person" : "people"}`,
  },
  {
    key: "hoursPerWeek",
    label: "Hours each spends on busywork",
    hint: "Data entry, follow-ups, answering the same questions",
    min: 1,
    max: 30,
    format: (v) => `${v} hrs / week`,
  },
  {
    key: "hourlyCost",
    label: "Cost of an hour of their time",
    hint: "Salary plus overheads",
    min: 10,
    max: 150,
    step: 5,
    format: (v) => `$${v} / hr`,
  },
];

const pipelineFields: Field[] = [
  {
    key: "leads",
    label: "New leads or enquiries",
    min: 10,
    max: 5000,
    log: true,
    snap: (v) => (v < 100 ? Math.round(v / 5) * 5 : v < 1000 ? Math.round(v / 10) * 10 : Math.round(v / 50) * 50),
    format: (v) => `${num.format(v)} / month`,
  },
  {
    key: "dealValue",
    label: "What a new customer is worth",
    hint: "Average revenue in their first year",
    min: 100,
    max: 50000,
    log: true,
    snap: (v) => (v < 1000 ? Math.round(v / 50) * 50 : v < 10000 ? Math.round(v / 250) * 250 : Math.round(v / 1000) * 1000),
    format: usd,
  },
  {
    key: "closeRate",
    label: "Leads that become customers",
    min: 1,
    max: 60,
    format: (v) => `${v}%`,
  },
];

function toPosition(field: Field, value: number) {
  if (!field.log) return value;
  return Math.round((Math.log(value / field.min) / Math.log(field.max / field.min)) * LOG_STOPS);
}

function fromPosition(field: Field, position: number) {
  const raw = field.log ? field.min * Math.pow(field.max / field.min, position / LOG_STOPS) : position;
  const value = field.snap ? field.snap(raw) : raw;
  return Math.min(field.max, Math.max(field.min, value));
}

function Slider({ field, value, onChange }: { field: Field; value: number; onChange: (v: number) => void }) {
  const id = `estimate-${field.key}`;
  const min = field.log ? 0 : field.min;
  const max = field.log ? LOG_STOPS : field.max;
  const position = toPosition(field, value);
  const fill = ((position - min) / (max - min)) * 100;
  // On log sliders one step can round back to the same value; keep going until it changes
  const move = (next: number) => {
    const dir = Math.sign(next - position);
    let p = next;
    let v = fromPosition(field, p);
    while (dir && v === value && p > min && p < max) {
      p += dir;
      v = fromPosition(field, p);
    }
    onChange(v);
  };
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium text-bone">
          {field.label}
        </label>
        <output htmlFor={id} className="shrink-0 font-display text-lg font-medium text-bone tabular-nums">
          {field.format(value)}
        </output>
      </div>
      {field.hint && <p className="mt-0.5 text-sm text-smoke">{field.hint}</p>}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={field.log ? 1 : (field.step ?? 1)}
        value={position}
        aria-valuetext={field.format(value)}
        data-cursor
        onChange={(e) => move(Number(e.target.value))}
        className="range mt-3"
        style={{ "--fill": `${fill.toFixed(2)}%` } as CSSProperties}
      />
    </div>
  );
}

function Group({ legend, step, children }: { legend: string; step: number; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3 font-display text-title font-semibold text-bone">
        <span className="font-display text-sm font-medium text-signal tabular-nums">{String(step).padStart(2, "0")}</span>
        {legend}
      </legend>
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

/** Half-ring that fills with the lead lift. */
function Gauge({ pct }: { pct: number }) {
  const length = Math.PI * 20;
  return (
    <svg viewBox="0 0 48 26" aria-hidden="true" className="h-6 w-11 shrink-0">
      <path d="M4 24a20 20 0 0 1 40 0" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M4 24a20 20 0 0 1 40 0"
        fill="none"
        stroke="var(--color-volt)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - Math.min(pct, 100) / 100)}
        className="transition-[stroke-dashoffset] duration-700 ease-out-expo"
      />
    </svg>
  );
}

function Stat({ label, children, sub }: { label: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="flex flex-col-reverse gap-1">
      <dt className="text-sm leading-snug text-ash">
        {label}
        {sub && <span className="mt-0.5 block text-[0.8125rem] text-smoke">{sub}</span>}
      </dt>
      <dd className="flex items-end gap-2 font-display text-[clamp(1.6rem,1.3rem+0.9vw,2.1rem)] leading-none font-semibold tracking-[-0.01em] text-bone tabular-nums">
        {children}
      </dd>
    </div>
  );
}

/** One person's 40-hour week: busywork eats the end of each day, and the systems take part of it back. */
function WeekGrid({ repetitive, freed }: { repetitive: number; freed: number }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const perDay = WORK_WEEK_HOURS / days.length;
  // Hours are dealt out across the days from the end of the day backwards, so the load spreads evenly
  const state = (day: number, slot: number) => {
    const i = (perDay - 1 - slot) * days.length + day;
    return i < freed ? "freed" : i < repetitive ? "busy" : "work";
  };
  return (
    <figure>
      <div className="space-y-2.5" aria-hidden="true">
        {days.map((d, day) => (
          <div key={d} className="flex items-center gap-4">
            <span className="w-8 text-[0.8125rem] text-smoke">{d}</span>
            <div className="flex flex-1 justify-between gap-1.5 sm:gap-2.5">
              {Array.from({ length: perDay }, (_, slot) => {
                const s = state(day, slot);
                return (
                  <span
                    key={slot}
                    data-state={s}
                    style={{ transitionDelay: `${(perDay - 1 - slot) * 35 + day * 12}ms` }}
                    className="aspect-square w-full max-w-7 rounded-full bg-white/[0.07] transition-[background-color,box-shadow,transform] duration-500 ease-out-expo data-[state=busy]:bg-filament data-[state=busy]:shadow-[0_0_12px_rgb(232_16_26/0.55)] data-[state=freed]:scale-110 data-[state=freed]:bg-volt data-[state=freed]:shadow-[0_0_16px_rgb(255_212_0/0.6)]"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ash">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-volt" /> Handed to AI
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-filament" /> Busywork left
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-white/15" /> Everything else
        </span>
        <span className="sr-only">
          Each person gets {freed} of their {repetitive} weekly busywork hours back.
        </span>
      </figcaption>
    </figure>
  );
}

export function SavingsEstimator() {
  const [inputs, setInputs] = useState<EstimatorInputs>(defaultInputs);
  const [selected, setSelected] = useState<string[]>(defaultServices);
  const result = useMemo(() => estimate(inputs, selected), [inputs, selected]);

  // A calm, spoken summary once the sliders settle, instead of announcing every step
  const [summary, setSummary] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      setSummary(
        selected.length
          ? `Estimate: ${fmtHours(result.hoursPerMonth)} hours and ${usd(result.moneyPerMonth)} saved a month, plus ${fmtPlus(result.extraLeads)} leads.`
          : "Pick at least one system to see an estimate.",
      );
    }, 800);
    return () => clearTimeout(t);
  }, [result, selected.length]);

  const set = (key: keyof EstimatorInputs) => (value: number) => setInputs((prev) => ({ ...prev, [key]: value }));
  const toggle = (slug: string) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  const allSelected = selected.length === serviceModels.length;

  return (
    <section id="estimate" aria-labelledby="estimate-title" className="relative overflow-clip py-24 sm:py-32">
      <div aria-hidden="true" className="ambient top-1/3 -right-60 h-[34rem] w-[48rem] opacity-50" />
      <div className="shell relative">
        <SectionIntro id="estimate-title" title="Put a number on it.">
          Slide in a few facts about your business and pick the systems you&apos;re curious about. The estimate updates
          as you go.
        </SectionIntro>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-7">
            <Group legend="Pick the systems you're curious about" step={1}>
              <div className="flex flex-wrap gap-2.5">
                {serviceModels.map((m) => {
                  const on = selected.includes(m.slug);
                  return (
                    <button
                      key={m.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(m.slug)}
                      className="group/chip inline-flex items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[0.9375rem] text-ash transition-[background-color,border-color,color,box-shadow] duration-300 hover:border-white/30 hover:text-bone aria-pressed:border-filament aria-pressed:bg-filament/15 aria-pressed:text-bone aria-pressed:shadow-[0_0_24px_-6px_rgb(232_16_26/0.7)]"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-white/20 transition-[background-color,box-shadow] duration-300 group-aria-pressed/chip:bg-volt group-aria-pressed/chip:shadow-[0_0_10px_rgb(255_212_0/0.8)]"
                      />
                      {serviceTitle(m.slug)}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelected(allSelected ? [] : serviceModels.map((m) => m.slug))}
                  className="rounded-full px-4 py-2.5 text-[0.9375rem] text-smoke underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone"
                >
                  {allSelected ? "Clear all" : "Select all"}
                </button>
              </div>
            </Group>

            <Group legend="Tell us about your team" step={2}>
              <div className="space-y-7">
                {teamFields.map((f) => (
                  <Slider key={f.key} field={f} value={inputs[f.key]} onChange={set(f.key)} />
                ))}
              </div>
            </Group>

            <Group legend="And your pipeline" step={3}>
              <div className="space-y-7">
                {pipelineFields.map((f) => (
                  <Slider key={f.key} field={f} value={inputs[f.key]} onChange={set(f.key)} />
                ))}
              </div>
            </Group>

            {/* Phones: the headline numbers ride along at the bottom while the sliders are on screen */}
            <div
              aria-hidden="true"
              className="sticky bottom-3 z-10 grid grid-cols-3 gap-2 rounded-panel border border-white/10 bg-carbon/90 px-4 py-3 text-center shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] backdrop-blur-lg lg:hidden"
            >
              <p className="flex flex-col">
                <span className="font-display text-xl font-semibold text-volt tabular-nums">
                  <AnimatedNumber value={result.hoursPerMonth} format={fmtHours} />
                </span>
                <span className="text-xs text-smoke">hrs / month</span>
              </p>
              <p className="flex flex-col">
                <span className="font-display text-xl font-semibold text-bone tabular-nums">
                  <AnimatedNumber value={result.moneyPerMonth} format={usd} />
                </span>
                <span className="text-xs text-smoke">saved / month</span>
              </p>
              <p className="flex flex-col">
                <span className="font-display text-xl font-semibold text-bone tabular-nums">
                  <AnimatedNumber value={result.extraLeads} format={fmtPlus} />
                </span>
                <span className="text-xs text-smoke">leads / month</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-card bg-[linear-gradient(180deg,rgb(232_16_26/0.16),rgb(232_16_26/0.03)_55%)] p-7 shadow-[var(--shadow-glow)] sm:p-9 lg:top-28 lg:[@media(min-height:50rem)]:sticky">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-medium text-signal">Your estimate</h3>
                <span className="flex items-center gap-1.5 text-[0.8125rem] text-ash">
                  <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-volt motion-reduce:animate-none" />
                  Live
                </span>
              </div>
              <p className="mt-6 font-display text-[clamp(3.75rem,2.8rem+3.4vw,6rem)] leading-[0.9] font-semibold tracking-[-0.025em] text-volt tabular-nums [text-shadow:0_0_40px_rgb(255_212_0/0.25)]">
                <AnimatedNumber value={result.hoursPerMonth} format={fmtHours} />
              </p>
              <p className="mt-3 text-lede leading-snug text-bone">hours back every month</p>
              <p className="mt-1 text-sm text-ash">
                About <AnimatedNumber value={result.fte} format={fmtFte} /> full-time people&apos;s worth of time
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/[0.08] pt-8">
                <Stat label="Saved every month" sub={<><AnimatedNumber value={result.moneyPerYear} format={usd} /> a year</>}>
                  <AnimatedNumber value={result.moneyPerMonth} format={usd} />
                </Stat>
                <Stat label="Extra leads a month">
                  <AnimatedNumber value={result.extraLeads} format={fmtPlus} />
                </Stat>
                <Stat label="More leads than today">
                  <AnimatedNumber value={result.leadLiftPct} format={fmtPct} />
                  <Gauge pct={result.leadLiftPct} />
                </Stat>
                <Stat label="Extra revenue a month">
                  <AnimatedNumber value={result.extraRevenuePerMonth} format={usd} />
                </Stat>
              </dl>

              <div className="mt-9">
                <ButtonLink href={siteConfig.contact.bookingUrl} magnetic={false} className="w-full">
                  Get my real numbers
                </ButtonLink>
              </div>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-smoke">
                {selected.length
                  ? "Based on typical results from comparable projects. The free audit replaces these with your real numbers."
                  : "Pick at least one system to see an estimate."}
              </p>
              <p role="status" className="sr-only">
                {summary}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-14 border-t border-white/[0.08] pt-12 sm:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h3 className="font-display text-title font-semibold text-bone">Where the hours come from</h3>
            {result.breakdown.length ? (
              <ul className="mt-8 space-y-6">
                {result.breakdown.map((b) => {
                  const model = serviceModels.find((m) => m.slug === b.slug);
                  const share = result.hoursPerMonth ? (b.hours / result.hoursPerMonth) * 100 : 0;
                  return (
                    <li key={b.slug}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-medium text-bone">{serviceTitle(b.slug)}</span>
                        <span className="shrink-0 text-sm text-ash tabular-nums">
                          <AnimatedNumber value={b.hours} format={fmtHours} /> hrs / month
                        </span>
                      </div>
                      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-filament-deep),var(--color-filament)_70%,var(--color-volt))] transition-[width] duration-700 ease-out-expo"
                          style={{ width: `${share.toFixed(2)}%` }}
                        />
                      </div>
                      {model && <p className="mt-2 text-sm text-smoke">{model.how}</p>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-6 text-ash">Pick a system above to see what it takes off your team&apos;s plate.</p>
            )}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="font-display text-title font-semibold text-bone">One person&apos;s week</h3>
            <p className="mt-2 text-ash">
              <span className="font-medium text-volt">{result.week.freed}</span> of their{" "}
              {result.week.repetitive} busywork hours, handed to AI every week.
            </p>
            <div className="mt-8">
              <WeekGrid repetitive={result.week.repetitive} freed={result.week.freed} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
