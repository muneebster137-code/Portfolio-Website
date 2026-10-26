import type { Lang } from "./i18n";
import { caseIn, serviceIn } from "./content";
import { ui } from "./ui";

// What to call a page (a path without its /tr prefix): in full for the page transition, short for the
// dream map in the footer.
export function nameFor(path: string, fallback = "", short = false, lang: Lang = "en") {
  const [a, b] = path.split("/").filter(Boolean);
  const p = ui[lang].pages;
  if (!a) return p.home;
  if (a === "services") {
    const s = b ? serviceIn(lang, b) : undefined;
    return b ? (short ? s?.short : s?.name) ?? fallback : p.services;
  }
  if (a === "case-studies") {
    const c = b ? caseIn(lang, b) : undefined;
    return b ? (short ? c?.shortTitle : c?.title) ?? fallback : p.caseStudies;
  }
  return (p as Record<string, string>)[a] ?? a.charAt(0).toUpperCase() + a.slice(1);
}
