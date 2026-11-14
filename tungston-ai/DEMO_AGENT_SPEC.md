# Demo front desk — build spec

The site already has a slot for this (`DemoCallCard`). Once the agent is live:
1. Set `NEXT_PUBLIC_DEMO_PHONE` in Vercel. The site then shows "Call our demo front desk", a QR code and the ground rules.
2. Optionally drop a recording at `public/audio/sample-call.mp3`, with its transcript at `public/audio/sample-call.txt`. The site offers the recording whenever no number is set.

Build it with your existing stack (Twilio + ElevenLabs + n8n), or with an Indian-language voice provider if Marathi quality is better there.

## 1. Persona — fictional, and obviously so

| | |
|---|---|
| Clinic | **Protomation Demo Clinic.** Made up. Never imitate or name a real clinic. |
| Doctor | Dr Demo |
| Address | 1 Demo Road, Andheri West, Mumbai (made up) |
| Timings | Mon–Sat 9am–8pm, Sun 10am–2pm |
| First consult fee | ₹800 (demo fee) |
| Specialties offered | General skin, hair and fertility consults: enough to show each flow |

The details are the same as the website's demo chat (`src/lib/demo-bot.ts`), so the two never disagree.

## 2. Opening disclosure (every call, word for word)

> "Hello, you're speaking with a demo AI assistant from Protomation, at a made-up clinic. This call may be recorded to improve the demo. Please don't share real medical details. How can I help?"

A Hindi version is offered if the caller replies in Hindi, and a Marathi one if they reply in Marathi.

## 3. Languages

- Hindi, Marathi and English. Detect the caller's language from their first reply, and switch mid-call if they switch.
- **Launch gate:** test calls in all three languages, including at least one mid-call switch. Don't put the number on the site until Marathi sounds natural.

## 4. Flows

1. **Book a consultation**
   - Ask for the caller's name and a concern category (skin / hair / fertility / other).
   - Offer three slots from the demo calendar (a Google Calendar made only for the demo).
   - Confirm the slot back to the caller, then write it to that calendar.
2. **FAQs:** timings, location, consult fee, what to bring. Fictional answers only.
3. **Reschedule:** find the booking by name and phone, then offer new slots.
4. **"Talk to a human":** take a message (name, number, reason) and say a person will call back. Log it for the founder.
5. **Optional confirmation:** a WhatsApp or SMS confirmation of the booking, only if the caller agrees during the call.

## 5. Guardrails

- **No medical advice.** Symptoms, medicines, doses, test results and success rates all get: "I can't advise on that, but the doctor can. Shall I book a consultation?"
- Never ask for health details beyond the concern category.
- 5-minute cap per call. At 4:30, wrap up politely.
- A daily minute cap across all demo calls, so a spike can't run up the bill. A suggested starting point is 120 minutes a day; set it in the telephony provider or in n8n.
- Rate limits:
  - at most 3 calls a day per caller number
  - block withheld numbers if abuse appears
- Abuse or prank calls: end the call politely.

## 6. Data

- Log every call's outcome for the founder: booked, FAQ only, message taken, dropped, or language used.
- **Transcripts and recordings are deleted automatically after 30 days.** That's my default; change it if you like, and keep the Privacy Policy line in step.
- No patient data. Callers are asked not to share any, and the agent doesn't ask for it.

## 7. Before the number goes on the site

- [ ] Confirm an Indian inbound number is available from your telephony provider and complete its KYC. Twilio requires a business address and documents for Indian numbers. An Indian provider may be quicker.
- [ ] Test calls in all three languages, with outcomes logged.
- [ ] Daily cap and per-number limit tested.
- [ ] Deletion after 30 days set up and checked.
- [ ] Set `NEXT_PUBLIC_DEMO_PHONE` in Vercel (Production and Preview) and redeploy.

## 8. Not built yet: "Get a call in 60 seconds"

The brief describes an optional form where a visitor asks the AI front desk to call them. It's left out on purpose. Outbound calls to people who fill in a form fall under TRAI's commercial-communication (DLT) rules, so check those first. When they're cleared, the pieces already exist:
- the lead schema and consent (`src/lib/lead-schema.ts`)
- the rate limiter (`src/lib/rate-limit.ts`)
- your existing outbound caller in n8n

It's about half a day of work: a business-hours check, a route that forwards to the caller's webhook, and a switch to turn it on.
