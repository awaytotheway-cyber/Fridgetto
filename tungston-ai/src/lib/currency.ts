/**
 * The site-wide ₹ / $ setting. Indian visitors see rupees and Indian salaries,
 * everyone else dollars and US salaries: switching swaps the market's numbers,
 * it never converts one currency into the other.
 *
 * The choice lives on <html data-currency>, set before first paint by
 * currencyBootScript, so figures rendered in both currencies (see <Money>)
 * show the right one with no flash.
 */

export type Market = "inr" | "usd";

export type RateSpec = { value: number; min: number; max: number; step: number };

export const MARKETS: Record<
  Market,
  { symbol: "₹" | "$"; locale: "en-IN" | "en-US"; label: string; hourly: RateSpec }
> = {
  inr: { symbol: "₹", locale: "en-IN", label: "India (₹)", hourly: { value: 450, min: 150, max: 2000, step: 50 } },
  usd: { symbol: "$", locale: "en-US", label: "US & global ($)", hourly: { value: 35, min: 15, max: 120, step: 5 } },
};

export const CURRENCY_KEY = "protomation:currency";
export const CURRENCY_EVENT = "protomation:currency";

/** Time zones that mean "probably in India" when the visitor has not chosen yet. */
const INDIA_TIME_ZONES = ["Asia/Kolkata", "Asia/Calcutta"];

const isMarket = (value: unknown): value is Market => value === "inr" || value === "usd";

export function detectMarket(saved: string | null | undefined, timeZone: string | undefined): Market {
  if (isMarket(saved)) return saved;
  return timeZone && INDIA_TIME_ZONES.includes(timeZone) ? "inr" : "usd";
}

const formatters = new Map<Market, Intl.NumberFormat>();
function grouped(amount: number, market: Market) {
  let f = formatters.get(market);
  if (!f) {
    f = new Intl.NumberFormat(MARKETS[market].locale, { maximumFractionDigits: 0 });
    formatters.set(market, f);
  }
  return f.format(amount);
}

const oneDecimal = (n: number) => n.toFixed(1).replace(/\.0$/, "");

export function formatMoney(amount: number, market: Market, opts?: { compact?: boolean }): string {
  const n = Math.round(amount);
  const { symbol } = MARKETS[market];
  if (opts?.compact) {
    if (market === "inr") {
      if (n >= 10_000_000) return `${symbol}${oneDecimal(n / 10_000_000)}Cr`;
      if (n >= 1_000_000) return `${symbol}${oneDecimal(n / 100_000)}L`;
    } else {
      if (n >= 1_000_000) return `${symbol}${oneDecimal(n / 1_000_000)}M`;
      if (n >= 100_000) return `${symbol}${Math.round(n / 1000)}K`;
    }
  }
  return `${symbol}${grouped(n, market)}`;
}

/** The active market, as set on <html>. Dollars on the server and before the boot script runs. */
export function readMarket(): Market {
  if (typeof document === "undefined") return "usd";
  return document.documentElement.dataset.currency === "inr" ? "inr" : "usd";
}

function safeLocalStorage(): Pick<Storage, "setItem"> | null {
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

export function writeMarket(market: Market, storage: Pick<Storage, "setItem"> | null = safeLocalStorage()): void {
  document.documentElement.dataset.currency = market;
  try {
    storage?.setItem(CURRENCY_KEY, market);
  } catch {
    // Private browsing or blocked storage: the choice lasts for this page view.
  }
  window.dispatchEvent(new Event(CURRENCY_EVENT));
}

export function subscribeMarket(callback: () => void): () => void {
  window.addEventListener(CURRENCY_EVENT, callback);
  return () => window.removeEventListener(CURRENCY_EVENT, callback);
}

/** Runs in <head> before paint. Built from the constants above so it cannot drift from detectMarket. */
export const currencyBootScript = `(function(){var d=document.documentElement,s=null,z;try{s=localStorage.getItem(${JSON.stringify(
  CURRENCY_KEY,
)})}catch(e){}try{z=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}d.dataset.currency=(s==="inr"||s==="usd")?s:(${JSON.stringify(
  INDIA_TIME_ZONES,
)}.indexOf(z)>-1?"inr":"usd")})();`;
