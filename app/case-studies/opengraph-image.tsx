import { OG, pageAlt, pageCard } from "@/lib/og-pages";

export const alt = pageAlt("en", "caseStudies");
export const size = OG.size;
export const contentType = OG.contentType;

export default function Image() {
  return pageCard("en", "caseStudies");
}
