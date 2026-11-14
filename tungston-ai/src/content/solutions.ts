/**
 * What we automate for clinics. Each solution's id is its anchor on /solutions; the old
 * service pages redirect to these. One line on the card, three short points on the page.
 */

export type Solution = {
  id: string;
  title: string;
  /** One line, for the homepage card. */
  line: string;
  points: { title: string; body: string }[];
};

export const solutionsHero = {
  eyebrow: "Solutions",
  title: "Everything your clinic repeats every day, automated.",
  lead: "Start with one automation. Add more when it pays for itself.",
};

export const solutions: Solution[] = [
  {
    id: "booking",
    title: "Appointment booking",
    line: "Patients book themselves, day or night.",
    points: [
      { title: "Anywhere", body: "From WhatsApp, your website or a call." },
      { title: "Real slots", body: "From your calendar or clinic software." },
      { title: "Changes handled", body: "Reschedules and cancellations too." },
    ],
  },
  {
    id: "follow-ups",
    title: "Reminders & follow-ups",
    line: "Fewer no-shows, more patients coming back.",
    points: [
      { title: "Reminders", body: "Before every appointment." },
      { title: "Follow-ups", body: "After treatment, and when a recall is due." },
      { title: "Your choice", body: "On WhatsApp, email or a voice call." },
    ],
  },
  {
    id: "chat",
    title: "WhatsApp & website chat",
    line: "Patient questions answered in seconds.",
    points: [
      { title: "Always on", body: "On WhatsApp and your website." },
      { title: "Your answers", body: "Only what you approve." },
      { title: "Hands over", body: "To your team when a patient asks." },
    ],
  },
  {
    id: "voice",
    title: "AI voice receptionist",
    line: "Calls and missed calls, answered.",
    points: [
      { title: "Every call", body: "Answered straight away, at any hour." },
      { title: "Missed calls", body: "Called back within minutes." },
      { title: "Languages", body: "Hindi or English, Marathi on request." },
    ],
  },
  {
    id: "ads",
    title: "Ad lead handling",
    line: "Meta and Google leads contacted in minutes.",
    points: [
      { title: "Fast", body: "Called or messaged within minutes." },
      { title: "Qualified", body: "And booked, or handed to your team." },
      { title: "Tracked", body: "From ad to visit." },
    ],
  },
  {
    id: "reports",
    title: "Reports on WhatsApp",
    line: "Lab reports and prescriptions, sent automatically.",
    points: [
      { title: "Sent automatically", body: "Lab reports, prescriptions and invoices." },
      { title: "No queues", body: "Patients don't come back just to collect." },
      { title: "With consent", body: "Only to patients who agreed." },
    ],
  },
  {
    id: "workflows",
    title: "Hospital-software workflows",
    line: "Less re-typing, fewer missed tasks.",
    points: [
      { title: "Connected", body: "Your clinic software, WhatsApp, calendar and sheets." },
      { title: "No re-typing", body: "Patient details move on their own." },
      { title: "Daily summaries", body: "Alerts and summaries for your team." },
    ],
  },
];

export const needs = {
  title: "What we need from you",
  items: [
    "One person who knows how your clinic runs",
    "Access to your calendar, software and WhatsApp",
    "The answers you're happy for patients to get",
    "A few hours in the first two weeks",
  ],
};
