"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { Check } from "lucide-react";
import { RevealText } from "@/components/fx/reveal-text";
import { BILLING_LABEL, CARE_PLAN, type Billing, type Provider } from "@/lib/care-plan";
import { inr } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Razorpay"));
    document.body.appendChild(s);
  });
}

const THANKS = "Thank you! Your Care Plan is being set up. We'll email you shortly.";

const input =
  "w-full rounded-panel border border-white/[0.12] bg-white/[0.03] px-4 py-3 text-bone placeholder:text-smoke focus:border-filament focus:outline-none";

export function CarePlan() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [busy, setBusy] = useState<Provider | null>(null);
  const [message, setMessage] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  // Stripe sends people back with ?subscribed=1; read it without an effect so it never flashes
  const returnedFromStripe = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("subscribed") === "1",
    () => false,
  );

  const price = CARE_PLAN.price[billing];

  async function pay(provider: Provider, form: HTMLFormElement) {
    setMessage(null);
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setBusy(provider);
    try {
      const res = await fetch(`/api/${provider}/${provider === "stripe" ? "checkout" : "subscribe"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, billing }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ kind: "error", text: out.error || "Something went wrong. Please try again." });
        return;
      }
      if (provider === "stripe") {
        if (out.url) window.location.assign(out.url);
        return;
      }
      await loadRazorpay();
      const rzp = new window.Razorpay!({
        key: out.keyId,
        subscription_id: out.subscriptionId,
        name: "Protomation.ai",
        description: `${CARE_PLAN.name} (${BILLING_LABEL[billing]})`,
        prefill: { name: data.name, email: data.email, contact: data.phone },
        handler: () =>
          setMessage({ kind: "success", text: THANKS }),
      });
      rzp.open();
    } catch {
      setMessage({ kind: "error", text: "Network problem. Please try again." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <section id="care-plan" aria-labelledby="care-plan-title" className="scroll-mt-24 py-16 sm:py-24">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <RevealText
            id="care-plan-title"
            className="font-display text-[clamp(2.1rem,1.3rem+3vw,3.75rem)] leading-[0.98] font-semibold text-bone"
          >
            Care Plan: we keep it running.
          </RevealText>
          <p className="mt-6 max-w-md text-lede text-ash">
            One standard subscription for businesses and individuals. Cancel any time, and you still own everything we
            built.
          </p>
          <ul className="mt-8 space-y-3 text-bone/90">
            {CARE_PLAN.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-filament" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-sm text-smoke">{CARE_PLAN.exclusions}</p>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <div className="rounded-card border border-filament/40 bg-white/[0.02] p-6 sm:p-8">
            <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-white/[0.12] p-1">
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-pressed={billing === b}
                  onClick={() => setBilling(b)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    billing === b ? "bg-filament text-bone" : "text-ash hover:text-bone"
                  }`}
                >
                  {BILLING_LABEL[b]}
                </button>
              ))}
            </div>

            <p className="mt-6 font-display text-[2.5rem] leading-none font-semibold text-bone">
              {inr(price.inr)}
              <span className="text-lg font-normal text-ash"> / {billing === "monthly" ? "month" : "year"}</span>
            </p>
            <p className="mt-2 text-sm text-ash">
              International: ${price.usd.toLocaleString("en-US")} / {billing === "monthly" ? "month" : "year"}
              {billing === "yearly" && " · 2 months free"}
            </p>

            <form
              className="mt-7 space-y-3"
              onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
              aria-label="Subscribe to the Care Plan"
            >
              <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
              <input name="email" type="email" required autoComplete="email" placeholder="Email" className={input} />
              <input name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className={input} />
              <input name="businessName" autoComplete="organization" placeholder="Business (optional)" className={input} />
              {/* Honeypot: real visitors never see or fill this */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {(
                  [
                    ["razorpay", "Pay with Razorpay", "India · UPI, cards, netbanking"],
                    ["stripe", "Pay with Stripe", "International · cards"],
                  ] as const
                ).map(([provider, label, hint]) => (
                  <button
                    key={provider}
                    type="button"
                    disabled={busy !== null}
                    onClick={(e) => pay(provider, e.currentTarget.form!)}
                    className="rounded-panel border border-white/[0.14] px-4 py-3 text-left transition-colors hover:border-filament disabled:opacity-60"
                  >
                    <span className="block font-semibold text-bone">{busy === provider ? "Opening…" : label}</span>
                    <span className="block text-xs text-smoke">{hint}</span>
                  </button>
                ))}
              </div>
            </form>

            <p role="status" aria-live="polite" className={`mt-4 text-sm ${message?.kind === "error" ? "text-red-400" : "text-bone"}`}>
              {message?.text ?? (returnedFromStripe ? THANKS : "")}
            </p>
            <p className="mt-4 text-xs text-smoke">
              Renews automatically until you cancel. Taxes (GST) may apply. You&apos;ll receive a receipt by email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
