/**
 * The twelve services, in the order they appear everywhere. This is the light list
 * (names, groups, card copy) that the nav, footer, cards, estimator and contact form
 * read; each service's full page content lives in ./details.
 */
import type { CatalogEntry, ServiceGroup } from "./types";

export const serviceGroups: ServiceGroup[] = ["AI Automation", "Custom Solutions", "Web Development"];

export const catalog: CatalogEntry[] = [
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    group: "AI Automation",
    formValue: "ai-agent-development",
    menuBlurb: "Agents that finish tasks across your tools",
    icon: "bot",
    card: {
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
  },
  {
    slug: "ai-voice-agents",
    title: "AI Voice Agents",
    group: "AI Automation",
    formValue: "ai-voice-agents",
    menuBlurb: "Answer, qualify and book calls around the clock",
    icon: "phone",
    card: {
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
  },
  {
    slug: "ai-website-chatbots",
    title: "AI Website Chatbots",
    group: "AI Automation",
    formValue: "ai-website-chatbots",
    menuBlurb: "A sales and support desk on your website",
    icon: "chat",
    card: {
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
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    group: "AI Automation",
    formValue: "whatsapp-automation",
    menuBlurb: "Instant replies, bookings and updates on WhatsApp",
    icon: "whatsapp",
    card: {
      hook: "Every WhatsApp message answered in seconds, day or night.",
      points: [
        "Answer questions, share prices and book slots on WhatsApp",
        "Send order updates, reminders and payment links",
        "Hand the chat to your team with the full history",
      ],
      art: "chat",
      image: "/assets/service-whatsapp-automation.webp",
      imageAlt: "A chrome smartphone with glass chat bubbles rising from its screen, lit red",
      size: "single",
    },
  },
  {
    slug: "crm-lead-automation",
    title: "CRM & Lead Automation",
    group: "AI Automation",
    formValue: "crm-lead-automation",
    menuBlurb: "Leads scored, routed and followed up on time",
    icon: "kanban",
    card: {
      hook: "Every lead scored, routed and followed up on its own.",
      points: [
        "New leads land in your CRM, sorted and assigned",
        "Follow-ups by WhatsApp and email go out on time",
        "No more spreadsheets or forgotten callbacks",
      ],
      art: "automation",
      image: "/assets/service-crm-lead-automation.webp",
      imageAlt: "Glass cards sliding along a chrome rail into sorted columns, trailed by red light",
      size: "single",
    },
  },
  {
    slug: "data-reporting-automation",
    title: "Data & Reporting Automation",
    group: "AI Automation",
    formValue: "data-reporting-automation",
    menuBlurb: "Reports and dashboards that build themselves",
    icon: "chart",
    card: {
      hook: "The reports your team builds by hand, ready every morning.",
      points: [
        "Sales, finance and marketing numbers in one place",
        "Daily and weekly reports sent to WhatsApp or email",
        "An alert the moment a number moves the wrong way",
      ],
      art: "advanced",
      image: "/assets/service-data-reporting-automation.webp",
      imageAlt: "Chrome bar-chart columns rising from black glass under a thin red line graph",
      size: "single",
    },
  },
  {
    slug: "ai-process-automation",
    title: "AI Process Automation",
    group: "AI Automation",
    formValue: "ai-process-automation",
    menuBlurb: "Paperwork and approvals handled end to end",
    icon: "file-check",
    card: {
      hook: "Paperwork read, checked and routed without the back-and-forth.",
      points: [
        "Reads invoices, forms and emails like a trained assistant",
        "Routes approvals to the right person, with reminders",
        "Keeps a clear record of who did what and when",
      ],
      art: "advanced",
      image: "/assets/service-ai-process-automation.webp",
      imageAlt: "Chrome document sheets gliding through a red scanning beam",
      size: "single",
    },
  },
  {
    slug: "finance-reconciliation-automation",
    title: "Finance & Reconciliation Automation",
    group: "AI Automation",
    formValue: "finance-reconciliation",
    menuBlurb: "Bank and ledger entries matched automatically",
    icon: "receipt",
    card: {
      hook: "Bank, payment and ledger entries matched for you.",
      points: [
        "Matches bank, payment gateway and ledger entries",
        "Flags only the mismatches that need a person",
        "Month-end close in days instead of weeks",
      ],
      art: "automation",
      image: "/assets/service-finance-reconciliation-automation.webp",
      imageAlt: "Stacks of chrome coins and glass ledger slabs joined by red threads of light",
      size: "single",
    },
  },
  {
    slug: "speed-to-lead-agent",
    title: "Speed-to-Lead Agent",
    group: "AI Automation",
    formValue: "lead-to-speed-agent",
    menuBlurb: "A reply to every new lead in under a minute",
    icon: "timer",
    card: {
      hook: "Every new enquiry gets a reply within a minute.",
      points: [
        "Replies on WhatsApp, SMS or email the moment a lead arrives",
        "Asks the right questions and books the call",
        "Passes hot leads to your sales team straight away",
      ],
      art: "chat",
      image: "/assets/service-speed-to-lead-agent.webp",
      imageAlt: "A chrome stopwatch of glass rings with a red streak racing around it",
      size: "single",
    },
  },
  {
    slug: "custom-automations",
    title: "Custom Automations",
    group: "Custom Solutions",
    formValue: "custom-automations",
    menuBlurb: "Your apps connected, the busywork gone",
    icon: "workflow",
    card: {
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
  },
  {
    slug: "content-automation",
    title: "Content Automation",
    group: "Custom Solutions",
    formValue: "content-automation",
    menuBlurb: "One idea in, a month of content out",
    icon: "pen",
    card: {
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
  },
  {
    slug: "website-development",
    title: "Websites & Landing Pages",
    group: "Web Development",
    formValue: "websites-landing-pages",
    menuBlurb: "Fast websites and landing pages that convert",
    icon: "monitor",
    card: {
      hook: "Fast, modern websites and landing pages built to convert.",
      points: [
        "High-converting landing pages and marketing sites",
        "Next.js, React, Tailwind CSS and Supabase",
        "AI chat and lead capture built in from day one",
      ],
      art: "build",
      image: "/assets/service-web-and-app.webp",
      imageAlt: "A glass browser window and phone floating in depth, with wireframes drawn in red light",
      size: "wide",
    },
  },
];

const bySlug = new Map(catalog.map((s) => [s.slug, s]));

export function catalogEntry(slug: string): CatalogEntry {
  const entry = bySlug.get(slug);
  if (!entry) throw new Error(`Unknown service: ${slug}`);
  return entry;
}

const NOT_SURE = { group: null, value: "not-sure", label: "Not sure what I need yet" } as const;

/** The contact form's options: every service, then "not sure". */
export const contactOptions: { group: ServiceGroup | null; value: string; label: string }[] = [
  ...catalog.map((s) => ({ group: s.group, value: s.formValue, label: s.title })),
  NOT_SURE,
];

const labels = new Map(contactOptions.map((o) => [o.value, o.label]));

/** Human name for a contact-form value, for the notification email. */
export function serviceLabel(formValue: string): string {
  return labels.get(formValue) ?? formValue;
}

/** A `?service=` value the form can preselect, or "" when it is not one of ours. */
export function resolveServiceParam(value: string | null): string {
  return value && labels.has(value) ? value : "";
}
