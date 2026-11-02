import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const aiWebsiteChatbots: ServiceDetail = {
  ...catalogEntry("ai-website-chatbots"),
  seo: {
    title: "AI Chatbot for Your Website, Trained on You",
    description:
      "An AI chatbot for your website that answers questions, captures leads and books meetings 24/7, trained on your own content. See the hours you'd save.",
    keywords: [
      "AI chatbot for website",
      "website chatbot development",
      "AI customer support chatbot",
      "lead generation chatbot",
      "chatbot for business India",
    ],
  },
  hero: {
    eyebrow: "AI Website Chatbots",
    title: "A sales and support desk on your website that never closes.",
    lede: "Visitors ask questions at all hours. An AI chatbot trained on your website, prices and policies answers them in seconds, captures their details, books meetings and hands warm leads to your team with the full conversation.",
    live: {
      variant: "chat",
      title: "Chat · yourbusiness.com",
      items: [
        { from: "them", label: "Do you deliver to Pune, and how long does it take?" },
        { from: "us", label: "Yes! Pune orders arrive in 2–3 days, and delivery is free on this order." },
        { from: "them", label: "Great. Can someone help me choose a plan?" },
        { from: "us", label: "Of course. I've booked a 15-minute call with our team for tomorrow at 11 a.m." },
      ],
    },
  },
  highlight: { value: "Under 5s", label: "first reply on your site" },
  whatIs: {
    question: "What is an AI website chatbot?",
    body: [
      "An AI website chatbot is a chat window on your site that understands questions in everyday language and answers them from your own content: your pages, product details, FAQs, prices and policies. It doesn't follow a fixed script, so visitors can ask anything the way they'd ask a person.",
      "When a visitor is ready to buy or needs help, it collects their details, books a call or opens a support ticket, and sends everything to your team. It stays within what you've taught it and says so when it doesn't know, instead of making things up.",
    ],
    before: [
      "Visitors leave when nobody answers",
      "The same questions emailed again and again",
      "Leads arrive with no context",
      "The support queue grows overnight",
    ],
    after: [
      "Instant answers on every page, 24/7",
      "Common questions answered before they become emails",
      "Leads arrive with name, need and budget",
      "Your team starts the day with only the cases that need them",
    ],
  },
  benefits: [
    {
      title: "More leads, same traffic",
      body: "Visitors who would have left get answers and leave their details, so more of your existing traffic turns into enquiries.",
    },
    {
      title: "Fewer support emails",
      body: "Delivery, pricing, returns and how-to questions are answered in the chat, so your inbox only gets real issues.",
    },
    {
      title: "Answers you can trust",
      body: "It uses only your approved content, and passes anything it isn't sure about to your team.",
    },
    {
      title: "Meetings booked for you",
      body: "Ready buyers can book a call with your team right inside the chat, at a time that suits them.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We review your website, the questions visitors ask and the leads you want more of.",
    },
    {
      title: "Gather your content",
      when: "Week 1",
      body: "We collect your pages, FAQs, product details and policies into one knowledge base the chatbot learns from.",
    },
    {
      title: "Design the chat",
      when: "Week 1",
      body: "We set its tone, greeting and lead questions, and decide when it should hand over to a person.",
    },
    {
      title: "Connect and test",
      when: "Week 2",
      body: "We link it to your CRM, calendar and help desk, then test it with hundreds of real questions.",
    },
    {
      title: "Launch and improve",
      when: "Week 2 onwards",
      body: "We add it to your site with one line of code and review conversations every week to fill any gaps.",
    },
  ],
  flow: [
    { label: "Visitor asks a question", tool: "wordpress" },
    { label: "Answer found in your content" },
    { label: "Name and need captured" },
    { label: "Meeting booked", tool: "calendly" },
    { label: "Lead sent to your CRM", tool: "hubspot" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your visitors",
      "Links to your website and documents",
      "A list of questions you're often asked",
      "A quick review of the chatbot's answers",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "Building the knowledge base from your content",
    "Designing the chat and lead questions",
    "Connecting your CRM, calendar and help desk",
    "Testing with real questions",
    "Weekly reviews and updates",
  ],
  youGet: [
    "A branded chatbot on every page of your site",
    "Answers based only on your approved content",
    "Leads with contact details sent to your CRM",
    "Meetings booked straight into your calendar",
    "A monthly report on chats, leads and top questions",
  ],
  timeline: "Live in 2 weeks",
  savings: {
    volume: { label: "Website chats and enquiries a month", unit: "chats", min: 100, max: 20000, step: 100, value: 2000 },
    minutes: { label: "Minutes your team spends on each", unit: "min", min: 1, max: 15, step: 1, value: 4 },
    automatedShare: 0.7,
    assumptions: [
      "The chatbot fully answers about 7 in 10 questions; the rest go to your team with the conversation attached.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra leads from visitors who would otherwise have left without asking.",
    ],
  },
  useCases: [
    {
      title: "Online stores",
      body: "Answer sizing, delivery and returns questions and help shoppers find the right product.",
      photo: photos.phoneShopping,
    },
    {
      title: "Software and service companies",
      body: "Explain plans and features, qualify visitors and book demos with your sales team.",
      photo: photos.founderLaptop,
    },
    {
      title: "Education and coaching",
      body: "Answer course, fee and schedule questions and collect admission enquiries.",
      photo: photos.creatorDesk,
    },
    {
      title: "Clinics and hospitals",
      body: "Share timings, doctors and services, and take appointment requests.",
    },
    {
      title: "Hotels and travel",
      body: "Answer questions about rooms, packages and policies, and capture booking enquiries.",
    },
    {
      title: "Professional services",
      body: "Explain what you do, answer pricing questions and book consultations.",
    },
  ],
  tools: ["wordpress", "shopify", "nextdotjs", "hubspot", "zoho", "googlesheets", "calendly", "whatsapp"],
  faqs: [
    {
      q: "Will it make up answers?",
      a: "No. It answers only from the content you approve. If a question falls outside it, the chatbot says so and offers to connect the visitor with your team.",
    },
    {
      q: "Does it work on any website?",
      a: "Yes. It works on WordPress, Shopify, Wix, custom-built sites and more. Adding it takes one line of code, and we can do that for you.",
    },
    {
      q: "Can it speak languages other than English?",
      a: "Yes. It replies in the language the visitor uses, including Hindi and most major world languages.",
    },
    {
      q: "Can it hand over to a real person?",
      a: "Yes. It can pass the chat to your team live during working hours, or create a ticket or WhatsApp message with the full conversation when you're away.",
    },
    {
      q: "How do we keep its answers up to date?",
      a: "When your prices or policies change, you update the page or tell us, and the chatbot learns the change. We also review conversations every week.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your traffic and what the chatbot needs to connect to. You get a fixed quote before any work starts.",
    },
  ],
  related: ["whatsapp-automation", "speed-to-lead-agent", "website-development"],
};
