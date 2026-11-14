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
    includes: [
      "Test calls and WhatsApp messages across a week",
      "Response-time baseline and lead-source review",
      "Missed-enquiry estimate with your numbers",
      "Written report, walkthrough and a fixed quote",
    ],
    cta: { label: "Start with a free call", href: "/contact" },
  },
  {
    id: "build",
    name: "Front-Desk Build",
    price: `from ${inr(PRICES.buildFrom)}`,
    cadence: "One-time · single location",
    includes: [
      "Voice line, WhatsApp and website chat",
      "Booking into your calendar or clinic software",
      "Knowledge base written with you",
      "Reminders, follow-ups and human handoff rules",
      "Pilot on one channel with one agreed number",
      "30 days of fixes after go-live",
    ],
    note: "Chains and multi-location clinics are quoted individually.",
    cta: { label: "Book a free 20-min call", href: "/contact" },
  },
  {
    id: "managed",
    name: "Managed Front Desk",
    price: `from ${inr(PRICES.managedFrom)}`,
    cadence: "per month · optional · month to month",
    badge: "Recommended",
    includes: [
      "Monitoring and alerts",
      "Updates when your fees, doctors or timings change",
      "Test calls after every change",
      "Monthly report on consults booked",
      "Support within 6 working hours",
    ],
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
  "Call minutes, WhatsApp messages and AI usage are billed by the providers directly to your own accounts, so you see every rupee. We estimate them for you in the diagnostic.",
  "Outside India? We quote in USD. Ask on the call.",
  "Prices exclude GST where applicable.",
];

export const ownershipPoints = [
  {
    title: "Your accounts",
    body: "Phone number, WhatsApp Business account and AI provider accounts are set up in your name wherever possible.",
  },
  { title: "Your data", body: "Enquiries, recordings and reports belong to your clinic." },
  {
    title: "No lock-in",
    body: "Stop the Managed plan with 30 days' notice, and we hand over everything you need to run it yourself.",
  },
  { title: "A fixed quote", body: "The build price is fixed after the diagnostic." },
];

export const pricingFaqs = [
  {
    question: "Why is the diagnostic paid?",
    answer: `It's a week of real work: test calls, a response-time baseline and a written plan. The fee comes off your build if you go ahead within ${CREDIT_WINDOW_DAYS} days.`,
  },
  {
    question: "Is the Managed plan required?",
    answer:
      "No. Without it, you get a full handover and 30 days of fixes after go-live. With it, we monitor the front desk, keep it up to date and report every month.",
  },
  {
    question: "What do call minutes and messages cost?",
    answer:
      "They're billed by the telephony, WhatsApp and AI providers to your own accounts, based on how much you use. We estimate your monthly usage in the diagnostic so there are no surprises.",
  },
  {
    question: "Who owns the accounts and the data?",
    answer:
      "You do, wherever possible. Your phone number, WhatsApp Business account, calendar and AI provider accounts are in your name, and we work in them with access you can remove.",
  },
  {
    question: "How long is the contract?",
    answer: "The build is a one-time project. The Managed plan is month to month, with 30 days' notice.",
  },
  {
    question: "How do payments work?",
    answer:
      "The diagnostic is paid upfront. The build is paid in two halves: half to start, and half when the pilot hits the number we agreed. The Managed plan is billed monthly in advance. We take UPI or bank transfer.",
  },
  {
    question: "Do you work outside India?",
    answer: "Yes. We quote in USD for clients outside India. Ask on the call.",
  },
  {
    question: "Do prices include GST?",
    answer: "No. Prices exclude GST where it applies.",
  },
];
