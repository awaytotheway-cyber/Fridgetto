# Homepage conversion plan

Applying the five patterns from the Nate Hark summary to protomation.ai.

Status: **draft for approval.** Nothing in here is built yet.

---

## Where the site already stands

I audited the live site against all five patterns before planning anything. Three
are in good shape; one has a real gap; one needs a judgement call rather than a fix.

| Pattern | Verdict | Why |
| --- | --- | --- |
| **Free sample** | Strong, badly placed | You have a working savings estimator *and* a live chatbot demo. Both are real, not mockups. They sit 6th and 8th down the page, so most visitors never reach them. |
| **Front / middle / back** | Strong | Hero texture image, dot-grid canvas, ambient glows, glow-shadowed buttons. The layering pattern is already doing its job. Nothing to do. |
| **Motion with a job** | Judgement call | Heavy: preloader, ripple grid, reveal-text, magnetic cursor, liquid button, tilt cards, smooth scroll, counters, marquee. `prefers-reduced-motion` is honoured in 9 places, so the OS off switch works. No in-page switch. |
| **60-30-10** | Partly off | Red appears far beyond CTAs — bullets, slider tracks, progress bars, the hero glow — plus volt yellow as a second accent. The eye has no single place to land. |
| **Mirror Test** | **The real gap** | The H1 is about us, not the visitor. The subhead lists services instead of outcomes. Nothing on the page says who it is for. |

### The honest caveat

This advice is calibrated for templated SaaS sites. Yours is already design-forward
and distinctive. Applied literally, 60-30-10 and "one animation per screen" would
strip the filament identity and leave something that looks like everyone else.

So this plan takes the Mirror Test seriously, promotes the free sample, and treats
colour and motion as tuning rather than demolition. That is a deliberate choice, and
it is the choice you made when I asked.

---

## Decisions already made

| Question | Your answer |
| --- | --- |
| Who the page mirrors | A few named verticals |
| Hero headline | Rewrite it; pick from proposed options |
| Colour | Make CTAs win, keep the brand identity |
| Motion | Add a visible off switch, keep the motion |

---

## Blocker: the proof is invented

Before any of this ships, one thing has to be settled.

The three case studies in `src/lib/content.ts` — a multi-location dental group, a D2C
skincare brand, a B2B freight brokerage — are the only vertical signals in the
codebase. They are also placeholders. Your own README says so:

> **Before launch:** the stats in the hero and the three case studies are placeholders
> written to show the layout. Replace them in `src/lib/content.ts` with real numbers.

The same applies to the hero stats: "40+ workflows automated", "24/7 agents live",
"10x content output".

This matters more under this plan than it did before. Today those numbers sit in a
section a visitor may skim. If the plan goes ahead, the headline will name verticals
and the page will be built to mirror those buyers — putting invented proof directly
behind a public claim about who you serve and what you achieved for them.

**Three ways forward. Pick one:**

1. **Replace with real work.** Best outcome. Needs three real engagements with real
   numbers, and client permission to describe them.
2. **Name verticals, drop the fake metrics.** Keep the vertical framing, replace case
   studies with honest capability examples — "what a clinic voice agent does" rather
   than "+38% for a 14-clinic group". Nothing claimed that did not happen.
3. **Hold the vertical work.** Do colour, motion and free-sample promotion now; come
   back to the Mirror Test when there is real proof.

I would do (2) now and (1) as the work lands. My recommendation, your call.

### Which verticals?

The codebase implies **healthcare/clinics, e-commerce/D2C, and logistics**, purely
because those are the invented case studies. That is not evidence of what you
actually sell. Before I write a word of headline copy I need the two to four
verticals you genuinely want to win, and ideally one sentence on the pain each feels.

---

## The work, in order

Each phase is independently shippable. Stop after any one of them.

### Phase 1 — The Mirror Test (highest value)

The point: a visitor should see their problem, their world, and a promise, within one
screen.

**Headline options.** The current H1 doubles as the brand tagline, so it also appears
in `site.config.ts`, the OG share image, the JSON-LD and the meta description. A
rewrite changes all of them together.

