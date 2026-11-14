/** /about copy, kept short. */

export const aboutHero = {
  title: "Clinic automation, from a founder you can reach.",
  lead: "A founder-led practice in Mumbai.",
};

export const founderBio =
  "Pratik Naragude helps businesses use AI to grow their reach. Today he focuses on clinics: the bookings, follow-ups and admin that slip through the gaps. He builds every automation himself and stays your contact from the first call.";

export const principles = [
  { title: "Measured in bookings", body: "Every month you see how many consults it booked." },
  { title: "People stay in charge", body: "Your team sets the rules and can take over anytime." },
  { title: "No invented results", body: "We publish client numbers only with permission." },
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
    bio: "Designs, builds and runs every automation.",
    focus: ["Clinic workflows", "Voice and WhatsApp"],
  },
  {
    name: "Shrawani",
    role: "Design Analyst",
    image: "/assets/team-designer.webp",
    alt: "Illustrated portrait of Shrawani sketching a layout on a tablet with a glowing stylus",
    bio: "Shapes how every automation looks and reads, from patient messages to the monthly report.",
    focus: ["Conversation design", "Report design"],
  },
];

export const where = "Mumbai, India. Working with clients worldwide.";
