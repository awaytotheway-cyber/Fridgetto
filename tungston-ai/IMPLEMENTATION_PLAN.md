# AI Front Desk Repositioning — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Stop at every ⛔ checkpoint and wait for the founder.

**Goal:** Turn protomation.ai from a generic "seven AI services" agency site into a site for one product: **an AI front desk for high-ticket clinics**, with education as a second vertical. A clinic owner should understand the offer within 5 seconds and book a call.

**Architecture:** Same Next.js 16 app, design system and hosting. Copy moves into typed files under `src/content/`. The pricing maths and form schema are pure, unit-tested functions in `src/lib/`. Pages are server components that compose the existing sections; only the calculator, demo card, chat demo and form are client components. The old routes 308-redirect from one map in `src/redirects.ts`, and a script checks them.

**Tech Stack:** Next.js 16.4 (App Router, Cache Components), React 19.3, TypeScript, Tailwind 4, GSAP/Lenis (existing). New: `zod` (form validation), `@vercel/analytics` (cookieless analytics), `qrcode` (server-side QR SVG for the demo number), and `vitest` (dev only, unit tests).

**Spec:** the founder's brief, `PROTOMATION_WEBSITE_META_PROMPT.md` (kept outside this public repo), plus `AUDIT.md` (Phase 0) and the decision log below. The words go in `COPY.md`.

## Status — 14 Nov 2026

**Phases 2–5 are built**, on the branch, by the founder's instruction to "do the work yourself". The founder's open [CONFIRM] items were decided with sensible defaults; they are listed in `LAUNCH_CHECKLIST.md` §C so any of them can be changed. **Phase 6** shipped only `DEMO_AGENT_SPEC.md`. The optional 60-second callback is left out until TRAI/DLT rules are checked. **Phase 7** results are in `LAUNCH_CHECKLIST.md` §E. **Phase 8** (production) waits for explicit approval.

Changes from the plan below:
- **Analytics:** the founder is on Vercel's free plan, so events go to a first-party table (`protomation_site_events` via `/api/event`) instead of `@vercel/analytics`. There are still no cookies and nothing identifying.
- `scripts/check-copy.ts` and the demo-bot tests were added. `lib/care-plan-server.ts` keeps its own limiter; its notification uses the new webhook variable.
- The homepage's `DemoCallCard` renders nothing until a demo number or recording exists, so the secondary CTA is "See how it works" for now.

---

## Decision log (founder answers, 14 Nov 2026)

| Topic | Decision |
|---|---|
| Branch | `claude/protomation-ai-front-desk-j8lsmt`, used in place of the brief's `positioning-v2` until the work ships |
| Monthly plan | **One plan only: "Managed Front Desk", from ₹39,500/month, optional (recommended).** Research put ₹50,000 above what Indian clinics pay for managed front desks; see the chat summary. The ₹9,999 Care Plan comes off the site, and "maintenance is optional" in the Terms stays true. |
| Diagnostic | **₹15,000**, credited in full against a build started within 30 days. Whether GST is added is [CONFIRM]. |
| Build | from **₹2,00,000** one-time, single location; chains are quoted individually (unchanged from brief) |
| Usage | Call minutes, WhatsApp and AI usage are billed by the providers to the **client's own accounts**, so there is no minute allowance. This replaces the brief's "call-minute allowance"; [CONFIRM]. |
| Founding-client offer | **None** on the site |
| Pilot risk reversal | Suggested: the build is paid in two halves, and the second half is due only once the pilot hits the metric agreed in writing. [CONFIRM], wording in COPY.md |
| Response time | **"within 6 working hours (Mon–Sat, 10am–7pm IST)"**, everywhere. The hours themselves are [CONFIRM]. |
| Founder | **Pratik Naragude**, sole founder (replaces "Pratik V N"). The clay portrait stays as a placeholder until the photo arrives. |
| Team | **Shrawani, Design Analyst.** `/team` merges into `/about`. |
| Contact email | `hello@protomation.ai` doesn't exist yet. Keep the Gmail address in `site.config.ts` and switch it in one line when the mailbox exists. |
| WhatsApp | +91 74999 07619 (keep) |
| Calendar | none yet. "Book a free 20-min call" goes to `/contact` (form + WhatsApp). Setting `NEXT_PUBLIC_CALENDAR_URL` switches the embed on. |
| Analytics | ~~Vercel Web Analytics~~ → **first-party counts in Supabase** (`protomation_site_events`), because the founder is on the free plan. Cookieless, no banner. The Privacy Policy changed to match. |
| Supabase | The production project is in another account the founder will connect. New fields **extend `protomation_enquiries`**. `/security` names no region until it's verified. |
| n8n | The old webhook is dead. The form posts JSON to `N8N_LEAD_WEBHOOK_URL`, and when that's unset it is skipped. The hard-coded URL is deleted. |
| Education reach | No country list. Say it's available worldwide (wording in COPY.md). |
| Location | "Mumbai, India · working with clients worldwide" |
| `/login` | Behaviour unchanged. The link and account menu move to the footer. The Care Plan checkout UI comes off the site; its API routes, `lib/care-plan*` and `care_subscribers` stay dormant and untouched (listed in the Backlog). |
| Homepage final CTA | The CTA pair only, with no embedded form. The form lives on `/contact`, which keeps homepage JavaScript down. |
| `DemoCallCard` | Built in **Phase 3**, because the homepage needs it. Phase 6 keeps the agent spec and the optional callback. |

## Global Constraints

