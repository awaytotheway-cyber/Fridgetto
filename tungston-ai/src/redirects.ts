/**
 * Where old URLs go now. The site first sold seven separate services, then briefly an
 * "AI front desk"; it now sells AI automation for clinics. Each old page points at the
 * part of /solutions that covers it. next.config.ts serves these as 308s, and
 * scripts/check-routes.ts checks every one against a running server.
 *
 * Plain data with no imports, so the route checker can load it with Node directly.
 */
export const legacyRedirects = [
  { source: "/services", destination: "/solutions" },
  { source: "/services/voice-agents", destination: "/solutions#voice" },
  { source: "/services/ai-agents", destination: "/solutions" },
  { source: "/services/advanced-agents", destination: "/solutions" },
  { source: "/services/workflow-automation", destination: "/solutions#workflows" },
  { source: "/services/custom-automations", destination: "/solutions#workflows" },
  { source: "/services/website-chatbots", destination: "/solutions#chat" },
  { source: "/services/content-automation", destination: "/solutions" },
  { source: "/services/web-and-app", destination: "/" },
  { source: "/team", destination: "/about" },
  // Renamed on 15 Nov 2026: "How it works" became Solutions, the diagnostic became the audit
  { source: "/how-it-works", destination: "/solutions" },
  { source: "/diagnostic", destination: "/audit" },
] as const;

/** Every public page. The sitemap lists these and the checker expects a 200 from each. */
export const publicRoutes = [
  "/",
  "/clinics",
  "/solutions",
  "/education",
  "/audit",
  "/pricing",
  "/security",
  "/work",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export type PublicRoute = (typeof publicRoutes)[number];
