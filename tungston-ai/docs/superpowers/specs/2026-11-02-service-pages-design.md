# Service pages: design spec

Date: 2026-11-02 · Status: approved in chat, awaiting written-spec review

## Goal

Give each of the 12 services its own page that a business owner can read in a few minutes and come away knowing what they gain, what they have to do, what they get at the end, and roughly how much time and money it saves them. The pages also need to rank in search: each one targets that service's own search phrases.

Visitors reach a page from a **Services dropdown** in the main nav, which opens a box listing all 12.

## Decisions already made

| Topic | Decision |
| --- | --- |
| Which services | The 12 in the contact form (list below). "Advanced AI Agents" folds into AI Agent Development. |
| Market and currency | India and abroad equally. A ₹ / $ switch on every page; India figures use Indian salaries, US figures use US salaries (never a straight conversion). |
| Prices | Not shown on service pages. Savings only. |
| Testimonials | None for now. No made-up quotes. |
| Images | Unsplash photos (tinted red/black) and free AI Horde renders in the existing chrome-and-red style. No paid credits (Figma AI, Canva) unless asked. Pollinations rejected (watermark, quality). |
| Renaming | "Lead to Speed Agent" becomes **Speed-to-Lead Agent**. |
| Tone | Plain business language, benefit first. Technical terms only where a buyer would search for them, and explained. |

## The 12 services

Contact-form values stay as they are (the email template and the n8n webhook read them). Each page stores its form value so its CTA can preselect it.

| # | Page title | URL slug | Group | Form value | Hero art |
| --- | --- | --- | --- | --- | --- |
| 1 | AI Agent Development | `ai-agent-development` | AI Automation | `ai-agent-development` | existing `service-ai-agents.webp` |
| 2 | AI Voice Agents | `ai-voice-agents` | AI Automation | `ai-voice-agents` | existing `service-voice-agents.webp` |
| 3 | AI Website Chatbots | `ai-website-chatbots` | AI Automation | `ai-website-chatbots` | existing `service-website-chatbots.webp` |
| 4 | WhatsApp Automation | `whatsapp-automation` | AI Automation | `whatsapp-automation` | new render |
| 5 | CRM & Lead Automation | `crm-lead-automation` | AI Automation | `crm-lead-automation` | new render |
| 6 | Data & Reporting Automation | `data-reporting-automation` | AI Automation | `data-reporting-automation` | new render |
| 7 | AI Process Automation | `ai-process-automation` | AI Automation | `ai-process-automation` | new render |
| 8 | Finance & Reconciliation Automation | `finance-reconciliation-automation` | AI Automation | `finance-reconciliation` | new render |
| 9 | Speed-to-Lead Agent | `speed-to-lead-agent` | AI Automation | `lead-to-speed-agent` | new render |
| 10 | Custom Automations | `custom-automations` | Custom Solutions | `custom-automations` | existing `service-custom-automations.webp` |
| 11 | Content Automation | `content-automation` | Custom Solutions | `content-automation` | existing `service-content-automation.webp` |
| 12 | Websites & Landing Pages | `website-development` | Web Development | `websites-landing-pages` | existing `service-web-and-app.webp` |

AI Process Automation covers document- and approval-heavy operations work (reading forms, invoices, emails, routing approvals). Custom Automations covers wiring the apps a business already uses together (n8n, Make, Zapier, custom code). The copy keeps that line clear.

## Navigation

- **Desktop:** "Services" in the nav becomes a disclosure button. Click or hover (short delay) opens a panel below the header with the 12 services in their 3 groups. Each entry shows an icon, the name and a one-line benefit. The panel ends with an "All services →" link to `/services`. Escape and clicking outside close it; arrow and Tab keys move through it; `aria-expanded` and `aria-controls` are set. The nav item is marked current on `/services` and every service page.
- **Mobile:** inside the existing full-screen menu, "Services" expands in place (accordion) to the same grouped list.

## Service page layout

Route: `src/app/services/[slug]/page.tsx`, statically generated for all 12 slugs; an unknown slug returns 404. One shared template, one content file per service.

