# 06 — Claude Code Build Prompt

Paste this into Claude Code in this project's root, with files `00` through `05` of this doc package present in the same folder for reference.

---

You're building a personal portfolio website for Muhammad Muneeb Bilal, a visual designer and digital strategist. Read every file in this folder before writing any code — `00-PRD.md` for scope and the critical honesty constraints around how his work history is framed, `01-design-system.md` for the full color/type/motion system, `02-content-copy.md` for the actual written content for every page (use this verbatim or near-verbatim — don't regenerate the copy), `03-tech-setup.md` for the stack and architecture, `04-page-specs.md` for exact page layouts, `05-cv-rebuild.md` for a follow-up task (not part of this build pass).

**Before writing code:** confirm you understand the Watch How Malaysia structure — it's a hub page with 4 routed sub-case-studies (Safir Wear, FacingNorth, Trenddeck, ABA Group), not 4 independent top-level clients. Get this wrong and the entire honesty framing of the site breaks.

**Build order:**
1. Scaffold the Next.js 15 + TypeScript + Tailwind v4 project per `03-tech-setup.md`'s structure.
2. Build `lib/case-studies.ts` first — populate it completely from `02-content-copy.md`, including every accent color from `01-design-system.md`'s table, every tier flag, every `metricsNote` flag. This file is the foundation everything else reads from.
3. Build `CaseStudyTemplate.tsx` per `04-page-specs.md`'s fixed component order, then wire `[slug]/page.tsx` to render any case study through it via `generateStaticParams()`.
4. Build the ABA Group special-case page.
5. Build Home, About, Work index, Contact in that order.
6. Wire the contact form to a real serverless API route — don't ship a non-functional form.
7. Take screenshots at each major milestone (per the frontend-design process) and self-critique against the design plan before moving on — particularly check that the per-case-study accent swap actually reads as a deliberate signature once 3–4 pages are built side by side, not as visual inconsistency.
8. Verify accessibility floor: keyboard focus visible everywhere, all accent/text pairings meet 4.5:1 contrast (several accent pairs in the design doc are flagged as accent-only, never for body text — respect that), `prefers-reduced-motion` respected.
9. Responsive check down to a 375px viewport — the case study header bands and the ABA Group 5-entity table are the two layouts most likely to break on small screens; check those first.

**Do not:**
- Add a magnetic cursor effect (explicitly cut in the design doc).
- Add a blog/Journal section (explicitly cut in the PRD).
- Invent or "fill in" any client metric not present in `02-content-copy.md`. If something is flagged `metricsNote`, render the unverified-flag treatment, don't quietly promote it to a confirmed stat.
- Use real-looking AI-generated mockup images as placeholders — solid accent-color blocks with subtle grain only, per `03-tech-setup.md`.
- Present Trenddeck, or any Watch How sub-account, as independently landed work.

When the build is functionally complete, deploy to Vercel and report back the preview URL along with a short list of anything in the doc package that turned out to be ambiguous or under-specified during the actual build — that feedback should go back into these docs before the next iteration, not get silently resolved in code only.
