"use client";

import { useEffect, useRef } from "react";
import { isAnalyticsEvent, trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Counts clicks on anything marked data-event="<name>" (CTAs, WhatsApp, the demo line),
 * so server-rendered links need no client code of their own. Mounted once in the layout.
 */
export function EventTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-event]");
      const name = el?.dataset.event;
      if (isAnalyticsEvent(name)) trackEvent(name, el?.textContent?.trim());
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

/** Counts one view of the page it sits on (e.g. diagnostic_view). */
export function TrackView({ event }: { event: AnalyticsEvent }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(event);
  }, [event]);
  return null;
}