- Never push to `main` or deploy to production without explicit founder approval. Small commits, at least one per phase.
- Read `node_modules/next/dist/docs/` before writing a route, config or metadata API (Next 16 differs from older versions; middleware is `src/proxy.ts`).
- Never delete a public route without a redirect. Every old URL in the redirect map returns 308 to its new home.
- Copy is taken from `COPY.md` once approved, and lives in `src/content/*.ts`, not in JSX.
- Banned words in visitor-facing copy: "AI agents", "autonomous", "agentic", "revolutionise", "cutting-edge", "leverage", "unlock", "seamless".
- Spelling is Indian English (British forms: organise, centre, enrolment, counselling). Money is ₹ with Indian grouping via `inr()`: ₹2,00,000, or "₹2 lakh" in running text.
- No fabricated testimonials, logos, client counts, results or certifications. Every number is real, labelled "illustrative estimate", labelled "Sample", or cited.
- Compliance wording: "built to support DPDP Act compliance". Never "certified". Never mention HIPAA compliance.
- Languages claim: "Hindi, Marathi and English (more on request)". "30+ languages" is removed everywhere.
- The CTA pair at the foot of every page: primary "Book a free 20-min call" → `/contact`. Secondary is "Call our demo front desk" if `NEXT_PUBLIC_DEMO_PHONE` is set, otherwise "See how it works" → `/how-it-works`.
- Prices come from one place (`src/content/pricing.ts`): Diagnostic ₹15,000 · Build from ₹2,00,000 · Managed Front Desk from ₹39,500/month (optional).
- Canonical host stays `https://www.protomation.ai`.
- Mobile Lighthouse targets on `/` and `/clinics`: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- Keep the brand (dark theme, filament red for CTAs, volt yellow focus rings, monospace eyebrows, dot grid). Keep the reduce-motion toggle working.
- Never commit secrets. Server-only values never use the `NEXT_PUBLIC_` prefix.

## Review Focus

1. **Calculator with empty, zero, negative, huge or non-numeric inputs** (and average value 0). Expect no `NaN`, `Infinity` or negative output; break-even shows "—". Pinned in Task 3.1.
2. **Old URLs with a trailing slash, a query string or different case** (e.g. `/services/voice-agents/?utm_source=x`). Expect them to land on `/how-it-works?utm_source=x#voice` in at most two hops, with the query before the hash. Pinned in Task 2.1's route checker.
3. **Indian and international phone formats** (`+91 98765 43210`, `098765-43210`, `9876543210`, `+44 20 7946 0958`). Expect valid ones to be accepted and normalised to E.164, letters and short numbers to be rejected, and an unticked consent box to always be refused server-side. Pinned in Task 5.1.
4. **A demo phone number written with spaces or dashes** (e.g. `+91 22 4000 0000`). Expect `tel:` to use digits and `+` only. **No phone and no recording** hides the card and the secondary CTA becomes "See how it works". Pinned in Task 3.3.
5. **Lead delivery when one destination is missing** (no webhook URL, or Supabase down). If at least one works the visitor sees success, if both fail they see an error, and **the visitor never sees success when nothing was stored or sent**. Pinned in Task 5.2.

---

## File structure

**Create**

| Path | Responsibility |
|---|---|
| `src/redirects.ts` | the old→new redirect map (plain data, no imports), used by `next.config.ts` and the route checker |
| `scripts/check-routes.ts` | asserts redirects, new routes and sitemap URLs against a running server (`node scripts/check-routes.ts <baseUrl>`, Node ≥ 22.18 type stripping) |
| `scripts/check-copy.ts` | fails on banned words, "30+ languages", "certified", "HIPAA" or "$" prices in `src/content` and `src/lib/demo-bot.ts` |
| `src/content/{home,clinics,education,how-it-works,diagnostic,pricing,security,work,about,contact,faqs,calculator,seo}.ts` | the copy and data for each page, typed |
| `src/lib/calculator.ts` + `.test.ts` | missed-enquiry maths |
| `src/lib/demo-mode.ts` + `.test.ts` | decides the demo card's state |
| `src/lib/lead-schema.ts` + `.test.ts` | zod schema, phone normalisation |
| `src/lib/rate-limit.ts` + `.test.ts` | in-memory sliding window (moved from `care-plan-server.ts`) |
| `src/lib/lead-webhook.ts` | POST JSON to n8n |
| `src/lib/analytics.ts` | `trackEvent()` wrapper over `@vercel/analytics` |
| `src/lib/business-hours.ts` + `.test.ts` | IST business-hours check (Phase 6c) |
| `src/components/cta-pair.tsx` | the shared CTA pair |
| `src/components/demo-call-card.tsx` | demo call / recording / hidden |
| `src/components/calculator/missed-enquiry-calculator.tsx` | the calculator UI (client) |
| `src/components/lead-form.tsx` | the new qualifying form (client) |
| `src/components/calendar-embed.tsx` | iframe embed when `NEXT_PUBLIC_CALENDAR_URL` is set |
| `src/components/sample-report.tsx` | dummy monthly report, watermarked "Sample" |
| `src/components/case-study.tsx` | reusable, rendered nowhere until real data exists |
| `src/sections/home/{five-jobs,who-its-for,monthly,data-trust,calculator-section}.tsx` | new homepage sections |
| `src/sections/specialty.tsx` | one specialty block (flow, leaks, what it does, report), shared by `/clinics` and `/education` |
| `src/app/{clinics,education,how-it-works,diagnostic,security}/page.tsx` | new routes |
| `src/app/llms.txt/route.ts` | static plain-text summary |
| `supabase/2026-11-front-desk-leads.sql` | idempotent migration on `protomation_enquiries` |
| `vitest.config.mts` | `@/` alias, node environment |
| `DEMO_AGENT_SPEC.md`, `LAUNCH_CHECKLIST.md` | Phase 6 and Phase 7 deliverables |

