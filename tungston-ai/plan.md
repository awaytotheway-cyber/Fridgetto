# Homepage conversion plan — completed

Applied the five patterns from the Nate Hark summary to protomation.ai.

Status: **done and live.** Kept as a record of what was decided and why, so the
reasoning does not have to be re-litigated. One item remains, and it is blocked on
data rather than on work.

---

## What the audit found

Three of the five patterns were already satisfied before any work started:

| Pattern | Verdict at audit |
| --- | --- |
| Free sample | Already built — a working estimator and a live chatbot. Problem was placement, not absence. |
| Front / middle / back | Already done. Hero texture, dot-grid canvas, ambient glows, glow-shadowed buttons. |
| Motion with a job | `prefers-reduced-motion` honoured in nine places. No in-page switch. |
| 60-30-10 | Red used far beyond CTAs, plus volt yellow as a second accent. |
| Mirror Test | **The real gap.** H1 described us, subhead listed services, nothing said who it was for. |

---

## What shipped

| Phase | Change | PR |
| --- | --- | --- |
| 1 | Headline mirrors the visitor; subhead became outcomes | #23 |
| 2 | Hero CTA jumps to the estimator | #23 |
| 3 | Accent demoted off labels so CTAs win | #23 |
| 4 | Motion off switch in the footer | #23 |
| 1b | The three audiences named above the headline | #24 |
| — | Invented case studies and hero stats removed | #24 |
| — | Estimator rates lowered to what evidence supports | #25 |

Headline: **Your Team Is Doing Work A Machine Should Do.**
Audiences: **Clinics · Online stores · Medical research.**

---

## Decisions worth not re-opening

**60-30-10 was not applied literally, and neither was "one animation per screen."**
That advice is calibrated for templated SaaS sites. Applied to the letter here it
would strip the filament identity and leave something that looks like every other AI
agency. Red was instead pulled off eyebrows, bullets and ordinals and left on CTAs,
the logo, the hero glow and links. Motion was kept and given a switch.

**The site claims no client results anywhere, on purpose.** Three case studies and
three hero stats were placeholders the README flagged. Once the headline named an
audience they would have read as a track record. The case studies became capability
descriptions of the three builds; the hero stats row was removed rather than
rewritten, because a weak capability line in the hero is worse than no line.

**The estimator rates are modelled, not measured, and set deliberately low.** The
reasoning and sources live in `src/lib/estimator.ts`. The short version: the most
rigorous study available (Brynjolfsson, Li & Raymond, NBER w31161) measured 13.8%,
measured savings run far below self-reported ones, and for lead lift there is no
credible published benchmark at all.

---

## The one thing still outstanding

**Real delivery data.** Everything above is honest but conservative, which means the
site currently undersells. Two or three real engagements would fix both open items at
once:

- the `useCases` entries in `src/lib/content.ts` could carry real outcomes instead of
  capability descriptions
- the per-service rates in `src/lib/estimator.ts` could be derived rather than modelled

What is needed per project: what the task was, hours it took before, hours after, and
permission to describe it. Name the client and the period when publishing a figure.

Until then the conservative version stands, and it is defensible in a sales call —
which the previous version was not.
