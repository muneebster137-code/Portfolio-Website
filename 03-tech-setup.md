# 03 — Tech Setup

## Stack

- **Next.js 15** (App Router). Use the latest stable 15.x at time of build, not 16 — this is a content/marketing site with no need for bleeding-edge features, and 15 has wider plugin/library compatibility than a freshly-released major version. (Note: Abdullah's own Digivixo project uses Next.js 16 — that's a separate project with separate constraints; don't default to copying that choice here without re-checking current stable versions at build time.)
- **TypeScript** throughout.
- **Tailwind CSS v4** for utility styling, with the design tokens from `01-design-system.md` defined as CSS custom properties in `globals.css`, not hardcoded Tailwind colors — this makes the per-case-study accent swap (the signature element) clean to implement.
- **Framer Motion** for scroll reveals and hero load animation — NOT actual Framer (the website builder); this is the React animation library, unrelated to the Magnetto reference site's platform.
- **next/image** for all imagery, even placeholders — sets up responsive/optimized image handling correctly from day one so swapping in real assets later is a content change, not a re-architecture.

## Project structure

```
/app
  /page.tsx                      Home
  /about/page.tsx
  /work/page.tsx                 Case study index
  /work/[slug]/page.tsx          Dynamic route — one file serves all ~15 standalone case studies
  /work/aba-group/page.tsx       Special-cased: hub with 5 internal sections (see content doc)
  /contact/page.tsx
  /layout.tsx                    Persistent nav + footer
  /globals.css
/lib
  /case-studies.ts                Single source of truth: array of case study objects (slug, title, role, dates, category, accentColors, tier, body content)
/components
  /Nav.tsx
  /Footer.tsx
  /Hero.tsx
  /CaseStudyCard.tsx
  /CaseStudyTemplate.tsx          The fixed template every /work/[slug] page renders through
  /AccentProvider.tsx              Sets CSS vars for the active case study's palette
  /ContactForm.tsx
/public
  /images/placeholders/...        Generated/stock placeholders per case study, swappable later
```

## Data-driven case studies (critical architecture decision)

Do **not** hand-write 16 separate page files with duplicated layout. Define every case study as a typed object in `lib/case-studies.ts`:

```ts
export type Tier = 1 | 2 | 3;
export type Category = "A" | "B" | "C";

export interface CaseStudy {
  slug: string;
  client: string;
  role: string;
  dateRange: string;
  status: "ongoing" | "closed" | "intermittent";
  category: Category;          // A = independent, B = via Watch How, C = own venture
  routedVia?: string;           // e.g. "Watch How Malaysia" — only set for category B
  tier: Tier;                  // verification tier, drives whether liveSiteUrl renders
  liveSiteUrl?: string;
  accent: { primary: string; secondary: string };
  summary: string;              // the italicized intro paragraph
  bullets: string[];
  subEntities?: SubEntity[];    // only ABA Group uses this
  metricsNote?: string;         // flag unverified stats here, render as a visible "unverified" badge if present, NEVER silently drop the flag
}
```

This is what makes the `CaseStudyTemplate` component reusable across all ~15 pages and keeps the Watch How Malaysia hub-and-sub-page relationship explicit in data rather than scattered across hardcoded JSX.

`[slug]/page.tsx` uses `generateStaticParams()` to pre-render every case study at build time — these are static content pages, no need for runtime data fetching.

## Environment & deployment

- No database needed. This is a static content site; the only dynamic piece is the contact form.
- **Contact form:** simplest reliable option is a form-handling service (e.g. Resend's email API, or a simple serverless API route in `/app/api/contact/route.ts` that sends via Resend/Nodemailer). Do not wire it to nothing — a form with a "Submit" button and no backend is worse than no form at all, since it implies functionality that doesn't exist.
- **Deployment:** Vercel (already connected via MCP in this environment). Standard `next build` — no special config needed beyond setting the contact form's API key as an environment variable in the Vercel project settings, not committed to the repo.
- **Domain:** confirm with Muneeb whether he has a domain already, or whether this ships on a `*.vercel.app` subdomain initially. If the latter, flag that a custom domain is a near-term priority — a `*.vercel.app` URL on a personal portfolio undercuts the same "professional, established" credibility the case studies themselves are trying to demonstrate (this exact issue was flagged in Abdullah's own prior Krevus SEO audit work — same principle applies here).

## Fonts

- Fraunces (display) — via `next/font/google`, variable weight, load only the optical sizes actually used (don't import the full variable axis range if unused).
- Inter (body/utility) — via `next/font/google`.

## Placeholder imagery strategy

Per confirmed scope: no real client images exist yet. Use:
- Solid color blocks in each case study's accent palette as image placeholders, with a subtle generated noise/grain texture (CSS, not an actual image file) to avoid flat dead space — this also nods to Magnetto's grain texture without needing real photography.
- Clearly label these in code comments as `// PLACEHOLDER — replace with real asset` so a future pass (Claude Code or otherwise) doesn't mistake them for final.
- Do not use AI-generated fake "mockup" images that could be mistaken for real client deliverables — that would itself become a credibility risk if it ever surfaced that a "client screenshot" was synthetic. Solid color/grain blocks only until real assets arrive.
