# 04 — Page Specs

## Persistent layout (`/app/layout.tsx`)

**Nav:** logo/initials mark (left) — "MMB" or full name, small caps. Right-aligned links: Work / About / Contact. On case study pages, nav background should not fight the active accent color — keep nav bar itself always on `--paper`/`--ink`, never accent-colored, so it stays legible regardless of which of 16 palettes is active below it.

**Footer:** name, one-line tagline, contact email, LinkedIn, resume download link, copyright. No fake "Made with love by [agency]" line — that's specific to Magnetto being an agency-for-hire template; Muneeb is the person, not a studio brand (Anebos Studios is a separate, smaller mention if at all, not the entity branding this whole site).

---

## Home (`/`)

1. **Hero** — name, role/location, 2–3 sentence positioning statement (from `02-content-copy.md`). Headline uses the word-stagger fade-up on load.
2. **Featured work** — 5 cards (selection in content doc), full-bleed accent-colored blocks with case study title overlaid, link to each page.
3. **About teaser** — 2-sentence summary + portrait photo (the B&W image already supplied) + "Read more →" to `/about`.
4. **Milestones** — 3 real numbers (years, brand count, post count), no fake "0+" placeholder pattern.
5. **CTA footer band** — "Have a brand that needs a strategist?" → `/contact`.

No services section, no Journal/blog section, no client-logo strip (no client has given logo-usage permission to imply endorsement — do not add this without explicit confirmation from each client, which is unrealistic to obtain; skip entirely).

---

## About (`/about`)

1. Header with portrait (supplied B&W image), name, role.
2. Long-form bio (from content doc).
3. **Timeline** — this is the one place numbered/chronological markers are justified (per design system note). Vertical timeline, Jan 2023 → Present, every engagement plotted with its accent color as a small marker dot, clicking through to its case study page. This single timeline view is what visually communicates the Watch How Malaysia routing structure at a glance — show Safir Wear / FacingNorth / Trenddeck / ABA Group as nested/indented under the Watch How Malaysia entry rather than as flat parallel entries.
4. Education block.
5. Certifications list (with working links from the CV).
6. Skills grid (5 categories from CV).
7. Resume download CTA.

---

## Work index (`/work`)

Grid of cards, default sort: reverse-chronological (most recent first), since that's what a recruiter/client scanning the page actually wants to see first. Each card: accent-colored top edge, client name, role, date range, one-line descriptor. Watch How Malaysia renders as a visually distinct "hub" card (see `02-content-copy.md` for exact treatment) that leads to its own page with 4 routed sub-cards.

Optional filter/tag row (only if time allows — not critical path): "Brand Identity" / "Web Design" / "Social Strategy" / "Photography" tags, since the case studies do span genuinely different skill emphases and a recruiter looking specifically for "has this person done web work" benefits from being able to filter rather than read all 16.

---

## Case study template (`/work/[slug]`) — used for all ~15 non-hub case studies

Fixed component order, every time:

1. **Header band** — accent-colored background (this case study's primary accent). Client name (large, display type), role, date range, status badge (Ongoing / Closed / Intermittent), and — only if `category === "B"` — a small "via Watch How Malaysia" tag, linking back to the hub page.
2. **Intro paragraph** — the italicized first-person framing line from the content doc.
3. **"The work" bullet list** — the concrete deliverables list.
4. **Image gallery** — placeholder blocks (per tech setup doc) until real assets supplied. 3–5 slots depending on how much content exists per case study.
5. **Tier-dependent CTA:**
   - Tier 1 → "Visit live site →" button, opens in new tab.
   - Tier 2 → no CTA button at all. Optionally: "Verify on Instagram" as plain text link IF Muneeb supplies the actual handle — do not link to a guessed/generic handle.
   - Tier 3 → no external CTA; internal link back to `/about` or `/work` instead.
6. **Metrics note** (only renders if `metricsNote` is set in the data object) — small flagged callout, NOT styled identically to confirmed facts. Suggested treatment: dashed border, smaller text, literally labeled "Unverified — confirm before treating as fact" until Muneeb confirms, at which point either delete the flag or convert the stat into the main bullet list as a confirmed fact.
7. **Next/previous case study nav** — simple prev/next through the `/work` index order, so a visitor doesn't have to back out to the index between every case study.

---

## ABA Group page (`/work/aba-group`) — special case

Same template as above for the header/intro, but section 3 ("The work") is replaced with the 5-entity table from the content doc, each entity getting its own mini-card with its own accent swatch shown inline (small color chip, not a full page-background swap — reserve full accent backgrounds for genuinely separate pages). This keeps ABA Group as one page rather than 5, per the current open item in the PRD — **revisit this if Muneeb confirms he wants 5 separate sub-URLs instead.**

---

## Contact (`/contact`)

1. Short framing line.
2. Form: Name, Email, Project type (select), Message. Client-side validation (required fields, valid email format) before submit.
3. On submit: call the `/api/contact` route (see tech setup doc); show a clear success/error state in the interface's voice ("Message sent — I'll reply within a day or two." / "Something went wrong sending that — email me directly at muneebster137@gmail.com instead.").
4. Direct contact details displayed plainly alongside the form, not hidden behind it — some visitors will skip the form and just email/call directly; make that easy.
