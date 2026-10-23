// Service pages (Content Masterplan v3.1, section 9). Work is always grouped into named segments.

export type Segment = { id: string; name: string; text: string; count?: string; caseSlug?: string };

export type Website = {
  slug: string;
  name: string;
  url?: string;
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
  brands?: { name: string; slug: string; caseSlug: string; guidelinesPdf?: string }[];
  model3d?: boolean;
  relatedCases: string[];
  closing: string;
  metaTitle: string;
  metaDescription: string;
};


export const servicePages: ServicePage[] = [
  {
    slug: "social-media-creatives",
    keyLine: "1,000+ creatives delivered",
    intro: "Every brand has its own voice, so every brand gets its own space. These are not posts dumped in bulk: each segment shows work in the style of the brand it belongs to, from fast studio content to corporate LinkedIn carousels.",
    segments: [
      { id: "anebos-studios", name: "Anebos Studios posts", text: "Studio content built for speed: bold, rhythmic and ready in hours.", caseSlug: "anebos-studios" },
      { id: "trenddeck", name: "TrendDeck posts", text: "Zero-to-hero content for a WPC decking and cladding brand: posts, carousels and commercial reels.", caseSlug: "trenddeck" },
      { id: "aba-group", name: "ABA Group posts", text: "Five units, five audiences, one steady hand: separate voices without the redundant posting.", caseSlug: "aba-group" },
      { id: "beatrix-konnect", name: "Beatrix Konnect posts", text: "LinkedIn-first: static posts and carousels that keep an international BPO in front of the right clients.", caseSlug: "beatrix-konnect" },
      { id: "treatsforlife", name: "Treatsforlife posts", text: "Natural foods you can almost taste through the screen: honey, nuts, shilajit, olive and figs.", caseSlug: "treatsforlife" },
      { id: "bakebox", name: "Bakebox posts", text: "A bake-at-home box made playful and shareable.", caseSlug: "bakebox" },
      { id: "ndrmf", name: "NDRMF posts", text: "Climate-action communication with corporate polish.", caseSlug: "ndrmf" },
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
      { id: "ugc", name: "UGC content reels", count: "3", text: "Creator-style content that feels native to the feed." },
      { id: "documentary", name: "Documentary and photojournalistic", count: "1 + 1", text: "Story-led, real-moment footage, shot and cut for emotion." },
      { id: "b-roll", name: "B-roll and text loops", count: "2", text: "Looping visuals and bold type for fast, silent-friendly storytelling." },
      { id: "product-demos", name: "Product demos and commercials", count: "1 + 1", text: "Products in motion, in both a wide commercial and a reel cut." },
      { id: "kinetic", name: "Fast-paced kinetic short-form", count: "3", text: "Rhythm-cut energy built to hold attention." },
      { id: "ai-motion", name: "AI-based motion graphics", count: "3", text: "AI-assisted visuals directed into polished motion." },
      { id: "commercial", name: "Commercial reels", count: "6", text: "Brand commercials in reel format." },
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
      { id: "magazines-posters", name: "Magazines and posters", count: "6", text: "Editorial layouts and posters with a clear message and a strong first read." },
      { id: "itineraries", name: "Itinerary designs", count: "5", text: "Hand-crafted itineraries that let travellers feel the trip before they fly.", caseSlug: "facingnorth" },
      { id: "book-covers", name: "Book covers", count: "3", text: "Covers that carry a whole story in one image." },
      { id: "brochures", name: "Brochures", count: "2", text: "Clear, structured brochures that guide the reader." },
      { id: "visiting-cards", name: "Visiting cards", count: "2", text: "Small formats with a lasting first impression." },
      { id: "letterheads", name: "Letterheads", count: "2", text: "Stationery that makes every document look on brand." },
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
      { name: "Anebos Studios", slug: "anebos-studios", caseSlug: "anebos-studios" },
      { name: "TrendDeck", slug: "trenddeck", caseSlug: "trenddeck" },
      { name: "Treatsforlife", slug: "treatsforlife", caseSlug: "treatsforlife", guidelinesPdf: "/assets/brand-vision-treats-for-life.pdf" },
      { name: "Bakebox", slug: "bakebox", caseSlug: "bakebox", guidelinesPdf: "/assets/brand-vision-bakebox.pdf" },
      { name: "Beatrix Konnect", slug: "beatrix-konnect", caseSlug: "beatrix-konnect", guidelinesPdf: "/assets/brand-vision-beatrix-konnect.pdf" },
      { name: "Skinflux", slug: "skinflux", caseSlug: "skinflux" },
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
      { slug: "treatsforlife", name: "Treatsforlife", status: "Inactive", platform: "Shopify", build: "Built from scratch", year: "2024", caseSlug: "treatsforlife", text: "A Shopify store built from scratch for a natural foods brand and designed around the brand's own story: whole goodness (honey, nuts, shilajit, khanda, olive, figs) sourced from all over Pakistan. The brand had no venue for sales; this store became it. Inactive: the brand is now run from Bahrain." },
      { slug: "safirwear", name: "SafirWear", url: "https://safir-wear.vercel.app/", status: "Active", platform: "Vercel", build: "Reimagined layout and image styling", year: "2026", text: "A reimagined website for a B2B custom merch brand: a new layout and new image styling that shape how the site looks and feels. The content was already provided by the client. Delivered as a Vercel-based output." },
      { slug: "beatrix-konnect", name: "Beatrix Konnect", url: "https://beatrixkonnect.com/", status: "Active", platform: "WordPress", build: "Built from scratch", year: "2025", text: "A WordPress website built from scratch for an international BPO and call-centre service provider, designed around the company's story and services so it stands out in its market." },
      { slug: "trenddeck", name: "TrendDeck", url: "https://trenddeck.com.tr/", status: "Active", platform: "Webflow", build: "Redesign (not from scratch)", year: "2026", text: "A redesign, not a build from scratch, of the website for a WPC decking and cladding brand, on Webflow. The client wanted the layout and the images displayed on the site adjusted, and the redesign delivers exactly that." },
      { slug: "fairmans", name: "Fairmans Real Estate Agents (Birmingham, UK)", url: "https://fairmansestateagents.co.uk/", status: "Active", platform: "WordPress", build: "Built", year: "2024", text: "A WordPress property-listing website for a local Birmingham-based real estate agency, optimised with real-time property indexing. A back-end platform was also built so the team can quickly list properties to be sold, rented or leased." },
      { slug: "casa-de-rococco", name: "Casa de Rococco", status: "Client mockup", platform: "Not applicable", build: "Concept mockup", year: "", text: "A client mockup presented to the brand's directors to start building a company storefront, based on the company's brand colours. The brand is currently selling successfully on Amazon and Temu. The website does not currently exist: this is a concept mockup, not a live site." },
      { slug: "yumi-furnitures", name: "Yumi Furnitures", status: "Inactive", platform: "Shopify", build: "Built (private contract)", year: "2025", text: "A Shopify store built under a private contract in 2025, from Islamabad, for a UK-based company selling modern furniture such as sofas. The store needed to display and showcase their production and manage customer queries." },
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
      { id: "box-and-bottle", name: "Box and bottle packaging", text: "Boxes and bottles designed to shelf and unbox well." },
      { id: "pouch-and-packet", name: "Pouch and packet designing", text: "Pouches and packets built from the brand system outward.", caseSlug: "skinflux" },
      { id: "stickers-and-labels", name: "Stickers and label designing", text: "Labels and stickers that finish the package." },
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
      { id: "anebos-nova-model", name: "Anebos Nova Model", text: "The studio's own model deck.", caseSlug: "anebos-studios" },
      { id: "nivora-travels", name: "Nivora Travels Plan style", text: "A travel plan presented as a story." },
      { id: "facing-north", name: "Facing North Pitchdeck", text: "A pitch built for a luxury tour operator.", caseSlug: "facingnorth" },
      { id: "reweave", name: "Reweave Pitchdeck", text: "A pitch deck for the Reweave brand." },
    ],
    relatedCases: ["facingnorth", "anebos-studios"],
    closing: "Have something to pitch?",
    metaTitle: "Presentations and Pitchdecks | Muhammad Muneeb Bilal",
    metaDescription: "Pitch decks built on consumer psychology: hook, proof, ask.",
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);
