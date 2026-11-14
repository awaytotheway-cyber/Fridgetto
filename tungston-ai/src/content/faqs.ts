/**
 * Questions and answers (COPY.md §2.12, §3.6, §4). Each list also becomes FAQPage
 * structured data on the page that shows it. Money questions live in content/pricing.ts.
 *
 * Every answer has to be true of how we actually work. If one stops being true,
 * change it here rather than softening it.
 */
import type { FaqItem } from "@/components/ui/faq-list";
import { PRICES } from "@/content/pricing";

const inr = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

const sounds: FaqItem = {
  question: "Does it sound robotic?",
  answer:
    "No. It sounds like a calm, well-trained receptionist. Callers can interrupt, change their mind and ask things out of order. Don't take our word for it: try the demo front desk and judge for yourself.",
};
const languages: FaqItem = {
  question: "Which languages does it speak?",
  answer:
    "Hindi and English, and it switches if the caller does. Marathi and other Indian languages are available on request; we test them with you before they go live.",
};
const human: FaqItem = {
  question: "What if a patient wants to speak to a person?",
  answer:
    "They get one. You set the rules: during clinic hours the call is transferred to your desk; after hours it takes a message and alerts your team. Anything medical always goes to your doctors.",
};
const medical: FaqItem = {
  question: "Will it give medical advice?",
  answer:
    "No. It shares only what you approve, such as timings, consult fees and how to prepare. Clinical questions go to your doctors.",
};
const integrations: FaqItem = {
  question: "Does it work with my calendar, clinic software and WhatsApp?",
  answer:
    "Usually, yes. It books into Google Calendar or your clinic software if that software can connect, and it can reply on WhatsApp once your WhatsApp Business account is connected. If something can't connect, the diagnostic tells you before you spend anything on a build.",
};
const safe: FaqItem = {
  question: "Is patient data safe?",
  answer:
    "Callers are told about the AI and the recording, data stays in accounts you own wherever possible, and we sign a data processing agreement with every clinic. The details are on our Security & data page.",
};
const speed: FaqItem = {
  question: "How fast can we go live?",
  answer: "Most clinics go live 3–5 weeks after the diagnostic. A single phone line can be quicker.",
};
const cost: FaqItem = {
  question: "What does it cost?",
  answer: `A Front-Desk Diagnostic is ${inr(PRICES.diagnostic)} and comes off your build. Builds start at ${inr(PRICES.buildFrom)} for one location. The Managed Front Desk is optional and starts at ${inr(PRICES.managedFrom)} a month. Call minutes and WhatsApp messages are billed by the providers directly to your own accounts.`,
};
const stop: FaqItem = {
  question: "What happens if we want to stop?",
  answer:
    "The Managed plan runs month to month with 30 days' notice. The phone number, WhatsApp account and data are yours, so you keep them, and we hand over everything you need to run it yourself.",
};

export const homeFaqs: FaqItem[] = [sounds, languages, human, medical, integrations, safe, speed, cost, stop];

export const clinicFaqs: FaqItem[] = [
  sounds,
  languages,
  human,
  medical,
  integrations,
  {
    question: "Can it handle several branches?",
    answer:
      "Yes. It can answer for every branch from one number or from each branch's own number, and book into the right calendar.",
  },
  {
    question: "Do we need to change our phone number?",
    answer:
      "No. We can forward missed or after-hours calls to it, or give it its own number for your ads. You choose in the diagnostic.",
  },
  speed,
  cost,
];

export const educationFaqs: FaqItem[] = [
  {
    question: "Can it call leads in other countries?",
    answer: "Yes, where local calling rules allow. We check the rules for each country before outbound calls are switched on.",
  },
  {
    question: "Does it work with our CRM?",
    answer: "Usually. It can update common CRMs and spreadsheets, and the diagnostic confirms yours.",
  },
  {
    question: "Will it pressure students?",
    answer:
      "No. It answers questions, books a session and follows up politely on a schedule you approve. Anyone who asks to stop is never contacted again.",
  },
  languages,
  cost,
];
