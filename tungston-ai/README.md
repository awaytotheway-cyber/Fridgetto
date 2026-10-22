# Tungston.ai website

Marketing site for Tungston.ai, an AI agency that builds AI agents, voice agents, website chatbots, automations, content systems, and websites and apps.

The centerpiece is the hero's **water-ripple dot grid**: a canvas of dots that behaves like a liquid surface. Moving the cursor pushes ripples through it, and disturbed dots heat up from dim ember red to filament yellow, the way tungsten glows. The same engine draws the dot-matrix portrait in the About section and the "TUNGSTON" wordmark in the footer.

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript
- Tailwind CSS 4 (tokens in `src/app/globals.css`)
- GSAP 3 with ScrollTrigger and SplitText for the intro, heading reveals and scroll-linked effects
- Lenis for smooth scrolling
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
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, the sitemap, robots.txt and JSON-LD. Defaults to `https://tungston.ai`. |
| `CONTACT_WEBHOOK_URL` | Where the "Book a free AI audit" form posts submissions as JSON (Slack, Zapier, n8n, Make, a CRM webhook). Without it, submissions are written to the server log. |

## Where to change things

| To change | Edit |
| --- | --- |
| Brand name, URL, email, phone, socials, nav, booking link | `src/site.config.ts` |
| Colors, type scale, radii, glows | The `@theme` block in `src/app/globals.css`. The canvas effects read `--color-ember`, `--color-filament-deep`, `--color-filament` and `--color-volt` at runtime, so they follow automatically. |
| Fonts | `src/app/layout.tsx` (`next/font/local`) and `scripts/fetch-fonts.mjs`. The OG image reads the static Clash Display TTFs from the same folder. See [Fonts](#fonts). |
| All page copy: services, stats, process, case studies, pricing, manifesto | `src/lib/content.ts` |
| Demo chatbot answers | `src/lib/demo-bot.ts` (keyword intents, first match wins) |
| Images | Rendered art is in `public/assets/`, set in `src/site.config.ts` (hero, About) and `src/lib/content.ts` (service cards). See [ASSETS.md](./ASSETS.md) for sizes, prompts and how to fall back to the drawn versions. |
| Dot-grid physics (wave speed, damping, heat) | Constants at the top of `src/lib/ripple-field.ts` |

> **Before launch:** the stats in the hero, the three case studies and the prices are placeholders written to show the layout. Replace them in `src/lib/content.ts` with real numbers.

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, icons, OG image, server action
    page.tsx           home page (the priority page)
    services/ work/ about/ contact/
  sections/            page sections (hero, marquee, services bento, process, demo, results, pricing, about, CTA)
  components/
    fx/                motion and interaction: dot grid, cursor, magnetic, tilt, reveals, preloader, smooth scroll
    layout/            header and footer
    ui/                buttons, logo, section intro
  lib/
    ripple-field.ts    the water-ripple dot grid engine (framework-free canvas)
    content.ts         site copy
    demo-bot.ts        scripted demo chatbot
    gsap.ts            plugin registration and the "site ready" event
  site.config.ts       brand configuration
```

## How the ripple grid works

`RippleField` (in `src/lib/ripple-field.ts`) treats every dot as one cell of a height field. Each 60 Hz step solves a damped 2D wave equation with a 9-point stencil, so rings stay round. A weak spring pulls the surface back to rest. The pointer's path since the last frame becomes a trail of impulses, so fast strokes leave a continuous wake. Dots are drawn displaced along the local slope, and their heat (how far the surface moved) picks one of 24 pre-built color and size buckets. Each bucket is filled in a single canvas path, and the hottest dots get an additive bloom sprite.

Performance guards:

- Device pixel ratio capped at 2.
- Fixed-timestep physics, with at most 4 steps per frame.
- The loop sleeps when the surface is flat and wakes on input.
- It pauses when the tab is hidden or the canvas is off screen.
- Touch devices get gentle automatic ripples every few seconds instead of cursor input.
- With `prefers-reduced-motion`, it draws a still grid and nothing animates.

## Accessibility and motion

- Semantic landmarks, a skip link, labelled forms with inline errors, visible focus rings (yellow), and color contrast at WCAG AA for text.
- `prefers-reduced-motion` turns off the preloader, the intro, reveals, the marquee and the canvas animation, and leaves all content visible.
- Without JavaScript, the preloader is hidden and every section renders.
- The custom cursor appears only on devices with a fine pointer. Touch devices keep native behavior.

## Fonts

Clash Display and General Sans are free fonts from [Fontshare](https://www.fontshare.com) under the ITF Free Font License. It allows self-hosting them on your own site, which this project does through `next/font/local`. It does not allow redistributing the font files, and committing them to a public repository would count as redistribution. So `src/assets/fonts/fontshare/` is git-ignored, and `scripts/fetch-fonts.mjs` downloads the official files before `dev` and `build` (it skips the download when they are already there). Vercel and most CI builders have the network access this needs.

If a build machine cannot reach Fontshare, download both families from fontshare.com and copy the files listed at the top of `scripts/fetch-fonts.mjs` into that folder.

## Licenses

- Clash Display and General Sans: ITF Free Font License (see [Fonts](#fonts)).
- Rendered images in `public/assets/`: generated for this site with Canva and Figma AI (see [ASSETS.md](./ASSETS.md)).
