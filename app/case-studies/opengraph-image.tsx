import { OG_SIZE, card, photo } from "@/lib/og";
import { caseCovers } from "@/lib/media-manifest";
import { resolveSlot } from "@/lib/media.server";

export const alt = "Case studies: eleven stories by Muhammad Muneeb Bilal.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return card({ kicker: "Case studies", title: "Eleven stories", sub: "From a first internship to a five-unit education group.", image: await photo(resolveSlot(caseCovers["trenddeck"]).src) });
}
