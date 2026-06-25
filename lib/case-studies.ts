export type Tier = 1 | 2 | 3;
export type Category = "A" | "B" | "C";

export interface SubEntity {
  name: string;
  audience: string;
  strategy: string;
  trigger: string;
  accent: { primary: string; secondary: string };
}

export interface CaseStudy {
  slug: string;
  client: string;
  role: string;
  dateRange: string;
  status: "ongoing" | "closed" | "intermittent";
  category: Category;
  routedVia?: string;
  tier: Tier;
  liveSiteUrl?: string;
  accent: { primary: string; secondary: string };
  summary: string;
  bullets: string[];
  subEntities?: SubEntity[];
  metricsNote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "watch-how-malaysia",
    client: "Watch How Malaysia",
    role: "Visual Designer & Social Media Manager",
    dateRange: "Mid 2025–Present",
    status: "ongoing",
    category: "A",
    tier: 2,
    accent: { primary: "#C24E2B", secondary: "#4A4D52" },
    summary: "Watch How Malaysia is my primary contractor relationship. I handle visual design and social media management directly for two of their subsidiary companies, and separately, they've routed me four additional client accounts — Safir Wear, FacingNorth, Trenddeck, and the five-entity ABA Group. Each of those gets its own full case study; this page is about the relationship itself and the two subsidiaries I manage directly.",
    bullets: [
      "Spearhead visual design and social management for two Watch How subsidiary companies, building tailored brand aesthetics and visual guidelines for each.",
      "Design social posts, stories, and multimedia content aimed at global audience engagement.",
      "Develop and enforce brand guidelines across all digital touchpoints."
    ]
  },
  {
    slug: "safir-wear",
    client: "Safir Wear",
    role: "Lead Designer & AI Visual Strategist",
    dateRange: "Feb 2026–Present",
    status: "intermittent",
    category: "B",
    routedVia: "Watch How Malaysia",
    tier: 1,
    liveSiteUrl: "https://safirwear.vercel.app",
    accent: { primary: "#2A1A3D", secondary: "#3FE0E0" },
    summary: "Safir Wear needed a high-fashion feel on a streetwear startup's budget — no money for physical shoots, no inventory to photograph yet. I bypassed that entirely with AI-generated models wearing the apparel, art-directed to 'Vogue-level' quality rather than the cheap, obviously-synthetic look most AI fashion content has.",
    bullets: [
      "Defined a futuristic, hyper-realistic streetwear visual direction that eliminated the need for physical production logistics.",
      "Curated a dark, vibrant color palette and used AI-generated models to showcase garments.",
      "Designed static lookbooks, interactive product-detail carousels, and cinematic reels.",
      "Designed and built the brand's website UI (Vercel-hosted), with a dark product gallery built to make the AI imagery the focal point."
    ]
  },
  {
    slug: "facingnorth",
    client: "FacingNorth",
    role: "Marketing Director & Itinerary Designer",
    dateRange: "Mar 2026–Present",
    status: "intermittent",
    category: "B",
    routedVia: "Watch How Malaysia",
    tier: 2,
    accent: { primary: "#3E7CB1", secondary: "#E0A93E" },
    summary: "Most travel marketing sells a trip that doesn't match the photos. I work the other way — I design the itinerary and the marketing together, so the physical trip actually delivers what the Reel promised.",
    bullets: [
      "Redesigned FacingNorth's brand direction around a vibrant, adventure-centric palette.",
      "Designed structured itinerary PDFs and choreographed scenic travel reels."
    ]
  },
  {
    slug: "trenddeck",
    client: "Trenddeck",
    role: "Lead Social Media Strategist & Content Creator",
    dateRange: "Mar–May 2026",
    status: "closed",
    category: "B",
    routedVia: "Watch How Malaysia",
    tier: 2,
    accent: { primary: "#5C4633", secondary: "#2B2B2B" },
    summary: "Trenddeck is a real WPC (Wood Plastic Composite) flooring and cladding manufacturer in Bursa, Turkey. When Watch How routed me this account, the company had an established product line but no social media presence at all — no Instagram, no brand-on-social identity. I built it from the ground up: I created the account, set the visual direction, and ran it for two months before the engagement closed.",
    bullets: [
      "Created Trenddeck's Instagram presence from zero.",
      "Shifted the brand's visual direction toward Modern Minimalism and Biophilic Design, using a palette of deep oaks, teaks, greys, and anthracite to mirror the physical product.",
      "Produced 20+ cinematic reels (texture close-ups, 360° installation views, hydrophobic water-resistance demonstrations).",
      "Built educational carousels translating technical specs (UV resistance, eco-composition, maintenance) into swipeable guides.",
      "Designed 30+ static posts as a minimalist digital showroom."
    ]
  },
  {
    slug: "aba-group",
    client: "ABA Group",
    role: "Global Social Media Manager & Visual Strategist (Group-Wide)",
    dateRange: "Apr 2026–Present",
    status: "ongoing",
    category: "B",
    routedVia: "Watch How Malaysia",
    tier: 2,
    accent: { primary: "#1B2A4A", secondary: "#C9A227" },
    summary: "ABA Group, founded by Dr. Gamze Sart in Istanbul, runs five completely different businesses under one umbrella — study-abroad consulting, test prep, psychological counseling, design education, and an education-focused NGO. The hard part wasn't any single brand; it was running five distinct visual and tonal identities at once, for five audiences that have almost nothing in common with each other.",
    bullets: [
      "Redesigned and managed daily posting across all five entities under the group umbrella.",
      "Created tailored design guidelines for academic prestige, emergency-driven score prep, pastel safe spaces, dark architectures, and green NGOs.",
      "Delivered 50-60 original high-retention visual assets and interactive posts."
    ],
    subEntities: [
      {
        name: "Aba Eğitim",
        audience: "High-school students & parents",
        strategy: "High-prestige academic palette, aspirational reels tracking outcomes",
        trigger: "Ambition, prestige",
        accent: { primary: "#1B2A4A", secondary: "#C9A227" }
      },
      {
        name: "ABA Test Prep",
        audience: "SAT/IELTS candidates",
        strategy: "High-contrast, efficiency-coded visuals, tactical score-tip carousels",
        trigger: "Urgency, competence",
        accent: { primary: "#111111", secondary: "#D6382B" }
      },
      {
        name: "ABA Psikoloji",
        audience: "Mental health support seekers",
        strategy: "Calming pastel 'Safe Space' identity, empathetic typographic posts",
        trigger: "Trust, safety",
        accent: { primary: "#D9B8AE", secondary: "#A8B89C" }
      },
      {
        name: "Designhouse Istanbul",
        audience: "Aspiring creatives & architects",
        strategy: "Neutral-dark, showcase-heavy portfolio identity",
        trigger: "Creative inspiration",
        accent: { primary: "#262626", secondary: "#9C8F7E" }
      },
      {
        name: "E4I Vakfı",
        audience: "Philanthropists & NGO partners",
        strategy: "Trust-building, community-centric earth tones",
        trigger: "Empathy, legacy",
        accent: { primary: "#2F4B3C", secondary: "#D8C9A3" }
      }
    ]
  },
  {
    slug: "treats-for-life",
    client: "Treats for Life",
    role: "Digital Marketing Manager & Lead Web Developer",
    dateRange: "Oct 2024–Jun 2025",
    status: "closed",
    category: "A",
    tier: 1,
    liveSiteUrl: "https://www.treatsforlife.com",
    accent: { primary: "#C8862E", secondary: "#5A3A22" },
    summary: "Treats for Life makes genuinely good organic products — Himalayan Shilajit, cold-pressed mulberry molasses, wild Sidr honey — but had no unified digital presence. The challenge with a food brand online is that you can't taste it through a screen, so every visual had to work overtime to suggest taste, smell, and texture.",
    bullets: [
      "Designed, built, and launched the official e-commerce site, www.treatsforlife.com, mobile-first and fast-loading.",
      "Conducted in-house macro-texture product photography (honey drips, honey-nut crunch, molasses tones) using natural lighting.",
      "Choreographed product reels syncing physical food movement (pours, cracks, bites) with ASMR-style sound design.",
      "Designed educational carousels on the health benefits of shilajit and wild honey.",
      "Grew and managed Instagram and Facebook organically alongside paid promotion."
    ]
  },
  {
    slug: "ndrmf",
    client: "National Disaster Risk Management Fund (NDRMF)",
    role: "Media Intern",
    dateRange: "Sept–Dec 2024",
    status: "closed",
    category: "A",
    tier: 2,
    accent: { primary: "#2E5339", secondary: "#CBB994" },
    summary: "NDRMF needed to turn dry disaster-relief data into something the public would actually read. The brief wasn't 'make it pretty' — it was 'make systemic resilience and relief data legible without exploiting the people affected by it.'",
    bullets: [
      "Developed visual content and media strategy for public outreach.",
      "Designed infographics and swipeable educational carousels translating relief data into readable metrics.",
      "Produced field-work reels of relief and reconstruction efforts, avoiding exploitative disaster imagery.",
      "Aligned visual identity to a nature-centric, SDG-aligned palette (forest greens, deep blues, sand).",
      "Reduced content delivery times by 30% through streamlined design/approval workflows; campaign success rates improved 10%."
    ]
  },
  {
    slug: "tim-hortons",
    client: "Tim Hortons Pakistan",
    role: "Marketing Intern",
    dateRange: "Dec 2023–Apr 2024",
    status: "closed",
    category: "A",
    tier: 2,
    accent: { primary: "#C24E2B", secondary: "#4A4D52" },
    summary: "My first real brand-marketing role — managing launch events for multiple Islamabad branches while running the Instagram presence day to day.",
    bullets: [
      "Managed launch events for multiple Tim Hortons branches across Islamabad.",
      "Led Instagram management — posts, stories, reels — to support brand presence.",
      "Collaborated with the core marketing team on promotional campaigns and customer engagement strategy."
    ]
  },
  {
    slug: "beatrix-konnect",
    client: "Beatrix Konnect",
    role: "Brand Founder & Lead Developer",
    dateRange: "Sept–Oct 2024",
    status: "closed",
    category: "A",
    tier: 1,
    liveSiteUrl: "https://beatrixkonnect.com",
    accent: { primary: "#1A2A52", secondary: "#5B6470" },
    summary: "Beatrix Konnect needed a trustworthy online presence built from absolute zero for a US-based outsourcing and call center provider. B2B buyers in this space are risk-averse — the brand had to read as stable and established from the first impression, with no shortcuts to stock-photo cheapness.",
    bullets: [
      "Designed the corporate logo from initial sketches to final vector art.",
      "Built the web portal, beatrixkonnect.com.",
      "Selected a corporate palette of deep navy, slate grey, and crisp white to signal security and trust.",
      "Designed LinkedIn graphics and B2B educational carousels on outsourcing efficiency; managed LinkedIn and Instagram presence aimed at corporate decision-makers."
    ]
  },
  {
    slug: "fairmans-uk",
    client: "Fairmans Estate Agents (UK)",
    role: "Website Designer",
    dateRange: "Mar–Apr 2025",
    status: "closed",
    category: "A",
    tier: 1,
    liveSiteUrl: "https://fairmansestateagents.co.uk",
    accent: { primary: "#33495E", secondary: "#8DA2B4" },
    summary: "A UK property firm needed a searchable, modern site that didn't look like a template real-estate listing dump.",
    bullets: [
      "Designed and developed a searchable real estate website with listing filters and interactive property cards.",
      "Built for mobile responsiveness and urban-market efficiency.",
      "Sharp, clean corporate color palette to match a UK property audience's expectations."
    ]
  },
  {
    slug: "green-pakistan-agro",
    client: "Green Pakistan Agro Farms",
    role: "Web Designer & Media Producer",
    dateRange: "May–Jun 2024",
    status: "closed",
    category: "A",
    tier: 1,
    liveSiteUrl: "https://greenpakistanagrofarm.com",
    accent: { primary: "#33503B", secondary: "#7A5A3C" },
    summary: "Premium farmland is an emotional purchase as much as a financial one. The brief was to make people feel the lushness of owning land, not just see a listing.",
    bullets: [
      "Conducted on-site photography to capture the emotional and biophilic appeal of farmland ownership.",
      "Built a real-estate-style site, greenpakistanagrofarm.com, with a rich deep-green and warm-brown palette.",
      "Produced serene reels and high-resolution static property guides."
    ]
  },
  {
    slug: "bakebox",
    client: "Bakebox",
    role: "Packaging & Product Identity Designer",
    dateRange: "Mar 2025",
    status: "closed",
    category: "A",
    tier: 3,
    accent: { primary: "#F2DFC4", secondary: "#E08F73" },
    summary: "Home baking is intimidating for beginners — one wrong measurement and the whole thing fails. The packaging needed to function as a reassuring guide, not just a container.",
    bullets: [
      "Reframed the box itself as an active guide in the baking process, not passive packaging.",
      "Designed a warm, soft, inviting palette to dismantle baking anxiety.",
      "Integrated playful typography and step-by-step visual instructions directly onto the packaging.",
      "Delivered 3D package mockups, label designs, and a cohesive brand pattern."
    ]
  },
  {
    slug: "homeloom-uk",
    client: "Homeloom UK",
    role: "E-commerce Brand Director",
    dateRange: "May–Jul 2025",
    status: "closed",
    category: "A",
    tier: 3,
    accent: { primary: "#E8E2D6", secondary: "#B68D40" },
    summary: "Dropshipping brands fight constant consumer skepticism about quality and shipping legitimacy. The job was to make a mass-market product feel like a boutique heritage label.",
    bullets: [
      "Designed the 'Visual Trust' framework — positioning the brand around heritage, reliability, and modern elegance.",
      "Established a palette of soft neutrals and gold accents to signal luxury.",
      "Produced high-end lifestyle reels and stylized educational carousels, supported by a polished Shopify storefront layout."
    ]
  },
  {
    slug: "bic-szabist",
    client: "BIC SZABIST",
    role: "Visual Journey Lead",
    dateRange: "Jan–Mar 2023",
    status: "closed",
    category: "A",
    tier: 2,
    accent: { primary: "#1F4E8C", secondary: "#7CF26C" },
    summary: "My earliest brand role — running visual identity for SZABIST's startup incubation centre while I was a student there myself.",
    bullets: [
      "Established a dynamic, energetic palette (blues and neon accents) to symbolize innovation.",
      "Conducted portrait and styling shoots for student founders; covered live events.",
      "Produced 'Founder Spotlight' carousels and high-tempo event reels."
    ]
  },
  {
    slug: "anebos-studios",
    client: "Anebos Studios",
    role: "Founder & Creative Director",
    dateRange: "Ongoing",
    status: "ongoing",
    category: "C",
    tier: 3,
    accent: { primary: "#00000022", secondary: "#FAFAFA" },
    summary: "Anebos (Greek for 'youthful') is my own studio, built around one idea: most brands have good photography but no rhythm. I treat every piece of video content as a choreographed performance — transitions, product movement, and lighting cued to the beat — rather than a static post with motion added on top.",
    bullets: [
      "Developed the 'Kinetic Pulse' framework: vertical, high-impact video as the core of brand strategy, not an add-on.",
      "Designed a sleek, high-contrast dark-mode identity for the studio itself.",
      "Synced visual transitions and lighting shifts to audio beats for high-retention content.",
      "Integrated socio-cultural awareness (from his Development Studies background) into visual narratives for clients across Pakistan, Turkey, and the Middle East."
    ],
    metricsNote: "15–20% engagement increase and 30% turnaround reduction claims are unverified estimates — confirm before treating as fact."
  }
];
