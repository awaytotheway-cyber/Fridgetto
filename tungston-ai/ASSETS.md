# Visual assets

The site ships without any raster images. Every visual is drawn in code so the page is fast and stays on-brand:

| Asset | Shipped as | Where |
| --- | --- | --- |
| Hero background | Live water-ripple dot grid (canvas) with CSS ambient glows | `src/sections/hero.tsx`, `src/lib/ripple-field.ts` |
| 7 service illustrations | One SVG series: hairline strokes, a red working part, one yellow hot point. They animate on hover; the voice waveform always moves. | `src/sections/service-art.tsx` |
| About image (human and machine) | Dot-matrix head in profile, built on the ripple grid with a rim light | `src/sections/about.tsx` |
| OG share image, 1200×630 | Generated at build time with `next/og` | `src/app/opengraph-image.tsx` |
| Favicon and logo mark | SVG: a 5×5 dot matrix with a T burned in, yellow at the junction | `src/app/icon.svg`, `src/app/apple-icon.tsx`, `src/components/ui/logo.tsx` |

If you want AI-rendered art on top of that, generate it with the prompts below, export it as WebP, put it in `public/assets/`, and wire it in where noted.

## Generation status

This environment had Canva's image generator connected, but the network policy blocked downloading the full-resolution files from Canva. One test render of the hero texture exists in the connected Canva account under media ID `MAHYvza84Gg`. Nothing else was generated, so the slots below are still open.

Recommended tools, in order: Midjourney (via an API wrapper such as Apiframe) for hero-quality abstract 3D, Flux (fal.ai or Replicate) for the illustration series, OpenAI GPT Image or Google Imagen 4 when text has to render, and Recraft for vector versions of the mark.

## Shared style prompt

> Ultra-premium dark 3D render on pure black background, [SUBJECT], liquid chrome and glass material, dramatic electric red #E50914 rim lighting, subtle vivid yellow #FFD400 accent glow, cinematic depth of field, minimal, expensive, award-winning digital art, 8k, no text

Keep 85–90% of each frame pure black. Yellow should appear once per image, at the hottest point.

## Slots

### 1. Hero ambient texture

- **File:** `public/assets/hero-texture.webp`, 2560×1440
- **Subject:** abstract slow liquid-metal surface with faint glowing neural filament threads, like a tungsten filament heating up, extremely dark, one hot yellow point
- **Wire-in:** set `assets.heroTexture` in `src/site.config.ts`, then add an `<Image fill className="object-cover opacity-30 -z-20" />` behind the `DotGrid` in `src/sections/hero.tsx`. Keep its opacity low so the dots stay the focus.

### 2–8. Service illustrations (one series)

- **Files:** `public/assets/service-<slug>.webp`, 1200×900, transparent or pure black background
- **Wire-in:** replace the `<ServiceArt>` call in `src/sections/services.tsx` with an `<Image>` for that slug.

| Slug | Subject |
| --- | --- |
| `ai-agents` | a single glowing chrome orb at the center of orbiting task nodes, thin red light trails connecting them |
| `voice-agents` | a sculpted sound wave of liquid chrome bars rising from black glass, the loudest bar glowing yellow |
| `website-chatbots` | three floating glass speech bubbles stacked in depth, the front one lit red from inside |
| `custom-automations` | interlocking chrome pipes and valves with red light flowing through them, one yellow output node |
| `advanced-agents` | stacked translucent glass slabs like an index of documents, a red beam retrieving one slab upward |
| `content-automation` | a grid of floating glass tiles assembling into a mosaic, one tile edged in yellow |
| `web-and-app` | a glass browser window and a phone floating in depth, wireframe UI drawn in red light |

### 9. About image (human and machine)

- **File:** `public/assets/about-human-machine.webp`, 1200×1500 (4:5)
- **Subject:** a human head in profile made of thousands of tiny glowing dots that dissolve into a precise machine grid at the back of the skull, red rim light along the face, a single yellow point at the temple
- **Wire-in:** set `assets.aboutImage: "/assets/about-human-machine.webp"` in `src/site.config.ts`. The About section switches to the image automatically.

### 10. OG share image (optional replacement)

- **File:** `src/app/opengraph-image.png`, 1200×630 (delete `opengraph-image.tsx` if you use a file)
- **Prompt:** use the hero texture prompt, then set the headline "We Build AI That Works While You Sleep." in Space Grotesk Bold on the left third. Ideogram or Imagen 4 handle the text best.

### 11. Logo mark (optional vector refinement)

- **Tool:** Recraft (vector)
- **Prompt:** minimal geometric logo mark, 5×5 grid of circular dots on black, the top row and center column lit electric red #E8101A forming a letter T, the junction dot vivid yellow #FFD400, flat vector, no gradients, no text
- **Wire-in:** replace `src/app/icon.svg` and the `LogoMark` SVG in `src/components/ui/logo.tsx`.
