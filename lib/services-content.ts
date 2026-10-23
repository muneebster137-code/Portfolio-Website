// Service pages (Content Masterplan v3.1, section 9). Work is always grouped into named segments.
import type { Media } from "./cases";

export type Segment = { name: string; text: string; count?: string; caseSlug?: string; media: Media[] };

export type Website = {
  name: string;
  status: "Active" | "Inactive" | "Client mockup";
  platform: string;
  build: string;
  year: string;
  text: string;
  caseSlug?: string;
};

export type ServicePage = {
  slug: string;
  keyLine: string;
  intro: string;
  hookVideo?: { line: string };
  tools?: string[];
  segments: Segment[];
  websites?: Website[];
  brands?: { name: string; caseSlug: string; image?: string; guidelinesPdf?: string }[];
  model3d?: boolean;
  relatedCases: string[];
  closing: string;
  metaTitle: string;
  metaDescription: string;
};

const art = (key: string, title: string, n = 4): Media[] =>
  Array.from({ length: n }, (_, i) => ({ src: `/images/${key}-artifact-${i + 1}.webp`, alt: `${title}, piece ${i + 1}`, ratio: "wide" as const }));
const slots = (label: string, n: number, ratio: Media["ratio"]): Media[] =>
  Array.from({ length: n }, (_, i) => ({ alt: `${label} ${i + 1} (to supply)`, ratio }));

