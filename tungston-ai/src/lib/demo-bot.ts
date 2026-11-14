/**
 * Scripted replies for the demo chat: the front desk of "Protomation Demo Clinic", a
 * clinic made up for the demo (COPY.md §13). No network calls: intents are matched by
 * keyword, in order, and the first match answers. Every clinic detail here is invented
 * and says so, so nobody mistakes it for a real clinic.
 */
import { PRICES } from "@/content/pricing";

export type BotReply = {
  text: string;
  cta?: { label: string; href: string };
  /** Quick replies to offer next, in place of the standing suggestions. */
  chips?: string[];
};

const inr = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;
const SLOTS = ["Tomorrow at 11am", "Tomorrow at 5:30pm", "Saturday at 10am"];

const intents: { test: RegExp; reply: BotReply }[] = [
  {
    // A slot picked after the booking prompt (or typed straight away)
    test: /\b(11 ?am|5[:.]30|saturday at 10|sat(urday)? 10 ?am)/i,
    reply: {
      text: "Done. You're booked with Dr Demo. In a real setup you'd now get a WhatsApp confirmation and a reminder the day before, and the booking would already be in the clinic's calendar.",
    },
  },
  {
    test: /[ऀ-ॿ]|\bhindi\b/i,
    reply: { text: "हाँ, हिंदी में भी बात हो सकती है। आप क्या जानना चाहेंगे? (Yes, we can talk in Hindi too. What would you like to know?)" },
  },
  {
    test: /\b(protomation|your (price|pricing|cost)|for this|build (one|this)|for my clinic)\b/i,
    reply: {
      text: `Protomation's own prices: a Front-Desk Diagnostic is ${inr(PRICES.diagnostic)} (credited against the build), builds start at ${inr(PRICES.buildFrom)}, and the optional Managed Front Desk starts at ${inr(PRICES.managedFrom)} a month.`,
      cta: { label: "See pricing", href: "/pricing" },
    },
  },
  {
    test: /\b(medicine|medication|dose|dosage|pain|symptoms?|reports?|results?|is it safe|side effects?|bleeding)\b/i,
    reply: {
      text: "I can't give medical advice, but our doctor can. Shall I book you a consultation, or ask the clinic to call you back?",
      chips: ["Book a consultation", "Please call me back"],
    },
  },
  {
    test: /\b(fee|fees|cost|costs|price|prices|charges?|how much|expensive|emi)\b/i,
    reply: {
      text: "A first consultation is ₹800 (a made-up demo fee). Treatment costs depend on what the doctor recommends, so we'd book you a consult first. Shall I find you a slot?",
      chips: ["Book a consultation"],
    },
  },
  {
    test: /\b(ivf|fertility|pregnan\w*|conceiv\w*|iui)\b/i,
    reply: {
      text: "We'd be glad to help. A first consultation with our fertility specialist takes about 45 minutes, and it helps if both partners can come. Shall I book one?",
      chips: ["Book a consultation"],
    },
  },
  {
    test: /\b(book|appointment|consult\w*|slot|visit|schedule)\b/i,
    reply: {
      text: "Happy to help. Which suits you: tomorrow at 11am, tomorrow at 5:30pm, or Saturday at 10am? (Demo only: nothing is really booked.)",
      chips: SLOTS,
    },
  },
  {
    test: /\b(timings?|open|hours|close|closing|sunday|today)\b/i,
    reply: {
      text: "We're open Monday to Saturday, 9am to 8pm, and Sunday 10am to 2pm. (Made-up timings for this demo clinic.)",
    },
  },
  {
    test: /\b(where|address|location|directions?|parking)\b/i,
    reply: { text: "We're at 1 Demo Road, Andheri West, Mumbai. That address is made up: this is a demo clinic." },
  },
  {
    test: /\b(human|person|staff|doctor|someone|call me|call back|callback|talk to)\b/i,
    reply: {
      text: "Of course. In a real clinic I'd pass this conversation to the front desk now, with everything you've told me, so you don't have to repeat yourself.",
    },
  },
  {
    test: /\b(are you|ai|bot|robot|real|what is this|who are you)\b/i,
    reply: {
      text: "I'm a demo AI front desk built by Protomation. A real one answers a clinic's calls, WhatsApp and website chat like this, from the clinic's own approved answers.",
    },
  },
  {
    test: /\b(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/i,
    reply: { text: "Hello! How can I help you today? I can share timings and fees, or book a consultation." },
  },
  {
    test: /\b(thanks|thank you|ok|okay|great|perfect)\b/i,
    reply: {
      text: "You're welcome. Want one of these answering your own clinic's enquiries?",
      cta: { label: "Book a free 20-min call", href: "/contact" },
    },
  },
];

const fallback: BotReply = {
  text: "I'm a short demo, so I only know the basics: timings, fees, location and booking. A real front desk knows everything your clinic approves. Try \"book a consultation\".",
  chips: ["Book a consultation"],
};

export function replyTo(message: string): BotReply {
  return intents.find((intent) => intent.test.test(message))?.reply ?? fallback;
}

export const greeting =
  "Hi, I'm the front desk for Protomation Demo Clinic, a made-up clinic for this demo. I can share timings and fees, and book a consultation. What would you like to know?";

export const suggestions = [
  "What are your timings?",
  "How much is a consultation?",
  "Book a consultation",
  "Can I speak to a doctor?",
];
