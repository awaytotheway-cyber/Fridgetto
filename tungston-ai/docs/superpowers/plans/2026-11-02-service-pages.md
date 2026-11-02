# Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Twelve statically generated service pages, a Services dropdown in the nav, a site-wide ₹/$ switch with market-specific savings, animated illustrations, real tool logos and Unsplash/AI Horde imagery.

**Architecture:** A light service *catalog* (names, groups, card data) feeds every place that lists services; a heavy *detail* file per service feeds one shared page template at `src/app/services/[slug]/page.tsx`. Money is rendered in both currencies and CSS shows the active one (`html[data-currency]`, set before paint); interactive parts read the same setting from a tiny external store. Illustrations are SVG/CSS, started by an in-view flag, finished-state under reduced motion.

**Tech Stack:** Next.js 16.4.2 (App Router, `cacheComponents: true`), React 19.3, TypeScript, Tailwind CSS 4, lucide-react, simple-icons 16.36.0 (new, CC0), Vitest (new, dev only).

**Spec:** `docs/superpowers/specs/2026-11-02-service-pages-design.md`

## Global Constraints

- All paths are relative to `tungston-ai/`. Run commands from there.
- `cacheComponents` is on, so `dynamicParams` is not available: unknown slugs are handled with `generateStaticParams` + `notFound()`.
- New dependencies: `simple-icons@16.36.0` (already installed) and dev-only `vitest`. Nothing else.
- Colours only from the `@theme` tokens in `src/app/globals.css` (`void`, `carbon`, `graphite`, `ash`, `smoke`, `bone`, `filament`, `filament-deep`, `signal`, `ember`, `volt`); small red text uses `signal`. Brand colours appear only inside tool logos.
- India hourly cost default **₹450** (range ₹150–2,000, step 50); US default **$35** (range $15–120, step 5). ₹ uses `en-IN` grouping (₹1,20,000).
- No prices on service pages. No testimonials. No invented client names. Every savings figure is labelled an estimate.
- Contact-form `value`s stay exactly as they are today (email template and n8n read them). Only the label "Lead to Speed Agent" becomes "Speed-to-Lead Agent".
- Copy: plain business language, benefit first, second person; a technical term only where buyers search for it, explained in the same sentence. One H1 per page.
- SEO: `seo.title` ≤ 48 characters (the layout appends " | Protomation"); `seo.description` 120–155 characters.
- Every animation has a finished, static state under `prefers-reduced-motion: reduce`. New illustrations do not load GSAP.
- `localStorage` access is always wrapped in try/catch; the page works without it.
- At 375px wide: no horizontal scroll on any page.

## Review Focus

1. **Storage blocked (Safari private mode), visitor in India.** Expect ₹ from the time zone and a working switch for the session, no thrown error. Test in Task 1 (`writeMarket` with a throwing storage; `detectMarket(null, "Asia/Kolkata")`).
2. **Server renders $, client is ₹.** Expect no hydration error in the console. Test in Task 12 (Playwright context `timezoneId: "Asia/Kolkata"`, console errors fail the run).
3. **Unknown or bad `?service=` on `/contact`.** Expect the placeholder option, no crash. Test in Task 3 (`resolveServiceParam`).
4. **Calculator at max sliders on a phone (₹ crores).** Expect compact money ("₹1.2Cr") and no overflow. Tests in Task 1 (compact format) and Task 12 (375px, max sliders, no horizontal scroll).
5. **Keyboard-only visitor in the dropdown.** Expect Tab reaches it, Enter/Space opens, Escape closes and returns focus to the button. Test in Task 10.

---

## File map

```
vitest.config.ts                                   test runner config (Task 1)
src/lib/currency.ts (+ .test.ts)                   markets, formatting, detection, store, boot script (Task 1)
src/components/currency/money.tsx                  <Money inr usd compact> dual render (Task 1)
src/components/currency/currency-switch.tsx        ₹/$ radio switch (Task 1)
src/components/currency/use-market.ts              useSyncExternalStore hook (Task 1)
src/lib/tools.ts (+ .test.ts)                      tool registry + logo colour rule (Task 2)
src/components/tool-logo.tsx                       <ToolLogo>, <ToolChip> (Task 2)
src/lib/services/types.ts                          all service types (Task 3)
src/lib/services/catalog.ts (+ .test.ts)           12 light entries, contact options, resolveServiceParam (Task 3)
src/lib/services/savings.ts (+ .test.ts)           savings maths (Task 3)
public/assets/service-<slug>.webp                  6 new renders (Task 4)
public/assets/services/<slug>-<n>.webp             Unsplash photos (Task 4)
src/components/illustrations/*.tsx, illustrations.css  animated illustrations (Task 5)
src/lib/services/jsonld.ts (+ .test.ts)            Service + FAQPage JSON-LD (Task 6)
src/lib/services/details/<slug>.ts                 one content file per service (Tasks 6–9)
src/lib/services/index.ts (+ details.test.ts)      detail registry: getService, allServices (Task 6)
src/sections/service-page/*.tsx                    page sections (Task 6)
src/app/services/[slug]/page.tsx                   route (Task 6)
src/components/layout/services-menu.tsx            dropdown + mobile accordion (Task 10)
```

---

### Task 1: Test runner and currency core

**Files:**
- Create: `vitest.config.ts`, `src/lib/currency.ts`, `src/lib/currency.test.ts`, `src/components/currency/money.tsx`, `src/components/currency/currency-switch.tsx`, `src/components/currency/use-market.ts`
- Modify: `package.json` (devDependency `vitest`, script `"test": "vitest run"`), `src/app/layout.tsx` (boot script), `src/app/globals.css` (currency visibility rules)

