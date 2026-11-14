import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { DEMO_PHONE, demoMode, type DemoMode } from "@/lib/demo-mode";

/** Drop a recording here and the demo card offers it when no demo number is set. */
export const SAMPLE_CALL_PATH = "/audio/sample-call.mp3";

export function hasSampleRecording(): boolean {
  return existsSync(join(process.cwd(), "public", SAMPLE_CALL_PATH));
}

/** The demo card's state for this build. Server-only: it checks the file system. */
export function currentDemoMode(): DemoMode {
  return demoMode({ phone: DEMO_PHONE, hasRecording: hasSampleRecording() });
}
