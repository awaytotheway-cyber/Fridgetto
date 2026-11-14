/** /diagnostic copy, kept short. The price comes from content/pricing.ts. */
import { CREDIT_WINDOW_DAYS, PRICES } from "@/content/pricing";

const price = `₹${new Intl.NumberFormat("en-IN").format(PRICES.diagnostic)}`;

export const diagnosticHero = {
  eyebrow: "Front-Desk Diagnostic",
  title: "Find out exactly where your enquiries leak.",
  lead: `A fixed-price check of your front desk, with a plan and a quote. ${price}, credited against your build.`,
};

export const diagnostic = {
  what: "We test your front desk the way a patient would. No access to patient records needed.",
  includes: [
    "Test calls and WhatsApp messages across a week",
    "How fast, and how often, you answer",
    "Where your leads come from",
    "A recommended setup and a fixed quote",
  ],
  deliverable: "A written report and a 30-minute walkthrough. Yours to keep.",
  timing: "Ready within 7 working days.",
  price,
  priceTerms: `Paid upfront by UPI or bank transfer. Credited in full if you build within ${CREDIT_WINDOW_DAYS} days. GST extra where applicable.`,
  whyPaid: "It's a week of real work. If you go ahead, it costs you nothing extra.",
  next: "Start with a free 20-minute call.",
};
