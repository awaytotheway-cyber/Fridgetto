/**
 * Scripted replies for the live demo chatbot. No network calls: intents are
 * matched by keyword, in order, and the first match answers.
 */

export type BotReply = { text: string; cta?: { label: string; href: string } };

const AUDIT_CTA = { label: "Book a free AI audit", href: "/contact" };

const intents: { test: RegExp; reply: BotReply }[] = [
  {
    test: /\b(price|pricing|cost|costs|how much|budget|expensive|cheap|rate)\b|\$/i,
    reply: {
      text: "Single projects start at $2,900. The Growth retainer is $4,500 a month and ships a new system every month. Larger multi-agent or app builds get a fixed quote after the free audit, so you know the number before we start.",
    },
  },
  {
    test: /\b(how (fast|long|quick|soon)|timeline|weeks?|days?|launch|go live|turnaround)\b/i,
    reply: {
      text: "Most first systems go live in two to six weeks. You get a written blueprint within a week of the audit call, and weekly demos while we build.",
    },
  },
  {
    test: /\b(book|audit|talk|human|person|meeting|contact|consult|schedule|sign ?up|get started|start)\b/i,
    reply: {
      text: "The free AI audit is a 45-minute call where we map your workflows and find the three places AI pays off fastest. No cost and no obligation.",
      cta: AUDIT_CTA,
    },
  },
  {
    test: /\b(voice|phone|calls?|receptionist|ivr)\b/i,
    reply: {
      text: "Our voice agents answer every call, qualify the caller and book them straight into your calendar, day or night. Each call is transcribed and summarized in your CRM, and anything tricky is transferred to your team.",
    },
  },
  {
    test: /\b(rag|knowledge|documents?|docs|pdfs?|search|advanced|multi.?step|tools?)\b/i,
    reply: {
      text: "Advanced agents read from your private knowledge (docs, tickets, contracts), use tools like your CRM or database, and cite where every answer came from. We test them against real questions before they go live.",
    },
  },
  {
    test: /\b(content|blogs?|seo|social|posts?|newsletters?|linkedin|instagram)\b/i,
    reply: {
      text: "Content systems turn one idea into a month of blogs, social posts and newsletters in your voice, with SEO briefs and scheduling handled. A person on your team approves everything before it goes out.",
    },
  },
  {
    test: /\b(website|web ?site|web ?app|apps?|mobile|ios|android|landing page|next\.?js|react)\b/i,
    reply: {
      text: "We design and build marketing sites, web apps and mobile apps, usually on Next.js, React Native, Supabase and Stripe. This site is one of ours.",
    },
  },
  {
    test: /\b(what|which).*(do|build|offer|make|automate|sell)\b|\b(services?|offer|capabilities|help)\b/i,
    reply: {
      text: "We build seven kinds of systems: AI agents, voice agents, website chatbots like me, custom automations, advanced RAG agents, content pipelines, and full websites and apps. Most clients start with whichever one saves the most hours.",
    },
  },
  {
    test: /\b(automat\w*|workflows?|zapier|make\.com|n8n|crm|hubspot|salesforce|invoic\w*|ops)\b/i,
    reply: {
      text: "We wire your tools together so busywork runs on its own: lead routing, CRM updates, invoicing, reporting, onboarding. Built on n8n, Make, Zapier or custom code, and monitored so you hear about problems before your customers do.",
    },
  },
  {
    test: /\b(secure|security|privacy|private|data|gdpr|hipaa|soc ?2|safe)\b/i,
    reply: {
      text: "Your data stays in your own accounts wherever possible. We use enterprise model APIs that don't train on your data, and add access controls and audit logs for regulated teams.",
    },
  },
  {
    test: /\b(chat ?bots?|bots?|assistant|are you|who are you|you real)\b/i,
    reply: {
      text: "I'm scripted for this demo. The chatbots we ship are trained on your docs, pricing and policies, capture leads, book meetings right in the chat and hand off to your team with the whole conversation attached.",
    },
  },
  {
    test: /\b(hi|hello|hey|yo|hiya|good (morning|afternoon|evening))\b/i,
    reply: {
      text: "Hi! I'm a demo of the assistants we build. Ask me what we automate, what it costs or how fast we launch.",
    },
  },
  {
    test: /\b(thanks|thank you|cheers|cool|great|awesome|nice|perfect)\b/i,
    reply: {
      text: "Anytime. If you'd like one of these working on your own site, the free audit is the place to start.",
      cta: AUDIT_CTA,
    },
  },
];

const fallback: BotReply = {
  text: "Good question. A real assistant would be trained on your business and answer that properly. In this demo, try asking what we build, what it costs or how fast we launch.",
};

export function replyTo(message: string): BotReply {
  return intents.find((intent) => intent.test.test(message))?.reply ?? fallback;
}

export const greeting =
  "Hi, I'm the Tungston demo assistant. Ask me what we build, what it costs or how fast we ship.";

export const suggestions = [
  "What can you automate?",
  "How much does it cost?",
  "How fast can you launch?",
  "Book a free audit",
];
