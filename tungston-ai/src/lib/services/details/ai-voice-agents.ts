import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const aiVoiceAgents: ServiceDetail = {
  ...catalogEntry("ai-voice-agents"),
  seo: {
    title: "AI Voice Agents That Answer Every Call",
    description:
      "AI voice agents that answer calls 24/7, book appointments and qualify leads in natural conversation, in English, Hindi and more. See what you'd save.",
    keywords: [
      "AI voice agent for business",
      "AI calling agent",
      "AI receptionist",
      "AI phone answering service India",
      "voice AI for appointments",
    ],
  },
  hero: {
    eyebrow: "AI Voice Agents",
    title: "Every call answered, every booking made, even at midnight.",
    lede: "An AI voice agent picks up your business calls within two rings, talks naturally with callers, answers their questions, books appointments and passes hot leads to your team. No hold music, no missed calls, no voicemail.",
    live: {
      variant: "call",
      title: "Call · Front desk",
      items: [
        { from: "them", label: "Hi, I'd like to book a cleaning for Saturday." },
        { from: "us", label: "Sure! I have 10 a.m. or 2 p.m. on Saturday. Which suits you?" },
        { from: "them", label: "2 p.m., please." },
        { from: "us", label: "Booked. I've sent your confirmation on WhatsApp." },
      ],
    },
  },
  highlight: { value: "2 rings", label: "every call answered" },
  whatIs: {
    question: "What is an AI voice agent?",
    body: [
      "An AI voice agent is a phone assistant that sounds and talks like a helpful member of your team. It answers incoming calls, understands what the caller needs and responds in natural speech, in their language.",
      "It can check your calendar and book appointments, answer questions about prices and timings, take messages and call leads back. Every call is recorded, written up and logged, and any caller who asks for a person is transferred straight away.",
    ],
    before: [
      "Calls missed at lunch, after hours and at peak times",
      "Staff pulled away from customers to answer the phone",
      "Voicemails that nobody calls back",
      "No notes on what callers wanted",
    ],
    after: [
      "Every call answered within two rings, 24/7",
      "Front-desk staff free for the people in front of them",
      "Bookings made and confirmed on the call",
      "A written summary of every call in your CRM",
    ],
  },
  benefits: [
    {
      title: "No more missed calls",
      body: "Callers reach someone every time, so the booking comes to you instead of the next business on their list.",
    },
    {
      title: "More appointments booked",
      body: "The agent checks live availability and books on the call, then sends a confirmation by WhatsApp or SMS.",
    },
    {
      title: "A calmer front desk",
      body: "Your team stops juggling the phone and the counter, and spends its time with customers in person.",
    },
    {
      title: "Every call on record",
      body: "Each call is transcribed, summarised and saved, so you know what customers ask for and how they found you.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We listen to how calls are handled today and pick the call types worth automating first.",
    },
    {
      title: "Design the conversation",
      when: "Week 1",
      body: "We write the agent's script, choose its voice and tone, and decide when it should transfer a caller to your team.",
    },
    {
      title: "Connect your calendar and CRM",
      when: "Week 2",
      body: "We link it to your booking system and CRM, so it can check availability and save every call.",
    },
    {
      title: "Test calls",
      when: "Weeks 2–3",
      body: "Your team calls the agent with real questions until it handles them exactly the way you want.",
    },
    {
      title: "Go live and tune",
      when: "Week 3 onwards",
      body: "We switch your number over, listen to real calls and keep improving the answers every week.",
    },
  ],
  flow: [
    { label: "Customer calls your number", tool: "twilio" },
    { label: "Agent answers and understands" },
    { label: "Books into your calendar", tool: "googlecalendar" },
    { label: "Confirmation sent", tool: "whatsapp" },
    { label: "Call summary saved to your CRM", tool: "hubspot" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your callers",
      "Access to your calendar and phone line",
      "Your prices, timings and common questions",
      "A few test calls before launch",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "Voice, script and call flow design",
    "Phone number and call routing setup",
    "Calendar and CRM connections",
    "Testing with real call scenarios",
    "Weekly tuning from real calls",
  ],
  youGet: [
    "A phone agent that answers 24/7 in a natural voice",
    "Bookings made and confirmed during the call",
    "Instant transfer to your team when a caller asks",
    "A recording, transcript and summary of every call",
    "A monthly report on calls answered and bookings made",
  ],
  timeline: "Live in 2–3 weeks",
  savings: {
    volume: { label: "Calls a month", unit: "calls", min: 100, max: 20000, step: 50, value: 1500 },
    minutes: { label: "Minutes per call, notes included", unit: "min", min: 2, max: 15, step: 1, value: 5 },
    automatedShare: 0.65,
    assumptions: [
      "The agent fully handles about 65 in 100 calls; the rest are transferred to your team with notes.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the bookings you lose today to missed calls, which is often the biggest gain.",
    ],
  },
  useCases: [
    {
      title: "Clinics and dental practices",
      body: "Book, reschedule and confirm appointments, and answer questions about timings and fees.",
      photo: photos.clinicReception,
    },
    {
      title: "Sales and support lines",
      body: "Qualify inbound callers, answer common questions and pass ready buyers to your sales team.",
      photo: photos.callCentre,
    },
    {
      title: "Real estate",
      body: "Answer property enquiries day and night and book site visits straight into your agents' calendars.",
      photo: photos.videoCall,
    },
    {
      title: "Salons and spas",
      body: "Take bookings, offer open slots and send reminders, so fewer clients miss their appointments.",
    },
    {
      title: "Home services and repairs",
      body: "Capture job details, give arrival windows and pass requests to your technicians.",
    },
    {
      title: "Restaurants",
      body: "Take table reservations and answer questions about the menu, timings and parking.",
    },
  ],
  tools: ["twilio", "elevenlabs", "googlecalendar", "calendly", "hubspot", "zoho", "whatsapp", "n8n"],
  faqs: [
    {
      q: "Will callers know they're talking to AI?",
      a: "The voice sounds natural and handles interruptions like a person would. We recommend the agent says it's a virtual assistant at the start, which callers accept easily when it's quick and helpful.",
    },
    {
      q: "Which languages can it speak?",
      a: "English, Hindi and many others, including Marathi, Tamil, Telugu, Spanish and Arabic. It can switch language if the caller does.",
    },
    {
      q: "Can it transfer a call to a real person?",
      a: "Yes. If a caller asks for a person, or the question needs one, the agent transfers the call to the right number along with a short summary.",
    },
    {
      q: "Can I keep my existing phone number?",
      a: "Yes. We forward your current number to the agent, either around the clock or only when your team is busy or closed.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your call volume and what the agent needs to do. Call charges are explained up front, before anything goes live.",
    },
    {
      q: "How long does setup take?",
      a: "Most voice agents are live in two to three weeks, including test calls with your team.",
    },
  ],
  related: ["speed-to-lead-agent", "ai-website-chatbots", "crm-lead-automation"],
};
