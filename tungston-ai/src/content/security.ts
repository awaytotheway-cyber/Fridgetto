/**
 * /security copy (COPY.md §8). Only practices that are true today go on the page.
 * Held back until they're verified (see LAUNCH_CHECKLIST.md): where data is stored
 * (region), at-rest encryption per provider, a fixed retention period and a fixed
 * breach-notice window.
 */
import { siteConfig } from "@/site.config";

export const securityHero = {
  eyebrow: "Security & data",
  title: "How we handle your patients' data.",
  lead: "Plain answers about who can see it, what callers are told, and what happens if something goes wrong. Built to support your obligations under India's DPDP Act, 2023.",
};

export const practices = [
  {
    title: "Callers are told",
    body: "Every call starts by saying the caller is speaking with an AI assistant and that the call may be recorded. Callers can ask for a person at any point.",
  },
  {
    title: "People take over when it matters",
    body: "You decide when a person takes over. Anything medical goes to your doctors, never to the front desk.",
  },
  {
    title: "Your accounts, your data",
    body: "Your phone number, WhatsApp Business account and AI provider accounts are set up in your name wherever possible. Enquiries, recordings and reports belong to your clinic.",
  },
  {
    title: "Access you control",
    body: "Only the people who build and run your front desk can reach it, and because the accounts are yours, you can remove our access at any time.",
  },
  {
    title: "No training on your data",
    body: "We don't use your data or your patients' data to train AI models.",
  },
  {
    title: "Encrypted in transit",
    body: "Everything moves over encrypted connections (HTTPS), between your channels, our systems and the providers we use.",
  },
  {
    title: "Kept only as long as you choose",
    body: "You decide how long call recordings and transcripts are kept, and we set deletion up to match. Ask us to delete something sooner and we will.",
  },
  {
    title: "A data processing agreement",
    body: "We sign a data processing agreement with every client before any patient data is handled. It sets out what we process, why, and on whose instructions.",
  },
  {
    title: "If something goes wrong",
    body: "If we find a breach affecting your data, we tell you promptly, with what we know, so you can meet your own reporting duties.",
  },
];

export const notLegalAdvice =
  "This page describes our practices. It isn't legal advice: your obligations under the DPDP Act depend on your clinic, so check them with your adviser.";

export const dataContact = {
  text: `Questions about data? Write to ${siteConfig.founder.name} at`,
  email: siteConfig.contact.email,
  reply: `We reply ${siteConfig.contact.responseTimeShort}.`,
};
