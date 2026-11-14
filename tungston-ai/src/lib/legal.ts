/**
 * The text of /privacy and /terms, in one place.
 *
 * Written to describe what this site actually does, not from a template: the data
 * listed is the data src/lib/lead-schema.ts, src/lib/enquiry-store.ts, /api/event and
 * src/lib/supabase/* really handle, and the commercial terms match src/content/pricing.ts.
 * Change those and change these to match.
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
const WHO = `${siteConfig.legalName}, ${siteConfig.legal.entity} based in Mumbai, India, run by ${siteConfig.founder.name}`;

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
          "When you use the \"Book a free call\" form: your name, business name, type of business, city, the range of enquiries you get, phone number, email address and whatever you write in the message. We also record that you agreed to be contacted, the exact words you agreed to and when, the page you sent the form from, and the campaign tags in the link if you arrived from an ad.",
          "When you message or call us on WhatsApp or by phone: your number and what you tell us.",
          "When you create an account: your email address, and your name if you give one. If you sign in with Google, Google passes us your name, email address and profile picture.",
        ],
      ],
    },
    {
      heading: "Why we use it",
      blocks: [
        [
          "To reply to your enquiry by phone, WhatsApp or email, as you agreed on the form, and to send you a quote.",
          "To sign you in and keep you signed in.",
          "To keep records of work we have done and been paid for.",
        ],
        "You can withdraw your agreement to be contacted at any time: reply \"stop\" on WhatsApp or email us. We do not send marketing messages unless you ask for them, and we do not sell your information to anyone.",
      ],
    },
    {
      heading: "Cookies and counting",
      blocks: [
        "This site sets cookies for one purpose: so that signing in works and you stay signed in.",
        "We count clicks on our main buttons (booking a call, WhatsApp, the demo line), uses of the calculator and form submissions, in our own database. Each count is the button's name, the page and the time. No cookies, no IP addresses and nothing that identifies you are stored with it.",
        "There is no advertising and there are no tracking pixels anywhere on this site.",
      ],
    },
    {
      heading: "Who else handles it",
      blocks: [
        "A handful of services keep this site running. Each one sees only what it needs:",
        [
          "Supabase — stores enquiries, accounts and the button counts described above.",
          "n8n — sends us a notification when you submit the form.",
          "Vercel — hosts the site and serves this page.",
          "Meta (WhatsApp) — only if you message us on WhatsApp.",
          "Google — only if you choose to sign in with a Google account.",
        ],
        "We do not share your information with anyone else, except where the law requires us to.",
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        "Enquiries that don't lead to working together: up to 12 months, then deleted.",
        "Client records: while we are working together, and afterwards for as long as we need them for tax and accounting.",
        "Accounts: until you ask us to close your account.",
        "Ask us to delete something sooner and we will, unless we are legally required to keep it.",
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        `Under India's Digital Personal Data Protection Act, 2023, you can ask us to do any of these. Email ${EMAIL} and we will:`,
        [
          "tell you what we hold about you and who we have shared it with",
          "correct anything that is wrong, or complete anything missing",
          "delete it, where we are not required to keep it",
          "stop using it, if you withdraw your consent",
          "act on the instructions of someone you nominate",
        ],
        `Grievances: ${siteConfig.founder.name} handles them personally at ${EMAIL}. We aim to reply within 30 days. If you are not satisfied with the answer, you can complain to the Data Protection Board of India.`,
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
        "We set up and run AI front desks: systems that answer calls, WhatsApp messages and website chats, qualify enquiries, book appointments and follow up, for clinics and education businesses.",
        "We offer three things: a Front-Desk Diagnostic, a Front-Desk Build and an optional Managed Front Desk plan.",
        "Prices and estimates on this site are indicative. Nothing here is a binding offer: work starts once we have both agreed the scope and the price in writing.",
      ],
    },
    {
      heading: "Money",
      blocks: [
        [
          "The Front-Desk Diagnostic is paid upfront. It is not refundable once test calls have started. Its fee is credited in full against a build that starts within 30 days of the diagnostic report.",
          "Every build has a one-time fee, fixed after the diagnostic. It is paid in two halves: half to start, and half once the pilot meets the metric we agreed in writing. Every build includes 30 days of fixes after go-live.",
          "The Managed Front Desk plan is optional. You never have to buy it to own what we built for you.",
          "AI usage, telephone calls, hosting and other third-party services are billed to your own provider accounts, not by us. You keep control of those accounts.",
          "Prices are in Indian rupees unless we agree otherwise, and exclude taxes unless we say so.",
        ],
      ],
    },
    {
      heading: "What you own",
      blocks: [
        "Once a project is complete and paid for, you own the agreed custom deliverables, and we hand over access, documentation and source code where that was in the scope.",
        "Third-party software, platforms and libraries stay subject to their own licenses. We keep the right to reuse our own general knowledge, tools and techniques on other work — that does not include anything specific to your business.",
      ],
    },
    {
      heading: "The Managed Front Desk plan",
      blocks: [
        [
          "Billed monthly, in advance.",
          "Runs month to month. Either of us can stop it with 30 days' notice; payments already made are not refunded, unless the law requires it.",
          "When it stops, we hand over everything you need to run the front desk yourself. Your systems and accounts remain yours whether or not you subscribe.",
        ],
      ],
    },
    {
      heading: "Patient and student data",
      blocks: [
        "You decide what the front desk may say and approve its answers. You are responsible for having a lawful basis to process the personal data of your patients, students or customers.",
        "We process that data only on your behalf and on your instructions, under a data processing agreement we sign before any of it is handled.",
        "The front desk must not be used to give medical advice. It is set up to pass clinical questions to your doctors.",
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
        "We test what we ship, but AI output is not a substitute for professional judgment. You are responsible for reviewing it before it is relied on, and for decisions made on the basis of it.",
        "We do not guarantee any particular business result. The missed-enquiry calculator on this site is an illustration built from the numbers you enter, not a promise.",
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
