/**
 * Title and description for every page (COPY.md §14). Titles get "| Protomation"
 * appended by the layout's template; keep the whole thing under about 60 characters,
 * and descriptions under about 155.
 */
export const seo = {
  home: {
    title: "AI Front Desk for Clinics in India",
    description:
      "Every call, missed call and WhatsApp enquiry answered in Hindi or English, qualified and booked. For IVF, skin, hair and dental clinics.",
    path: "/",
  },
  clinics: {
    title: "AI Front Desk for IVF, Skin, Hair & Dental",
    description:
      "Answer every patient enquiry in seconds and book more consults. For IVF centres, skin and hair clinics, dental chains and diagnostic labs.",
    path: "/clinics",
  },
  education: {
    title: "AI Admissions Front Desk for Education",
    description:
      "Call every lead within minutes, book counselling sessions and follow up on WhatsApp. For study-abroad, upskilling and exam-coaching businesses.",
    path: "/education",
  },
  howItWorks: {
    title: "How the AI Front Desk Works",
    description:
      "Voice, WhatsApp and website chat, booking into your calendar, your clinic's knowledge base, and monitoring with a monthly report. One system.",
    path: "/how-it-works",
  },
  diagnostic: {
    title: "Front-Desk Diagnostic for Clinics",
    description:
      "A fixed-price check of how your clinic answers calls, WhatsApp and ad leads, with a written plan and quote. ₹15,000, credited against your build.",
    path: "/diagnostic",
  },
  pricing: {
    title: "AI Front Desk Pricing",
    description:
      "Diagnostic ₹15,000, builds from ₹2,00,000, and an optional Managed Front Desk from ₹39,500 a month. A fixed quote before you commit.",
    path: "/pricing",
  },
  security: {
    title: "Security & Patient Data",
    description:
      "How we handle patient data: AI disclosure on every call, accounts you own, no model training on your data, and support for the DPDP Act.",
    path: "/security",
  },
  work: {
    title: "Demo Front Desk & Sample Report",
    description:
      "Try our demo AI front desk and see the monthly report your clinic would get. No invented case studies, only what you can check yourself.",
    path: "/work",
  },
  about: {
    title: "About Protomation",
    description:
      "A founder-led practice in Mumbai that installs and runs AI front desks for clinics and education businesses. Meet founder Pratik Naragude.",
    path: "/about",
  },
  contact: {
    title: "Book a Free 20-Minute Call",
    description:
      "Tell us about your clinic. We reply within 6 working hours to fix a time, and you'll leave knowing whether an AI front desk would pay off.",
    path: "/contact",
  },
} as const;
