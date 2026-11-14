import { describe, expect, it } from "vitest";
import { calculate } from "./calculator";
import { clinicPresets, educationPresets } from "@/content/calculator";

describe("calculate", () => {
  it("IVF preset", () => {
    const r = calculate({ enquiries: 300, missedPct: 30, bookingPct: 25, conversionPct: 20, avgValue: 160_000 });
    expect(r.patientsLost).toBeCloseTo(4.5);
    expect(r.revenueAtRisk).toBe(720_000);
    expect(r.breakEvenPatients).toBeCloseTo(0.246875);
  });

  it("never returns NaN, Infinity or negatives", () => {
    for (const bad of [NaN, -5, Infinity, 0]) {
      const r = calculate({ enquiries: bad, missedPct: bad, bookingPct: bad, conversionPct: bad, avgValue: bad });
      expect(Number.isFinite(r.patientsLost)).toBe(true);
      expect(Number.isFinite(r.revenueAtRisk)).toBe(true);
      expect(r.revenueAtRisk).toBeGreaterThanOrEqual(0);
    }
  });

  it("break-even is null when the average value is 0", () => {
    expect(
      calculate({ enquiries: 100, missedPct: 10, bookingPct: 10, conversionPct: 10, avgValue: 0 }).breakEvenPatients,
    ).toBeNull();
  });

  it("clamps percentages to 0–100 and caps enquiries", () => {
    expect(calculate({ enquiries: 100, missedPct: 150, bookingPct: 100, conversionPct: 100, avgValue: 1 }).patientsLost).toBe(100);
    expect(calculate({ enquiries: 1e12, missedPct: 100, bookingPct: 100, conversionPct: 100, avgValue: 1 }).patientsLost).toBe(1_00_000);
  });

  it("uses the monthly fee it is given", () => {
    expect(calculate({ enquiries: 1, missedPct: 1, bookingPct: 1, conversionPct: 1, avgValue: 10_000 }, 50_000).breakEvenPatients).toBe(5);
  });

  it("every preset produces the figure COPY.md shows", () => {
    const expected: Record<string, number> = {
      ivf: 720_000,
      "derm-hair": 525_000,
      dental: 420_000,
      diagnostics: 324_000,
      custom: 270_000,
      "study-abroad": 1_012_500,
      upskilling: 600_000,
      "exam-coaching": 900_000,
    };
    for (const [id, preset] of Object.entries({ ...clinicPresets, ...educationPresets })) {
      expect(calculate(preset.inputs).revenueAtRisk, id).toBe(expected[id]);
    }
  });
});
