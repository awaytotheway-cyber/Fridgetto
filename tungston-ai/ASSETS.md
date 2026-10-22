# Visual assets

The rendered art lives in `public/assets/` as WebP. Each piece has a code-drawn fallback, so removing an image never leaves a hole:

| Asset | File | Size | Made with | Wired in | Without it |
| --- | --- | --- | --- | --- | --- |
| Hero texture | `hero-texture.webp` | 1680×944 | Canva AI | `assets.heroTexture` in `src/site.config.ts`, drawn at low opacity behind the dot grid in `src/sections/hero.tsx` | The live dot grid alone |
| About image (human and machine) | `about-human-machine.webp` | 1136×1408 | Canva AI | `assets.aboutImage` in `src/site.config.ts` | Dot-matrix portrait on the ripple grid |
| AI Agents | `service-ai-agents.webp` | 1264×1264 | Canva AI | `image` on the service in `src/lib/content.ts` | SVG from `src/sections/service-art.tsx` |
| Voice Agents | `service-voice-agents.webp` | 1680×944 | Canva AI | same | same |
| Website Chatbots | `service-website-chatbots.webp` | 1680×944 | Canva AI | same | same |
| Custom Automations | `service-custom-automations.webp` | 1680×944 | Canva AI | same | same |
| Advanced AI Agents | `service-advanced-agents.webp` | 1376×768 | Figma AI (Gemini) | same | same |
| Content Automation | `service-content-automation.webp` | 1376×768 | Figma AI (Gemini) | same | same |
| Websites & Apps | `service-web-and-app.webp` | 1376×768 | Figma AI (Gemini) | same | same |

Still drawn in code: the OG share image (`src/app/opengraph-image.tsx`), the favicon and logo mark (`src/app/icon.svg`, `src/app/apple-icon.tsx`, `src/components/ui/logo.tsx`) and the footer wordmark.

The Canva credits ran out after six renders, so the last three service illustrations came from Figma's generator with the same prompts. The originals are in the connected Canva account (media IDs `MAHYvza84Gg`, `MAHYwRMyLZ4`, `MAHYwXWCTXU`, `MAHYwSFAYUs`, `MAHYwTsagrc`, `MAHYwb2BzU0`) and the Figma file "Tungston.ai site art".

## Swapping or adding art

1. Export at the size above (or larger, same aspect ratio) on a pure black background.
2. Convert to WebP and save it in `public/assets/`. `next/image` serves resized copies, so the source can be large.
3. Point the config or the service's `image` at it. Set the value to `null` (config) or delete the `image` line (service) to go back to the drawn version.

Service cards crop with `object-cover` into boxes from roughly 1.7:1 (small cards) to 2.5:1 (wide cards) and portrait on the large AI Agents card, so keep the subject small and centered with black margins. An elliptical mask fades the edges into the card.

## Shared style prompt

> Ultra-premium dark 3D render on a pure black background, [SUBJECT], liquid chrome and glass material, dramatic electric red #E8101A rim lighting, subtle vivid yellow #FFD400 accent glow, cinematic depth of field, minimal, expensive, award-winning digital art, no text

Keep 85–90% of each frame pure black. Yellow appears once per image, at the hottest point. For the service series, add "Subject centered and compact in the middle third of the frame, wide empty pure black margins."

| Asset | Subject |
| --- | --- |
| Hero texture | an abstract, slow liquid-metal surface with faint glowing neural filament threads, like a tungsten filament heating up, one hot yellow point on the right |
| About | a human head in profile facing right, made of thousands of tiny glowing dots that dissolve into a precise machine grid at the back of the skull, red rim light along the face, a single yellow point at the temple |
| `ai-agents` | a glowing liquid-chrome orb surrounded by glass task nodes in orbit, connected by thin red light trails, the orb's core yellow |
| `voice-agents` | a sculpted sound wave of liquid-chrome bars rising from black glass, the tallest bar glowing yellow |
| `website-chatbots` | three frosted-glass speech bubbles stacked in depth, the front one lit red from inside, a tiny yellow dot on its corner |
| `custom-automations` | interlocking chrome pipes and valves with red light flowing through glass sections, ending in one yellow output node |
| `advanced-agents` | a stack of thin translucent glass slabs like an index of documents, a red beam lifting one slab up, its edge glowing yellow |
| `content-automation` | a grid of floating dark glass tiles assembling into a mosaic, edged in red, exactly one tile edged in yellow |
| `web-and-app` | a glass browser window and a glass phone floating in depth, wireframe UI drawn in thin red light, one yellow dot on the browser |
