/**
 * Everything the /pricing page says about money, in one place.
 *
 * To change a price, change it in PRICES below: the service cards, the estimator, the
 * packages and the maintenance list all read from it. The wording around the numbers
 * (descriptions, notes, FAQs) is further down.
 *
 * This file imports nothing so it can be run and tested on its own.
 *
 * House rules the copy follows:
 *  - every project has a one-time implementation fee
 *  - monthly maintenance is optional and is never required to own a system
 *  - the Care Plan (src/lib/care-plan.ts) is a separate, optional subscription on top
 *  - AI usage, telephony, hosting and other third-party costs are billed to the client
 */

/* -------------------------------------------------------------------------- */
/* Money                                                                      */
/* -------------------------------------------------------------------------- */

/** ₹ with Indian digit grouping: 100000 becomes ₹1,00,000. */
export function inr(n: number): string {
  const digits = String(Math.round(n));
  if (digits.length <= 3) return `₹${digits}`;
  const head = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${head},${digits.slice(-3)}`;
}

/** A price as the page may show it. */
export type Amount =
  | { kind: "range"; min: number; max: number }
  /** "₹75,000+": a floor with no stated ceiling. */
  | { kind: "from"; min: number }
  /** No fixed price. `typicalFrom` is where such projects usually begin, if we say so. */
  | { kind: "custom"; typicalFrom?: number };

/** One-time prices: "₹29,000–40,000", "₹75,000+", "Custom quotation". */
export function describeAmount(a: Amount): string {
  if (a.kind === "range") return `${inr(a.min)}–${inr(a.max).slice(1)}`;
  if (a.kind === "from") return `${inr(a.min)}+`;
  return "Custom quotation";
}

/** Monthly prices: "₹20,000–60,000/month", "from ₹9,000/month". */
export function describeMonthly(a: Amount): string {
  if (a.kind === "range") return `${describeAmount(a)}/month`;
  if (a.kind === "from") return `from ${inr(a.min)}/month`;
  return "Quoted individually";
}

/* -------------------------------------------------------------------------- */
/* The numbers                                                                */
/* -------------------------------------------------------------------------- */

/** One-time implementation, starting prices, in rupees. */
const START = {
  chatbot: 29_000,
  workflow: 25_000,
  agent: 49_000,
  /** Advanced agents are quoted per project; this is where such projects typically begin. */
  advanced: 100_000,
  content: 35_000,
  voice: 60_000,
  landing: 15_000,
  website: 49_000,
} as const;

/** Optional monthly maintenance, "from" prices, in rupees. */
const MAINTENANCE = {
  website: 3_000,
  workflow: 8_000,
  chatbot: 9_000,
  agent: 15_000,
  voice: 20_000,
  advanced: 30_000,
} as const;

/** Optional managed content operations (production and publishing, not system upkeep). */
const CONTENT_MANAGED = { min: 20_000, max: 60_000 } as const;

export const PRICES = { START, MAINTENANCE, CONTENT_MANAGED } as const;

/** The one-time starting price for a service, in rupees; null when it is quoted per project. */
export function startingPrice(id: ServiceId): number | null {
  return id === "advanced" ? null : START[id];
}

/* -------------------------------------------------------------------------- */
/* Service cards                                                              */
/* -------------------------------------------------------------------------- */

export type ServiceId = "chatbot" | "workflow" | "agent" | "advanced" | "content" | "voice" | "website";

export type PricingService = {
  id: ServiceId;
  name: string;
  description: string;
  /** Shown large. A project with no fixed price sets `custom` and shows the label instead. */
  price: { headline: string; detail?: string; custom?: boolean };
  /** The optional ongoing line under the price. */
  ongoing: { label: string; value: string } | null;
  capabilities: string[];
  /** What is quoted separately, if anything. */
  note?: string;
  /** What the client pays their own providers for, shown under "Third-party usage billed directly". */
  usage: string;
  /** Voice agents' usage charges are shown as a notice, not small print. */
  usagePriority?: boolean;
  cta: string;
};

export const pricingServices: PricingService[] = [
  {
    id: "chatbot",
    name: "Website Chatbots",
    description:
      "Intelligent website assistants that answer questions, capture enquiries and help customers find what they need.",
    price: { headline: `${inr(START.chatbot)} onwards` },
    ongoing: { label: "Optional monthly maintenance", value: `${inr(MAINTENANCE.chatbot)}/month onwards` },
    capabilities: [
      "AI-powered FAQs and customer support",
      "RAG knowledge bases trained on website information and documents",
      "Lead capture and human handover",
    ],
    note: "Advanced RAG systems, multilingual deployments and complex integrations are quoted separately.",
    usage: "AI model usage and hosting are paid to your own providers.",
    cta: "Build My Chatbot",
  },
  {
    id: "workflow",
    name: "Workflow Automation",
    description: "Connect your business tools, eliminate repetitive tasks and create workflows that operate automatically.",
    price: { headline: `${inr(START.workflow)} per workflow` },
    ongoing: { label: "Optional monthly maintenance", value: `${inr(MAINTENANCE.workflow)}/month onwards` },
    capabilities: [
      "CRM and email automation",
      "Data processing and document extraction",
      "Multi-platform integrations, including Zoho and HubSpot",
    ],
    note: "The final cost depends on workflow complexity and the number of connected systems.",
    usage: "Subscriptions to the tools we connect, such as Zoho or HubSpot, are paid to their providers.",
    cta: "Automate My Workflow",
  },
  {
    id: "agent",
    name: "AI Agents",
    description:
      "Purpose-built AI agents that execute business tasks, interact with tools and move work from request to completion.",
    price: { headline: `${inr(START.agent)} onwards` },
    ongoing: { label: "Optional monthly maintenance", value: `${inr(MAINTENANCE.agent)}/month onwards` },
    capabilities: ["Lead qualification and follow-ups", "Email and CRM agents", "Research and business operations agents"],
    usage: "AI model usage is paid to your own provider account.",
    cta: "Build My AI Agent",
  },
  {
    id: "advanced",
    name: "Advanced AI Agents",
    description:
      "Advanced multi-step AI systems that plan tasks, use external tools, retrieve information and execute complex business workflows.",
    price: {
      headline: "Custom Project",
      detail: `Custom quotation. Typical implementation projects start at approximately ${inr(START.advanced)}.`,
      custom: true,
    },
    ongoing: { label: "Optional monthly maintenance", value: `${inr(MAINTENANCE.advanced)}/month onwards` },
    capabilities: [
      "Multi-agent orchestration",
      "Tool calling and API integrations",
      "Research agents with source-grounded responses",
    ],
    usage: "AI model usage is paid to your own provider account.",
    cta: "Discuss an Advanced AI Project",
  },
  {
    id: "content",
    name: "Content Automation",
    description:
      "Turn a single idea into a structured content pipeline that generates, repurposes, organises and publishes content across your chosen platforms.",
    price: { headline: `${inr(START.content)} onwards` },
    ongoing: { label: "Optional managed content operations", value: `${inr(CONTENT_MANAGED.min)}/month onwards` },
    capabilities: [
      "AI-generated posts, captions and content calendars",
      "Content repurposing for LinkedIn, Instagram, YouTube and other supported platforms",
      "Approval, scheduling and publishing workflows",
    ],
    note: "Keeping the system running and producing the content are different jobs. Managed content operations are optional: you can own and operate the handed-over system yourself.",
    usage: "AI, video and publishing-platform usage is paid to your own accounts.",
    cta: "Automate My Content",
  },
  {
    id: "voice",
    name: "Voice Agents",
    description:
      "Intelligent voice agents that receive and handle calls, answer questions, qualify enquiries, book appointments and route conversations to human staff.",
    price: { headline: `${inr(START.voice)} onwards` },
    ongoing: { label: "Optional maintenance and support", value: `${inr(MAINTENANCE.voice)}/month onwards` },
    capabilities: [
      "AI receptionists and customer support",
      "Appointment booking and CRM integrations",
      "Call routing and human escalation",
    ],
    usage:
      "AI conversation usage and telephony charges are billed directly to the client through their own provider accounts. Usage is not included in the implementation or maintenance price.",
    usagePriority: true,
    cta: "Build My Voice Agent",
  },
  {
    id: "website",
    name: "Websites & Landing Pages",
    description: "Fast, modern and conversion-focused websites built for businesses, professionals and growing brands.",
    price: {
      headline: `Landing pages: ${inr(START.landing)} onwards`,
      detail: `Business websites: ${inr(START.website)} onwards`,
    },
    ongoing: { label: "Optional monthly maintenance", value: `${inr(MAINTENANCE.website)}/month onwards` },
    capabilities: [
      "Business and portfolio websites",
      "Corporate, law firm and hospital websites",
      "Custom e-commerce websites with admin dashboards",
    ],
    note: "E-commerce systems, advanced functionality and custom integrations receive individual quotations.",
    usage: "Hosting and domain registration are paid directly to the providers you choose.",
    cta: "Build My Website",
  },
];

/* -------------------------------------------------------------------------- */
/* The estimator                                                              */
/* -------------------------------------------------------------------------- */

export type RequirementId =
  | "crm"
  | "booking"
  | "languages"
  | "admin"
  | "branches"
  | "analytics"
  | "handover"
  | "apis";

export const requirements: { id: RequirementId; label: string }[] = [
  { id: "crm", label: "CRM integration" },
  { id: "booking", label: "Appointment booking" },
  { id: "languages", label: "Multiple languages" },
  { id: "admin", label: "Admin dashboard" },
  { id: "branches", label: "Multiple branches" },
  { id: "analytics", label: "Advanced analytics" },
  { id: "handover", label: "Human handover" },
  { id: "apis", label: "Additional API integrations" },
];

export type Level = {
  id: string;
  label: string;
  blurb: string;
  amount: Amount;
  /** Requirements this band already covers, so ticking them does not imply extra cost. */
  covers?: RequirementId[];
};

export type MaintenanceChoice = "none" | "support" | "managed";

export type EstimatorService = {
  id: ServiceId;
  /** Step 1 label. */
  label: string;
  levels: Level[];
  /** The step 3 requirements that make sense for this service. */
  extras: RequirementId[];
  /** Optional monthly price for "ongoing updates and support". null: quoted separately. */
  support: Amount | null;
  /** Optional monthly price for "a managed service". null: scoped and quoted individually. */
  managed: Amount | null;
  /** Shown with the monthly figure when it needs explaining. */
  monthlyNote?: string;
};

const advancedAmount: Amount = { kind: "custom", typicalFrom: START.advanced };

/**
 * The bands. Each level's price is the one we publish for it; nothing here is a multiplier.
 * A requirement that a band does not already cover is listed in the result as "scoped in
 * your quote": it can raise the final price, and we do not guess by how much.
 */
export const estimatorServices: EstimatorService[] = [
  {
    id: "chatbot",
    label: "Website Chatbot",
    levels: [
      {
        id: "basic",
        label: "Basic FAQs",
        blurb: "Answers common questions from content you provide, and captures leads.",
        amount: { kind: "range", min: START.chatbot, max: 40_000 },
        covers: ["handover"],
      },
      {
        id: "rag",
        label: "RAG chatbot with document knowledge",
        blurb: "Trained on your website and documents, across more than one knowledge source.",
        amount: { kind: "range", min: 45_000, max: 75_000 },
        covers: ["handover"],
      },
      {
        id: "advanced",
        label: "Advanced chatbot with integrations",
        blurb: "Connected to your CRM and other systems, with deeper actions.",
        amount: { kind: "from", min: 75_000 },
        covers: ["handover", "crm", "apis"],
      },
    ],
    extras: ["crm", "booking", "languages", "branches", "analytics", "handover", "apis"],
    support: { kind: "from", min: MAINTENANCE.chatbot },
    managed: null,
  },
  {
    id: "workflow",
    label: "Workflow Automation",
    levels: [
      {
        id: "simple",
        label: "One simple workflow",
        blurb: "A single process automated end to end.",
        amount: { kind: "range", min: START.workflow, max: 40_000 },
      },
      {
        id: "integrated",
        label: "Multiple connected workflows",
        blurb: "Several workflows that pass data between your tools.",
        amount: { kind: "range", min: 40_000, max: 80_000 },
        covers: ["crm"],
      },
      {
        id: "advanced",
        label: "Advanced API-driven automation",
        blurb: "Complex, multi-system automation built on APIs.",
        amount: { kind: "from", min: 100_000 },
        covers: ["crm", "apis"],
      },
    ],
    extras: ["crm", "languages", "admin", "analytics", "handover", "apis"],
    support: { kind: "from", min: MAINTENANCE.workflow },
    managed: null,
    monthlyNote: "Per-workflow pricing applies to the implementation. Maintenance depends on how many workflows you run.",
  },
  {
    id: "agent",
    label: "AI Agent",
    levels: [
      {
        id: "single",
        label: "Single-task agent",
        blurb: "One agent doing one job well, such as follow-ups or lead qualification.",
        amount: { kind: "range", min: START.agent, max: 75_000 },
      },
      {
        id: "crm",
        label: "CRM-connected agent",
        blurb: "An agent that reads and updates your CRM as it works.",
        amount: { kind: "range", min: 75_000, max: 120_000 },
        covers: ["crm"],
      },
      {
        id: "complex",
        label: "Complex agent",
        blurb: "Multi-tool agents with several responsibilities.",
        amount: { kind: "custom" },
        covers: ["crm", "apis"],
      },
    ],
    extras: ["crm", "booking", "languages", "admin", "analytics", "handover", "apis"],
    support: { kind: "from", min: MAINTENANCE.agent },
    managed: null,
  },
  {
    id: "advanced",
    label: "Advanced AI Agent",
    levels: [
      {
        id: "retrieval",
        label: "Tool-using agent with retrieval",
        blurb: "Plans tasks, calls your tools and answers from your own knowledge.",
        amount: advancedAmount,
      },
      {
        id: "multi",
        label: "Multi-agent orchestration",
        blurb: "Several agents that hand work to one another.",
        amount: advancedAmount,
      },
      {
        id: "enterprise",
        label: "Multi-department or enterprise system",
        blurb: "Agents across teams, locations and systems.",
        amount: advancedAmount,
      },
    ],
    extras: ["crm", "booking", "languages", "admin", "branches", "analytics", "handover", "apis"],
    support: { kind: "from", min: MAINTENANCE.advanced },
    managed: null,
  },
  {
    id: "content",
    label: "Content Automation",
    levels: [
      {
        id: "single",
        label: "Single-platform content pipeline",
        blurb: "Ideas turned into drafts, reviewed and published to one platform.",
        amount: { kind: "range", min: START.content, max: 75_000 },
      },
      {
        id: "multi",
        label: "Multi-platform pipeline with approvals",
        blurb: "Repurposed across platforms, with approval and scheduling steps.",
        amount: { kind: "range", min: START.content, max: 75_000 },
      },
    ],
    extras: ["languages", "admin", "analytics", "apis"],
    support: null,
    managed: { kind: "range", min: CONTENT_MANAGED.min, max: CONTENT_MANAGED.max },
    monthlyNote:
      "System maintenance (keeping the pipeline running) and managed content operations (producing and publishing the content) are separate. Both are optional.",
  },
  {
    id: "voice",
    label: "Voice Agent",
    levels: [
      {
        id: "basic",
        label: "Basic receptionist",
        blurb: "Answers calls, handles common questions and takes messages.",
        amount: { kind: "range", min: START.voice, max: 80_000 },
      },
      {
        id: "booking",
        label: "Appointment booking and call routing",
        blurb: "Books into your calendar and routes calls to the right person.",
        amount: { kind: "range", min: 80_000, max: 100_000 },
        covers: ["booking", "handover"],
      },
      {
        id: "enterprise",
        label: "Multi-department or enterprise system",
        blurb: "Several departments, locations or complex call flows.",
        amount: { kind: "custom" },
        covers: ["booking", "handover", "crm", "branches"],
      },
    ],
    extras: ["crm", "booking", "languages", "branches", "analytics", "handover", "apis"],
    support: { kind: "from", min: MAINTENANCE.voice },
    managed: null,
    monthlyNote: "Conversation and telephony usage is billed to your own provider accounts, not included here.",
  },
  {
    id: "website",
    label: "Website or Landing Page",
    levels: [
      {
        id: "landing",
        label: "Landing page",
        blurb: "A focused page built to convert one audience.",
        amount: { kind: "range", min: START.landing, max: 30_000 },
      },
      {
        id: "business",
        label: "Business website",
        blurb: "A multi-page website for a business or professional.",
        amount: { kind: "range", min: START.website, max: 90_000 },
      },
      {
        id: "ecommerce",
        label: "Advanced e-commerce or custom website",
        blurb: "Online store or bespoke functionality, with an admin dashboard.",
        amount: { kind: "from", min: 150_000 },
        covers: ["admin", "apis"],
      },
    ],
    extras: ["crm", "booking", "languages", "admin", "branches", "analytics", "apis"],
    support: { kind: "from", min: MAINTENANCE.website },
    managed: null,
  },
];

export const maintenanceChoices: { id: MaintenanceChoice; label: string; hint: string }[] = [
  { id: "none", label: "No, I will manage the system", hint: "You own it and run it yourself." },
  { id: "support", label: "Yes, I want ongoing updates and support", hint: "Optional monthly maintenance." },
  { id: "managed", label: "I want a managed service", hint: "We run it for you." },
];

export type Estimate = {
  service: EstimatorService;
  level: Level;
  implementation: string;
  monthly: { text: string; note?: string } | null;
  /** Selected requirements the chosen band already covers. */
  included: string[];
  /** Selected requirements to be scoped in the quote. */
  scoped: string[];
  /** The same result as one plain-text line, for the enquiry and the budget field. */
  budget: string;
  /** The same result as plain text, sent with a quote request. */
  summary: string;
};

/** The estimate for one set of choices. Pure: same choices, same answer. */
export function estimate(input: {
  service: ServiceId;
  level: string;
  extras: RequirementId[];
  maintenance: MaintenanceChoice;
}): Estimate {
  const service = estimatorServices.find((s) => s.id === input.service);
  if (!service) throw new Error(`Unknown service: ${input.service}`);
  const level = service.levels.find((l) => l.id === input.level);
  if (!level) throw new Error(`Unknown level "${input.level}" for ${input.service}`);

  const labelOf = (id: RequirementId) => requirements.find((r) => r.id === id)?.label ?? id;
  const picked = input.extras.filter((id) => service.extras.includes(id));
  const included = picked.filter((id) => level.covers?.includes(id)).map(labelOf);
  const scoped = picked.filter((id) => !level.covers?.includes(id)).map(labelOf);

  let implementation = describeAmount(level.amount);
  if (level.amount.kind === "custom" && level.amount.typicalFrom) {
    implementation = `Custom quotation, typically from approximately ${inr(level.amount.typicalFrom)}`;
  }

  let monthly: Estimate["monthly"] = null;
  if (input.maintenance === "support") {
    monthly = service.support
      ? { text: describeMonthly(service.support), note: service.monthlyNote }
      : { text: "Quoted separately", note: service.monthlyNote };
  } else if (input.maintenance === "managed") {
    monthly = service.managed
      ? { text: describeMonthly(service.managed), note: service.monthlyNote }
      : {
          text: "Quoted individually",
          note: `The scope you want us to run is agreed in your proposal.${
            service.support ? ` Maintenance alone starts ${describeMonthly(service.support)}.` : ""
          }`,
        };
  }

  const budget = monthly ? `${implementation} one-time; optional ${monthly.text}` : `${implementation} one-time`;
  const summary = [
    `Service: ${service.label} (${level.label})`,
    `Estimated implementation: ${implementation} (one-time)`,
    monthly ? `Optional monthly: ${monthly.text}` : "Ongoing maintenance: not requested",
    included.length ? `Requested, covered by this band: ${included.join(", ")}` : "",
    scoped.length ? `Requested, to be scoped: ${scoped.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { service, level, implementation, monthly, included, scoped, budget, summary };
}

/* -------------------------------------------------------------------------- */
/* Packages                                                                   */
/* -------------------------------------------------------------------------- */

export const buildPackages = [
  {
    name: "Starter Build",
    price: `From ${inr(START.chatbot)}`,
    cadence: "one-time",
    includes: [
      "One basic website chatbot OR one simple workflow",
      "Initial configuration",
      "Testing and handover",
      "Documentation",
    ],
    optional: `Optional maintenance from ${inr(MAINTENANCE.chatbot)}/month`,
    note: null as string | null,
    featured: false,
  },
  {
    name: "Growth Build",
    price: `From ${inr(125_000)}`,
    cadence: "one-time",
    includes: [
      "One voice agent",
      "One website chatbot",
      "Two simple workflows",
      "Agreed integrations",
      "Testing and handover",
    ],
    optional: `Optional ongoing support from ${inr(MAINTENANCE.advanced)}/month`,
    note: "Indicative scope. The exact combination and final price are validated against your requirements.",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom quotation",
    cadence: "",
    includes: [
      "Advanced AI agents",
      "Multiple integrations and departments",
      "Custom business workflows",
      "Multi-location deployments",
      "Agreed enterprise support arrangements",
    ],
    optional: null as string | null,
    note: null as string | null,
    featured: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Ownership, maintenance, FAQs                                               */
/* -------------------------------------------------------------------------- */

export const ownershipPoints = [
  {
    title: "One-time implementation",
    body: "We design, develop, configure and test the system around your business requirements.",
  },
  {
    title: "Complete handover",
    body: "After project completion and payment, you receive ownership of the agreed custom deliverables and the required handover, including access, documentation and source code where included in the scope.",
  },
  {
    title: "Your usage costs stay with you",
    body: "AI API consumption, telephone calls, hosting and third-party services are billed to your own provider accounts. You retain control of those accounts.",
  },
  {
    title: "Optional ongoing support",
    body: "Choose an ongoing maintenance plan for system updates, bug handling, upkeep, technical support and agreed improvements.",
  },
];

export const ownershipQualification =
  "Third-party software, platforms and libraries remain subject to their own licences and terms.";

export const maintenanceRows = [
  { label: "Websites", value: `from ${inr(MAINTENANCE.website)}/month` },
  { label: "Workflow automation", value: `from ${inr(MAINTENANCE.workflow)}/month` },
  { label: "Website chatbots", value: `from ${inr(MAINTENANCE.chatbot)}/month` },
  { label: "AI agents", value: `from ${inr(MAINTENANCE.agent)}/month` },
  { label: "Voice agents", value: `from ${inr(MAINTENANCE.voice)}/month` },
  { label: "Advanced systems", value: `from ${inr(MAINTENANCE.advanced)}/month` },
];

export const pricingFaqs = [
  {
    question: "Is there a one-time setup fee?",
    answer:
      "Yes. Every project begins with a one-time implementation fee. This covers the agreed design, development, configuration, integrations, testing and handover.",
  },
  {
    question: "Is a monthly subscription compulsory?",
    answer:
      "No. You can own and operate your completed system without a compulsory Protomation.ai subscription. However, we recommend our Care Plan for system updates, maintenance, error handling and technical support.",
  },
  {
    question: "What is the Care Plan?",
    answer:
      "An optional subscription, billed monthly or yearly, that covers maintenance, service updates, priority support and a designated engineer. Subscribers also get a discount on the implementation price of new automations. Pay with Razorpay (UPI, cards, netbanking) in India or Stripe internationally.",
  },
  {
    question: "Can I cancel the Care Plan?",
    answer:
      "Yes. You can cancel any time and the plan simply does not renew. Your systems stay yours, and the subscriber discount applies only while the plan is active.",
  },
  {
    question: "Are AI usage and API charges included?",
    answer:
      "No. After handover, AI API usage, voice minutes, telephony, hosting and other third-party charges are paid directly by you through your own provider accounts. This gives you direct control and visibility over your operating costs.",
  },
  {
    question: "Can you integrate with Zoho, HubSpot and our existing software?",
    answer:
      "Absolutely. We can integrate with Zoho, HubSpot and other compatible tools and APIs, subject to the required access and technical capabilities.",
  },
  {
    question: "Can I request custom features?",
    answer:
      "Yes. Contact our team to discuss your requirements. We will assess the scope and provide an individual quotation.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes. We offer optional monthly maintenance plans covering agreed system updates, error handling, technical support and upkeep.",
  },
  {
    question: "Who owns the completed system?",
    answer:
      "The custom system and deliverables created specifically for your project are yours after the agreed payment and handover. We provide the access and documentation specified in your project agreement. Third-party tools and software remain governed by their respective licences.",
  },
  {
    question: "Can I upgrade my system later?",
    answer:
      "Yes. We can extend your system, add new workflows, connect new tools or develop additional features as your business evolves. Additional development is quoted separately.",
  },
];
