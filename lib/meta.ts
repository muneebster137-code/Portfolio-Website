import type { Metadata } from "next";
import { alternates, type Lang } from "./i18n";

// Page titles and descriptions in both languages, and the metadata every page shares: hreflang links
// to its other-language twin and the right Open Graph locale.

const NAME = "Muhammad Muneeb Bilal";

export const pageCopy = {
  en: {
    home: { title: `${NAME} | Founder and Creative Specialist`, description: "Dreamt in pencil. Delivered in colour. Social media, video, print, branding, websites, packaging and pitch decks. 4+ years, 1,000+ creatives, 16+ brands." },
    about: { title: `About | ${NAME}`, description: "A founder and creative specialist who understands the client's need first and builds on their vision. The facts, the story and what clients say." },
    services: { title: `Services | ${NAME}`, description: "Seven creative services from one engine: social media, video, print, branding, websites, packaging and pitch decks." },
    caseStudies: { title: `Case Studies | ${NAME}`, description: "Eleven stories from a first internship to a five-unit education group, each from problem to result." },
    contact: { title: `Contact | ${NAME}`, description: `Have a vision? Start a project with ${NAME}.` },
    resume: { title: `Resume | ${NAME}`, description: `Experience, education, certifications and side projects of ${NAME}.` },
  },
  tr: {
    home: { title: `${NAME} | Kurucu ve Kreatif Uzman`, description: "Kurşun kalemle hayal edildi. Renkle teslim edildi. Sosyal medya, video, baskı, marka kimliği, web siteleri, ambalaj ve pitch deck'ler. 4+ yıl, 1.000+ kreatif, 16+ marka." },
    about: { title: `Hakkımda | ${NAME}`, description: "Önce müşterinin ihtiyacını anlayan ve vizyonunun üzerine inşa eden bir kurucu ve kreatif uzman. Gerçekler, hikâye ve müşterilerin söyledikleri." },
    services: { title: `Hizmetler | ${NAME}`, description: "Tek bir motordan yedi kreatif hizmet: sosyal medya, video, baskı, marka kimliği, web siteleri, ambalaj ve pitch deck'ler." },
    caseStudies: { title: `Vaka Çalışmaları | ${NAME}`, description: "İlk stajdan beş birimli bir eğitim grubuna on bir hikâye; her biri sorundan sonuca." },
    contact: { title: `İletişim | ${NAME}`, description: `Bir vizyonunuz mu var? ${NAME} ile bir proje başlatın.` },
    resume: { title: `Özgeçmiş | ${NAME}`, description: `${NAME}: deneyim, eğitim, sertifikalar ve yan projeler.` },
  },
} satisfies Record<Lang, Record<string, { title: string; description: string }>>;

export function pageMeta(lang: Lang, path: string, copy: { title: string; description: string }): Metadata {
  return {
    title: copy.title,
    description: copy.description,
    alternates: alternates(lang, path),
    openGraph: { title: copy.title, description: copy.description, locale: lang === "tr" ? "tr_TR" : "en_GB", alternateLocale: lang === "tr" ? "en_GB" : "tr_TR" },
    twitter: { title: copy.title, description: copy.description },
  };
}
