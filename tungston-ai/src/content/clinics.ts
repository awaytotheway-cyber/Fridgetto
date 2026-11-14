/** /clinics copy. Each specialty's id is its anchor and its calculator preset. One sentence and three points each. */

export type Specialty = {
  id: string;
  /** Short name for the jump links. */
  short: string;
  /** Calculator preset to open with, if any. */
  preset?: string;
  title: string;
  intro: string;
  does: string[];
  cta?: string;
};

export const clinicsHero = {
  eyebrow: "For clinics",
  title: "An AI front desk for clinics where every patient counts.",
  lead: "Every enquiry answered, qualified and booked. Day and night.",
};

export const specialties: Specialty[] = [
  {
    id: "ivf",
    short: "IVF & fertility",
    preset: "ivf",
    title: "IVF & fertility centres",
    intro: "Couples call several centres in one evening. The first kind, clear answer wins the visit.",
    does: [
      "Answers warmly, after hours too",
      "Shares only the fees and process you approve",
      "Books the first consult and sends reminders",
    ],
    cta: "Run the numbers for IVF",
  },
  {
    id: "dermatology-hair",
    short: "Dermatology & hair",
    preset: "derm-hair",
    title: "Dermatology & hair clinics",
    intro: "Most enquiries start on Instagram with two words: “how much?”",
    does: [
      "Replies in seconds, day or night",
      "Answers price questions, then offers a consult",
      "Follows up while patients are deciding",
    ],
    cta: "Run the numbers for skin and hair",
  },
  {
    id: "dental",
    short: "Dental",
    preset: "dental",
    title: "Dental clinics and chains",
    intro: "Implant and aligner patients compare two or three clinics before they book.",
    does: [
      "Answers for every branch",
      "Explains your EMI options and consult fee",
      "Follows up on treatment plans",
    ],
    cta: "Run the numbers for dental",
  },
  {
    id: "diagnostic-labs",
    short: "Diagnostic labs",
    preset: "diagnostics",
    title: "Diagnostic labs",
    intro: "Home collection is booked early, often for a parent. A fast, confirmed slot wins.",
    does: [
      "Books collection slots by area",
      "Shares the preparation steps you approve",
      "Sends reminders and rebooks cancellations",
    ],
    cta: "Run the numbers for labs",
  },
];