Sections, top to bottom (visuals marked ◆):

1. **Hero.** Breadcrumb (Home › Services › Name), eyebrow, benefit-led H1 that contains the main search phrase, a 2–3 sentence lede, "Book a free AI audit" (links to `/contact?service=<form value>`) and "See what you'd save" (jumps to section 7). ◆ The service's 3D render, with ◆ an animated "live" panel in front of it (see Illustrations).
2. **Headline numbers.** Three or four figures that count up: hours saved a month, money saved a month (₹/$), and one service-specific figure (e.g. "replies in under 60 seconds"). Money and hours come from the calculator defaults in section 7, so the figures on a page always agree.
3. **What it is, in plain words.** H2 phrased the way people search ("What is WhatsApp automation?"), two short paragraphs. ◆ Animated before/after: "Today" (work piling up, a clock running, missed items) next to "With Protomation" (the same items completing on their own).
4. **What this means for your business.** Four benefit cards, each one outcome and one sentence.
5. **How it works.** Five numbered steps from first call to running system, with the week each happens in. ◆ An animated workflow: the service's real flow drawn as connected nodes with a pulse travelling through them (e.g. New WhatsApp message → AI reads it → Answers or books → Updates your CRM → Alerts your team).
6. **Your part, our part, what you get.** Three columns. *Your part*: the few things the client does, with a total time (typically 2–3 hours across the project). *Our part*: what we build and run. *What you get*: the concrete deliverables. ◆ Handoff illustration: two lanes on one timeline showing how little sits on the client's lane.
7. **Savings estimate.** ◆ Calculator with 2–3 sliders specific to the service (e.g. WhatsApp chats a month, minutes spent on each, team cost per hour). Outputs: hours saved a month, money saved a month and a year, and how many full-time people that equals. ◆ An animated meter that fills to the result. Labelled clearly as an estimate, with the assumptions listed beneath.
8. **Where businesses use this.** Six use cases by industry or team, ◆◆◆ three of them with tinted photos.
9. **Works with the tools you already use.** Tool names as chips (no third-party logos). ◆ A small animated diagram of the tools connecting to the system.
10. **FAQ.** Five or six questions a buyer actually asks (cost of getting started is answered as "we scope it after a free audit"), as an accessible accordion.
11. **Related services.** Three cards linking to sibling pages.
12. **Final CTA.** The existing `FinalCta` section.

That is about ten visuals a page: one render, six animations, three photos.

## Savings model

Each service defines its calculator as data:

- `volume`: the slider for how much of the work there is (label, unit, min, max, step, default).
- `minutesPerItem`: minutes a person spends on one item today (slider or fixed, with default).
- `automatedShare`: share of that work the system takes over (fixed per service, e.g. 0.7), stated in the assumptions.
- Team cost per hour, by market: India default ₹350/hour (range ₹150–1,500), US default $35/hour (range $15–120). A service can override these (finance and sales roles cost more).

Results: `hoursSaved = volume × minutesPerItem × automatedShare / 60`; `moneySaved = hoursSaved × hourlyCost`; yearly = ×12; full-time equivalents = hoursSaved / 173. The calculator keeps one value set per market, so switching ₹/$ swaps in that market's numbers rather than converting.

All rates are launch estimates, like the existing estimator's, and are marked in the README to be tuned to real client results.

## ₹ / $ switch

- A small switch in each service page's hero and in the calculator; both control the same site-wide setting.
- An inline script in `<head>` sets `data-currency` on `<html>` before first paint: the visitor's saved choice, otherwise ₹ when the browser time zone is `Asia/Kolkata` or `Asia/Calcutta`, otherwise $.
- Static figures are rendered in both currencies and CSS hides the inactive one, so there is no flash or layout shift. Interactive parts read the same setting through a small shared store and update when it changes. The choice is saved in `localStorage` (wrapped in try/catch).
- ₹ figures use Indian grouping (₹1,20,000); $ figures use US grouping.
- The existing savings estimator on the home and `/services` pages follows the same switch, with India and US defaults.

