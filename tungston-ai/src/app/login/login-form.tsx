"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { field } from "@/components/contact-form";
import { GoogleButton } from "./google-button";
import { login, signup } from "./actions";

type Tab = "signin" | "signup";

export function LoginForm({ returnTo }: { returnTo?: string }) {
  const [tab, setTab] = useState<Tab>("signin");
  const [loginState, loginAction, loginPending] = useActionState(login, null);
  const [signupState, signupAction, signupPending] = useActionState(signup, null);

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

        {/* Google: ID-token flow, so the consent screen names this site */}
        <GoogleButton returnTo={returnTo} />

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-smoke">or</span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* Email form */}
        {tab === "signin" ? (
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="returnTo" value={returnTo || "/"} />
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
