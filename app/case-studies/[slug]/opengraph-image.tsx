import { OG_SIZE, card, photo } from "@/lib/og";
import { cases, caseIndex, getCase } from "@/lib/cases";
import { caseCovers } from "@/lib/media-manifest";
import { resolveSlot } from "@/lib/media.server";

// Each case study's share card: its cover, its title and its one-line summary, in the client's colour.
export const alt = "Case study by Muhammad Muneeb Bilal";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug)!;
  const n = String(caseIndex(c.slug) + 1).padStart(2, "0");
  return card({ kicker: `Case ${n} · ${c.year}`, title: c.title, sub: c.summary, image: await photo(resolveSlot(caseCovers[c.slug]).src), color: c.accent });
}
