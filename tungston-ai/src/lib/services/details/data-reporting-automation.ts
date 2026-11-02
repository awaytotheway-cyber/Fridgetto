import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const dataReportingAutomation: ServiceDetail = {
  ...catalogEntry("data-reporting-automation"),
  seo: {
    title: "Automated Business Reports & Dashboards",
    description:
      "Automate your MIS and business reports: numbers collected, checked and sent every morning, with alerts when they slip. See the hours you'd save.",
    keywords: [
      "automated reporting",
      "business reporting automation",
      "MIS report automation",
      "dashboard automation",
      "Google Sheets reporting automation",
    ],
  },
  hero: {
    eyebrow: "Data & Reporting Automation",
    title: "The reports your team builds by hand, ready before you are.",
    lede: "Every week someone downloads data from five tools, pastes it into a spreadsheet and fixes the formulas. We automate all of it: your numbers are collected, checked and turned into clear reports and dashboards, delivered to your inbox or WhatsApp every morning.",
    live: {
      variant: "dashboard",
      title: "Daily report · 9:00 a.m.",
      items: [
        { label: "Orders yesterday", meta: "412" },
        { label: "Leads this week", meta: "1,284" },
        { label: "Return rate", meta: "2.1%" },
      ],
    },
  },
  highlight: { value: "9 a.m.", label: "reports ready before you are" },
  whatIs: {
    question: "What is reporting automation?",
    body: [
      "Reporting automation means your business reports build themselves. Instead of someone exporting data from your CRM, store, ads and accounting software and stitching it together in Excel, a system pulls the numbers automatically, cleans them up and puts them in one place.",
      "You get the reports you rely on today, such as daily sales, the weekly MIS or the monthly review, on time and without errors, plus live dashboards you can open any time. If a number moves the wrong way, you get an alert instead of finding out at month-end.",
    ],
    before: [
      "Hours spent exporting and pasting data every week",
      "Reports arrive late, so decisions wait",
      "Copy-paste errors in important numbers",
      "Problems spotted only at month-end",
    ],
    after: [
      "Data collected from every tool automatically",
      "Reports in your inbox or WhatsApp every morning",
      "The same checked numbers, every time",
      "Alerts the moment a number slips",
    ],
  },
  benefits: [
    {
      title: "Hours back for your team",
      body: "No more weekly export-and-paste. The people who built reports by hand get their time back for analysis and action.",
    },
    {
      title: "Decisions on fresh numbers",
      body: "Leaders see yesterday's numbers this morning, not last week's numbers next Tuesday.",
    },
    {
      title: "One version of the truth",
      body: "Everyone sees the same figures, pulled straight from the source, so meetings stop arguing about whose sheet is right.",
    },
    {
      title: "Early warnings",
      body: "Set alerts for what matters, like falling sales or rising returns, and act before small problems get expensive.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We go through the reports you make today, where the data comes from and how long each one takes.",
    },
    {
      title: "Map your numbers",
      when: "Week 1",
      body: "We agree the metrics, definitions and layouts, so every report means the same thing to everyone.",
    },
    {
      title: "Connect your data",
      when: "Weeks 1–2",
      body: "We connect your CRM, store, ads, accounts and sheets, and set up automatic, checked data pulls.",
    },
    {
      title: "Build reports and dashboards",
      when: "Week 2",
      body: "We build the reports and dashboards you need and schedule them for email or WhatsApp.",
    },
    {
      title: "Go live and add alerts",
      when: "Week 3 onwards",
      body: "We run them alongside your manual reports until the numbers match, then add alerts and new views.",
    },
  ],
  flow: [
    { label: "Data from your tools", tool: "shopify" },
    { label: "Collected and cleaned" },
    { label: "Stored in one sheet", tool: "googlesheets" },
    { label: "Dashboard updated", tool: "lookerstudio" },
    { label: "Report sent each morning", tool: "gmail" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your reports",
      "Read-only access to your data sources",
      "Copies of the reports you use today",
      "A check that the new numbers match",
    ],
    total: "About 3 hours in total",
  },
  ourPart: [
    "Metric definitions and report design",
    "Automatic data connections and checks",
    "Dashboards and scheduled reports",
    "Alerts for the numbers that matter",
    "Monthly upkeep as your tools change",
  ],
  youGet: [
    "Your regular reports, built and sent automatically",
    "A live dashboard you can open any time",
    "Numbers pulled straight from the source, and checked",
    "Alerts when key numbers move the wrong way",
    "A simple guide to what every number means",
  ],
  timeline: "Live in 2–3 weeks",
  savings: {
    volume: { label: "Reports your team builds a month", unit: "reports", min: 5, max: 500, step: 5, value: 40 },
    minutes: { label: "Minutes each report takes", unit: "min", min: 30, max: 600, step: 15, value: 180 },
    automatedShare: 0.8,
    assumptions: [
      "Automation removes about 80% of the time spent collecting, pasting and formatting; your team still reads and acts on the numbers.",
      "Team cost is salary plus overheads for one hour of a staff member's time.",
      "It leaves out the value of faster decisions and fewer reporting mistakes.",
    ],
  },
  useCases: [
    {
      title: "Owners and leadership",
      body: "A one-page daily summary of sales, cash and leads on WhatsApp before the day starts.",
      photo: photos.teamMeeting,
    },
    {
      title: "Finance teams",
      body: "Automated MIS, receivables and expense reports, ready for month-end reviews.",
      photo: photos.calculatorLaptop,
    },
    {
      title: "Operations and factories",
      body: "Daily output, stock and dispatch numbers from the floor, with alerts for delays.",
      photo: photos.siteSupervisor,
    },
    {
      title: "Online stores",
      body: "Orders, returns, ad spend and margins by channel in one dashboard.",
    },
    {
      title: "Marketing teams",
      body: "Leads and costs from every ad platform in one weekly report.",
    },
    {
      title: "Multi-branch businesses",
      body: "Compare branches, stores or franchises side by side, every day.",
    },
  ],
  tools: ["googlesheets", "excel", "lookerstudio", "googleanalytics", "zoho", "hubspot", "shopify", "n8n"],
  faqs: [
    {
      q: "Which tools can you pull data from?",
      a: "Most business tools: Tally, Zoho, HubSpot, Shopify, Google and Meta ads, Google Analytics, Excel, Google Sheets, databases and more. If a tool can export data, we can usually automate it.",
    },
    {
      q: "Will we lose our current Excel reports?",
      a: "No. We can keep your familiar layouts and fill them in automatically, with live dashboards alongside.",
    },
    {
      q: "Who can see the reports?",
      a: "Only the people you choose. Reports are shared with named people, and sensitive numbers can be limited to managers.",
    },
    {
      q: "Can the reports come on WhatsApp?",
      a: "Yes. Many owners prefer a short summary on WhatsApp each morning, with a link to the full dashboard.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your data sources and how many reports you need. You get a fixed quote before any work starts.",
    },
    {
      q: "What happens if one of our tools changes?",
      a: "We monitor every data pull. If a tool changes or a pull fails, we're alerted and fix it, usually before you notice.",
    },
  ],
  related: ["finance-reconciliation-automation", "crm-lead-automation", "custom-automations"],
};
