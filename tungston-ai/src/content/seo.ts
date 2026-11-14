/**
 * Title and description for every page. Titles get "| Protomation" appended by the
 * layout's template; keep the whole thing under about 60 characters, and descriptions
 * under about 155.
 */
export const seo = {
  home: {
    title: "AI Automation for Clinics in India",
    description:
      "Appointment booking, reminders, WhatsApp chat, patient follow-ups and hospital-software workflows, automated. For IVF, skin, dental clinics and labs.",
    path: "/",
  },
  clinics: {
    title: "Automation for IVF, Skin, Dental Clinics & Labs",
    description:
      "Book more consults and cut admin. Automation for IVF centres, skin and hair clinics, dental chains and diagnostic labs in India.",
    path: "/clinics",
  },
  solutions: {
    title: "Clinic Automation Solutions",
    description:
      "Booking, reminders, follow-ups, WhatsApp and website chat, AI voice, ad leads, reports on WhatsApp and hospital-software workflows.",
    path: "/solutions",
  },
  education: {
    title: "AI Automation for Education Businesses",
    description:
      "Call every lead within minutes, book counselling sessions and follow up on WhatsApp. For study-abroad, upskilling and exam-coaching businesses.",
    path: "/education",
  },
  audit: {
    title: "Clinic Automation Audit",
    description:
      "We map how your clinic runs, find what to automate first, and give you a written plan and a fixed quote. ₹15,000, credited against your build.",
    path: "/audit",
  },
  pricing: {
    title: "Clinic Automation Pricing",
    description:
      "Audit ₹15,000, single automations from ₹50,000, a full clinic system from ₹2,00,000, and an optional Managed Plan from ₹39,500 a month.",
    path: "/pricing",
  },
  security: {
    title: "Security & Patient Data",
    description:
      "How we handle patient data: AI disclosure on every call, accounts you own, no model training on your data, and support for the DPDP Act.",
    path: "/security",
  },
  work: {
    title: "Demo & Sample Report",
    description:
      "Try our demo clinic chat and see the monthly report your clinic would get. No invented case studies, only what you can check yourself.",
    path: "/work",
  },
  about: {
    title: "About Protomation",
    description:
      "A founder-led practice in Mumbai that builds AI automation for clinics and education businesses. Meet founder Pratik Naragude.",
    path: "/about",
  },
  contact: {
    title: "Book a Free 20-Minute Call",
    description:
      "Tell us about your clinic. We reply within 6 working hours to fix a time, and you'll leave knowing what's worth automating first.",
    path: "/contact",
  },
} as const;
