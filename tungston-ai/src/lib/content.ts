/**
 * Site copy. Everything a visitor reads (except brand details in site.config.ts) lives here.
 * Case studies, stats and prices are launch placeholders: replace them with real numbers.
 */

export type ServiceArt =
  | "agents"
  | "voice"
  | "chat"
  | "automation"
  | "advanced"
  | "content"
  | "build";

export type Service = {
  slug: string;
  title: string;
  hook: string;
  points: string[];
  art: ServiceArt;
  /** Rendered illustration in /public/assets. Without one the card draws `art` as SVG. */
  image?: string;
  /** What the illustration shows, for its alt text. */
  imageAlt?: string;
  /** Bento footprint on large screens. */
  size: "hero" | "wide" | "single";
};

export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    hook: "Autonomous agents that take a task from inbox to done.",
    points: [
      "Qualify leads, triage tickets and keep your CRM current",
      "Work inside the tools your team already uses",
      "Hand off to a person the moment judgment is needed",
    ],
    art: "agents",
    image: "/assets/service-ai-agents.webp",
    imageAlt: "A glowing chrome orb with glass task nodes in orbit, joined by red light trails",
    size: "hero",
  },
  {
    slug: "voice-agents",
    title: "Voice Agents",
    hook: "Phone agents that sound like your best rep, even at 3 a.m.",
    points: [
      "Answer, qualify and book calls around the clock",
      "Natural, interruptible conversation in 30+ languages",
      "Every call transcribed, summarized and logged",
    ],
    art: "voice",
    image: "/assets/service-voice-agents.webp",
    imageAlt: "A sound wave of chrome bars rising from black glass, the tallest glowing yellow",
    size: "wide",
  },
  {
    slug: "website-chatbots",
    title: "Website Chatbots",
    hook: "A sales and support desk that never closes.",
    points: [
      "Trained on your docs, pricing and policies",
      "Captures leads and books meetings in the chat",
      "Escalates to your team with the full conversation",
    ],
    art: "chat",
    image: "/assets/service-website-chatbots.webp",
    imageAlt: "Three frosted-glass speech bubbles stacked in depth, the front one lit red",
    size: "single",
  },
  {
    slug: "custom-automations",
    title: "Custom Automations",
    hook: "Busywork, wired together and running on its own.",
    points: [
      "CRM, inbox, invoicing and operations workflows",
      "Built on n8n, Make, Zapier or custom code",
      "Monitored, with an alert the minute something breaks",
    ],
    art: "automation",
    image: "/assets/service-custom-automations.webp",
    imageAlt: "Chrome pipes and valves with red light flowing through glass to a yellow output",
    size: "single",
  },
  {
    slug: "advanced-agents",
    title: "Advanced AI Agents",
    hook: "Multi-step agents that plan, use tools and cite their sources.",
    points: [
      "Retrieval over your private knowledge (RAG)",
      "Tool use across APIs, databases and browsers",
      "Evaluations and guardrails before anything goes live",
    ],
    art: "advanced",
    image: "/assets/service-advanced-agents.webp",
    imageAlt: "A stack of glass slabs like indexed documents, one lifted by a red beam",
    size: "single",
  },
  {
    slug: "content-automation",
    title: "Content Automation",
    hook: "One idea in, a month of on-brand content out.",
    points: [
      "Blogs, social posts and newsletters in your voice",
      "SEO briefs, internal links and scheduling handled",
      "A human review step built into every pipeline",
    ],
    art: "content",
    image: "/assets/service-content-automation.webp",
    imageAlt: "Dark glass tiles assembling into a mosaic, edged in red",
    size: "single",
  },
  {
    slug: "web-and-app",
    title: "Websites & Apps",
    hook: "Fast, modern websites and apps with AI built in from day one.",
    points: [
      "Marketing sites, web apps and mobile apps",
      "Next.js, React Native, Supabase and Stripe",
      "Designed, built and launched by one team",
    ],
    art: "build",
    image: "/assets/service-web-and-app.webp",
    imageAlt: "A glass browser window and phone floating in depth, with wireframes drawn in red light",
    size: "wide",
  },
];

export const heroStats = [
  { value: 40, suffix: "+", label: "workflows automated" },
  { value: 24, suffix: "/7", label: "agents live, every day" },
  { value: 10, suffix: "x", label: "content output for clients" },
];

export const marqueeItems = [
  "AI Agents",
  "Voice AI",
  "Chatbots",
  "Automation",
  "Content Systems",
  "Web & App Development",
];

