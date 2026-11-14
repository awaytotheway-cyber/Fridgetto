/**
 * Homepage copy (COPY.md §2). The hero headline and audiences live in site.config.ts
 * because the share image draws them too; prices live in content/pricing.ts.
 */

export const hero = {
  subhead:
    "Protomation answers every call, missed call and WhatsApp enquiry in Hindi, Marathi or English. It qualifies the patient, books the consult into your calendar and follows up until they arrive. Set up in weeks. We can run it for you, with a report every month on the consults it booked.",
  worksWith: "Works with your calendar, WhatsApp, phone line and CRM.",
};

export const leaks = {
  eyebrow: "Where enquiries leak",
  title: "Most clinics don't lack enquiries. They lose them between hello and booked.",
  lead: "Patients choosing IVF, skin, hair or dental treatment contact two or three clinics at once. The first one to answer properly usually gets the consult. These are the moments that decide it.",
  moments: [
    {
      when: "A couple calls about IVF at 9:40pm",
      without: "Nobody picks up. By morning they've booked a consult elsewhere.",
      with: "Answered on the first ring, questions handled kindly, first consult booked for tomorrow.",
    },
    {
      when: "The phone rings during the lunch rush",
      without: "The desk is with a patient. The call goes unanswered, and nobody calls back.",
      with: "Answered, qualified and booked. Your desk gets a two-line summary.",
    },
    {
      when: "A Meta ad lead fills in your form",
      without: "Someone calls back the next day. They don't pick up.",
      with: "Called within a minute, while they're still on their phone, and booked.",
    },
    {
      when: "A WhatsApp message asks “how much?”",
      without: "Seen at 6pm, answered the next day, after two other clinics have replied.",
      with: "Answered in seconds with the answer you approved, and a consult offered.",
    },
    {
      when: "A booked patient forgets",
      without: "An empty slot and a doctor waiting.",
      with: "Reminded the day before and two hours before, with an easy way to reschedule.",
    },
  ],
  close:
    "None of this needs a bigger team. It needs a front desk that never takes a lunch break, and someone checking that it works.",
};

export const fiveJobs = {
  title: "One front desk. Five jobs.",
  lead: "Not a chatbot here and a phone bot there. One system that handles an enquiry from the first hello to the monthly report.",
  jobs: [
    {
      title: "Answer",
      body: "Every call, missed call, WhatsApp message and website chat, answered in seconds, day or night, in Hindi, Marathi or English.",
      parts: "Voice line · WhatsApp · Website chat",
      href: "/how-it-works#voice",
    },
    {
      title: "Qualify",
      body: "Asks what your front desk would: what they're looking for, which branch, how soon, and anything your doctors need before a first consult.",
      parts: "Your FAQs and rules",
      href: "/how-it-works#knowledge",
    },
    {
      title: "Book",
      body: "Offers real slots from your calendar or clinic software and books the consult. No back-and-forth.",
      parts: "Calendar and clinic software",
      href: "/how-it-works#integrations",
    },
    {
      title: "Remind & follow up",
      body: "Reminders before every consult, and polite follow-ups for anyone who went quiet, on the schedule you set.",
      parts: "WhatsApp and SMS",
      href: "/how-it-works#chat",
    },
    {
      title: "Report",
      body: "A monthly report: enquiries answered, response times, consults booked and what they're worth.",
      parts: "Monitoring and reporting",
      href: "/how-it-works#monitoring",
    },
  ],
};

export const demo = {
  title: "Try the front desk yourself.",
  lead: {
    call: "Call our demo clinic and book a pretend consult. It takes about two minutes, in Hindi, Marathi or English.",
    recording: "Listen to a call with our demo clinic, then ask its chat a question.",
    none: "Ask our demo clinic's chat a question, the way a patient would.",
  },
  facts: [
    "Answers from your clinic's own FAQs, fees and timings",
    "Books the consult inside the chat",
    "Hands over to your team the moment a patient asks for a person",
  ],
};

export const calculatorIntro = {
  eyebrow: "Missed-enquiry calculator",
  title: "What are missed enquiries costing you?",
  lead: "Pick your specialty, then change the numbers to match your clinic. Nothing you type leaves this page.",
};

