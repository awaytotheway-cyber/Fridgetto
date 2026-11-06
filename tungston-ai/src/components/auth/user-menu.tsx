"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const initials = (user.user_metadata?.full_name || user.email || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex size-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-bone transition-colors hover:border-filament"
      >
        {initials}
      </button>
      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-panel border border-white/[0.12] bg-carbon p-1 shadow-lg">
            <p className="truncate px-3 py-2 text-xs text-smoke">{user.email}</p>
            <button
              type="button"
              onClick={signOut}
              className="w-full rounded-field px-3 py-2 text-left text-sm text-bone transition-colors hover:bg-white/[0.06]"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
