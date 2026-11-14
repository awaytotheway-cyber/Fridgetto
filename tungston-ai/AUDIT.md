# Phase 0 — Repo audit (protomation.ai)

Date: 14 November 2026. Read-only: the only file this phase adds is this one.
Scope: everything in section 9, Phase 0, of the repositioning brief.

---

## 1. Summary

The codebase is in good shape. Build, lint and typecheck all pass. Mobile Lighthouse on the live site is 91–97 for performance and 100 for accessibility, best practices and SEO. Copy, prices and calculator inputs already live in typed data files, and the form already writes to Supabase (insert-only RLS) and n8n. Most of the reposition is a change of **content and structure**, not of engineering.

The brief and the repo disagree in places. Six of these need a founder decision before Phase 1. They are listed in full in §17.

1. **The "3D" is not 3D.** There is no React Three Fiber, Three.js or Framer Motion. The chrome and glass visuals are static WebP renders. The motion comes from a hand-written canvas dot grid, CSS, GSAP and Lenis. All of it is already lazy-loaded and switched off when motion is reduced, so Phase 7's "make the 3D light" is mostly done already.
2. **The retainer conflicts with the Terms.** The site and the Terms of Service say ongoing maintenance is **optional and never required**. A ₹9,999/month "Care Plan" exists, with Razorpay and Stripe checkout code. The brief makes a ₹50,000/month retainer **required with every build**.
3. **"Solo founder" conflicts with `/team`.** The live site names two people: Pratik V N (Orchestrator) and Shrawani (Designer).
4. **Analytics conflicts with a published promise.** The Privacy Policy (`src/lib/legal.ts:78`) and a homepage FAQ (`src/lib/content.ts:250`) both say there is *no analytics and no tracking*. Adding the brief's analytics events means changing both.
5. **The Supabase region couldn't be checked.** The Supabase account connected to this session doesn't contain the Protomation project. Its two projects are other apps, both in `ap-southeast-1` (Singapore). The Protomation project's region needs checking before `/security` says anything about where data lives.
6. **A webhook URL is committed in a public repo.** `src/lib/n8n.ts` hard-codes the production n8n webhook, and `CONTACT_WEBHOOK_URL` is not set in Vercel, so production uses that committed URL. Anyone can trigger the email workflow with it. The README already flags this. It needs rotating.

---

## 2. Repo layout

