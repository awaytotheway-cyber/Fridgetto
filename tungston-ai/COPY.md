# COPY.md — draft copy for the AI front desk site

Status: **built** (14 Nov 2026). The words below are on the branch, in `src/content/`. Where this file says [CONFIRM], the default chosen is listed in `LAUNCH_CHECKLIST.md` §C, and the facts still to verify are in §B. If this file and `src/content/` ever disagree, the code is what's live.

How to review:
- Approve, strike or rewrite anything.
- **[CONFIRM]** marks a fact or choice only you can settle. It stays off the live site until you do.
- **[CLAIM]** marks a statement you must be able to stand behind in a sales call. If you can't today, it goes.
- Spelling is Indian English. Money is ₹ with lakh grouping.
- Banned words (brief §5): AI agents, autonomous, agentic, revolutionise, cutting-edge, leverage, unlock, seamless.

---

## 0. Open items

### [CONFIRM] — your answers needed before build

| # | Item | My draft |
|---|---|---|
| 1 | Hero headline | Option **A** recommended (§2.1) |
| 2 | Working hours behind the reply promise | Mon–Sat, 10am–7pm IST |
| 3 | GST on prices | "Prices exclude GST" (or say you're not GST-registered) |
| 4 | Diagnostic turnaround | Report within 7 working days of kick-off |
| 5 | Diagnostic credit window | Credited if the build starts within 30 days |
| 6 | Diagnostic refund rule | Non-refundable once test calls have started |
| 7 | Time to go live | 3–5 weeks after the diagnostic |
| 8 | Fixes included with every build | 30 days after go-live, even without the Managed plan |
| 9 | Managed plan terms | Month to month, 30 days' notice |
| 10 | Pilot risk reversal | Build paid in two halves; the second half only when the pilot hits the agreed number (§2.7) |
| 11 | Payment methods | UPI or bank transfer |
| 12 | Founder bio | Version A or B (§10) |
| 13 | Shrawani's line | §10 |
| 14 | `/security` items | Tick each one that is true **today** (§8) |
| 15 | "What we've already built" on `/work` | Show your outbound lead-qualification caller? (§9) |
| 16 | Calculator presets | Illustrative defaults (§2.5) |
| 17 | Integrations you can actually deliver | Google Calendar, which clinic software, WhatsApp Business route (§2.12 Q5) |
| 18 | Grievance contact for privacy | Pratik Naragude + email (§12) |
| 19 | Your team's time needed | "About two hours in the first two weeks" (§5) |

### [CLAIM] — statements you must be able to back

- Calls are answered "on the first ring" or "in seconds", and WhatsApp replies "in seconds".
- **Hindi, Marathi and English, switching mid-call if the caller does.** Test Marathi on your voice provider before launch.
- Missed-call callback "within a minute", and new leads "called within a minute".
- Every call opens by saying it's an AI assistant and may be recorded.
- Calls can be transferred to the clinic's desk during clinic hours.
- WhatsApp replies on the clinic's own WhatsApp Business number. This needs the WhatsApp Business Platform through a provider.
- "We don't use your patients' data to train AI models", and your providers' terms say the same.
- A data processing agreement exists and you sign one with every client.
- Monthly report contents: enquiries, response times, after-hours share, consults booked, estimated value.
- Monitoring "knows before your patients do", so alerts must be set up for every channel.

### Removed from the current site

- "30+ languages" and "Over 30 languages"
- the chatbot's "$2,900" and "$4,500 a month"
- the "45-minute" free audit
- "Seven systems"
- the e-commerce and medical-research use cases
- "Your Competitors Are Already Using AI."
- "A small senior team of engineers and designers"
- "~4 HR RESPONSE" and "within one business day"
- "There is no analytics…" (replaced, §12)
- "Remote-first, working worldwide" (replaced)
- the ₹9,999 Care Plan
- "Built by Protomation.ai, with the same tools we use for clients."

---

## 1. Global

**Positioning line (meta description, JSON-LD, llms.txt):**
Protomation installs and runs AI front desks for high-ticket clinics. Every call, missed call and WhatsApp enquiry is answered in seconds in Hindi, Marathi or English, qualified, booked into the clinic's calendar and followed up.

**Navigation:** Clinics · Education · How it works · Pricing · Work · About · **[Book a free call]**

**CTA pair (end of every page):**
- Primary: **Book a free 20-min call** → `/contact`
- Secondary: **Call our demo front desk** when a demo number is set, otherwise **See how it works** → `/how-it-works`
- Line under the pair: "Free, 20 minutes, no slides. We reply within 6 working hours."

**Reply promise (one string, used everywhere):** We reply within 6 working hours (Mon–Sat, 10am–7pm IST).

**Works-with line:** Works with your calendar, WhatsApp, phone line and CRM.

**Footer**
- Description: "AI front desks for clinics. Every call, missed call and WhatsApp enquiry answered, qualified and booked, in Hindi, Marathi or English."
- Columns:
  - **Product:** Clinics · Education · How it works · Front-Desk Diagnostic · Pricing · Security & data
  - **Company:** Work · About · Contact · Log in
  - **Elsewhere:** LinkedIn · X · Instagram · YouTube
- Location: Mumbai, India · working with clients worldwide
- Bottom bar: © Protomation AI · Privacy Policy · Terms of Service · Motion on/off

---

## 2. Homepage `/`

### 2.1 Hero

**Eyebrow:** IVF · Dermatology & Hair · Dental · Diagnostic labs

**Headline options.** The glowing word is in **bold**.

| | Headline | Note |
|---|---|---|
| **A (recommended)** | Every patient enquiry answered in **seconds.** Every consult booked. | Names both outcomes the brief asks for (answered → booked), works for all four specialties, and fits three lines on a phone. |
| B | Your clinic misses calls. Your AI front desk **won't.** | Punchier, but says what we prevent rather than what you get. |
| C | Stop losing IVF, skin and dental patients to **missed calls.** | Names the specialties, but it's long on a phone and leaves out labs. |

**Subhead:** Protomation answers every call, missed call and WhatsApp enquiry in Hindi, Marathi or English. It qualifies the patient, books the consult into your calendar and follows up until they arrive. Set up in weeks. We can run it for you, with a report every month on the consults it booked.

**Buttons:** CTA pair.

**Under the buttons:** Works with your calendar, WhatsApp, phone line and CRM.

### 2.2 Where enquiries leak

**Eyebrow:** Where enquiries leak

**Title:** Most clinics don't lack enquiries. They lose them between hello and booked.

**Lead:** Patients choosing IVF, skin, hair or dental treatment contact two or three clinics at once. The first one to answer properly usually gets the consult. These are the moments that decide it.

| Moment | Without a front desk | With Protomation |
|---|---|---|
| A couple calls about IVF at 9:40pm | Nobody picks up. By morning they've booked a consult elsewhere. | Answered on the first ring, questions handled kindly, first consult booked for tomorrow. |
| The phone rings during the lunch rush | The desk is with a patient. The call goes unanswered, and nobody calls back. | Answered, qualified and booked. Your desk gets a two-line summary. |
| A Meta ad lead fills in your form | Someone calls back the next day. They don't pick up. | Called within a minute, while they're still on their phone, and booked. |
| A WhatsApp message asks "how much?" | Seen at 6pm, answered the next day, after two other clinics have replied. | Answered in seconds with the answer you approved, and a consult offered. |
| A booked patient forgets | An empty slot and a doctor waiting. | Reminded the day before and two hours before, with an easy way to reschedule. |

**Close:** None of this needs a bigger team. It needs a front desk that never takes a lunch break, and someone checking that it works.

**Button:** Book a free 20-min call

### 2.3 One system, five jobs

**Title:** One front desk. Five jobs.

**Lead:** Not a chatbot here and a phone bot there. One system that handles an enquiry from the first hello to the monthly report.

| # | Job | What it does | Built from |
|---|---|---|---|
| 1 | **Answer** | Every call, missed call, WhatsApp message and website chat, answered in seconds, day or night, in Hindi, Marathi or English. | Voice line · WhatsApp · Website chat |
| 2 | **Qualify** | Asks what your front desk would: what they're looking for, which branch, how soon, and anything your doctors need before a first consult. | Your FAQs and rules |
| 3 | **Book** | Offers real slots from your calendar or clinic software and books the consult. No back-and-forth. | Calendar and clinic software |
| 4 | **Remind & follow up** | Reminders before every consult, and polite follow-ups for anyone who went quiet, on the schedule you set. | WhatsApp and SMS |
| 5 | **Report** | A monthly report: enquiries answered, response times, consults booked and what they're worth. | Monitoring and reporting |

**Link:** See how each part works →

### 2.4 Live demo

**Title:** Try the front desk yourself.

**Lead, depending on what's available:**
- **Demo number set:** Call our demo clinic and book a pretend consult. It takes about two minutes, in Hindi, Marathi or English.
- **Sample recording only:** Listen to a real call with our demo clinic, then ask its chat a question.
- **Neither:** Ask our demo clinic's chat a question, the way a patient would.

**Hindi line** (only when the demo number is set): हिंदी में भी बात हो सकती है। *(You can talk in Hindi too.)*

**Demo call card:**
- Button: **Call our demo front desk**, followed by the number
- Languages: Hindi · Marathi · English
- Small print: Takes about 2 minutes. Please don't share real medical details.
- Desktop QR caption: Scan to call from your phone.
- Recording state: **Listen to a sample call** · *Show transcript*

**Chat label:** Demo — fictional clinic

**Points beside the chat:**
- Answers from your clinic's own FAQs, fees and timings
- Books the consult inside the chat
- Hands over to your team the moment a patient asks for a person

### 2.5 Missed-enquiry calculator

**Eyebrow:** Missed-enquiry calculator

**Title:** What are missed enquiries costing you?

**Lead:** Pick your specialty, then change the numbers to match your clinic. Nothing you type leaves this page.

**Inputs**

| Label | Help text |
|---|---|
| Specialty | IVF & fertility · Dermatology & hair · Dental · Diagnostic labs · Custom |
| Enquiries per month | Calls, WhatsApp messages and form leads, across all channels. |
| Missed or answered after 5 minutes (%) | Not sure? Try 30% and see what changes. |
| Answered enquiries that book a consult (%) | |
| Consults that go on to treatment (%) | |
| Average treatment value (₹) | |

**Outputs**
- **Patients lost each month** to missed or slow replies
- **Revenue at risk each month**
- **Patients a month to cover the Managed plan (₹39,500).** Below 1, show "Less than 1 patient a month".

**Disclaimer (always visible):** Illustrative estimate based on your inputs, not a guarantee or a measured client result. It assumes missed enquiries would have booked at the same rate as the ones you answer.

**Button:** Get your real numbers with a Front-Desk Diagnostic → `/diagnostic`

**Presets — illustrative [CONFIRM]**

| Preset | Enquiries/mo | Missed % | Book % | Treatment % | Avg value | Where the value comes from | Revenue at risk |
|---|---|---|---|---|---|---|---|
| IVF & fertility | 300 | 30 | 25 | 20 | ₹1,60,000 | average spend per IVF cycle reported in an Indian cost study; clinic price pages show ₹1–2.5 lakh | ₹7,20,000 (4.5 patients) |
| Dermatology & hair | 400 | 35 | 30 | 25 | ₹50,000 | blend of hair transplants (₹60,000–1,80,000 for 2,000–3,000 grafts in Mumbai) and lower-ticket skin packages | ₹5,25,000 (10.5) |
| Dental | 250 | 30 | 35 | 40 | ₹40,000 | mid-range single implant in Mumbai (₹35,000–45,000) | ₹4,20,000 (10.5) |
| Diagnostic labs | 1,500 | 20 | 60 | 90 | ₹2,000 | **assumption:** a typical home-collection package | ₹3,24,000 (162) |
| Custom | 200 | 30 | 30 | 30 | ₹50,000 | starting point only | ₹2,70,000 (5.4) |

The volumes and percentages are illustrative starting points, not industry benchmarks. Visitors are meant to change them.

### 2.6 Who it's for

**Title:** Built for clinics where one patient is worth a lot.

| Card | Text | Link |
|---|---|---|
| IVF & fertility | Long, emotional decisions. Couples call several centres in one evening. The first kind, clear answer wins the consult. | `/clinics#ivf` |
| Dermatology & hair transplant | Instagram and Meta leads asking "how much?" at all hours. A fast reply and a booked consult beat a price list. | `/clinics#dermatology-hair` |
| Dental implants & chains | High-value treatment plans, several branches, and patients comparing two or three clinics. Every branch answered the same way. | `/clinics#dental` |
| Diagnostic labs | Home sample collection booked early in the morning, often for a parent. A confirmed slot wins the booking. | `/clinics#diagnostic-labs` |

**Line below:** Run a study-abroad, upskilling or exam-coaching business? See the front desk for education →

### 2.7 How we work

**Title:** How we work

**Lead:** Small steps, each with something you can check.

| Step | When [CONFIRM] | Text |
|---|---|---|
| **Free 20-minute call** | Day 1 | We learn how enquiries reach you today, and tell you honestly whether we can help. |
| **Front-Desk Diagnostic · ₹15,000** | Week 1 | We test your phones and WhatsApp at different times, measure your response times and give you a fixed quote. The fee comes off your build. |
| **Pilot with one agreed number** | Weeks 2–3 | We switch on one channel first and agree one number to hit, for example 95% of calls answered within a minute. |
| **Go live** | Weeks 3–5 | All channels, your calendar, your FAQs and your handoff rules. Your team knows exactly what it does and when it hands over. |
| **Managed and reported** *(optional)* | Every month | We monitor it, fix what breaks, test it after every change and send you a report every month. |

**Risk line under the pilot step [CONFIRM]:** You pay the second half of the build only when the pilot hits the number we agreed.

> Why this suggestion: the pilot metric is something we control (answer speed and coverage), not something we don't (whether patients go ahead with treatment). That makes the promise safe for you to give and easy for a clinic to believe.

### 2.8 What you get every month

**Title:** What you get every month

**Lead:** On the Managed Front Desk plan, from ₹39,500 a month. It's optional, and it's how the front desk stays accurate as your fees, doctors and timings change.

| Item | Text |
|---|---|
| Monitoring and alerts | We watch every channel. If something stops working, we know before your patients do. |
| Fixes and updates | New doctor, new fee, new branch timing? Tell us on WhatsApp and we update it. |
| Test calls after every change | We call it ourselves after every update, in each language you use. |
| Monthly report | Enquiries answered, response times, after-hours share, consults booked, and an estimate of what they're worth. |
| Handoff rules kept current | Who gets transferred, when, and to which number, reviewed with you. |
| Support | We reply within 6 working hours (Mon–Sat, 10am–7pm IST). |

### 2.9 Your data, handled properly

**Title:** Patient data, handled properly.

- Every caller hears that they're speaking with an AI assistant, and that the call may be recorded.
- Your data stays in accounts you own wherever possible: your phone number, your WhatsApp, your calendar.
- We don't use your patients' data to train AI models.
- A data processing agreement with every clinic, built to support your obligations under India's DPDP Act, 2023.

**Link:** How we handle data →

### 2.10 Pricing teaser

**Title:** Clear prices before you commit.

| | Price | Note |
|---|---|---|
| Front-Desk Diagnostic | ₹15,000 | credited in full against your build |
| Front-Desk Build | from ₹2,00,000 | one-time, single location |
| Managed Front Desk | from ₹39,500/month | optional |

**Line:** Your exact quote comes out of the diagnostic, and it doesn't change after that.

**Link:** See full pricing →

### 2.11 Founder note

**Eyebrow:** From the founder

I'm Pratik Naragude. I started Protomation in Mumbai to help businesses use AI to grow, and I kept seeing the same leak: the enquiry nobody could answer went to whoever answered first. So we now do one thing. We build front desks that answer every enquiry, and we show you every month what they booked. You deal with me directly, from the first call.

**Signature:** Pratik Naragude · Founder, Protomation · Mumbai

**Photo:** the existing clay portrait until your photo arrives.

### 2.12 FAQ (clinic-specific; also FAQPage structured data)

1. **Does it sound robotic?**
   No. It sounds like a calm, well-trained receptionist. Callers can interrupt, change their mind and ask things out of order. Don't take our word for it: call the demo front desk and judge for yourself.
   *(No demo number yet: "…try the demo chat on this page.")*
2. **Which languages does it speak?**
   Hindi, Marathi and English, and it switches if the caller does. Other Indian languages are available on request; we test them with you before they go live.
3. **What if a patient wants to speak to a person?**
   They get one. You set the rules: during clinic hours the call is transferred to your desk; after hours it takes a message and alerts your team. Anything medical always goes to your doctors.
4. **Will it give medical advice?**
   No. It shares only what you approve, such as timings, consult fees and how to prepare. Clinical questions go to your doctors.
5. **Does it work with my calendar, clinic software and WhatsApp?** [CONFIRM]
   Usually, yes. It books into Google Calendar or your clinic software if that software can connect, and it replies on your WhatsApp Business number. If something can't connect, the diagnostic tells you before you spend anything on a build.
6. **Is patient data safe?**
   Callers are told about the AI and the recording, data stays in accounts you own wherever possible, and we sign a data processing agreement with every clinic. The details are on our Security & data page.
7. **How fast can we go live?** [CONFIRM]
   Most clinics go live 3–5 weeks after the diagnostic. A single phone line can be quicker.
8. **What does it cost?**
   A Front-Desk Diagnostic is ₹15,000 and comes off your build. Builds start at ₹2,00,000 for one location. The Managed Front Desk is optional and starts at ₹39,500 a month. Call minutes and WhatsApp messages are billed by the providers directly to your own accounts.
9. **What happens if we want to stop?** [CONFIRM]
   The Managed plan runs month to month with 30 days' notice. The phone number, WhatsApp account and data are yours, so you keep them, and we hand over everything you need to run it yourself.

### 2.13 Final CTA

**Title:** Find out how many patients you're missing.

**Lead:** Book a free 20-minute call. We'll look at how enquiries reach you today and tell you honestly whether a front desk would pay for itself. We reply within 6 working hours.

**Buttons:** CTA pair.

---

## 3. Clinics `/clinics`

**Eyebrow:** For clinics

**H1:** An AI front desk for clinics where every patient counts.

**Lede:** IVF and fertility centres, dermatology and hair transplant clinics, dental chains and diagnostic labs. Every enquiry answered in seconds, qualified and booked, in Hindi, Marathi or English.

**Jump links:** IVF & fertility · Dermatology & hair · Dental · Diagnostic labs

### 3.1 `#ivf` — IVF & fertility centres

Couples often research for weeks, then contact several centres in the same evening. The centre that answers kindly and clearly, and offers a first consult, usually gets the visit.

- **How enquiries arrive:** Phone calls after work, WhatsApp messages about cost and process, and leads from Meta and Google ads.
- **Where they leak:**
  - Calls after 7pm with nobody to answer
  - Cost questions on WhatsApp left until the next day
  - Ad leads called back hours later, when they no longer pick up
  - First consults booked but not confirmed, so the couple doesn't come
- **What the front desk does:**
  - Answers warmly in Hindi, Marathi or English
  - Shares only what you approve: consult fee, process, timings, documents to bring
  - Books the first consultation, and asks whether both partners will attend
  - Sends reminders and handles reschedules
  - Never discusses success rates or medical specifics; those go to your counsellor or doctor
- **What you see in the report:**
  - Enquiries by source and time of day
  - First consults booked
  - No-shows and reschedules
  - Follow-ups sent and answered

**Link:** Run the numbers for IVF → `/clinics?specialty=ivf#calculator`

### 3.2 `#dermatology-hair` — Dermatology & hair transplant clinics

Most enquiries start on Instagram or a Meta ad, often with a photo and a two-word message: "how much?" The clinic that replies fast and moves the conversation to a consult wins.

- **How enquiries arrive:** Instagram and WhatsApp messages, ad lead forms, and calls about specific treatments.
- **Where they leak:**
  - Messages answered hours later
  - Price questions answered with a price, but no consult offered
  - Consults booked but not reminded
  - No follow-up after the consult, while the patient is still deciding
- **What the front desk does:**
  - Replies in seconds, day or night
  - Answers price questions with the ranges you approve, then offers a consult
  - Notes the concern (acne, pigmentation, hair loss and so on) for your doctor
  - Books, reminds, and follows up after the consult within your rules
- **What you see in the report:**
  - Leads by source: Instagram, Meta, Google, website
  - Consults booked and attended
  - Follow-ups after the consult, and replies

**Link:** Run the numbers for skin and hair →

### 3.3 `#dental` — Dental implant and aligner clinics, and dental chains

Implant and aligner patients compare two or three clinics, ask about cost and EMI, and decide after a consult. Chains get calls at every branch, and each branch answers differently.

- **How enquiries arrive:** Calls to each branch, calls from Google Search and Maps, WhatsApp, and ad leads.
- **Where they leak:**
  - Branch phones unanswered during procedures
  - EMI and cost questions with no follow-up
  - Treatment plans given, then silence
  - Recall and check-up reminders forgotten
- **What the front desk does:**
  - Answers for every branch and books at the right one
  - Explains your approved EMI options and consult fee
  - Follows up on treatment plans on the schedule you set
  - Sends reminders and recalls
- **What you see in the report:**
  - Enquiries and bookings per branch
  - Response times per branch
  - Treatment-plan follow-ups and replies

**Link:** Run the numbers for dental →

### 3.4 `#diagnostic-labs` — Diagnostic labs with home sample collection

Home collection is booked by phone and WhatsApp, often early in the morning and often by someone booking for a parent. A confirmed slot, fast, wins the booking.

- **How enquiries arrive:** Early-morning calls, WhatsApp messages with a photo of a prescription, and website forms.
- **Where they leak:**
  - Calls before your desk opens
  - WhatsApp requests not confirmed in time
  - Prescription photos waiting for someone to read them
  - Cancellations not rebooked
- **What the front desk does:**
  - Books a collection slot by area or pin code
  - Shares the preparation instructions you approve, such as fasting
  - Passes prescription photos to your team to confirm the tests
  - Sends reminders and rebooks cancellations
- **What you see in the report:**
  - Bookings by hour and area
  - Response times
  - Cancellations and rebookings

**Link:** Run the numbers for labs →

### 3.5 Calculator `#calculator`

**Title:** Run your clinic's numbers

The calculator from §2.5, with the specialty taken from the link.

### 3.6 Clinic FAQ

Home FAQs 1–5, 7 and 8, plus:

- **Can it handle several branches?**
  Yes. It can answer for every branch from one number or from each branch's own number, and book into the right calendar.
- **Do we need to change our phone number?** [CLAIM]
  No. We can forward missed or after-hours calls to it, or give it its own number for your ads. You choose in the diagnostic.

**End of page:** CTA pair.

---

## 4. Education `/education`

**Eyebrow:** For education businesses

**H1:** Every lead called within minutes. Every counselling session booked.

**Lede:** For study-abroad consultancies, upskilling academies and professional-exam coaching. The same AI front desk, set up for admissions: it calls new leads within minutes, books counselling sessions and follows up until they enrol or say no.

**Who it's for**

| Audience | Text |
|---|---|
| Study-abroad consultancies | Students and parents enquire from ads and education fairs, then compare consultancies. The first useful call usually wins the counselling session. |
| Upskilling academies & bootcamps | Working professionals fill in a form at night and forget by morning. A call within minutes, while they're still interested, makes the difference. |
| Professional-exam coaching | Enquiries spike around results and registration dates. Every batch enquiry gets an answer, even on the busiest day. |

**Note:** We work with adult learners and their families. We don't build for schools or handle children's data.

**Five jobs, admissions version**
1. **Call:** every new lead called within minutes, while they still remember filling in the form.
2. **Qualify:** course, intake, budget, eligibility and preferred country or batch.
3. **Book:** a counselling session in your counsellor's calendar.
4. **Follow up:** polite WhatsApp follow-ups on a schedule you approve; anyone who asks to stop is never contacted again.
5. **Report:** leads → sessions → enrolments, every month.

**Calculator (education presets, illustrative [CONFIRM])**

| Preset | Leads/mo | Not called within 10 min % | Book session % | Enrol % | Avg fee | Revenue at risk |
|---|---|---|---|---|---|---|
| Study abroad | 500 | 60 | 30 | 15 | ₹75,000 | ₹10,12,500 |
| Upskilling | 800 | 50 | 25 | 10 | ₹60,000 | ₹6,00,000 |
| Exam coaching | 1,000 | 50 | 30 | 15 | ₹40,000 | ₹9,00,000 |

Labels change to "Leads per month", "Not called within 10 minutes (%)", "Leads that book a counselling session (%)", "Sessions that enrol (%)" and "Average fee (₹)". Output: "Enrolments lost each month". The disclaimer is the same as §2.5.

**Where we work:** Based in Mumbai. We set up and run front desks for education businesses anywhere in the world, in English, Hindi or Marathi.

**FAQ**
- **Can it call leads in other countries?** [CLAIM]
  Yes, where local calling rules allow. We check the rules for each country before outbound calls are switched on.
- **Does it work with our CRM?**
  Usually. It can update common CRMs and spreadsheets, and the diagnostic confirms yours.
- **Will it pressure students?**
  No. It answers questions, books a session and follows up politely on a schedule you approve. Anyone who asks to stop is never contacted again.

**End of page:** CTA pair.

---

## 5. How it works `/how-it-works`

**H1:** One front desk. Here's how it works.

**Lede:** Five parts that work as one: the voice line, chat on WhatsApp and your website, booking and integrations, your clinic's knowledge, and monitoring with a monthly report.

### 5.1 `#voice` — Every call answered

- **Inbound calls:** answers your clinic number or a dedicated line, on the first ring, at any hour.
- **Missed-call callback** [CLAIM]: if your desk misses a call, it calls the patient back within a minute.
- **New leads:** calls ad and website leads within a minute of the form being sent.
- **Reminders:** calls or messages before appointments, and handles reschedules.
- **Disclosure:** every call starts by saying it's an AI assistant and that the call may be recorded.

### 5.2 `#chat` — WhatsApp and website chat

- Replies on your WhatsApp Business number and in a chat window on your website.
- Answers from your approved FAQs, offers slots and books inside the conversation.
- Hands over to your team, with the whole conversation, when a patient asks for a person.

### 5.3 `#integrations` — Booking and integrations

- Books into Google Calendar or your clinic software, where it can connect.
- Sends each lead to your CRM or a Google Sheet, and alerts your team on WhatsApp or email.
- Every step is logged, so we can show you exactly what happened to any enquiry.

### 5.4 `#knowledge` — Your clinic's knowledge

- We write the front desk's knowledge base with you: services, doctors, timings, fees, preparation instructions, and what it must never say.
- You approve every answer before it goes live. Changes are a WhatsApp message away.
- Medical questions always go to your doctors.

### 5.5 `#monitoring` — Monitoring and the monthly report

- Alerts when a channel stops working.
- Test calls after every change, in every language you use.
- A monthly report: enquiries answered, response times, after-hours share, consults booked and their estimated value.

### 5.6 How an engagement runs

The five steps from §2.7, with their timings.

### 5.7 What we need from you

- One person at the clinic who knows how enquiries are handled today, usually your front-desk lead
- Your services, doctors, timings, and the fees you're happy to share
- Access to your calendar or clinic software, and your WhatsApp Business account
- Your handoff rules: who takes over, when, and on which number
- About two hours of your team's time in the first two weeks [CONFIRM]

**End of page:** CTA pair.

---

## 6. Front-Desk Diagnostic `/diagnostic`

**Eyebrow:** Front-Desk Diagnostic

**H1:** Find out exactly where your enquiries leak.

**Lede:** A fixed-price check of how your clinic handles calls, WhatsApp and ad leads today, with a written plan and a fixed quote at the end. ₹15,000, credited in full against your build.

**What it is:** A paid, fixed-scope audit of your front desk as a patient experiences it. We don't need access to patient records.

**What's included** [CONFIRM scope]
- Test calls and WhatsApp messages at different times across a week, including lunch hours, evenings and a Sunday
- Your response-time baseline: how fast, and how often, each channel answers
- A review of where your leads come from (Meta, Google, website, walk-ins) and what happens to them
- A 30-minute conversation with your front-desk lead
- An estimate of what missed enquiries cost you, using your own numbers
- A recommended setup and a fixed quote

**What you get:** A written report, plus a 30-minute walkthrough call. It's yours to keep, whether or not you build with us.

**Timing** [CONFIRM]: Report within 7 working days of kick-off.

**Price box** [CONFIRM]: ₹15,000 (plus GST). Paid upfront by UPI or bank transfer. Credited in full against your build if you go ahead within 30 days.

**Why it's paid:** Because it's real work: a week of test calls, a baseline and a plan. Paying for it gets you our full attention, and if you go ahead it costs you nothing extra.

**Next step:** Start with a free 20-minute call. If the diagnostic makes sense, we'll book it from there.

**End of page:** CTA pair.

---

## 7. Pricing `/pricing`

**Eyebrow:** Pricing

**H1:** Clear starting prices. A fixed quote before you commit.

**Lede:** There are three things you can buy. The diagnostic tells you exactly what your clinic needs, and what it will cost.

### Cards

**1. Front-Desk Diagnostic — ₹15,000**
One-time · credited against your build
- Test calls and WhatsApp messages across a week
- Response-time baseline and lead-source review
- Missed-enquiry estimate with your numbers
- Written report, walkthrough and a fixed quote

Button: Start with a free call

**2. Front-Desk Build — from ₹2,00,000**
One-time · single location
- Voice line, WhatsApp and website chat
- Booking into your calendar or clinic software
- Knowledge base written with you
- Reminders, follow-ups and human handoff rules
- Pilot on one channel with one agreed number
- 30 days of fixes after go-live [CONFIRM]

Note: Chains and multi-location clinics are quoted individually.

**3. Managed Front Desk — from ₹39,500/month** · badge: *Recommended*
Optional · month to month
- Monitoring and alerts
- Updates when your fees, doctors or timings change
- Test calls after every change
- Monthly report on consults booked
- Support within 6 working hours

### Below the cards
- Call minutes, WhatsApp messages and AI usage are billed by the providers directly to your own accounts, so you see every rupee. We estimate them for you in the diagnostic.
- Outside India? We quote in USD. Ask on the call.
- Prices exclude GST. [CONFIRM]

### Ownership (replaces the current four points)

| Point | Text |
|---|---|
| Your accounts | Phone number, WhatsApp Business account and AI provider accounts are set up in your name wherever possible. |
| Your data | Enquiries, recordings and reports belong to your clinic. |
| No lock-in | Stop the Managed plan with 30 days' notice, and we hand over everything you need to run it yourself. |
| A fixed quote | The build price is fixed after the diagnostic. |

### Pricing FAQ (also FAQPage structured data)

1. **Why is the diagnostic paid?**
   It's a week of real work: test calls, a response-time baseline and a written plan. The fee comes off your build if you go ahead within 30 days.
2. **Is the Managed plan required?**
   No. Without it, you get a full handover and 30 days of fixes after go-live [CONFIRM]. With it, we monitor the front desk, keep it up to date and report every month.
3. **What do call minutes and messages cost?**
   They're billed by the telephony, WhatsApp and AI providers to your own accounts, based on how much you use. We estimate your monthly usage in the diagnostic so there are no surprises.
4. **Who owns the accounts and the data?**
   You do, wherever possible. Your phone number, WhatsApp Business account, calendar and AI provider accounts are in your name, and we work in them with access you can remove.
5. **How long is the contract?** [CONFIRM]
   The build is a one-time project. The Managed plan is month to month, with 30 days' notice.
6. **How do payments work?** [CONFIRM]
   The diagnostic is paid upfront. The build is paid in two halves: half to start, and half when the pilot hits the number we agreed. The Managed plan is billed monthly in advance. We take UPI or bank transfer.
7. **Do you work outside India?**
   Yes. We quote in USD for clients outside India. Ask on the call.
8. **Do prices include GST?** [CONFIRM]
   No. Prices exclude GST where it applies.

**End of page:** CTA pair.

---

## 8. Security & data `/security`

**H1:** How we handle your patients' data.

**Lede:** Plain answers about what we store, where, who can see it and what happens if something goes wrong. Built to support your obligations under India's DPDP Act, 2023.

Only items you mark **TRUE TODAY** go on the page. The rest stay in the launch checklist as to-dos.

| # | Topic | Draft text | Status |
|---|---|---|---|
| 1 | Where data lives | Enquiry and call records are stored with [provider] in [region]. | [CONFIRM] once the Supabase project is connected |
| 2 | Encryption | Data is encrypted in transit (HTTPS) everywhere, and encrypted at rest by our database and hosting providers. | [CONFIRM] per provider |
| 3 | Access | Only the people who run your front desk can access it, each with their own login and two-factor authentication. You can see who has access and remove it. | [CONFIRM] 2FA on every account |
| 4 | Telling callers | Every call starts by saying the caller is speaking with an AI assistant and that the call may be recorded. Callers can ask for a person at any point. | [CONFIRM] |
| 5 | Human handoff | You decide when a person takes over. Anything medical goes to your doctors. | [CONFIRM] |
| 6 | How long we keep it | Call recordings and transcripts are kept for [90] days, then deleted, unless you ask for a different period. | [CONFIRM] period, and that deletion is set up |
| 7 | If something goes wrong | If we find a breach affecting your data, we tell you within [24 hours] of discovering it, with what we know, so you can meet your own reporting duties. | [CONFIRM] |
| 8 | Data processing agreement | We sign a data processing agreement with every client before any patient data is handled. | [CONFIRM] that a template exists |
| 9 | No model training | We don't use your data or your patients' data to train AI models, and we choose providers whose terms say they don't either. | [CONFIRM] per provider |
| 10 | Ownership | Your accounts and your data stay yours. When we stop working together, we hand everything over and delete our copies. | [CONFIRM] |

**Note (always shown):** This page describes our practices. It isn't legal advice: your obligations under the DPDP Act depend on your clinic, so check them with your adviser.

**Contact:** Questions about data? Write to Pratik Naragude at [email]. We reply within 6 working hours.

**End of page:** CTA pair.

---

## 9. Work `/work`

**H1:** Proof you can check yourself.

**Lede:** We're a young practice, so we won't show you logos we haven't earned. Here's what you can test today: the demo front desk, and the report you'd get every month.

**Demo:** the demo call card and the chat demo (§2.4).

### Sample monthly report

**Title:** What your monthly report looks like

**Caption:** Sample report with dummy data for a fictional clinic. Not a client result.

**Watermark:** SAMPLE

| Measure | Sample value |
|---|---|
| Enquiries handled | 412 (calls 236 · WhatsApp 141 · website chat 35) |
| Answered within 60 seconds | 97% |
| Arrived outside clinic hours | 138 (33%) |
| Consults booked | 61 |
| Reminders sent · no-shows | 118 · 6 |
| Handed to your team | 29 |
| Estimated value of consults booked | ₹6,10,000 (at your consult-to-treatment rate) |
| Note from us | Most after-hours calls came between 8pm and 10pm. Consider adding evening consult slots on Tuesdays. |

### What we've already built [CONFIRM — show or hide]

**An outbound lead-qualification caller.** When a lead submits a form, an AI voice agent calls them back, asks the qualifying questions and saves the answers. It's the same engine behind the front desk's speed-to-lead calls.

*(The case-study block exists in code but stays hidden until a real client's numbers can be published with permission.)*

**End of page:** CTA pair.

---

## 10. About `/about`

**H1:** A front desk you can trust, from a founder you can reach.

**Lede:** Protomation is a founder-led practice in Mumbai. We do one thing: install and run AI front desks for clinics and education businesses.

### Founder bio (pick one) [CONFIRM]

**A — short (recommended):**
Pratik Naragude is the founder of Protomation. He helps businesses use AI as a catalyst for growth and reach. Today he focuses on one problem that costs clinics more than they realise: enquiries that arrive when nobody can answer. He designs every front desk himself and stays your contact from the first call.

**B — story:**
Pratik Naragude started Protomation to help businesses use AI as a catalyst for growth and reach. Working with businesses across different sectors [CLAIM], he kept seeing the same leak: the call, message or form that arrived when nobody could answer, and went to whoever answered first. Protomation now does one thing about it. It sets up AI front desks for clinics and education businesses, and reports every month on what they booked.

*(Your words were: "helping businesses across different sectors to adapt AI as their catalyst in their growth and reach." Corrected, that reads: "helping businesses across different sectors adopt AI as a catalyst for growth and reach." Both versions above build on it, and point it at the front-desk focus so the About page matches the rest of the site.)*

### How we work

| Principle | Text |
|---|---|
| Measured in booked consultations | Not in features or call minutes. Every month you see how many consults the front desk booked. |
| People stay in charge | Your team sets the rules, approves every answer and can take over any conversation. |
| Honest about what we can show | There are no invented results on this site. When we have client numbers, we'll publish them with permission. |
| You deal with the founder | No account managers. You talk to the person who builds your front desk. |

### The team

| Name | Role | Line |
|---|---|---|
| Pratik Naragude | Founder | Designs, builds and runs every front desk. |
| Shrawani | Design Analyst | Shapes how each front desk looks and reads: the chat on your website, the WhatsApp messages patients receive and the monthly report your team reads. [CONFIRM] |

**Where:** Based in Mumbai, India. Working with clients worldwide.

**End of page:** CTA pair.

---

## 11. Contact `/contact`

**H1:** Book a free 20-minute call.

**Lede:** Tell us a little about your clinic or institute. We reply within 6 working hours (Mon–Sat, 10am–7pm IST) to fix a time that suits you.

**Calendar** (only when a calendar link is set): Or pick a time now.

**Form header strip:** `// BOOK A FREE CALL` · `REPLY WITHIN 6 WORKING HOURS`

### Fields

| Label | Notes |
|---|---|
| Your name * | |
| Clinic or business name * | |
| Type of business * | IVF & fertility · Dermatology & hair · Dental · Diagnostic lab · Education · Other |
| City * | |
| Enquiries per month | Under 100 · 100–300 · 300–1,000 · Over 1,000 · Not sure |
| Phone (WhatsApp preferred) * | placeholder `+91 98765 43210` |
| Email * | |
| Anything we should know? | optional; placeholder "Where do most enquiries come from? What isn't working today?" |
| ☐ I agree to be contacted by Protomation by phone, WhatsApp or email about my enquiry. * | required |

**Small print:** We use these details only to reply to you. See our Privacy Policy.

**Button:** Request my free call

### Messages

| Case | Text |
|---|---|
| Name missing | Enter your name. |
| Business name missing | Enter your clinic or business name. |
| Type missing | Pick the type of business. |
| City missing | Enter your city. |
| Phone invalid | Enter a phone number we can call or WhatsApp, like +91 98765 43210. |
| Email invalid | Enter an email address like you@clinic.com. |
| Consent unticked | Tick the box so we can contact you about your enquiry. |
| General | Check the highlighted fields and send again. |
| Rate limited | Too many attempts. Message us on WhatsApp instead. |
| Both destinations failed | Your request didn't go through. Try again, or message us on WhatsApp. |
| Success | Thanks, {first name}. We'll reply within 6 working hours (Mon–Sat, 10am–7pm IST) to fix a time for your call. Want to speed things up? Message us on WhatsApp. |

### Aside

**What happens on the call:** 20 minutes, no slides. We'll ask how enquiries reach you today, where they go unanswered and what a booked consult is worth to you. You'll leave knowing whether an AI front desk makes sense for your clinic, and if it does, whether to start with a diagnostic.

| | |
|---|---|
| WhatsApp | +91 74999 07619 · Chat on WhatsApp |
| Email | protomation.services@gmail.com (switch to hello@protomation.ai when the mailbox exists) |
| Where | Mumbai, India · working with clients worldwide |
| Reply time | Within 6 working hours (Mon–Sat, 10am–7pm IST) |

---

## 12. Privacy Policy and Terms — changes (draft; needs legal review)

Both pages keep their plain-English style. Each gets "Last updated" bumped and is flagged: **have a lawyer read this before relying on it.**

### Privacy Policy
- **Who we are:** Protomation AI, a sole proprietorship based in Mumbai, India, run by Pratik Naragude. [CONFIRM entity]
- **What the enquiry form collects:** name, business name, type of business, city, enquiry range, phone, email, your message, your consent and when you gave it, the page you sent it from, and ad campaign tags (UTM) if you arrived from an ad.
- **Analytics** (replaces "There is no analytics…"): We use Vercel Web Analytics to count page visits and clicks on our main buttons. It doesn't use cookies, doesn't build a profile of you and doesn't follow you to other sites.
- **How we contact you:** by phone, WhatsApp or email, as you agreed on the form. Reply "stop" or email us to withdraw at any time.
- **Demo line** (once live): Calls to our demo front desk are recorded and transcribed to show how it works and to improve it. Recordings are deleted after [CONFIRM] days. Please don't share real medical details.
- **Your rights under India's DPDP Act, 2023:**
  - ask what we hold about you
  - correct or erase it
  - withdraw consent
  - nominate someone to act for you
  - raise a grievance

  Grievance contact: Pratik Naragude, [email]. Response time: [CONFIRM with lawyer].
- **How long we keep enquiries:** if we don't end up working together, we delete your enquiry after [12 months] [CONFIRM].
- **Services we use:**
  - Supabase (stores enquiries)
  - Vercel (hosting and analytics)
  - n8n (sends us a notification)
  - Meta/WhatsApp (if you message us)
  - Google (if you sign in)
- **Removed:** Care Plan subscription and payment-provider wording, since online checkout is off.
- **Kept:** sign-in cookies.

### Terms of Service
- **What we offer:** Front-Desk Diagnostic, Front-Desk Build, Managed Front Desk.
- **Diagnostic:** paid upfront; non-refundable once test calls start [CONFIRM]; credited in full if a build starts within 30 days.
- **Build:**
  - fixed quote after the diagnostic
  - paid in two halves, the second due when the pilot meets the agreed metric [CONFIRM]
  - 30 days of fixes after go-live [CONFIRM]
- **Managed Front Desk:** optional; monthly in advance; 30 days' notice to stop. This replaces the Care Plan clauses.
- **Usage costs:** billed by providers to the client's own accounts (already in the Terms).
- **Ownership:** kept as is.
- **Client responsibilities (new):** the clinic decides what the front desk may say, approves its answers, and is responsible for having a lawful basis to process its patients' data. Protomation processes that data on the clinic's behalf under the data processing agreement. The front desk must not be used to give medical advice.

---

## 13. Chat demo script — "Protomation Demo Clinic" (fictional)

Replaces every intent in `src/lib/demo-bot.ts`. Everything about the clinic is invented and says so.

**Greeting:** Hi, I'm the front desk for Protomation Demo Clinic, a made-up clinic for this demo. I can share timings and fees, and book a consultation. What would you like to know?

**Suggestion chips:** What are your timings? · How much is a consultation? · Book a consultation · Can I speak to a doctor?

| Intent (keywords) | Reply |
|---|---|
| timings, open, hours, Sunday | We're open Monday to Saturday, 9am to 8pm, and Sunday 10am to 2pm. *(Demo clinic, made-up timings.)* |
| where, address, location | We're at 1 Demo Road, Andheri West, Mumbai. That address is made up: this is a demo clinic. |
| fee, cost, price, how much, charges | A first consultation is ₹800 *(demo fee)*. Treatment costs depend on what the doctor recommends, so we'd book you a consult first. Shall I find you a slot? |
| book, appointment, consult, slot | Happy to help. Which suits you: tomorrow at 11am, tomorrow at 5:30pm, or Saturday at 10am? *(Demo only: nothing is really booked.)* |
| 11, 5:30, Saturday, tomorrow (after a booking prompt) | Done. You're booked with Dr Demo. In a real setup you'd now get a WhatsApp confirmation and a reminder the day before, and the booking would be in the clinic's calendar. |
| IVF, fertility, pregnancy, conceive | We'd be glad to help. A first consultation with our fertility specialist takes about 45 minutes, and it helps if both partners can come. Shall I book one? |
| medicine, dose, pain, symptoms, report, results, should I | I can't give medical advice, but our doctor can. Shall I book you a consultation, or ask the clinic to call you back? |
| human, person, staff, doctor, call me | Of course. In a real clinic I'd pass this conversation to the front desk now, with everything you've told me, so you don't have to repeat yourself. |
| Hindi, or any Devanagari text | हाँ, हिंदी में भी बात हो सकती है। आप क्या जानना चाहेंगे? *(Yes, we can talk in Hindi too. What would you like to know?)* |
| are you AI, bot, real, what is this | I'm a demo AI front desk built by Protomation. A real one answers a clinic's calls, WhatsApp and website chat like this, from the clinic's own approved answers. |
| Protomation price, your pricing, how much for this | Protomation's own prices: a Front-Desk Diagnostic is ₹15,000 (credited against the build), builds start at ₹2,00,000, and the optional Managed Front Desk starts at ₹39,500 a month. → *See pricing* |
| anything else | I'm a short demo, so I only know the basics: timings, fees, location and booking. A real front desk knows everything your clinic approves. Try "book a consultation". |

---

## 14. Page titles and descriptions

Titles get "| Protomation" appended automatically.

| Route | Title | Description |
|---|---|---|
| `/` | AI Front Desk for Clinics in India | Every call, missed call and WhatsApp enquiry answered in Hindi, Marathi or English, qualified and booked. For IVF, skin, hair and dental clinics. |
| `/clinics` | AI Front Desk for IVF, Skin, Hair & Dental | Answer every patient enquiry in seconds and book more consults. For IVF centres, skin and hair clinics, dental chains and diagnostic labs. |
| `/education` | AI Admissions Front Desk for Education | Call every lead within minutes, book counselling sessions and follow up on WhatsApp. For study-abroad, upskilling and exam-coaching businesses. |
| `/how-it-works` | How the AI Front Desk Works | Voice, WhatsApp and website chat, booking into your calendar, your clinic's knowledge base, and monitoring with a monthly report. One system. |
| `/diagnostic` | Front-Desk Diagnostic for Clinics | A fixed-price check of how your clinic answers calls, WhatsApp and ad leads, with a written plan and quote. ₹15,000, credited against your build. |
| `/pricing` | AI Front Desk Pricing | Diagnostic ₹15,000, builds from ₹2,00,000, and an optional Managed Front Desk from ₹39,500 a month. A fixed quote before you commit. |
| `/security` | Security & Patient Data | How we handle patient data: AI disclosure on every call, accounts you own, no model training on your data, and support for the DPDP Act. |
| `/work` | Demo Front Desk & Sample Report | Try our demo AI front desk and see the monthly report your clinic would get. No invented case studies, only what you can check yourself. |
| `/about` | About Protomation | A founder-led practice in Mumbai that installs and runs AI front desks for clinics and education businesses. Meet founder Pratik Naragude. |
| `/contact` | Book a Free 20-Minute Call | Tell us about your clinic. We reply within 6 working hours to fix a time, and you'll leave knowing whether an AI front desk would pay off. |

**Structured data `knowsAbout`:** AI receptionist · Patient enquiry handling · Appointment booking · WhatsApp Business messaging · Voice AI in Hindi and Marathi · Speed-to-lead calling · DPDP Act data handling

---

## 15. `/llms.txt`

```
# Protomation

> Protomation installs and runs AI front desks for high-ticket clinics in India, with education businesses as a second focus. Every call, missed call and WhatsApp enquiry is answered in Hindi, Marathi or English, qualified, booked into the clinic's calendar and followed up. An optional managed plan adds monitoring and a monthly report on consultations booked.

Based in Mumbai, India, working with clients worldwide. Founder: Pratik Naragude.

## Who it is for
- IVF and fertility centres
- Dermatology and hair transplant clinics
- Dental implant and aligner clinics, and dental chains
- Diagnostic labs with home sample collection
- Education businesses for adult learners: study-abroad consultancies, upskilling academies, professional-exam coaching

## Prices (INR, excluding GST)
- Front-Desk Diagnostic: ₹15,000, credited in full against the build
- Front-Desk Build: from ₹2,00,000, one-time, single location
- Managed Front Desk: from ₹39,500 per month, optional

## Pages
- Clinics: https://www.protomation.ai/clinics
- Education: https://www.protomation.ai/education
- How it works: https://www.protomation.ai/how-it-works
- Front-Desk Diagnostic: https://www.protomation.ai/diagnostic
- Pricing: https://www.protomation.ai/pricing
- Security and data: https://www.protomation.ai/security
- Contact: https://www.protomation.ai/contact
```