**Modify:**
- `site.config.ts`
- `next.config.ts`
- `app/layout.tsx` (JSON-LD, title default, Analytics)
- `app/sitemap.ts`
- `app/page.tsx`
- `app/{pricing,work,about,contact,privacy,terms}/page.tsx`
- `app/actions.ts`
- `components/layout/{header,footer}.tsx`
- `components/chat-demo.tsx`
- `lib/demo-bot.ts`
- `lib/enquiry-store.ts`
- `lib/pricing.ts` (keep `inr`, `describeAmount`; drop the service data)
- `lib/legal.ts`
- `sections/{hero,why-now→leaks,process,live-demo,pricing,about,team,faq,final-cta,page-hero}.tsx`
- `sections/pricing-page/{pricing-hero,ownership,pricing-faq}.tsx`
- `.env.example`, `README.md`, `ASSETS.md`, `package.json`

**Delete** (once nothing imports them):
- `app/services/**`
- `app/team/page.tsx`
- `sections/{services,service-art,service-tools,works-with,marquee,results,savings-estimator}.tsx`
- `sections/pricing-page/{service-pricing,build-packages,estimator-section,care-plan,pricing-cta}.tsx`
- `components/pricing/*`
- `components/contact-form.tsx`
- `components/ui/tool-logo.tsx`
- `lib/{estimator,service-details,tools,tool-icons,n8n}.ts`
- `lib/tools.json`
- `scripts/make-tool-icons.mjs`
- unused `public/assets/service-*.webp` (Phase 7, after checking references)

**Untouched, dormant:**
- `app/api/{razorpay,stripe}/**`
- `lib/care-plan*.ts`
- `supabase/care_subscribers.sql`
- `app/login/**`
- `app/auth/**`
- `lib/supabase/**`
- `proxy.ts`

## Redirect map (`src/redirects.ts`, all `permanent: true` → 308)

| Old | New |
|---|---|
| `/services` | `/how-it-works` |
| `/services/voice-agents` | `/how-it-works#voice` |
| `/services/ai-agents` | `/how-it-works` |
| `/services/advanced-agents` | `/how-it-works` |
| `/services/workflow-automation` | `/how-it-works#integrations` |
| `/services/custom-automations` | `/how-it-works#integrations` (was a hop to workflow-automation; collapsed to avoid a chain) |
| `/services/website-chatbots` | `/how-it-works#chat` |
| `/services/content-automation` | `/how-it-works` |
| `/services/web-and-app` | `/` |
| `/team` | `/about` |

The bare-host → www rule in `next.config.ts` stays as it is.

## Lead data model (extends `public.protomation_enquiries`)

New nullable columns, added with `add column if not exists`:

| Column | Type | Notes |
|---|---|---|
| `business_type` | text | `ivf`, `derm-hair`, `dental`, `diagnostics`, `education`, `other` |
| `city` | text | |
| `monthly_enquiries` | text | `under-100`, `100-300`, `300-1000`, `over-1000`, `not-sure` |
| `consent` | boolean | not null, default false |
| `consent_at` | timestamptz | |
| `consent_text` | text | the exact sentence shown |
| `source_path` | text | the page the form was sent from |
| `utm_source`, `utm_medium`, `utm_campaign` | text | |

Other changes:
- `service` becomes **nullable** (the new form has no service field). Old rows are untouched.
- New `form_type` value: `front_desk_enquiry`.
- Check constraint: `form_type <> 'front_desk_enquiry' or (consent and consent_at is not null)`.
- RLS is unchanged (insert-only for `anon` and `authenticated`, no select).

## Environment variables (`.env.example` is rewritten in Task 5.2)

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | canonical URL (default www) |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | auth + insert-only leads |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | server | optional separate project for leads |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | public | Google sign-in (unchanged) |
| `N8N_LEAD_WEBHOOK_URL` | server | POST JSON lead notification; unset = skipped |
| `N8N_LEAD_WEBHOOK_SECRET` | server | sent as `x-protomation-secret` so n8n can reject strangers |
| `NEXT_PUBLIC_CALENDAR_URL` | public | Cal.com/Calendly link; unset = no embed |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | overrides `site.config.ts` |
| `NEXT_PUBLIC_DEMO_PHONE` | public | demo front desk number; unset = recording or hidden |
| `NEXT_PUBLIC_ENABLE_AI_CALLBACK` | public | `"true"` shows the 60-second callback form (off in production until TRAI/DLT is checked) |
| `N8N_CALLBACK_WEBHOOK_URL` | server | triggers the outbound caller |
| Razorpay / Stripe / `SUPABASE_SERVICE_ROLE_KEY` | server | dormant Care Plan checkout, documented under "Dormant" |

Removed: `CONTACT_WEBHOOK_URL`. `RESEND_API_KEY` in Vercel is unused; the founder can delete it.

**Preview deployments:** the founder adds the Supabase variables (and a test n8n webhook) to the **Preview** scope in Vercel before Phase 5 testing. Otherwise preview forms can't store anything.

---

## Phase 2 — Structure

### Task 2.1: Redirect map and route checker

**Files:**
- Create: `src/redirects.ts`, `scripts/check-routes.ts`
- Modify: `next.config.ts` (spread `legacyRedirects` into `redirects()`), `package.json` (`"check:routes": "node scripts/check-routes.ts"`)

**Interfaces:**
- Produces: `export const legacyRedirects: { source: string; destination: string; permanent: true }[]`, and `export const newRoutes: string[]` (`/`, `/clinics`, `/education`, `/how-it-works`, `/diagnostic`, `/pricing`, `/security`, `/work`, `/about`, `/contact`, `/privacy`, `/terms`, `/llms.txt`).

