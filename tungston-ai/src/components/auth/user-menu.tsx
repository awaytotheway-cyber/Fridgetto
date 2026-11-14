"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";

/**
 * "Log in" for visitors, initials and a sign-out menu once signed in. The footer
 * variant is a plain text link; the menu opens upwards there.
 */
export function UserMenu({ variant = "header" }: { variant?: "header" | "footer" }) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (!user) {
    return (
      <Link
        href="/login"
        className={
          variant === "footer"
            ? "text-ash transition-colors hover:text-bone"
            : "rounded-full px-4 py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ash transition-colors duration-300 hover:text-bone"
        }
      >
        Log in
      </Link>
    );
  }

  const initials = (user.user_metadata?.full_name || user.email || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Imported on click rather than at module load: this is the only thing in the
  // header that needs the Supabase client, and signing out is never the first
  // thing anyone does.
  async function signOut() {
    const { createClient } = await import("@/lib/supabase/browser");
    await createClient().auth.signOut();
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
          <div className={`absolute z-50 w-48 ${variant === "footer" ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2"} rounded-panel border border-white/[0.12] bg-carbon p-1 shadow-lg`}>
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
