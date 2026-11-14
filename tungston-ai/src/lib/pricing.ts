/**
 * Money formatting. The prices themselves are in src/content/pricing.ts.
 * This file imports nothing so it can be used anywhere.
 */

/** ₹ with Indian digit grouping: 100000 becomes ₹1,00,000. */
export function inr(n: number): string {
  const digits = String(Math.round(n));
  if (digits.length <= 3) return `₹${digits}`;
  const head = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${head},${digits.slice(-3)}`;
}
