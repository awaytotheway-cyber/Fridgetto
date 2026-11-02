import { MARKETS, type Market, type RateSpec } from "@/lib/currency";
import type { SavingsModel } from "./types";

/** Working hours in a full-time month (40 hours × 52 weeks ÷ 12). */
export const FTE_HOURS_PER_MONTH = 173;

export type SavingsInputs = { volume: number; minutes: number; hourly: number };

export type SavingsResult = { hoursPerMonth: number; moneyPerMonth: number; moneyPerYear: number; fte: number };

/** The cost of an hour of the team's time in this market, unless the service sets its own. */
export function hourlyRate(model: SavingsModel, market: Market): RateSpec {
  return model.hourly?.[market] ?? MARKETS[market].hourly;
}

export function defaultInputs(model: SavingsModel, market: Market): SavingsInputs {
  return { volume: model.volume.value, minutes: model.minutes.value, hourly: hourlyRate(model, market).value };
}

export function computeSavings(model: SavingsModel, inputs: SavingsInputs): SavingsResult {
  const hoursPerMonth = (inputs.volume * inputs.minutes * model.automatedShare) / 60;
  const moneyPerMonth = hoursPerMonth * inputs.hourly;
  return {
    hoursPerMonth,
    moneyPerMonth,
    moneyPerYear: moneyPerMonth * 12,
    fte: hoursPerMonth / FTE_HOURS_PER_MONTH,
  };
}
