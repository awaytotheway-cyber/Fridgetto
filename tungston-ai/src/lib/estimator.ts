/**
 * Savings estimator: turns a few facts about a business into the hours, money and
 * leads our systems could give back.
 *
 * READ THIS BEFORE CHANGING A RATE.
 *
 * These are MODELLED assumptions, not measured client results. We have not published
 * engagement figures, so nothing here is "what we achieved for someone". They are set
 * deliberately low, because a number a prospect can argue with in a sales call is
 * worth less than a smaller one they accept.
 *
 * What the published evidence actually supports:
 *
 *  - Brynjolfsson, Li & Raymond, "Generative AI at Work" (NBER w31161), ~5,000
 *    support agents: 13.8% more issues resolved per hour. That is a throughput gain
 *    across a whole job, which works out near 12% less time on the assisted work.
 *    It is the most rigorous number available and it is far below what vendors claim.
 *  - A Danish study measuring (rather than surveying) AI time savings found ~2.8% of
 *    total time, against ~3% self-reported.
 *  - An OpenAI randomised field experiment found a 31% cut in weekly EMAIL time —
 *    much higher, because that is one narrow task fully handed over.
 *  - Vendor surveys (Zapier: 3.6 hrs/week) run well above anything measured.
 *  - For LEAD lift there is no credible published benchmark at all. The widely quoted
 *    "451% increase in qualified leads" traces to a single vendor-attributed study
 *    with no reachable primary source, and one aggregator prints both 45% and 451%
 *    in the same article. The lead rates below are guesses, kept small on purpose.
 *
 * Why these rates are not simply the research numbers: this model takes a share of a
 * person's REPETITIVE hours, not their whole week, so the two are not comparable.
 * Copying 14% straight in would be false precision. The split that does matter:
 *
 *  - ASSISTIVE systems (an agent helping a person do the work) sit near the measured
 *    12-15% band, nudged up a little because we are already scoped to repetitive work.
 *  - DELEGATING systems (the task leaves the person entirely, like moving data between
 *    tools) sit higher, because the work is removed rather than sped up.
 *
 * Replace all of this the moment there is real delivery data. When you do, record
 * which engagement each rate came from and over what period.
 */

import { services } from "@/lib/content";

export type EstimatorInputs = {
  /** People whose week includes repetitive work. */
  team: number;
  /** Hours each of them spends on it per week. */
  hoursPerWeek: number;
  /** Fully loaded cost of an hour of their time, in rupees. */
  hourlyCost: number;
  /** New leads or enquiries per month. */
  leads: number;
  /** What a new customer is worth, in rupees. */
  dealValue: number;
  /** Share of leads that become customers, in percent. */
  closeRate: number;
};

export type ServiceModel = {
  slug: string;
  /** Share of the team's repetitive hours this system takes over, 0–1. */
  hours: number;
  /** Lift in qualified leads it brings, 0–1. */
  leads: number;
  /** What it takes off the team's plate, in one line. */
  how: string;
};

export const serviceModels: ServiceModel[] = [
  // Assistive: a person still does the work, faster. Anchored near the measured 12-15% band.
  { slug: "ai-agents", hours: 0.2, leads: 0.06, how: "Qualifies leads, updates the CRM and triages tickets for your team." },
  { slug: "website-chatbots", hours: 0.12, leads: 0.12, how: "Handles repeat questions and captures leads on your site, 24/7." },
  { slug: "advanced-agents", hours: 0.15, leads: 0.02, how: "Finds answers in your docs and drafts the first version." },
  { slug: "content-automation", hours: 0.08, leads: 0.08, how: "Turns one idea into a month of on-brand posts and emails." },
  // Delegating: the task leaves the person's desk, so a larger share of repetitive hours.
  { slug: "workflow-automation", hours: 0.3, leads: 0.03, how: "Moves data between your tools so nobody copies and pastes." },
  { slug: "voice-agents", hours: 0.1, leads: 0.12, how: "Answers every call, books the appointment and logs a summary." },
  // Barely touches internal hours; it earns its place on leads, not time saved.
  { slug: "web-and-app", hours: 0.03, leads: 0.08, how: "A faster site that turns more visitors into enquiries." },
];

