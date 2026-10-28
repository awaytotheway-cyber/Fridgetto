# Protomation.ai website

Marketing site for Protomation.ai, an AI agency that builds AI agents, voice agents, website chatbots, automations, content systems, and websites and apps.

The centerpiece is the hero's **water-ripple dot grid**: a canvas of dots that behaves like a liquid surface. Moving the cursor pushes ripples through it, and disturbed dots heat up from dim ember red to filament yellow, the way a filament glows. The same engine draws the dot-matrix portrait in the About section and the "PROTOMATION" wordmark in the footer.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript
- Tailwind CSS 4 (tokens in `src/app/globals.css`)
- GSAP 3 with ScrollTrigger and SplitText for heading reveals and scroll-linked effects, loaded on demand (the preloader and hero intro are CSS)
- Lenis for smooth scrolling with a mouse (touch screens scroll natively)
- Lucide icons
- Clash Display (display) and General Sans (body) from Fontshare, self-hosted with `next/font/local`

## Run it

Requires Node.js 20.9 or newer. `npm run dev` and `npm run build` first download the two brand fonts from Fontshare into `src/assets/fonts/fontshare/` (see [Fonts](#fonts)), so the first run needs network access to api.fontshare.com.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route is prerendered as static)
npm start          # serve the production build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, the sitemap, robots.txt and JSON-LD. Defaults to `https://www.protomation.ai`; the bare domain redirects there (see `next.config.ts`). |
| `CONTACT_WEBHOOK_URL` | Where the "Book a free AI audit" form posts submissions as JSON (Slack, Zapier, n8n, Make, a CRM webhook). Without it, submissions are written to the server log. |

## Where to change things

| To change | Edit |
| --- | --- |
| Brand name, URL, email, phone, socials, nav, booking link | `src/site.config.ts` |
| Logo | `src/assets/brand/logo-mark.png` (header, footer, chat, preloader, share image). Icons are in `src/app/` (`favicon.ico`, `icon.png`, `apple-icon.png`) and `public/` (manifest icons, `logo.png` for structured data). See [ASSETS.md](./ASSETS.md#logo). |
| Page titles, descriptions and social cards | `pageMetadata()` in each page (from `src/lib/seo.ts`). Site-wide defaults and structured data are in `src/app/layout.tsx`. |
| Colors, type scale, radii, glows | The `@theme` block in `src/app/globals.css`. The canvas effects read `--color-ember`, `--color-filament-deep`, `--color-filament` and `--color-volt` at runtime, so they follow automatically. |
| Fonts | `src/app/layout.tsx` (`next/font/local`) and `scripts/fetch-fonts.mjs`. The OG image reads the static Clash Display TTFs from the same folder. See [Fonts](#fonts). |
| All page copy: services, stats, process, case studies, pricing, manifesto | `src/lib/content.ts` |
| Demo chatbot answers | `src/lib/demo-bot.ts` (keyword intents, first match wins) |
| Savings estimator: what each service saves, slider defaults | `src/lib/estimator.ts` (`serviceModels`, `defaultInputs`) |
| Team members: names, roles, bios, portraits | `team` in `src/lib/content.ts`. Portraits are in `public/assets/` (see [ASSETS.md](./ASSETS.md#team-portraits)). |
| Images | Rendered art is in `public/assets/`, set in `src/site.config.ts` (hero, About) and `src/lib/content.ts` (service cards). See [ASSETS.md](./ASSETS.md) for sizes, prompts and how to fall back to the drawn versions. |
| Dot-grid physics (wave speed, damping, heat) | Constants at the top of `src/lib/ripple-field.ts` |
| Liquid "Reach out to us" button: grab distance, release distance, blob size | Constants at the top of `src/components/fx/liquid-button.tsx`. Keep its padded field clear of other controls. |

> **Before launch:** the stats in the hero, the three case studies and the prices are placeholders written to show the layout. Replace them in `src/lib/content.ts` with real numbers. The savings estimator's per-service rates in `src/lib/estimator.ts` are placeholders too: tune them to real client results.

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, icons, OG image, server action
    page.tsx           home page (the priority page)
    services/ work/ about/ team/ contact/
  sections/            page sections (hero, marquee, services bento, savings estimator, process, demo, results, pricing, about, CTA)
  components/
    fx/                motion and interaction: dot grid, cursor, magnetic, liquid button, tilt, reveals, preloader, smooth scroll
    layout/            header and footer
    ui/                buttons, logo, section intro
  lib/
    ripple-field.ts    the water-ripple dot grid engine (framework-free canvas)
    content.ts         site copy
    demo-bot.ts        scripted demo chatbot
    estimator.ts       savings estimator rates and maths
    gsap.ts            on-demand GSAP loader, the "site ready" event and whenNear()
    seo.ts             per-page metadata and breadcrumb structured data
  site.config.ts       brand configuration
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

Lighthouse scores 97–100 for performance on phones and 100 on desktop on every page, and 100 for accessibility, best practices and SEO, measured over HTTP/2 with Brotli the way a host like Vercel serves it. What keeps it there:

- Nothing above the fold waits for JavaScript. The preloader and the hero intro are CSS, and page headlines are never hidden, so the largest paint lands with the first frame.
- GSAP loads only when an effect needs it (see `loadGsap()` and `whenNear()` in `src/lib/gsap.ts`). On phones nothing loads it until you scroll; the desktop-only effects never load it there.
- Decorative extras wait: the hero texture is fetched after the page is up (and skipped on phones), and the dot grid's ambient ripples on touch screens start with the first touch.
- Images are served as AVIF where supported, and images on screen at load are fetched eagerly with high priority.

Every page has its own title, description, canonical URL and social card (`src/lib/seo.ts`), and structured data covers the business, the website, breadcrumbs and the team. Keep those in place when adding a page: export `pageMetadata({ title, description, path })`, render `<JsonLd data={breadcrumbJsonLd(...)} />` and add the route to `src/app/sitemap.ts`.

## Accessibility and motion

- Semantic landmarks, a skip link, labelled forms with inline errors, visible focus rings (yellow), and color contrast at WCAG AA for text.
- The preloader (the logo powering up) plays once per session, with a mouse only; phones go straight to the page.
- `prefers-reduced-motion` turns off the preloader, the intro, reveals, the marquee and the canvas animation, and leaves all content visible.
- Without JavaScript, the preloader is hidden and every section renders.
- The custom cursor appears only on devices with a fine pointer. Touch devices keep native behavior.
- The liquid "Reach out to us" button is a plain link underneath. Touch devices and reduced motion get a normal pill, and the slime lets go of the cursor the moment it is over any other control.

## Fonts

Clash Display and General Sans are free fonts from [Fontshare](https://www.fontshare.com) under the ITF Free Font License. It allows self-hosting them on your own site, which this project does through `next/font/local`. It does not allow redistributing the font files, and committing them to a public repository would count as redistribution. So `src/assets/fonts/fontshare/` is git-ignored, and `scripts/fetch-fonts.mjs` downloads the official files before `dev` and `build` (it skips the download when they are already there). Vercel and most CI builders have the network access this needs.

If a build machine cannot reach Fontshare, download both families from fontshare.com and copy the files listed at the top of `scripts/fetch-fonts.mjs` into that folder.

## Licenses

- Clash Display and General Sans: ITF Free Font License (see [Fonts](#fonts)).
- Rendered images in `public/assets/`: generated for this site with Canva and Figma AI (see [ASSETS.md](./ASSETS.md)).
