# Launch checklist

Everything here is on the branch `claude/protomation-ai-front-desk-j8lsmt`. Nothing is live on protomation.ai yet. Going live means merging to `main`, which only happens when you say so.

## A. Things only you can do (in order)

| # | What | Where | Why |
|---|---|---|---|
| ✅ 1 | ~~Create the tables~~ **Done 14 Nov.** `protomation_enquiries` and `protomation_site_events` are in the **DOST** Supabase project, insert-only. DOST's own tables, users and migration history are untouched. | — | — |
| ✅ 2 | ~~Connect previews~~ **Done.** `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (the DOST project) are set for **Preview** in Vercel. Sign-in still uses the main Protomation project. **At go-live I add the same two for Production.** | Vercel → Environment Variables | — |
| 2b | Delete the 3 test rows marked "TEST Claude (safe to delete)" / "TEST from Claude", or approve the delete when I run it | Supabase → Table editor | Left over from the end-to-end test |
| 3 | Send the new n8n webhook URL; I'll tell you where to put it | Vercel env `N8N_LEAD_WEBHOOK_URL` (+ `N8N_LEAD_WEBHOOK_SECRET`). The workflow's Webhook node must accept **POST** with a JSON body. | So you're notified about new leads. Without it, leads only sit in Supabase. |
| 4 | Turn off the old n8n webhook | n8n | It's public in this repo's history, so anyone can trigger it |
| 5 | Delete the unused `RESEND_API_KEY` | Vercel env | Nothing uses it |
| 6 | Read the site on your phone | the preview link | Check the wording and anything that feels wrong |
| 7 | Have a lawyer read `/privacy` and `/terms` | — | They now cover consent, DPDP rights, the diagnostic, two-part build payments and the Managed plan |
| 8 | Create a data processing agreement (DPA) template | — | The site promises one to every clinic. You must have it before the first client. |
| 9 | Optional: set up `hello@protomation.ai` | Google Workspace or Zoho Mail | Then change one line in `src/site.config.ts` |
| 10 | Optional: send a calendar link and your photo | — | The calendar appears on /contact; the photo replaces the illustration |

## B. Facts the site states that you must be able to back up

**Softened for launch (14 Nov), until you confirm them:** languages now read "Hindi or English, with Marathi on request"; "on the first ring" became "straight away"; "within a minute" became "within minutes"; "on your WhatsApp Business number" became "on WhatsApp once your WhatsApp Business account is connected". Once you've tested one of them, tell me and I'll restore the stronger wording.

- [ ] **Hindi, Marathi and English**, including switching mid-call. Test Marathi on your voice provider.
- [ ] Calls answered "on the first ring", and WhatsApp answered "in seconds".
- [ ] Missed-call callback and new-lead calls "within a minute".
- [ ] Calls can be transferred to the clinic's desk in clinic hours.
- [ ] Replies on the clinic's own **WhatsApp Business** number (this needs WhatsApp Business Platform access through a provider).
- [ ] Every call opens with the AI and recording disclosure.
- [ ] You don't use client or patient data to train AI models.
- [ ] Accounts are set up in the clinic's name wherever possible.
- [ ] "What we've already built" on /work: your outbound lead-qualification caller exists and works.
- [ ] Go-live in **3–5 weeks** after the diagnostic.

## C. Decisions I made for you (change any with one message)

| Decision | Where it lives |
|---|---|
| Hero headline: "Every Patient Enquiry Answered In **Seconds.** Every Consult Booked." | `src/site.config.ts` |
| Diagnostic **₹15,000**, credited if the build starts within 30 days, non-refundable once test calls start | `src/content/pricing.ts`, `src/lib/legal.ts` |
| Managed Front Desk **₹39,500/month**, optional, month to month, 30 days' notice | `src/content/pricing.ts` |
| Build paid in two halves; the second half is due when the pilot hits the agreed metric | `src/content/home.ts`, `src/content/pricing.ts`, Terms |
| Every build includes 30 days of fixes after go-live | `src/content/pricing.ts`, Terms |
| "Prices exclude GST where applicable" | `src/content/pricing.ts` |
| Working hours: Mon–Sat, 10am–7pm IST | `src/site.config.ts` |
| Diagnostic report within 7 working days | `src/content/diagnostic.ts` |
| Unconverted enquiries deleted after 12 months | Privacy Policy |
| Calculator presets (illustrative, sources in the file) | `src/content/calculator.ts` |
| Founder bio, version A | `src/content/about.ts` |
| Button counts in your own Supabase instead of Vercel Analytics (free plan) | `src/lib/analytics.ts` |
| Care Plan (₹9,999) taken off the site; its checkout code kept, switched off | `src/app/api/{razorpay,stripe}` |

## D. Held back from /security until verified

None of these are on the page yet. Tell me when one is true and I'll add it.
- Where data is stored (Supabase region): not visible to me yet
- Encryption at rest, per provider
- A fixed retention period for recordings (the page currently says "you choose")
- A fixed breach-notice window (the page currently says "promptly")
- Two-factor authentication on every account

## E. Checks run on this branch

| Check | Result |
|---|---|
| `npm run lint` | pass |
| `npm run typecheck` | pass |
| `npm test` (calculator, lead form, rate limit, demo chat, demo card) | 36/36 pass |
| `npm run check:copy` (banned words, "30+ languages", $ prices, certification claims) | pass |
| `npm run check:routes` (10 old URLs redirect, also with `/` and `?query`; 14 pages; 12 sitemap URLs) | 47/47 pass |
| Every page at 390 px and 1440 px: no sideways scroll, no console errors | pass |
| Form: missing consent refused, answers kept after an error, valid lead accepted | pass |
| Mobile Lighthouse, local build (no compression, so pessimistic): `/` | 94 · 100 · 100 · 100 |
| Mobile Lighthouse, local build: `/clinics` | 95 · 100 · 100 · 100 |

Still to do on a real phone (you): Android Chrome and iPhone Safari. Tap through the menu, the calculator, the WhatsApp link and the form.

## F. Going live (when you say so)

1. Merge the branch into `main` (I can open the pull request).
2. Vercel deploys production. Then run `npm run check:routes https://www.protomation.ai` and send one real lead.
3. In Google Search Console, submit `https://www.protomation.ai/sitemap.xml` and request indexing of `/` and `/clinics`.
