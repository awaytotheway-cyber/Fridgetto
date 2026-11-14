import { inr } from "@/lib/pricing";
import { PRICES } from "@/content/pricing";
import { siteConfig } from "@/site.config";

/**
 * A plain-language summary for AI assistants and search tools (COPY.md §15).
 * Nothing here reads request data, so it is prerendered at build time.
 */
export function GET() {
  const url = siteConfig.url;
  const body = `# Protomation

> Protomation installs and runs AI front desks for high-ticket clinics in India, with education businesses as a second focus. Every call, missed call and WhatsApp enquiry is answered in Hindi, Marathi or English, qualified, booked into the clinic's calendar and followed up. An optional managed plan adds monitoring and a monthly report on consultations booked.

Based in Mumbai, India, working with clients worldwide. Founder: ${siteConfig.founder.name}.

## Who it is for
- IVF and fertility centres
- Dermatology and hair transplant clinics
- Dental implant and aligner clinics, and dental chains
- Diagnostic labs with home sample collection
- Education businesses for adult learners: study-abroad consultancies, upskilling academies, professional-exam coaching

## Prices (INR, excluding GST where applicable)
- Front-Desk Diagnostic: ${inr(PRICES.diagnostic)}, credited in full against the build
- Front-Desk Build: from ${inr(PRICES.buildFrom)}, one-time, single location
- Managed Front Desk: from ${inr(PRICES.managedFrom)} per month, optional

## Pages
- Clinics: ${url}/clinics
- Education: ${url}/education
- How it works: ${url}/how-it-works
- Front-Desk Diagnostic: ${url}/diagnostic
- Pricing: ${url}/pricing
- Security and data: ${url}/security
- Contact: ${url}/contact
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
