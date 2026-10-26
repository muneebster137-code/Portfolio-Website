import { OG, homeCard, pageAlt } from "@/lib/og-pages";

// The card shown when the home page is shared on WhatsApp, LinkedIn or X.
export const alt = pageAlt("tr", "home");
export const size = OG.size;
export const contentType = OG.contentType;

export default function Image() {
  return homeCard("tr");
}