- The git repo is **`Fridgetto`**, a monorepo of independent projects. The website is the folder **`tungston-ai/`**. Every command and path in this audit is relative to that folder.
- 86 commits. `main` was last updated 12 Nov 2026 (PR #27), and the live site matches `main`.
- **Branch:** this session is required to develop on **`claude/protomation-ai-front-desk-j8lsmt`**, not `positioning-v2` as the brief says. Same purpose: a separate branch, never `main`. I'll use it unless you want it renamed.
- `AGENTS.md` warns that Next 16 differs from older Next.js and that its bundled docs (`node_modules/next/dist/docs/`) should be read before writing code. I'll follow that.
- Existing planning docs: `README.md` (thorough and current), `ASSETS.md` (image sources and prompts), and `plan.md` (the previous conversion pass, marked done).

## 3. Stack and versions

| Item | Version or detail |
|---|---|
| Next.js | **16.4.2** (Turbopack, `cacheComponents: true`, `partialPrefetching: true`) |
| React / React DOM | 19.3.0 |
| TypeScript | 5.x, strict |
| Tailwind CSS | 4 (tokens in an `@theme` block in `src/app/globals.css`, no `tailwind.config`) |
| Animation | GSAP 3.15 (ScrollTrigger, SplitText), loaded on demand; Lenis 1.3 for smooth scroll |
| Icons | lucide-react |
| Auth and data | @supabase/ssr 0.12, @supabase/supabase-js 2.119 |
| Fonts | Clash Display + General Sans (Fontshare), self-hosted with `next/font/local`, downloaded at build by `scripts/fetch-fonts.mjs` |
| Node | Vercel runs 24.x; `engines` is >=20.9; this container is 22.23 |
| Browserslist | Chrome/Edge/Firefox ≥100, Safari/iOS ≥15.4, Samsung ≥19 (chosen to drop polyfills) |
| Tests | **None.** No test runner is configured. |

## 4. Router

**App Router** (`src/app/`). There is no `pages/` directory. Next 16 renamed middleware to **`src/proxy.ts`**. It refreshes the Supabase session cookie on every request.

Current routes (from the build output):

| Route | Render | Notes |
|---|---|---|
| `/` | static | homepage |
| `/services`, `/services/[slug]` ×7 | static / partial prerender | `generateStaticParams` from `services` in `content.ts` |
| `/pricing`, `/work`, `/about`, `/team`, `/contact`, `/privacy`, `/terms` | static | |
| `/login` | dynamic | Supabase auth (see §12) |
| `/auth/callback` | dynamic | OAuth code exchange |
| `/api/razorpay/subscribe`, `/api/razorpay/webhook`, `/api/stripe/checkout`, `/api/stripe/webhook` | dynamic | Care Plan subscriptions (not switched on, see §13) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, icons | generated | |

There is no `/llms.txt`.

## 5. Component inventory

These are my verdicts for the reposition, to be confirmed in the Phase 1 plan.

**Reuse as is (design system):**

| Component | Path | Use |
|---|---|---|
| `Button`, `ButtonLink` | `components/ui/button.tsx` | every CTA (primary/ghost, sizes, optional magnetic effect) |
| `SectionIntro` | `components/ui/section-intro.tsx` | section headings |
| `FaqList`, `faqJsonLd` | `components/ui/faq-list.tsx` | every FAQ, plus FAQPage JSON-LD |
| `PageHero` | `sections/page-hero.tsx` | inner-page heroes |
| `JsonLd` | `components/json-ld.tsx` | structured data |
| `pageMetadata`, `breadcrumbJsonLd` | `lib/seo.ts` | per-page title, description, canonical, OG |
| `Logo`, `WhatsAppIcon` | `components/ui/` | |
| `LegalDocument` | `sections/legal-document.tsx` | `/privacy`, `/terms`, and could render `/security` |
| `RevealText`, `Magnetic`, `TiltCard`, `Cursor`, `Preloader`, `SmoothScroll`, `MotionToggle` | `components/fx/` | motion layer, already accessible |
| `DotGrid` + `RippleField` | `components/fx/dot-grid.tsx`, `lib/ripple-field.ts` | hero canvas and footer wordmark |
| `inr()` | `lib/pricing.ts` | ₹ with Indian digit grouping (₹2,00,000) |

**Reuse with new content or light changes:**

| Component | Becomes |
|---|---|
| `Header` (`components/layout/header.tsx`) | new nav, drop the Services mega-menu, move "Log in" to the footer |
| `Footer` | new link columns (Clinics, Education, How it works…), Mumbai, Log in |
| `WhyNow` (`sections/why-now.tsx`) | "Where enquiries leak" (the same "moment → without → with" layout the brief asks for) |
| `Process` (`sections/process.tsx`) | "How we work" (call → diagnostic → pilot → live → managed) |
| `LiveDemo` + `ChatDemo` + `lib/demo-bot.ts` | clinic-receptionist chatbot demo, labelled "Demo — fictional clinic" |
| `Faq` (`sections/faq.tsx`) | clinic FAQ |
| `FinalCta` | the shared CTA pair at the foot of every page |
| `ContactForm` + `app/actions.ts` | the new qualifying form with consent (see §8) |
| `About` (`sections/about.tsx`) | founder note |
| `Pricing` (`sections/pricing.tsx`) | pricing teaser (Diagnostic · Build · Managed) |
| `SavingsEstimator` (`sections/savings-estimator.tsx`, 518 lines) | its sliders, formatting and result-panel patterns get reused for the **missed-enquiry calculator**; its maths (`lib/estimator.ts`) is retired |

**Retire (with redirects):**

| Component | Why |
|---|---|
| `Services` bento + `ServiceArt` + 7 service images | the 7 services are no longer sold separately |
| `app/services/[slug]/page.tsx` + `lib/service-details.ts` (540 lines) | replaced by `/how-it-works` anchors. Some copy (voice, chat, integrations) is worth mining. |
| `ServiceTools`, `WorksWith` logo wall, `lib/tools*.{ts,json}`, `scripts/make-tool-icons.mjs` | replaced by one line: "Works with your calendar, WhatsApp, phone line and CRM" |
| `Marquee` | lists the old services |
| `Results` + `useCases` | e-commerce and medical-research use cases are out of scope |
| Pricing page sections: `ServicePricing`, `BuildPackages`, `EstimatorSection` + `components/pricing/estimator.tsx` + `QuoteModal` | replaced by three "starting from" cards |
| `CarePlan` + Razorpay/Stripe routes + `lib/care-plan*.ts` + `care_subscribers.sql` | **your decision** (§17, Q1) |
| `Team` section and `/team` | merged into `/about`, **your decision** on who appears (§17, Q2) |

## 6. Styling and design tokens

- Tailwind 4 with tokens in `@theme`, `src/app/globals.css:27`:
  - Surfaces: `void #050505`, `carbon #0c0c0d`, `graphite #151517`
  - Text: `bone #f3f1ee`, `ash #9b9893`, `smoke #85827d`
  - Accents: `filament #e8101a` (red, CTAs), `filament-deep`, `signal #ff4a4f` (red for small text, AA-safe), `ember`, `volt #ffd400` (yellow, focus rings and highlights)
- Type scale: `text-hero`, `text-display`, `text-title`, `text-lede`, all fluid `clamp()`. Radii: `card` / `panel` / `field`. Shadows: `glow` / `glow-soft`.
- Helper classes: `.shell` (page container), `.ambient` (glow blobs), `.grain` (noise overlay), monospace eyebrow labels (`font-mono text-xs tracking-[0.2em] uppercase`).
- The canvas reads the colour tokens at runtime, so palette changes flow through.
- Earlier deliberate choice (`plan.md`): red is kept for CTAs, the logo and links, and taken off labels so the CTAs stand out. I'll keep that.

## 7. Where copy lives

The setup is already "content as data", so the brief's requirement is mostly met. It needs reorganising rather than inventing.

| File | Holds |
|---|---|
| `src/site.config.ts` | brand, URL, contact (email, WhatsApp, phone, location, booking URL), headline, audiences, nav, socials, legal facts |
| `src/lib/content.ts` | services, why-now, process, home FAQs, use cases, team, manifesto, principles |
| `src/lib/pricing.ts` (648 lines) | every price, estimator bands, packages, ownership points, pricing FAQs |
| `src/lib/care-plan.ts` | Care Plan price and benefits |
| `src/lib/service-details.ts` | long copy for the 7 service pages |
| `src/lib/estimator.ts` | savings-estimator rates and maths |
| `src/lib/demo-bot.ts` | scripted chatbot intents |
| `src/lib/legal.ts` | Privacy Policy and Terms text |
| JSX inline | some headings and leads, e.g. hero subhead, LiveDemo copy, FinalCta, page heroes, contact page aside |

Phase 1 proposal: one typed file per page or concern under `src/content/` (`home.ts`, `clinics.ts`, `education.ts`, `pricing.ts`, `calculator-presets.ts`, `faqs.ts`, `security.ts`). Inline JSX copy moves into these files so you can edit wording without touching components.

## 8. Current form backend

**Flow:** `ContactForm` → server action `submitContact` (`src/app/actions.ts`) → in parallel:
1. **n8n:** a `GET` request to the webhook, fields as query parameters, 20-second timeout. Blank optional fields are sent as `"Not provided"` because the workflow errors on empty fields. The workflow emails the enquiry on.
2. **Supabase:** a REST `POST` to `public.protomation_enquiries` with the publishable/anon key. RLS allows `INSERT` only, for `anon` and `authenticated`, and no `SELECT`. This already matches the brief's requirement.

The visitor sees an error only when **both** fail, and each failure is logged by name. A second form on `/pricing` (`submitQuote`, inside a modal) uses the same delivery path.

**What exists:** server-side validation (hand-written, not zod), a honeypot field (`website`), length caps, `aria-invalid` and inline errors, and a success state.

**What is missing for the brief:**
- consent checkbox, plus a stored consent flag and timestamp
- new fields: business type, city, monthly-enquiry range
- zod
- rate limiting (a simple in-memory limiter already exists in `lib/care-plan-server.ts:39` and could be reused, but it doesn't persist across serverless instances)
- a `POST` JSON webhook (`N8N_LEAD_WEBHOOK_URL`)
- calendar embed

**Table:** the brief says `leads`. My recommendation is to **extend `protomation_enquiries`** with new nullable columns, so the existing rows, n8n workflow and dashboard habits carry over. To be confirmed in Phase 1.

**Previews:** every Vercel env var is scoped to **Production only** (§13). On a preview deployment, Supabase isn't configured, so storage fails. The form then falls back to the **hard-coded production n8n webhook**, which means preview test submissions would email you like real enquiries. Phase 5 needs preview-scoped env vars or a separate test webhook.

## 9. Analytics

**None installed.** There is no Vercel Analytics, GA, Plausible or pixel, and the site makes a public point of it:
- `src/lib/legal.ts:78`: "There is no analytics, no advertising and no tracking pixels anywhere on this site."
- `src/lib/content.ts:250` (homepage FAQ): "…there is no analytics or tracking on it."
- Cookies are used only for sign-in (Supabase session).

Options for the brief's events (to decide in Phase 1, see §17, Q3):
- **Vercel Web Analytics:** cookieless, no consent banner needed. **Custom events need a Pro plan.** The Vercel team "awaytotheway-cyber's projects" looks like a personal account, and I couldn't see its plan. [CONFIRM]
- **Plausible:** cookieless, paid, custom events on all plans.
- **GA4:** free, but sets cookies, so it needs a consent banner and a heavier privacy-policy change.

Whichever is picked, the Privacy Policy and that FAQ answer must change in the same commit.

## 10. 3D and animation

- **No WebGL or 3D library.** The "glossy chrome/glass renders" are AI-generated **static WebP images** in `public/assets/` (source and prompts are in `ASSETS.md`), served through `next/image` with AVIF/WebP and blur placeholders.
- **Hero:** a custom 2D-canvas water-ripple dot grid (`lib/ripple-field.ts`, 622 lines). It sleeps when the surface is still, pauses off-screen or when the tab is hidden, caps the device pixel ratio at 2, uses auto-ripples on touch, and draws a still grid when motion is reduced. A hero texture image loads after first paint and is skipped on phones.
- **GSAP:** loaded on demand (`loadGsap()` / `whenNear()` in `lib/gsap.ts`), never on phones until scroll.
- **Preloader and hero intro:** pure CSS. The preloader is desktop-only, once per session.
- **Reduce-motion:** the footer `MotionToggle` sets `data-motion` before first paint, and Tailwind's `motion-reduce:` variant is rewired to follow it (`globals.css:12`). It works.
- **Implication for Phase 7:** nothing to move behind `next/dynamic`. The heavy bits are already deferred. The main cost on the homepage is main-thread work from hydrating a long page (see §15).

## 11. Existing redirects

1. `next.config.ts`: `/services/custom-automations` → `/services/workflow-automation` (permanent, 308).
2. `next.config.ts`: bare host → canonical host (`has: host`). This rule only applies if `NEXT_PUBLIC_SITE_URL` differs from the bare domain. It does, since it defaults to `https://www.protomation.ai`.
3. **Vercel domain level:** `protomation.ai` → `www.protomation.ai`, **308**. I checked this live.

Notes for Phase 2:
- **Canonical host is `www`.** `siteConfig.url`, the sitemap, robots, canonicals and JSON-LD all use `https://www.protomation.ai`. I'll keep that.
- Next.js `permanent: true` sends **308, not 301**. Search engines treat the two the same. The brief says 301; I'll use `permanent: true` (308) unless you want a literal 301.
- The fragment redirects (e.g. `/services/voice-agents` → `/how-it-works#voice`) need verifying in Phase 2. A `#` in a `Location` header is valid and browsers follow it, but I'll test it on the built output.

## 12. What `/login` does

- Supabase Auth: email and password sign-in and sign-up (with an email confirmation link), plus **Google sign-in** via Google Identity Services ID-token flow (`login/google-button.tsx`), with a fallback to the Supabase OAuth redirect.
- Once signed in, the header shows an initials avatar with a "Sign out" menu. **There is no dashboard or client area.**
- The only feature that uses auth is **Care Plan checkout**: `/api/razorpay/subscribe` and `/api/stripe/checkout` need a signed-in user so the subscription is tied to `auth.users`.
- The root layout calls `supabase.auth.getUser()` on every request, and the proxy refreshes the cookie. So `/login` matters only if the Care Plan stays. If it goes, `/login` has no purpose today.
- Per the brief, I won't change what `/login` does without asking. Moving the link to the footer is cosmetic.

## 13. Environment variables

| Variable | Read by code | In `.env.example` | Set in Vercel (Production) |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | yes | no (defaults to www) |
| `CONTACT_WEBHOOK_URL` | yes | yes | **no → uses the hard-coded webhook** |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | yes | yes | yes |
| `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` | yes | yes | no (optional) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | yes | yes | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | yes (webhooks) | yes | no |
| `RAZORPAY_KEY_ID`, `_KEY_SECRET`, `_WEBHOOK_SECRET`, `_PLAN_MONTHLY`, `_PLAN_YEARLY` | yes | yes | no |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | **yes** | **missing** | no |
| `STRIPE_SECRET_KEY`, `_WEBHOOK_SECRET`, `_PRICE_MONTHLY`, `_PRICE_YEARLY` | yes | yes | no |
| `RESEND_API_KEY` | **no (unused)** | no | **yes** |

**Conclusions:**
- **Care Plan checkout is not live.** No payment keys are set, so the pricing page shows "not switched on".
- `RESEND_API_KEY` is set but nothing reads it.
- Every variable is **Production-only**, so previews run without Supabase or Google sign-in.
- The brief adds: `NEXT_PUBLIC_DEMO_PHONE`, `NEXT_PUBLIC_CALENDAR_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `N8N_LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_ENABLE_AI_CALLBACK`.

## 14. Build and lint status (run in this session)

| Command | Result |
|---|---|
| `npm ci` | OK (383 packages; eslint 9 deprecation notice only) |
| `npm run lint` | **pass**, 0 problems |
| `npm run typecheck` | **pass** |
| `npm run build` | **pass**, 17.7 s, 32 static pages, fonts fetched from Fontshare |

## 15. Lighthouse (mobile) — live production

- **Setup:** Lighthouse 12.8.2, default mobile emulation (simulated slow 4G, 4× CPU slowdown), headless Chromium, run from a cloud container against `https://www.protomation.ai`. Two runs per page, because single runs vary.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` run 1 | 91 | 100 | 100 | 100 | 2.0 s | 360 ms | 0 |
| `/` run 2 | 93 | 100 | 100 | 100 | 2.8 s | 180 ms | 0 |
| `/services/voice-agents` run 1 | 95 | 100 | 100 | 100 | 2.5 s | 150 ms | 0 |
| `/services/voice-agents` run 2 | 97 | 100 | 100 | 100 | 2.5 s | 80 ms | 0 |

- **Homepage:** 481 KiB transferred, 4.5–5.2 s of main-thread work.
  - The LCP element is the hero subhead paragraph, not an image.
  - Flagged audits: unused JavaScript, legacy JavaScript, DOM size, main-thread work.
- **Voice page:** 446 KiB transferred. The LCP element is the service image.
- **Already meets the brief's targets** (Performance ≥85, Accessibility ≥95, Best Practices ≥95, SEO 100). The risk to watch in Phase 3 is DOM size and main-thread work: the new homepage spec also has 13 sections, so the rebuild must not grow the page.

## 16. Hosting (Vercel, checked read-only)

- **Project:** `tungston` (`prj_Khij3QBQ9PG9TF7jQdz96GQLkh27`), team "awaytotheway-cyber's projects", framework Next.js, Node 24.x.
- **Domains:** `www.protomation.ai` (primary), `protomation.ai` (308 → www), `tungston-two.vercel.app`.
- **Latest production deploy:** READY, 12 Nov 2026, matches `main`.
- **Deployment protection:** Vercel SSO on all deployments except custom domains. You can open previews while logged in to Vercel. I can't fetch them from here, so preview checks at each checkpoint are either yours or done against a local production build (`npm run build && npm start`) that I run and screenshot.

## 17. Decisions needed before Phase 1

| # | Question | Why it matters |
|---|---|---|
| Q1 | **Care Plan:** retire it (Care Plan section, Razorpay/Stripe routes, `care_subscribers`, and `/login`'s only purpose)? Or keep it hidden for existing subscribers? | The brief's required ₹50,000/month retainer contradicts the Terms ("maintenance is optional") and the ₹9,999 Care Plan. The Terms need rewriting either way. |
| Q2 | **Who appears on `/about`:** the founder only, or the founder plus Pratik V N and Shrawani as they appear today? Which of the two is the founder? | The brief says "solo founder… merge `/team` unless real team members exist." |
| Q3 | **Analytics:** Vercel Web Analytics (needs Pro for custom events), Plausible, GA4 (needs a cookie banner), or none for now? | Requires changing the "no analytics" promise in the Privacy Policy and FAQ. |
| Q4 | **Supabase:** which project and region does production use? Should new lead fields extend `protomation_enquiries` (my recommendation) or go into a new `leads` table? | `/security` may only state the region if it's true. The connected Supabase account can't see the Protomation project. |
| Q5 | **n8n webhook:** may I plan to switch the form to a new **POST** webhook (`N8N_LEAD_WEBHOOK_URL`, set only in Vercel) and remove the hard-coded GET URL? You would rotate the old path in n8n. | Security: the current URL is public in git history. |
| Q6 | **Branch:** OK to use `claude/protomation-ai-front-desk-j8lsmt` instead of `positioning-v2`? | This session can only push to that branch. |

Plus the founder inputs still marked `[CONFIRM]` in the brief:
- `CONTACT_EMAIL` (does `hello@protomation.ai` exist and receive mail?)
- `WHATSAPP_NUMBER` (the site currently shows +91 7499907619; keep it?)
- `CALENDAR_URL`
- `DIAGNOSTIC_PRICE_INR`
- `RESPONSE_TIME_PROMISE`
- `FOUNDER_NAME_BIO_PHOTO`
- `FOUNDING_CLIENT_OFFER`
- `PILOT_RISK_REVERSAL`
- whether the "India, UAE, UK and Australia" line on `/education` can stay

## 18. Claims and inconsistencies to fix (found in this audit)

| Issue | Where |
|---|---|
| "~4 HR RESPONSE" vs "within one business day" | `components/contact-form.tsx:75` vs `app/actions.ts:103`, `app/contact/page.tsx:13,23`, `sections/final-cta.tsx:21`, `components/pricing/quote-modal.tsx:212` |
| Gmail contact address (`protomation.services@gmail.com`, 20 times in the live homepage HTML) | `site.config.ts` `contact.email` |
| "30+ languages" / "Over 30 languages" | `lib/content.ts:53`, `lib/service-details.ts:109,126` |
| Demo chatbot quotes **USD** prices ("$2,900", "Growth retainer $4,500 a month") that match nothing on the site | `lib/demo-bot.ts:14` |
| Free audit described as a "45-minute call" (the new offer is a 20-minute call) | `lib/content.ts:203`, `lib/demo-bot.ts:26` |
| "Remote-first, working worldwide" and `areaServed: "Worldwide"` (the brief wants Mumbai/India) | `site.config.ts:56`, `app/layout.tsx:82`, `app/services/[slug]/page.tsx:68` |
| "Seven systems" framing | `header.tsx:167`, `sections/services.tsx:114`, `pricing-page/service-pricing.tsx:94`, `app/services/page.tsx:22` |
| About hero says "A small senior team of engineers and designers" | `app/about/page.tsx` |
| Final CTA headline "Your Competitors Are Already Using AI." (fear-led and generic) | `sections/final-cta.tsx` |
| "No analytics" promise (see §9) | `lib/legal.ts:78`, `lib/content.ts:250` |
| "Maintenance is optional" (contradicts the required retainer) | `lib/legal.ts:153`, `lib/pricing.ts` (house rules, FAQs, ownership points) |

**Good news on honesty:** an earlier pass already removed the invented case studies and hero stats (`plan.md`). There are no fake testimonials, logos or certification claims anywhere. The chatbot mentions "gdpr / hipaa / soc 2" only as keywords it recognises in a visitor's question, not as claims.

## 19. Risks noted for the plan

- **SEO equity:** the 7 service pages are indexed. They need 308s to the right anchors, and the sitemap has to drop them in the same deploy.
- **Next 16 specifics:** `proxy.ts` instead of `middleware.ts`, Cache Components, `LayoutProps` / `PageProps` globals. Check the bundled docs before writing routes.
- **Brand fonts are fetched at build.** A build machine without access to api.fontshare.com fails. Vercel is fine.
- **No test runner.** The calculator maths and the form schema are worth unit tests. Adding Vitest is a new dev dependency and will be justified in the plan.
- **`/login` with the Care Plan gone:** if Q1 is "retire", the layout's per-request `getUser()` and the proxy's cookie refresh become cost with no benefit. I'll propose a follow-up rather than change it silently.