**Interfaces:**
- Produces (`src/lib/currency.ts`):
  - `type Market = "inr" | "usd"`
  - `type RateSpec = { value: number; min: number; max: number; step: number }`
  - `const MARKETS: Record<Market, { symbol: "₹" | "$"; locale: "en-IN" | "en-US"; label: string; hourly: RateSpec }>` — inr hourly `{ value: 450, min: 150, max: 2000, step: 50 }`, usd `{ value: 35, min: 15, max: 120, step: 5 }`; labels "India (₹)", "US & global ($)"
  - `const CURRENCY_KEY = "protomation:currency"`, `const CURRENCY_EVENT = "protomation:currency"`
  - `detectMarket(saved: string | null | undefined, timeZone: string | undefined): Market`
  - `formatMoney(amount: number, market: Market, opts?: { compact?: boolean }): string`
  - `readMarket(): Market` (from `document.documentElement.dataset.currency`, default `"usd"`)
  - `writeMarket(market: Market, storage?: Pick<Storage, "setItem"> | null): void` (sets the dataset, saves with try/catch, dispatches `CURRENCY_EVENT` on `window`)
  - `subscribeMarket(callback: () => void): () => void`
  - `const currencyBootScript: string` (inline IIFE: read storage in try/catch, `detectMarket`, set `data-currency`)
- Produces (components): `useMarket(): Market` (server snapshot `"usd"`); `<Money inr={number} usd={number} compact?: boolean />` (server-safe, renders two spans `data-cur="inr"` / `data-cur="usd"`); `<CurrencySwitch className? />` (client, `role="radiogroup"` with two `role="radio"` buttons labelled ₹ and $, `aria-label="Currency"`).

- [ ] **Step 1: Install Vitest and add config.** `npm i -D vitest`; `vitest.config.ts` aliases `@` to `./src`, sets `esbuild.jsx = "automatic"`, `test.include = ["src/**/*.test.{ts,tsx}"]`, environment `node`.
- [ ] **Step 2: Write failing tests** in `src/lib/currency.test.ts`:

```ts
expect(formatMoney(120000, "inr")).toBe("₹1,20,000");
expect(formatMoney(1400, "usd")).toBe("$1,400");
expect(formatMoney(63000.4, "inr")).toBe("₹63,000");
expect(formatMoney(12_000_000, "inr", { compact: true })).toBe("₹1.2Cr");
expect(formatMoney(1_240_000, "inr", { compact: true })).toBe("₹12.4L");
expect(formatMoney(240_000, "inr", { compact: true })).toBe("₹2,40,000");
expect(formatMoney(1_200_000, "usd", { compact: true })).toBe("$1.2M");
expect(formatMoney(240_000, "usd", { compact: true })).toBe("$240K");
expect(formatMoney(24_000, "usd", { compact: true })).toBe("$24,000");
expect(detectMarket("inr", "America/New_York")).toBe("inr");   // saved choice wins
expect(detectMarket("usd", "Asia/Kolkata")).toBe("usd");
expect(detectMarket(null, "Asia/Kolkata")).toBe("inr");
expect(detectMarket(undefined, "Asia/Calcutta")).toBe("inr");
expect(detectMarket("garbage", "Europe/London")).toBe("usd");
expect(detectMarket(null, undefined)).toBe("usd");
expect(MARKETS.inr.hourly.value).toBe(450);
// writeMarket survives a throwing storage (stub document/window with a minimal fake)
expect(() => writeMarket("inr", { setItem() { throw new Error("blocked"); } })).not.toThrow();
```

- [ ] **Step 3: Run** `npm test` — expect FAIL (module not found).
- [ ] **Step 4: Implement `src/lib/currency.ts`.** Compact thresholds: inr ≥ 1,00,00,000 → `₹x.xCr`, ≥ 10,00,000 → `₹x.xL`, else full; usd ≥ 1,000,000 → `$x.xM`, ≥ 100,000 → `$xxxK`, else full. One decimal, trailing `.0` dropped. Amounts round to whole units. `currencyBootScript` is built from the same constants (stringify the time-zone list and key) so it cannot drift from `detectMarket`.
- [ ] **Step 5: Run** `npm test` — expect PASS.
- [ ] **Step 6: Wire it up.** Add `currencyBootScript` as a second inline `<script>` in `<head>` in `layout.tsx`. In `globals.css`: `html:not([data-currency="inr"]) [data-cur="inr"], html[data-currency="inr"] [data-cur="usd"] { display: none; }`. Build `Money`, `useMarket`, `CurrencySwitch` (switch calls `writeMarket(next, safeLocalStorage())`).
- [ ] **Step 7: Verify** `npm run typecheck && npm run lint` pass.
- [ ] **Step 8: Commit** `feat: site-wide INR/USD market setting and money formatting`.

### Task 2: Tool logos

**Files:**
- Create: `src/lib/tools.ts`, `src/lib/tools.test.ts`, `src/components/tool-logo.tsx`

