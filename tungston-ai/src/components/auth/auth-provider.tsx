"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

type AuthCtx = { user: User | null; loading: boolean };

const Ctx = createContext<AuthCtx>({ user: null, loading: true });

const configured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export function AuthProvider({ initialUser, children }: { initialUser: User | null; children: ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(configured && !initialUser);

  /**
   * The Supabase browser client is ~68 KB and the homepage used 18% of it. The server
   * already read the session and handed us `initialUser`, so the first render is
   * correct without it: all this subscription adds is reacting to a session that
   * changes later — a sign-out, a token refresh, another tab. None of that can happen
   * before the page is interactive, so the import waits for an idle moment.
   *
   * The proxy refreshes the session cookie on every request independently, so a few
   * seconds without the client running costs nothing.
   */
  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const connect = async () => {
      const { createClient } = await import("@/lib/supabase/browser");
      if (cancelled) return;
      const {
        data: { subscription },
      } = createClient().auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
      unsubscribe = () => subscription.unsubscribe();
    };

    // Safari only shipped requestIdleCallback in 16.4, so keep the timer fallback.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(connect, { timeout: 3000 })
      : window.setTimeout(connect, 1200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      unsubscribe?.();
    };
  }, []);

  return <Ctx value={{ user, loading }}>{children}</Ctx>;
}

export function useAuth() {
  return useContext(Ctx);
}
