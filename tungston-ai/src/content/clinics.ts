/** /clinics copy (COPY.md §3). Each specialty's id is its anchor and its calculator preset. */

export type Specialty = {
  id: string;
  /** Calculator preset to open with, if any. */
  preset?: string;
  title: string;
  intro: string;
  arrive: string;
  leaks: string[];
  does: string[];
  report: string[];
  cta?: string;
};

export const clinicsHero = {
  eyebrow: "For clinics",
  title: "An AI front desk for clinics where every patient counts.",
  lead: "IVF and fertility centres, dermatology and hair transplant clinics, dental chains and diagnostic labs. Every enquiry answered in seconds, qualified and booked, in Hindi, Marathi or English.",
};

export const specialties: Specialty[] = [
  {
    id: "ivf",
    preset: "ivf",
    title: "IVF & fertility centres",
    intro:
      "Couples often research for weeks, then contact several centres in the same evening. The centre that answers kindly and clearly, and offers a first consult, usually gets the visit.",
    arrive: "Phone calls after work, WhatsApp messages about cost and process, and leads from Meta and Google ads.",
    leaks: [
      "Calls after 7pm with nobody to answer",
      "Cost questions on WhatsApp left until the next day",
      "Ad leads called back hours later, when they no longer pick up",
      "First consults booked but not confirmed, so the couple doesn't come",
    ],
    does: [
      "Answers warmly in Hindi, Marathi or English",
      "Shares only what you approve: consult fee, process, timings, documents to bring",
      "Books the first consultation, and asks whether both partners will attend",
      "Sends reminders and handles reschedules",
      "Never discusses success rates or medical specifics; those go to your counsellor or doctor",
    ],
    report: ["Enquiries by source and time of day", "First consults booked", "No-shows and reschedules", "Follow-ups sent and answered"],
    cta: "Run the numbers for IVF",
  },
  {
    id: "dermatology-hair",
    preset: "derm-hair",
    title: "Dermatology & hair transplant clinics",
    intro:
      "Most enquiries start on Instagram or a Meta ad, often with a photo and a two-word message: “how much?” The clinic that replies fast and moves the conversation to a consult wins.",
    arrive: "Instagram and WhatsApp messages, ad lead forms, and calls about specific treatments.",
    leaks: [
      "Messages answered hours later",
      "Price questions answered with a price, but no consult offered",
      "Consults booked but not reminded",
      "No follow-up after the consult, while the patient is still deciding",
    ],
    does: [
      "Replies in seconds, day or night",
      "Answers price questions with the ranges you approve, then offers a consult",
      "Notes the concern (acne, pigmentation, hair loss and so on) for your doctor",
      "Books, reminds, and follows up after the consult within your rules",
    ],
    report: ["Leads by source: Instagram, Meta, Google, website", "Consults booked and attended", "Follow-ups after the consult, and replies"],
    cta: "Run the numbers for skin and hair",
  },
  {
    id: "dental",
    preset: "dental",
    title: "Dental implant and aligner clinics, and dental chains",
    intro:
      "Implant and aligner patients compare two or three clinics, ask about cost and EMI, and decide after a consult. Chains get calls at every branch, and each branch answers differently.",
    arrive: "Calls to each branch, calls from Google Search and Maps, WhatsApp, and ad leads.",
    leaks: [
      "Branch phones unanswered during procedures",
      "EMI and cost questions with no follow-up",
      "Treatment plans given, then silence",
      "Recall and check-up reminders forgotten",
    ],
    does: [
      "Answers for every branch and books at the right one",
      "Explains your approved EMI options and consult fee",
      "Follows up on treatment plans on the schedule you set",
      "Sends reminders and recalls",
    ],
    report: ["Enquiries and bookings per branch", "Response times per branch", "Treatment-plan follow-ups and replies"],
    cta: "Run the numbers for dental",
  },
  {
    id: "diagnostic-labs",
    preset: "diagnostics",
    title: "Diagnostic labs with home sample collection",
    intro:
      "Home collection is booked by phone and WhatsApp, often early in the morning and often by someone booking for a parent. A confirmed slot, fast, wins the booking.",
    arrive: "Early-morning calls, WhatsApp messages with a photo of a prescription, and website forms.",
    leaks: [
      "Calls before your desk opens",
      "WhatsApp requests not confirmed in time",
      "Prescription photos waiting for someone to read them",
      "Cancellations not rebooked",
    ],
    does: [
      "Books a collection slot by area or pin code",
      "Shares the preparation instructions you approve, such as fasting",
      "Passes prescription photos to your team to confirm the tests",
      "Sends reminders and rebooks cancellations",
    ],
    report: ["Bookings by hour and area", "Response times", "Cancellations and rebookings"],
    cta: "Run the numbers for labs",
  },
];