- [ ] **Step 1:** Write `src/redirects.ts` with the ten rows of the redirect map above.
- [ ] **Step 2:** Write `scripts/check-routes.ts`:
  - For each redirect, `fetch(base + source, { redirect: "manual" })` expects 308 and a `location` ending with the destination.
  - It repeats with a trailing slash and with `?utm_source=check` (following ≤2 hops) and expects the final URL to be `destination` with the query placed before `#`.
  - Each of `newRoutes` returns 200.
  - Every `<loc>` in `/sitemap.xml` returns 200.
  - It prints a table and exits 1 on any failure.
- [ ] **Step 3:** `npm run build && (npm start &) && npm run check:routes http://localhost:3000`. Expected now: redirects PASS, and the new routes fail with 404 because Task 2.3 hasn't run yet.
- [ ] **Step 4:** If Next puts the query after the fragment, switch those rows to a `proxy.ts` redirect that builds the URL correctly. Re-run until the redirect rows pass.
- [ ] **Step 5:** Commit: `Redirect the seven service pages and /team, with a route checker`

### Task 2.2: Site config, CTA pair, header and footer

**Files:**
- Modify: `src/site.config.ts`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`
- Create: `src/components/cta-pair.tsx`, `src/content/seo.ts`

**Interfaces:**
- Produces:
  - `siteConfig.nav` = Clinics, Education, How it works, Pricing, Work, About
  - `siteConfig.contact.responseTime: string`
  - `siteConfig.contact.location = "Mumbai, India · working with clients worldwide"`
  - `siteConfig.contact.bookingUrl = "/contact"`
  - `siteConfig.founder = { name, role, shortBio }`
  - `<CtaPair align?: "start" | "center" />` (reads `NEXT_PUBLIC_DEMO_PHONE` through `demoMode()` from Task 3.3; until then the secondary CTA is always "See how it works")

- [ ] **Step 1:** Update `site.config.ts` from COPY.md §Global: nav, `audiences` (IVF · Dermatology & Hair · Dental · Diagnostic labs), `headline` (the approved hero option), description, keywords, contact, founder.
- [ ] **Step 2:** Header:
  - Remove the Services mega-menu and `UserMenu`.
  - Desktop CTA "Book a free call".
  - The mobile menu lists the nav, the CTA and the WhatsApp link (no services list).
- [ ] **Step 3:** Footer:
  - Columns: Product (Clinics, Education, How it works, Diagnostic, Pricing, Security), Company (Work, About, Contact, Log in via `UserMenu`), Elsewhere (socials).
  - New one-line description.
  - Mumbai location.
  - Response time.
- [ ] **Step 4:** `CtaPair` uses `ButtonLink` (primary + ghost). The primary carries `data-event="cta_book_call"`, which Task 5.3 wires up.
- [ ] **Step 5:** `npm run lint && npm run typecheck`, both clean. Commit: `New navigation, footer and the shared CTA pair`

### Task 2.3: Route shells, sitemap, llms.txt, structured data

**Files:**
- Create: `src/app/{clinics,education,how-it-works,diagnostic,security}/page.tsx`, `src/app/llms.txt/route.ts`
- Delete: `src/app/services/**`, `src/app/team/page.tsx`
- Modify: `src/app/sitemap.ts`, `src/app/layout.tsx`, `src/content/seo.ts`

**Interfaces:**
- Consumes: `pageMetadata()` and `breadcrumbJsonLd()` (existing), `CtaPair`
- Produces: `seo: Record<RouteKey, { title: string; description: string }>` in `src/content/seo.ts` (titles and descriptions from COPY.md §Metadata)

- [ ] **Step 1:**
  - Each new page exports `pageMetadata(seo.<key>)`.
  - Each renders `<JsonLd data={breadcrumbJsonLd(...)} />`, `<PageHero>` with the COPY.md headline and lede, a "Coming in Phase 4" `sr-only` note (no visible placeholder text), and `<CtaPair />`.
- [ ] **Step 2:** `sitemap.ts` lists `newRoutes` minus `/llms.txt`. Priority 1 for `/`, 0.9 for `/clinics`, 0.8 for the rest, 0.3 for legal.
- [ ] **Step 3:** `llms.txt/route.ts` returns the COPY.md §llms.txt text with `content-type: text/plain; charset=utf-8`. It's static (`export const dynamic = "force-static"`; check the Next 16 docs for the Cache Components equivalent).
- [ ] **Step 4:** `layout.tsx` JSON-LD:
  - `ProfessionalService` with `areaServed: [{ "@type": "City", name: "Mumbai" }, { "@type": "Country", name: "India" }]`, `address` (Mumbai, IN), and `knowsAbout` from COPY.md.
  - The `hasOfferCatalog` gets two `Service` offers (AI front desk for clinics; AI front desk for education businesses, `areaServed: "Worldwide"`).
  - Default title "AI Front Desk for Clinics in India".
- [ ] **Step 5:** Build, start, `npm run check:routes http://localhost:3000`. Expected: **all rows PASS**, no 404.
- [ ] **Step 6:** Commit: `Add clinics, education, how-it-works, diagnostic and security routes; retire service pages`

### ⛔ Checkpoint 2

- Push the branch.
- Find the Vercel preview URL (`list_deployments` for project `tungston`, branch `claude/protomation-ai-front-desk-j8lsmt`).
- Report the route-checker table and screenshots of the header and footer at 390 px and 1440 px.

---

## Phase 3 — Homepage

### Task 3.1: Test runner and calculator maths (TDD)

**Files:**
- Create: `vitest.config.mts`, `src/lib/calculator.ts`, `src/lib/calculator.test.ts`, `src/content/calculator.ts`
- Modify: `package.json` (devDependency `vitest`; scripts `"test": "vitest run"`)

**Interfaces:**
- Produces:
  - `type CalculatorInputs = { enquiries: number; missedPct: number; bookingPct: number; conversionPct: number; avgValue: number }`
  - `calculate(inputs: CalculatorInputs, monthlyFee = MANAGED_FROM_INR): { patientsLost: number; revenueAtRisk: number; breakEvenPatients: number | null }`
  - `clinicPresets` and `educationPresets: Record<PresetId, { label: string; inputs: CalculatorInputs }>`
  - `MANAGED_FROM_INR = 39_500` exported from `src/content/pricing.ts` (created here, filled in Task 4.3)

- [ ] **Step 1: Write the failing tests:**

```ts
it("IVF preset", () => {
  const r = calculate({ enquiries: 300, missedPct: 30, bookingPct: 25, conversionPct: 20, avgValue: 160_000 });
  expect(r.patientsLost).toBeCloseTo(4.5);
  expect(r.revenueAtRisk).toBe(720_000);
  expect(r.breakEvenPatients).toBeCloseTo(0.246875);
});
it("never returns NaN, Infinity or negatives", () => {
  for (const bad of [NaN, -5, Infinity, 0]) {
    const r = calculate({ enquiries: bad, missedPct: bad, bookingPct: bad, conversionPct: bad, avgValue: bad });
    expect(Number.isFinite(r.revenueAtRisk)).toBe(true);
    expect(r.revenueAtRisk).toBeGreaterThanOrEqual(0);
  }
});
it("break-even is null when average value is 0", () => {
  expect(calculate({ enquiries: 100, missedPct: 10, bookingPct: 10, conversionPct: 10, avgValue: 0 }).breakEvenPatients).toBeNull();
});
it("percentages are clamped to 0–100", () => {
  expect(calculate({ enquiries: 100, missedPct: 150, bookingPct: 100, conversionPct: 100, avgValue: 1 }).patientsLost).toBe(100);
});
```

- [ ] **Step 2:** `npm test` fails (module not found).
- [ ] **Step 3:** Implement `calculate`. Inputs are sanitised first: non-finite or negative values become 0, percentages are clamped to 0–100, and enquiries are capped at 1,00,000. Then `revenueAtRisk = enquiries × missed × booking × conversion × avgValue`, and `breakEvenPatients = avgValue > 0 ? monthlyFee / avgValue : null`. Presets come from COPY.md §Calculator.
- [ ] **Step 4:** `npm test` passes.
- [ ] **Step 5:** Commit: `Missed-enquiry calculator maths, with presets and tests`

### Task 3.2: Calculator component

**Files:**
- Create: `src/components/calculator/missed-enquiry-calculator.tsx`, `src/sections/home/calculator-section.tsx`

**Interfaces:**
- Consumes: `calculate`, `clinicPresets`, `educationPresets`, `inr`
- Produces: `<MissedEnquiryCalculator vertical: "clinic" | "education"; initialPreset?: PresetId />`, which reads `?specialty=` on `/clinics` through the `initialPreset` prop from the page.

- [ ] **Step 1:** UI, reusing the field and slider styling patterns from `savings-estimator.tsx`:
  - Preset chips (radio group).
  - Five labelled number inputs, each paired with a range slider.
  - An output panel with `aria-live="polite"`.
  - A disclaimer and a CTA to `/diagnostic`.
  - Lakh/crore formatting.
  - "—" for null break-even.
- [ ] **Step 2:** Keyboard: chips use arrow keys, inputs have visible focus, and nothing is hover-only. At 360 px the inputs stack and nothing scrolls sideways.
- [ ] **Step 3:** Fire `trackEvent("calculator_used", { preset })` on the first change per page view. Make it a no-op until Task 5.3.
- [ ] **Step 4:** Manual check in a browser at 360 px and 1440 px, including keyboard-only use. Commit.

### Task 3.3: Demo card and the clinic chat demo

**Files:**
- Create: `src/lib/demo-mode.ts`, `src/lib/demo-mode.test.ts`, `src/components/demo-call-card.tsx`
- Modify: `src/lib/demo-bot.ts`, `src/components/chat-demo.tsx`, `src/sections/live-demo.tsx`, `src/components/cta-pair.tsx`, `package.json` (dependency `qrcode`, server-only, to draw the QR as SVG at build)

**Interfaces:**
- Produces: `demoMode({ phone?: string; hasRecording: boolean }): { kind: "call"; tel: string; display: string } | { kind: "recording" } | { kind: "none" }`.
- `hasRecording` is `fs.existsSync("public/audio/sample-call.mp3")`, checked in a server component at build time.

- [ ] **Step 1: Failing tests:**
  - `demoMode({ phone: "+91 22-4000 0000", hasRecording: true })` returns `{ kind: "call", tel: "tel:+912240000000", display: "+91 22-4000 0000" }`.
  - `demoMode({ phone: "  ", hasRecording: true })` returns `{ kind: "recording" }`.
  - `demoMode({ hasRecording: false })` returns `{ kind: "none" }`.
- [ ] **Step 2:** Run the tests and see them fail. Implement. Run them and see them pass.
- [ ] **Step 3:** `DemoCallCard`:
  - **Call:** a `tel:` button, a QR code (hidden below `md`), the languages, and the line "Takes about 2 minutes. Please don't share real medical details."
  - **Recording:** `<audio controls preload="none">` plus a transcript toggle (`<details>`), with the transcript from `src/content/home.ts`.
  - **None:** render nothing.
  - `CtaPair`'s secondary CTA follows `demoMode()`.
- [ ] **Step 4:** Rewrite the `demo-bot.ts` intents to the COPY.md §Chat demo script for "Protomation Demo Clinic (fictional)". Label the chat "Demo — fictional clinic".
- [ ] **Step 5:** `npm test` passes and `npm run check:copy` passes (create `scripts/check-copy.ts` here). Commit.

### Task 3.4: Homepage assembly

**Files:**
- Create: `src/content/home.ts`, `src/content/faqs.ts`, `src/sections/home/{five-jobs,who-its-for,monthly,data-trust}.tsx`
- Modify: `src/app/page.tsx`, `src/sections/{hero,why-now,process,live-demo,pricing,about,faq,final-cta}.tsx`
- Delete: `src/sections/{services,service-art,service-tools,works-with,marquee,results,savings-estimator}.tsx`, `src/lib/{estimator,tools,tool-icons}.ts`, `src/lib/tools.json`, `src/components/ui/tool-logo.tsx`, `scripts/make-tool-icons.mjs`

- [ ] **Step 1:** Section order, as in COPY.md §Home 1–13:
  1. Hero
  2. Leaks (`why-now.tsx`, data from `home.leaks`)
  3. FiveJobs
  4. LiveDemo (DemoCallCard + ChatDemo)
  5. CalculatorSection
  6. WhoItsFor
  7. Process (5 steps)
  8. Monthly
  9. DataTrust
  10. Pricing teaser (3 figures + link)
  11. About (founder note)
  12. Faq (`faqs.home`, FAQPage JSON-LD)
  13. FinalCta (CtaPair only)
- [ ] **Step 2:** Hero:
  - Eyebrow = audiences, headline from `siteConfig.headline`, the subhead.
  - `CtaPair`.
  - The "Works with your calendar, WhatsApp, phone line and CRM" line.
  - The dot grid stays.
  - The texture image still skips phones and reduced motion.
- [ ] **Step 3:** Delete the retired files. `npm run lint && npm run typecheck && npm test && npm run build` all pass with no unused-import warnings.
- [ ] **Step 4:** Commit: `Clinics-first homepage`

### ⛔ Checkpoint 3

- Push.
- Run mobile Lighthouse ×2 on the preview `/` (or local `npm start` if preview SSO blocks it) and report the scores.
- Send screenshots at 390 px and 1440 px.
- Report the DOM size against the Phase 0 baseline.

---

## Phase 4 — Inner pages

Each task: build the page from COPY.md, add its content file, set its metadata and JSON-LD (`Service` for the vertical pages, `FAQPage` where there are FAQs), end with `CtaPair`, then run `check:routes`, `check:copy`, lint, typecheck and build.

### Task 4.1: `/clinics` and `/education`
- Create `src/content/{clinics,education}.ts` and `src/sections/specialty.tsx`.
- `/clinics`:
  - Anchors `#ivf`, `#dermatology-hair`, `#dental`, `#diagnostic-labs`.
  - The calculator with `initialPreset` from `searchParams.specialty`, falling back to `ivf`. Reading `searchParams` makes the page dynamic under Cache Components, so wrap the calculator in `<Suspense>` with a static fallback (check the docs).
  - Clinic FAQ.
- `/education`:
  - The same `Specialty` block for the three education audiences.
  - The calculator with `vertical="education"`.
  - The worldwide line.
- Commit.

### Task 4.2: `/how-it-works` and `/diagnostic`
- `/how-it-works`:
  - Anchors `#voice`, `#chat`, `#integrations`, `#knowledge`, `#monitoring` (`scroll-margin-top` clears the fixed header).
  - The engagement process.
  - "What we need from you".
  - Reuse the voice and chatbot WebP renders if they fit; otherwise no images.
- `/diagnostic`:
  - What it is, what's included, the deliverable, timing, price and credit.
  - `trackEvent("diagnostic_view")` once on mount.
- Commit.

### Task 4.3: `/pricing`
- Fill `src/content/pricing.ts`: three cards, the USD line, pricing FAQs, ownership points.
- Rewrite `sections/pricing-page/{pricing-hero,ownership,pricing-faq}.tsx` to read from it.
- Delete `service-pricing`, `build-packages`, `estimator-section`, `care-plan`, `pricing-cta` and `components/pricing/*`.
- Slim `lib/pricing.ts` to `inr` and `describeAmount`.
- The homepage pricing teaser reads the same constants.
- Commit.

### Task 4.4: `/security`, `/work`, `/about`, `/contact`
- `/security`:
  - Renders only the COPY.md §Security items marked **TRUE TODAY**. Items still marked [CONFIRM] at build time are left out.
  - The "not legal advice" note.
- `/work`:
  - DemoCallCard and chat demo.
  - `SampleReport` with dummy data and a diagonal "SAMPLE" watermark, readable by screen readers as "Sample report, dummy data".
  - `CaseStudy` is exported but rendered nowhere.
  - The "Selected build" note only if the founder approves.
- `/about`:
  - Founder story, principles, and the reused `Team` section with Pratik Naragude (Founder) and Shrawani (Design Analyst).
  - `Person` JSON-LD moves here from `/team`.
- `/contact`:
  - Layout: form column, aside with WhatsApp, email, location, response time and "what happens on the call".
  - Keeps the current form until Task 5.3, with its response-time text fixed.
- Commit.

### Task 4.5: Privacy and Terms
- Update `src/lib/legal.ts` per COPY.md §Legal changes:
  - analytics
  - consent
  - WhatsApp
  - demo-line recordings
  - DPDP rights and grievance contact
  - Diagnostic and pilot payment terms
  - the Managed plan in place of the Care Plan
- Bump `siteConfig.legal.lastUpdated`.
- Add a visible "Draft — under legal review" note **only on the preview** (behind `VERCEL_ENV !== "production"`).
- Flag both documents for the founder's lawyer.
- Commit.

### ⛔ Checkpoint 4
- Push.
- Preview URL, screenshots of each page at 390 px, `check:routes` table, and the list of `/security` items held back for [CONFIRM].

---

## Phase 5 — Lead capture, booking, analytics

### Task 5.1: Lead schema (TDD)

**Files:**
- Create: `src/lib/lead-schema.ts`, `src/lib/lead-schema.test.ts`
- Modify: `package.json` (dependency `zod`, used server-side only)

**Interfaces:**
- Produces:
  - `businessTypes`, `enquiryRanges` (readonly tuples)
  - `type Lead = { name; businessName; businessType; city; monthlyEnquiries; phone /* E.164 */; email; message?; consent: true; consentAt: string; consentText: string; sourcePath; utm? }`
  - `parseLead(form: FormData, now: Date): { ok: true; lead: Lead } | { ok: false; errors: Partial<Record<keyof Lead, string>>; values: Record<string, string> }`

- [ ] **Step 1: Failing tests:**
  - Valid Indian numbers `+91 98765 43210`, `098765-43210` and `9876543210` all normalise to `+919876543210`.
  - `+44 20 7946 0958` normalises to `+442079460958`.
  - `abc123` gives an error.
  - Missing consent gives an error on `consent`.
  - Business type outside the list gives an error.
  - Email `a@b` gives an error.
  - A 5,000-character message is truncated to 2,000.
  - The honeypot field `website` filled is `{ ok: false }` with no field errors (the caller treats it as fake success).
- [ ] **Step 2:** Run the tests and see them fail. Implement with zod. A 10-digit number starting 6–9 gets `+91`, and a leading `0` is dropped. Run the tests and see them pass.
- [ ] **Step 3:** Commit.

### Task 5.2: Store, webhook, rate limit, server action

**Files:**
- Create: `src/lib/lead-webhook.ts`, `src/lib/rate-limit.ts` (+ test), `supabase/2026-11-front-desk-leads.sql`
- Modify: `src/lib/enquiry-store.ts` (`saveLead(lead: Lead): Promise<void>`), `src/app/actions.ts` (`submitLead(prev: LeadState, form: FormData): Promise<LeadState>`; delete `submitContact` and `submitQuote`), `src/lib/care-plan-server.ts` (keep its `rateLimited(req)` export, now a thin wrapper over `rateLimit`), `.env.example`
- Delete: `src/lib/n8n.ts`

**Interfaces:**
- Produces:
  - `notifyLead(lead: Lead): Promise<"sent" | "skipped">` (throws on a non-2xx response; 10 s timeout; header `x-protomation-secret` when set)
  - `rateLimit(key: string, opts: { max: number; windowMs: number }, now?: number): boolean` (true means blocked)
  - `deliverLead(lead, deps): Promise<"ok" | "failed">`, a pure orchestration with injected `save` and `notify` so it can be tested

- [ ] **Step 1: Failing tests:**
  - `rateLimit`: the 6th call within 10 minutes for the same key is blocked, and it is allowed again after the window.
  - `deliverLead`:
    - save ok + notify skipped → `"ok"`
    - save throws + notify sent → `"ok"`
    - save throws + notify skipped → `"failed"`
    - save throws + notify throws → `"failed"`
- [ ] **Step 2:** Run, implement, run.
- [ ] **Step 3:** `submitLead` does:
  1. honeypot check, then fake success
  2. a 3-second minimum fill time (hidden `startedAt`), then fake success
  3. `rateLimit(ip, { max: 5, windowMs: 600_000 })`, then the message "Too many attempts. Message us on WhatsApp instead."
  4. `parseLead`
  5. `deliverLead`
  6. success text with `siteConfig.contact.responseTime`
- [ ] **Step 4:** Write the SQL migration (data model above, idempotent, comments on each column). **Don't apply it until the founder connects the Protomation Supabase project**, then apply it with the Supabase connector and verify with `list_tables`.
- [ ] **Step 5:** Rewrite `.env.example` (table above). Commit.

### Task 5.3: Form, calendar, WhatsApp, analytics

**Files:**
- Create: `src/components/lead-form.tsx`, `src/components/calendar-embed.tsx`, `src/lib/analytics.ts`
- Modify: `src/app/contact/page.tsx`, `src/app/layout.tsx` (`<Analytics />` from `@vercel/analytics/next`), `src/components/cta-pair.tsx`, `src/components/demo-call-card.tsx`, the WhatsApp links, `src/lib/legal.ts` and the `content/faqs.ts` analytics answer (already rewritten in 4.5; verify)
- Delete: `src/components/contact-form.tsx`

**Interfaces:**
- Produces:
  - `type AnalyticsEvent = "cta_book_call" | "form_submit" | "demo_call_click" | "whatsapp_click" | "calculator_used" | "diagnostic_view"`
  - `trackEvent(name: AnalyticsEvent, props?: Record<string, string | number>): void` (swallows errors; no-op on the server)

- [ ] **Step 1:** The form is built with `useActionState(submitLead)` and works without JavaScript:
  - Fields: name, business name, business type, city, monthly enquiries (select of ranges), phone, email, optional message, and a required consent checkbox with the COPY.md wording.
  - Hidden fields: `startedAt`, `sourcePath`, UTM values read from the URL.
  - On success: `trackEvent("form_submit", { businessType })`.
- [ ] **Step 2:** `CalendarEmbed` renders a lazy `<iframe>` only when `NEXT_PUBLIC_CALENDAR_URL` is set, and otherwise renders nothing.
- [ ] **Step 3:** Wire up `cta_book_call` (CtaPair primary and the header CTA), `whatsapp_click`, and `demo_call_click`.
- [ ] **Step 4:** Founder enables Web Analytics on the `tungston` project in Vercel and confirms the plan (custom events need Pro).
- [ ] **Step 5:** Lint, typecheck, test and build. Commit.

### ⛔ Checkpoint 5
- On the preview (with Preview-scope env vars), submit three real test leads covering a valid lead, a lead with consent unticked, and a honeypot submission.
- Show the Supabase rows and the n8n notification (or "skipped" if no webhook yet).
- Show the visitor's confirmation, plus the analytics events in the Vercel dashboard if the plan allows.

---

## Phase 6 — Demo front desk

### Task 6.1: `DEMO_AGENT_SPEC.md`
Write the spec to the brief's 6(b) list:
- the fictional "Protomation Demo Clinic" persona and opening disclosure
- Hindi/Marathi/English with switching
- flows: book, FAQs, reschedule, human → message
- optional WhatsApp/SMS confirmation
- no medical advice
- 5-minute cap, daily minute cap, rate limits
- transcript auto-delete after [CONFIRM] days
- outcome logging
- the Indian inbound-number and KYC note

Commit.

### Task 6.2: Optional 60-second callback (flagged off)

**Files:**
- Create: `src/lib/business-hours.ts` (+ test), `src/app/api/callback/route.ts`
- Modify: `src/components/demo-call-card.tsx`

**Interfaces:**
- `isWithinBusinessHours(at: Date): boolean` (IST, Mon–Sat, 10:00–19:00)

- [ ] **Step 1:** Failing tests:
  - Mon 10:00 IST → true
  - Mon 09:59 IST → false
  - Sat 18:59 IST → true
  - Sun 12:00 IST → false
  - a UTC instant 04:30Z on a Monday (10:00 IST) → true
- [ ] **Step 2:** Run, implement, run.
- [ ] **Step 3:** The route returns 404 unless `NEXT_PUBLIC_ENABLE_AI_CALLBACK === "true"`. It validates name, phone and consent with the lead schema's pieces, rate-limits, refuses outside business hours with a friendly message, and POSTs to `N8N_CALLBACK_WEBHOOK_URL`.
- [ ] **Step 4:** The UI shows inside `DemoCallCard` only when the flag is on. **It stays off in production until the founder confirms TRAI/DLT rules have been checked.**
- [ ] **Step 5:** Commit.

### ⛔ Checkpoint 6
The demo card in all three states, shown by toggling the env var and the audio file locally, with screenshots.

---

## Phase 7 — QA and launch prep

- [ ] Mobile Lighthouse ×2 on `/`, `/clinics`, `/education`, `/how-it-works`, `/pricing`, `/contact`.
- [ ] Accessibility:
  - Keyboard walk-through of nav, calculator and form.
  - Contrast check of any new colour pairs.
  - Lighthouse accessibility = 100.
- [ ] Structured data:
  - Extract every JSON-LD block from the built pages and validate it parses as JSON with the expected `@type`s.
  - The founder runs Google's Rich Results Test on the preview.
- [ ] `check:routes` (redirects, routes, sitemap) and `check:copy` pass. A crawl of internal links from `/` finds no 404s.
- [ ] Real-phone check (Android Chrome, iOS Safari) by the founder; the checklist covers what to look at.
- [ ] Remove unused `public/assets/service-*.webp` and update `ASSETS.md` and `README.md` ("Where to change things").
- [ ] Write `LAUNCH_CHECKLIST.md`, including the final list of unverified claims and everything still marked [CONFIRM].

### ⛔ Checkpoint 7
The founder reviews the preview.

## Phase 8 — Production (only after explicit approval)

- [ ] Merge to `main`, either through a PR the founder approves or as the founder directs.
- [ ] Confirm the `tungston` production deployment is READY on www.protomation.ai.
- [ ] Run `npm run check:routes https://www.protomation.ai`.
- [ ] Submit one real form.
- [ ] Founder submits the sitemap in Google Search Console and requests re-indexing of `/`.

