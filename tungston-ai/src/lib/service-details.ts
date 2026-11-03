/**
 * Copy for the individual service pages at /services/<slug>. The cards on /services
 * and the home page come from `services` in content.ts; this is the longer form behind
 * each one. Every slug in `services` must have an entry here — a build-time check in
 * src/app/services/[slug]/page.tsx fails the build if one is missing.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServiceDetail = {
  /** Page title. Kept under ~60 characters so search results show all of it. */
  metaTitle: string;
  metaDescription: string;
  /** The page's own headline, longer and more specific than the card's title. */
  headline: string;
  /** The situation a visitor recognises as theirs, before any pitch. */
  problem: string[];
  /** What is actually delivered. */
  included: { title: string; body: string }[];
  /** Concrete situations where it is used, shown as its own section when present. */
  useCases?: { title: string; body: string }[];
  /** Heading for `useCases`. Defaults to "Where it's used". */
  useCasesTitle?: string;
  /** Who this suits, so the wrong visitor can rule it out quickly. */
  bestFor: string[];
  /** Tools and platforms this is usually built on. */
  stack: string[];
  /** Typical time from the audit to something running. */
  timeline: string;
  faqs: ServiceFaq[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "ai-agents": {
    metaTitle: "AI Agent Automation & Development Services",
    metaDescription:
      "AI agent automation for business: agents that qualify leads, triage tickets and keep your CRM current inside the tools you already use. Live in weeks.",
    headline: "AI agent automation that takes a task from inbox to done.",
    problem: [
      "Most teams lose their day to work that follows rules: reading an enquiry, deciding who it belongs to, copying it into the CRM, chasing the reply. None of it needs judgment, and all of it needs a person.",
      "An agent takes the whole task, not one step of it. It reads what arrived, decides what happens next, does it in the tools you already pay for, and stops to ask when something genuinely needs a human.",
    ],
    included: [
      {
        title: "A mapped workflow before any code",
        body: "We follow one real task end to end and write down every decision in it. That document is what gets built, and it is yours whether or not you carry on with us.",
      },
      {
        title: "The agent, connected to your tools",
        body: "It works inside your CRM, inbox, helpdesk and spreadsheets through their own APIs. No one changes how they work, and nothing is copied between systems by hand.",
      },
      {
        title: "A clear hand-off to a person",
        body: "You decide what the agent may settle alone and what it must escalate. Every hand-off arrives with the full history, so whoever picks it up is not starting cold.",
      },
      {
        title: "Monitoring and a month of tuning",
        body: "You see what it did and what it cost. When it gets something wrong in the first month, we correct the behaviour rather than leaving you to work around it.",
      },
    ],
    bestFor: [
      "Teams where the same enquiry gets handled the same way many times a day",
      "Sales or support work that stalls because a person has to move data between tools",
      "Anyone who has tried a no-code automation and hit the point where it needs judgment",
    ],
    stack: ["Claude and GPT", "Your CRM's API", "n8n or custom TypeScript", "Postgres or Supabase", "Slack or email for hand-offs"],
    timeline: "First agent live in two to four weeks from the audit.",
    faqs: [
      {
        question: "What happens when the agent gets something wrong?",
        answer:
          "It escalates rather than guesses. You set the line: a confidence threshold, a money value, anything touching a named account. Everything it does is logged, so a mistake is something you can see and correct, not something you discover later.",
      },
      {
        question: "Do we have to replace our CRM or helpdesk?",
        answer:
          "No. Agents work through the APIs of the tools you already use. If a tool has no API we will say so during the audit rather than after you have paid for a build.",
      },
      {
        question: "What is the difference between an AI agent and automation?",
        answer:
          "Automation follows steps you wrote in advance and stops when something unexpected arrives. An AI agent is given a goal, reads the situation, chooses the next step and uses your tools to take it. Most useful systems combine the two: automation for the predictable parts, an agent for the parts that need judgment.",
      },
      {
        question: "Who owns what you build?",
        answer:
          "You do. The code, the prompts and the workflow document are yours, and they are handed over at the end whether or not we keep working together.",
      },
    ],
  },

  "voice-agents": {
    metaTitle: "AI Voice Agents for Business",
    metaDescription:
      "AI voice agents that answer, qualify and book calls around the clock, in natural conversation and 30+ languages. Every call transcribed and logged.",
    headline: "AI voice agents that never let a call ring out.",
    problem: [
      "A missed call is rarely a message. It is usually someone who rings the next business on the list, and you never learn it happened.",
      "A voice agent picks up on the first ring, at 3 a.m. and during the lunchtime rush alike. It holds a real conversation, books into your calendar and leaves you a written summary of every call.",
    ],
    included: [
      {
        title: "A voice and script built around your calls",
        body: "We start from recordings or a conversation with whoever answers the phone today, so the agent sounds like your business rather than a phone menu.",
      },
      {
        title: "Booking straight into your calendar",
        body: "It checks real availability and writes the appointment into the system your team already looks at, instead of leaving a request for somebody to action.",
      },
      {
        title: "Interruptible, natural conversation",
        body: "Callers can cut in, change their mind and go off-script the way people do. Over 30 languages are available if your callers need them.",
      },
      {
        title: "A transcript and summary of every call",
        body: "Each call arrives as a recording, a transcript and a short summary with what was agreed, so nothing depends on somebody remembering.",
      },
    ],
    useCasesTitle: "Where AI voice agents earn their keep",
    useCases: [
      {
        title: "Clinics and practices",
        body: "Booking, rescheduling and confirming appointments straight into the practice system, so the front desk is not the bottleneck at 9 a.m.",
      },
      {
        title: "Trades and home services",
        body: "Answering while the team is on a job, sorting emergencies from quotes, and sending the urgent ones to a person immediately.",
      },
      {
        title: "Professional services",
        body: "Taking intake calls: who is calling, what they need and whether they are a fit, written up before anyone calls back.",
      },
      {
        title: "Sales teams",
        body: "Calling new web enquiries within a minute, while the interest is still warm, and booking the meeting on the call.",
      },
    ],
    bestFor: [
      "Clinics, trades and services where a missed call is a lost booking",
      "Teams whose phone volume spikes at predictable times and goes unanswered",
      "Anyone paying for an answering service that only takes messages",
    ],
    stack: ["Realtime speech models", "Twilio or your existing number", "Your booking or practice software", "Call recording and transcript storage"],
    timeline: "Answering live calls in two to four weeks, after a test period on a parallel number.",
    faqs: [
      {
        question: "Will callers know it is not a person?",
        answer:
          "Many will, and the agent says so if asked — we will not build one that claims to be human. In practice callers mind far less than people expect, as long as it answers immediately and actually books the appointment.",
      },
      {
        question: "What happens when a caller needs a real person?",
        answer:
          "It transfers them, on the same call, to whoever you nominate. You set which situations always go to a human, and those never reach the agent's own script.",
      },
      {
        question: "Do we need a new phone number?",
        answer:
          "Only for testing. We run the agent on a parallel number until you are happy with it, then point your existing number at it. Switching back takes minutes.",
      },
    ],
  },

  "website-chatbots": {
    metaTitle: "Website Chatbots Trained on Your Content",
    metaDescription:
      "A sales and support desk that never closes: trained on your docs, pricing and policies, capturing leads, booking meetings and escalating with full context.",
    headline: "The question that stops a sale, answered at midnight.",
    problem: [
      "Most people who leave your site were not uninterested. They had one question — does it do this, how much is it, do you cover my area — and nobody was there to answer it.",
      "A chatbot trained on your own material answers that question in the moment, and turns the conversation into a booked meeting or a captured lead instead of a closed tab.",
    ],
    included: [
      {
        title: "Trained on your real material",
        body: "Your documentation, pricing, policies and FAQs, not a generic model guessing. When it does not know, it says so and offers a person rather than inventing an answer.",
      },
      {
        title: "Lead capture inside the conversation",
        body: "It asks for the details you need at the point someone is interested, instead of sending them to a contact form they will not fill in.",
      },
      {
        title: "Meetings booked in the chat",
        body: "Live availability, confirmed in the conversation, written into your calendar.",
      },
      {
        title: "Escalation with the whole thread",
        body: "When it hands over, your team gets the full conversation, so nobody asks the visitor to explain themselves twice.",
      },
    ],
    bestFor: [
      "Sites where visitors ask the same handful of questions before buying",
      "Teams whose enquiry volume is highest outside working hours",
      "Businesses whose contact form is the only way to ask anything",
    ],
    stack: ["Claude or GPT", "Retrieval over your own content", "Your calendar and CRM", "A widget that drops into any site"],
    timeline: "Live on your site in one to three weeks.",
    faqs: [
      {
        question: "How do we stop it inventing answers?",
        answer:
          "It answers from your material and is built to say it does not know rather than fill the gap. We test it against the awkward questions — pricing edge cases, things you do not offer — before it goes live, and you see those results.",
      },
      {
        question: "Can it handle questions about pricing?",
        answer:
          "Yes, and you decide how far it goes. Some clients publish full pricing, others have it qualify first and hand to sales. Both are a configuration choice, not a rebuild.",
      },
      {
        question: "What does it do with a visitor who is clearly a bad fit?",
        answer:
          "Tells them early and politely. Turning away the wrong enquiry quickly is worth more than a booked call that wastes your team's morning.",
      },
    ],
  },

  "workflow-automation": {
    metaTitle: "Workflow Automation Services & Consulting",
    metaDescription:
      "Workflow automation services and consulting: we map the work, then connect your CRM, inbox and invoicing so it runs itself. Monitored and documented.",
    headline: "Workflow automation services that end the copy-and-paste.",
    problem: [
      "Every business runs on a few invisible jobs that exist only because two systems do not talk: the spreadsheet retyped into the invoicing tool, the enquiry forwarded to three inboxes, the report somebody rebuilds every Monday.",
      "Each one is small. Together they are a salary. Workflow automation takes them off your team entirely, and tells you when something needs attention.",
    ],
    included: [
      {
        title: "The workflow written down first",
        body: "Every branch and exception, agreed before anything is built. Most of the value shows up here: teams routinely find steps that no longer need to exist.",
      },
      {
        title: "Built on the right tool for the job",
        body: "n8n, Make or Zapier when they fit, custom code when they do not. We will tell you when a platform subscription is cheaper than anything we could write.",
      },
      {
        title: "Error handling that reaches a person",
        body: "Automations fail: an API changes, a file arrives malformed. Yours retries, then tells somebody, instead of failing silently for a fortnight.",
      },
      {
        title: "Documentation your team can follow",
        body: "A plain-language description of what runs, when and what to do when it stops. Not a diagram nobody opens.",
      },
    ],
    useCasesTitle: "Workflow automation by team",
    useCases: [
      {
        title: "Sales and CRM",
        body: "New leads are enriched, scored, assigned and logged the moment they arrive, and follow-ups go out without anyone remembering to send them.",
      },
      {
        title: "Finance and invoicing",
        body: "Orders become invoices, payments are matched to them and the month-end report assembles itself from the same data.",
      },
      {
        title: "HR and onboarding",
        body: "A signed offer starts the accounts, the equipment request, the welcome email and the checklist, each with an owner.",
      },
      {
        title: "Customer support",
        body: "Tickets are sorted, routed and answered where the answer is routine, with the rest passed on carrying the full history.",
      },
      {
        title: "Operations and reporting",
        body: "Data moves between your systems on a schedule, and the weekly numbers arrive in the inbox instead of being rebuilt by hand.",
      },
    ],
    bestFor: [
      "Operations work that happens on a schedule and never changes",
      "Teams holding two systems together with a spreadsheet",
      "Anyone whose month-end involves rebuilding the same report",
    ],
    stack: ["n8n, Make or Zapier", "Custom TypeScript or Python", "Your CRM, accounting and storage APIs", "Alerting to Slack or email"],
    timeline: "Most single workflows run live within one to three weeks.",
    faqs: [
      {
        question: "What is workflow automation?",
        answer:
          "Workflow automation is software that carries out the repeatable steps of a business process on its own: moving information between your tools, applying the rules you would apply and flagging the cases that need a person. It replaces copy-and-paste and manual hand-offs, not the judgment behind them.",
      },
      {
        question: "How much do workflow automation services cost?",
        answer:
          "It depends on how many systems a workflow touches and how many exceptions it has, so we scope it before quoting. The audit is free, and it ends with a written plan and a fixed price rather than an hourly estimate.",
      },
      {
        question: "What if one of our tools has no integration?",
        answer:
          "Most have an API even without an off-the-shelf connector, and we build against it. Where there is genuinely no way in, we say so during the audit: that is a reason to hear it before you pay for a build.",
      },
      {
        question: "Who fixes it when it breaks?",
        answer:
          "We do during the tuning period, and after that it is your call. Everything is documented and handed over, so your own team or another developer can maintain it. Nothing is locked to us.",
      },
      {
        question: "Is this worth it for a small team?",
        answer:
          "Often more so, because there is no spare person to absorb the work. The audit is free, and if the honest answer is that a cheaper tool solves it, you will hear that.",
      },
    ],
  },

  "advanced-agents": {
    metaTitle: "RAG & Multi-Step AI Agents",
    metaDescription:
      "Multi-step agents that plan, use tools and cite their sources: retrieval over your private knowledge, evaluations and guardrails before anything goes live.",
    headline: "Answers from your own knowledge, with the receipts.",
    problem: [
      "A general model knows nothing about your contracts, your policies or last quarter's numbers. Asked anyway, it will produce something plausible and wrong, which is worse than no answer at all.",
      "A retrieval agent searches your own material, reads what it finds, plans several steps and shows you the source for every claim. When your documents do not answer the question, it tells you so.",
    ],
    included: [
      {
        title: "Your knowledge, indexed properly",
        body: "Documents, tickets, wikis and databases, chunked and embedded so retrieval returns the right passage rather than a vaguely related page.",
      },
      {
        title: "Citations on every answer",
        body: "Each claim links to the document and passage behind it. An answer nobody can check is not usable for work that matters.",
      },
      {
        title: "Tool use across your systems",
        body: "The agent queries APIs, reads databases and browses where it needs to, several steps deep, instead of answering from whatever it was handed.",
      },
      {
        title: "An evaluation set before launch",
        body: "We build a set of real questions with known answers and measure against it. You see the score before it goes anywhere near your team.",
      },
    ],
    bestFor: [
      "Teams answering questions that live in hundreds of documents",
      "Regulated work where an answer has to be traceable to a source",
      "Anyone whose first retrieval attempt returned confident nonsense",
    ],
    stack: ["Claude and GPT", "Vector search over Postgres or a dedicated store", "Your document and ticket systems", "Evaluation harness and guardrails"],
    timeline: "Four to eight weeks, depending on how much material has to be indexed.",
    faqs: [
      {
        question: "Does our data get used to train a model?",
        answer:
          "No. Your material is retrieved at the moment of a question and passed in as context. We use providers whose business terms exclude training on your data, and that is written into what we hand over.",
      },
      {
        question: "How do we know the answers are right?",
        answer:
          "By the evaluation set, which is built from your questions and your known answers. It is the deliverable that tells you whether this works, and you keep it, so you can re-run it after any change.",
      },
      {
        question: "What if our documents contradict each other?",
        answer:
          "The agent surfaces the conflict and cites both rather than silently picking one. Clients regularly find out this way that two policy documents disagree.",
      },
    ],
  },

  "content-automation": {
    metaTitle: "AI Content Automation Systems",
    metaDescription:
      "One idea in, a month of on-brand content out: blogs, social posts and newsletters in your voice, with SEO briefs, internal links and a human review step.",
    headline: "One idea in. A month of content out.",
    problem: [
      "Publishing consistently is not hard because writing is hard. It is hard because it needs someone to decide the topic, write it, adapt it for four channels and schedule it, every week, forever.",
      "A content system takes one idea and produces the month: the article, the posts, the newsletter — in your voice, with a person approving everything before it goes out.",
    ],
    included: [
      {
        title: "A voice guide built from your own writing",
        body: "We take what you have already published and turn it into a style the system follows, so output sounds like you rather than like a model.",
      },
      {
        title: "One idea adapted across channels",
        body: "An article becomes posts, a newsletter and a script, each written for its channel instead of the same text pasted everywhere.",
      },
      {
        title: "SEO briefs and internal linking",
        body: "Keyword and structure briefs before drafting, and links to your existing pages, so the archive compounds rather than sitting there.",
      },
      {
        title: "A human review step, always",
        body: "Nothing publishes unreviewed. The system drafts and schedules; a person approves. That step is deliberate and we will not remove it.",
      },
    ],
    bestFor: [
      "Teams who publish in bursts and then go quiet for a month",
      "Founders who are the only person who can write in the company's voice",
      "Anyone paying for content that reads like everyone else's",
    ],
    stack: ["Claude and GPT", "Your CMS and scheduler", "Keyword and SERP data", "An approval queue in Slack or email"],
    timeline: "Producing its first month of drafts within two to three weeks.",
    faqs: [
      {
        question: "Will this sound like AI wrote it?",
        answer:
          "That depends on the voice guide, which is why we build it from your existing writing rather than a prompt. It will not win awards unedited — that is what the review step is for. It removes the blank page, not the editor.",
      },
      {
        question: "Does AI-written content hurt our search ranking?",
        answer:
          "Unhelpful content does, whoever wrote it. The briefs, the internal linking and the human review exist to keep what you publish worth reading. We would not advise publishing the raw output of any system, ours included.",
      },
      {
        question: "Can it work from our existing content calendar?",
        answer:
          "Yes. If you already know what you want to say, the system starts from your calendar instead of suggesting topics.",
      },
    ],
  },

  "web-and-app": {
    metaTitle: "Websites & Landing Pages Built to Convert",
    metaDescription:
      "Fast, modern marketing sites and high-converting landing pages built on Next.js and Tailwind, with AI chat and lead capture built in from day one.",
    headline: "A site that sells while you sleep.",
    problem: [
      "Plenty of sites look fine and still convert badly: they load slowly on a phone, bury the one thing a visitor came for, and leave a contact form as the only way to get in touch.",
      "We build the site and the thing that catches the lead — chat, capture and booking — as one piece of work, so an interested visitor never reaches a dead end.",
    ],
    included: [
      {
        title: "Built for speed on a phone",
        body: "Most of your visitors are on mobile data. Pages are rendered ahead of time and images sized properly, because a slow page loses people before anything else can.",
      },
      {
        title: "Lead capture that is part of the page",
        body: "Chat, forms and booking wired into your CRM or inbox from the start, not a plugin added after launch.",
      },
      {
        title: "Technical SEO done properly",
        body: "Metadata, structured data, sitemap and canonical URLs set up correctly, so your pages can be found and shown the way you intend.",
      },
      {
        title: "A site your team can edit",
        body: "Copy lives in one place and is handed over with instructions. Changing a headline should not need a developer.",
      },
    ],
    bestFor: [
      "Businesses whose site predates how they now sell",
      "Campaigns that need a landing page that actually converts",
      "Teams who want chat and automation built in rather than bolted on",
    ],
    stack: ["Next.js and React", "Tailwind CSS", "Supabase or your CMS", "Vercel hosting", "Analytics and structured data"],
    timeline: "Landing pages in one to two weeks; full marketing sites in three to six.",
    faqs: [
      {
        question: "Do we have to move our hosting?",
        answer:
          "Usually we recommend Vercel because it is what the stack is built for, but we deploy where you need. Your domain stays yours either way.",
      },
      {
        question: "Can you work with our existing brand?",
        answer:
          "Yes. If you have a brand, we build to it. If you do not, we will make the design decisions and show you why.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You get the code, the hosting setup and documentation. Many clients keep us on for changes, but the site runs perfectly well without us, which is the point.",
      },
    ],
  },
};
