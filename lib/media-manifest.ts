// Every replaceable image, video and 3D file on the site. Each slot is a path under /public without an
// extension: drop a file there (any listed extension) and it appears; until then a placeholder shows.
// This file has no imports so `node scripts/media-folders.ts` can read it to build the folders and README.

export type SlotKind = "image" | "video" | "model";
export type Ratio = "4/5" | "9/16" | "16/9" | "16/10" | "1/1" | "3/4" | "2/3" | "7/4" | "a4" | "a4-land" | "showcase" | "phone" | "web";

export type Slot = { path: string; ratio: Ratio; label: string; kind: SlotKind };

export const RATIOS: Record<Ratio, { css: string; size: string; name: string }> = {
  "4/5": { css: "4 / 5", size: "1080 × 1350", name: "4:5 post" },
  "9/16": { css: "9 / 16", size: "1080 × 1920", name: "9:16 reel" },
  "16/9": { css: "16 / 9", size: "1920 × 1080", name: "16:9" },
  "16/10": { css: "16 / 10", size: "1600 × 1000", name: "16:10" },
  "1/1": { css: "1 / 1", size: "1080 × 1080", name: "1:1 square" },
  "3/4": { css: "3 / 4", size: "1080 × 1440", name: "3:4" },
  "2/3": { css: "2 / 3", size: "1600 × 2400", name: "2:3 cover" },
  "7/4": { css: "7 / 4", size: "1050 × 600", name: "visiting card" },
  a4: { css: "1 / 1.414", size: "2480 × 3508", name: "A4 portrait" },
  "a4-land": { css: "1.414 / 1", size: "3508 × 2480", name: "A4 landscape" },
  showcase: { css: "1440 / 3115", size: "1440 × 3115", name: "full-page website screenshot" },
  phone: { css: "9 / 19", size: "1080 × 2280", name: "phone screen" },
  web: { css: "9 / 5", size: "1800 × 1000", name: "browser screen" },
};

export const EXTENSIONS: Record<SlotKind, string[]> = {
  image: [".webp", ".jpg", ".jpeg", ".png", ".avif"],
  video: [".mp4", ".webm", ".mov"],
  model: [".glb", ".gltf"],
};

const pad = (n: number) => String(n).padStart(2, "0");
const many = (dir: string, stem: string, count: number, ratio: Ratio, label: string, kind: SlotKind = "image"): Slot[] =>
  Array.from({ length: count }, (_, i) => ({ path: `${dir}/${stem}-${pad(i + 1)}`, ratio, label: `${label} ${i + 1}`, kind }));
const one = (path: string, ratio: Ratio, label: string, kind: SlotKind = "image"): Slot => ({ path, ratio, label, kind });

// A social set: posts, one carousel (its slides) and one reel, each in its native format.
export type SocialSet = { posts: Slot[]; carousel: Slot[]; reel: Slot };
const socialSet = (dir: string, posts: number): SocialSet => ({
  posts: many(`${dir}/posts`, "post", posts, "4/5", "Post"),
  carousel: many(`${dir}/carousel`, "slide", 4, "4/5", "Carousel slide"),
  reel: one(`${dir}/reel/reel-01`, "9/16", "Reel", "video"),
});

/* ---------- Case studies ---------- */

const C = "media/case-studies";

export const ABA_UNITS = [
  { slug: "aba-egitim", name: "ABA Eğitim" },
  { slug: "aba-psikoloji", name: "ABA Psikoloji" },
  { slug: "aba-test-prep", name: "ABA Test Prep" },
  { slug: "design-house", name: "Design House" },
  { slug: "e4i-vakfi", name: "E4I Vakfı" },
];

export type CaseGallery =
  | { type: "social"; set: SocialSet }
  | { type: "units"; units: { slug: string; name: string; set: SocialSet }[] }
  | { type: "set"; slots: Slot[] };

const socialCases = ["anebos-studios", "trenddeck", "treatsforlife", "beatrix-konnect", "bakebox", "ndrmf", "tim-hortons"];

export const caseCovers: Record<string, Slot> = Object.fromEntries(
  ["anebos-studios", "trenddeck", "treatsforlife", "aba-group", "safirwear", "facingnorth", "beatrix-konnect", "bakebox", "skinflux", "ndrmf", "tim-hortons"].map((s) => [
    s,
    one(`${C}/${s}/cover`, "16/9", "Cover image"),
  ])
);

export const caseGalleries: Record<string, CaseGallery> = {
  ...Object.fromEntries(socialCases.map((s) => [s, { type: "social", set: socialSet(`${C}/${s}`, 3) } as CaseGallery])),
  "aba-group": { type: "units", units: ABA_UNITS.map((u) => ({ ...u, set: socialSet(`${C}/aba-group/units/${u.slug}`, 2) })) },
  safirwear: { type: "set", slots: many(`${C}/safirwear/screens`, "screen", 3, "16/9", "Website or portal screen") },
  facingnorth: { type: "set", slots: many(`${C}/facingnorth/itineraries`, "page", 4, "a4", "Itinerary page") },
  skinflux: { type: "set", slots: many(`${C}/skinflux/packaging`, "design", 3, "1/1", "Pouch or packaging design") },
};

/* ---------- Services ---------- */

const S = "media/services";

