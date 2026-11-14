/** /how-it-works copy (COPY.md §5). Each part's id is its anchor; the old service pages redirect to these. */

export const howHero = {
  title: "One front desk. Here's how it works.",
  lead: "Five parts that work as one: the voice line, chat on WhatsApp and your website, booking and integrations, your clinic's knowledge, and monitoring with a monthly report.",
};

export const parts = [
  {
    id: "voice",
    title: "Every call answered",
    label: "Voice",
    points: [
      { title: "Inbound calls", body: "Answers your clinic number or a dedicated line straight away, at any hour." },
      { title: "Missed-call callback", body: "If your desk misses a call, it calls the patient back within minutes." },
      { title: "New leads", body: "Calls ad and website leads within minutes of the form being sent." },
      { title: "Reminders", body: "Calls or messages before appointments, and handles reschedules." },
      { title: "Disclosure", body: "Every call starts by saying it's an AI assistant and that the call may be recorded." },
    ],
  },
  {
    id: "chat",
    title: "WhatsApp and website chat",
    label: "Chat",
    points: [
      { title: "Where", body: "Replies on WhatsApp and in a chat window on your website. We confirm the WhatsApp setup your account needs in the diagnostic." },
      { title: "What", body: "Answers from your approved FAQs, offers slots and books inside the conversation." },
      { title: "Handover", body: "Passes to your team, with the whole conversation, when a patient asks for a person." },
    ],
  },
  {
    id: "integrations",
    title: "Booking and integrations",
    label: "Integrations",
    points: [
      { title: "Booking", body: "Books into Google Calendar or your clinic software, where it can connect." },
      { title: "Your records", body: "Sends each lead to your CRM or a Google Sheet, and alerts your team on WhatsApp or email." },
      { title: "A clear trail", body: "Every step is logged, so we can show you exactly what happened to any enquiry." },
    ],
  },
  {
    id: "knowledge",
    title: "Your clinic's knowledge",
    label: "Knowledge",
    points: [
      {
        title: "Written with you",
        body: "Services, doctors, timings, fees, preparation instructions, and what it must never say.",
      },
      { title: "Approved by you", body: "You approve every answer before it goes live. Changes are a WhatsApp message away." },
      { title: "No medical advice", body: "Medical questions always go to your doctors." },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring and the monthly report",
    label: "Monitoring",
    points: [
      { title: "Alerts", body: "We hear when a channel stops working." },
      { title: "Test calls", body: "After every change, in every language you use." },
      {
        title: "Monthly report",
        body: "Enquiries answered, response times, after-hours share, consults booked and their estimated value.",
      },
    ],
  },
];

export const needs = {
  title: "What we need from you",
  items: [
    "One person at the clinic who knows how enquiries are handled today, usually your front-desk lead",
    "Your services, doctors, timings, and the fees you're happy to share",
    "Access to your calendar or clinic software, and your WhatsApp Business account",
    "Your handoff rules: who takes over, when, and on which number",
    "About two hours of your team's time in the first two weeks",
  ],
};