| # | Headline | What it does |
| --- | --- | --- |
| A | *Your team is doing work a machine should do.* | Problem-first. Mirrors the visitor immediately, zero brand ego. Works across every vertical. |
| B | *You shouldn't need more staff to handle more customers.* | Names the SMB owner's actual constraint. Strongest promise of the four. |
| C | *The work that eats your week, handled.* | Shortest and most confident. Promise-first, keeps some of the current swagger. |
| D | *Your calls, quotes and follow-ups, answered before you open the laptop.* | Closest to the current tagline's spirit. Concrete, but longer. |

My pick is **B**: it is the only one that names a business constraint rather than a
feeling, and it sets up the Care Plan and estimator directly.

**Also in this phase:**

- An audience line above the H1 naming the verticals, so "who is this for" is answered
  before the headline is read.
- Rewrite the subhead from a service list into outcomes. Today it reads *"AI agents,
  AI voice agents, chatbots, workflow automation and end-to-end content systems"* —
  that is a menu, not a promise.
- Keep both CTAs. "Book a Free AI Audit" already answers "what do I do next" well.

Files: `src/sections/hero.tsx`, `src/site.config.ts`, `src/lib/content.ts`.

### Phase 2 — Promote the free sample

You already have the hardest part built. The problem is purely placement.

- Add a one-line hook in the hero that points at the estimator, with the anchor link.
- Move `SavingsEstimator` above `WorksWith` so it lands immediately after the services
  section rather than sixth.
- Consider surfacing one live number from the estimator in the hero as a teaser.

Files: `src/app/page.tsx`, `src/sections/hero.tsx`.

Risk: the current section order is a deliberate argument — the comment in `page.tsx`
says so. Reordering weakens "why this matters now" before "what it would save you". I
will mock both orders and screenshot them rather than assume the new one is better.

### Phase 3 — Make the CTAs win

Not a repaint. Red stays in the logo, the hero glow and the buttons. It comes out of
the places where it competes with them.

- Audit every accent use. Current counts: `team.tsx` 20, `savings-estimator.tsx` 17,
  `process.tsx` 9.
- Demote decorative red — list bullets, slider tracks, progress fills — to a neutral
  or a dimmed tint.
- Keep exactly one full-strength accent per screen, on the thing you want clicked.
- Re-check contrast on anything changed. `--color-signal` exists precisely because
  filament red fails 4.5:1 on black at body sizes; that trap is easy to fall back into.

Files: `src/app/globals.css`, the section components above.

### Phase 4 — Motion off switch

- An in-page toggle that persists across visits, defaulting to the OS
  `prefers-reduced-motion` setting.
- Route it through the existing checks rather than adding a second system — nine files
  already read `prefers-reduced-motion`, and they should all obey one source of truth.
- Place it in the footer. It is an accessibility control, not a feature.

Files: new `src/components/fx/motion-toggle.tsx`, `src/lib/gsap.ts`,
`src/app/globals.css`, `src/components/layout/footer.tsx`.

---

## Deliberately not doing

- **Full 60-30-10.** Would remove the filament concept. You chose to keep the identity.
- **Cutting reveal-text or the preloader.** The advice says keep text stationary; that
  animation is a signature of the site and it already respects reduced motion.
- **One animation per screen.** Same reason. The toggle solves the accessibility
  concern without flattening the design.
- **Touching the other pages.** This is a homepage plan. Pricing, services and the
  legal pages stay as they are.

---

## How each phase gets verified

- `npm run lint`, `npm run typecheck`, `npm run build` before anything is pushed.
- Chromium screenshots at 390px and 1280px, before and after, for every visual change.
- Contrast checked on every colour I touch.
- For Phase 2, both section orders screenshotted so the comparison is real rather than
  asserted.
- Each phase is its own commit, so any of them can be reverted alone.

---

## What I need from you to start

1. Which option for the invented proof — (1), (2) or (3) above.
2. The two to four verticals you actually want, and the pain each one feels.
3. A headline: A, B, C, D, or your own.
4. Confirm Phase 1 → 2 → 3 → 4 is the right order, or reorder it.
