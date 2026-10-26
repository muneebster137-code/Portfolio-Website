import { OG_SIZE, card, photo } from "@/lib/og";
import { services, serviceBySlug, serviceSlug } from "@/lib/site";
import { shelfTextures } from "@/lib/media.server";

// Each service's share card: its picture from the services shelf, name, hook and number, in its colour.
export const alt = "Service by Muhammad Muneeb Bilal";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: serviceSlug(s) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug)!;
  const picture = shelfTextures()[services.indexOf(s)]?.find((src) => src && !/\.(mp4|webm|mov)$/i.test(src));
  return card({ kicker: `${s.code} · ${s.number} ${s.unit}`, title: s.name, sub: s.hook, image: await photo(picture), color: s.color });
}
