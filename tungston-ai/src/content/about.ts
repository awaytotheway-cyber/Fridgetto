/** /about copy (COPY.md §10). */

export const aboutHero = {
  title: "A front desk you can trust, from a founder you can reach.",
  lead: "Protomation is a founder-led practice in Mumbai. We do one thing: install and run AI front desks for clinics and education businesses.",
};

export const founderBio =
  "Pratik Naragude is the founder of Protomation. He helps businesses use AI as a catalyst for growth and reach. Today he focuses on one problem that costs clinics more than they realise: enquiries that arrive when nobody can answer. He designs every front desk himself and stays your contact from the first call.";

export const principles = [
  {
    title: "Measured in booked consultations",
    body: "Not in features or call minutes. Every month you see how many consults the front desk booked.",
  },
  {
    title: "People stay in charge",
    body: "Your team sets the rules, approves every answer and can take over any conversation.",
  },
  {
    title: "Honest about what we can show",
    body: "There are no invented results on this site. When we have client numbers, we'll publish them with permission.",
  },
  {
    title: "You deal with the founder",
    body: "No account managers. You talk to the person who builds your front desk.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  /** Portrait in /public/assets (see ASSETS.md). Clay illustrations until photos arrive. */
  image: string;
  alt: string;
  bio: string;
  focus: string[];
};

export const team: TeamMember[] = [
  {
    name: "Pratik Naragude",
    role: "Founder",
    image: "/assets/team-orchestrator.webp",
    alt: "Illustrated portrait of Pratik Naragude conducting glowing tiles for calls, chat, email, calendar and documents",
    bio: "Designs, builds and runs every front desk, from the first call with your clinic to the monthly report.",
    focus: ["Front-desk design", "Voice and WhatsApp", "Reporting"],
  },
  {
    name: "Shrawani",
    role: "Design Analyst",
    image: "/assets/team-designer.webp",
    alt: "Illustrated portrait of Shrawani sketching a layout on a tablet with a glowing stylus",
    bio: "Shapes how each front desk looks and reads: the chat on your website, the WhatsApp messages patients receive and the monthly report your team reads.",
    focus: ["Conversation design", "Patient messages", "Report design"],
  },
];

export const where = "Based in Mumbai, India. Working with clients worldwide.";
