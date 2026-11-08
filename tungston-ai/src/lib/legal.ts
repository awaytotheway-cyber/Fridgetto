/**
 * The text of /privacy and /terms, in one place.
 *
 * Written to describe what this site actually does, not from a template: the data
 * listed is the data src/lib/enquiry-store.ts, src/lib/supabase/* and the Razorpay /
 * Stripe routes really handle, and the commercial terms match the house rules in
 * src/lib/pricing.ts and src/lib/care-plan.ts. Change those and change these to match.
 *
 * Entity, jurisdiction and the "last updated" date come from siteConfig.legal.
 *
 * This is a plain-English draft, not legal advice. Have a lawyer read it before you
 * rely on it — particularly the liability cap and the ownership clause.
 */

import { siteConfig } from "@/site.config";

/** A paragraph, or a list of bullet points. */
export type Block = string | string[];

export type LegalSection = {
  heading: string;
  blocks: Block[];
};

export type LegalDoc = {
  /** Shown under the page title. */
  summary: string;
  sections: LegalSection[];
};

const EMAIL = siteConfig.contact.email;
const WHO = `${siteConfig.legalName}, ${siteConfig.legal.entity} based in India`;

/** "the courts of Pune, India", or just "the courts of India" until a city is set. */
const COURTS = siteConfig.legal.jurisdictionCity
  ? `the courts of ${siteConfig.legal.jurisdictionCity}, India`
  : "the courts of India";

export const privacyPolicy: LegalDoc = {
  summary:
    "What we collect, why we collect it, and what you can ask us to do about it. No jargon, because you should not need a lawyer to read a privacy policy.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        `This site is run by ${WHO}. When this policy says "we", that is who it means.`,
        `If you want anything on this page explained, or you want to make a request or a complaint, email ${EMAIL}.`,
      ],
    },
    {
      heading: "What we collect",
      blocks: [
        "Only what you give us. We do not buy information about you, and we do not follow you around the internet.",
        [
          "When you use the contact or quote form: your name, email address, phone number, business name, the service you picked and whatever you write in the message.",
          "When you create an account: your email address, and your name if you give one. If you sign in with Google, Google passes us your name, email address and profile picture.",
          "When you subscribe to the Care Plan: your name, email address, phone number and business name, plus the subscription's status and a reference number from the payment provider.",
        ],
        "We never see or store your card details. Razorpay and Stripe take the payment and tell us only whether it worked.",
      ],
    },
    {
      heading: "Why we use it",
      blocks: [
        [
          "To reply to your enquiry and send you a quote.",
          "To sign you in and keep you signed in.",
          "To run and bill your Care Plan subscription.",
          "To keep records of work we have done and been paid for.",
        ],
        "We do not send marketing email unless you ask for it, and we do not sell your information to anyone.",
      ],
    },
    {
      heading: "Cookies",
      blocks: [
        "This site sets cookies for one purpose: so that signing in works and you stay signed in.",
        "There is no analytics, no advertising and no tracking pixels anywhere on this site. Nobody is measuring which pages you read.",
      ],
    },
    {
      heading: "Who else handles it",
      blocks: [
        "A handful of services keep this site running. Each one sees only what it needs:",
        [
          "Supabase — stores enquiries, accounts and subscription records.",
          "n8n — delivers your enquiry to our inbox as an email.",
          "Razorpay and Stripe — take Care Plan payments.",
          "Vercel — hosts the site and serves this page.",
          "Google — only if you choose to sign in with a Google account.",
        ],
        "We do not share your information with anyone else, except where the law requires us to.",
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        "Enquiries and client records: while we are working together, and afterwards for as long as we need them for tax and accounting.",
        "Accounts and subscription records: until you ask us to close your account.",
        "Ask us to delete something sooner and we will, unless we are legally required to keep it.",
      ],
    },
    {
      heading: "What you can ask us to do",
      blocks: [
        `Email ${EMAIL} and we will:`,
        [
          "tell you what we hold about you",
          "correct anything that is wrong",
          "send you a copy of it",
          "delete it, where we are not required to keep it",
        ],
        "We aim to reply within 30 days. If you are unhappy with how we handled your request, say so in the same email thread and it will be looked at again.",
      ],
    },
    {
      heading: "Children",
      blocks: [
        "This site is for businesses. It is not intended for anyone under 18, and we do not knowingly collect information about children.",
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        "If this policy changes, the date at the top changes with it. If we change something that materially affects how we use your information, we will email account holders rather than quietly update the page.",
      ],
    },
  ],
};

