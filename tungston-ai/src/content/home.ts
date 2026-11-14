/**
 * Homepage copy. Kept deliberately short: one idea per section, one line per item.
 * The hero headline and audiences live in site.config.ts (the share image draws them
 * too); prices live in content/pricing.ts.
 */

export const hero = {
  subhead:
    "Every call, missed call and WhatsApp enquiry answered, qualified and booked into your calendar. Day and night, in Hindi or English.",
};

export const leaks = {
  eyebrow: "Where patients slip away",
  title: "Most clinics don't lack enquiries. They lose them.",
  lead: "Patients contact two or three clinics at once. The first to answer usually gets the consult.",
  moments: [
    {
      when: "A couple calls about IVF at 9:40pm",
      without: "No answer. They book elsewhere.",
      with: "Answered, and a consult booked for tomorrow.",
    },
    {
      when: "The phone rings in the lunch rush",
      without: "Missed, and nobody calls back.",
      with: "Answered, qualified and booked.",
    },
    {
      when: "A WhatsApp message asks “how much?”",
      without: "Answered the next day. Too late.",
      with: "Answered in seconds, with a consult offered.",
    },
  ],
};

export const fiveJobs = {
  title: "One front desk. Five jobs.",
  jobs: [
    { title: "Answer", body: "Calls, missed calls, WhatsApp and website chat." },
    { title: "Qualify", body: "Asks what your front desk would ask." },
    { title: "Book", body: "Books real slots in your calendar." },
    { title: "Remind", body: "Reminds patients and follows up." },
    { title: "Report", body: "Shows you what it booked, every month." },
  ],
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
    link: "See the education front desk",
    href: "/education",
  },
};

export const processIntro = {
  title: "How we work",
  lead: "",
};

export const processSteps = [
  { title: "Free 20-minute call", when: "Day 1", body: "We see if we can help." },
  { title: "Diagnostic", when: "Week 1", body: "We test your front desk and give you a fixed quote." },
  { title: "Pilot", when: "Weeks 2–3", body: "One channel, one agreed target. The second half of the build is due when it's met." },
  { title: "Go live", when: "Weeks 3–5", body: "All channels, your calendar, your rules." },
  { title: "Managed", when: "Optional", body: "We monitor it and report every month." },
];

export const dataTrust = {
  title: "Patient data, handled properly.",
  points: [
    "Callers are told they're speaking with an AI.",
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
  text: "I'm Pratik Naragude. I started Protomation in Mumbai because the enquiry nobody answers goes to whoever answers first. We build front desks that answer every one, and you deal with me directly.",
  /** Words that stay lit red once the scroll reaches them. */
  hot: ["every", "one,"],
  signature: "Pratik Naragude, Founder · Mumbai",
  /** The clay portrait stands in until a photo arrives (ASSETS.md). */
  image: "/assets/team-orchestrator.webp",
  imageAlt: "Illustrated portrait of Pratik Naragude, founder of Protomation",
};
