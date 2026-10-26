// Locked facts and copy from Content Masterplan v3.1. Every number here comes from section 4.3.

export const identity = {
  name: "Muhammad Muneeb Bilal",
  role: "Founder and Creative Specialist",
  tagline: "Dreamt in pencil. Delivered in colour.",
  email: "muneebster137@gmail.com",
  phone: "+92-328-5726711",
  phoneHref: "tel:+923285726711",
  location: "Islamabad, Pakistan (GMT+5)",
  coords: "33.6844° N, 73.0479° E",
  linkedin: "https://www.linkedin.com/in/muneeb-bilal-886481282",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  code: string;
  name: string;
  short: string;
  hook: string;
  number: string;
  unit: string;
  color: string;
  ink: string;
  href: string;
};

export const services: Service[] = [
  { code: "MMB 01-C", name: "Social Media Creatives", short: "Social", hook: "Scroll. Stop. Remember.", number: "1,000+", unit: "creatives", color: "#FF4A1C", ink: "#060708", href: "/services/social-media-creatives" },
  { code: "MMB 02-C", name: "Videography and Reels", short: "Video", hook: "Imagine this is the attention I could bring to your brand.", number: "100+", unit: "reels", color: "#3346FF", ink: "#F4F2EC", href: "/services/videography-reels" },
  { code: "MMB 03-C", name: "Print Media", short: "Print", hook: "Some things deserve to be held.", number: "250+", unit: "deliverables", color: "#FFC21A", ink: "#060708", href: "/services/print-media" },
  { code: "MMB 04-C", name: "Branding and Guidelines", short: "Branding", hook: "A logo is a face. A brand is a personality.", number: "10+", unit: "brands from scratch", color: "#12B07F", ink: "#060708", href: "/services/branding-guidelines" },
  { code: "MMB 05-C", name: "Website Designing", short: "Websites", hook: "Your website is your first handshake.", number: "20+", unit: "websites", color: "#8E63FF", ink: "#060708", href: "/services/website-design" },
  { code: "MMB 06-C", name: "Packaging and Design", short: "Packaging", hook: "The first thing they touch is your brand.", number: "100+", unit: "designs", color: "#FF5FA2", ink: "#060708", href: "/services/packaging-design" },
  { code: "MMB 07-C", name: "Presentations and Pitchdecks", short: "Pitch decks", hook: "A deck is a first impression with a deadline.", number: "4", unit: "featured decks", color: "#EEEAE1", ink: "#060708", href: "/services/presentations-pitchdecks" },
];

export const keyNumbers = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 1, suffix: "k+", label: "Creatives delivered" },
  { value: 16, suffix: "+", label: "Active brands" },
  { value: 30, suffix: "+", label: "Certifications" },
];

export const featuredWork = [
  { index: "01", slug: "anebos-studios", title: "Anebos Studios", year: "2024", summary: "My own studio: standout creative, delivered the same day.", tag: "Major case study", plate: "#EEEAE1" },
  { index: "04", slug: "aba-group", title: "ABA Group Türkiye", year: "2026", summary: "Five units, five voices, one steady hand.", tag: "Major case study", via: true, plate: "#FF8A1F" },
  { index: "02", slug: "trenddeck", title: "TrendDeck Türkiye", year: "2026", summary: "From unknown to unmissable: a WPC decking brand built from zero.", via: true, plate: "#8A6A4A" },
  { index: "03", slug: "treatsforlife", title: "Treatsforlife", year: "2024", summary: "Natural foods, a Shopify store and a brand built in three months.", plate: "#C8862E" },
];

export const processSteps = [
  { n: "01", title: "Listen", body: "I start with your need: what should this brand make people feel, remember and do?" },
  { n: "02", title: "Shape the vision", body: "I build on yours, or help you create one." },
  { n: "03", title: "Deliver", body: "Creative that stops the scroll, holds attention and gives people a clear next step." },
];

export const testimonials = [
  { quote: "Muneeb supported multiple Tim Hortons launches in Islamabad by handling logistics and creative tasks stupendously.", name: "Huma Maryum", title: "Marketing Manager, Tim Hortons", source: "LinkedIn" },
  { quote: "Treatsforlife was a dream that was well executed and made a reality by the hard work and dedication of Muneeb. I appreciate how you managed the whole project and how you oversaw every aspect with utmost dedication.", name: "Mr Waqas", title: "CEO, Treats For Life", source: "WhatsApp message" },
  { quote: "Thank you, Muneeb, for your exceptional work in designing and building the media presence of BIC SZABIST from the ground up.", name: "Shahid Raja", title: "Founder and Lead, BIC SZABIST", source: "WhatsApp message" },
];

export const story = [
  "In the beginning, life was a sheet of A4 paper and a half-sharpened pencil. The sky was the limit, and imagination decided where the design went.",
  "Then, early in university, someone asked me a casual question: what should my logo look like? I had no idea what Adobe was.",
  "So I picked up my diary, worked up a sketch, and turned it into a digital print. That's how it all began.",
  "The pencil never stopped. The ink just got replaced with Pantone and hex fields.",
];

export const chapters = [
  { id: "intro", label: "Intro" },
  { id: "story", label: "Story" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "proof", label: "Proof" },
  { id: "contact", label: "Contact" },
];

export const serviceSlug = (s: Service) => s.href.split("/").pop() as string;
export const serviceBySlug = (slug: string) => services.find((s) => serviceSlug(s) === slug);
