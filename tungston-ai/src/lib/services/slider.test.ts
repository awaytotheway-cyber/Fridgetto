import { describe, expect, it } from "vitest";
import { fromPosition, SLIDER_STOPS, toPosition } from "./slider";
import type { SliderSpec } from "./types";

const minutes: SliderSpec = { label: "", unit: "", min: 1, max: 15, step: 1, value: 4 };
const chats: SliderSpec = { label: "", unit: "", min: 100, max: 50000, step: 100, value: 3000 };
const half: SliderSpec = { label: "", unit: "", min: 0.5, max: 5, step: 0.5, value: 1.5 };

describe("linear sliders", () => {
  it("maps the ends and the middle", () => {
    expect(fromPosition(minutes, 0)).toBe(1);
    expect(fromPosition(minutes, SLIDER_STOPS)).toBe(15);
    expect(toPosition(minutes, 8)).toBe(SLIDER_STOPS / 2);
    expect(fromPosition(minutes, SLIDER_STOPS / 2)).toBe(8);
  });

  it("snaps half steps", () => {
    expect(fromPosition(half, toPosition(half, 1.5))).toBe(1.5);
  });
});

describe("log sliders (ranges that span orders of magnitude)", () => {
  it("reaches both ends", () => {
    expect(fromPosition(chats, 0)).toBe(100);
    expect(fromPosition(chats, SLIDER_STOPS)).toBe(50000);
  });

  it("gives the default a usable spot, not the far left", () => {
    expect(toPosition(chats, 3000)).toBeGreaterThan(SLIDER_STOPS / 2);
  });

  it("round-trips values on the step", () => {
    expect(fromPosition(chats, toPosition(chats, 3000))).toBe(3000);
    expect(fromPosition(chats, 437) % 100).toBe(0);
  });
});
