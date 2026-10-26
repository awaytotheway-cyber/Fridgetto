/**
 * Brand configuration — the one place to rename, re-contact or re-point the site.
 * Colors live in src/app/globals.css (@theme block); the canvas effects read them from there.
 */
export const siteConfig = {
  name: "Protomation.ai",
  /** Short form used in tight spots (logo lockup, preloader). */
  shortName: "Protomation",
  /** Suffix rendered in a muted tone next to the short name in the logo. */
  nameSuffix: ".ai",
  legalName: "Protomation AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://protomation.ai",
  tagline: "We build AI that works while you sleep.",
  description:
    "Protomation.ai designs and ships AI agents, voice agents, website chatbots, custom automations and end-to-end content systems for growing businesses, in weeks instead of quarters.",
  keywords: [
    "AI agency",
    "AI agents",
    "voice AI agents",
    "website chatbot",
    "business process automation",
    "RAG",
    "content automation",
    "web development",
    "app development",
  ],
  contact: {
    email: "protomation.services@gmail.com",
    /** Shown next to the email wherever contact details appear. Leave null to show email only. */
    phone: null as string | null,
    location: "Remote-first, working worldwide",
    /** Where "Book a Free AI Audit" points. Swap for a Cal.com / Calendly link when ready. */
    bookingUrl: "/contact",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/protomation-ai" },
    { label: "X", href: "https://x.com/protomationai" },
    { label: "Instagram", href: "https://www.instagram.com/protomation.ai" },
    { label: "YouTube", href: "https://www.youtube.com/@protomationai" },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  /**
   * Rendered art in /public/assets (see ASSETS.md). Set either to null to fall back
   * to the built-in generative visuals: the dot-matrix portrait, or the bare dot grid.
   */
  assets: {
    aboutImage: "/assets/about-human-machine.webp" as string | null,
    heroTexture: "/assets/hero-texture.webp" as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
