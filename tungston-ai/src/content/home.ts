/**
 * Homepage copy. Kept deliberately short: one idea per section, one line per item.
 * The solutions themselves live in content/solutions.ts.
 * The hero headline and audiences live in site.config.ts (the share image draws them
 * too); prices live in content/pricing.ts.
 */

export const hero = {
  subhead:
    "Appointment booking, reminders, WhatsApp chat, follow-ups, reports and the admin inside your hospital software. Done by AI, set up by us.",
};

export const leaks = {
  eyebrow: "Where clinics lose patients",
  title: "Small gaps, every day.",
  lead: "An unanswered enquiry. A forgotten follow-up. A report nobody sent.",
  moments: [
    {
      when: "A patient enquires at 9:40pm",
      without: "Seen next morning. They booked elsewhere.",
      with: "Answered and booked in minutes.",
    },
    {
      when: "A patient is due for a follow-up",
      without: "Nobody remembers to call.",
      with: "Reminded on WhatsApp, and rebooked.",
    },
    {
      when: "A lab report is ready",
      without: "The patient queues to collect it.",
      with: "Sent on WhatsApp, automatically.",
    },
  ],
};

export const whatWeAutomate = {
  title: "What we automate.",
  link: { label: "See all solutions", href: "/solutions" },
};

export const demo = {
  title: "Try it yourself.",
  lead: {
    call: "Call our demo clinic and book a pretend consult. It takes two minutes.",
    recording: "Listen to a call with our demo clinic, or chat with it below.",
    none: "Chat with our demo clinic the way a patient would.",
  },
};

export const calculatorIntro = {
  eyebrow: "Calculator",
  title: "What are missed enquiries costing you?",
  lead: "Change the numbers to match your clinic.",
};

export const whoItsFor = {
  title: "Built for clinics where every patient counts.",
  cards: [
    { title: "IVF & fertility", body: "Couples call several centres in one evening.", href: "/clinics#ivf" },
    { title: "Dermatology & hair", body: "Leads ask “how much?” at all hours.", href: "/clinics#dermatology-hair" },
    { title: "Dental", body: "Patients compare clinics before they book.", href: "/clinics#dental" },
    { title: "Diagnostic labs", body: "Home collection, booked early, often for parents.", href: "/clinics#diagnostic-labs" },
  ],
  education: {
    text: "Run a study-abroad or coaching business?",
    link: "See automation for education",
    href: "/education",
  },
};

export const processIntro = {
  title: "How we work",
  lead: "",
};

export const processSteps = [
  { title: "Free 20-minute call", when: "Day 1", body: "We see if we can help." },
  { title: "Clinic Automation Audit", when: "Week 1", body: "We map how your clinic runs and give you a plan and a fixed quote." },
  { title: "Pilot", when: "Weeks 2–3", body: "One automation first, with an agreed target. The second half of the build is due when it's met." },
  { title: "Go live", when: "Weeks 3–6", body: "Rolled out across your clinic." },
  { title: "Managed", when: "Optional", body: "We monitor it and report every month." },
];

export const dataTrust = {
  title: "Patient data, handled properly.",
  points: [
    "Patients are told when they're talking to an AI.",
    "Your data stays in accounts you own.",
    "We never train AI on your patients' data.",
    "A data processing agreement with every clinic, built to support the DPDP Act.",
  ],
  link: { label: "How we handle data", href: "/security" },
};

export const pricingIntro = {
  title: "Clear prices.",
  line: "A fixed quote before you commit.",
};

export const founderNote = {
  eyebrow: "From the founder",
  text: "I'm Pratik Naragude. I started Protomation in Mumbai because clinics lose patients in small gaps: an enquiry nobody answered, a follow-up nobody made. We automate those gaps, and you deal with me directly.",
  /** Words that stay lit red once the scroll reaches them. */
  hot: ["small", "gaps:"],
  signature: "Pratik Naragude, Founder · Mumbai",
  /** The clay portrait stands in until a photo arrives (ASSETS.md). */
  image: "/assets/team-orchestrator.webp",
  imageAlt: "Illustrated portrait of Pratik Naragude, founder of Protomation",
};
