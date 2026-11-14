/** /work copy (COPY.md §9). The sample report is dummy data for a fictional clinic and says so. */

export const workHero = {
  eyebrow: "Work",
  title: "Proof you can check yourself.",
  lead: "We're a young practice, so we won't show you logos we haven't earned. Here's what you can test today: the demo front desk, and the report you'd get every month.",
};

export const sampleReport = {
  title: "What your monthly report looks like",
  caption: "Sample report with dummy data for a fictional clinic. Not a client result.",
  clinic: "Protomation Demo Clinic",
  month: "October (sample)",
  rows: [
    { label: "Enquiries handled", value: "412", detail: "Calls 236 · WhatsApp 141 · Website chat 35" },
    { label: "Answered within 60 seconds", value: "97%" },
    { label: "Arrived outside clinic hours", value: "138", detail: "33% of all enquiries" },
    { label: "Consults booked", value: "61" },
    { label: "Reminders sent · no-shows", value: "118 · 6" },
    { label: "Handed to your team", value: "29" },
    { label: "Estimated value of consults booked", value: "₹6,10,000", detail: "At your consult-to-treatment rate" },
  ],
  note: "Most after-hours calls came between 8pm and 10pm. Consider adding evening consult slots on Tuesdays.",
};

export const builtAlready = {
  title: "What we've already built",
  body: "An outbound lead-qualification caller. When a lead submits a form, an AI voice agent calls them back, asks the qualifying questions and saves the answers. It's the same engine behind the front desk's speed-to-lead calls.",
};
