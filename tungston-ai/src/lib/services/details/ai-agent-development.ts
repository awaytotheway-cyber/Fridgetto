import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const aiAgentDevelopment: ServiceDetail = {
  ...catalogEntry("ai-agent-development"),
  seo: {
    title: "AI Agent Development for Business Teams",
    description:
      "Custom AI agents that qualify leads, triage tickets and update your CRM inside the tools you already use. Live in weeks. See the hours you'd save.",
    keywords: [
      "AI agent development company",
      "custom AI agents for business",
      "AI agents India",
      "business AI assistant",
      "autonomous AI agents",
    ],
  },
  hero: {
    eyebrow: "AI Agent Development",
    title: "AI agents that finish the work, not just talk about it.",
    lede: "An AI agent is a digital team member that takes a task from start to finish: it reads the request, checks your systems, does the work and reports back. We design, build and run agents for the repetitive jobs your team does every day, with a person always in charge.",
    live: {
      variant: "tasks",
      title: "Agent · Morning queue",
      items: [
        { label: "Qualified 18 new leads from the website", meta: "2 min" },
        { label: "Updated deal stages in your CRM", meta: "40 sec" },
        { label: "Answered 12 order-status emails", meta: "3 min" },
        { label: "Flagged 2 refund requests for a manager", meta: "Just now" },
      ],
    },
  },
  highlight: { value: "24/7", label: "works nights, weekends and holidays" },
  whatIs: {
    question: "What does an AI agent actually do?",
    body: [
      "Think of an AI agent as a new hire who never tires of routine work. You give it a job, like sorting incoming leads or answering order emails, and it uses your tools to finish it: reading messages, looking things up in your CRM or sheets, filling in forms and sending replies.",
      "Unlike a simple chatbot, an agent can take several steps on its own and decide what to do next. It follows the rules you set, keeps a log of everything it does, and hands the job to a person whenever something needs judgment or approval.",
    ],
    before: [
      "Skilled people stuck on copy-paste work",
      "Requests wait in inboxes overnight",
      "Every task done slightly differently",
      "No record of who did what",
    ],
    after: [
      "Routine tasks finished in minutes, around the clock",
      "Requests picked up the moment they arrive",
      "The same steps followed every single time",
      "A full log of every action the agent took",
    ],
  },
  benefits: [
    {
      title: "Hours back every week",
      body: "Your team stops spending mornings on data entry, sorting and status updates, and gets that time back for customers and growth.",
    },
    {
      title: "Faster for your customers",
      body: "Leads, tickets and requests are handled in minutes instead of waiting for someone to get to them.",
    },
    {
      title: "Fewer mistakes",
      body: "Agents follow the same steps every time and double-check details, so less slips through the cracks.",
    },
    {
      title: "You stay in control",
      body: "You decide what the agent may do on its own and what needs a yes from a person. Every action is logged.",
    },
  ],
  steps: [
    {
      title: "Free discovery call",
      when: "Day 1",
      body: "We map how the work moves through your team today and pick the one or two jobs where an agent saves the most time.",
    },
    {
      title: "Design the agent's job",
      when: "Week 1",
      body: "We write down exactly what the agent does, which tools it uses, and where it must stop and ask a person.",
    },
    {
      title: "Build and connect",
      when: "Weeks 2–3",
      body: "We build the agent, connect it to your email, CRM and other tools, and set firm limits on what it can change.",
    },
    {
      title: "Test on real work",
      when: "Week 4",
      body: "The agent works alongside your team on real tasks, with a person checking its work before anything goes out.",
    },
    {
      title: "Hand over and grow",
      when: "Week 5 onwards",
      body: "Once it's reliable, it runs on its own. We monitor it, report monthly and add new jobs when you're ready.",
    },
  ],
  flow: [
    { label: "New request arrives", tool: "gmail" },
    { label: "Agent reads it and decides" },
    { label: "Updates your CRM", tool: "hubspot" },
    { label: "Replies or completes the task" },
    { label: "Asks a person when unsure", tool: "slack" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about the work",
      "Access to the tools the agent will use",
      "Examples of how your team does the job",
      "Quick reviews during the test week",
    ],
    total: "About 4 hours in total",
  },
  ourPart: [
    "Mapping the job and its rules",
    "Building and connecting the agent",
    "Safety limits and approval steps",
    "Testing on your real work",
    "Monitoring, fixes and monthly reports",
  ],
  youGet: [
    "An AI agent doing a defined job inside your tools",
    "Clear rules for what it does alone and what it asks about",
    "A log of every action it takes",
    "A monthly report on tasks done and hours saved",
    "A team ready to add the next job",
  ],
  timeline: "Live in 4–6 weeks",
  savings: {
    volume: { label: "Repetitive tasks a month", unit: "tasks", min: 200, max: 20000, step: 100, value: 3000 },
    minutes: { label: "Minutes each task takes today", unit: "min", min: 1, max: 30, step: 1, value: 6 },
    automatedShare: 0.6,
    assumptions: [
      "The agent finishes about 6 in 10 of these tasks on its own; the rest come back to your team, already prepared.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out faster response times and fewer errors, which usually add more value on top.",
    ],
  },
  useCases: [
    {
      title: "Sales teams",
      body: "Qualify new leads, enrich them with company details and book meetings for your reps.",
      photo: photos.laptopsTeam,
    },
    {
      title: "Customer support",
      body: "Answer common tickets, look up orders and route tricky cases to the right person with notes.",
      photo: photos.supportAgent,
    },
    {
      title: "Operations and logistics",
      body: "Track shipments, update stock sheets and chase suppliers for missing paperwork.",
      photo: photos.warehouseBoxes,
    },
    {
      title: "Finance and admin",
      body: "Collect invoices, check them against orders and prepare entries for your accountant.",
    },
    {
      title: "HR and hiring",
      body: "Screen applications, schedule interviews and answer common questions from candidates.",
    },
    {
      title: "Founders and small teams",
      body: "Hand off the inbox, follow-ups and reporting that eat into your day.",
    },
  ],
  tools: ["claude", "openai", "googlegemini", "hubspot", "zoho", "slack", "gmail", "n8n"],
  faqs: [
    {
      q: "How is an AI agent different from a chatbot?",
      a: "A chatbot answers questions. An agent takes action: it can read an email, look up the customer in your CRM, update a record and send a reply, all as one job. It works in the background on tasks, not just in a chat window.",
    },
    {
      q: "Will the agent make decisions without us?",
      a: "Only the ones you allow. We agree the limits together, such as never issuing refunds, and anything outside them goes to a person for approval.",
    },
    {
      q: "Is our data safe?",
      a: "Agents get access only to the tools and data their job needs. We use business-grade AI services that do not train on your data, and every action is logged so you can see exactly what happened.",
    },
    {
      q: "Do we need technical staff to run it?",
      a: "No. We build, host and maintain it. Your team just sees the work getting done, plus a simple report each month.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free discovery call, based on the jobs you want the agent to take on. You get a fixed quote and the savings to expect before any work starts.",
    },
    {
      q: "What if the agent gets something wrong?",
      a: "During the test week a person checks its work before anything goes out. After launch we monitor it, and it hands anything uncertain to your team instead of guessing.",
    },
  ],
  related: ["ai-process-automation", "crm-lead-automation", "custom-automations"],
};
