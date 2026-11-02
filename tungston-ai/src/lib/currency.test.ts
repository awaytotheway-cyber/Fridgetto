import { afterEach, describe, expect, it, vi } from "vitest";
import { currencyBootScript, detectMarket, formatMoney, MARKETS, readMarket, writeMarket } from "./currency";

describe("formatMoney", () => {
  it("groups rupees the Indian way", () => {
    expect(formatMoney(120000, "inr")).toBe("₹1,20,000");
    expect(formatMoney(63000.4, "inr")).toBe("₹63,000");
  });

  it("groups dollars the US way", () => {
    expect(formatMoney(1400, "usd")).toBe("$1,400");
  });

  it("shortens large rupee amounts to lakh and crore", () => {
    expect(formatMoney(12_000_000, "inr", { compact: true })).toBe("₹1.2Cr");
    expect(formatMoney(1_240_000, "inr", { compact: true })).toBe("₹12.4L");
    expect(formatMoney(240_000, "inr", { compact: true })).toBe("₹2,40,000");
  });

  it("shortens large dollar amounts to K and M", () => {
    expect(formatMoney(1_200_000, "usd", { compact: true })).toBe("$1.2M");
    expect(formatMoney(240_000, "usd", { compact: true })).toBe("$240K");
    expect(formatMoney(24_000, "usd", { compact: true })).toBe("$24,000");
  });

  it("drops a trailing .0 when compact", () => {
    expect(formatMoney(20_000_000, "inr", { compact: true })).toBe("₹2Cr");
    expect(formatMoney(3_000_000, "usd", { compact: true })).toBe("$3M");
  });
});

describe("detectMarket", () => {
  it("prefers the saved choice over the time zone", () => {
    expect(detectMarket("inr", "America/New_York")).toBe("inr");
    expect(detectMarket("usd", "Asia/Kolkata")).toBe("usd");
  });

  it("falls back to rupees for Indian time zones", () => {
    expect(detectMarket(null, "Asia/Kolkata")).toBe("inr");
    expect(detectMarket(undefined, "Asia/Calcutta")).toBe("inr");
  });

  it("falls back to dollars otherwise", () => {
    expect(detectMarket("garbage", "Europe/London")).toBe("usd");
    expect(detectMarket(null, undefined)).toBe("usd");
  });
});

describe("MARKETS", () => {
  it("assumes ₹450 an hour in India and $35 in the US", () => {
    expect(MARKETS.inr.hourly).toEqual({ value: 450, min: 150, max: 2000, step: 50 });
    expect(MARKETS.usd.hourly).toEqual({ value: 35, min: 15, max: 120, step: 5 });
  });
});

describe("market store", () => {
  afterEach(() => vi.unstubAllGlobals());

  function stubDom() {
    const dataset: Record<string, string> = {};
    const events: string[] = [];
    vi.stubGlobal("document", { documentElement: { dataset } });
    vi.stubGlobal("window", { dispatchEvent: (e: Event) => events.push(e.type) });
    return { dataset, events };
  }

  it("survives storage that throws (private browsing)", () => {
    const { dataset } = stubDom();
    expect(() =>
      writeMarket("inr", {
        setItem() {
          throw new Error("blocked");
        },
      }),
    ).not.toThrow();
    expect(dataset.currency).toBe("inr");
    expect(readMarket()).toBe("inr");
  });

  it("announces the change and saves it", () => {
    const { events } = stubDom();
    const saved: Record<string, string> = {};
    writeMarket("usd", { setItem: (k, v) => void (saved[k] = v) });
    expect(saved["protomation:currency"]).toBe("usd");
    expect(events).toContain("protomation:currency");
    expect(readMarket()).toBe("usd");
  });

  it("reads dollars when nothing is set", () => {
    stubDom();
    expect(readMarket()).toBe("usd");
  });
});

describe("currencyBootScript", () => {
  it("sets rupees before paint for a visitor in India with no saved choice", () => {
    const dataset: Record<string, string> = {};
    const run = new Function(
      "document",
      "localStorage",
      "Intl",
      currencyBootScript,
    );
    run(
      { documentElement: { dataset } },
      { getItem: () => null },
      { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: "Asia/Kolkata" }) }) },
    );
    expect(dataset.currency).toBe("inr");
  });

  it("keeps working when storage throws", () => {
    const dataset: Record<string, string> = {};
    const run = new Function("document", "localStorage", "Intl", currencyBootScript);
    run(
      { documentElement: { dataset } },
      {
        getItem() {
          throw new Error("blocked");
        },
      },
      { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: "America/Chicago" }) }) },
    );
    expect(dataset.currency).toBe("usd");
  });
});
