// The eleven case studies, in blueprint order (Content Masterplan v3.1, section 10).

export type CaseStep = { title: string; body: string };

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  summary: string;
  major?: boolean;
  via?: boolean;
  accent: string;
  client: string;
  role: string;
  services: string;
  opening: "video" | "image";
  intro?: { label: string; text: string };
  steps?: CaseStep[];
  stat?: { value: string; label: string };
  did?: string;
  optionalLine?: string;
  units?: { name: string; text: string }[];
  clients?: { name: string; text: string; slug?: string }[];
  website?: string;
  liveUrl?: string;
  notes?: { label: string; text: string }[];
  testimonial?: string;
  workLabel: string;
  relatedServices: string[];
  relatedCases: string[];
  metaTitle: string;
  metaDescription: string;
};


export const cases: CaseStudy[] = [
  {
    slug: "anebos-studios",
    title: "Anebos Studios",
    shortTitle: "Anebos",
    year: "2024",
    summary: "My own studio: standout creative, delivered the same day.",
    major: true,
    accent: "#3B2BFF",
    client: "Anebos Studios (own venture)",
    role: "Founder and Creative Specialist; co-founded in 2024",
    services: "Social media, reels, brand design",
    opening: "video",
    steps: [
      { title: "The problem", body: "Anebos was a new brand that nobody knew. And the market had a slow habit: most brands took a booking, confirmation and payment, then waited about a week before anything was delivered." },
      { title: "The gap", body: "Speed. Creatives made in hours, not days." },
      { title: "The solution", body: "Take the market with high-quality social media content and a brand design that stands out. Posts, carousels and reels are each designed separately and beautifully, and delivery was cut down to same day." },
      { title: "The result", body: "Same-day delivery became the standard, with creatives made in hours, not days. The studio also won clients such as Treatsforlife and Homeloom." },
    ],
    stat: { value: "Same day", label: "Down from a week-long wait" },
    optionalLine: "Every piece of video is treated like a choreographed performance: cut, movement and lighting cued to the beat.",
    clients: [
      { name: "Treatsforlife", text: "Read the full case study", slug: "treatsforlife" },
      { name: "Homeloom", text: "Brand design and website" },
    ],
    workLabel: "Posts · Carousels · Reels",
    relatedServices: ["social-media-creatives", "videography-reels", "branding-guidelines"],
    relatedCases: ["treatsforlife", "trenddeck"],
    metaTitle: "Anebos Studios Case Study | Muhammad Muneeb Bilal",
    metaDescription: "A new studio built to deliver standout creative the same day.",
  },
  {
    slug: "trenddeck",
    title: "TrendDeck Türkiye",
    shortTitle: "TrendDeck",
    year: "2026",
    summary: "From unknown to unmissable: a WPC decking brand built from zero.",
    via: true,
    accent: "#A07A52",
    client: "TrendDeck, WPC wall panels and decking (Bursa, Türkiye)",
    role: "Creative Director, via Watch How Malaysia",
    services: "Brand, social content, commercial reels",
    opening: "image",
    steps: [
      { title: "The problem", body: "TrendDeck needed the most suitable way to spread awareness that it exists, and to explain why WPC decking is a better answer to Türkiye's weather than hardwood floors and decks." },
      { title: "The gap", body: "Two things were missing: people didn't know TrendDeck existed, and they didn't know why WPC outperforms hardwood in Turkish weather." },
      { title: "The solution", body: "Build the brand from zero to hero with commercial reels and high-quality creatives across every social media avenue, made to put the brand in front of people and to make the WPC-versus-hardwood argument easy to understand." },
      { title: "The result", body: "TrendDeck went from an unseen brand to a consistent, high-quality presence across its social channels." },
    ],
    website: "Redesign of the existing website on Webflow, adjusting the layout and the images displayed at the client's request. Active.",
    liveUrl: "https://trenddeck.com.tr/",
    workLabel: "Posts · Carousels · Reels",
    relatedServices: ["social-media-creatives", "videography-reels", "website-design", "branding-guidelines"],
    relatedCases: ["anebos-studios", "aba-group"],
    metaTitle: "TrendDeck Türkiye Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Building awareness for a WPC decking brand in Türkiye from zero.",
  },
  {
    slug: "treatsforlife",
    title: "Treatsforlife",
    shortTitle: "Treatsforlife",
    year: "2024",
    summary: "Natural foods, a Shopify store and a brand built in three months.",
    accent: "#D9962F",
    client: "Treatsforlife, natural foods",
    role: "Brand identity, website, social",
    services: "Shopify store, Instagram posts and reels, branding",
    opening: "image",
    intro: { label: "Brand intro", text: "Treatsforlife is all about whole goodness: honey, nuts, shilajit, khanda, olive, figs and more, in bottles sourced from all over Pakistan." },
    steps: [
      { title: "The problem", body: "Great products, but no venue for sales. And a food brand can't be tasted through a screen, so every visual had to work to suggest taste and texture." },
      { title: "The solution", body: "A website store optimised on Shopify, Instagram posts and reels management, and a complete brand identity built from scratch within three months." },
      { title: "The result", body: "Orders skyrocketed, passing 1,000 within three months." },
    ],
    stat: { value: "1,000+", label: "Orders in three months" },
    notes: [{ label: "Epilogue", text: "After eight months the owner moved abroad, and the business moved to Bahrain as a local whole-foods distribution system. The brand now runs from there, so the website is inactive." }],
    website: "Shopify store built from scratch around the brand's story. Now inactive.",
    testimonial: "Mr Waqas",
    workLabel: "Posts · Reels · Store",
    relatedServices: ["social-media-creatives", "branding-guidelines", "website-design", "packaging-design"],
    relatedCases: ["anebos-studios"],
    metaTitle: "Treatsforlife Case Study | Muhammad Muneeb Bilal",
    metaDescription: "A natural foods brand, a Shopify store and 1,000+ orders in three months.",
  },
  {
    slug: "aba-group",
    title: "ABA Group Türkiye",
    shortTitle: "ABA Group",
    year: "2026",
    summary: "Five units, five voices, one steady hand.",
    major: true,
    via: true,
    accent: "#F07A2A",
    client: "ABA Group, a semi-government educational consultation and child-support organization in Türkiye",
    role: "Creative Director, via Watch How Malaysia",
    services: "Social media creatives and reels for every unit",
    opening: "image",
    intro: { label: "Group intro", text: "ABA Group isn't one company; it is a group with several segments inside it: ABA Eğitim, ABA Psikoloji, ABA Test Prep, Design House and E4I Vakfı. I made social media creatives and reels for all of them at the same time, managed through the start of 2026." },
    steps: [
      { title: "The problem", body: "The accounts were oversaturated with redundant posts and reels." },
      { title: "The solution", body: "Give each unit its own voice, remove the repetition, and produce creatives and reels for all five accounts together under one consistent standard." },
      { title: "The result", body: "Reach doubled, viewer engagement rose, and follower counts grew roughly tenfold within a month." },
    ],
    stat: { value: "Reach doubled", label: "Followers up roughly tenfold within a month" },
    units: [
      { name: "ABA Eğitim", text: "Education consultancy. Creatives and reels." },
      { name: "ABA Psikoloji", text: "Psychological counselling. Creatives and reels." },
      { name: "ABA Test Prep", text: "Test preparation. More content to come." },
      { name: "Design House", text: "Design. Creatives and reels." },
      { name: "E4I Vakfı", text: "Education-focused foundation. Creatives and reels." },
    ],
    workLabel: "Creatives · Reels · Five units",
    relatedServices: ["social-media-creatives", "videography-reels"],
    relatedCases: ["anebos-studios"],
    metaTitle: "ABA Group Türkiye Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Five education units, five voices: social creatives and reels for an organization in Türkiye.",
  },
  {
    slug: "safirwear",
    title: "SafirWear UK",
    shortTitle: "SafirWear",
    year: "2026",
    summary: "A website direction and an ordering portal concept for custom merch.",
    via: true,
    accent: "#3FE0E0",
    client: "SafirWear, B2B custom apparel",
    role: "Creative Director, via Watch How Malaysia",
    services: "Website design, portal ideation and design",
    opening: "image",
    intro: { label: "Brand intro", text: "SafirWear is a B2B apparel company that makes and designs custom merch on demand for businesses, influencers and brands: hoodies, pants, tote bags, caps and more." },
    steps: [
      { title: "The problem", body: "The website was stuck between minimalism and confusion, a bottleneck in the client's design direction." },
      { title: "The solution", body: "I designed the look of the website and how the imagery should sit across it, then ideated and designed a portal where buyers can easily manage and book orders, with the vision of automating the whole process of ordering large quantities of merch." },
      { title: "The result", body: "The concept landed: the company moved past its critical disjuncture with a clear site direction and an ordering vision to build on." },
    ],
    notes: [{ label: "Scope", text: "Ideation and design only; the portal was not built by me." }],
    website: "Reimagined layout and image styling on client-supplied content; Vercel-based output. Active.",
    liveUrl: "https://safir-wear.vercel.app/",
    workLabel: "Website · Ordering portal concept",
    relatedServices: ["website-design"],
    relatedCases: ["facingnorth", "beatrix-konnect"],
    metaTitle: "SafirWear UK Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Website direction and an ordering portal concept for a B2B custom merch brand.",
  },
  {
    slug: "facingnorth",
    title: "Facingnorth UK",
    shortTitle: "Facingnorth",
    year: "2026",
    summary: "Luxury you can feel before the flight.",
    via: true,
    accent: "#E0A93E",
    client: "Facingnorth, UK travel and tour operator",
    role: "Creative Director, via Watch How Malaysia",
    services: "Itinerary design, pitch deck",
    opening: "image",
    intro: { label: "Brand intro", text: "Facingnorth books private luxury tours for an international clientele to northern Pakistan and tours around the world." },
    steps: [
      { title: "The problem", body: "The client's digital venture had no luxury feel to the experience." },
      { title: "The solution", body: "Hand-crafted, detailed itinerary plans that land in the email of every tourist and client. The vision was simple: make them feel the tour before entering the flight." },
      { title: "The result", body: "The company ran 14 international tours in the first two quarters of 2026 with the new itinerary experience in place." },
    ],
    stat: { value: "14", label: "International tours in the first two quarters of 2026" },
    workLabel: "Itineraries · Pitch deck",
    relatedServices: ["print-media", "presentations-pitchdecks"],
    relatedCases: ["safirwear", "trenddeck"],
    metaTitle: "Facingnorth UK Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Hand-crafted luxury itineraries for a UK tour operator.",
  },
  {
    slug: "beatrix-konnect",
    title: "Beatrix Konnect",
    shortTitle: "Beatrix Konnect",
    year: "2025",
    summary: "A BPO brand built to stand out online.",
    accent: "#5B7FE0",
    client: "Beatrix Konnect, international BPO and call-centre services",
    role: "Website and LinkedIn",
    services: "Website from scratch, LinkedIn management",
    opening: "image",
    steps: [
      { title: "The problem", body: "Beatrix Konnect needed to raise its market standing and stand out among BPO providers." },
      { title: "The solution", body: "I built the website from scratch, which took many hours, and managed the LinkedIn presence with static posts and carousels and regular interaction so the company could attract the clientele it deserved." },
      { title: "The result", body: "A stronger market presence, with the site and LinkedIn presence supporting the company's work with international clients." },
    ],
    website: "WordPress site built from scratch, designed around the company's story. Active.",
    liveUrl: "https://beatrixkonnect.com/",
    workLabel: "Website · LinkedIn posts · Carousels",
    relatedServices: ["website-design", "social-media-creatives", "branding-guidelines"],
    relatedCases: ["safirwear", "skinflux"],
    metaTitle: "Beatrix Konnect Case Study | Muhammad Muneeb Bilal",
    metaDescription: "A website and LinkedIn presence for an international BPO provider.",
  },
  {
    slug: "bakebox",
    title: "Bakebox",
    shortTitle: "Bakebox",
    year: "2025",
    summary: "From a teenage idea to an internationally acquired brand.",
    accent: "#E08F73",
    client: "Bakebox",
    role: "Brand built from scratch",
    services: "Logo, visuals, creatives, reels",
    opening: "image",
    intro: { label: "Story", text: "Bakebox started as a simple idea from a couple of teenagers in Islamabad: deconstruct baking so anyone can get a box at home with portioned ingredients and enjoy baking their own desserts." },
    steps: [
      { title: "The solution", body: "I built the brand from the ground up: the logo, the visuals, the creatives and the reels." },
      { title: "The result", body: "A partner organization in Europe acquired the brand's rights, and it has since been officially renamed." },
    ],
    workLabel: "Logo · Visuals · Creatives · Reels",
    relatedServices: ["social-media-creatives", "branding-guidelines", "videography-reels"],
    relatedCases: ["treatsforlife", "skinflux"],
    metaTitle: "Bakebox Case Study | Muhammad Muneeb Bilal",
    metaDescription: "A bake-at-home brand built from scratch.",
  },
  {
    slug: "skinflux",
    title: "Skinflux",
    shortTitle: "Skinflux",
    year: "2025",
    summary: "Packaging that finally matched the product.",
    accent: "#D9B8AE",
    client: "Skinflux, a cosmetic face-mask brand in the USA",
    role: "Brand definition and packaging",
    services: "Branding, pouch and packaging design",
    opening: "image",
    steps: [
      { title: "The problem", body: "The brand had no packaging design in mind, and the AI-generated attempts were unusable, which caused confusion." },
      { title: "The solution", body: "Define a clear brand first: the font, the colours, the brand elements. Then design the pouch and the packaging on top of it." },
      { title: "The result", body: "The packaging is currently in production, and it is built to stand out in the skincare market." },
    ],
    workLabel: "Brand · Pouch · Packaging",
    relatedServices: ["packaging-design", "branding-guidelines"],
    relatedCases: ["bakebox", "treatsforlife"],
    metaTitle: "Skinflux Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Brand definition and packaging for a US face-mask brand.",
  },
  {
    slug: "ndrmf",
    title: "NDRMF",
    shortTitle: "NDRMF",
    year: "2023",
    summary: "Climate-action communication, done in a corporate register.",
    accent: "#5FA36F",
    client: "NDRMF, a semi-government NGO working on climate action policies in Pakistan",
    role: "Media Marketing Intern",
    services: "LinkedIn, social media, brand design, events, videography and photography",
    opening: "image",
    intro: { label: "Context", text: "NDRMF works with partners including NDMA, Muslim Hands and the ministry of climate action. This was a corporate design outlook rather than a purely creative one." },
    did: "Managed the LinkedIn profile, social media posting and brand designs; handled event management; shot videography and photography at events.",
    workLabel: "LinkedIn · Social · Events",
    relatedServices: ["social-media-creatives"],
    relatedCases: ["tim-hortons"],
    metaTitle: "NDRMF Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Media and marketing for a climate-action NGO in Pakistan.",
  },
  {
    slug: "tim-hortons",
    title: "Tim Hortons",
    shortTitle: "Tim Hortons",
    year: "2022",
    summary: "Where it started: a camera, an internship, and a launch.",
    accent: "#EEEAE1",
    client: "Tim Hortons, Islamabad",
    role: "Marketing and Management Intern",
    services: "Videography reels, social media copy and creatives, launch campaigns, PR packaging",
    opening: "image",
    intro: { label: "Story", text: "This was the start of my design journey. It was the first time I picked up a DSLR to shoot images, and the internship set my direction in this field." },
    did: "Made videography reels and social media copy and creatives, managed brand launches and launch campaigns in Islamabad, and handled PR packaging.",
    testimonial: "Huma Maryum",
    workLabel: "Reels · Launches · PR packaging",
    relatedServices: ["videography-reels", "social-media-creatives"],
    relatedCases: ["ndrmf", "anebos-studios"],
    metaTitle: "Tim Hortons Case Study | Muhammad Muneeb Bilal",
    metaDescription: "Launch campaigns, reels and PR packaging in Islamabad: where the journey started.",
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export const caseIndex = (slug: string) => cases.findIndex((c) => c.slug === slug);

// Text colour that stays readable on an accent fill.
export function onColor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.18 ? "#060708" : "#F4F2EC";
}
