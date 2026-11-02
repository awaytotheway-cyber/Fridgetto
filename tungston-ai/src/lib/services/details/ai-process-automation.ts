import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const aiProcessAutomation: ServiceDetail = {
  ...catalogEntry("ai-process-automation"),
  seo: {
    title: "AI Process Automation for Paperwork & Approvals",
    description:
      "AI that reads invoices, forms and emails, checks them against your rules and routes approvals, so paperwork moves in hours, not days. See your savings.",
    keywords: [
      "AI process automation",
      "business process automation",
      "document processing automation",
      "invoice processing automation",
      "approval workflow automation",
    ],
  },
  hero: {
    eyebrow: "AI Process Automation",
    title: "Paperwork read, checked and approved in hours, not days.",
    lede: "Invoices, purchase orders, claims, forms and onboarding documents still move through inboxes and desks one person at a time. We automate the process: AI reads each document, pulls out the details, checks them against your rules and sends it to the right person to approve.",
    live: {
      variant: "documents",
      title: "Inbox · Documents",
      items: [
        { label: "Invoice from Sharma Supplies", meta: "Approved" },
        { label: "Purchase order #4471", meta: "Matched" },
        { label: "Leave request, Anita R.", meta: "Routed" },
        { label: "Vendor KYC form", meta: "Checked" },
      ],
    },
  },
  highlight: { value: "Hours, not days", label: "for approvals and paperwork" },
  whatIs: {
    question: "What is AI process automation?",
    body: [
      "AI process automation hands the repetitive steps in your business processes, the reading, typing, checking and forwarding, to software. Modern AI reads documents the way a trained assistant does, even scanned PDFs, phone photos and emails, and pulls out names, amounts, dates and line items.",
      "The process then runs on rails: details are checked against your rules and records, approvals go to the right person with reminders, data is entered into your systems, and anything unusual is flagged for a human. You get a clear trail of who approved what, and when.",
    ],
    before: [
      "Documents typed into systems by hand",
      "Approvals stuck in someone's inbox",
      "Errors found only after payment",
      "No idea where a request has got to",
    ],
    after: [
      "Details read and entered automatically",
      "Approvals routed and chased until done",
      "Every document checked against your rules",
      "Live status for every request",
    ],
  },
  benefits: [
    {
      title: "Faster turnaround",
      body: "Requests that took days to move between desks are processed and approved in hours.",
    },
    {
      title: "Fewer errors",
      body: "Details are read and checked automatically, so wrong amounts and duplicates are caught before they cost you.",
    },
    {
      title: "Your team on higher-value work",
      body: "Staff stop retyping documents and spend their time on exceptions, vendors and customers.",
    },
    {
      title: "A complete audit trail",
      body: "Every step is recorded, so audits and month-end checks take minutes instead of days.",
    },
  ],
  steps: [
    {
      title: "Free process audit",
      when: "Day 1",
      body: "We walk through one process end to end, such as invoice approval, and count the steps and hours involved.",
    },
    {
      title: "Design the new flow",
      when: "Week 1",
      body: "We agree what gets read automatically, which rules to check and who approves what.",
    },
    {
      title: "Build and connect",
      when: "Weeks 2–3",
      body: "We set up document reading, rule checks and approvals, connected to your email, drive and accounting or ERP system.",
    },
    {
      title: "Run in parallel",
      when: "Week 4",
      body: "The automated process runs alongside your current one until the results match.",
    },
    {
      title: "Switch over and expand",
      when: "Week 5 onwards",
      body: "We switch over, watch every exception and move on to your next process when you're ready.",
    },
  ],
  flow: [
    { label: "Document arrives by email", tool: "gmail" },
    { label: "AI reads the details", tool: "openai" },
    { label: "Checked against your rules" },
    { label: "Sent for approval", tool: "slack" },
    { label: "Entered into your system", tool: "zoho" },
  ],
  yourPart: {
    items: [
      "A walk-through of one process",
      "Sample documents (10 to 20 is plenty)",
      "Your approval rules and limits",
      "A review during the parallel run",
    ],
    total: "About 4 hours in total",
  },
  ourPart: [
    "Process mapping and rule design",
    "Document reading set up for your formats",
    "Approval routing and reminders",
    "Connections to your email, drive and systems",
    "Monitoring and handling of exceptions",
  ],
  youGet: [
    "Documents read and entered without typing",
    "Approvals routed and chased automatically",
    "Rule checks that catch errors before payment",
    "A full audit trail for every request",
    "A monthly report on volumes and time saved",
  ],
  timeline: "Live in 4–5 weeks",
  savings: {
    volume: {
      label: "Documents, forms and requests a month",
      unit: "documents",
      min: 100,
      max: 20000,
      step: 100,
      value: 1500,
    },
    minutes: { label: "Minutes each takes to read, check and route", unit: "min", min: 2, max: 30, step: 1, value: 8 },
    automatedShare: 0.65,
    assumptions: [
      "About 65% of the handling time is automated; people still review exceptions and give approvals.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out late-payment penalties and costly errors avoided, which add further savings.",
    ],
  },
  useCases: [
    {
      title: "Accounts payable",
      body: "Read supplier invoices, match them to purchase orders and route them for approval.",
      photo: photos.paperworkReview,
    },
    {
      title: "Logistics and supply chain",
      body: "Process delivery notes, bills of lading and proof-of-delivery documents automatically.",
      photo: photos.warehouseBoxes,
    },
    {
      title: "HR and onboarding",
      body: "Collect and check joining documents, set up accounts and track each new hire's progress.",
      photo: photos.deskLaptop,
    },
    {
      title: "Insurance and claims",
      body: "Read claim forms and supporting documents, check them and route each to the right assessor.",
    },
    {
      title: "Banking and lending",
      body: "Collect KYC documents, extract the details and flag missing items before review.",
    },
    {
      title: "Procurement",
      body: "Turn requests into purchase orders with the right approvals, without long email chains.",
    },
  ],
  tools: ["gmail", "googledrive", "googlesheets", "zoho", "slack", "docusign", "openai", "n8n"],
  faqs: [
    {
      q: "Can it read scanned documents and photos?",
      a: "Yes. It reads PDFs, scans, photos taken on a phone and email text, including many handwritten fields. Anything it can't read clearly is flagged for a person.",
    },
    {
      q: "What if a document doesn't match our rules?",
      a: "It's flagged and sent to the right person with the reason, such as an amount that doesn't match the order. Nothing unusual goes through without a human look.",
    },
    {
      q: "Will it work with our accounting or ERP software?",
      a: "Usually, yes. We connect to Tally, Zoho, QuickBooks, SAP and most systems that offer an import or API. We confirm this during the audit.",
    },
    {
      q: "Is our data secure?",
      a: "Documents stay in your accounts and storage. We use business-grade AI services that do not train on your data, and each step can reach only what it needs.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free process audit, based on your volumes and the systems involved. You get a fixed quote before any work starts.",
    },
    {
      q: "Which process should we start with?",
      a: "The one with the most volume and the clearest rules, often invoice approval or employee onboarding. We'll recommend one in the audit.",
    },
  ],
  related: ["finance-reconciliation-automation", "ai-agent-development", "custom-automations"],
};
