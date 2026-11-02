import { formatMoney } from "@/lib/currency";

type MoneyProps = {
  /** Amount in rupees, worked out with Indian salaries. */
  inr: number;
  /** Amount in dollars, worked out with US salaries. */
  usd: number;
  compact?: boolean;
  className?: string;
};

/**
 * Renders both figures; CSS shows the one matching <html data-currency> (see globals.css),
 * so static pages show the visitor's currency from the first frame.
 */
export function Money({ inr, usd, compact, className }: MoneyProps) {
  return (
    <span className={className}>
      <span data-cur="inr">{formatMoney(inr, "inr", { compact })}</span>
      <span data-cur="usd">{formatMoney(usd, "usd", { compact })}</span>
    </span>
  );
}
