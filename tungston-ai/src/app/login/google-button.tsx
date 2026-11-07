"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

/**
 * "Continue with Google" via Google Identity Services rather than Supabase's OAuth
 * redirect.
 *
 * The redirect flow sends the visitor to Google with the Supabase project as the
 * callback host, so Google's consent screen reads "continue to <ref>.supabase.co".
 * Here Google's own button runs on our page instead and hands back an ID token, which
 * Supabase exchanges for a session — so the prompt names protomation.ai and the
 * project URL is never shown.
 *
 * Needs NEXT_PUBLIC_GOOGLE_CLIENT_ID (the Web OAuth client), and that client needs
 * the site's origin under "Authorized JavaScript origins" in the Google console.
 * Without the variable this falls back to the old redirect, which still works.
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type CredentialResponse = { credential?: string };

type GoogleAccountsId = {
  initialize(config: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    nonce?: string;
    use_fedcm_for_prompt?: boolean;
    auto_select?: boolean;
    itp_support?: boolean;
  }): void;
  renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

/**
 * Supabase verifies the nonce against the one Google signed, and expects the provider
 * to have received it hashed. So Google gets the SHA-256 hex digest and
 * signInWithIdToken gets the raw value.
 */
async function makeNonce(): Promise<{ raw: string; hashed: string }> {
  const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hashed = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { raw, hashed };
}

export function GoogleButton({ returnTo }: { returnTo?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  // Google's button takes a pixel width, so it has to be measured and re-rendered.
  const [width, setWidth] = useState(0);
  const frame = useRef<HTMLDivElement | null>(null);
  const slot = useRef<HTMLDivElement | null>(null);
  const nonce = useRef<{ raw: string; hashed: string } | null>(null);
  const initialized = useRef(false);
  // Google is initialized once, so the callback must not close over returnTo:
  // a client-side navigation that changes ?redirect= would leave it stale.
  const destination = useRef(returnTo);
  useEffect(() => {
    destination.current = returnTo;
  }, [returnTo]);

  useEffect(() => {
    const el = frame.current;
    if (!el || !CLIENT_ID) return;
    const measure = () => setWidth(Math.min(400, Math.round(el.getBoundingClientRect().width)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!CLIENT_ID || !scriptReady || !width || !slot.current) return;
    const id = window.google?.accounts.id;
    if (!id) return;

    let cancelled = false;
    (async () => {
      if (!initialized.current) {
        nonce.current = await makeNonce();
        if (cancelled) return;
        id.initialize({
          client_id: CLIENT_ID,
          nonce: nonce.current.hashed,
          // Chrome has dropped third-party cookies; FedCM is the supported path.
          use_fedcm_for_prompt: true,
          itp_support: true,
          callback: async (response) => {
            if (!response.credential) {
              setError("Google didn't return a credential. Try again.");
              return;
            }
            setError(null);
            const supabase = createClient();
            const { error: signInError } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response.credential,
              nonce: nonce.current?.raw,
            });
            if (signInError) {
              setError(signInError.message);
              return;
            }
            // The header and the Care Plan pages read the user on the server, so the
            // tree has to be refetched, not just navigated to.
            router.push(destination.current || "/");
            router.refresh();
          },
        });
        initialized.current = true;
      }
      if (cancelled || !slot.current) return;
      // Re-rendering appends, so clear the previous button when the width changes.
      slot.current.replaceChildren();
      id.renderButton(slot.current, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "center",
        width,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [scriptReady, width, router]);

  /** Before the client ID is configured, keep the redirect flow so sign-in still works. */
  const signInByRedirect = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(returnTo || "/")}`,
      },
    });
  }, [returnTo]);

  if (!CLIENT_ID) {
    return (
      <button
        type="button"
        onClick={signInByRedirect}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-panel border border-white/[0.14] px-4 py-3 text-sm font-medium text-bone transition-colors hover:border-filament"
      >
        <GoogleMark />
        Continue with Google
      </button>
    );
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" onReady={() => setScriptReady(true)} />
      {/* The frame sets the width Google's button is measured against and clips its
          square corners to the site's panel radius. */}
      <div ref={frame} className="mt-6 w-full overflow-hidden rounded-panel [color-scheme:dark]">
        <div ref={slot} className="flex justify-center" />
      </div>
      {error && <p className="mt-3 text-sm text-signal">{error}</p>}
    </>
  );
}

function GoogleMark() {
  return (
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
  );
}
