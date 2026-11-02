import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const websiteDevelopment: ServiceDetail = {
  ...catalogEntry("website-development"),
  seo: {
    title: "Website & Landing Page Development That Converts",
    description:
      "Fast, modern websites and landing pages built to turn visitors into enquiries, with SEO, AI chat and lead capture built in. See the time you'd save.",
    keywords: [
      "website development company",
      "landing page design",
      "Next.js website development",
      "business website India",
      "high-converting landing pages",
    ],
  },
  hero: {
    eyebrow: "Websites & Landing Pages",
    title: "A website that loads fast, ranks well and turns visitors into enquiries.",
    lede: "Your website is often a customer's first impression. We design and build fast, modern websites and landing pages that look premium on every phone, show up on Google, and capture enquiries with AI chat and smart forms that go straight to your team.",
    live: {
      variant: "browser",
      title: "Website · Launch preview",
      items: [
        { label: "Grow faster with a partner you can trust", meta: "Loads in 1.2 seconds" },
        { label: "Services", meta: "Clear offers" },
        { label: "Reviews", meta: "Built-in trust" },
        { label: "Book a call", meta: "Lead capture" },
        { label: "AI chat", meta: "Answers 24/7" },
      ],
    },
  },
  highlight: { value: "Under 2s", label: "page load on a phone" },
  whatIs: {
    question: "What makes a website convert?",
    body: [
      "A website that converts turns visitors into enquiries and customers, not just one that looks good. It loads in a couple of seconds on a phone, explains what you do and why you're the right choice in plain words, and makes the next step obvious: call, book, buy or ask.",
      "We build sites and landing pages around that goal: fast modern technology, clear copy, strong visuals, search engine basics done properly, and lead capture built in, including an AI chat assistant and forms that send enquiries straight to your CRM or WhatsApp.",
    ],
    before: [
      "A slow site visitors leave before it loads",
      "Enquiries that arrive by email and get missed",
      "Every small change needs a developer",
      "Not showing up on Google for what you sell",
    ],
    after: [
      "Pages that load in under two seconds on a phone",
      "Every enquiry sent to your CRM or WhatsApp instantly",
      "Easy edits for your team, no developer needed",
      "Search basics done right from day one",
    ],
  },
  benefits: [
    {
      title: "More enquiries from your traffic",
      body: "Clear pages, fast loading and obvious next steps turn more of your visitors into leads.",
    },
    {
      title: "A premium first impression",
      body: "A modern design that looks sharp on every phone and earns trust before the customer calls.",
    },
    {
      title: "Found on Google",
      body: "Fast pages, clean structure and proper SEO setup give you a solid base to rank for what you sell.",
    },
    {
      title: "Leads handled automatically",
      body: "AI chat, smart forms and instant WhatsApp alerts mean no enquiry sits unanswered.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We review your current site or idea, your customers and the enquiries you want more of.",
    },
    {
      title: "Plan and design",
      when: "Weeks 1–2",
      body: "We plan the pages and messages, then design the look in your brand, for your approval.",
    },
    {
      title: "Build",
      when: "Weeks 2–3",
      body: "We build the site on fast, modern technology, with forms, chat and analytics connected.",
    },
    {
      title: "Content and SEO",
      when: "Week 3",
      body: "We write or polish the copy, set up search basics and test every page on real phones.",
    },
    {
      title: "Launch and support",
      when: "Week 4 onwards",
      body: "We launch, track enquiries and keep improving the pages that matter most.",
    },
  ],
  flow: [
    { label: "Visitor finds you on Google", tool: "googleanalytics" },
    { label: "A fast page answers their questions", tool: "nextdotjs" },
    { label: "AI chat or a form captures the lead" },
    { label: "Lead sent to your CRM", tool: "hubspot" },
    { label: "Your team alerted instantly", tool: "whatsapp" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your business and customers",
      "Your logo, photos and any existing content",
      "Feedback on the design and first draft",
      "A final review before launch",
    ],
    total: "About 5 hours in total",
  },
  ourPart: [
    "Page plan, copy and design",
    "Building and connecting the site",
    "SEO setup and speed tuning",
    "Forms, AI chat and CRM connections",
    "Hosting, launch and support",
  ],
  youGet: [
    "A fast, modern website or landing page in your brand",
    "Pages that look great on every phone",
    "SEO basics and analytics set up from day one",
    "AI chat and lead capture connected to your CRM",
    "Easy editing for your team, plus ongoing support",
  ],
  timeline: "Live in 3–4 weeks",
  savings: {
    volume: { label: "Website enquiries a month", unit: "enquiries", min: 20, max: 5000, step: 20, value: 300 },
    minutes: { label: "Minutes spent answering and logging each", unit: "min", min: 3, max: 30, step: 1, value: 10 },
    automatedShare: 0.5,
    assumptions: [
      "Built-in chat, forms and CRM connections take over about half the time spent answering and logging enquiries.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra enquiries a faster, clearer site brings in, which is usually the main gain.",
    ],
  },
  useCases: [
    {
      title: "Service businesses",
      body: "Websites that explain your services clearly and turn visitors into booked calls.",
      photo: photos.founderLaptop,
    },
    {
      title: "Product launches and ads",
      body: "Focused landing pages that turn ad clicks into leads and sales.",
      photo: photos.phoneShopping,
    },
    {
      title: "Clinics and professionals",
      body: "Trust-building sites with online booking and clear service pages.",
      photo: photos.clinicReception,
    },
    {
      title: "Startups",
      body: "A sharp first website that explains your product and captures early users.",
    },
    {
      title: "Local businesses",
      body: "Pages built to show up in local searches and bring in calls and visits.",
    },
    {
      title: "Coaches and educators",
      body: "Course pages with enrolment, payments and automatic follow-ups.",
    },
  ],
  tools: ["nextdotjs", "react", "tailwindcss", "supabase", "vercel", "wordpress", "googleanalytics", "hubspot"],
  faqs: [
    {
      q: "Will I be able to update the website myself?",
      a: "Yes. We set up simple editing for text, images and blog posts, and show your team how to use it. Bigger changes we handle for you.",
    },
    {
      q: "Do you build on WordPress?",
      a: "We build most sites with Next.js for speed and security, and use WordPress when you need its plugins or already run on it. We recommend the right fit in the audit.",
    },
    {
      q: "Will my site show up on Google?",
      a: "We set up the technical basics properly: fast loading, clean structure, page titles and descriptions, a sitemap and analytics. Ranking also depends on content and time, which we can help with too.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes. We rebuild it on faster technology, keep your best content and set up redirects, so you don't lose the search traffic you already have.",
    },
    {
      q: "Is hosting included?",
      a: "We set up fast, secure hosting and handle the launch. Ongoing hosting and support are part of the plan we agree after the audit.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on the number of pages and features you need. You get a fixed quote before any work starts.",
    },
  ],
  related: ["ai-website-chatbots", "content-automation", "speed-to-lead-agent"],
};
