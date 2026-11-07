"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";

type AuthCtx = { user: User | null; loading: boolean };

const Ctx = createContext<AuthCtx>({ user: null, loading: true });

export function AuthProvider({ initialUser, children }: { initialUser: User | null; children: ReactNode }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <Ctx value={{ user, loading }}>{children}</Ctx>;
}

export function useAuth() {
  return useContext(Ctx);
}
