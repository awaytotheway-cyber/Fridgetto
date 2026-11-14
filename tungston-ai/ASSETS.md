# Visual assets

The rendered art lives in `public/assets/` as WebP. Most pieces have a code-drawn fallback, so removing an image never leaves a hole:

| Asset | File | Size | Made with | Wired in | Without it |
| --- | --- | --- | --- | --- | --- |
| Hero texture | `hero-texture.webp` | 1680×944 | Canva AI | `assets.heroTexture` in `src/site.config.ts`, drawn at low opacity behind the dot grid in `src/sections/hero.tsx` | The live dot grid alone |
| About image (human and machine) | `about-human-machine.webp` | 1136×1408 | Canva AI | `assets.aboutImage` in `src/site.config.ts` | Dot-matrix portrait on the ripple grid |
| Team: Founder (Pratik Naragude) — also the founder-note portrait until a photo arrives | `team-orchestrator.webp` | 1136×1408 | Canva AI | `image` on the member in `team`, `src/content/about.ts` | No drawn fallback: keep the file |
| Team: Design Analyst (Shrawani) | `team-designer.webp` | 1136×1408 | Canva AI | same | same |

Still drawn in code: the OG share image (`src/app/opengraph-image.tsx`, which places the logo) and the footer wordmark.

The seven service illustrations were retired with the move to a single front-desk offer (November 2026); their originals are still in the connected Canva account and the Figma file "Tungston.ai site art".

## Logo

The Protomation logo (a P that trails circuit lines, set in a gear) was supplied as a 2000×2000 render on black. The mark is cut out of it on a transparent background, keeping its red gradient, then exported at these sizes:

| File | Size | Used for |
| --- | --- | --- |
| `src/assets/brand/logo-mark.png` | 186×160, transparent | Header and footer lockup, chat demo avatar, preloader, share image |
| `src/app/favicon.ico` | 48, 32 and 16 px, on near-black | Browser tab |
| `src/app/icon.png` | 192×192, rounded, on near-black | Browser tab and search results |
| `src/app/apple-icon.png` | 180×180, on near-black | iOS home screen |
| `public/icon-192.png`, `public/icon-512.png` | rounded, on near-black | Web app manifest |
| `public/icon-maskable-512.png` | 512×512, full bleed | Android adaptive icon |
| `public/logo.png` | 512×512, transparent | Organization logo in structured data |

To swap the logo, replace these files with the same names and sizes; nothing else needs to change.

## Team portraits

Claymorphic cartoon characters, not photos. They were generated with Canva AI, then placed full-bleed on pages 3 and 4 of the Canva design "Protomation.ai team page" and exported from there at full size (Canva media IDs `MAHZIzRQ78I` for the Orchestrator and `MAHZG8DOQhE` for the Designer). To add a teammate, generate a portrait with the prompt below at 4:5, export it at 1136×1408 on black, convert it to WebP and add an entry to `team`.

> Professional claymorphic 3D cartoon character, waist-up portrait of [ROLE AND LOOK], soft matte modelling-clay material with subtle hand-sculpted texture, realistic studio lighting, Pixar-quality clay render, [PROP THAT SHOWS THE ROLE], three-quarter view, subject centered with empty margins, pure black background, dramatic electric red #E8101A rim light, one small vivid yellow #FFD400 glow at the prop's tip, cinematic shallow depth of field, premium, minimal, no text, no logos

| Portrait | Role and prop |
| --- | --- |
| Orchestrator | charcoal blazer over a black tee, conducting with a slim baton; an arc of six frosted-glass tiles lit red from inside, each with a line icon for an agent's job (chat bubble, microphone with sound wave, envelope, calendar, document, gear with a flow arrow), joined to the baton tip by thin red light threads |
| Designer | oversized off-white knit sweater, round glasses, hair in a bun, sketching with a glowing stylus on a tablet that shows colour swatches and a wireframe in red light |

## Swapping or adding art

1. Export at the size above (or larger, same aspect ratio) on a pure black background.
2. Convert to WebP and save it in `public/assets/`. `next/image` serves resized copies, so the source can be large.
3. Point the config or the service's `image` at it. Set the value to `null` (config) or delete the `image` line (service) to go back to the drawn version.


## Shared style prompt

> Ultra-premium dark 3D render on a pure black background, [SUBJECT], liquid chrome and glass material, dramatic electric red #E8101A rim lighting, subtle vivid yellow #FFD400 accent glow, cinematic depth of field, minimal, expensive, award-winning digital art, no text

Keep 85–90% of each frame pure black. Yellow appears once per image, at the hottest point. 

| Asset | Subject |
| --- | --- |
| Hero texture | an abstract, slow liquid-metal surface with faint glowing neural filament threads, like a tungsten filament heating up, one hot yellow point on the right |
| About | a human head in profile facing right, made of thousands of tiny glowing dots that dissolve into a precise machine grid at the back of the skull, red rim light along the face, a single yellow point at the temple |
