# 07 — Pre-Launch Checklist

Don't ship until every item here is resolved — most of these are open items already flagged in `00-PRD.md`, restated as concrete gates.

## Content accuracy (blocks launch — these are credibility risks, not polish items)

- [ ] Bakebox confirmed as real client vs. personal concept project (affects category placement and whether it's framed as client work)
- [ ] "15–20% engagement increase" / "30% turnaround reduction" stats confirmed as real and entity-specific, or removed/softened (currently flagged as duplicated across NDRMF and Anebos Studios — likely not independently measured for both)
- [ ] ABA Group page structure confirmed: one page with 5 sections, or 5 separate URLs
- [ ] CV rebuilt per `05-cv-rebuild.md` and matches the website's case study list exactly — no case study on the site that's absent from the CV, and vice versa
- [ ] Resume link on `/about` and `/contact` points to the rebuilt CV, not `CV_NEW.pdf`

## Honesty/framing checks (re-read `00-PRD.md` section 3 before checking these off)

- [ ] Watch How Malaysia hub page clearly states the routing relationship before listing the 4 sub-accounts
- [ ] No page anywhere implies Muneeb founded or owns Trenddeck — language is "built their brand-on-social presence from zero," not "founded the company"
- [ ] Anebos Studios clearly marked as his own venture, not a client
- [ ] No Tier 2 case study has a fabricated "visit live site" link

## Technical

- [ ] Contact form actually sends (test end-to-end, don't just check it renders)
- [ ] All 16ish pages build successfully via `generateStaticParams()`
- [ ] Lighthouse/perf check — this is a marketing/portfolio site, slow load directly undercuts "I build fast e-commerce sites" claims made in the copy itself
- [ ] Custom domain set up, or explicit decision made to launch on `*.vercel.app` temporarily with a plan to move off it
- [ ] All accent/text contrast pairs checked at 4.5:1 minimum
- [ ] Mobile check at 375px on: case study header band, ABA Group table, About page timeline

## Before sending to anyone (recruiter, client, etc.)

- [ ] Muneeb has personally read every case study page and confirmed the facts as written — this doc package was built from a case-study doc that already needed multiple corrections during scoping; one more human pass before this goes out publicly is not optional
- [ ] LinkedIn profile (`linkedin.com/in/Muneeb-Bilal`) reflects consistent dates/roles with the rebuilt CV and site — a mismatch here is just as damaging as a site/CV mismatch
