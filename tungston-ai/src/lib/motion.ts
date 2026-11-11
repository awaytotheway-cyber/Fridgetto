/**
 * The site's one answer to "should this move?".
 *
 * Nine places already read `prefers-reduced-motion`. Rather than add a second,
 * competing switch, the visitor's choice is written to `data-motion` on <html> and
 * everything keeps asking the same question:
 *
 *  - CSS checks `:root[data-motion="off"]` beside the media query (globals.css).
 *  - JS calls `prefersReducedMotion()` in lib/gsap.ts, which reads the attribute too.
 *
 * The OS setting is the default. An explicit choice in this UI overrides it, in
 * either direction — someone who turned motion down system-wide can still turn it
 * back on here, which a media query alone cannot offer.
 */

export const MOTION_KEY = "protomation:motion";

/** Dispatched on window when the choice changes, so open components can react. */
export const MOTION_EVENT = "protomation:motion-change";

export function motionIsOff(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.motion === "off";
}

export function setMotionOff(off: boolean) {
  const root = document.documentElement;
  if (off) root.dataset.motion = "off";
  else root.dataset.motion = "on";
  try {
    localStorage.setItem(MOTION_KEY, off ? "off" : "on");
  } catch {
    // Private mode or blocked storage: the choice still applies to this page view.
  }
  window.dispatchEvent(new Event(MOTION_EVENT));
}

/**
 * Runs in <head> before first paint, so a visitor who turned motion off never sees
 * a frame of it. Kept as a string because it must not wait for hydration.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement;var v=localStorage.getItem('${MOTION_KEY}');if(!v){v=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}d.dataset.motion=v}catch(e){}})();`;
