import type { RateSpec } from "@/lib/currency";
import type { SliderSpec } from "./types";

/** Range inputs run from 0 to this; values are mapped onto the spec's own range. */
export const SLIDER_STOPS = 1000;

type Range = Pick<SliderSpec | RateSpec, "min" | "max" | "step">;

/** Ranges spanning orders of magnitude (100 to 50,000 chats) are spread logarithmically. */
const isLog = (r: Range) => r.min > 0 && r.max / r.min >= 50;

const snap = (r: Range, v: number) => {
  const stepped = Math.round(v / r.step) * r.step;
  return Math.min(r.max, Math.max(r.min, Number(stepped.toFixed(6))));
};

export function toPosition(r: Range, value: number): number {
  const t = isLog(r)
    ? Math.log(value / r.min) / Math.log(r.max / r.min)
    : (value - r.min) / (r.max - r.min);
  return Math.round(Math.min(1, Math.max(0, t)) * SLIDER_STOPS);
}

export function fromPosition(r: Range, position: number): number {
  const t = Math.min(1, Math.max(0, position / SLIDER_STOPS));
  return snap(r, isLog(r) ? r.min * (r.max / r.min) ** t : r.min + t * (r.max - r.min));
}
