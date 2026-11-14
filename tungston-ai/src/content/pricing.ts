/**
 * Every price on the site, and the words around them. Change a number in PRICES and
 * the pricing page, the homepage teaser, the calculator's break-even line, the FAQs,
 * the chat demo and llms.txt all follow.
 *
 * Imports nothing, so it is safe in client and server code.
 */

/** Rupees. The Managed Plan is per month. */
export const PRICES = {
  audit: 15_000,
  singleFrom: 50_000,
  systemFrom: 2_00_000,
  managedFrom: 39_500,
} as const;

/** The break-even line in the calculator compares against this. */
export const MANAGED_FROM_INR = PRICES.managedFrom;

/** How many days after the audit its fee still counts against a build. */
export const CREDIT_WINDOW_DAYS = 30;

/** The paid first step's name, used everywhere it's mentioned. */
export const AUDIT_NAME = "Clinic Automation Audit";

/** ₹ with Indian digit grouping: 200000 becomes ₹2,00,000. Duplicated from lib/pricing so this file imports nothing. */
const inr = (n: number) => {
  const d = String(Math.round(n));
  if (d.length <= 3) return `₹${d}`;
  return `₹${d.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${d.slice(-3)}`;
};

export type PriceCard = {
  id: "audit" | "single" | "system" | "managed";
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
    id: "audit",
    name: AUDIT_NAME,
    price: inr(PRICES.audit),
    cadence: "One-time · credited against your build",
    includes: ["We map how your clinic runs", "We find what to automate first", "A written plan and a fixed quote"],
    cta: { label: "Start with a free call", href: "/contact" },
  },
  {
    id: "single",
    name: "Single automation",
    price: `from ${inr(PRICES.singleFrom)}`,
    cadence: "One-time",
    includes: ["One automation, such as booking or reminders", "Connected to your tools", "30 days of fixes after launch"],
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
  {
    id: "system",
    name: "Full clinic system",
    price: `from ${inr(PRICES.systemFrom)}`,
    cadence: "One-time · one location",
    includes: ["Booking, chat and follow-ups together", "Voice, reports or software workflows as needed", "30 days of fixes after launch"],
    note: "Chains are quoted individually.",
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
  {
    id: "managed",
    name: "Managed Plan",
    price: `from ${inr(PRICES.managedFrom)}`,
    cadence: "per month · optional",
    includes: ["Monitoring and alerts", "Updates when anything changes", "A monthly report", "Support within 6 working hours"],
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
];

/** The figures on the homepage teaser. */
export const pricingTeaser = [
  { name: AUDIT_NAME, price: inr(PRICES.audit), note: "credited against your build" },
  { name: "Single automation", price: `from ${inr(PRICES.singleFrom)}`, note: "one-time" },
  { name: "Full clinic system", price: `from ${inr(PRICES.systemFrom)}`, note: "one-time, one location" },
  { name: "Managed Plan", price: `from ${inr(PRICES.managedFrom)}/month`, note: "optional" },
];

export const pricingNotes = [
  "Call and message charges are billed by the providers to your own accounts.",
  "Prices exclude GST where applicable. Outside India? We quote in USD.",
];

export const ownershipPoints = [
  { title: "Your accounts", body: "Set up in your name wherever possible." },
  { title: "Your data", body: "Patient data and reports belong to your clinic." },
  { title: "No lock-in", body: "Stop the Managed Plan with 30 days' notice." },
];

export const pricingFaqs = [
  {
    question: "Why is the audit paid?",
    answer: `It's real work, and it comes off your build if you go ahead within ${CREDIT_WINDOW_DAYS} days.`,
  },
  {
    question: "Can we start with one automation?",
    answer: `Yes. Most clinics start with one, from ${inr(PRICES.singleFrom)}, and add more later.`,
  },
  {
    question: "Is the Managed Plan required?",
    answer: "No. It's optional, month to month.",
  },
  {
    question: "What do calls and messages cost?",
    answer: "The providers bill your own accounts for what you use. We estimate it in the audit.",
  },
  {
    question: "How do payments work?",
    answer: "The audit upfront. Builds in two halves: half to start, half when the pilot meets its target. UPI or bank transfer.",
  },
  {
    question: "Do prices include GST?",
    answer: "No. GST is extra where it applies.",
  },
];
