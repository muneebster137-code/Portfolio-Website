import { OG_SIZE, card, photo } from "@/lib/og";
import { aboutPortrait } from "@/lib/media-manifest";
import { resolveSlot } from "@/lib/media.server";

export const alt = "About Muhammad Muneeb Bilal, Founder and Creative Specialist.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return card({ kicker: "About", title: "Muhammad Muneeb Bilal", sub: "Founder and creative specialist. The facts, the story and what clients say.", image: await photo(resolveSlot(aboutPortrait).src) });
}
