"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { ArrowUpRight } from "lucide-react";

const initial: ContactState = { status: "idle", message: "" };

export const field =
  "w-full rounded-field bg-white/[0.035] px-5 text-bone ring-1 ring-white/[0.09] outline-none transition-[box-shadow,background-color] placeholder:text-smoke hover:ring-white/20 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-filament aria-[invalid=true]:ring-filament";

const SERVICE_OPTIONS = [
  // — AI Automation —
  { group: "AI Automation", value: "ai-agent-development", label: "AI Agent Development" },
  { group: "AI Automation", value: "ai-voice-agents", label: "AI Voice Agents" },
  { group: "AI Automation", value: "ai-website-chatbots", label: "AI Website Chatbots" },
  { group: "AI Automation", value: "whatsapp-automation", label: "WhatsApp Automation" },
  { group: "AI Automation", value: "crm-lead-automation", label: "CRM & Lead Automation" },
  { group: "AI Automation", value: "data-reporting-automation", label: "Data & Reporting Automation" },
  { group: "AI Automation", value: "ai-process-automation", label: "AI Process Automation" },
  { group: "AI Automation", value: "finance-reconciliation", label: "Finance & Reconciliation" },
  { group: "AI Automation", value: "lead-to-speed-agent", label: "Lead to Speed Agent" },
  // — Custom Solutions —
  { group: "Custom Solutions", value: "custom-automations", label: "Workflow Automation" },
  { group: "Custom Solutions", value: "content-automation", label: "Content Automation" },
  // — Web Development —
  { group: "Web Development", value: "websites-landing-pages", label: "Websites & Landing Pages" },
  // — Other —
  { group: null, value: "not-sure", label: "Not sure what I need yet" },
] as const;

/** Group the services by their group label for <optgroup> rendering */
function groupedServices() {
  const groups: { group: string | null; items: typeof SERVICE_OPTIONS[number][] }[] = [];
  for (const opt of SERVICE_OPTIONS) {
    const last = groups[groups.length - 1];
    if (last && last.group === opt.group) {
      last.items.push(opt);
    } else {
      groups.push({ group: opt.group, items: [opt] });
    }
  }
  return groups;
}

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
      {/* Top HUD Status Bar matching screenshot 1 */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs tracking-wider">
        <span className="font-semibold text-filament">{"// START A PROJECT"}</span>
        <span className="text-smoke">~4 HR RESPONSE</span>
      </div>

      {/* Row 1: Full Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
            Full Name
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
          <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
            Email
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

      {/* Row 2: Phone + Company */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v?.phone}
            placeholder="+91 9876543210"
            aria-invalid={e.phone ? true : undefined}
            aria-describedby={e.phone ? "phone-error" : undefined}
            className={`${field} h-14`}
          />
          {e.phone && (
            <p id="phone-error" className="mt-2 text-sm text-signal">
              {e.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="businessName" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
            Company <span className="normal-case text-smoke/60">(optional)</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            autoComplete="organization"
            defaultValue={v?.businessName}
            className={`${field} h-14`}
          />
        </div>
      </div>

      {/* Row 3: Service Interested In */}
      <div>
        <label htmlFor="service" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={v?.service ?? ""}
          aria-invalid={e.service ? true : undefined}
          aria-describedby={e.service ? "service-error" : undefined}
          className={`${field} h-14 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="%23999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4"/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-12`}
        >
          <option value="" disabled className="bg-neutral-900 text-smoke">
            Select a service…
          </option>
          {groupedServices().map((g) =>
            g.group ? (
              <optgroup key={g.group} label={g.group} className="bg-neutral-900 text-bone">
                {g.items.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-neutral-900 text-bone">
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              g.items.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-neutral-900 text-bone">
                  {opt.label}
                </option>
              ))
            )
          )}
        </select>
        {e.service && (
          <p id="service-error" className="mt-2 text-sm text-signal">
            {e.service}
          </p>
        )}
      </div>

      {/* Row 4: What are you trying to scale? */}
      <div>
        <label htmlFor="task" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-smoke">
          What are you trying to scale? <span className="normal-case text-smoke/60">(optional)</span>
        </label>
        <textarea
          id="task"
          name="task"
          rows={4}
          defaultValue={v?.task}
          placeholder="Revenue goal, what you have tried, what blocking you right now."
          data-lenis-prevent
          className={`${field} resize-y py-4 leading-relaxed`}
        />
      </div>

      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs font-mono text-xs uppercase tracking-widest text-smoke">
          We never spam. Your details reach the founder directly.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          icon={<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />}
          className="!rounded-lg px-8"
        >
          {pending ? "Sending…" : "Send it"}
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