---

## Risks

| Risk | Mitigation |
|---|---|
| Losing search traffic from the seven indexed service pages | 308s to matching anchors, sitemap updated in the same deploy, re-index request in Phase 8 |
| Marathi voice quality on the chosen voice provider | "Hindi, Marathi and English" stays [CONFIRM] until a test call in Marathi passes |
| `/security` stating something not yet true | Only items marked TRUE TODAY render. The DPA template, retention period and breach-notice window are [CONFIRM]. |
| Custom analytics events silently dropped on the Hobby plan | The founder confirms the plan in Task 5.3. Page views work regardless. |
| Previews can't store leads (env vars are Production-only) | Preview-scope variables before Phase 5 |
| Query string placed after `#` in fragment redirects | Checked in Task 2.1; fall back to `proxy.ts` |
| Homepage main-thread and DOM growth | No form on the homepage; calculator is the only new client island; Lighthouse at every checkpoint |
| Lowering the retainer from the brief's ₹50,000 | Founder decision (research below the line); one constant in `src/content/pricing.ts` |
| This repo is public | Plan and copy docs are visible; competitor research stays in chat, not in files |
| Legal text | Privacy and Terms flagged for a lawyer before production |

## Backlog (not in this project)

- Specialty SEO pages: `/clinics/ivf`, `/clinics/dermatology-hair`, `/clinics/dental`, `/clinics/diagnostic-labs`
- Hindi version of key pages
- Real case studies through `CaseStudy`, once there's data and permission
- USD pricing page for international education clients
- Blog of clinic front-desk teardowns
- Decide the fate of the dormant Care Plan checkout, `/login` and `care_subscribers`. If they're removed, the layout's per-request `getUser()` and the proxy's cookie refresh can go too.
- Persistent rate limiting (Vercel Firewall rule or a Supabase table) if spam appears
- Move `hello@protomation.ai` in once the mailbox exists
