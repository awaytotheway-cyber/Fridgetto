/** /work copy. The sample report is dummy data for a fictional clinic and says so. */

export const workHero = {
  eyebrow: "Work",
  title: "Proof you can check yourself.",
  lead: "Try the demo, and see the report you'd get every month.",
};

export const sampleReport: {
  title: string;
  caption: string;
  clinic: string;
  month: string;
  rows: { label: string; value: string; detail?: string }[];
  note: string;
} = {
  title: "Your monthly report",
  caption: "Sample with dummy data for a fictional clinic. Not a client result.",
  clinic: "Protomation Demo Clinic",
  month: "October (sample)",
  rows: [
    { label: "Enquiries handled", value: "412" },
    { label: "Answered within 60 seconds", value: "97%" },
    { label: "Arrived after hours", value: "33%" },
    { label: "Consults booked", value: "61" },
    { label: "No-shows", value: "6" },
  ],
  note: "Most after-hours calls came between 8 and 10pm. Consider evening slots on Tuesdays.",
};

export const builtAlready = {
  title: "Already built",
  body: "An AI caller that phones new leads back, asks the qualifying questions and saves the answers.",
};
