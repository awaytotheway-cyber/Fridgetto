"use server";

import { headers } from "next/headers";
import { deliverLead } from "@/lib/deliver-lead";
import { saveLead } from "@/lib/enquiry-store";
import { notifyLead } from "@/lib/lead-webhook";
import { parseLead, type LeadField } from "@/lib/lead-schema";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/site.config";

export type LeadState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<LeadField, string>>;
  values?: Record<string, string>;
};

/** Faster than this, it's a script filling the form, not a person. */
const MIN_FILL_MS = 3_000;

/**
 * Handles the "Book a free call" form (COPY.md §11). A valid lead is recorded in
 * Supabase and sent to n8n at the same time; the visitor sees success if either worked.
 * Bots that fill the hidden field or submit inhumanly fast are told it worked and dropped.
 */
export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";
  const success = (name: string) => ({
    status: "success" as const,
    message: `Thanks, ${firstName(name)}. We'll reply ${siteConfig.contact.responseTime} to fix a time for your call.`,
  });

  const name = String(form.get("name") ?? "");
  const startedAt = Number(form.get("startedAt"));
  if (String(form.get("website") ?? "") || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return success(name);
  }

  if (rateLimit(`lead:${clientIp(await headers())}`, { max: 5, windowMs: 10 * 60_000 })) {
    return { status: "error", message: "Too many attempts. Message us on WhatsApp instead." };
  }

  const parsed = parseLead(form);
  if (!parsed.ok) {
    return { status: "error", message: "Check the highlighted fields and send again.", errors: parsed.errors, values: parsed.values };
  }

  const result = await deliverLead(parsed.lead, { save: saveLead, notify: notifyLead });
  if (result === "failed") {
    return {
      status: "error",
      message: "Your request didn't go through. Try again, or message us on WhatsApp.",
      values: Object.fromEntries([...form.entries()].filter((e): e is [string, string] => typeof e[1] === "string")),
    };
  }
  return success(parsed.lead.name);
}
