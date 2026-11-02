import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const whatsappAutomation: ServiceDetail = {
  ...catalogEntry("whatsapp-automation"),
  seo: {
    title: "WhatsApp Automation for Business, 24/7 Replies",
    description:
      "Automate your business WhatsApp: instant AI replies, bookings, order updates and payment links, day and night. See the hours and money you'd save.",
    keywords: [
      "WhatsApp automation for business",
      "WhatsApp Business API automation",
      "WhatsApp chatbot India",
      "WhatsApp AI assistant",
      "automated WhatsApp replies",
    ],
  },
  hero: {
    eyebrow: "WhatsApp Automation",
    title: "Answer every WhatsApp message in seconds, even at 2 a.m.",
    lede: "Your customers already message you on WhatsApp. We set up an AI assistant on your business number that replies instantly, books appointments, shares prices and sends payment links, then hands the chat to your team whenever a person is needed.",
    live: {
      variant: "chat",
      title: "WhatsApp · Your store",
      tool: "whatsapp",
      items: [
        { from: "them", label: "Hi, do you have the black sneakers in size 9?", meta: "11:42 pm" },
        { from: "us", label: "Yes! 4 pairs left in size 9. Shall I keep one for you?", meta: "11:42 pm" },
        { from: "them", label: "Yes please. Can I pay online?", meta: "11:43 pm" },
        { from: "us", label: "Done. Here's your secure payment link. Delivery by Thursday.", meta: "11:43 pm" },
      ],
    },
  },
  highlight: { value: "Under 60s", label: "reply time, day or night" },
  whatIs: {
    question: "What is WhatsApp automation?",
    body: [
      "WhatsApp automation means a smart assistant answers your business WhatsApp for you. It reads each message, understands what the customer wants and replies in seconds, in their language, using your own prices, stock, timings and policies.",
      "It takes over the routine work your team does on WhatsApp today: answering the same questions, booking slots, sending order updates, reminders and payment links. When a chat needs a human, it passes it to the right person with the whole conversation, so the customer never has to repeat themselves.",
    ],
    before: [
      "Messages pile up after office hours",
      "The same questions answered 50 times a day",
      "Leads go cold while they wait for a reply",
      "Order updates typed out one by one",
    ],
    after: [
      "Every message answered within a minute, 24/7",
      "Common questions handled on their own",
      "Ready buyers booked straight into your calendar",
      "Updates, reminders and payment links sent automatically",
    ],
  },
  benefits: [
    {
      title: "Never miss a customer",
      body: "Replies go out in seconds at night, on Sundays and through the festival rush, so enquiries stop slipping away to competitors.",
    },
    {
      title: "Your team gets hours back",
      body: "Repeat questions, follow-ups and status updates are handled for them, so their day goes on sales and service that needs a person.",
    },
    {
      title: "More bookings and orders",
      body: "The assistant doesn't just answer. It suggests products, books slots and sends payment links while the customer is still interested.",
    },
    {
      title: "Every chat on record",
      body: "Conversations, leads and orders are saved to your CRM or Google Sheet, so nothing lives only on one person's phone.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We look at the WhatsApp messages you get today and pick the conversations worth automating first.",
    },
    {
      title: "Set up your business number",
      when: "Week 1",
      body: "We connect your number to the official WhatsApp Business Platform and get it verified, so messages show your brand name.",
    },
    {
      title: "Teach it your business",
      when: "Weeks 1–2",
      body: "We load your prices, products, FAQs and policies and write the replies in your tone. You read them and approve.",
    },
    {
      title: "Connect your tools",
      when: "Week 2",
      body: "We link it to your CRM, calendar, store or payment gateway, so it can book, check stock and take payments.",
    },
    {
      title: "Go live and keep improving",
      when: "Week 3 onwards",
      body: "We launch, watch real chats closely for the first weeks and keep tuning, so more chats are handled from start to finish.",
    },
  ],
  flow: [
    { label: "Customer sends a message", tool: "whatsapp" },
    { label: "AI understands the request" },
    { label: "Replies, books or sends a payment link", tool: "razorpay" },
    { label: "Lead saved to your CRM", tool: "zoho" },
    { label: "Your team alerted when needed", tool: "gmail" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your customers",
      "Access to your WhatsApp Business account",
      "Your price list, FAQs and policies",
      "15 minutes to approve the replies",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "WhatsApp Business Platform setup and verification",
    "Writing and training the assistant's replies",
    "Connecting your CRM, calendar and payments",
    "Testing on real conversations",
    "Monitoring and monthly improvements",
  ],
  youGet: [
    "A verified WhatsApp business number that replies 24/7",
    "An AI assistant trained on your products and policies",
    "Automatic bookings, order updates and payment links",
    "Every chat and lead saved to your CRM or sheet",
    "A monthly report: chats handled, leads won, hours saved",
  ],
  timeline: "Live in 2–3 weeks",
  savings: {
    volume: { label: "WhatsApp chats a month", unit: "chats", min: 100, max: 50000, step: 100, value: 3000 },
    minutes: { label: "Minutes your team spends on each chat", unit: "min", min: 1, max: 15, step: 1, value: 4 },
    automatedShare: 0.7,
    assumptions: [
      "The assistant fully handles about 7 in 10 chats; the rest go to your team with the conversation attached.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra sales that come from faster replies, so the real return is usually higher.",
    ],
  },
  useCases: [
    {
      title: "Retail and online stores",
      body: "Answer stock and size questions, share product photos, take orders and send delivery updates without anyone typing.",
      photo: photos.shopOwner,
    },
    {
      title: "Clinics and diagnostic centres",
      body: "Book, confirm and reschedule appointments, send reminders the day before and share reports on WhatsApp.",
      photo: photos.clinicReception,
    },
    {
      title: "Restaurants and cafés",
      body: "Take table bookings and takeaway orders, share the menu and confirm payment in the same chat.",
      photo: photos.cafeOwner,
    },
    {
      title: "Real estate",
      body: "Reply to property enquiries with prices, photos and locations, and book site visits for your agents.",
    },
    {
      title: "Coaching and education",
      body: "Answer fee and batch questions, collect admission details and send class reminders to students and parents.",
    },
    {
      title: "Distributors and wholesalers",
      body: "Let dealers check stock, place repeat orders and get invoice copies at any time of day.",
    },
  ],
  tools: ["whatsapp", "meta", "razorpay", "shopify", "zoho", "hubspot", "googlesheets", "n8n"],
  faqs: [
    {
      q: "Is this the official WhatsApp, or a workaround?",
      a: "It is the official WhatsApp Business Platform from Meta. Your number is verified, messages show your brand name, and there is no risk of the number being banned for using unofficial tools.",
    },
    {
      q: "Can my team still reply to customers themselves?",
      a: "Yes. Your team sees every chat in a shared inbox and can step in at any time. The assistant also hands over on its own when a customer asks for a person or a question needs a decision.",
    },
    {
      q: "Will it reply in Hindi and other languages?",
      a: "Yes. It replies in the language the customer writes in, including Hindi, Hinglish, Marathi, Tamil, Arabic, Spanish and many more.",
    },
    {
      q: "Can I keep my current business number?",
      a: "Usually, yes. Your number moves from the WhatsApp Business app to the platform, or we set up a new one if you'd rather keep the app on your current number. We help you choose during the audit.",
    },
    {
      q: "What does it cost to run?",
      a: "We scope it after a free audit, so you pay only for what your business needs. Meta also charges a small fee per conversation, which we explain up front with your expected volume.",
    },
    {
      q: "How soon can it go live?",
      a: "Most businesses are live in two to three weeks. Meta's verification usually takes a few days, and we build the assistant while we wait.",
    },
  ],
  related: ["ai-website-chatbots", "crm-lead-automation", "speed-to-lead-agent"],
};
