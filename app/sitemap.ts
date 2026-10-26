import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/services-content";
import { cases } from "@/lib/cases";
import { siteUrl } from "@/lib/site-url";
import { LANGS, localize } from "@/lib/i18n";

// Every page in both languages, each pointing at its twin in the other language.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    ...servicePages.map((s) => `/services/${s.slug}`),
    "/case-studies",
    ...cases.map((c) => `/case-studies/${c.slug}`),
    "/resume",
    "/contact",
  ];
  const url = (p: string) => `${siteUrl}${p === "/" ? "" : p}`;
  return LANGS.flatMap((lang) =>
    paths.map((p) => ({
      url: url(localize(lang, p)),
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.7,
      alternates: { languages: { en: url(localize("en", p)), tr: url(localize("tr", p)) } },
    }))
  );
}
