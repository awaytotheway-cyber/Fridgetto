"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import type { ServiceId } from "@/lib/pricing";
import { ESTIMATE_ATTR, openQuote, type QuoteDetail } from "./pricing-events";

type Look = Pick<ComponentProps<typeof ButtonLink>, "variant" | "size" | "magnetic" | "className">;

/**
 * Opens the quote form. It is a real link to the contact page underneath, so it still
 * goes somewhere useful if the script has not loaded.
 */
export function QuoteButton({ detail, children, ...look }: { detail?: QuoteDetail; children: ReactNode } & Look) {
  return (
    <ButtonLink
      href="/contact"
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        openQuote(detail);
      }}
      {...look}
    >
      {children}
    </ButtonLink>
  );
}

/**
 * A service card's button. A plain link to the estimator, so the site's smooth scroller
 * handles the scrolling (and it still works without JavaScript); the estimator reads
 * ESTIMATE_ATTR off the click to start on this service.
 */
export function EstimateButton({ service, children, className }: { service: ServiceId; children: ReactNode; className?: string }) {
  return (
    <a href="#estimator" {...{ [ESTIMATE_ATTR]: service }} className={`${buttonClasses("ghost", "md")} ${className ?? ""}`}>
      {children}
    </a>
  );
}
