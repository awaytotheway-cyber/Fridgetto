"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { field } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import { businessTypes, CONSENT_TEXT, enquiryRanges, type LeadField } from "@/lib/lead-schema";
import { siteConfig } from "@/site.config";

const initial: LeadState = { status: "idle", message: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

const label = "mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke";
const chevron =
  "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23999%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-12";

/** The "Book a free call" form (COPY.md §11). Works without JavaScript: it is a plain form posting to a server action. */
export function LeadForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const tracked = useRef(false);

  // Fill the hidden context fields once the page is interactive. The start time lets the
  // server drop submissions faster than a person could type; the rest is stored with the lead.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const set = (name: string, value: string) => {
      const input = form.elements.namedItem(name);
      if (input instanceof HTMLInputElement) input.value = value;
    };
    // Only the first time: a person correcting a field and resending must never look like a bot
    const started = form.elements.namedItem("startedAt");
    if (started instanceof HTMLInputElement && !started.value) started.value = String(Date.now());
    set("sourcePath", location.pathname);
    for (const key of UTM_KEYS) set(key, params.get(key) ?? "");
  }, [state.status]);

  useEffect(() => {
    if (state.status === "success" && !tracked.current) {
      tracked.current = true;
      trackEvent("form_submit");
    }
  }, [state.status]);

  /**
   * Submitting through a form action makes React clear the form afterwards, which would
   * wipe the visitor's answers (selects included) whenever there's an error to fix. With
   * JavaScript we dispatch the action ourselves, so nothing is cleared; without it, the
   * form still posts to the server action the plain HTML way.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-panel border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
        <span aria-hidden="true" className="block size-3 rounded-full bg-volt shadow-[0_0_24px_6px_rgb(255_212_0/0.45)]" />
        <p className="mt-6 font-display text-title font-semibold text-bone">{state.message}</p>
        {siteConfig.contact.whatsapp && (
          <p className="mt-3 text-ash">
            Want to speed things up?{" "}
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              className="text-bone underline decoration-filament underline-offset-4"
            >
              Message us on WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const err = (name: LeadField) =>
    e[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-signal">
        {e[name]}
      </p>
    ) : null;
  const a11y = (name: LeadField) => ({
    "aria-invalid": e[name] ? true : undefined,
    "aria-describedby": e[name] ? `${name}-error` : undefined,
  });

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={state.status === "error" ? "form-status" : undefined}>
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 font-mono text-xs tracking-wider">
        <span className="font-semibold text-signal">{"// BOOK A FREE CALL"}</span>
        <span className="text-right text-smoke uppercase">Reply {siteConfig.contact.responseTimeShort}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name</label>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} {...a11y("name")} className={`${field} h-14`} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="businessName" className={label}>Clinic or business name</label>
          <input id="businessName" name="businessName" autoComplete="organization" required defaultValue={v.businessName} {...a11y("businessName")} className={`${field} h-14`} />
          {err("businessName")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="businessType" className={label}>Type of business</label>
          <select id="businessType" name="businessType" required defaultValue={v.businessType ?? ""} {...a11y("businessType")} className={`${field} ${chevron} h-14`}>
            <option value="" disabled className="bg-neutral-900 text-smoke">Select…</option>
            {businessTypes.map((b) => (
              <option key={b.value} value={b.value} className="bg-neutral-900 text-bone">{b.label}</option>
            ))}
          </select>
          {err("businessType")}
        </div>
        <div>
          <label htmlFor="city" className={label}>City</label>
          <input id="city" name="city" autoComplete="address-level2" required defaultValue={v.city} {...a11y("city")} className={`${field} h-14`} />
          {err("city")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="normal-case text-smoke/80">(WhatsApp preferred)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 98765 43210" defaultValue={v.phone} {...a11y("phone")} className={`${field} h-14`} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} {...a11y("email")} className={`${field} h-14`} />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor="monthlyEnquiries" className={label}>
          Enquiries per month <span className="normal-case text-smoke/80">(optional)</span>
        </label>
        <select id="monthlyEnquiries" name="monthlyEnquiries" defaultValue={v.monthlyEnquiries ?? ""} {...a11y("monthlyEnquiries")} className={`${field} ${chevron} h-14`}>
          <option value="" className="bg-neutral-900 text-smoke">Select a range…</option>
          {enquiryRanges.map((r) => (
            <option key={r.value} value={r.value} className="bg-neutral-900 text-bone">{r.label}</option>
          ))}
        </select>
        {err("monthlyEnquiries")}
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Anything we should know? <span className="normal-case text-smoke/80">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={v.message}
          placeholder="Where do most enquiries come from? What isn't working today?"
          data-lenis-prevent
          className={`${field} resize-y py-4 leading-relaxed`}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-bone/90">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={v.consent === "on"}
            {...a11y("consent")}
            className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-[var(--color-filament)]"
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        {err("consent")}
      </div>

      {/* Context the server stores with the lead */}
      <input type="hidden" name="startedAt" />
      <input type="hidden" name="sourcePath" />
      {UTM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} />
      ))}

      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-smoke">
          We use these details only to reply to you. See our{" "}
          <a href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:text-bone">
            Privacy Policy
          </a>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          icon={<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />}
          className="!rounded-lg px-8"
        >
          {pending ? "Sending…" : "Request my free call"}
        </Button>
      </div>
      {state.status === "error" && (
        <p id="form-status" role="alert" className="text-sm text-signal">
          {state.message}
        </p>
      )}
    </form>
  );
}
