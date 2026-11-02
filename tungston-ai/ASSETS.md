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
| WhatsApp Automation | `service-whatsapp-automation.webp` | 1344×768 | AI Horde (AlbedoBase XL) | `card.image` in `src/lib/services/catalog.ts` | same |
| CRM & Lead Automation | `service-crm-lead-automation.webp` | 1344×768 | AI Horde (AlbedoBase XL) | same | same |
| Data & Reporting Automation | `service-data-reporting-automation.webp` | 1344×768 | AI Horde (AlbedoBase XL) | same | same |
| AI Process Automation | reuses `service-advanced-agents.webp` | 1376×768 | Figma AI (Gemini) | same | same |
| Finance & Reconciliation Automation | `service-finance-reconciliation-automation.webp` | 1344×768 | AI Horde (AlbedoBase XL) | same | same |
| Speed-to-Lead Agent | `service-speed-to-lead-agent.webp` | 1344×768 | AI Horde (AlbedoBase XL) | same | same |
| Team: Orchestrator (Pratik V N) | `team-orchestrator.webp` | 1136×1408 | Canva AI | `image` on the member in `team`, `src/lib/content.ts` | No drawn fallback: keep the file |
| Team: Designer (Shrawani) | `team-designer.webp` | 1136×1408 | Canva AI | same | same |

Still drawn in code: the OG share image (`src/app/opengraph-image.tsx`, which places the logo) and the footer wordmark.

The Canva credits ran out after six renders, so the last three service illustrations came from Figma's generator with the same prompts. The originals are in the connected Canva account (media IDs `MAHYvza84Gg`, `MAHYwRMyLZ4`, `MAHYwXWCTXU`, `MAHYwSFAYUs`, `MAHYwTsagrc`, `MAHYwb2BzU0`) and the Figma file "Tungston.ai site art".

The six renders added with the service pages came from [AI Horde](https://aihorde.net), a free, community-run Stable Diffusion network, with the shared style prompt below. Its safety filter blanks some abstract renders as false positives, so each was generated two to four times and the best kept. The service list in `src/lib/services/catalog.ts` now decides which image each card and service page uses.

## Service page photos

Real-world photos on the service pages come from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no permission needed). Each download was registered with Unsplash as its API terms ask. They are 1600px wide WebP files in `public/assets/services/`, shown in grayscale under a red-to-black wash so they sit in the palette. `src/lib/services/photos.ts` lists every photo with its alt text and photographer:

| File | Photographer |
| --- | --- |
| `accounts-desk.webp` | [Towfiqu barbhuiya](https://unsplash.com/@towfiqu999999) |
| `cafe-owner.webp`, `video-call.webp` | [Vitaly Gariev](https://unsplash.com/@silverkblack) |
| `calculator-laptop.webp` | [Jakub Żerdzicki](https://unsplash.com/@jakubzerdzicki) |
| `call-centre.webp` | [LumenSoft Technologies](https://unsplash.com/@candelarms) |
| `clinic-reception.webp` | [Irshad Pathan](https://unsplash.com/@alrighthospital) |
| `creator-desk.webp` | [Videodeck](https://unsplash.com/@videodeck) |
| `desk-laptop.webp`, `owner-laptop.webp` | [Mina Rad](https://unsplash.com/@miinrad) |
| `founder-laptop.webp` | [Saad Manzoor](https://unsplash.com/@saadi1191) |
| `headset-desk.webp` | [Petr Macháček](https://unsplash.com/@machec) |
| `laptops-team.webp` | [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat) |
| `paperwork-review.webp`, `tax-paperwork.webp` | [Kelly Sikkema](https://unsplash.com/@kellysikkema) |
| `phone-shopping.webp` | [CardMapr.nl](https://unsplash.com/@cardmapr) |
| `sales-meeting.webp` | [Rodeo](https://unsplash.com/@getrodeo) |
| `shop-owner.webp` | [Ellicia](https://unsplash.com/@ellicia_) |
| `site-supervisor.webp` | [Ali Mkumbwa](https://unsplash.com/@mkumbwajr) |
| `support-agent.webp` | [BaljkanN4](https://unsplash.com/@baljkann4) |
| `team-meeting.webp` | [Redd Francisco](https://unsplash.com/@reddfrancisco) |
| `team-planning.webp` | [Dylan Gillis](https://unsplash.com/@mainermedia) |
| `video-creator.webp` | [Kyle Loftus](https://unsplash.com/@kyleloftusstudios) |
| `warehouse-boxes.webp` | [Reproductive Health Supplies Coalition](https://unsplash.com/@rhsupplies) |

## Tool logos

The logos of the tools we connect to (WhatsApp, n8n, Zoho, HubSpot, Razorpay and others) come from [Simple Icons](https://simpleicons.org) (CC0), through the `simple-icons` package, and are listed in `src/lib/tools.ts`. They show which tools the systems work with; the marks belong to their owners. Tools Simple Icons does not carry (Slack, OpenAI, Salesforce, Twilio, LinkedIn, Canva, Tally, Excel, DocuSign, Looker Studio) show their name with a neutral icon. A logo keeps its brand colour unless that colour is too dark to read on black, in which case it is drawn in white.

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
| `whatsapp-automation` | a glossy chrome smartphone at an angle with three frosted-glass chat bubbles rising from its screen, red light inside the bubbles, one tiny yellow notification dot |
| `crm-lead-automation` | a polished chrome funnel with small glowing red glass spheres falling through it and landing in three neat rows below, one sphere glowing yellow |
| `data-reporting-automation` | a bar chart of chrome columns rising from black glass with a thin red line graph floating above, its highest point a yellow dot |
| `finance-reconciliation-automation` | two neat stacks of polished chrome coins side by side, connected by perfectly straight thin red laser lines, one small yellow glowing dot where the lines meet |
| `speed-to-lead-agent` | a chrome stopwatch made of glass rings with a red light streak racing around it, the needle tip glowing yellow |
