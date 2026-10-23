import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/services-content";
import { cases } from "@/lib/cases";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    ...servicePages.map((s) => `/services/${s.slug}`),
    "/case-studies",
    ...cases.map((c) => `/case-studies/${c.slug}`),
    "/resume",
    "/contact",
  ];
  return paths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