## Illustrations and images

**Animated illustrations** (`src/components/illustrations/`), built with SVG and CSS, started when they scroll into view (IntersectionObserver), and shown in their finished state under `prefers-reduced-motion`. No new animation library; GSAP stays on-demand as today.

- `LivePanel` with variants: `chat` (WhatsApp, website chatbot, speed-to-lead), `call` (voice), `pipeline` (CRM), `dashboard` (data & reporting), `ledger` (finance), `documents` (process), `calendar` (content), `browser` (websites), `workflow` (custom automations), `tasks` (AI agents).
- `BeforeAfter`, `FlowPipeline`, `Handoff`, `SavingsMeter`, `ToolConnect`. Each takes its labels from the service's content file.

**AI Horde renders.** Six new hero renders (services 4–9) at 1024×576 or larger, using the shared style prompt in `ASSETS.md`. If a render misses the brief it is regenerated; if one cannot be made, that service falls back to a drawn `ServiceArt`. Files go in `public/assets/` as WebP and are listed in `ASSETS.md`.

**Unsplash photos.** About three per page, fetched through the Unsplash tool (which records the download as Unsplash requires), resized to at most 1600px wide, saved as WebP in `public/assets/services/`. They are shown in grayscale under a red-to-black overlay so they sit in the palette. Photographer credits are listed in `ASSETS.md`.

## SEO

- Per page: `pageMetadata()` title (under ~60 characters) and description (under ~150), canonical `/services/<slug>`.
- JSON-LD: `Service` (provider is the existing organization `@id`, area served India and worldwide), `FAQPage` from the FAQ section, and a three-level `BreadcrumbList` (`breadcrumbJsonLd` gains an optional parent).
- One H1 per page; H2s follow the questions people search.
- Sitemap lists all 12 pages. Footer service links, the services bento and the related-services cards all link to the pages (no more `/services#slug` anchors).
- The organization's `OfferCatalog` in `layout.tsx` lists the 12 services.

## Changes to existing parts

- `src/lib/content.ts`: the `services` list becomes the 12 (title, group, short hook, card points, art, image), drawn from the new per-service content so names exist in one place.
- `src/sections/services.tsx`: the bento grid lays out 12 cards; each card links to its page.
- `src/lib/estimator.ts` and `src/sections/savings-estimator.tsx`: rates for 12 services, market-aware defaults and currency.
- `src/components/contact-form.tsx`: relabel to "Speed-to-Lead Agent"; preselect the service from `?service=` on the client. `src/lib/contact-email.ts` label updated to match.
- `src/sections/marquee.tsx` items, `src/app/services/page.tsx` hero copy ("Twelve systems…"), `README.md` and `ASSETS.md` updated.

## Out of scope

Testimonials, prices on service pages, blog/"deeper reading" sections, city landing pages, real case studies, CMS integration.

## Code layout

```
src/app/services/[slug]/page.tsx         route, metadata, JSON-LD
src/lib/services/types.ts                ServiceDetail type
src/lib/services/<slug>.ts               one content file per service (12)
src/lib/services/index.ts                registry: list, bySlug, groups
src/lib/currency.ts                      market defaults, formatting, store, boot script
src/components/currency/                 switch, <Money> (dual render)
src/components/illustrations/            animated illustrations
src/components/layout/services-menu.tsx  desktop panel + mobile accordion
src/sections/service-page/               the page's sections
```

## Verification

- `npm run typecheck`, `npm run lint` and `npm run build` pass, and the build output lists all 12 service pages as static.
- Playwright pass at 1440px and 375px over every service page: no console errors, no horizontal scroll, the dropdown opens by click, hover and keyboard and closes with Escape, the ₹/$ switch changes the figures and survives a reload, the calculator updates, and reduced-motion shows finished illustrations.
- JSON-LD on each page parses and has the expected types.
- Screenshots of two or three pages (desktop and phone) shared for review.
- Spot-check Lighthouse on one service page if a runner is available; the target is the site's current 97+ mobile performance.
