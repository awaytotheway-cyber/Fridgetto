/**
 * Where the old URLs go now. The site used to sell seven separate services; it now
 * sells one front desk, so each service page points at the part of /how-it-works
 * that covers it. next.config.ts serves these as 308s, and scripts/check-routes.ts
 * checks every one against a running server.
 *
 * Plain data with no imports, so the route checker can load it with Node directly.
 */
export const legacyRedirects = [
  { source: "/services", destination: "/how-it-works" },
  { source: "/services/voice-agents", destination: "/how-it-works#voice" },
  { source: "/services/ai-agents", destination: "/how-it-works" },
  { source: "/services/advanced-agents", destination: "/how-it-works" },
  { source: "/services/workflow-automation", destination: "/how-it-works#integrations" },
  // Renamed to workflow-automation earlier; sent straight to the end of the chain
  { source: "/services/custom-automations", destination: "/how-it-works#integrations" },
  { source: "/services/website-chatbots", destination: "/how-it-works#chat" },
  { source: "/services/content-automation", destination: "/how-it-works" },
  { source: "/services/web-and-app", destination: "/" },
  { source: "/team", destination: "/about" },
] as const;

/** Every public page. The sitemap lists these (minus llms.txt) and the checker expects a 200 from each. */
export const publicRoutes = [
  "/",
  "/clinics",
  "/education",
  "/how-it-works",
  "/diagnostic",
  "/pricing",
  "/security",
  "/work",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export type PublicRoute = (typeof publicRoutes)[number];
