"use client";

import { useRef, type KeyboardEvent } from "react";
import { writeMarket, type Market } from "@/lib/currency";
import { useMarket } from "./use-market";

const options: { market: Market; symbol: string; label: string }[] = [
  { market: "inr", symbol: "₹", label: "Indian rupees" },
  { market: "usd", symbol: "$", label: "US dollars" },
];

/** ₹ / $ toggle. Every switch on the site controls the same setting. */
export function CurrencySwitch({ className }: { className?: string }) {
  const market = useMarket();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = (i + 1) % options.length;
    writeMarket(options[next].market);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Currency"
      className={`inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.03] p-1 ${className ?? ""}`}
    >
      {options.map((o, i) => {
        const checked = market === o.market;
        return (
          <button
            key={o.market}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={o.label}
            tabIndex={checked ? 0 : -1}
            onClick={() => writeMarket(o.market)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="min-w-11 rounded-full px-3 py-1.5 text-sm font-semibold text-ash transition-colors duration-300 hover:text-bone aria-checked:bg-filament aria-checked:text-white"
          >
            {o.symbol}
          </button>
        );
      })}
    </div>
  );
}
