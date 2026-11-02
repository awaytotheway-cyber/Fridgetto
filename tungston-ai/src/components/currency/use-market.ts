"use client";

import { useSyncExternalStore } from "react";
import { readMarket, subscribeMarket, type Market } from "@/lib/currency";

const serverMarket = (): Market => "usd";

/** The active ₹ / $ market. Dollars while hydrating, then whatever <html data-currency> says. */
export function useMarket(): Market {
  return useSyncExternalStore(subscribeMarket, readMarket, serverMarket);
}
