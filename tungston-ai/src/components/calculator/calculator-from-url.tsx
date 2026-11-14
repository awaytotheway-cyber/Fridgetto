"use client";

import { useSearchParams } from "next/navigation";
import { MissedEnquiryCalculator } from "./missed-enquiry-calculator";
import type { Vertical } from "@/content/calculator";

/**
 * Opens the calculator on the preset named in ?specialty= (e.g. /clinics?specialty=dental#calculator).
 * Keyed on the preset, so following another specialty link on the same page starts it afresh.
 * Must sit inside <Suspense>: the page is prerendered and only the browser knows the query.
 */
export function CalculatorFromUrl({ vertical }: { vertical: Vertical }) {
  const preset = useSearchParams().get("specialty") ?? undefined;
  return <MissedEnquiryCalculator key={preset ?? "default"} vertical={vertical} initialPreset={preset} />;
}
