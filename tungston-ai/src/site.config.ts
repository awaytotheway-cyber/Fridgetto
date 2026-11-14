/**
 * Brand configuration — the one place to rename, re-contact or re-point the site.
 * Colors live in src/app/globals.css (@theme block); the canvas effects read them from there.
 * Page copy lives in src/content/.
 */

/** "+91 74999 07619" → "917499907619", the form wa.me and tel: links want. */
const digits = (phone: string) => phone.replace(/\D/g, "");

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "+91 74999 07619";

export const siteConfig = {
  name: "Protomation.ai",
  /** Short form used in tight spots (logo lockup, preloader). */
  shortName: "Protomation",
  /** Suffix rendered in a muted tone next to the short name in the logo. */
  nameSuffix: ".ai",
  legalName: "Protomation AI",
  /** The one canonical address. The site is served on www; the bare domain should 301 to it. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.protomation.ai",
  tagline: "AI front desks for clinics",
  /**
   * The hero headline, split as it is set on the page. The share card draws the same
   * words, so the two cannot drift apart.
   *
   * `hot` is the word that carries the filament glow, and it ends the SECOND line.
   * Both renderers follow that rule; change it in one and change it in the other.
   */
  headline: {
    lines: ["Every Patient Enquiry", "Answered In", "Every Consult Booked."],
    hot: "Seconds.",
  },
  /** Who the site says it is for, shown above the headline. Keep in step with src/content/clinics.ts. */
  audiences: ["IVF", "Dermatology & Hair", "Dental", "Diagnostic labs"],
  /** Meta description: keep it under about 150 characters so search results show all of it. */
  description:
    "Every call, missed call and WhatsApp enquiry answered in Hindi or English, qualified and booked. For IVF, skin, hair and dental clinics.",
  keywords: [
    "AI front desk",
    "AI receptionist for clinics",
    "clinic appointment booking",
    "IVF clinic enquiries",
    "dental clinic receptionist",
    "WhatsApp booking for clinics",
    "Hindi voice receptionist",
    "missed call management",
  ],
  contact: {
    /** Switch to hello@protomation.ai once that mailbox exists. */
    email: "protomation.services@gmail.com",
    /** Shown next to the email wherever contact details appear. Leave null to show email only. */
    phone: null as string | null,
    /** WhatsApp number as displayed. NEXT_PUBLIC_WHATSAPP_NUMBER overrides it. */
    whatsapp: whatsapp as string | null,
    /** wa.me link for the number above. */
    whatsappUrl: `https://wa.me/${digits(whatsapp)}`,
    location: "Mumbai, India · working with clients worldwide",
    city: "Mumbai",
    /** The one reply promise. Used on every form, page and FAQ that mentions a reply. */
    responseTime: "within 6 working hours (Mon–Sat, 10am–7pm IST)",
    responseTimeShort: "within 6 working hours",
    /** Where "Book a free call" points. A calendar embed shows there when NEXT_PUBLIC_CALENDAR_URL is set. */
    bookingUrl: "/contact",
    calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL?.trim() || null,
  },
  founder: {
    name: "Pratik Naragude",
    role: "Founder",
  },
  /**
   * Facts the /privacy and /terms pages state about the business. The wording of
   * those pages lives in src/lib/legal.ts.
   */
  legal: {
    /** How the business is constituted, as the pages describe it. */
    entity: "a sole proprietorship",
    /**
     * The city whose courts hear disputes. Left null, the terms say "the courts of
     * India" rather than printing a placeholder — set it to name a city instead.
     */
    jurisdictionCity: "Mumbai" as string | null,
    /** Shown as "Last updated" on both pages. Change it whenever the text changes. */
    lastUpdated: "14 November 2026",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/protomation-ai" },
    { label: "X", href: "https://x.com/protomationai" },
    { label: "Instagram", href: "https://www.instagram.com/protomation.ai" },
    { label: "YouTube", href: "https://www.youtube.com/@protomationai" },
  ],
  nav: [
    { label: "Clinics", href: "/clinics" },
    { label: "Education", href: "/education" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
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
