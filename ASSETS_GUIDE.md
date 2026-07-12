# Portfolio Assets Guide

This document acts as a complete guide for managing and placing assets (images, video reels, and PDF vision decks) in the portfolio website. By placing files in the designated paths with matching filenames, the page placeholders will automatically be replaced with your real projects.

All assets are located under the `public/` directory in two main folders:
- **`public/images/`**: Profile photos, case study headers, visual artifacts, and video reels.
- **`public/assets/`**: Brand Vision Deck PDF files.

---

## 1. General Portfolio Images

These images are utilized on the home page hero section and the about page:

| Filename | Placement Path | Description | Recommended Dimensions / Specs |
| :--- | :--- | :--- | :--- |
| **`muneeb-bilal.webp`** | `/public/images/muneeb-bilal.webp` | Main profile portrait photo of Muneeb Bilal. Used on the homepage and about page. | 800 x 1000px (4:5 vertical aspect ratio), desaturated/artistic style. |
| **`about-hero.webp`** | `/public/images/about-hero.webp` | About page hero header background. | 1920 x 1080px (landscape aspect ratio), atmospheric, desaturated texture or workspace shot. |

---

## 2. Case Study Assets (Images & Reels)

Case study layouts dynamically look for images based on the unique **Project Slug**. Each case study loads:
1. **Header Image**: Loaded from `/images/[slug].webp` (falls back to Unsplash stock photo if missing).
2. **Visual Artifacts**: Loaded from `/images/[slug]-artifact-[1-4].webp` (renders as empty blocks if missing).
3. **Interactive Reels**: Loaded from `/images/[slug]-reel.webm` (only supported for specific video-first brands).

### Special Layout: ABA Group
ABA Group is a custom hub page with **3** visual artifacts instead of 4, and a group-level reel:
- `aba-group.webp` (Main header)
- `aba-group-artifact-1.webp` (Aba Eğitim Strategy Grid)
- `aba-group-artifact-2.webp` (ABA Psikoloji Safe Space Swatch)
- `aba-group-artifact-3.webp` (E4I Vakfı Community Green)
- `aba-group-reel.webm` (Custom daily video strategy campaign reel)

---

### Master Slug Registry & Asset Naming Table

For each project, place the respective files into `/public/images/` using the exact names listed below.

