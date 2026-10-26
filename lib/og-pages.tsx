import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { caseIndex } from "./cases";
import { caseIn, content, serviceIn } from "./content";
import { pageCopy } from "./meta";
import { ui } from "./ui";
import { aboutPortrait, caseCovers } from "./media-manifest";
import { resolveSlot, shelfTextures } from "./media.server";
import { OG_SIZE, card, photo } from "./og";

// Every page's share card, in either language. The app's opengraph-image files just call these.

export const OG = { size: OG_SIZE, contentType: "image/png" };

// The home card: the tagline next to the first sketch.
export function homeCard(lang: Lang) {
  const t = ui[lang].hero;
  const { identity } = content(lang);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#060708", color: "#EEEAE1", padding: "72px 80px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#8E929B", textTransform: "uppercase" }}>{identity.name}</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: lang === "tr" ? 72 : 92, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4 }}>
            <span>{t.line1}</span>
            <span style={{ display: "flex" }}>
              {t.before && <span>{t.before.trim()}&nbsp;</span>}
              <span style={{ color: "#FF4A1C" }}>{t.highlight}</span>
              <span>{t.after}</span>
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#A9ADB5" }}>
            {identity.role} · {lang === "tr" ? "İslamabad, Pakistan" : "Islamabad, Pakistan"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 330 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300, height: 424, background: "#F2EFE7", transform: "rotate(4deg)" }}>
            <svg width="220" height="220" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="#FF4A1C" />
              <path d="M19 44 L21.5 20 L32 34 L42.5 20 L45 44" fill="none" stroke="#060708" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}

export async function caseCard(lang: Lang, slug: string) {
  const c = caseIn(lang, slug)!;
  const n = String(caseIndex(c.slug) + 1).padStart(2, "0");
  return card({ kicker: `${ui[lang].common.caseWord} ${n} · ${c.year}`, title: c.title, sub: c.summary, image: await photo(resolveSlot(caseCovers[c.slug]).src), color: c.accent });
}

export async function serviceCard(lang: Lang, slug: string) {
  const s = serviceIn(lang, slug)!;
  const picture = shelfTextures()[content(lang).services.indexOf(s)]?.find((src) => src && !/\.(mp4|webm|mov)$/i.test(src));
  return card({ kicker: `${s.code} · ${s.number} ${s.unit}`, title: s.name, sub: s.hook, image: await photo(picture), color: s.color });
}

// Cards for the main pages: the page name, its headline and one line.
const headline = (lang: Lang) => {
  const t = ui[lang];
  const c = content(lang);
  return {
    about: { title: c.identity.name, sub: c.about.intro, image: resolveSlot(aboutPortrait).src },
    contact: { title: c.contact.heading[0], sub: c.contact.sub },
    services: { title: `${t.servicesPage.line1} ${t.servicesPage.line2}`, sub: pageCopy[lang].services.description },
    caseStudies: { title: `${t.casesPage.word1} ${t.casesPage.word2}`, sub: t.casesPage.body, image: resolveSlot(caseCovers.trenddeck).src },
    resume: { title: c.identity.name, sub: `${c.identity.role} · ${t.resumePage.country}` },
  };
};

export type PageKey = "about" | "contact" | "services" | "caseStudies" | "resume";

export async function pageCard(lang: Lang, key: PageKey) {
  const h = headline(lang)[key] as { title: string; sub: string; image?: string };
  return card({ kicker: ui[lang].pages[key], title: h.title, sub: h.sub, image: await photo(h.image) });
}

export const pageAlt = (lang: Lang, key: PageKey | "home") => pageCopy[lang][key].title;