export const whoItsFor = {
  title: "Built for clinics where one patient is worth a lot.",
  cards: [
    {
      title: "IVF & fertility",
      body: "Long, emotional decisions. Couples call several centres in one evening. The first kind, clear answer wins the consult.",
      href: "/clinics#ivf",
    },
    {
      title: "Dermatology & hair transplant",
      body: "Instagram and Meta leads asking “how much?” at all hours. A fast reply and a booked consult beat a price list.",
      href: "/clinics#dermatology-hair",
    },
    {
      title: "Dental implants & chains",
      body: "High-value treatment plans, several branches, and patients comparing two or three clinics. Every branch answered the same way.",
      href: "/clinics#dental",
    },
    {
      title: "Diagnostic labs",
      body: "Home sample collection booked early in the morning, often for a parent. A confirmed slot wins the booking.",
      href: "/clinics#diagnostic-labs",
    },
  ],
  education: {
    text: "Run a study-abroad, upskilling or exam-coaching business?",
    link: "See the front desk for education",
    href: "/education",
  },
};

export const processIntro = {
  title: "How we work",
  lead: "Small steps, each with something you can check.",
};

export const processSteps = [
  {
    title: "Free 20-minute call",
    when: "Day 1",
    body: "We learn how enquiries reach you today, and tell you honestly whether we can help.",
  },
  {
    title: "Front-Desk Diagnostic",
    when: "Week 1",
    body: "We test your phones and WhatsApp at different times, measure your response times and give you a fixed quote. The fee comes off your build.",
  },
  {
    title: "Pilot with one agreed number",
    when: "Weeks 2–3",
    body: "We switch on one channel first and agree one number to hit, for example 95% of calls answered within a minute. You pay the second half of the build only when the pilot hits it.",
  },
  {
    title: "Go live",
    when: "Weeks 3–5",
    body: "All channels, your calendar, your FAQs and your handoff rules. Your team knows exactly what it does and when it hands over.",
  },
  {
    title: "Managed and reported",
    when: "Every month · optional",
    body: "We monitor it, fix what breaks, test it after every change and send you a report every month.",
  },
];

export const monthly = {
  title: "What you get every month",
  lead: "On the Managed Front Desk plan. It's optional, and it's how the front desk stays accurate as your fees, doctors and timings change.",
  items: [
    { title: "Monitoring and alerts", body: "We watch every channel. If something stops working, we know before your patients do." },
    { title: "Fixes and updates", body: "New doctor, new fee, new branch timing? Tell us on WhatsApp and we update it." },
    { title: "Test calls after every change", body: "We call it ourselves after every update, in each language you use." },
    {
      title: "Monthly report",
      body: "Enquiries answered, response times, after-hours share, consults booked, and an estimate of what they're worth.",
    },
    { title: "Handoff rules kept current", body: "Who gets transferred, when, and to which number, reviewed with you." },
    { title: "Support", body: "We reply within 6 working hours (Mon–Sat, 10am–7pm IST)." },
  ],
};

export const dataTrust = {
  title: "Patient data, handled properly.",
  points: [
    "Every caller hears that they're speaking with an AI assistant, and that the call may be recorded.",
    "Your data stays in accounts you own wherever possible: your phone number, your WhatsApp, your calendar.",
    "We don't use your patients' data to train AI models.",
    "A data processing agreement with every clinic, built to support your obligations under India's DPDP Act, 2023.",
  ],
  link: { label: "How we handle data", href: "/security" },
};

export const pricingIntro = {
  title: "Clear prices before you commit.",
  line: "Your exact quote comes out of the diagnostic, and it doesn't change after that.",
};

export const founderNote = {
  eyebrow: "From the founder",
  text: "I'm Pratik Naragude. I started Protomation in Mumbai to help businesses use AI to grow, and I kept seeing the same leak: the enquiry nobody could answer went to whoever answered first. So we now do one thing. We build front desks that answer every enquiry, and we show you every month what they booked. You deal with me directly, from the first call.",
  /** Words that stay lit red once the scroll reaches them. */
  hot: ["one", "thing."],
  signature: "Pratik Naragude · Founder, Protomation · Mumbai",
  /** The clay portrait stands in until a photo arrives (ASSETS.md). */
  image: "/assets/team-orchestrator.webp",
  imageAlt: "Illustrated portrait of Pratik Naragude, founder of Protomation",
};
