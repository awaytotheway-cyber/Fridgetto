import { describe, expect, it } from "vitest";
import { demoMode } from "./demo-mode";

describe("demoMode", () => {
  it("calls when a number is set, dialling digits and + only", () => {
    expect(demoMode({ phone: "+91 22-4000 0000", hasRecording: true })).toEqual({
      kind: "call",
      tel: "tel:+912240000000",
      display: "+91 22-4000 0000",
    });
  });

  it("falls back to the recording when the number is blank", () => {
    expect(demoMode({ phone: "   ", hasRecording: true })).toEqual({ kind: "recording" });
  });

  it("hides when there is neither", () => {
    expect(demoMode({ hasRecording: false })).toEqual({ kind: "none" });
  });

  it("ignores a 'number' with too few digits to dial", () => {
    expect(demoMode({ phone: "TBD", hasRecording: false })).toEqual({ kind: "none" });
  });
});
