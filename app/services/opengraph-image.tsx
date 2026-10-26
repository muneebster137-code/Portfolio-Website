import { OG_SIZE, card } from "@/lib/og";

export const alt = "Seven services, one creative engine: Muhammad Muneeb Bilal.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return card({ kicker: "Services", title: "Seven services. One creative engine.", sub: "Social media, video, print, branding, websites, packaging and pitch decks.", image: undefined });
}
