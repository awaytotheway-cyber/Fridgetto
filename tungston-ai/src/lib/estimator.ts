/**
 * Savings estimator: turns a few facts about a business into the hours, money and
 * leads our systems typically give back. The per-service rates are launch
 * placeholders, like the case studies: tune them to real client results.
 */

import { services } from "@/lib/content";

export type EstimatorInputs = {
  /** People whose week includes repetitive work. */
  team: number;
  /** Hours each of them spends on it per week. */
  hoursPerWeek: number;
  /** Fully loaded cost of an hour of their time, in dollars. */
  hourlyCost: number;
  /** New leads or enquiries per month. */
  leads: number;
  /** What a new customer is worth, in dollars. */
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
  { slug: "ai-agents", hours: 0.35, leads: 0.1, how: "Qualifies leads, updates the CRM and triages tickets for your team." },
  { slug: "voice-agents", hours: 0.12, leads: 0.18, how: "Answers every call, books the appointment and logs a summary." },
  { slug: "website-chatbots", hours: 0.15, leads: 0.2, how: "Handles repeat questions and captures leads on your site, 24/7." },
  { slug: "custom-automations", hours: 0.4, leads: 0.05, how: "Moves data between your tools so nobody copies and pastes." },
  { slug: "advanced-agents", hours: 0.25, leads: 0.04, how: "Finds answers in your docs and drafts the first version." },
  { slug: "content-automation", hours: 0.1, leads: 0.15, how: "Turns one idea into a month of on-brand posts and emails." },
  { slug: "web-and-app", hours: 0.05, leads: 0.15, how: "A faster site that turns more visitors into enquiries." },
];

/** No stack of systems takes over more than this share of anyone's repetitive work. */
export const MAX_HOURS_SHARE = 0.65;

/** Working hours in the week shown by the week grid. */
export const WORK_WEEK_HOURS = 40;

const WEEKS_PER_MONTH = 52 / 12;
const FTE_HOURS_PER_MONTH = WORK_WEEK_HOURS * WEEKS_PER_MONTH;

export const defaultInputs: EstimatorInputs = {
  team: 12,
  hoursPerWeek: 10,
  hourlyCost: 35,
  leads: 300,
  dealValue: 2000,
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
 * each take 40% of the busywork take 64% together, not 80%.
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
