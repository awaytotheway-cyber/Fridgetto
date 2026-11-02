import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const crmLeadAutomation: ServiceDetail = {
  ...catalogEntry("crm-lead-automation"),
  seo: {
    title: "CRM & Lead Automation That Follows Up for You",
    description:
      "Automate your CRM: every lead captured, scored, assigned and followed up on WhatsApp and email, with no spreadsheets. See the hours you'd save.",
    keywords: [
      "CRM automation",
      "lead management automation",
      "Zoho CRM automation",
      "HubSpot automation",
      "sales follow-up automation",
    ],
  },
  hero: {
    eyebrow: "CRM & Lead Automation",
    title: "Every lead captured, scored and followed up, without the spreadsheets.",
    lede: "Leads come from your website, ads, WhatsApp and calls, and too many get lost in between. We automate your CRM so every lead lands in one place, is ranked by how ready they are, goes to the right person and gets followed up on time, automatically.",
    live: {
      variant: "pipeline",
      title: "CRM · New leads today",
      items: [
        { label: "Priya S. · website form", meta: "Score 82" },
        { label: "Arjun Traders · Facebook ad", meta: "Score 91" },
        { label: "Neha K. · WhatsApp", meta: "Call booked" },
        { label: "Rahul M. · Google ad", meta: "Score 64" },
        { label: "Bright Dental · referral", meta: "Score 88" },
        { label: "Kapoor & Co. · missed call", meta: "Demo booked" },
      ],
    },
  },
  highlight: { value: "Same day", label: "follow-up on every lead" },
  whatIs: {
    question: "What is CRM and lead automation?",
    body: [
      "A CRM is where you keep track of leads and customers. CRM automation means the busywork around it happens on its own: new leads from every source land in the CRM, duplicates are merged, and each lead is scored on how likely it is to buy and assigned to the right salesperson.",
      "Then the follow-up runs itself: a welcome message on WhatsApp or email within minutes, reminders for your team, nudges for leads who go quiet, and a daily list of who to call first. Your sales team spends its time talking to buyers, not updating spreadsheets.",
    ],
    before: [
      "Leads scattered across forms, ads, WhatsApp and calls",
      "Hours spent copying details into spreadsheets",
      "Follow-ups forgotten when the team is busy",
      "No idea which lead to call first",
    ],
    after: [
      "Every lead in your CRM within seconds",
      "Details, source and history filled in automatically",
      "Follow-ups sent on time, every time",
      "Leads ranked so your team calls the hottest first",
    ],
  },
  benefits: [
    {
      title: "No lead left behind",
      body: "Every enquiry from every channel is captured and followed up, so the ones that used to slip away now turn into sales.",
    },
    {
      title: "Faster first response",
      body: "New leads get a reply within minutes, while they're still interested, instead of the next day.",
    },
    {
      title: "Sales time spent selling",
      body: "Your team stops typing data and chasing reminders, and spends the day on calls and meetings.",
    },
    {
      title: "Clear numbers",
      body: "See where leads come from, how fast they're handled and which sources bring paying customers.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We trace how leads reach you today and where they get stuck or lost.",
    },
    {
      title: "Plan your pipeline",
      when: "Week 1",
      body: "We agree your lead stages, scoring rules and who handles which leads.",
    },
    {
      title: "Connect your lead sources",
      when: "Weeks 1–2",
      body: "We connect your website forms, ad platforms, WhatsApp and phone to your CRM, merging duplicates as they arrive.",
    },
    {
      title: "Build the follow-ups",
      when: "Week 2",
      body: "We set up the messages, reminders and nudges for every stage, written in your tone.",
    },
    {
      title: "Launch and refine",
      when: "Week 3 onwards",
      body: "We go live, watch the numbers and adjust the scoring and follow-ups as results come in.",
    },
  ],
  flow: [
    { label: "New lead from any source", tool: "facebook" },
    { label: "Captured and scored" },
    { label: "Assigned to the right rep", tool: "zoho" },
    { label: "Instant follow-up", tool: "whatsapp" },
    { label: "Daily summary to your team", tool: "gmail" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your sales process",
      "Access to your CRM and lead sources",
      "Your rules for who handles which leads",
      "A review of the follow-up messages",
    ],
    total: "About 4 hours in total",
  },
  ourPart: [
    "Pipeline, stages and scoring setup",
    "Connecting forms, ads, WhatsApp and calls",
    "Writing and automating follow-ups",
    "Dashboards and daily summaries",
    "Monitoring and monthly tuning",
  ],
  youGet: [
    "A clean CRM with every lead in one place",
    "Lead scoring that ranks who to call first",
    "Automatic follow-ups on WhatsApp and email",
    "Daily summaries and reminders for your team",
    "A dashboard of leads, sources and conversions",
  ],
  timeline: "Live in 3 weeks",
  savings: {
    volume: { label: "New leads a month", unit: "leads", min: 50, max: 10000, step: 50, value: 800 },
    minutes: {
      label: "Minutes spent entering, sorting and chasing each",
      unit: "min",
      min: 3,
      max: 30,
      step: 1,
      value: 12,
    },
    automatedShare: 0.6,
    assumptions: [
      "Automation takes over about 60% of the admin on each lead; your team still has the sales conversations.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra sales from faster, more consistent follow-up, which is usually the bigger gain.",
    ],
  },
  useCases: [
    {
      title: "B2B sales teams",
      body: "Route enquiries by region or product, track every deal stage and never miss a follow-up.",
      photo: photos.salesMeeting,
    },
    {
      title: "Real estate",
      body: "Capture enquiries from property portals and ads, and follow up until the site visit is booked.",
      photo: photos.ownerLaptop,
    },
    {
      title: "Education and coaching",
      body: "Track admission enquiries from ads and fairs, and nurture them all the way to enrolment.",
      photo: photos.teamPlanning,
    },
    {
      title: "Clinics and wellness",
      body: "Turn enquiries into booked consultations with timely reminders.",
    },
    {
      title: "Insurance and finance",
      body: "Follow up on quotes and renewals automatically, so no policy lapses unnoticed.",
    },
    {
      title: "Car dealers",
      body: "Capture test-drive requests and follow up with offers until the sale.",
    },
  ],
  tools: ["zoho", "hubspot", "salesforce", "googlesheets", "gmail", "whatsapp", "facebook", "n8n"],
  faqs: [
    {
      q: "Which CRMs do you work with?",
      a: "Zoho CRM, HubSpot, Salesforce, Pipedrive, Freshsales and others. If you don't have a CRM yet, we'll help you pick one that fits your team and budget.",
    },
    {
      q: "Do we have to change our CRM?",
      a: "No. We automate the CRM you already use, and only suggest a change if your current tool can't do what you need.",
    },
    {
      q: "Can it follow up on WhatsApp?",
      a: "Yes. Follow-ups can go out on WhatsApp, email or SMS, using approved templates so they reach your leads reliably.",
    },
    {
      q: "Will my sales team need training?",
      a: "A short session is enough. Most of the change is that their CRM fills itself in and tells them who to call next.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your lead sources, your CRM and the follow-ups you need. You get a fixed quote before any work starts.",
    },
    {
      q: "What about our existing lead data?",
      a: "We clean up and import your existing spreadsheets and contacts, merging duplicates, so you start with one tidy list.",
    },
  ],
  related: ["speed-to-lead-agent", "whatsapp-automation", "data-reporting-automation"],
};
