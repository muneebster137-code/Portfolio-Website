import { allTestimonials } from "./profile";
import { testimonials } from "./site";
import { brandMedia } from "./media-manifest";
import { resolveSlot } from "./media.server";
import { getCase } from "./cases";

// Everything clients have said, once each (some quotes appear in both lists).
export function proofNotes(exclude?: string) {
  const seen = new Set<string>();
  return [...allTestimonials, ...testimonials].filter((t) => {
    if (seen.has(t.name) || t.name === exclude) return false;
    seen.add(t.name);
    return true;
  });
}

// Client logos that have been supplied (first logo of each brand), for pinning beside the notes.
export function proofLogos() {
  return Object.entries(brandMedia).flatMap(([slug, b]) => {
    const src = resolveSlot(b.logos[0]).src;
    const name = getCase(slug)?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return src ? [{ name, src }] : [];
  });
}
