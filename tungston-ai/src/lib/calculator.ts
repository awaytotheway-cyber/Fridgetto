/**
 * The missed-enquiry calculator's maths. Pure and imports nothing at runtime, so the
 * calculator component and the tests share it.
 *
 *   revenue at risk  = enquiries × missed% × booking% × conversion% × average value
 *   break-even       = monthly fee ÷ average value
 */
import { MANAGED_FROM_INR } from "@/content/pricing";

export type CalculatorInputs = {
  enquiries: number;
  missedPct: number;
  bookingPct: number;
  conversionPct: number;
  avgValue: number;
};

export type CalculatorResult = {
  /** Patients (or enrollments) a month lost to missed or slow replies. */
  patientsLost: number;
  /** Rupees a month, rounded to the rupee. */
  revenueAtRisk: number;
  /** Patients a month needed to cover the monthly fee; null when the average value is 0. */
  breakEvenPatients: number | null;
};

const MAX_ENQUIRIES = 1_00_000;

/** Non-numbers and negatives become 0; then the value is held between 0 and max. */
const clamp = (v: number, max: number) => (Number.isFinite(v) && v > 0 ? Math.min(v, max) : 0);

export function calculate(inputs: CalculatorInputs, monthlyFee: number = MANAGED_FROM_INR): CalculatorResult {
  const enquiries = clamp(inputs.enquiries, MAX_ENQUIRIES);
  const missed = clamp(inputs.missedPct, 100);
  const booking = clamp(inputs.bookingPct, 100);
  const conversion = clamp(inputs.conversionPct, 100);
  const avgValue = clamp(inputs.avgValue, Number.MAX_SAFE_INTEGER);

  // Multiply the whole percentages first and divide once, so presets come out exact
  const product = enquiries * missed * booking * conversion;
  return {
    patientsLost: product / 1_000_000,
    revenueAtRisk: Math.round((product * avgValue) / 1_000_000),
    breakEvenPatients: avgValue > 0 ? monthlyFee / avgValue : null,
  };
}
