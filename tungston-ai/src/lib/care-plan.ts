/**
 * The Care Plan: one standard subscription, billed monthly or yearly.
 *
 * To change what it costs or includes, change it here. The pricing page, the
 * "subscriber price" lines on the service cards and the checkout routes all read
 * from this file. Amounts shown to visitors must match the plans/prices created in
 * the Razorpay and Stripe dashboards (the checkout routes use those ids, not these
 * numbers, to charge).
 *
 * Imports nothing, so it is safe in both client and server code.
 */

export type Billing = "monthly" | "yearly";
export type Provider = "razorpay" | "stripe";

export const CARE_PLAN = {
  name: "Care Plan",
  /** Off the one-time implementation price of any NEW build, while the plan is active. */
  buildDiscountPct: 15,
  price: {
    monthly: { inr: 9_999, usd: 129 },
    /** Two months free against paying monthly. */
    yearly: { inr: 99_990, usd: 1_290 },
  },
  benefits: [
    "Maintenance and upkeep of the systems we built for you",
    "Service updates, fixes and error handling",
    "Priority support, ahead of the standard queue",
    "A designated engineer who knows your setup",
    "15% off the implementation price of any new automation",
  ],
  /** What stays separate. */
  exclusions:
    "New automations and major features are quoted separately (at the subscriber price). AI usage, telephony and hosting are billed by your own providers.",
} as const;

export const BILLING_LABEL: Record<Billing, string> = { monthly: "Monthly", yearly: "Yearly" };

export function isBilling(v: unknown): v is Billing {
  return v === "monthly" || v === "yearly";
}

export function isProvider(v: unknown): v is Provider {
  return v === "razorpay" || v === "stripe";
}

/** A one-time price with the subscriber discount applied, rounded to the nearest ₹100. */
export function subscriberPrice(amount: number, pct: number = CARE_PLAN.buildDiscountPct): number {
  return Math.round((amount * (1 - pct / 100)) / 100) * 100;
}
