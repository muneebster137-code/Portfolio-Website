// The site in two languages: English at the root (/about) and Turkish under /tr (/tr/about).
// Paths are the same in both; only the prefix changes.

export type Lang = "en" | "tr";
export const LANGS: Lang[] = ["en", "tr"];

export const langFromPath = (path: string | null | undefined): Lang => (path === "/tr" || path?.startsWith("/tr/") ? "tr" : "en");

// The path without its language prefix: /tr/about → /about, /tr → /.
export const stripLang = (path: string) => (langFromPath(path) === "tr" ? path.slice(3) || "/" : path);

// An internal path in the given language. Anything that isn't a site path (mailto:, https:, #) is left alone.
export function localize(lang: Lang, path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const bare = stripLang(path);
  if (lang === "en") return bare;
  return bare === "/" ? "/tr" : `/tr${bare}`;
}

// hreflang alternates for a page's metadata.
export const alternates = (lang: Lang, path: string) => ({
  canonical: localize(lang, path),
  languages: { en: localize("en", path), tr: localize("tr", path), "x-default": localize("en", path) },
});
