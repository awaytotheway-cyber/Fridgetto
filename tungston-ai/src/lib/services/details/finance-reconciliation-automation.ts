import { catalogEntry } from "../catalog";
import { photos } from "../photos";
import type { ServiceDetail } from "../types";

export const financeReconciliationAutomation: ServiceDetail = {
  ...catalogEntry("finance-reconciliation-automation"),
  seo: {
    title: "Bank & Payment Reconciliation Automation",
    description:
      "Automate bank, payment gateway and ledger reconciliation. Entries matched every day, only exceptions left for your team. See the hours you'd save.",
    keywords: [
      "reconciliation automation",
      "bank reconciliation software",
      "payment reconciliation automation",
      "accounts automation India",
      "Razorpay reconciliation",
    ],
  },
  hero: {
    eyebrow: "Finance & Reconciliation",
    title: "Bank, payment and ledger entries matched for you, every day.",
    lede: "Matching bank statements, payment gateway payouts and invoices line by line eats days every month. We automate reconciliation: entries are pulled in and matched against your books, and only the real mismatches are left for your accounts team, each with the reason attached.",
    live: {
      variant: "ledger",
      title: "Reconciliation · Today",
      items: [
        { label: "Razorpay payout, 214 orders", meta: "Matched" },
        { label: "Bank statement, 96 lines", meta: "Matched" },
        { label: "Stripe settlement, 41 charges", meta: "Matched" },
        { label: "Refund missing from the ledger", from: "them", meta: "Needs review" },
        { label: "Vendor invoices, 37 bills", meta: "Matched" },
      ],
    },
  },
  highlight: { value: "Days, not weeks", label: "to close the month" },
  whatIs: {
    question: "What is reconciliation automation?",
    body: [
      "Reconciliation is checking that every rupee or dollar in your bank, your payment gateway and your accounting books matches up. Done by hand, it means downloading statements and ticking off thousands of lines in spreadsheets.",
      "Reconciliation automation does the matching for you. It pulls in bank statements, gateway settlements and invoices every day, matches them even when payments are split, bundled or net of fees, and flags only what doesn't add up. Your team reviews a short list of exceptions instead of the whole ledger.",
    ],
    before: [
      "Days spent ticking off statement lines",
      "Gateway fees and refunds that never add up",
      "Mismatches found weeks later",
      "A month-end close that drags on",
    ],
    after: [
      "Thousands of entries matched automatically",
      "Fees, refunds and split payments handled",
      "Mismatches flagged the same day",
      "Books ready to close in days",
    ],
  },
  benefits: [
    {
      title: "Close the month faster",
      body: "With matching done daily, month-end becomes a review of a short list instead of a week of spreadsheets.",
    },
    {
      title: "Catch leaks early",
      body: "Missing payouts, double refunds and unexpected fees are flagged the day they happen, not discovered at audit.",
    },
    {
      title: "Accounts team on real work",
      body: "Your accountants spend their time on analysis, vendors and compliance instead of matching lines.",
    },
    {
      title: "Audit-ready records",
      body: "Every match and exception is logged with its reason, so audits and tax filings are simpler.",
    },
  ],
  steps: [
    {
      title: "Free audit call",
      when: "Day 1",
      body: "We look at your accounts, payment channels and how reconciliation is done today.",
    },
    {
      title: "Agree the matching rules",
      when: "Week 1",
      body: "We define how entries should match, including fees, refunds, partial payments and timing gaps.",
    },
    {
      title: "Connect your sources",
      when: "Weeks 1–2",
      body: "We connect bank statements, payment gateways and your accounting software, read-only wherever possible.",
    },
    {
      title: "Run in parallel",
      when: "Weeks 3–4",
      body: "Automated matching runs alongside your team's work until the results agree.",
    },
    {
      title: "Daily matching goes live",
      when: "Week 4 onwards",
      body: "Matching runs every day, exceptions go to your team, and we tune the rules as new cases appear.",
    },
  ],
  flow: [
    { label: "Payouts from your gateway", tool: "razorpay" },
    { label: "Bank statement pulled in" },
    { label: "Matched against your books", tool: "tally" },
    { label: "Exceptions flagged with reasons" },
    { label: "Daily summary to finance", tool: "gmail" },
  ],
  yourPart: {
    items: [
      "A 45-minute call about your accounts",
      "Read-only access to statements and gateways",
      "Your current matching rules and quirks",
      "Reviews during the parallel run",
    ],
    total: "About 4 hours in total",
  },
  ourPart: [
    "Matching rules for fees, refunds and splits",
    "Bank, gateway and accounting connections",
    "Exception queue and daily summaries",
    "Parallel run and sign-off",
    "Monitoring and rule updates",
  ],
  youGet: [
    "Daily automatic matching across bank, gateways and books",
    "A short list of exceptions, each with its reason",
    "A faster month-end close",
    "A complete, audit-ready matching log",
    "A monthly report on volumes matched and time saved",
  ],
  timeline: "Live in 4 weeks",
  savings: {
    volume: { label: "Transactions to match a month", unit: "transactions", min: 200, max: 100000, step: 200, value: 5000 },
    minutes: { label: "Minutes to match and check each", unit: "min", min: 0.5, max: 5, step: 0.5, value: 1.5 },
    automatedShare: 0.8,
    hourly: {
      inr: { value: 600, min: 200, max: 2500, step: 50 },
      usd: { value: 45, min: 20, max: 150, step: 5 },
    },
    assumptions: [
      "About 80% of matching work is automated; your team reviews the exceptions.",
      "Accounts staff cost more per hour than general staff, so the starting rate here is higher.",
      "It leaves out money recovered from missed payouts and duplicate refunds.",
    ],
  },
  useCases: [
    {
      title: "Online and D2C brands",
      body: "Match gateway payouts, cash-on-delivery remittances and marketplace settlements to every order.",
      photo: photos.phoneShopping,
    },
    {
      title: "Accounting firms",
      body: "Reconcile client accounts faster and spend the time saved on advisory work.",
      photo: photos.accountsDesk,
    },
    {
      title: "Finance teams",
      body: "Daily bank reconciliation across multiple accounts and companies.",
      photo: photos.taxPaperwork,
    },
    {
      title: "Subscription businesses",
      body: "Match recurring charges, failed payments and refunds to each customer.",
    },
    {
      title: "Retail chains",
      body: "Reconcile card machines, UPI and cash deposits for every store.",
    },
    {
      title: "Distributors",
      body: "Match customer payments and credit notes against outstanding invoices.",
    },
  ],
  tools: ["razorpay", "stripe", "paytm", "tally", "zoho", "quickbooks", "xero", "googlesheets"],
  faqs: [
    {
      q: "Which banks and gateways can you connect?",
      a: "Most Indian and international banks, through statement downloads or bank feeds, plus Razorpay, Stripe, PayPal, Paytm, Cashfree and marketplace settlement reports.",
    },
    {
      q: "Does it work with Tally?",
      a: "Yes. We work with Tally, Zoho Books, QuickBooks, Xero and most accounting software, in the format your accountant already uses.",
    },
    {
      q: "Will it post entries in our books?",
      a: "Only if you want it to. Many teams start with matching and reports only, then allow approved entries to be posted automatically.",
    },
    {
      q: "How does it handle fees and partial payments?",
      a: "The rules account for gateway fees, taxes on fees, refunds, chargebacks and split or bundled payments. Anything it can't explain goes to your team.",
    },
    {
      q: "Is our financial data safe?",
      a: "Connections are read-only wherever possible, data stays in your accounts, and access is limited to the people you choose.",
    },
    {
      q: "What does it cost?",
      a: "We scope it after a free audit, based on your transaction volume and the systems involved. You get a fixed quote before any work starts.",
    },
  ],
  related: ["data-reporting-automation", "ai-process-automation", "custom-automations"],
};
