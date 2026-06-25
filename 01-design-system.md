# 01 — Design System

## Design plan (per frontend-design process: brainstorm → critique → lock)

### Color

**Base/shell palette (constant across the whole site — applies to nav, footer, Home, About, Work index):**

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#15171B` | Primary text, near-black not pure black |
| `--paper` | `#F6F4EF` | Page background — warm off-white, not stark white |
| `--graphite` | `#4A4D52` | Secondary text, captions |
| `--line` | `#D8D4C9` | Hairline rules, dividers |
| `--accent` | `#C24E2B` | One warm terracotta-adjacent accent — used sparingly: links, active nav state, the small numbering/eyebrow labels |

This shell palette is intentionally quiet. It is NOT one of the three AI-default looks (warm cream + serif + terracotta is closest, which is why it's used only as a *shell* — the real signature is what happens per case study, see below). Keep this restrained so the case-study color injection (next section) actually reads as a deliberate contrast, not noise.

**Per-case-study accent palettes (the signature element):** each case study page inherits the base shell (same type, same grid, same `--ink`/`--paper`) but swaps in **one client-specific accent pairing** that appears in: the page's hero label, the section dividers, and one large background block. This is how the site proves range without becoming visually chaotic.

| Case study | Accent pairing | Rationale (from source material) |
|---|---|---|
| Trenddeck | Deep oak `#5C4633` + anthracite `#2B2B2B` | "Earthy tones — Deep Oaks, Teaks, Greys, Anthracites" per his own brand direction |
| ABA Group — Aba Eğitim | Navy `#1B2A4A` + gold `#C9A227` | "High-prestige, academic" |
| ABA Group — ABA Test Prep | Black `#111` + signal red `#D6382B` | "High-contrast... efficiency, urgency" |
| ABA Group — ABA Psikoloji | Dusty rose `#D9B8AE` + sage `#A8B89C` | "Calming, pastel-toned... Safe Space" |
| ABA Group — Designhouse Istanbul | Charcoal `#262626` + neutral taupe `#9C8F7E` | "Highly creative, neutral-dark" |
| ABA Group — E4I Vakfı | Forest `#2F4B3C` + sand `#D8C9A3` | "Trust-building, community-centric" |
| Treats for Life | Honey amber `#C8862E` + deep umber `#5A3A22` | "Deep honeys, rich ambers, rustic wood tones" |
| Bakebox | Warm cream `#F2DFC4` + soft coral `#E08F73` | "Friendly Utility... dismantle baking anxiety" |
| Anebos Studios | Near-black `#0C0C0C` + acid white `#FAFAFA` | "Sleek, high-contrast dark-mode... cinematic" |
| Safir Wear | Dark vibrant violet `#2A1A3D` + neon cyan `#3FE0E0` | "Futuristic, hyper-realistic streetwear, dark-vibrant" |
| Homeloom UK | Soft neutral `#E8E2D6` + gold `#B68D40` | "Soft neutrals and gold accents... luxury" |
| Beatrix Konnect | Navy `#1A2A52` + slate `#5B6470` | "Deep navy blues, slate greys... security and trust" |
| NDRMF | Forest green `#2E5339` + sand `#CBB994` | "Earth tones... aligned with SDGs" |
| FacingNorth | Sky blue `#3E7CB1` + sun gold `#E0A93E` | "Vibrant, adventure-centric" |
| Fairmans UK | Slate blue `#33495E` + crisp white `#FFFFFF` | "Sharp, clean corporate... urban efficiency" |
| Green Pakistan Agro | Deep green `#33503B` + warm brown `#7A5A3C` | "Rich, deep-green and warm-brown... biophilic" |
| BIC SZABIST | Blue `#1F4E8C` + neon accent `#7CF26C` | "Dynamic, energetic... blues and neon accents... innovation" |
| Tim Hortons / PM Office | Use base shell only, no custom accent | Internship roles with no brand-direction ownership claimed — don't invent a palette for work he didn't art-direct |

**Critique check:** this avoids all three AI-default clusters (warm-cream-serif-terracotta, near-black-with-one-neon, broadsheet-hairline) as the *global* identity — each only ever appears as one of many per-case-study accents, not the whole site's personality. Confirmed distinctive.

### Type

- **Display face:** A high-contrast grotesk with personality — e.g. **"Fraunces"** (variable, has both a sharp and a soft optical mode) for the hero headline and case-study titles. Avoid Magnetto's generic geometric sans-as-display; Fraunces' soft/sharp axis can be tuned per case study (sharper axis for Trenddeck/Safir Wear, softer/rounder for Treats for Life/Bakebox) — a small typographic echo of the per-case-study personality without needing a different font per page.
- **Body face:** **"Inter"** or **"Söhne"**-equivalent (use Inter — free, well-supported) at a slightly wider tracking for captions. Workhorse, gets out of the way.
- **Utility/data face:** Inter, all-caps, +0.08em tracking — used for eyebrow labels, dates, role titles, nav.

Type scale (rem, base 16px):

| Role | Size | Weight | Line height |
|---|---|---|---|
| Hero H1 | 5.5rem (clamp to 2.75rem mobile) | 600 | 1.0 |
| Case study title | 3.5rem (clamp 2rem mobile) | 600 | 1.05 |
| H2 section | 2rem | 600 | 1.15 |
| Body | 1.0625rem | 400 | 1.6 |
| Eyebrow/label | 0.8125rem | 600, uppercase | 1.0, tracking 0.08em |

### Layout

- 12-column grid, max content width 1280px, generous 96px section padding desktop / 48px mobile.
- Case study pages follow a **fixed template** (see `04-page-specs.md`) so the structural consistency is visible across all ~16 entries even as color shifts.
- No numbered markers (01/02/03) on the Home/About pages — the work is not a sequential process. **Exception:** the timeline on `/about` and the Watch How Malaysia hub page legitimately is sequential/chronological, so numbering or date-ordering there is justified, not decorative.

### Signature element

**The accent-swap system itself is the signature.** Stated explicitly for whoever builds this: every case study page is structurally identical (same grid, same component order, same type scale) and differs only in its injected accent pair and imagery. This is the one deliberate, callable-out design idea for the whole site — it should be mentioned in the nav or footer subtly (e.g., footer microcopy: "One structure. Sixteen voices.") if Muneeb likes that framing — optional, confirm with him before adding actual copy like that.

### Motion (used deliberately, not decoratively)

- **Hero load:** headline characters/words fade-up with a slight stagger (~40ms per word), once, on page load only — not on every scroll.
- **Scroll reveals:** case study cards on `/work` fade+rise into view on scroll, single easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), no bounce.
- **Case study accent transition:** when navigating from `/work` into any case study page, the accent color should NOT cross-fade awkwardly — accept a hard cut on page load; trying to animate between 16 different accent pairs is not worth the complexity.
- **No magnetic cursor.** This was Magnetto's signature interaction but it's a single-hero-image flourish; with 16 differently-colored pages it would feel gimmicky and inconsistent. Skip it.
- Respect `prefers-reduced-motion`: disable stagger/fade-up, keep instant state.

### Accessibility floor

- All accent pairs above must be checked for 4.5:1 contrast against their paired text color before final implementation — several (e.g. neon cyan on dark violet) will need a darker/desaturated text variant for body copy even if the bright version is used for accents/dividers only. Flag this explicitly to whoever builds it: **never set body text directly in the bright accent color**, only `--ink` or `--paper` for body text; accents are for rules, labels, and background blocks only.
- Visible keyboard focus ring using `--accent` at 2px offset, on every interactive element.
