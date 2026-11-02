import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const customAutomations: ServiceDetail = {
  ...catalogEntry("custom-automations"),
  seo: {
    title: "Custom Workflow Automation with n8n & Make",
    description:
      "Workflow automation that connects your apps and ends copy-paste work, built on n8n, Make, Zapier or code and monitored for you. See what you'd save.",
    keywords: [
      "workflow automation services",
      "n8n automation agency",
      "Zapier and Make experts",
      "business automation India",
      "app integration services",
    ],
  },
  hero: {
    eyebrow: "Custom Automations",
    title: "Your apps connected. The copy-paste work, gone.",
    lede: "Your team moves information between apps all day: from forms to sheets, from the CRM to invoices, from email to the team chat. We connect your tools so the data flows on its own, built on n8n, Make, Zapier or custom code, and watched so nothing breaks quietly.",
    live: {
      variant: "workflow",
      title: "Workflow · New order",
      items: [
        { label: "New order received", meta: "Shopify" },
        { label: "Invoice created", meta: "Zoho Books" },
        { label: "Stock sheet updated", meta: "Google Sheets" },
        { label: "Team notified", meta: "Slack" },
        { label: "Customer sent a tracking link", meta: "WhatsApp" },
      ],
    },
  },
  highlight: { value: "Any app", label: "connected to any other" },
  whatIs: {
    question: "What are custom automations?",
    body: [
      "Custom automations are small programs that do the routine steps between your apps for you. When something happens in one tool, like a new order, form or payment, the automation does what a person would do next: create the invoice, update the sheet, send the email, tell the team.",
      "We build them on proven platforms such as n8n, Make and Zapier, or with custom code when the job needs it. Each one is tested, documented and monitored, and you get an alert the minute anything fails, so nothing breaks without anyone noticing.",
    ],
    before: [
      "Data copied between apps by hand",
      "Steps skipped when the team is busy",
      "Errors from retyping the same details",
      "Nobody notices when something breaks",
    ],
    after: [
      "Data moves between apps on its own",
      "Every step done, every time",
      "Details entered once, used everywhere",
      "An alert the moment anything fails",
    ],
  },
  benefits: [
    {
      title: "Hours back every week",
      body: "The repetitive steps between your apps run on their own, so your team spends its day on work that needs a person.",
    },
    {
      title: "No more copy-paste errors",
      body: "Details are entered once and passed along exactly, so wrong amounts and typos stop spreading.",
    },
    {
      title: "Built on tools that last",
      body: "We use proven platforms or clean code, document everything and hand you full ownership.",
    },
    {
      title: "Monitored, not forgotten",
      body: "Every automation is watched. If something fails, you know straight away, and so do we.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We list the repetitive tasks your team does between apps and pick the ones that save the most time.",
    },
    {
      title: "Design the workflows",
      when: "Week 1",
      body: "We map each workflow step by step and choose the right platform for it.",
    },
    {
      title: "Build and connect",
      when: "Weeks 1–2",
      body: "We build the automations and connect your apps with secure, limited access.",
    },
    {
      title: "Test with real data",
      when: "Week 2",
      body: "We run them on real orders, forms and records, and check every result.",
    },
    {
      title: "Launch and monitor",
      when: "Week 3 onwards",
      body: "We switch them on, set up monitoring and alerts, and add new workflows as you need them.",
    },
  ],
  flow: [
    { label: "Something happens in one app", tool: "shopify" },
    { label: "Automation picks it up", tool: "n8n" },
    { label: "Data cleaned and checked" },
    { label: "Your other apps updated", tool: "googlesheets" },
    { label: "Team notified", tool: "slack" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your daily tasks",
      "Access to the apps involved",
      "A walk-through of how each task is done today",
      "A check of the first results",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "Workflow design and platform choice",
    "Building and connecting the automations",
    "Testing on real data",
    "Monitoring, alerts and fixes",
    "Documentation and handover",
  ],
  youGet: [
    "Automations running between your apps, 24/7",
    "An alert the moment anything fails",
    "Clear documentation of every workflow",
    "Full ownership of the accounts and workflows",
    "A monthly report on tasks run and hours saved",
  ],
  timeline: "Live in 2–3 weeks",
  savings: {
    volume: {
      label: "Copy-paste and update tasks a month",
      unit: "tasks",
      min: 200,
      max: 50000,
      step: 200,
      value: 4000,
    },
    minutes: { label: "Minutes each takes by hand", unit: "min", min: 1, max: 15, step: 1, value: 4 },
    automatedShare: 0.85,
    assumptions: [
      "About 85% of these tasks are fully automated; the rest are exceptions your team handles.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the cost of mistakes from retyping, which automation removes.",
    ],
  },
  useCases: [
    {
      title: "Online stores",
      body: "Orders become invoices, stock updates, shipping labels and customer messages, automatically.",
      photo: photos.warehouseBoxes,
    },
    {
      title: "Agencies and service firms",
      body: "Client onboarding, project setup, time tracking and invoicing, connected end to end.",
      photo: photos.laptopsTeam,
    },
    {
      title: "Small business owners",
      body: "Payments, receipts, reminders and bookkeeping entries that used to take your evenings.",
      photo: photos.ownerLaptop,
    },
    {
      title: "Operations teams",
      body: "Purchase requests, approvals and supplier updates flowing between email, sheets and your ERP.",
    },
    {
      title: "Marketing teams",
      body: "Leads from every form into your CRM, mailing lists and reports, without exporting.",
    },
    {
      title: "Customer support",
      body: "Tickets created from emails and WhatsApp, routed and followed up automatically.",
    },
  ],
  tools: ["n8n", "make", "zapier", "googlesheets", "slack", "gmail", "airtable", "notion"],
  faqs: [
    {
      q: "Which platform will you use: n8n, Make or Zapier?",
      a: "Whichever fits the job and your budget. Zapier is quickest for simple links, Make suits multi-step flows, and n8n is great for complex or high-volume work and can run on your own server. We recommend one during the audit.",
    },
    {
      q: "Who owns the automations?",
      a: "You do. They run in accounts in your name, with documentation, so you're never locked in to us.",
    },
    {
      q: "What if one of our apps changes?",
      a: "We monitor every automation. If an app changes or a step fails, we're alerted and fix it.",
    },
    {
      q: "Can you automate apps that have no ready-made integration?",
      a: "Usually, yes. If an app has an API, email notifications or exports, we can connect it, and custom code covers the rest.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on how many workflows you need and how complex they are. You get a fixed quote before any work starts.",
    },
    {
      q: "Do we need to change our software?",
      a: "No. We connect the tools you already use.",
    },
  ],
  related: ["ai-process-automation", "data-reporting-automation", "ai-agent-development"],
};
