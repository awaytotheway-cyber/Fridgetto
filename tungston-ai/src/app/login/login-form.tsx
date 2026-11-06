"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { field } from "@/components/contact-form";
import { createClient } from "@/lib/supabase/browser";
import { login, signup } from "./actions";

type Tab = "signin" | "signup";

export function LoginForm({ returnTo }: { returnTo?: string }) {
  const [tab, setTab] = useState<Tab>("signin");
  const [loginState, loginAction, loginPending] = useActionState(login, null);
  const [signupState, signupAction, signupPending] = useActionState(signup, null);

  async function signInWithGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(returnTo || "/pricing#care-plan")}`,
      },
    });
  }

  const error = tab === "signin" ? (loginState as { error?: string })?.error : (signupState as { error?: string })?.error;
  const success = tab === "signup" ? (signupState as { success?: string })?.success : null;
  const pending = tab === "signin" ? loginPending : signupPending;

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="w-full max-w-md rounded-card border border-white/[0.12] bg-white/[0.02] p-7 sm:p-9">
        <h1 className="font-display text-title font-semibold text-bone">
          {tab === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-ash">
          {tab === "signin"
            ? "Sign in to subscribe to the Care Plan and unlock subscriber pricing."
            : "Create an account to subscribe to the Care Plan and unlock subscriber pricing."}
        </p>

        {/* Tab toggle */}
        <div className="mt-6 inline-flex rounded-full border border-white/[0.12] p-1">
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === t ? "bg-filament text-bone" : "text-ash hover:text-bone"
              }`}
            >
              {t === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-panel border border-white/[0.14] px-4 py-3 text-sm font-medium text-bone transition-colors hover:border-filament"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-smoke">or</span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* Email form */}
        {tab === "signin" ? (
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="returnTo" value={returnTo || "/pricing#care-plan"} />
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-widest text-smoke">
                Email
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={`${field} mt-2 h-12`}
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-widest text-smoke">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Your password"
                className={`${field} mt-2 h-12`}
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        ) : (
          <form action={signupAction} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-xs font-semibold uppercase tracking-widest text-smoke">
                Name
              </label>
              <input
                id="signup-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className={`${field} mt-2 h-12`}
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-widest text-smoke">
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className={`${field} mt-2 h-12`}
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-widest text-smoke">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                placeholder="At least 6 characters"
                className={`${field} mt-2 h-12`}
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Creating account…" : "Create account"}
            </Button>
          </form>
        )}

        {/* Status messages */}
        {error && <p className="mt-4 text-sm text-signal">{error}</p>}
        {success && <p className="mt-4 text-sm text-bone">{success}</p>}

        {/* Tab switch hint */}
        <p className="mt-6 text-center text-sm text-ash">
          {tab === "signin" ? (
            <>
              Don&apos;t have an account?{" "}
              <button type="button" onClick={() => setTab("signup")} className="text-bone underline decoration-filament/60 underline-offset-4">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setTab("signin")} className="text-bone underline decoration-filament/60 underline-offset-4">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
