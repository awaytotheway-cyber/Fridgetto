# Protomation.ai website

Marketing site for Protomation, which installs and runs **AI front desks for high-ticket clinics** (IVF, dermatology and hair, dental, diagnostic labs), with education businesses as a second vertical. Every page argues one offer: calls, missed calls and WhatsApp enquiries answered in Hindi, Marathi or English, qualified, booked and reported on.

Planning documents: `AUDIT.md` (where the site started), `IMPLEMENTATION_PLAN.md` (decisions and phases), `COPY.md` (the approved words), `LAUNCH_CHECKLIST.md` (what's left before going live) and `DEMO_AGENT_SPEC.md` (the demo phone agent).

The hero keeps the **water-ripple dot grid**: a canvas of dots that behaves like a liquid surface. Moving the cursor pushes ripples through it, and disturbed dots heat up from ember red to filament yellow. The same engine draws the "PROTOMATION" wordmark in the footer.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript
- Tailwind CSS 4 (tokens in `src/app/globals.css`)
- GSAP 3 with ScrollTrigger and SplitText for heading reveals and scroll-linked effects, loaded on demand (the preloader and hero intro are CSS)
- Lenis for smooth scrolling with a mouse (touch screens scroll natively)
- Lucide icons
- Clash Display (display) and General Sans (body) from Fontshare, self-hosted with `next/font/local`

## Run it

Requires Node.js 20.9 or newer (the two check scripts need 22.18+). `npm run dev` and `npm run build` first download the two brand fonts from Fontshare into `src/assets/fonts/fontshare/` (see [Fonts](#fonts)), so the first run needs network access to api.fontshare.com.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
npm start              # serve the production build
npm run lint
npm run typecheck
npm test               # unit tests: calculator, lead form, rate limit, demo chat, demo card
npm run check:copy     # copy rules: banned words, "30+ languages", $ prices, certification claims
npm run check:routes   # against a running server: redirects, pages, sitemap (default http://localhost:3000)
```

Copy `.env.example` to `.env.local` and fill in what you need. Every variable is explained there.

## Where to change things

All visitor-facing words live in typed files under `src/content/`, so copy can change without touching components.

| To change | Edit |
| --- | --- |
| Brand, URL, email, WhatsApp, reply-time promise, nav, hero headline, audiences above it | `src/site.config.ts` |
| Every price (diagnostic, build, managed plan), price cards, pricing FAQs, ownership points | `src/content/pricing.ts` |
| Homepage sections: hero subhead, leaks, five jobs, demo, process, monthly plan, data points, founder note | `src/content/home.ts` |
| FAQs (homepage, clinics, education) | `src/content/faqs.ts` |
| Clinic specialties on /clinics | `src/content/clinics.ts` |
| /education, /how-it-works, /diagnostic, /security, /work, /about, /contact | `src/content/<page>.ts` |
| Calculator presets, labels and disclaimer | `src/content/calculator.ts` (maths in `src/lib/calculator.ts`) |
| Page titles and descriptions | `src/content/seo.ts` |
| Old URLs and where they redirect; the list of public pages | `src/redirects.ts` |
| The demo chat's answers | `src/lib/demo-bot.ts` |
| The demo phone line | `NEXT_PUBLIC_DEMO_PHONE`, or drop `public/audio/sample-call.mp3` (+ `.txt` transcript) |
| Form fields, options and messages | `src/lib/lead-schema.ts`, `src/components/lead-form.tsx` |
| Privacy Policy and Terms | `src/lib/legal.ts` |
| Colours, type scale, radii, glows | the `@theme` block in `src/app/globals.css` |
| Images | `public/assets/`, see [ASSETS.md](./ASSETS.md) |

> **On proof:** the site claims no client results. The sample report on /work is labelled dummy data; `src/components/case-study.tsx` is ready for a real case study and rendered nowhere until there is one, with the client's permission. Calculator outputs are labelled illustrative estimates.

## Google sign-in

The Google button on `/login` uses [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview): Google's button runs on our own page, returns an ID token, and `supabase.auth.signInWithIdToken()` trades it for a session.

This is deliberate. Supabase's `signInWithOAuth()` redirect sends the visitor to Google with the *Supabase project* as the callback host, so Google's consent screen reads "continue to `<project-ref>.supabase.co`" — the project URL, shown to every person signing in. The ID-token flow never leaves this origin, so the prompt names the site instead. The alternative fix is Supabase's [Custom Domain add-on](https://supabase.com/docs/guides/platform/custom-domains), which costs $10/month and can only give a subdomain such as `auth.protomation.ai`.

To set it up:

1. In Google Cloud Console → Credentials, open the **Web** OAuth client (the same one Supabase already uses) and add the site's origins under **Authorized JavaScript origins**: `https://www.protomation.ai` and `http://localhost:3000` for development. Leave the existing authorized *redirect* URI alone.
2. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to that client ID. It is read at build time, so a redeploy is needed.
3. Make sure the same client ID is on the Google provider in the Supabase dashboard (Authentication → Providers → Google), which is what lets Supabase accept the token.

Until the variable is set, `GoogleButton` falls back to the old redirect, so sign-in keeps working either way. Google requires its own rendered button for this flow, so it cannot be restyled; it is themed `filled_black` and clipped to the site's panel radius. One Tap is deliberately not shown — the login page asks for an explicit click.

## Lead form and counting

The form on `/contact` posts to the `submitLead` server action (`src/app/actions.ts`):

1. Bots are dropped quietly: a hidden honeypot field, a 3-second minimum fill time, and 5 attempts per 10 minutes per IP.
2. `parseLead` (`src/lib/lead-schema.ts`, zod) validates the fields, normalises the phone to E.164 and refuses any lead without consent. The exact consent sentence and its timestamp are stored with the lead.
3. `deliverLead` saves the lead to Supabase (`public.protomation_enquiries`, insert-only RLS) and POSTs it to the n8n webhook in `N8N_LEAD_WEBHOOK_URL` **at the same time**. The visitor sees success if either worked, and an error only when neither did.

With JavaScript the form keeps the visitor's answers after an error; without JavaScript it still posts as a plain HTML form.

**Counting** is first-party: buttons marked `data-event="…"` and a few components call `trackEvent()` (`src/lib/analytics.ts`), which posts to `/api/event`. That stores the event name, a short label and the page path in `public.site_events`, with no cookies and no IP address. To read the counts, use the query at the bottom of `supabase/2026-11-site-events.sql`.

**Database setup:** run `supabase/protomation_enquiries.sql`, then `2026-11-front-desk-leads.sql`, then `2026-11-site-events.sql`. All three can be re-run safely.

## Project structure

```
src/
  app/            routes (/, clinics, education, how-it-works, diagnostic, pricing, security, work,
                  about, contact, privacy, terms), llms.txt, sitemap, robots, OG image, server action,
                  /api/event, dormant Care Plan checkout routes
  content/        every page's words and data, typed
  sections/       page sections (hero, leaks, five jobs, demo, calculator, process, pricing, FAQ, CTA…)
  components/     CTA pair, calculator, demo call card, chat demo, lead form, sample report, case study,
                  layout (header, footer), fx (dot grid, reveals, motion toggle), ui
  lib/            calculator, lead schema, delivery, rate limit, analytics, demo bot, legal, SEO helpers
  redirects.ts    old → new URLs, and the list of public pages
  site.config.ts  brand configuration
scripts/          check-routes.ts, check-copy.ts, fetch-fonts.mjs, make-image-blur.mjs
supabase/         table definitions and migrations
```

## How the ripple grid works

`RippleField` (in `src/lib/ripple-field.ts`) treats every dot as one cell of a height field. Each 60 Hz step solves a damped 2D wave equation with a 9-point stencil, so rings stay round. A weak spring pulls the surface back to rest. The pointer's path since the last frame becomes a trail of impulses, so fast strokes leave a continuous wake. Dots are drawn displaced along the local slope, and their heat (how far the surface moved) picks one of 24 pre-built color and size buckets. Each bucket is filled in a single canvas path, and the hottest dots get an additive bloom sprite.

Performance guards:

- Device pixel ratio capped at 2.
- Fixed-timestep physics, with at most 4 steps per frame.
- The loop sleeps when the surface is flat and wakes on input.
- It pauses when the tab is hidden or the canvas is off screen.
- Touch devices get gentle automatic ripples every few seconds instead of cursor input, starting with the first touch or scroll so the page loads without the canvas animating.
- With `prefers-reduced-motion`, it draws a still grid and nothing animates.

## Performance and SEO

Mobile Lighthouse on a local production build scores 94–95 for performance and 100 for accessibility, best practices and SEO on `/` and `/clinics`; Vercel's HTTP/2 and Brotli usually add a few points. What keeps it there:

- Nothing above the fold waits for JavaScript. The preloader and the hero intro are CSS, and page headlines are never hidden, so the largest paint lands with the first frame.
- GSAP loads only when an effect needs it (see `loadGsap()` and `whenNear()` in `src/lib/gsap.ts`). On phones nothing loads it until you scroll; the desktop-only effects never load it there.
- Decorative extras wait: the hero texture is fetched after the page is up (and skipped on phones), and the dot grid's ambient ripples on touch screens start with the first touch.
- Images are served as AVIF where supported, and images on screen at load are fetched eagerly with high priority.

Every page has its own title, description, canonical URL and social card (`src/content/seo.ts` + `src/lib/seo.ts`). Structured data covers the business (ProfessionalService, Mumbai/India), each vertical (Service), FAQs (FAQPage), prices (Offer), breadcrumbs and the team. `/llms.txt` summarises the business for AI tools. When adding a page: export `pageMetadata(seo.<page>)`, render `<JsonLd data={breadcrumbJsonLd(...)} />`, and add the path to `publicRoutes` in `src/redirects.ts` (the sitemap and route checker read it).

## Accessibility and motion

- Semantic landmarks, a skip link, labelled forms with inline errors, visible focus rings (yellow), and color contrast at WCAG AA for text.
- The preloader (the logo powering up) plays once per session, with a mouse only; phones go straight to the page.
- `prefers-reduced-motion` turns off the preloader, the intro, reveals, the marquee and the canvas animation, and leaves all content visible.
- Without JavaScript, the preloader is hidden and every section renders.
- The custom cursor appears only on devices with a fine pointer. Touch devices keep native behavior.

## Fonts

Clash Display and General Sans are free fonts from [Fontshare](https://www.fontshare.com) under the ITF Free Font License. It allows self-hosting them on your own site, which this project does through `next/font/local`. It does not allow redistributing the font files, and committing them to a public repository would count as redistribution. So `src/assets/fonts/fontshare/` is git-ignored, and `scripts/fetch-fonts.mjs` downloads the official files before `dev` and `build` (it skips the download when they are already there). Vercel and most CI builders have the network access this needs.

If a build machine cannot reach Fontshare, download both families from fontshare.com and copy the files listed at the top of `scripts/fetch-fonts.mjs` into that folder.

## Licenses

- Clash Display and General Sans: ITF Free Font License (see [Fonts](#fonts)).
- Rendered images in `public/assets/`: generated for this site with Canva and Figma AI (see [ASSETS.md](./ASSETS.md)).
