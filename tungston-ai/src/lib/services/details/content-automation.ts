import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const contentAutomation: ServiceDetail = {
  ...catalogEntry("content-automation"),
  seo: {
    title: "AI Content Automation for Blogs & Social Media",
    description:
      "AI content automation that turns one idea into a month of on-brand blogs, social posts and emails, with a human review on every piece. See your savings.",
    keywords: [
      "AI content automation",
      "social media content automation",
      "AI blog writing service",
      "content marketing automation",
      "AI content creation India",
    ],
  },
  hero: {
    eyebrow: "Content Automation",
    title: "One idea in, a month of on-brand content out.",
    lede: "Posting regularly takes hours your team doesn't have. We build a content system that turns one idea, video or article into blogs, social posts, newsletters and captions in your brand voice, schedules them, and keeps a person in charge of what goes live.",
    live: {
      variant: "calendar",
      title: "Content calendar · Next two weeks",
      items: [
        { label: "5 signs you need a new website", meta: "Blog" },
        { label: "Behind-the-scenes reel", meta: "Instagram" },
        { label: "Founder story post", meta: "LinkedIn" },
        { label: "Monthly newsletter", meta: "Email" },
        { label: "Customer tips carousel", meta: "Instagram" },
        { label: "How-to video short", meta: "YouTube" },
        { label: "Festive offer post", meta: "Facebook" },
      ],
    },
  },
  highlight: { value: "30 days", label: "of content from one idea" },
  whatIs: {
    question: "What is AI content automation?",
    body: [
      "AI content automation is a system that does most of the work of producing content: research, first drafts, repurposing and scheduling. You give it an idea, a recorded video or an existing article, and it creates blog posts, social posts, captions, newsletters and scripts in your brand's voice.",
      "It isn't a button that spits out generic text. We train it on your best content, your tone and your audience, and every piece passes a human review before it's published. The result is a steady stream of content that sounds like you, in a fraction of the time.",
    ],
    before: [
      "Hours spent writing every post from scratch",
      "Weeks of silence when the team gets busy",
      "One video or article used once, then forgotten",
      "Every channel managed separately",
    ],
    after: [
      "Drafts ready in minutes, in your voice",
      "A full calendar planned weeks ahead",
      "Each idea turned into a dozen pieces",
      "Everything scheduled from one place",
    ],
  },
  benefits: [
    {
      title: "Show up consistently",
      body: "Post every week on every channel, even when your team is busy, so customers and search engines keep finding you.",
    },
    {
      title: "Hours back for your team",
      body: "Your marketers spend their time on ideas, approvals and campaigns, not first drafts.",
    },
    {
      title: "Content that sounds like you",
      body: "Trained on your best work and brand voice, with a human review before anything goes live.",
    },
    {
      title: "More from every idea",
      body: "One webinar or article becomes blogs, posts, emails and short videos, all from the same source.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We look at your channels, your audience and the content that works best for you today.",
    },
    {
      title: "Capture your voice",
      when: "Week 1",
      body: "We study your best content and write a brand voice guide the system follows.",
    },
    {
      title: "Build the content engine",
      when: "Weeks 1–2",
      body: "We set up the drafting, repurposing and scheduling workflows for each of your channels.",
    },
    {
      title: "Your first month",
      when: "Week 2",
      body: "We produce your first month of content together, and you approve every piece.",
    },
    {
      title: "Run and improve",
      when: "Week 3 onwards",
      body: "Content flows every week. We track what performs and tune the topics and formats.",
    },
  ],
  flow: [
    { label: "One idea, video or article" },
    { label: "Drafts in your brand voice" },
    { label: "Human review and approval", tool: "notion" },
    { label: "Scheduled to every channel", tool: "instagram" },
    { label: "Published and tracked", tool: "wordpress" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your brand and audience",
      "Examples of content you love",
      "Access to your social and blog accounts",
      "About 30 minutes a week to approve content",
    ],
    total: "About 2 hours, then 30 minutes a week",
  },
  ourPart: [
    "Brand voice guide and content plan",
    "Drafting and repurposing workflows",
    "Scheduling across your channels",
    "SEO briefs and internal links for blogs",
    "Monthly performance review",
  ],
  youGet: [
    "A month of content planned and drafted ahead",
    "Blogs, posts, emails and scripts in your voice",
    "A review step, so nothing goes out unapproved",
    "Automatic scheduling to every channel",
    "A monthly report on what's working",
  ],
  timeline: "Live in 2 weeks",
  savings: {
    volume: { label: "Posts, blogs and emails a month", unit: "pieces", min: 10, max: 500, step: 10, value: 60 },
    minutes: { label: "Minutes each takes to write and schedule", unit: "min", min: 15, max: 240, step: 15, value: 90 },
    automatedShare: 0.6,
    assumptions: [
      "The system does about 60% of the work on each piece; your team still reviews, edits and approves.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the extra traffic and leads that come from posting consistently.",
    ],
  },
  useCases: [
    {
      title: "Founders and personal brands",
      body: "Turn one recorded video a week into LinkedIn posts, short clips and a newsletter.",
      photo: photos.videoCreator,
    },
    {
      title: "Marketing teams",
      body: "Keep every channel active with a planned calendar and drafts ready for review.",
      photo: photos.teamPlanning,
    },
    {
      title: "Coaches and educators",
      body: "Repurpose classes and webinars into posts, emails and course promotions.",
      photo: photos.creatorDesk,
    },
    {
      title: "Online stores",
      body: "Product descriptions, festive campaigns and social posts for every launch.",
    },
    {
      title: "Clinics and wellness brands",
      body: "Helpful health tips and service posts that build trust, reviewed before they go live.",
    },
    {
      title: "Real estate and local businesses",
      body: "Listings, neighbourhood guides and offers, posted every week.",
    },
  ],
  tools: ["wordpress", "instagram", "linkedin", "youtube", "canva", "mailchimp", "notion", "facebook"],
  faqs: [
    {
      q: "Will the content sound robotic?",
      a: "No. We train the system on your best content and a written brand voice guide, and a person reviews every piece before it goes out.",
    },
    {
      q: "Is AI-assisted content bad for SEO?",
      a: "Search engines reward helpful, accurate content, however it's drafted. Ours is researched, edited by people and written for your customers, with a proper SEO brief behind every blog.",
    },
    {
      q: "Who approves what gets published?",
      a: "You or your team. Nothing goes live until it's approved, and you can edit any piece before it's scheduled.",
    },
    {
      q: "Which channels can you post to?",
      a: "Your blog, Instagram, Facebook, LinkedIn, YouTube, X and email newsletters, plus WhatsApp broadcasts.",
    },
    {
      q: "Can it make images and videos too?",
      a: "It writes captions, scripts and design briefs, and can create simple graphics from your templates. For photo and video shoots, it works with what you or your designer provide.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your channels and how much content you need each month. You get a fixed quote before any work starts.",
    },
  ],
  related: ["website-development", "data-reporting-automation", "ai-website-chatbots"],
};
