import type { Market, RateSpec } from "@/lib/currency";
import type { ToolId } from "@/lib/tools";

/** The drawn fallback illustration a service card uses when it has no rendered image. */
export type ServiceArt = "agents" | "voice" | "chat" | "automation" | "advanced" | "content" | "build";

export type ServiceGroup = "AI Automation" | "Custom Solutions" | "Web Development";

export type ServiceIcon =
  | "bot"
  | "phone"
  | "chat"
  | "whatsapp"
  | "kanban"
  | "chart"
  | "file-check"
  | "receipt"
  | "timer"
  | "workflow"
  | "pen"
  | "monitor";

/** The light record every list of services reads: nav, footer, cards, estimator, contact form. */
export type CatalogEntry = {
  slug: string;
  title: string;
  group: ServiceGroup;
  /** The contact form's value for this service. Never change one: the email and webhook read them. */
  formValue: string;
  /** One line under the name in the Services dropdown, 60 characters at most. */
  menuBlurb: string;
  icon: ServiceIcon;
  card: {
    hook: string;
    points: [string, string, string];
    art: ServiceArt;
    image: string;
    imageAlt: string;
    /** Bento footprint on large screens. */
    size: "hero" | "wide" | "single";
  };
};

export type Photo = { src: string; alt: string; credit: { name: string; url: string } };

export type SliderSpec = { label: string; unit: string; min: number; max: number; step: number; value: number };

export type SavingsModel = {
  /** How much of the work there is each month. */
  volume: SliderSpec;
  /** Minutes a person spends on one item today. */
  minutes: SliderSpec;
  /** Share of that work the system takes over, 0–1. */
  automatedShare: number;
  /** Overrides the market's default cost of an hour (finance and sales roles cost more). */
  hourly?: Partial<Record<Market, RateSpec>>;
  /** Shown under the calculator, in plain words. */
  assumptions: string[];
};

export type LiveVariant =
  | "chat"
  | "call"
  | "pipeline"
  | "dashboard"
  | "ledger"
  | "documents"
  | "calendar"
  | "browser"
  | "workflow"
  | "tasks";

export type LiveItem = { label: string; meta?: string; from?: "them" | "us" };

/** Everything a service page shows. */
export type ServiceDetail = CatalogEntry & {
  seo: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    live: { variant: LiveVariant; title: string; tool?: ToolId; items: LiveItem[] };
  };
  /** The service-specific headline figure, next to hours and money saved. */
  highlight: { value: string; label: string };
  whatIs: { question: string; body: [string, string]; before: string[]; after: string[] };
  benefits: { title: string; body: string }[];
  steps: { title: string; body: string; when: string }[];
  flow: { label: string; tool?: ToolId }[];
  yourPart: { items: string[]; total: string };
  ourPart: string[];
  youGet: string[];
  timeline: string;
  savings: SavingsModel;
  useCases: { title: string; body: string; photo?: Photo }[];
  tools: ToolId[];
  faqs: { q: string; a: string }[];
  related: [string, string, string];
};
