/**
 * What the demo front desk card can offer right now:
 *  - "call": a live demo number is set (NEXT_PUBLIC_DEMO_PHONE)
 *  - "recording": no number, but public/audio/sample-call.mp3 exists
 *  - "none": neither, so the card hides and CTAs point to /how-it-works instead
 *
 * Imports nothing, so client and server code can both use it.
 */
export type DemoMode =
  | { kind: "call"; tel: string; display: string }
  | { kind: "recording" }
  | { kind: "none" };

export function demoMode({ phone, hasRecording }: { phone?: string | null; hasRecording: boolean }): DemoMode {
  const display = phone?.trim() ?? "";
  const dial = display.replace(/[^\d+]/g, "");
  // Fewer than 8 digits is a placeholder, not a number anyone can call
  if (dial.replace(/\D/g, "").length >= 8) return { kind: "call", tel: `tel:${dial}`, display };
  return hasRecording ? { kind: "recording" } : { kind: "none" };
}

/** The demo number from the environment, read once. */
export const DEMO_PHONE = process.env.NEXT_PUBLIC_DEMO_PHONE ?? "";
