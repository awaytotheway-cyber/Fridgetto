"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

const initial: ContactState = { status: "idle", message: "" };

const field =
  "w-full rounded-field bg-white/[0.035] px-5 text-bone ring-1 ring-white/[0.09] outline-none transition-[box-shadow,background-color] placeholder:text-smoke hover:ring-white/20 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-filament aria-[invalid=true]:ring-filament";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-panel border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
        <span aria-hidden="true" className="block size-3 rounded-full bg-volt shadow-[0_0_24px_6px_rgb(255_212_0/0.45)]" />
        <p className="mt-6 font-display text-title font-semibold text-bone">{state.message}</p>
        <p className="mt-3 text-ash">
          Want to move faster? Email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-bone underline decoration-filament underline-offset-4">
            {siteConfig.contact.email}
          </a>{" "}
          with any docs or links that would help.
        </p>
      </div>
    );
  }

  const v = state.values;
  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="space-y-5" aria-describedby={state.status === "error" ? "form-status" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-bone">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v?.name}
            aria-invalid={e.name ? true : undefined}
            aria-describedby={e.name ? "name-error" : undefined}
            className={`${field} h-14`}
          />
          {e.name && (
            <p id="name-error" className="mt-2 text-sm text-signal">
              {e.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-bone">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v?.email}
            aria-invalid={e.email ? true : undefined}
            aria-describedby={e.email ? "email-error" : undefined}
            className={`${field} h-14`}
          />
          {e.email && (
            <p id="email-error" className="mt-2 text-sm text-signal">
              {e.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="task" className="mb-2 block text-sm font-medium text-bone">
          What should we automate for you?
        </label>
        <textarea
          id="task"
          name="task"
          rows={5}
          required
          defaultValue={v?.task}
          placeholder="For example: we miss calls after 6pm, and every lead gets typed into HubSpot by hand."
          aria-invalid={e.task ? true : undefined}
          aria-describedby={e.task ? "task-error" : undefined}
          data-lenis-prevent
          className={`${field} resize-y py-4 leading-relaxed`}
        />
        {e.task && (
          <p id="task-error" className="mt-2 text-sm text-signal">
            {e.task}
          </p>
        )}
      </div>
      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-smoke">Free, 45 minutes, no obligation. We reply within one business day.</p>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Request my free audit"}
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
