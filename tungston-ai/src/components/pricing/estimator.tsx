"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  describeAmount,
  estimate,
  estimatorServices,
  maintenanceChoices,
  pricingServices,
  requirements,
  type MaintenanceChoice,
  type RequirementId,
  type ServiceId,
} from "@/lib/pricing";
import { siteConfig } from "@/site.config";
import { ESTIMATE_ATTR } from "./pricing-events";
import { QuoteButton } from "./pricing-buttons";

const STEPS = ["What to build", "Functionality", "Requirements", "Support"] as const;

/** A radio or checkbox drawn as a card. The input is real, only visually hidden. */
const choice =
  "relative flex cursor-pointer gap-4 rounded-panel border border-white/[0.09] bg-white/[0.02] p-5 transition-colors hover:border-white/25 has-[:checked]:border-filament has-[:checked]:bg-filament/[0.07] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt";

/**
 * "What will your AI system cost?" Four short steps, then an indicative range. The range
 * is shown before any contact details are asked for; the quote form only opens if the
 * visitor chooses it. All the numbers come from lib/pricing.ts.
 */
export function Estimator() {
  const [service, setService] = useState<ServiceId | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [extras, setExtras] = useState<RequirementId[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceChoice | null>(null);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // A service card's link starts the estimator on that service. The site's smooth scroller
  // stops anchor clicks in the capture phase, so this listens there too (other listeners on
  // the same node still run).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`[${ESTIMATE_ATTR}]`);
      const id = link?.getAttribute(ESTIMATE_ATTR) as ServiceId | null | undefined;
      if (!id || !estimatorServices.some((s) => s.id === id)) return;
      setService(id);
      setLevel(null);
      setExtras([]);
      setMaintenance(null);
      setDone(false);
      setStep(2);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // After a step change, move keyboard and screen-reader focus to the new heading
  useEffect(() => {
    if (!moved.current) {
      moved.current = true;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step, done]);

  const def = estimatorServices.find((s) => s.id === service) ?? null;
  const result =
    done && service && level && maintenance
      ? estimate({ service, level, extras, maintenance })
      : null;

  const pickService = (id: ServiceId) => {
    if (id !== service) {
      setService(id);
      setLevel(null);
      setExtras([]);
    }
  };

  const toggle = (id: RequirementId) =>
    setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const reset = () => {
    setService(null);
    setLevel(null);
    setExtras([]);
    setMaintenance(null);
    setDone(false);
    setStep(1);
  };

  const canContinue = (step === 1 && service) || (step === 2 && level) || step === 3 || (step === 4 && maintenance);

  return (
    <div className="rounded-card border border-white/[0.09] bg-carbon p-5 sm:p-9">
      {/* Progress */}
      <ol aria-label="Progress" className="flex gap-2 sm:gap-3">
        {STEPS.map((name, i) => {
          const n = i + 1;
          const state = done || n < step ? "done" : n === step ? "current" : "todo";
          return (
            <li key={name} className="flex-1" aria-current={state === "current" && !done ? "step" : undefined}>
              <span className={`block h-1 rounded-full ${state === "todo" ? "bg-white/[0.1]" : "bg-filament"}`} />
              <span
                className={`mt-2 hidden text-xs tracking-wide sm:block ${state === "todo" ? "text-smoke" : "text-bone"}`}
              >
                {n}. {name}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 sm:mt-10">
        {result ? (
          <Result result={result} onReset={reset} headingRef={heading} onBack={() => setDone(false)} />
        ) : (
          <>
            {step === 1 && (
              <fieldset>
                <legend className="sr-only">
                  Step 1 of 4: What do you want to build?
                </legend>
                <StepTitle refEl={heading} n={1} title="What do you want to build?" />
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {estimatorServices.map((s) => (
                    <label key={s.id} className={`${choice} items-center`}>
                      <input
                        type="radio"
                        name="est-service"
                        value={s.id}
                        checked={service === s.id}
                        onChange={() => pickService(s.id)}
                        className="peer sr-only"
                      />
                      <Dot />
                      <span className="font-display font-semibold text-bone">{s.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && def && (
              <fieldset>
                <legend className="sr-only">Step 2 of 4: What level of functionality do you need?</legend>
                <StepTitle refEl={heading} n={2} title="What level of functionality do you need?" />
                <div className="mt-6 grid gap-3">
                  {def.levels.map((l) => (
                    <label key={l.id} className={`${choice} items-start`}>
                      <input
                        type="radio"
                        name="est-level"
                        value={l.id}
                        checked={level === l.id}
                        onChange={() => setLevel(l.id)}
                        className="peer sr-only"
                      />
                      <Dot className="mt-1" />
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                          <span className="font-display font-semibold text-bone">{l.label}</span>
                          <span className="text-sm text-signal">{describeAmount(l.amount)}</span>
                        </span>
                        <span className="mt-1 block text-sm text-ash">{l.blurb}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && def && (
              <fieldset>
                <legend className="sr-only">Step 3 of 4: What additional requirements do you have? Optional.</legend>
                <StepTitle refEl={heading} n={3} title="What additional requirements do you have?" />
                <p className="mt-2 text-sm text-smoke">Optional. Choose any that apply.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {requirements
                    .filter((r) => def.extras.includes(r.id))
                    .map((r) => (
                      <label key={r.id} className={`${choice} items-center`}>
                        <input
                          type="checkbox"
                          name="est-extra"
                          value={r.id}
                          checked={extras.includes(r.id)}
                          onChange={() => toggle(r.id)}
                          className="peer sr-only"
                        />
                        <Box />
                        <span className="text-bone">{r.label}</span>
                      </label>
                    ))}
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend className="sr-only">Step 4 of 4: Do you want ongoing support?</legend>
                <StepTitle refEl={heading} n={4} title="Do you want ongoing support?" />
                <p className="mt-2 text-sm text-smoke">Support is always optional. You own your system with or without the Care Plan.</p>
                <div className="mt-6 grid gap-3">
                  {maintenanceChoices.map((m) => (
                    <label key={m.id} className={`${choice} items-start`}>
                      <input
                        type="radio"
                        name="est-maintenance"
                        value={m.id}
                        checked={maintenance === m.id}
                        onChange={() => setMaintenance(m.id)}
                        className="peer sr-only"
                      />
                      <Dot className="mt-1" />
                      <span>
                        <span className="block font-display font-semibold text-bone">{m.label}</span>
                        <span className="mt-1 block text-sm text-ash">{m.hint}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-ash transition-colors hover:text-bone"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" /> Back
                </button>
              ) : (
                <span />
              )}
              <Button
                type="button"
                disabled={!canContinue}
                onClick={() => (step === 4 ? setDone(true) : setStep(step + 1))}
                icon={<ArrowRight aria-hidden="true" className="size-4" />}
              >
                {step === 4 ? "Show my estimate" : "Continue"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StepTitle({ n, title, refEl }: { n: number; title: string; refEl: React.Ref<HTMLHeadingElement> }) {
  return (
    <>
      <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">Step {n} of 4</p>
      <h3 ref={refEl} tabIndex={-1} className="mt-3 font-display text-title font-semibold text-bone outline-none">
        {title}
      </h3>
    </>
  );
}

/** Radio mark: its inner dot fills when the sibling input is checked. */
function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-5 shrink-0 place-items-center rounded-full border border-white/25 transition-colors peer-checked:border-filament peer-checked:[&>span]:scale-100 ${className}`}
    >
      <span className="size-2.5 scale-0 rounded-full bg-filament transition-transform" />
    </span>
  );
}

/** Checkbox mark. */
function Box() {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 shrink-0 place-items-center rounded-md border border-white/25 text-transparent transition-colors peer-checked:border-filament peer-checked:bg-filament peer-checked:text-white"
    >
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

function Result({
  result,
  onReset,
  onBack,
  headingRef,
}: {
  result: ReturnType<typeof estimate>;
  onReset: () => void;
  onBack: () => void;
  headingRef: React.Ref<HTMLHeadingElement>;
}) {
  const serviceName = pricingServices.find((s) => s.id === result.service.id)?.name ?? result.service.label;
  const rows: [string, string][] = [
    ["Service", result.service.label],
    ["Functionality", result.level.label],
  ];

  return (
    <div>
      <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">Your indicative estimate</p>
      <h3 ref={headingRef} tabIndex={-1} className="sr-only">
        Estimate for {result.service.label}
      </h3>

      <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="text-sm text-smoke">One-time implementation</p>
          <p className="mt-2 font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-bone">
            {result.implementation}
          </p>

          {result.monthly && (
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="text-sm text-smoke">Optional ongoing support (Care Plan)</p>
              <p className="mt-2 font-display text-title font-semibold text-bone">{result.monthly.text}</p>
              {result.monthly.note && <p className="mt-2 max-w-md text-sm text-ash">{result.monthly.note}</p>}
            </div>
          )}

          <p className="mt-8 max-w-md rounded-panel border border-white/[0.09] bg-white/[0.02] p-4 text-sm text-ash">
            <span className="font-semibold text-bone">Indicative only, not a final quotation.</span> Your price depends on
            your exact requirements and integrations. AI usage, telephony, hosting and other third-party costs are paid
            directly to your own providers and are not included.
          </p>
        </div>

        <div className="lg:col-span-5">
          <h4 className="text-sm font-semibold tracking-wide text-bone">What this is based on</h4>
          <dl className="mt-4 divide-y divide-white/[0.08] border-y border-white/[0.08] text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="text-smoke">{k}</dt>
                <dd className="text-right text-bone">{v}</dd>
              </div>
            ))}
            {result.included.length > 0 && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-smoke">Covered by this band</dt>
                <dd className="text-right text-bone">{result.included.join(", ")}</dd>
              </div>
            )}
            {result.scoped.length > 0 && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-smoke">Scoped in your quote</dt>
                <dd className="text-right text-bone">{result.scoped.join(", ")}</dd>
              </div>
            )}
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-smoke">Ongoing support</dt>
              <dd className="text-right text-bone">{result.monthly ? "Care Plan, as shown" : "None, you manage it"}</dd>
            </div>
          </dl>
          {result.scoped.length > 0 && (
            <p className="mt-3 text-sm text-smoke">
              Requirements marked &ldquo;scoped in your quote&rdquo; can raise the final price. We price them once we know
              exactly what you need, so they are not guessed at here.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-8 sm:flex-row sm:flex-wrap sm:items-center">
        <QuoteButton
          size="lg"
          magnetic={false}
          detail={{ service: serviceName, budget: result.budget, estimate: result.summary }}
        >
          Get My Custom Quote
        </QuoteButton>
        <ButtonLink href={siteConfig.contact.bookingUrl} variant="ghost" size="lg" magnetic={false}>
          Book a Discovery Call
        </ButtonLink>
        <span className="flex gap-4 sm:ml-auto">
          <button type="button" onClick={onBack} className="rounded-full px-3 py-2 text-sm text-ash transition-colors hover:text-bone">
            Change answers
          </button>
          <button type="button" onClick={onReset} className="rounded-full px-3 py-2 text-sm text-ash transition-colors hover:text-bone">
            Start over
          </button>
        </span>
      </div>
    </div>
  );
}
