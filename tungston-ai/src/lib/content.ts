/**
 * Site copy. Everything a visitor reads (except brand details in site.config.ts) lives here.
 * Case studies and stats are launch placeholders: replace them with real numbers. Prices are in
 * pricing.ts.
 */

import type { ToolId } from "./tools";

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
    slug: "workflow-automation",
    title: "Workflow Automation",
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
    title: "Websites & Landing Pages",
    hook: "Fast, modern websites and landing pages built to convert.",
    points: [
      "High-converting landing pages and marketing sites",
      "Next.js, React, Tailwind CSS and Supabase",
      "AI chat & lead capture built in from day one",
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

/**
 * The "why now" section. It makes the case by describing moments a visitor
 * recognises from their own week, rather than quoting adoption statistics we
 * cannot stand behind. Every line here should stay something we can defend.
 */
export const whyNow = {
  eyebrow: "Why now",
  title: "Someone in your market already answers at midnight.",
  lead: "Not with a bigger team. They automated the moments that decide who gets the work, and those moments happen whether or not anyone is at a desk.",
  moments: [
    {
      when: "A lead enquires at 9:40pm",
      without: "It sits in an inbox until morning. By then they have messaged two other firms.",
      with: "They get a real answer in seconds and a meeting in your calendar before they close the tab.",
    },
    {
      when: "The phone rings in the lunch rush",
      without: "Nobody picks up. You never learn who called, or what they wanted.",
      with: "It is answered on the first ring, qualified, booked, and summarised in your inbox.",
    },
    {
      when: "A quote request lands on Friday evening",
      without: "Someone rebuilds it by hand on Monday from three different systems.",
      with: "A priced draft is waiting for your approval before Monday starts.",
    },
    {
      when: "A customer asks the same question again",
      without: "A person answers it for the hundredth time, six minutes a go, all year.",
      with: "It is answered instantly, and your team never sees it.",
    },
  ],
  close: "None of this is futuristic, and none of it needs a department. It needs one system, built around the moment you are currently losing, which is usually the one that happens while you sleep.",
};

/**
 * The home page's "Works with" strip. Keep to tools that have a logo (see tools.json): the
 * strip is logos, and a name-only entry would look like a gap.
 */
export const worksWith: ToolId[] = [
  "claude",
  "openai",
  "n8n",
  "make",
  "zapier",
  "zoho",
  "hubspot",
  "salesforce",
  "gmail",
  "slack",
  "whatsapp",
  "meta",
  "googleAds",
  "supabase",
  "stripe",
  "twilio",
];

export const marqueeItems = [
  "AI Agents",
  "Voice AI",
  "Chatbots",
  "Workflow Automation",
  "Websites & Landing Pages",
  "Content Systems",
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

export type UseCase = {
  /** Who the system is for. */
  audience: string;
  /** Where in their week it sits. */
  context: string;
  /** A short capability for the display slot. Never a result we have not achieved. */
  headline: string;
  /** What that capability means, in one line. */
  headlineLabel: string;
  problem: string;
  solution: string;
  services: string[];
};

/**
 * The three builds we are set up for, written as what the systems DO rather than as
 * results achieved for named clients.
 *
 * There are deliberately no outcome metrics here. A number on this page has to be one
 * we can stand behind in a sales call, and until there are real engagement figures with
 * the client's permission to publish them, the honest version is a description of the
 * capability. Replace these with real results the moment there are some — and when you
 * do, say which client and over what period.
 */
export const useCases: UseCase[] = [
  {
    audience: "Clinics and hospitals",
    context: "Front desk, calls and appointments",
    headline: "24/7",
    headlineLabel: "Every call answered, including nights and weekends",
    problem:
      "Calls arrive while the desk is busy with the person standing in front of them. A missed call is usually a booking that goes to whoever picks up next.",
    solution:
      "A voice agent that answers on the first ring, checks live availability, books into your practice software and leaves the desk a summary of what was said.",
    services: ["Voice Agents", "Workflow Automation"],
  },
  {
    audience: "E-commerce and online stores",
    context: "Speed to lead",
    headline: "60 sec",
    headlineLabel: "From enquiry to first reply, with nobody watching the inbox",
    problem:
      "An enquiry that sits overnight gets answered by a competitor first. Most forms are read hours after they are sent, and interest cools in the gap.",
    solution:
      "An agent that picks up every enquiry as it lands, answers from your catalogue and policies, qualifies it, and either books the call or hands a person the whole thread.",
    services: ["AI Agents", "Website Chatbots"],
  },
  {
    audience: "Medical professionals",
    context: "Research and literature",
    headline: "Cited",
    headlineLabel: "Every answer traced back to the paper it came from",
    problem:
      "Keeping up with the literature is a job on its own, and a general model asked about clinical evidence will produce something plausible and unsourced, which is worse than no answer.",
    solution:
      "A research agent grounded in the papers and guidelines you trust, answering in your own context and showing the source behind every line it writes.",
    services: ["Advanced AI Agents", "Content Automation"],
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
