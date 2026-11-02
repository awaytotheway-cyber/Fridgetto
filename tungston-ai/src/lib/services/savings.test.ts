import { describe, expect, it } from "vitest";
import { computeSavings, defaultInputs } from "./savings";
import type { SavingsModel } from "./types";

const model: SavingsModel = {
  volume: { label: "Chats a month", unit: "chats", min: 100, max: 50000, step: 100, value: 3000 },
  minutes: { label: "Minutes each", unit: "min", min: 1, max: 15, step: 1, value: 4 },
  automatedShare: 0.7,
  assumptions: [],
};

describe("computeSavings", () => {
  it("works out hours and rupees at Indian salaries", () => {
    const r = computeSavings(model, defaultInputs(model, "inr"));
    expect(r.hoursPerMonth).toBe(140);
    expect(r.moneyPerMonth).toBe(63000);
    expect(r.moneyPerYear).toBe(756000);
    expect(r.fte).toBeCloseTo(0.809, 3);
  });

  it("works out dollars at US salaries", () => {
    expect(computeSavings(model, defaultInputs(model, "usd")).moneyPerMonth).toBe(4900);
  });
});

describe("defaultInputs", () => {
  it("uses a service's own hourly rate when it sets one", () => {
    const finance: SavingsModel = { ...model, hourly: { inr: { value: 600, min: 200, max: 2500, step: 50 } } };
    expect(defaultInputs(finance, "inr").hourly).toBe(600);
    expect(defaultInputs(finance, "usd").hourly).toBe(35);
  });
});
