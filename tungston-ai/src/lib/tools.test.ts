import { describe, expect, it } from "vitest";
import { logoColor, tools } from "./tools";

describe("tools", () => {
  it("carries the real WhatsApp logo", () => {
    expect(tools.whatsapp.name).toBe("WhatsApp");
    expect(tools.whatsapp.path).toMatch(/^M/);
    expect(tools.whatsapp.hex).toBe("25D366");
  });

  it("names tools that have no logo in Simple Icons", () => {
    expect(tools.tally.name).toBe("Tally");
    expect(tools.tally.path).toBeUndefined();
    expect(tools.slack.path).toBeUndefined();
  });
});

describe("logoColor", () => {
  it("keeps brand colours that read on black", () => {
    expect(logoColor("25D366")).toBe("#25D366");
    expect(logoColor("E42527")).toBe("#E42527");
  });

  it("switches dark brand colours to bone so they stay visible", () => {
    expect(logoColor("0C2451")).toBe("var(--color-bone)");
    expect(logoColor("000000")).toBe("var(--color-bone)");
    expect(logoColor(undefined)).toBe("var(--color-bone)");
  });
});
