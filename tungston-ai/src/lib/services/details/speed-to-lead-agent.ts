import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const speedToLeadAgent: ServiceDetail = {
  ...catalogEntry("speed-to-lead-agent"),
  seo: {
    title: "Speed-to-Lead Agent: Reply to Leads in 60s",
    description:
      "A speed-to-lead agent replies to every new enquiry within a minute on WhatsApp, SMS or email, qualifies it and books the call. See what you'd save.",
    keywords: [
      "speed to lead",
      "instant lead response",
      "lead response automation",
      "WhatsApp lead follow-up",
      "AI lead qualification",
    ],
  },
  hero: {
    eyebrow: "Speed-to-Lead Agent",
    title: "Reply to every new lead in under a minute, before your competitors do.",
    lede: "The first business to reply usually wins the customer. Our speed-to-lead agent contacts every new enquiry within seconds on WhatsApp, SMS or email, asks the right questions, books a call with your team and alerts your salesperson while the lead is still interested.",
    live: {
      variant: "chat",
      title: "New lead · Facebook ad",
      tool: "whatsapp",
      items: [
        {
          from: "us",
          label: "Hi Rohan! Thanks for asking about our 2BHK flats. Is it for your family or an investment?",
          meta: "42 seconds after the enquiry",
        },
        { from: "them", label: "For my family. Budget around 80 lakhs." },
        { from: "us", label: "We have 3 options in that range. Can our advisor call you today at 6 p.m.?" },
        { from: "them", label: "Yes, 6 works." },
      ],
    },
  },
  highlight: { value: "Under 60s", label: "from enquiry to first reply" },
  whatIs: {
    question: "What is speed to lead?",
    body: [
      "Speed to lead is how quickly you respond to a new enquiry. It matters more than most businesses realise: people who fill in a form or message you are usually contacting several businesses at once, and they tend to buy from whoever replies first and helps them.",
      "Our speed-to-lead agent makes that first reply instant, around the clock. It messages each new lead within a minute, asks a few qualifying questions, answers basic queries, books a call or visit, and passes a summary to your salesperson, who starts the conversation already knowing what the customer wants.",
    ],
    before: [
      "Leads wait hours for a first reply",
      "Night and weekend enquiries go cold",
      "Salespeople call with no context",
      "Ad money spent on leads nobody contacts",
    ],
    after: [
      "Every lead contacted within a minute, 24/7",
      "Night and weekend leads booked for the next day",
      "Each call starts with the lead's needs and budget",
      "More of your ad spend turns into conversations",
    ],
  },
  benefits: [
    {
      title: "Win more of your leads",
      body: "Replying first makes you the business they talk to, so more enquiries turn into conversations and sales.",
    },
    {
      title: "More from your ad spend",
      body: "Leads you've already paid for stop going cold, so each sale costs you less.",
    },
    {
      title: "Sales calls that start warm",
      body: "Your team gets the lead's needs, budget and timing before they pick up the phone.",
    },
    {
      title: "Works while you sleep",
      body: "Night, weekend and holiday enquiries are handled the moment they arrive.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We look at where your leads come from and how long the first reply takes today.",
    },
    {
      title: "Write the conversation",
      when: "Week 1",
      body: "We write the opening messages and qualifying questions in your tone, for each lead source.",
    },
    {
      title: "Connect your lead sources",
      when: "Weeks 1–2",
      body: "We connect your ad forms, website, WhatsApp and CRM, plus your team's calendars for bookings.",
    },
    {
      title: "Test with real leads",
      when: "Week 2",
      body: "The agent handles live leads while we review every conversation and adjust.",
    },
    {
      title: "Go live and improve",
      when: "Week 3 onwards",
      body: "We track reply times, bookings and sales, and keep tuning the messages.",
    },
  ],
  flow: [
    { label: "New lead from an ad or form", tool: "facebook" },
    { label: "Agent replies in seconds", tool: "whatsapp" },
    { label: "Asks qualifying questions" },
    { label: "Books a call", tool: "calendly" },
    { label: "Salesperson alerted with notes", tool: "hubspot" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your leads",
      "Access to your ad forms, WhatsApp and CRM",
      "Your qualifying questions and offers",
      "A review of the first conversations",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "Messages and questions for each lead source",
    "Lead source and CRM connections",
    "Booking into your team's calendars",
    "Live testing and review",
    "Weekly tuning from real results",
  ],
  youGet: [
    "A reply to every lead within a minute, 24/7",
    "Qualified leads with needs and budget noted",
    "Calls and visits booked automatically",
    "Instant alerts to the right salesperson",
    "A report on reply times, bookings and sales",
  ],
  timeline: "Live in 2–3 weeks",
  savings: {
    volume: { label: "New enquiries a month", unit: "enquiries", min: 50, max: 10000, step: 50, value: 600 },
    minutes: {
      label: "Minutes spent on the first reply and qualifying each",
      unit: "min",
      min: 2,
      max: 20,
      step: 1,
      value: 10,
    },
    automatedShare: 0.7,
    assumptions: [
      "The agent handles about 70% of the first-reply and qualifying work; your team takes over for the sales call.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra sales from replying first, which is the main reason businesses use it.",
    ],
  },
  useCases: [
    {
      title: "Real estate",
      body: "Reply to portal and ad enquiries instantly and book site visits while the buyer is keen.",
      photo: photos.videoCall,
    },
    {
      title: "Inside sales teams",
      body: "Qualify inbound leads around the clock, so reps spend their day on ready buyers.",
      photo: photos.headsetDesk,
    },
    {
      title: "Coaching and online courses",
      body: "Answer course questions straight away and book counselling calls for every new enquiry.",
      photo: photos.creatorDesk,
    },
    {
      title: "Clinics and cosmetic care",
      body: "Respond to treatment enquiries and book consultations the same day.",
    },
    {
      title: "Car dealers",
      body: "Contact every test-drive request instantly and confirm a time.",
    },
    {
      title: "Home improvement and solar",
      body: "Qualify enquiries by location and budget, and book site surveys.",
    },
  ],
  tools: ["whatsapp", "facebook", "googleads", "gmail", "hubspot", "zoho", "calendly", "twilio"],
  faqs: [
    {
      q: "Why does reply speed matter so much?",
      a: "Most people enquire with several businesses at once and go with the first one that helps them. Replying in a minute instead of a few hours makes you that business far more often.",
    },
    {
      q: "Which channels does it reply on?",
      a: "WhatsApp, SMS, email or a phone call, depending on where the lead came from and what they prefer. Most Indian businesses start with WhatsApp.",
    },
    {
      q: "Does it replace my sales team?",
      a: "No. It handles the first reply and the qualifying questions, then hands warm leads to your team with notes. Your salespeople still do the selling.",
    },
    {
      q: "Can it handle leads from Facebook and Google ads?",
      a: "Yes. It connects to Facebook and Instagram lead forms, Google Ads forms, your website, property portals and more.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your lead sources and volume. You get a fixed quote before any work starts.",
    },
    {
      q: "How quickly can we start?",
      a: "Most businesses are live in two to three weeks, starting with their busiest lead source.",
    },
  ],
  related: ["ai-voice-agents", "crm-lead-automation", "whatsapp-automation"],
};
