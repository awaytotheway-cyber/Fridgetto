/**
 * Questions and answers. Each list also becomes FAQPage structured data on the page
 * that shows it. Money questions live in content/pricing.ts. Keep answers to two
 * short sentences, and true of how we actually work.
 */
import type { FaqItem } from "@/components/ui/faq-list";
import { PRICES } from "@/content/pricing";

const inr = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

const sounds: FaqItem = {
  question: "Do the AI calls sound robotic?",
  answer: "No. It sounds like a calm receptionist, and callers can interrupt or change their mind. Try the demo and judge for yourself.",
};
const languages: FaqItem = {
  question: "Which languages does it speak?",
  answer: "Hindi and English, switching if the caller does. Marathi and other languages on request.",
};
const human: FaqItem = {
  question: "What if a patient wants a person?",
  answer: "They get one. During clinic hours the call goes to your desk; after hours your team gets a message.",
};
const medical: FaqItem = {
  question: "Will it give medical advice?",
  answer: "No. It only shares what you approve, like timings and fees. Medical questions go to your doctors.",
};
const integrations: FaqItem = {
  question: "Does it work with our hospital software?",
  answer: "Often, yes, if your software allows connections or exports. The audit checks yours before you spend anything on a build.",
};
const speed: FaqItem = {
  question: "How fast can we go live?",
  answer: "A single automation in 1–3 weeks. A full clinic system in 3–6 weeks.",
};
const cost: FaqItem = {
  question: "What does it cost?",
  answer: `The audit is ${inr(PRICES.audit)}. Single automations from ${inr(PRICES.singleFrom)}, a full clinic system from ${inr(PRICES.systemFrom)}, and an optional Managed Plan from ${inr(PRICES.managedFrom)} a month.`,
};
const stop: FaqItem = {
  question: "What if we want to stop?",
  answer: "Give 30 days' notice. Your number, accounts and data stay yours.",
};

export const homeFaqs: FaqItem[] = [integrations, speed, human, medical, languages, stop];

export const clinicFaqs: FaqItem[] = [
  sounds,
  languages,
  human,
  medical,
  {
    question: "Can it handle several branches?",
    answer: "Yes. It answers for every branch and books into the right calendar.",
  },
  {
    question: "Do we need a new phone number?",
    answer: "No. Missed or after-hours calls can be forwarded to it.",
  },
  integrations,
  cost,
];

export const educationFaqs: FaqItem[] = [
  {
    question: "Can it call leads in other countries?",
    answer: "Yes, where local calling rules allow. We check them first.",
  },
  {
    question: "Does it work with our CRM?",
    answer: "Usually. The audit confirms yours.",
  },
  {
    question: "Will it pressure students?",
    answer: "No. It follows up politely, and anyone who asks to stop is never contacted again.",
  },
  cost,
];
