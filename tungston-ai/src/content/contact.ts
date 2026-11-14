/** /contact copy (COPY.md §11). Form labels and messages live with the form and lib/lead-schema.ts. */
import { siteConfig } from "@/site.config";

export const contactHero = {
  title: "Book a free 20-minute call.",
  lead: `Tell us a little about your clinic or institute. We reply ${siteConfig.contact.responseTime} to fix a time that suits you.`,
};

export const onTheCall = {
  title: "What happens on the call",
  body: "20 minutes, no slides. We'll ask how enquiries reach you today, where they go unanswered and what a booked consult is worth to you. You'll leave knowing whether an AI front desk makes sense for your clinic, and if it does, whether to start with a diagnostic.",
};