**Interfaces:**
- Produces: `type ToolId` (union of the keys below); `type Tool = { name: string; path?: string; hex?: string }`; `const tools: Record<ToolId, Tool>`; `logoColor(hex: string | undefined): string` (returns `#${hex}` when its contrast ratio against `#0c0c0d` is ≥ 3, else `"var(--color-bone)"`); `<ToolLogo id size? className? />` (24×24 viewBox SVG with `role="img"` and `aria-label={name}`, or a lucide `Puzzle` icon for tools without a path); `<ToolChip id />` (logo + name in a pill).
- Tool keys and Simple Icons exports: `whatsapp` siWhatsapp, `n8n` siN8n, `zoho` siZoho, `hubspot` siHubspot, `googlesheets` siGooglesheets, `gmail` siGmail, `googlecalendar` siGooglecalendar, `googledrive` siGoogledrive, `googleanalytics` siGoogleanalytics, `googleads` siGoogleads, `zapier` siZapier, `make` siMake, `shopify` siShopify, `razorpay` siRazorpay, `stripe` siStripe, `paytm` siPaytm, `quickbooks` siQuickbooks, `xero` siXero, `calendly` siCalendly, `elevenlabs` siElevenlabs, `claude` siClaude, `googlegemini` siGooglegemini, `meta` siMeta, `facebook` siFacebook, `instagram` siInstagram, `youtube` siYoutube, `mailchimp` siMailchimp, `notion` siNotion, `airtable` siAirtable, `wordpress` siWordpress, `nextdotjs` siNextdotjs, `react` siReact, `tailwindcss` siTailwindcss, `supabase` siSupabase, `vercel` siVercel. Name-only (no logo in Simple Icons): `slack` "Slack", `openai` "OpenAI", `salesforce` "Salesforce", `twilio` "Twilio", `linkedin` "LinkedIn", `canva` "Canva", `tally` "Tally", `excel` "Excel", `docusign` "DocuSign", `lookerstudio` "Looker Studio".

- [ ] **Step 1: Failing tests:** `tools.whatsapp.name === "WhatsApp"` and `tools.whatsapp.path` is a non-empty string; `tools.tally.path === undefined`; `logoColor("25D366") === "#25D366"`; `logoColor("0C2451") === "var(--color-bone)"` (Razorpay navy); `logoColor("000000") === "var(--color-bone)"`; `logoColor(undefined) === "var(--color-bone)"`.
- [ ] **Step 2: Run** `npm test` — FAIL.
- [ ] **Step 3: Implement** `tools.ts` (named imports from `simple-icons` only, so unused logos are not bundled) and `tool-logo.tsx` (server component).
- [ ] **Step 4: Run** `npm test` — PASS; `npm run typecheck`.
- [ ] **Step 5: Commit** `feat: tool registry with Simple Icons logos`.

### Task 3: Service catalog, savings maths, contact form

**Files:**
- Create: `src/lib/services/types.ts`, `src/lib/services/catalog.ts`, `src/lib/services/catalog.test.ts`, `src/lib/services/savings.ts`, `src/lib/services/savings.test.ts`
- Modify: `src/components/contact-form.tsx` (options from catalog; `defaultService?: string` prop; read `?service=` on mount), `src/lib/contact-email.ts` (labels from catalog), `src/sections/final-cta.tsx` (`service?: string` prop passed to `ContactForm`)

**Interfaces:**
- Consumes: `Market`, `RateSpec`, `MARKETS` (Task 1); `ToolId` (Task 2).
- Produces (`types.ts`):

```ts
export type ServiceGroup = "AI Automation" | "Custom Solutions" | "Web Development";
export type ServiceIcon = "bot" | "phone" | "chat" | "whatsapp" | "kanban" | "chart" | "file-check" | "receipt" | "timer" | "workflow" | "pen" | "monitor";
export type CatalogEntry = {
  slug: string; title: string; group: ServiceGroup; formValue: string;
  menuBlurb: string;                       // ≤ 60 chars
  icon: ServiceIcon;
  card: { hook: string; points: [string, string, string]; art: ServiceArt; image: string; imageAlt: string; size: "hero" | "wide" | "single" };
};
export type Photo = { src: string; alt: string; credit: { name: string; url: string } };
export type SliderSpec = { label: string; unit: string; min: number; max: number; step: number; value: number };
export type SavingsModel = { volume: SliderSpec; minutes: SliderSpec; automatedShare: number; hourly?: Partial<Record<Market, RateSpec>>; assumptions: string[] };
export type LiveVariant = "chat" | "call" | "pipeline" | "dashboard" | "ledger" | "documents" | "calendar" | "browser" | "workflow" | "tasks";
export type LiveItem = { label: string; meta?: string; from?: "them" | "us" };
export type ServiceDetail = CatalogEntry & {
  seo: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; title: string; lede: string; live: { variant: LiveVariant; title: string; tool?: ToolId; items: LiveItem[] } };
  highlight: { value: string; label: string };
  whatIs: { question: string; body: [string, string]; before: string[]; after: string[] };
  benefits: { title: string; body: string }[];              // exactly 4
  steps: { title: string; body: string; when: string }[];   // exactly 5
  flow: { label: string; tool?: ToolId }[];                 // 4–6
  yourPart: { items: string[]; total: string };
  ourPart: string[];
  youGet: string[];
  timeline: string;
  savings: SavingsModel;
  useCases: { title: string; body: string; photo?: Photo }[]; // exactly 6, exactly 3 with photo
  tools: ToolId[];                                          // 6–8
  faqs: { q: string; a: string }[];                         // 5–6
  related: [string, string, string];
};
```
  (`ServiceArt` is the existing union from `src/lib/content.ts`; move it into `types.ts` and re-export from `content.ts`.)
