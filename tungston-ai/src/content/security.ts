/**
 * /security copy. Only practices that are true today go on the page. Held back until
 * verified (see LAUNCH_CHECKLIST.md): data region, at-rest encryption per provider,
 * a fixed retention period and a fixed breach-notice window.
 */
import { siteConfig } from "@/site.config";

export const securityHero = {
  eyebrow: "Security & data",
  title: "How we handle your patients' data.",
  lead: "Built to support your obligations under India's DPDP Act, 2023.",
};

export const practices = [
  { title: "Callers are told", body: "Every call says it's an AI assistant and may be recorded." },
  { title: "People take over", body: "You decide when. Medical questions always go to your doctors." },
  { title: "Your accounts", body: "Phone, WhatsApp and AI accounts in your name wherever possible." },
  { title: "No AI training", body: "We never train AI on your data or your patients' data." },
  { title: "Kept as long as you choose", body: "Recordings are deleted when you say. Ask, and we delete sooner." },
  { title: "A data processing agreement", body: "Signed with every client before any patient data is handled." },
];

export const notLegalAdvice = "This page describes our practices. It isn't legal advice.";

export const dataContact = {
  text: `Questions about data? Write to ${siteConfig.founder.name} at`,
  email: siteConfig.contact.email,
  reply: `We reply ${siteConfig.contact.responseTimeShort}.`,
};
