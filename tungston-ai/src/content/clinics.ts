/** /clinics copy. Each specialty's id is its anchor and its calculator preset. One sentence and three automations each. */

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
  title: "AI automation for clinics where every patient counts.",
  lead: "Bookings, follow-ups, reports and admin, automated for your specialty."
};

export const specialties: Specialty[] = [
  {
    id: "ivf",
    short: "IVF & fertility",
    preset: "ivf",
    title: "IVF & fertility centres",
    intro: "Couples call several centres in one evening. The first kind, clear answer wins the visit.",
    does: [
      "Answers enquiries warmly, after hours too",
      "Books consults and sends reminders",
      "Follows up between appointments",
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
      "Replies to Instagram and WhatsApp leads in seconds",
      "Books consults and sends reminders",
      "Follows up after treatment",
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
      "Books appointments for every branch",
      "Follows up on treatment plans",
      "Sends recall reminders",
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
      "Books home collection by area",
      "Sends reports on WhatsApp automatically",
      "Reminds patients and rebooks cancellations",
    ],
    cta: "Run the numbers for labs",
  },
];
