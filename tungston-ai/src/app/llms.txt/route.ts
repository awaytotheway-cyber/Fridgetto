import { inr } from "@/lib/pricing";
import { AUDIT_NAME, PRICES } from "@/content/pricing";
import { solutions } from "@/content/solutions";
import { siteConfig } from "@/site.config";

/**
 * A plain-language summary for AI assistants and search tools.
 * Nothing here reads request data, so it is prerendered at build time.
 */
export function GET() {
  const url = siteConfig.url;
  const body = `# Protomation

> Protomation builds and runs AI automation for clinics in India, with education businesses as a second focus: appointment booking, reminders and follow-ups (WhatsApp, email or voice), WhatsApp and website chat, an AI voice receptionist, ad lead handling, reports on WhatsApp, and workflows connected to hospital or clinic software. An optional managed plan adds monitoring and a monthly report.

Based in Mumbai, India, working with clients worldwide. Founder: ${siteConfig.founder.name}.

## Who it is for
- IVF and fertility centres
- Dermatology and hair transplant clinics
- Dental clinics and dental chains
- Diagnostic labs
- Education businesses for adult learners: study-abroad consultancies, upskilling academies, exam coaching

## What we automate
${solutions.map((s) => `- ${s.title}: ${s.line}`).join("\n")}

## Prices (INR, excluding GST where applicable)
- ${AUDIT_NAME}: ${inr(PRICES.audit)}, credited in full against the build
- Single automation: from ${inr(PRICES.singleFrom)}, one-time
- Full clinic system: from ${inr(PRICES.systemFrom)}, one-time, one location
- Managed Plan: from ${inr(PRICES.managedFrom)} per month, optional

## Pages
- Clinics: ${url}/clinics
- Solutions: ${url}/solutions
- Education: ${url}/education
- ${AUDIT_NAME}: ${url}/audit
- Pricing: ${url}/pricing
- Security and data: ${url}/security
- Contact: ${url}/contact
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