export const termsOfService: LegalDoc = {
  summary:
    "The agreement between you and us: what we build, what it costs, who owns it afterwards, and the limits of what we promise.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        `This site is run by ${WHO}. By using it, or by engaging us for work, you agree to these terms.`,
      ],
    },
    {
      heading: "What we do",
      blocks: [
        "We build AI agents, voice agents, website chatbots, workflow automations, content systems, websites and apps.",
        "Prices and estimates on this site are indicative. Nothing here is a binding offer: a project starts once we have both agreed the scope and the price in writing.",
      ],
    },
    {
      heading: "Money",
      blocks: [
        [
          "Every project has a one-time implementation fee, agreed before work starts.",
          "Ongoing maintenance is optional. You never have to buy it to own what we built for you.",
          "AI usage, telephone calls, hosting and other third-party services are billed to your own provider accounts, not by us. You keep control of those accounts.",
          "Prices are in Indian rupees unless we agree otherwise, and exclude taxes unless we say so.",
        ],
      ],
    },
    {
      heading: "What you own",
      blocks: [
        "Once a project is complete and paid for, you own the agreed custom deliverables, and we hand over access, documentation and source code where that was in the scope.",
        "Third-party software, platforms and libraries stay subject to their own licences. We keep the right to reuse our own general knowledge, tools and techniques on other work — that does not include anything specific to your business.",
      ],
    },
    {
      heading: "The Care Plan",
      blocks: [
        [
          "Billed monthly or yearly, in advance, and renews automatically until you cancel.",
          "Cancel any time. The plan runs to the end of the period you have paid for and then simply does not renew.",
          "Payments already made are not refunded, unless the law requires it.",
          "The subscriber discount on new work applies only while the plan is active.",
          "Your systems remain yours whether or not you subscribe.",
        ],
      ],
    },
    {
      heading: "Your account",
      blocks: [
        "Keep your sign-in details to yourself. You are responsible for what happens under your account, so tell us promptly if you think someone else has got into it.",
      ],
    },
    {
      heading: "Using this site fairly",
      blocks: [
        "Please do not break the law with it, try to break into it, scrape it hard enough to degrade it for other people, or copy its content and design for your own site.",
      ],
    },
    {
      heading: "About AI output",
      blocks: [
        "Worth saying plainly, since it is what we build: AI models can be wrong, and they can be confidently wrong.",
        "We test what we ship, but AI output is not a substitute for professional judgement. You are responsible for reviewing it before it is relied on, and for decisions made on the basis of it.",
        "We do not guarantee any particular business result. The savings estimator on our home page is an illustration built from typical figures, not a promise.",
      ],
    },
    {
      heading: "Limits of our responsibility",
      blocks: [
        "We do our work carefully, but we cannot take on unlimited risk for a fixed fee.",
        "So far as the law allows, we are not liable for lost profits, lost revenue, lost data or indirect losses, and our total liability for any claim is limited to the amount you paid us for the work that claim relates to in the twelve months before it arose.",
        "Nothing here limits liability that cannot legally be limited.",
      ],
    },
    {
      heading: "Ending things",
      blocks: [
        "Either of us can end an ongoing arrangement by giving the other reasonable notice. Work already done is payable.",
        "We may suspend or close an account that breaks these terms.",
      ],
    },
    {
      heading: "Changes to these terms",
      blocks: [
        "If these terms change, the date at the top changes with it. Work already agreed runs on the terms that applied when we agreed it.",
      ],
    },
    {
      heading: "Which law applies",
      blocks: [`These terms are governed by the laws of India, and disputes go to ${COURTS}.`],
    },
  ],
};