- Produces (`catalog.ts`): `const catalog: CatalogEntry[]` (12, in the spec's order); `catalogEntry(slug: string): CatalogEntry` (throws on unknown); `const serviceGroups: ServiceGroup[]`; `const contactOptions: { group: ServiceGroup | null; value: string; label: string }[]` (12 + `{ group: null, value: "not-sure", label: "Not sure what I need yet" }`); `serviceLabel(formValue: string): string`; `resolveServiceParam(value: string | null): string` ("" unless a known form value).
- Produces (`savings.ts`): `FTE_HOURS_PER_MONTH = 173`; `type SavingsInputs = { volume: number; minutes: number; hourly: number }`; `type SavingsResult = { hoursPerMonth: number; moneyPerMonth: number; moneyPerYear: number; fte: number }`; `hourlyRate(model, market): RateSpec`; `defaultInputs(model, market): SavingsInputs`; `computeSavings(model, inputs): SavingsResult`.

Catalog data (slug · title · group · formValue · icon · card size · card image):

| slug | title | group | formValue | icon | size | image |
| --- | --- | --- | --- | --- | --- | --- |
| ai-agent-development | AI Agent Development | AI Automation | ai-agent-development | bot | hero | /assets/service-ai-agents.webp |
| ai-voice-agents | AI Voice Agents | AI Automation | ai-voice-agents | phone | wide | /assets/service-voice-agents.webp |
| ai-website-chatbots | AI Website Chatbots | AI Automation | ai-website-chatbots | chat | single | /assets/service-website-chatbots.webp |
| whatsapp-automation | WhatsApp Automation | AI Automation | whatsapp-automation | whatsapp | single | /assets/service-whatsapp-automation.webp |
| crm-lead-automation | CRM & Lead Automation | AI Automation | crm-lead-automation | kanban | single | /assets/service-crm-lead-automation.webp |
| data-reporting-automation | Data & Reporting Automation | AI Automation | data-reporting-automation | chart | single | /assets/service-data-reporting-automation.webp |
| ai-process-automation | AI Process Automation | AI Automation | ai-process-automation | file-check | single | /assets/service-ai-process-automation.webp |
| finance-reconciliation-automation | Finance & Reconciliation Automation | AI Automation | finance-reconciliation | receipt | single | /assets/service-finance-reconciliation-automation.webp |
| speed-to-lead-agent | Speed-to-Lead Agent | AI Automation | lead-to-speed-agent | timer | single | /assets/service-speed-to-lead-agent.webp |
| custom-automations | Custom Automations | Custom Solutions | custom-automations | workflow | single | /assets/service-custom-automations.webp |
| content-automation | Content Automation | Custom Solutions | content-automation | pen | single | /assets/service-content-automation.webp |
| website-development | Websites & Landing Pages | Web Development | websites-landing-pages | monitor | wide | /assets/service-web-and-app.webp |

Card hooks and points for the five existing services carry over from `src/lib/content.ts`; write new ones for the rest in the same voice.

- [ ] **Step 1: Failing tests** (`catalog.test.ts`): 12 entries; slugs unique and equal to the table's order; `contactOptions.map(o => o.value)` equals today's 13 values (`ai-agent-development, ai-voice-agents, ai-website-chatbots, whatsapp-automation, crm-lead-automation, data-reporting-automation, ai-process-automation, finance-reconciliation, lead-to-speed-agent, custom-automations, content-automation, websites-landing-pages, not-sure`) in the same order; `serviceLabel("lead-to-speed-agent") === "Speed-to-Lead Agent"`; `resolveServiceParam("whatsapp-automation") === "whatsapp-automation"`; `resolveServiceParam("nope") === ""`; `resolveServiceParam(null) === ""`; every `menuBlurb.length <= 60`. (`savings.test.ts`): model `{ volume 3000, minutes 4, automatedShare 0.7 }` → `computeSavings(m, defaultInputs(m, "inr"))` gives `hoursPerMonth 140`, `moneyPerMonth 63000`, `moneyPerYear 756000`, `fte ≈ 0.809` (toBeCloseTo 3); with `usd` → `moneyPerMonth 4900`; a model with `hourly.inr = { value: 600, … }` → `defaultInputs(m, "inr").hourly === 600` and `defaultInputs(m, "usd").hourly === 35`.
- [ ] **Step 2: Run** `npm test` — FAIL.
- [ ] **Step 3: Implement** `types.ts`, `catalog.ts`, `savings.ts`.
- [ ] **Step 4: Run** `npm test` — PASS.
- [ ] **Step 5: Contact form.** Replace the local `SERVICE_OPTIONS` with `contactOptions`; `contact-email.ts` uses `serviceLabel`. Add a `selectRef`; on mount, if the form has no submitted value, set the select to `defaultService ?? resolveServiceParam(new URLSearchParams(location.search).get("service"))` when non-empty. Do **not** use `useSearchParams` (it would client-render the form).
- [ ] **Step 6: Verify** `npm run typecheck && npm run lint && npm test`.
- [ ] **Step 7: Commit** `feat: service catalog, savings maths, contact form preselect`.

### Task 4: Imagery

**Files:**
- Create: `public/assets/service-{whatsapp-automation,crm-lead-automation,data-reporting-automation,ai-process-automation,finance-reconciliation-automation,speed-to-lead-agent}.webp`, `public/assets/services/<slug>-{1,2,3}.webp` (36 photos)
- Modify: `ASSETS.md`

- [ ] **Step 1: Renders.** AI Horde, anonymous key `0000000000`, `Client-Agent` header set, a browser-like `User-Agent` (Python's default is refused with 403), model `AlbedoBase XL (SDXL)` (fallback `Juggernaut XL`), 1344×768 (fallback 1024×576), 30 steps. Prompt = the shared style prompt in `ASSETS.md` with these subjects, plus "Subject centered and compact in the middle third of the frame, wide empty pure black margins"; negative prompt "text, letters, watermark, logo, people, face, blurry, lowres":
  - whatsapp-automation: a glossy chrome smartphone at an angle with three frosted-glass chat bubbles rising from its screen, red light inside the bubbles, one tiny yellow notification dot
  - crm-lead-automation: glass cards sliding along a curved chrome rail into neat sorted columns, red light trails, the last card glowing yellow
  - data-reporting-automation: a bar chart of chrome columns rising from black glass with a thin red line graph floating above, its highest point a yellow dot
  - ai-process-automation: chrome document sheets gliding on a glass conveyor through a red scanning beam, one finished sheet with a yellow glow
  - finance-reconciliation-automation: two stacks of chrome coins and thin glass ledger slabs joined by red light threads that line up exactly, one yellow point where they meet
  - speed-to-lead-agent: a chrome stopwatch made of glass rings with a red light streak racing around it, the needle tip glowing yellow

  Generate up to three per subject; keep the one that is on-palette, centred and free of text. Convert with `sharp` to WebP quality 80.
- [ ] **Step 2: Photos.** For each service, three photos that show the people or setting of its use cases (Indian and global small and mid-size businesses: shop counters, clinic receptions, sales teams on phones, accountants, warehouses, marketing desks). Search with `mcp__Unsplash__search_photos` (`plus: "none"`), call `mcp__Unsplash__download_asset` for each chosen photo and fetch the URL it returns, resize to ≤ 1600px wide with `sharp`, WebP quality 72. Record photographer name and profile URL.
- [ ] **Step 3: Verify** every file opens, the renders are ≥ 1024px wide and each photo ≤ 400 KB (`ls -l`, `file`).
- [ ] **Step 4: ASSETS.md.** Add the six renders to the asset table with their subjects; add an "Unsplash photos" table (file, photographer, link); add "Tool logos: Simple Icons (CC0). Brand marks belong to their owners and indicate integrations only."
- [ ] **Step 5: Commit** `assets: service renders and Unsplash photos`.

### Task 5: Animated illustrations

**Files:**
- Create: `src/components/illustrations/in-view.tsx`, `live-panel.tsx`, `before-after.tsx`, `flow-pipeline.tsx`, `handoff.tsx`, `tool-connect.tsx`, `savings-meter.tsx`, `illustrations.css`, `illustrations.test.tsx`
- Modify: `src/app/globals.css` (`@import "../components/illustrations/illustrations.css";`)

**Interfaces:**
- Consumes: `LiveVariant`, `LiveItem` (Task 3); `ToolId`, `ToolLogo` (Task 2).
- Produces:
  - `<InView as?: "div" | "figure" className? threshold?=0.3>` — client; sets `data-inview="true"` once on first intersection; renders `data-inview="true"` immediately when `IntersectionObserver` is missing.
  - `<LivePanel variant title tool? items />` — `figure` with a `figcaption` of `title`; one layout per variant: `chat` (bubbles alternating by `from`, typing dots, loop), `call` (waveform + transcript lines), `pipeline` (cards moving across three columns), `dashboard` (bars growing, numbers ticking), `ledger` (rows matching with a check), `documents` (sheets passing a scan line, stamped), `calendar` (grid filling with posts), `browser` (page sections assembling), `workflow` (nodes lighting in sequence), `tasks` (list items checking off).
  - `<BeforeAfter before={string[]} after={string[]} />` — two panels headed "Today" and "With Protomation".
  - `<FlowPipeline nodes={{ label: string; tool?: ToolId }[]} />` — horizontal on ≥ 768px, vertical below; a pulse travels the connector.
  - `<Handoff yourItems={string[]} yourTotal={string} ourItems={string[]} timeline={string} />` — two lanes on one timeline.
  - `<ToolConnect tools={ToolId[]} center={string} />` — logos on a ring joined to a centre node by animated dashes.
  - `<SavingsMeter fraction={number} label={string} />` — client; arc fills to `fraction` (clamped 0–1).
- All illustrations: decorative motion inside `aria-hidden` layers; the text they show stays readable to screen readers (or the figure has an accessible `figcaption`). Animations only run under `[data-inview="true"]`; `@media (prefers-reduced-motion: reduce)` shows the end state.

- [ ] **Step 1: Failing smoke tests** (`renderToStaticMarkup`): each `LivePanel` variant renders its `title` and every item `label`; `FlowPipeline` renders every node label and a `ToolLogo` `aria-label` for nodes with a tool; `SavingsMeter` with `fraction={1.7}` renders the arc at 100% (assert the `--fill` style is `1`); `BeforeAfter` contains "Today" and "With Protomation".
- [ ] **Step 2: Run** `npm test` — FAIL.
- [ ] **Step 3: Implement** the components and `illustrations.css` (keyframes and `[data-inview]` rules).
- [ ] **Step 4: Run** `npm test` — PASS; `npm run typecheck && npm run lint`.
- [ ] **Step 5: Commit** `feat: animated illustrations for service pages`.

### Task 6: Page template, JSON-LD, first service (WhatsApp Automation)

**Files:**
- Create: `src/lib/services/jsonld.ts`, `src/lib/services/jsonld.test.ts`, `src/lib/services/details/whatsapp-automation.ts`, `src/lib/services/index.ts`, `src/lib/services/details.test.ts`, `src/sections/service-page/{hero,stats,what-is,benefits,how-it-works,parts,savings-calculator,use-cases,tools,faq,related}.tsx`, `src/app/services/[slug]/page.tsx`
- Modify: `src/lib/seo.ts` (`breadcrumbJsonLd(name, path, parent?: { name: string; path: string })`), `src/app/sitemap.ts`

**Interfaces:**
- Consumes: everything from Tasks 1–5.
- Produces: `getService(slug: string): ServiceDetail | undefined`; `allServices(): ServiceDetail[]` (catalog order); `serviceJsonLd(s): object` (`@type: "Service"`, `name`, `serviceType: s.title`, `description: s.seo.description`, `url`, `provider: { "@id": "<site>/#organization" }`, `areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"]`); `faqJsonLd(s): object` (`@type: "FAQPage"`, one `Question` with `acceptedAnswer` per FAQ); `<SavingsCalculator model={SavingsModel} title={string} />` (client).

Page composition (`page.tsx`): `generateStaticParams` returns the slugs of `allServices()` (so the build only prerenders pages whose content exists); `generateMetadata` uses `pageMetadata({ title: s.seo.title, description: s.seo.description, path })` plus `keywords`; the page awaits `params`, calls `notFound()` for an unknown slug, renders three `JsonLd` blocks (breadcrumb with parent Services, service, FAQ) then the sections in spec order, then `<FinalCta service={s.formValue} />`. The hero CTA links to `/contact?service=${s.formValue}`; the secondary link is `#savings`. A `<CurrencySwitch>` sits in the hero and again at the top of the calculator. The stats section computes `computeSavings` for both markets from `defaultInputs` and renders money with `<Money>`; the hours figure counts up with the existing `Counter`, the money figures rise in with CSS (they are dual text, so they are not counted). The calculator's `SavingsMeter` gets `fraction = Math.min(1, fte)` and the label `"<n>% of a full-time person's month"` when `fte < 1`, otherwise `"<fte to 1 decimal> full-time people's worth"`. Use cases with a photo render it with `next/image`, `grayscale` and a red-to-black overlay (`mix-blend-mode: multiply`). Only the hero render is `loading="eager"` with `fetchPriority="high"`. FAQ uses `<details>`/`<summary>`.

WhatsApp Automation pinned content (the other fields are written in-task under the Global Constraints):

| Field | Value |
| --- | --- |
| Search phrases | WhatsApp automation for business; WhatsApp Business API automation; WhatsApp chatbot India |
| live | `chat`, tool `whatsapp` |
| highlight | "Under 60s" · "reply time, day or night" |
| savings | volume "WhatsApp chats a month" 100–50,000 step 100, value 3,000; minutes "Minutes your team spends on each chat" 1–15 step 1, value 4; automatedShare 0.7 |
| tools | whatsapp, meta, razorpay, shopify, zoho, hubspot, googlesheets, n8n |
| related | ai-website-chatbots, crm-lead-automation, speed-to-lead-agent |
| photos | shop owner on a phone at a counter; clinic reception; delivery or warehouse team |

- [ ] **Step 1: Failing tests.** `jsonld.test.ts`: `serviceJsonLd(s)["@type"] === "Service"` and `provider["@id"]` ends with `/#organization`; `faqJsonLd(s).mainEntity.length === s.faqs.length`; `breadcrumbJsonLd("WhatsApp Automation", "/services/whatsapp-automation", { name: "Services", path: "/services" }).itemListElement.length === 3`. `details.test.ts`, for every service in `allServices()`: `benefits.length === 4`; `steps.length === 5`; `flow.length` 4–6; `useCases.length === 6` with exactly 3 photos; `faqs.length` 5–6; `tools.length` 6–8 and each is a key of `tools`; `related` are three catalog slugs, none equal to its own; `seo.title.length <= 48`; `seo.description.length` 120–155; `hero.title` is not empty; `card.image` and every photo `src` exist under `public/`; `computeSavings` with defaults gives `hoursPerMonth > 0` for both markets; no copy field contains "₹" or "$" followed by a digit (money only through `<Money>`).
- [ ] **Step 2: Run** `npm test` — FAIL.
- [ ] **Step 3: Implement** jsonld, seo change, `index.ts`, `whatsapp-automation.ts`, sections, route, sitemap (adds `/services/<slug>` for every catalog slug, priority 0.7).
- [ ] **Step 4: Run** `npm test` — PASS.
- [ ] **Step 5: Verify in the browser.** `npm run build` lists `/services/[slug]` with `/services/whatsapp-automation` prerendered. `npm start`; with Playwright at 1440px and 375px open `/services/whatsapp-automation`: no console errors, no horizontal scroll, the switch flips every `[data-cur]` figure and persists across reload, moving a calculator slider changes the result text, `/services/does-not-exist` returns 404. Screenshot desktop and phone for review.
- [ ] **Step 6: Commit** `feat: service page template with WhatsApp Automation`.

### Tasks 7–9: The other eleven services

Same files pattern: `src/lib/services/details/<slug>.ts` registered in `index.ts`; `details.test.ts` covers them automatically. Each task: write the content, run `npm test` (the detail tests are the failing test until the content meets them), open each new page in Playwright at 375px and 1440px (no console errors, no horizontal scroll), commit `feat: <names> service pages`.

**Task 9 also adds** a test to `details.test.ts`: `allServices().length === 12` and its slugs equal the catalog's — fails until the last file lands.

Pinned per-service data (savings = volume label · range · value | minutes label · range · value | share; hourly overrides where listed):

**Task 7**

| slug | search phrases | live | highlight | savings | tools | related |
| --- | --- | --- | --- | --- | --- | --- |
| ai-agent-development | AI agent development company; custom AI agents for business | tasks | "24/7" · "works nights, weekends and holidays" | "Repetitive tasks a month" 200–20,000 step 100 · 3,000 \| "Minutes each takes today" 1–30 · 6 \| 0.6 | claude, openai, googlegemini, hubspot, zoho, slack, gmail, n8n | ai-process-automation, crm-lead-automation, custom-automations |
| ai-voice-agents | AI voice agent for business; AI calling agent; AI receptionist | call | "2 rings" · "every call answered" | "Calls a month" 100–20,000 step 50 · 1,500 \| "Minutes per call, notes included" 2–15 · 5 \| 0.65 | twilio, elevenlabs, googlecalendar, calendly, hubspot, zoho, whatsapp, n8n | speed-to-lead-agent, ai-website-chatbots, crm-lead-automation |
| ai-website-chatbots | AI chatbot for website; website chatbot development | chat (no tool) | "Under 5s" · "first reply on your site" | "Website chats and enquiries a month" 100–20,000 step 100 · 2,000 \| "Minutes your team spends on each" 1–15 · 4 \| 0.7 | wordpress, shopify, nextdotjs, hubspot, zoho, googlesheets, calendly, whatsapp | whatsapp-automation, speed-to-lead-agent, website-development |
| crm-lead-automation | CRM automation; lead management automation; Zoho CRM automation | pipeline | "Same day" · "follow-up on every lead" | "New leads a month" 50–10,000 step 50 · 800 \| "Minutes spent entering, sorting and chasing each" 3–30 · 12 \| 0.6 | zoho, hubspot, salesforce, googlesheets, gmail, whatsapp, facebook, n8n | speed-to-lead-agent, whatsapp-automation, data-reporting-automation |

**Task 8**

| slug | search phrases | live | highlight | savings | tools | related |
| --- | --- | --- | --- | --- | --- | --- |
| data-reporting-automation | automated reporting; business reporting automation; MIS report automation | dashboard | "9 a.m." · "reports ready before you are" | "Reports your team builds a month" 5–500 step 5 · 40 \| "Minutes each report takes" 30–600 step 15 · 180 \| 0.8 | googlesheets, excel, lookerstudio, googleanalytics, zoho, hubspot, shopify, n8n | finance-reconciliation-automation, crm-lead-automation, custom-automations |
| ai-process-automation | AI process automation; business process automation; document processing automation | documents | "Hours, not days" · "for approvals and paperwork" | "Documents, forms and requests a month" 100–20,000 step 100 · 1,500 \| "Minutes each takes to read, check and route" 2–30 · 8 \| 0.65 | gmail, googledrive, googlesheets, zoho, slack, docusign, openai, n8n | finance-reconciliation-automation, ai-agent-development, custom-automations |
| finance-reconciliation-automation | reconciliation automation; bank reconciliation software; accounts payable automation | ledger | "Days, not weeks" · "to close the month" | "Transactions to match a month" 200–100,000 step 200 · 5,000 \| "Minutes to match and check each" 0.5–5 step 0.5 · 1.5 \| 0.8; hourly inr {600, 200–2,500, 50}, usd {45, 20–150, 5} | razorpay, stripe, paytm, tally, zoho, quickbooks, xero, googlesheets | data-reporting-automation, ai-process-automation, custom-automations |
| speed-to-lead-agent | speed to lead; instant lead response; lead response automation | chat, tool `whatsapp` | "Under 60s" · "from enquiry to first reply" | "New enquiries a month" 50–10,000 step 50 · 600 \| "Minutes spent on first reply and qualifying each" 2–20 · 10 \| 0.7 | whatsapp, facebook, googleads, gmail, hubspot, zoho, calendly, twilio | ai-voice-agents, crm-lead-automation, whatsapp-automation |

**Task 9**

| slug | search phrases | live | highlight | savings | tools | related |
| --- | --- | --- | --- | --- | --- | --- |
| custom-automations | workflow automation services; n8n automation agency; Zapier and Make experts | workflow | "Any app" · "connected to any other" | "Copy-paste and update tasks a month" 200–50,000 step 200 · 4,000 \| "Minutes each takes by hand" 1–15 · 4 \| 0.85 | n8n, make, zapier, googlesheets, slack, gmail, airtable, notion | ai-process-automation, data-reporting-automation, ai-agent-development |
| content-automation | AI content automation; social media content automation; AI blog writing service | calendar | "30 days" · "of content from one idea" | "Posts, blogs and emails a month" 10–500 step 10 · 60 \| "Minutes each takes to write and schedule" 15–240 step 15 · 90 \| 0.6 | wordpress, instagram, linkedin, youtube, canva, mailchimp, notion, facebook | website-development, data-reporting-automation, ai-website-chatbots |
| website-development | website development company; landing page design; Next.js website development | browser | "Under 2s" · "page load on a phone" | "Website enquiries a month" 20–5,000 step 20 · 300 \| "Minutes spent answering and logging each" 3–30 · 10 \| 0.5 | nextdotjs, react, tailwindcss, supabase, vercel, wordpress, googleanalytics, hubspot | ai-website-chatbots, content-automation, speed-to-lead-agent |

The Websites page's "What you get" lists the site itself (pages, speed, SEO setup, AI chat and lead capture); its savings section is framed as time saved handling enquiries, because the site captures and answers them.

### Task 10: Services dropdown

**Files:**
- Create: `src/components/layout/services-menu.tsx`
- Modify: `src/components/layout/header.tsx`

**Interfaces:**
- Consumes: `catalog`, `serviceGroups` (Task 3); `ToolLogo` (Task 2, for the `whatsapp` icon).
- Produces: `<ServicesMenu active={boolean} />` (desktop disclosure button + panel, `id="services-menu"`); `<MobileServicesMenu />` (accordion: a button with `aria-expanded` and the grouped links). Icon map from `ServiceIcon` to lucide components lives here (check names against the installed `lucide-react`).

Behaviour: click toggles; pointer enter opens after 80ms, leave closes after 200ms; Escape closes and focuses the button; click outside closes; route change closes; the panel shows three groups (AI Automation laid out in two columns), each entry = icon + title + `menuBlurb`, plus "All services →" to `/services`; the button is styled as current (`aria-current` is not used on a button; use a `data-active` attribute and the same dot) on `/services` and `/services/*`. Mobile: the "Services" row in the full-screen menu becomes an accordion; the rest of the mobile menu is unchanged.

- [ ] **Step 1: Write the Playwright check** (scratchpad script against `npm run dev`): at 1440px, click "Services" → 12 links visible inside `#services-menu`; press Escape → panel hidden and the button focused; Tab to the button, press Enter → open; hover opens; clicking "WhatsApp Automation" lands on `/services/whatsapp-automation` with the panel closed; at 375px, open the menu, tap "Services" → 12 links.
- [ ] **Step 2: Run** — FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run** — PASS; `npm run typecheck && npm run lint`.
- [ ] **Step 5: Commit** `feat: services dropdown in the main nav`.

### Task 11: Site-wide integration

**Files:**
- Modify: `src/lib/content.ts` (`services` derived from `catalog`; `Service` type = card view of `CatalogEntry`; `marqueeItems`; case-study service names → new titles), `src/sections/services.tsx` (12 cards, each with a stretched link to its page; layout 1 hero + 1 wide + 10 single = 16 cells in 4 columns, `grid-flow-dense`), `src/components/layout/footer.tsx` (links to `/services/<slug>`), `src/lib/estimator.ts` + `src/sections/savings-estimator.tsx` (12 services; per-market money inputs and formatting), `src/app/services/page.tsx` (hero "Twelve systems that work while you don't." and description), `src/app/layout.tsx` (OfferCatalog from `catalog`, each Offer with the page URL), `src/lib/demo-bot.ts` (old service names), `README.md` (where-to-change rows for services, currency, tools; tests command)

Estimator rates (hours share, lead lift): ai-agent-development 0.35/0.10, ai-voice-agents 0.12/0.18, ai-website-chatbots 0.15/0.20, whatsapp-automation 0.18/0.22, crm-lead-automation 0.20/0.15, data-reporting-automation 0.15/0.02, ai-process-automation 0.35/0.03, finance-reconciliation-automation 0.25/0, speed-to-lead-agent 0.08/0.25, custom-automations 0.40/0.05, content-automation 0.10/0.15, website-development 0.05/0.15. Defaults stay `ai-agent-development` + `ai-website-chatbots`. Money inputs by market: inr hourly ₹450 (150–2,000), deal value ₹1,50,000 (₹5,000–₹50,00,000, log); usd hourly $35 (15–120), deal value $2,000 ($100–$50,000, log). Switching market resets only the two money inputs.

- [ ] **Step 1: Failing test** (`src/lib/estimator.test.ts`): `serviceModels.map(m => m.slug)` equals the catalog slugs; `defaultInputsFor("inr").hourlyCost === 450` and `.dealValue === 150000`; `defaultInputsFor("usd").hourlyCost === 35`.
- [ ] **Step 2: Run** `npm test` — FAIL.
- [ ] **Step 3: Implement** all modifications above. `grep -rn "Advanced AI Agents\|Lead to Speed\|/services#" src` returns nothing.
- [ ] **Step 4: Run** `npm test && npm run typecheck && npm run lint` — PASS.
- [ ] **Step 5: Commit** `feat: twelve services across home, services page, footer and estimator`.

### Task 12: Full verification

- [ ] **Step 1:** `npm run build` — succeeds; output lists `/services/[slug]` with 12 prerendered paths and every other route static.
- [ ] **Step 2:** `npm start`, then the Playwright pass over `/`, `/services`, `/contact?service=whatsapp-automation` and all 12 service pages at 1440px and 375px, in two contexts (`timezoneId: "Asia/Kolkata"` and `"America/New_York"`): no console errors or hydration warnings; no horizontal scroll; ₹ shows by default in the Kolkata context and $ in New York; the switch persists across reload; at 375px with every calculator slider at max, no horizontal scroll and money shows compact; the contact select shows "WhatsApp Automation"; `/services/nope` is 404; each page has one `h1`; every `script[type="application/ld+json"]` parses and the service pages include `Service`, `FAQPage` and a 3-item `BreadcrumbList`; with `reducedMotion: "reduce"` the illustrations show their end state.
- [ ] **Step 3:** Lighthouse mobile on `/services/whatsapp-automation` if a runner is available (`npx lighthouse` against the production server with `--chrome-flags="--headless --no-sandbox"` and `CHROME_PATH=/opt/pw-browsers/chromium`); target ≥ 95 performance, 100 SEO/accessibility. Note the result either way.
- [ ] **Step 4:** Screenshots (desktop + phone) of three pages and the open dropdown, sent to the user.
- [ ] **Step 5:** Push the branch.