/**
 * No stack of systems takes over more than this share of anyone's repetitive work.
 * Lowered from 0.65: a claim that two thirds of a person's repetitive week disappears
 * is not one we can support, and the ceiling is what a sceptical buyer tests first.
 */
export const MAX_HOURS_SHARE = 0.5;

/** Working hours in the week shown by the week grid. */
export const WORK_WEEK_HOURS = 40;

const WEEKS_PER_MONTH = 52 / 12;
const FTE_HOURS_PER_MONTH = WORK_WEEK_HOURS * WEEKS_PER_MONTH;

/**
 * Indian market, deliberately conservative — a prospect who challenges these should
 * find them easy to accept, not easy to argue with.
 *
 * hourlyCost: a support/ops executive on roughly ₹2L CTC plus overheads, over 2,080
 * working hours a year. Experienced staff cost several times this, so the figure
 * understates the saving for most teams rather than overstating it.
 *
 * dealValue: a low-ticket first-year customer, the kind a high-volume D2C, retail or
 * local-services pipeline brings in.
 */
export const defaultInputs: EstimatorInputs = {
  team: 12,
  hoursPerWeek: 10,
  hourlyCost: 125,
  leads: 300,
  dealValue: 5000,
  closeRate: 15,
};

export const defaultServices = ["ai-agents", "website-chatbots"];

export function serviceTitle(slug: string) {
  return services.find((s) => s.slug === slug)?.title ?? slug;
}

export type Estimate = {
  hoursPerMonth: number;
  moneyPerMonth: number;
  moneyPerYear: number;
  extraLeads: number;
  leadLiftPct: number;
  extraRevenuePerMonth: number;
  /** Full-time people's worth of hours given back. */
  fte: number;
  /** One person's week: hours of repetitive work, and how many of them the systems take. */
  week: { repetitive: number; freed: number };
  /** Hours per month each selected system contributes, largest first. */
  breakdown: { slug: string; hours: number }[];
};

/**
 * Systems overlap, so their effects compound rather than add: two systems that
 * each take 40% of the repetitive work take 64% together, not 80%.
 */
export function estimate(inputs: EstimatorInputs, selected: string[]): Estimate {
  const models = serviceModels.filter((m) => selected.includes(m.slug));
  const hoursShare = Math.min(MAX_HOURS_SHARE, 1 - models.reduce((left, m) => left * (1 - m.hours), 1));
  const leadShare = 1 - models.reduce((left, m) => left * (1 - m.leads), 1);

  const repetitivePerMonth = inputs.team * inputs.hoursPerWeek * WEEKS_PER_MONTH;
  const hoursPerMonth = repetitivePerMonth * hoursShare;
  const moneyPerMonth = hoursPerMonth * inputs.hourlyCost;
  const extraLeads = inputs.leads * leadShare;
  const extraRevenuePerMonth = extraLeads * (inputs.closeRate / 100) * inputs.dealValue;

  const totalWeight = models.reduce((sum, m) => sum + m.hours, 0);
  const breakdown = models
    .map((m) => ({ slug: m.slug, hours: totalWeight ? (hoursPerMonth * m.hours) / totalWeight : 0 }))
    .sort((a, b) => b.hours - a.hours);

  return {
    hoursPerMonth,
    moneyPerMonth,
    moneyPerYear: moneyPerMonth * 12,
    extraLeads,
    leadLiftPct: leadShare * 100,
    extraRevenuePerMonth,
    fte: hoursPerMonth / FTE_HOURS_PER_MONTH,
    week: {
      repetitive: Math.round(inputs.hoursPerWeek),
      freed: Math.round(inputs.hoursPerWeek * hoursShare),
    },
    breakdown,
  };
}
