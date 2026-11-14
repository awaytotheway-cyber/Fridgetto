"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { calculate, type CalculatorInputs } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import {
  calculatorCopy,
  clinicPresets,
  educationPresets,
  type Preset,
  type Vertical,
} from "@/content/calculator";
import { MANAGED_FROM_INR } from "@/content/pricing";

const num = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const sig = new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 });

/** ₹7,20,000 up to a lakh-and-a-bit, then ₹7.2 L and ₹1.23 Cr. */
function money(n: number) {
  const v = Math.round(n);
  if (v >= 99_95_000) return `₹${sig.format(v / 1_00_00_000)} Cr`;
  if (v >= 10_00_000) return `₹${sig.format(v / 1_00_000)} L`;
  return `₹${num.format(v)}`;
}

const oneDecimal = (n: number) => (n >= 100 ? num.format(Math.round(n)) : n.toFixed(1).replace(/\.0$/, ""));

function breakEven(value: number | null, unit: string) {
  if (value === null) return "—";
  if (value < 1) return `Less than 1 ${unit.replace(/s$/, "")}`;
  return `${oneDecimal(value)} ${unit}`;
}

type Props = { vertical: Vertical; initialPreset?: string };

export function MissedEnquiryCalculator({ vertical, initialPreset }: Props) {
  const presets: Record<string, Preset> = vertical === "clinic" ? clinicPresets : educationPresets;
  const ids = Object.keys(presets);
  const first = initialPreset && ids.includes(initialPreset) ? initialPreset : ids[0];
  const copy = calculatorCopy[vertical];

  const [preset, setPreset] = useState(first);
  const [inputs, setInputs] = useState<CalculatorInputs>(presets[first].inputs);
  const counted = useRef(false);
  const uid = useId();

  const touched = () => {
    if (counted.current) return;
    counted.current = true;
    trackEvent("calculator_used", preset);
  };

  const choose = (id: string) => {
    setPreset(id);
    setInputs(presets[id].inputs);
    touched();
  };

  const set = (key: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    touched();
  };

  const result = calculate(inputs);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <fieldset>
          <legend className="font-display text-title font-semibold text-bone">{copy.presetLabel}</legend>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {ids.map((id) => (
              <label
                key={id}
                className="group/chip relative inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[0.9375rem] text-ash transition-[background-color,border-color,color] duration-300 hover:border-white/30 hover:text-bone has-[:checked]:border-filament has-[:checked]:bg-filament/15 has-[:checked]:text-bone has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-volt"
              >
                <input
                  type="radio"
                  name={`${uid}-preset`}
                  value={id}
                  checked={preset === id}
                  onChange={() => choose(id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-white/20 transition-colors duration-300 peer-checked:bg-volt"
                />
                {presets[id].label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-12 space-y-8">
          {copy.fields.map((field) => {
            const id = `${uid}-${field.key}`;
            const value = inputs[field.key];
            const fill = Math.min(100, Math.max(0, (value / field.max) * 100));
            return (
              <div key={field.key}>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <label htmlFor={id} className="font-medium text-bone">
                      {field.label}
                    </label>
                    {field.help && (
                      <p id={`${id}-help`} className="mt-0.5 text-sm text-smoke">
                        {field.help}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-field bg-white/[0.035] px-3 ring-1 ring-white/[0.09] focus-within:ring-2 focus-within:ring-filament">
                    {field.unit === "₹" && <span className="text-smoke">₹</span>}
                    <input
                      id={id}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={field.unit === "%" ? 100 : undefined}
                      step={field.step}
                      value={Number.isFinite(value) ? value : 0}
                      aria-describedby={field.help ? `${id}-help` : undefined}
                      onChange={(e) => set(field.key, e.target.value === "" ? 0 : Number(e.target.value))}
                      className="h-11 w-24 bg-transparent text-right font-display text-lg font-medium text-bone tabular-nums outline-none [appearance:textfield] sm:w-28 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {field.unit === "%" && <span className="text-smoke">%</span>}
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={field.max}
                  step={field.step}
                  value={Math.min(value, field.max)}
                  aria-label={`${field.label} slider`}
                  aria-valuetext={field.unit === "₹" ? money(value) : `${num.format(value)}${field.unit === "%" ? "%" : ""}`}
                  data-cursor
                  onChange={(e) => set(field.key, Number(e.target.value))}
                  className="range mt-3"
                  style={{ "--fill": `${fill.toFixed(2)}%` } as CSSProperties}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div
          aria-live="polite"
          className="rounded-card bg-[linear-gradient(180deg,rgb(232_16_26/0.16),rgb(232_16_26/0.03)_55%)] p-7 shadow-[var(--shadow-glow)] sm:p-9 lg:sticky lg:top-28"
        >
          <p className="text-sm font-medium text-smoke">{copy.riskLabel}</p>
          <p className="mt-4 font-display text-[clamp(3rem,2.4rem+3vw,5rem)] leading-[0.95] font-semibold tracking-[-0.025em] text-volt tabular-nums [text-shadow:0_0_40px_rgb(255_212_0/0.25)]">
            {money(result.revenueAtRisk)}
          </p>
          <dl className="mt-8 grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-sm text-ash">{copy.lostLabel}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-bone tabular-nums">
                {oneDecimal(result.patientsLost)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ash">
                {copy.breakEvenLabel} ({money(MANAGED_FROM_INR)})
              </dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-bone tabular-nums">
                {breakEven(result.breakEvenPatients, copy.lostUnit)}
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-smoke">{copy.disclaimer}</p>
          <Link
            href={copy.cta.href}
            className="mt-6 inline-flex items-center gap-2 font-medium text-bone underline decoration-filament/60 underline-offset-4 transition-colors hover:decoration-volt"
          >
            {copy.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