export const serviceMedia: Record<string, Record<string, Slot[]>> = {
  "social-media-creatives": Object.fromEntries(
    ["anebos-studios", "trenddeck", "aba-group", "beatrix-konnect", "treatsforlife", "bakebox", "ndrmf"].map((b) => [
      b,
      many(`${S}/social-media-creatives/${b}`, "post", 6, "4/5", "Post"),
    ])
  ),
  "videography-reels": {
    ugc: many(`${S}/videography-reels/ugc`, "reel", 3, "9/16", "UGC reel", "video"),
    documentary: [one(`${S}/videography-reels/documentary/film-01`, "16/9", "Documentary film", "video"), one(`${S}/videography-reels/documentary/reel-01`, "9/16", "Documentary reel", "video")],
    "b-roll": many(`${S}/videography-reels/b-roll`, "reel", 2, "9/16", "B-roll loop", "video"),
    "product-demos": [one(`${S}/videography-reels/product-demos/film-01`, "16/9", "Product commercial", "video"), one(`${S}/videography-reels/product-demos/reel-01`, "9/16", "Product reel", "video")],
    kinetic: many(`${S}/videography-reels/kinetic`, "reel", 3, "9/16", "Kinetic reel", "video"),
    "ai-motion": many(`${S}/videography-reels/ai-motion`, "reel", 3, "9/16", "AI motion reel", "video"),
    commercial: many(`${S}/videography-reels/commercial`, "reel", 6, "9/16", "Commercial reel", "video"),
  },
  "print-media": {
    "magazines-posters": many(`${S}/print-media/magazines-posters`, "piece", 6, "a4", "Magazine or poster"),
    itineraries: many(`${S}/print-media/itineraries`, "piece", 5, "a4", "Itinerary"),
    "book-covers": many(`${S}/print-media/book-covers`, "piece", 3, "2/3", "Book cover"),
    brochures: many(`${S}/print-media/brochures`, "piece", 2, "a4-land", "Brochure"),
    "visiting-cards": many(`${S}/print-media/visiting-cards`, "piece", 2, "7/4", "Visiting card"),
    letterheads: many(`${S}/print-media/letterheads`, "piece", 2, "a4", "Letterhead"),
  },
  "packaging-design": {
    "box-and-bottle": many(`${S}/packaging-design/box-and-bottle`, "design", 3, "1/1", "Box or bottle design"),
    "pouch-and-packet": many(`${S}/packaging-design/pouch-and-packet`, "design", 3, "3/4", "Pouch or packet design"),
    "stickers-and-labels": many(`${S}/packaging-design/stickers-and-labels`, "design", 3, "1/1", "Sticker or label design"),
  },
  "presentations-pitchdecks": Object.fromEntries(
    ["anebos-nova-model", "nivora-travels", "facing-north", "reweave"].map((d) => [d, many(`${S}/presentations-pitchdecks/${d}`, "slide", 3, "16/9", "Slide")])
  ),
};

export const videographyHook = one(`${S}/videography-reels/hook/hook`, "16/9", "Opening clip: the bullet and the balloon", "video");
export const packagingModel = one(`${S}/packaging-design/model/model`, "1/1", "3D packaging model", "model");

export type BrandSlots = { logos: Slot[]; palette: Slot; guidelines: Slot[] };
export const brandMedia: Record<string, BrandSlots> = Object.fromEntries(
  ["anebos-studios", "trenddeck", "treatsforlife", "bakebox", "beatrix-konnect", "skinflux"].map((b) => [
    b,
    {
      logos: many(`${S}/branding-guidelines/${b}`, "logo", 2, "1/1", "Logo variation"),
      palette: one(`${S}/branding-guidelines/${b}/palette`, "16/9", "Colour palette"),
      guidelines: many(`${S}/branding-guidelines/${b}`, "guidelines", 2, "16/9", "Brand guidelines page"),
    },
  ])
);

export const websiteShowcase: Record<string, Slot> = Object.fromEntries(
  ["treatsforlife", "safirwear", "beatrix-konnect", "trenddeck", "fairmans", "casa-de-rococco", "yumi-furnitures"].map((w) => [
    w,
    one(`${S}/website-design/${w}/showcase`, "showcase", "Full-page screenshot"),
  ])
);

/* ---------- Home and About ---------- */

const H = "media/home";

export const homeMedia = {
  sheetBack: one(`${H}/sheet/back`, "a4", "Back of the A4 sheet (the work it turns into)"),
  insideTheDream: Object.fromEntries(
    ["anebos-studios", "aba-group", "trenddeck", "treatsforlife"].map((s) => [s, one(`${H}/inside-the-dream/${s}`, "16/10", "Case image")])
  ) as Record<string, Slot>,
  // Pictures printed on the seven objects in the services shelf, in shelf order.
  engine: {
    social: one(`${H}/engine/social`, "phone", "Phone screen (Social media)"),
    video: one(`${H}/engine/video`, "1/1", "Disc artwork (Videography)"),
    print: one(`${H}/engine/print`, "a4", "Magazine cover (Print)"),
    web: one(`${H}/engine/web`, "web", "Browser screen (Websites)"),
    packaging: one(`${H}/engine/packaging`, "3/4", "Box front (Packaging)"),
    decks: many(`${H}/engine`, "deck", 3, "16/9", "Deck slide (Pitch decks)"),
  },
};

export const aboutPortrait = one("media/about/portrait", "4/5", "Portrait");

/* ---------- Everything, for the folder builder ---------- */

export function allSlots(): Slot[] {
  const out: Slot[] = [];
  const add = (x: unknown) => {
    if (!x || typeof x !== "object") return;
    if (Array.isArray(x)) return x.forEach(add);
    const o = x as Record<string, unknown>;
    if (typeof o.path === "string" && typeof o.ratio === "string") out.push(o as unknown as Slot);
    else Object.values(o).forEach(add);
  };
  [caseCovers, caseGalleries, serviceMedia, videographyHook, packagingModel, brandMedia, websiteShowcase, homeMedia, aboutPortrait].forEach(add);
  return out;
}
