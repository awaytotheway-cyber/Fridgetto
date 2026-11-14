/** /diagnostic copy (COPY.md §6). The price comes from content/pricing.ts. */
import { CREDIT_WINDOW_DAYS, PRICES } from "@/content/pricing";

const price = `₹${new Intl.NumberFormat("en-IN").format(PRICES.diagnostic)}`;

export const diagnosticHero = {
  eyebrow: "Front-Desk Diagnostic",
  title: "Find out exactly where your enquiries leak.",
  lead: `A fixed-price check of how your clinic handles calls, WhatsApp and ad leads today, with a written plan and a fixed quote at the end. ${price}, credited in full against your build.`,
};

export const diagnostic = {
  what: "A paid, fixed-scope audit of your front desk as a patient experiences it. We don't need access to patient records.",
  includes: [
    "Test calls and WhatsApp messages at different times across a week, including lunch hours, evenings and a Sunday",
    "Your response-time baseline: how fast, and how often, each channel answers",
    "A review of where your leads come from (Meta, Google, website, walk-ins) and what happens to them",
    "A 30-minute conversation with your front-desk lead",
    "An estimate of what missed enquiries cost you, using your own numbers",
    "A recommended setup and a fixed quote",
  ],
  deliverable: "A written report, plus a 30-minute walkthrough call. It's yours to keep, whether or not you build with us.",
  timing: "Report within 7 working days of kick-off.",
  price,
  priceTerms: `Paid upfront by UPI or bank transfer. Credited in full against your build if you go ahead within ${CREDIT_WINDOW_DAYS} days. Prices exclude GST where applicable.`,
  whyPaid:
    "Because it's real work: a week of test calls, a baseline and a plan. Paying for it gets you our full attention, and if you go ahead it costs you nothing extra.",
  next: "Start with a free 20-minute call. If the diagnostic makes sense, we'll book it from there.",
};
