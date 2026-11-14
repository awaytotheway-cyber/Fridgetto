/**
 * Every price on the site, and the words around them (COPY.md §7). Change a number in
 * PRICES and the pricing page, the homepage teaser, the calculator's break-even line,
 * the FAQs, the chat demo and llms.txt all follow.
 *
 * Imports nothing, so it is safe in client and server code.
 */

/** Rupees. The Managed plan is per month. */
export const PRICES = {
  diagnostic: 15_000,
  buildFrom: 2_00_000,
  managedFrom: 39_500,
} as const;

/** The break-even line in the calculator compares against this. */
export const MANAGED_FROM_INR = PRICES.managedFrom;

/** How many days after the diagnostic its fee still counts against a build. */
export const CREDIT_WINDOW_DAYS = 30;

/** ₹ with Indian digit grouping: 200000 becomes ₹2,00,000. Duplicated from lib/pricing so this file imports nothing. */
const inr = (n: number) => {
  const d = String(Math.round(n));
  if (d.length <= 3) return `₹${d}`;
  return `₹${d.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${d.slice(-3)}`;
};

export type PriceCard = {
  id: "diagnostic" | "build" | "managed";
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  includes: string[];
  note?: string;
  cta: { label: string; href: string };
};

export const priceCards: PriceCard[] = [
  {
    id: "diagnostic",
    name: "Front-Desk Diagnostic",
    price: inr(PRICES.diagnostic),
    cadence: "One-time · credited against your build",
    includes: ["A week of test calls and messages", "Your response times, measured", "A written plan and a fixed quote"],
    cta: { label: "Start with a free call", href: "/contact" },
  },
  {
    id: "build",
    name: "Front-Desk Build",
    price: `from ${inr(PRICES.buildFrom)}`,
    cadence: "One-time · one location",
    includes: ["Calls, WhatsApp and website chat", "Booking into your calendar", "Reminders and follow-ups", "30 days of fixes after launch"],
    note: "Chains are quoted individually.",
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
  {
    id: "managed",
    name: "Managed Front Desk",
    price: `from ${inr(PRICES.managedFrom)}`,
    cadence: "per month · optional",
    badge: "Recommended",
    includes: ["Monitoring and alerts", "Updates when anything changes", "A monthly report", "Support within 6 working hours"],
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
];

/** The three figures on the homepage teaser. */
export const pricingTeaser = [
  { name: "Front-Desk Diagnostic", price: inr(PRICES.diagnostic), note: "credited in full against your build" },
  { name: "Front-Desk Build", price: `from ${inr(PRICES.buildFrom)}`, note: "one-time, single location" },
  { name: "Managed Front Desk", price: `from ${inr(PRICES.managedFrom)}/month`, note: "optional" },
];

export const pricingNotes = [
  "Call and message charges are billed by the providers to your own accounts.",
  "Prices exclude GST where applicable. Outside India? We quote in USD.",
];

export const ownershipPoints = [
  { title: "Your accounts", body: "Set up in your name wherever possible." },
  { title: "Your data", body: "Enquiries and reports belong to your clinic." },
  { title: "No lock-in", body: "Stop the managed plan with 30 days' notice." },
];

export const pricingFaqs = [
  {
    question: "Why is the diagnostic paid?",
    answer: `It's a week of real work, and it comes off your build if you go ahead within ${CREDIT_WINDOW_DAYS} days.`,
  },
  {
    question: "Is the managed plan required?",
    answer: "No. It's optional, month to month.",
  },
  {
    question: "What do calls and messages cost?",
    answer: "The providers bill your own accounts for what you use. We estimate it in the diagnostic.",
  },
  {
    question: "How do payments work?",
    answer: "Diagnostic upfront. The build in two halves: half to start, half when the pilot meets its target. UPI or bank transfer.",
  },
  {
    question: "Do prices include GST?",
    answer: "No. GST is extra where it applies.",
  },
];