export const servicePages: ServicePage[] = [
  {
    slug: "social-media-creatives",
    keyLine: "1,000+ creatives delivered",
    intro: "Every brand has its own voice, so every brand gets its own space. These are not posts dumped in bulk: each segment shows work in the style of the brand it belongs to, from fast studio content to corporate LinkedIn carousels.",
    segments: [
      { name: "Anebos Studios posts", text: "Studio content built for speed: bold, rhythmic and ready in hours.", caseSlug: "anebos-studios", media: art("anebos-studios", "Anebos Studios posts") },
      { name: "TrendDeck posts", text: "Zero-to-hero content for a WPC decking and cladding brand: posts, carousels and commercial reels.", caseSlug: "trenddeck", media: art("trenddeck", "TrendDeck posts") },
      { name: "ABA Group posts", text: "Five units, five audiences, one steady hand: separate voices without the redundant posting.", caseSlug: "aba-group", media: art("aba-group", "ABA Group posts", 3) },
      { name: "Beatrix Konnect posts", text: "LinkedIn-first: static posts and carousels that keep an international BPO in front of the right clients.", caseSlug: "beatrix-konnect", media: art("beatrix-konnect", "Beatrix Konnect posts") },
      { name: "Treatsforlife posts", text: "Natural foods you can almost taste through the screen: honey, nuts, shilajit, olive and figs.", caseSlug: "treatsforlife", media: art("treats-for-life", "Treatsforlife posts") },
      { name: "Bakebox posts", text: "A bake-at-home box made playful and shareable.", caseSlug: "bakebox", media: art("bakebox", "Bakebox posts") },
      { name: "NDRMF posts", text: "Climate-action communication with corporate polish.", caseSlug: "ndrmf", media: art("ndrmf", "NDRMF posts") },
    ],
    relatedCases: ["anebos-studios", "trenddeck", "aba-group"],
    closing: "Need content that stops the scroll?",
    metaTitle: "Social Media Creatives | Muhammad Muneeb Bilal",
    metaDescription: "1,000+ social media creatives delivered, each brand designed in its own voice. Posts, carousels and reels.",
  },
  {
    slug: "videography-reels",
    keyLine: "100+ reels delivered",
    intro: "Attention is won in the first second and kept by rhythm. Every segment below is a different way of earning it.",
    hookVideo: { line: "You just watched a bullet hit a balloon for 5 seconds. Imagine if this is the attention I could bring to your brand." },
    segments: [
      { name: "UGC content reels", count: "3", text: "Creator-style content that feels native to the feed.", media: slots("UGC reel", 3, "tall") },
      { name: "Documentary and photojournalistic", count: "1 + 1", text: "Story-led, real-moment footage, shot and cut for emotion.", media: [...slots("Documentary film", 1, "wide"), ...slots("Documentary reel", 1, "tall")] },
      { name: "B-roll and text loops", count: "2", text: "Looping visuals and bold type for fast, silent-friendly storytelling.", media: slots("B-roll loop", 2, "tall") },
      { name: "Product demos and commercials", count: "1 + 1", text: "Products in motion, in both a wide commercial and a reel cut.", media: [{ src: "/images/trenddeck-reel.webm", alt: "TrendDeck product commercial", kind: "video", ratio: "wide" }, ...slots("Product reel", 1, "tall")] },
      { name: "Fast-paced kinetic short-form", count: "3", text: "Rhythm-cut energy built to hold attention.", media: slots("Kinetic reel", 3, "tall") },
      { name: "AI-based motion graphics", count: "3", text: "AI-assisted visuals directed into polished motion.", media: slots("AI motion reel", 3, "tall") },
      { name: "Commercial reels", count: "6", text: "Brand commercials in reel format.", media: [{ src: "/images/aba-group-reel.webm", alt: "ABA Group commercial reel", kind: "video", ratio: "wide" }, { src: "/images/treats-for-life-reel.webm", alt: "Treatsforlife commercial reel", kind: "video", ratio: "wide" }, ...slots("Commercial reel", 4, "tall")] },
    ],
    relatedCases: ["trenddeck", "anebos-studios", "tim-hortons"],
    closing: "Want this attention on your brand?",
    metaTitle: "Videography and Reels | Muhammad Muneeb Bilal",
    metaDescription: "100+ reels delivered: UGC, documentary, kinetic, AI motion graphics and commercial reels.",
  },
  {
    slug: "print-media",
    keyLine: "250+ deliverables",
    intro: "From magazines to visiting cards, print is where a brand becomes physical. Each piece below is made to look right on screen and feel right in the hand.",
    segments: [
      { name: "Magazines and posters", count: "6", text: "Editorial layouts and posters with a clear message and a strong first read.", media: slots("Magazine or poster", 6, "tall") },
      { name: "Itinerary designs", count: "5", text: "Hand-crafted itineraries that let travellers feel the trip before they fly.", caseSlug: "facingnorth", media: slots("Itinerary", 5, "tall") },
      { name: "Book covers", count: "3", text: "Covers that carry a whole story in one image.", media: slots("Book cover", 3, "tall") },
      { name: "Brochures", count: "2", text: "Clear, structured brochures that guide the reader.", media: slots("Brochure", 2, "wide") },
      { name: "Visiting cards", count: "2", text: "Small formats with a lasting first impression.", media: slots("Visiting card", 2, "wide") },
      { name: "Letterheads", count: "2", text: "Stationery that makes every document look on brand.", media: slots("Letterhead", 2, "tall") },
    ],
    relatedCases: ["facingnorth"],
    closing: "Need something printed that people keep?",
    metaTitle: "Print Media | Muhammad Muneeb Bilal",
    metaDescription: "250+ print deliverables: magazines, posters, itineraries, book covers, brochures, visiting cards and letterheads.",
  },
  {
    slug: "branding-guidelines",
    keyLine: "10+ brands built from scratch",
    intro: "I start by defining who the brand is: its font, its colours, its elements. Then comes the logo, then the guidelines that keep every future piece consistent.",
    segments: [],
    brands: [
      { name: "Anebos Studios", caseSlug: "anebos-studios", image: "/images/anebos-studios-artifact-3.webp" },
      { name: "TrendDeck", caseSlug: "trenddeck", image: "/images/trenddeck-artifact-1.webp" },
      { name: "Treatsforlife", caseSlug: "treatsforlife", image: "/images/treats-for-life-artifact-1.webp", guidelinesPdf: "/assets/brand-vision-treats-for-life.pdf" },
      { name: "Bakebox", caseSlug: "bakebox", image: "/images/bakebox-artifact-1.webp", guidelinesPdf: "/assets/brand-vision-bakebox.pdf" },
      { name: "Beatrix Konnect", caseSlug: "beatrix-konnect", image: "/images/beatrix-konnect-artifact-1.webp", guidelinesPdf: "/assets/brand-vision-beatrix-konnect.pdf" },
      { name: "Skinflux", caseSlug: "skinflux" },
    ],
    relatedCases: ["anebos-studios", "trenddeck", "treatsforlife", "bakebox", "beatrix-konnect", "skinflux"],
    closing: "Building a brand from zero?",
    metaTitle: "Branding and Guidelines | Muhammad Muneeb Bilal",
    metaDescription: "10+ brands built from scratch: logos, colour palettes, guidelines and brand assets.",
  },
  {
    slug: "website-design",
    keyLine: "20+ websites made",
    intro: "Websites are where attention turns into action. Here are seven I've designed, each with its platform, how it was built and its current status.",
    tools: ["Shopify", "Elementor", "WordPress", "Figma", "Webflow"],
    segments: [],
    websites: [
      { name: "Treatsforlife", status: "Inactive", platform: "Shopify", build: "Built from scratch", year: "2024", caseSlug: "treatsforlife", text: "A Shopify store built from scratch for a natural foods brand and designed around the brand's own story: whole goodness (honey, nuts, shilajit, khanda, olive, figs) sourced from all over Pakistan. The brand had no venue for sales; this store became it. Inactive: the brand is now run from Bahrain." },
      { name: "SafirWear", status: "Active", platform: "Vercel", build: "Reimagined layout and image styling", year: "2026", text: "A reimagined website for a B2B custom merch brand: a new layout and new image styling that shape how the site looks and feels. The content was already provided by the client. Delivered as a Vercel-based output." },
      { name: "Beatrix Konnect", status: "Active", platform: "WordPress", build: "Built from scratch", year: "2025", text: "A WordPress website built from scratch for an international BPO and call-centre service provider, designed around the company's story and services so it stands out in its market." },
      { name: "TrendDeck", status: "Active", platform: "Webflow", build: "Redesign (not from scratch)", year: "2026", text: "A redesign, not a build from scratch, of the website for a WPC decking and cladding brand, on Webflow. The client wanted the layout and the images displayed on the site adjusted, and the redesign delivers exactly that." },
      { name: "Fairmans Real Estate Agents (Birmingham, UK)", status: "Active", platform: "WordPress", build: "Built", year: "2024", text: "A WordPress property-listing website for a local Birmingham-based real estate agency, optimised with real-time property indexing. A back-end platform was also built so the team can quickly list properties to be sold, rented or leased." },
      { name: "Casa de Rococco", status: "Client mockup", platform: "Not applicable", build: "Concept mockup", year: "", text: "A client mockup presented to the brand's directors to start building a company storefront, based on the company's brand colours. The brand is currently selling successfully on Amazon and Temu. The website does not currently exist: this is a concept mockup, not a live site." },
      { name: "Yumi Furnitures", status: "Inactive", platform: "Shopify", build: "Built (private contract)", year: "2025", text: "A Shopify store built under a private contract in 2025, from Islamabad, for a UK-based company selling modern furniture such as sofas. The store needed to display and showcase their production and manage customer queries." },
    ],
    relatedCases: ["beatrix-konnect", "safirwear", "treatsforlife", "trenddeck"],
    closing: "Need a website that works as hard as you do?",
    metaTitle: "Website Designing | Muhammad Muneeb Bilal",
    metaDescription: "20+ websites made on Shopify, Elementor, WordPress, Figma and Webflow.",
  },
  {
    slug: "packaging-design",
    keyLine: "100+ designs delivered",
    intro: "Packaging is the moment a brand becomes real in someone's hands. Each form below gets its own place.",
    model3d: true,
    segments: [
      { name: "Box and bottle packaging", text: "Boxes and bottles designed to shelf and unbox well.", media: slots("Box or bottle design", 3, "square") },
      { name: "Pouch and packet designing", text: "Pouches and packets built from the brand system outward.", caseSlug: "skinflux", media: slots("Pouch or packet design", 3, "square") },
      { name: "Stickers and label designing", text: "Labels and stickers that finish the package.", media: slots("Sticker or label design", 3, "square") },
    ],
    relatedCases: ["skinflux", "treatsforlife"],
    closing: "Packaging that sells before it's opened?",
    metaTitle: "Packaging and Design | Muhammad Muneeb Bilal",
    metaDescription: "100+ packaging designs: 3D models, boxes, bottles, pouches, stickers and labels.",
  },
  {
    slug: "presentations-pitchdecks",
    keyLine: "4 featured decks",
    intro: "Deliverables and expectancy: it's not just a presentation, it's a hook-style sequence based on consumer psychology: hook, proof, ask.",
    segments: [
      { name: "Anebos Nova Model", text: "The studio's own model deck.", caseSlug: "anebos-studios", media: slots("Anebos Nova Model slide", 3, "wide") },
      { name: "Nivora Travels Plan style", text: "A travel plan presented as a story.", media: slots("Nivora Travels slide", 3, "wide") },
      { name: "Facing North Pitchdeck", text: "A pitch built for a luxury tour operator.", caseSlug: "facingnorth", media: slots("Facing North slide", 3, "wide") },
      { name: "Reweave Pitchdeck", text: "A pitch deck for the Reweave brand.", media: slots("Reweave slide", 3, "wide") },
    ],
    relatedCases: ["facingnorth", "anebos-studios"],
    closing: "Have something to pitch?",
    metaTitle: "Presentations and Pitchdecks | Muhammad Muneeb Bilal",
    metaDescription: "Pitch decks built on consumer psychology: hook, proof, ask.",
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);
