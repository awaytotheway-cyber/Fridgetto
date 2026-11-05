"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { submitQuote, type QuoteState } from "@/app/actions";
import { field } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { pricingServices } from "@/lib/pricing";
import { siteConfig } from "@/site.config";
import { OPEN_QUOTE, type QuoteDetail } from "./pricing-events";

const SERVICE_CHOICES = [...pricingServices.map((s) => s.name), "Maintenance plan", "Not sure yet"];
const label = "mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke";
const initial: QuoteState = { status: "idle", message: "" };

/**
 * One quote form for the whole pricing page, opened by any "Get a Custom Quote" style
 * button. It is a native <dialog>, which traps focus, closes on Escape and returns focus
 * to the button that opened it.
 */
export function QuoteModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [detail, setDetail] = useState<QuoteDetail>({});
  // A new key remounts the form, so reopening starts clean instead of showing the last result
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setDetail((e as CustomEvent<QuoteDetail>).detail ?? {});
      setSession((n) => n + 1);
      const dialog = ref.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
      }
    };
    window.addEventListener(OPEN_QUOTE, onOpen);
    return () => window.removeEventListener(OPEN_QUOTE, onOpen);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="quote-title"
      data-lenis-prevent
      onClose={() => {
        document.documentElement.style.overflow = "";
      }}
      // A click on the dimmed backdrop lands on the dialog element itself
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-auto max-h-[92dvh] w-[min(42rem,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-panel border border-white/[0.1] bg-carbon p-0 text-bone backdrop:bg-black/80"
    >
      <div className="p-6 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-signal uppercase">Custom quote</p>
            <h2 id="quote-title" className="mt-3 font-display text-title font-semibold text-bone">
              Tell us what you need
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mt-1 -mr-2 rounded-full p-2 text-ash transition-colors hover:text-bone"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <QuoteForm key={session} detail={detail} onDone={close} />
      </div>
    </dialog>
  );
}

function QuoteForm({ detail, onDone }: { detail: QuoteDetail; onDone: () => void }) {
  const [state, action, pending] = useActionState(submitQuote, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="mt-8">
        <span aria-hidden="true" className="block size-3 rounded-full bg-filament shadow-[0_0_24px_6px_rgb(232_16_26/0.45)]" />
        <p className="mt-6 font-display text-title font-semibold text-bone">{state.message}</p>
        <p className="mt-3 text-ash">
          Want to move faster? Email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-bone underline decoration-filament underline-offset-4">
            {siteConfig.contact.email}
          </a>{" "}
          with any documents or links that would help.
        </p>
        <div className="mt-8">
          <Button type="button" variant="ghost" onClick={onDone}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const err = (id: string, text?: string) =>
    text ? (
      <p id={`q-${id}-error`} className="mt-2 text-sm text-signal">
        {text}
      </p>
    ) : null;
  const invalid = (id: string, text?: string) => ({
    "aria-invalid": text ? true : undefined,
    "aria-describedby": text ? `q-${id}-error` : undefined,
  });

  return (
    <form action={action} noValidate className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={label}>
            Full name
          </label>
          <input id="q-name" name="name" autoComplete="name" required defaultValue={v.name} {...invalid("name", e.name)} className={`${field} h-14`} />
          {err("name", e.name)}
        </div>
        <div>
          <label htmlFor="q-email" className={label}>
            Email
          </label>
          <input id="q-email" name="email" type="email" autoComplete="email" required defaultValue={v.email} {...invalid("email", e.email)} className={`${field} h-14`} />
          {err("email", e.email)}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-phone" className={label}>
            Phone <span className="normal-case text-smoke/60">(optional)</span>
          </label>
          <input id="q-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 9876543210" defaultValue={v.phone} {...invalid("phone", e.phone)} className={`${field} h-14`} />
          {err("phone", e.phone)}
        </div>
        <div>
          <label htmlFor="q-business" className={label}>
            Business name <span className="normal-case text-smoke/60">(optional)</span>
          </label>
          <input id="q-business" name="businessName" autoComplete="organization" defaultValue={v.businessName} className={`${field} h-14`} />
        </div>
      </div>

      <div>
        <label htmlFor="q-service" className={label}>
          What do you want to build?
        </label>
        <select
          id="q-service"
          name="service"
          required
          defaultValue={v.service ?? detail.service ?? ""}
          {...invalid("service", e.service)}
          className={`${field} h-14 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="%23999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4"/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-12`}
        >
          <option value="" disabled className="bg-neutral-900 text-smoke">
            Select…
          </option>
          {SERVICE_CHOICES.map((name) => (
            <option key={name} value={name} className="bg-neutral-900 text-bone">
              {name}
            </option>
          ))}
        </select>
        {err("service", e.service)}
      </div>

      <div>
        <label htmlFor="q-budget" className={label}>
          Estimated budget <span className="normal-case text-smoke/60">(optional)</span>
        </label>
        <input
          id="q-budget"
          name="budget"
          defaultValue={v.budget ?? detail.budget ?? ""}
          placeholder="For example ₹60,000–80,000"
          className={`${field} h-14`}
        />
      </div>

      <div>
        <label htmlFor="q-requirements" className={label}>
          Requirements <span className="normal-case text-smoke/60">(optional)</span>
        </label>
        <textarea
          id="q-requirements"
          name="requirements"
          rows={4}
          defaultValue={v.requirements ?? detail.requirements ?? ""}
          placeholder="What should it do, which tools does it need to connect to, and what slows you down today?"
          data-lenis-prevent
          className={`${field} resize-y py-4 leading-relaxed`}
        />
      </div>

      <input type="hidden" name="estimate" value={detail.estimate ?? ""} />
      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="q-website">Leave this empty</label>
        <input id="q-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-smoke">We reply within one business day. We never spam.</p>
        <Button type="submit" size="lg" disabled={pending} className="!rounded-lg px-8">
          {pending ? "Sending…" : "Send my request"}
        </Button>
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-signal">
          {state.message}
        </p>
      )}
    </form>
  );
}