| Project / Client Name | Project Slug | Header Image | Artifact Image Filenames | Interactive Video Reel (WebM) |
| :--- | :--- | :--- | :--- | :--- |
| **Watch How Malaysia** | `watch-how-malaysia` | `watch-how-malaysia.webp` | `watch-how-malaysia-artifact-1.webp`<br>`watch-how-malaysia-artifact-2.webp`<br>`watch-how-malaysia-artifact-3.webp`<br>`watch-how-malaysia-artifact-4.webp` | *Not Applicable* |
| **Safir Wear** | `safir-wear` | `safir-wear.webp` | `safir-wear-artifact-1.webp`<br>`safir-wear-artifact-2.webp`<br>`safir-wear-artifact-3.webp`<br>`safir-wear-artifact-4.webp` | *Not Applicable* |
| **FacingNorth** | `facingnorth` | `facingnorth.webp` | `facingnorth-artifact-1.webp`<br>`facingnorth-artifact-2.webp`<br>`facingnorth-artifact-3.webp`<br>`facingnorth-artifact-4.webp` | *Not Applicable* |
| **Trenddeck** | `trenddeck` | `trenddeck.webp` | `trenddeck-artifact-1.webp`<br>`trenddeck-artifact-2.webp`<br>`trenddeck-artifact-3.webp`<br>`trenddeck-artifact-4.webp` | **`trenddeck-reel.webm`** *(9:16 vertical)* |
| **ABA Group** | `aba-group` | `aba-group.webp` | `aba-group-artifact-1.webp`<br>`aba-group-artifact-2.webp`<br>`aba-group-artifact-3.webp` | **`aba-group-reel.webm`** *(9:16 vertical)* |
| **Treats for Life** | `treats-for-life` | `treats-for-life.webp` | `treats-for-life-artifact-1.webp`<br>`treats-for-life-artifact-2.webp`<br>`treats-for-life-artifact-3.webp`<br>`treats-for-life-artifact-4.webp` | **`treats-for-life-reel.webm`** *(9:16 vertical)* |
| **NDRMF** | `ndrmf` | `ndrmf.webp` | `ndrmf-artifact-1.webp`<br>`ndrmf-artifact-2.webp`<br>`ndrmf-artifact-3.webp`<br>`ndrmf-artifact-4.webp` | *Not Applicable* |
| **Tim Hortons Pakistan** | `tim-hortons` | `tim-hortons.webp` | `tim-hortons-artifact-1.webp`<br>`tim-hortons-artifact-2.webp`<br>`tim-hortons-artifact-3.webp`<br>`tim-hortons-artifact-4.webp` | *Not Applicable* |
| **Beatrix Konnect** | `beatrix-konnect` | `beatrix-konnect.webp` | `beatrix-konnect-artifact-1.webp`<br>`beatrix-konnect-artifact-2.webp`<br>`beatrix-konnect-artifact-3.webp`<br>`beatrix-konnect-artifact-4.webp` | *Not Applicable* |
| **Fairmans Estate Agents (UK)** | `fairmans-uk` | `fairmans-uk.webp` | `fairmans-uk-artifact-1.webp`<br>`fairmans-uk-artifact-2.webp`<br>`fairmans-uk-artifact-3.webp`<br>`fairmans-uk-artifact-4.webp` | *Not Applicable* |
| **Green Pakistan Agro Farms** | `green-pakistan-agro` | `green-pakistan-agro.webp` | `green-pakistan-agro-artifact-1.webp`<br>`green-pakistan-agro-artifact-2.webp`<br>`green-pakistan-agro-artifact-3.webp`<br>`green-pakistan-agro-artifact-4.webp` | *Not Applicable* |
| **Bakebox** | `bakebox` | `bakebox.webp` | `bakebox-artifact-1.webp`<br>`bakebox-artifact-2.webp`<br>`bakebox-artifact-3.webp`<br>`bakebox-artifact-4.webp` | *Not Applicable* |
| **Homeloom UK** | `homeloom-uk` | `homeloom-uk.webp` | `homeloom-uk-artifact-1.webp`<br>`homeloom-uk-artifact-2.webp`<br>`homeloom-uk-artifact-3.webp`<br>`homeloom-uk-artifact-4.webp` | *Not Applicable* |
| **BIC SZABIST** | `bic-szabist` | `bic-szabist.webp` | `bic-szabist-artifact-1.webp`<br>`bic-szabist-artifact-2.webp`<br>`bic-szabist-artifact-3.webp`<br>`bic-szabist-artifact-4.webp` | *Not Applicable* |
| **Anebos Studios** | `anebos-studios` | `anebos-studios.webp` | `anebos-studios-artifact-1.webp`<br>`anebos-studios-artifact-2.webp`<br>`anebos-studios-artifact-3.webp`<br>`anebos-studios-artifact-4.webp` | **`anebos-studios-reel.webm`** *(9:16 vertical)* |

---

## 3. Brand Vision Deck (PDFs)

Four specific case studies support downloading an editorial PDF deck. Place these PDF files in the **`/public/assets/`** folder:

*   **`brand-vision-treats-for-life.pdf`**
*   **`brand-vision-bakebox.pdf`**
*   **`brand-vision-trenddeck.pdf`**
*   **`brand-vision-beatrix-konnect.pdf`**

---

## 4. Technical Specs & Best Practices

To maintain the high-quality, premium aesthetic of your portfolio site:

1. **Image Format**: Save all images in the modern **`.webp`** format to maximize loading speeds and enhance SEO performance.
2. **Grayscale Filtering**: The website layout uses a CSS desaturation filter on header graphics and artifacts by default, transforming full-color images into elegant black-and-white tones. When hovered or focused, they transition smoothly into color.
3. **Video Format**: Use standard **`.webm`** format for vertical reels to ensure cross-device compatibility and optimal compression. Keep file sizes small (ideally < 5MB) for quick buffering on mobile networks.
4. **Fallback Mechanics**: 
    - If a header image is missing, the code falls back to high-resolution, thematic stock photos from Unsplash.
    - If a video reel `.webm` is missing, the phone mockup automatically hides the video player and falls back to a styled soundwave placeholder with premium micro-animations.
