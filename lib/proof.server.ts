import type { Lang } from "./i18n";
import { content, caseIn } from "./content";
import { brandMedia } from "./media-manifest";
import { resolveSlot } from "./media.server";

// Everything clients have said, once each (some quotes appear in both lists).
export function proofNotes(lang: Lang, exclude?: string) {
  const { allTestimonials, testimonials } = content(lang);
  const seen = new Set<string>();
  return [...allTestimonials, ...testimonials].filter((t) => {
    if (seen.has(t.name) || t.name === exclude) return false;
    seen.add(t.name);
    return true;
  });
}

// Client logos that have been supplied (first logo of each brand), for pinning beside the notes.
export function proofLogos(lang: Lang) {
  return Object.entries(brandMedia).flatMap(([slug, b]) => {
    const src = resolveSlot(b.logos[0]).src;
    const name = caseIn(lang, slug)?.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return src ? [{ name, src }] : [];
  });
}
