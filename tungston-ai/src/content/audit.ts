/** /audit copy: the paid first step. The price and name come from content/pricing.ts. */
import { AUDIT_NAME, CREDIT_WINDOW_DAYS, PRICES } from "@/content/pricing";

const price = `₹${new Intl.NumberFormat("en-IN").format(PRICES.audit)}`;

export const auditHero = {
  eyebrow: AUDIT_NAME,
  title: "Find out what's worth automating first.",
  lead: `We map how your clinic runs and give you a plan and a fixed quote. ${price}, credited against your build.`,
};

export const audit = {
  name: AUDIT_NAME,
  what: "We look at your clinic the way a patient and your staff experience it. No access to patient records needed.",
  includes: [
    "How patients reach you, and how fast you reply",
    "Where bookings, follow-ups and reports slip",
    "The admin your team repeats every day",
    "A plan for what to automate first, with a fixed quote",
  ],
  deliverable: "A written plan and a 30-minute walkthrough. Yours to keep.",
  timing: "Ready within 7 working days.",
  price,
  priceTerms: `Paid upfront by UPI or bank transfer. Credited in full if you build within ${CREDIT_WINDOW_DAYS} days. GST extra where applicable.`,
  whyPaid: "It's real work. If you go ahead, it costs you nothing extra.",
  next: "Start with a free 20-minute call.",
};
