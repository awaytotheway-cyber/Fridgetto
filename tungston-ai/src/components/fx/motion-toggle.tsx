"use client";

import { useSyncExternalStore } from "react";
import { MOTION_EVENT, motionIsOff, setMotionOff } from "@/lib/motion";

/**
 * Lets a visitor stop the site moving, and lets one whose OS says "reduce" turn it
 * back on. The choice is remembered.
 *
 * The state lives on <html>, set before first paint by the boot script, so this
 * subscribes to it rather than keeping a copy: useSyncExternalStore is the supported
 * way to read a value React does not own without setting state inside an effect.
 */

function subscribe(onChange: () => void) {
  window.addEventListener(MOTION_EVENT, onChange);
  return () => window.removeEventListener(MOTION_EVENT, onChange);
}

/** The server cannot know the visitor's choice; hydration corrects it immediately. */
const serverSnapshot = () => false;

export function MotionToggle() {
  const off = useSyncExternalStore(subscribe, motionIsOff, serverSnapshot);

  return (
    <button
      type="button"
      aria-pressed={off}
      onClick={() => setMotionOff(!off)}
      className="inline-flex items-center gap-2 transition-colors hover:text-bone"
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-3.5 w-7 shrink-0 items-center rounded-full border border-white/20 px-[2px] ${
          off ? "bg-white/20" : ""
        }`}
      >
        <span className={`block size-[7px] rounded-full bg-current ${off ? "translate-x-[12px]" : ""}`} />
      </span>
      Reduce motion
    </button>
  );
}