export const processSteps = [
  {
    title: "Free AI Audit",
    when: "Week 0",
    body: "A 45-minute call where we map how work moves through your business and find the three places AI pays off fastest.",
  },
  {
    title: "Blueprint & Roadmap",
    when: "Week 1",
    body: "A written plan: what we'll build, the tools it connects to, what it costs and the return you should expect.",
  },
  {
    title: "Build & Deploy",
    when: "Weeks 2–6",
    body: "Weekly sprints, tested on your real data. We launch with your team trained and a person on call.",
  },
  {
    title: "Scale & Optimize",
    when: "Ongoing",
    body: "We watch the numbers, tune what's live and add the next system once the first one has paid for itself.",
  },
];

export const caseStudies = [
  {
    client: "Multi-location dental group",
    sector: "Healthcare, 14 clinics",
    problem: "The front desk missed one in four calls at peak hours, and every missed call was a lost booking.",
    solution:
      "A voice agent that answers instantly, checks live availability and books straight into their practice software.",
    metric: "+38%",
    metricLabel: "booked appointments in 60 days",
    services: ["Voice Agents", "Custom Automations"],
  },
  {
    client: "Direct-to-consumer skincare brand",
    sector: "E-commerce, 120k orders a year",
    problem: "Support replies took 19 hours on average, and cart questions went unanswered overnight.",
    solution:
      "A website chatbot trained on their catalog, order data and returns policy, handing off to agents with full context.",
    metric: "71%",
    metricLabel: "of tickets resolved without a person",
    services: ["Website Chatbots", "AI Agents"],
  },
  {
    client: "B2B freight brokerage",
    sector: "Logistics, 30 brokers",
    problem: "Brokers spent three hours a day copying load details from email into the CRM before they could quote.",
    solution:
      "An agent that reads incoming load emails, drafts the quote from live lane rates and updates the CRM on its own.",
    metric: "14 hrs",
    metricLabel: "saved per broker, every week",
    services: ["Advanced AI Agents", "Custom Automations"],
  },
];

export const pricingPlans = [
  {
    name: "Launch",
    price: "$2,900",
    cadence: "one-time project",
    pitch: "One AI system, scoped, built and shipped.",
    features: [
      "Free AI audit and written blueprint",
      "One agent, chatbot or automation",
      "Connected to up to three of your tools",
      "30 days of tuning after launch",
    ],
    cta: "Start with a free audit",
    featured: false,
  },
  {
    name: "Growth",
    price: "$4,500",
    cadence: "per month",
    pitch: "An AI team on call, shipping something new every month.",
    features: [
      "Everything in Launch",
      "A new agent or automation every month",
      "Voice agent or content system included",
      "Monthly performance report",
      "Priority support on Slack",
    ],
    cta: "Book a free AI audit",
    featured: true,
  },
  {
    name: "Custom",
    price: "Scoped",
    cadence: "fixed quote after the audit",
    pitch: "Multi-agent systems, RAG and full product builds.",
    features: [
      "Multi-agent and RAG systems",
      "Web and mobile app development",
      "Security review, SSO and audit logs",
      "A dedicated lead engineer",
    ],
    cta: "Talk to an engineer",
    featured: false,
  },
];

export type TeamMember = {
  name: string;
  role: string;
  /** Clay portrait in /public/assets (see ASSETS.md). */
  image: string;
  alt: string;
  bio: string;
  focus: string[];
};

export const team: TeamMember[] = [
  {
    name: "Pratik V N",
    role: "Orchestrator",
    image: "/assets/team-orchestrator.webp",
    alt: "Clay illustration of Pratik V N conducting glowing AI agent tiles for chat, voice, email, calendar, documents and workflows with a baton",
    bio: "Plans every build from first call to launch: maps how work moves through your business, picks the agents and tools for the job, and conducts them until the system runs on its own.",
    focus: ["Solution architecture", "AI agents and automations", "Delivery"],
  },
  {
    name: "Shrawani",
    role: "Designer",
    image: "/assets/team-designer.webp",
    alt: "Clay illustration of Shrawani sketching a layout on a tablet with a glowing stylus",
    bio: "Shapes how every system looks and feels, from websites and dashboards to the way a chatbot talks to your customers, so the technology feels like part of your brand.",
    focus: ["Brand and UI design", "Conversation design", "Websites and apps"],
  },
];

export const manifesto =
  "Most businesses don't need more software. They need fewer hours lost to work a machine could do. So we build the machines: agents that answer, book, follow up and report, quietly, around the clock, so your people get to do the work only people can do.";

/** Words in the manifesto that stay lit red once the scroll reaches them. */
export const manifestoHot = ["machines:", "around", "clock,"];

export const principles = [
  {
    title: "Shipped in weeks",
    body: "First system live in two to six weeks. Long discovery phases are where good ideas go to die.",
  },
  {
    title: "Measured in hours and revenue",
    body: "Every build starts with a number we're trying to move, and a report that tells you whether it moved.",
  },
  {
    title: "People stay in charge",
    body: "Agents escalate when judgment is needed. Your team sees every decision and can override any of them.",
  },
];
