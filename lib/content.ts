// All site copy in one place, per language. English is the source; Turkish lays its text (lib/tr/*)
// over the English data, so slugs, colours, numbers and links are shared and can't drift apart.
import type { Lang } from "./i18n";
import * as en from "./site";
import * as enProfile from "./profile";
import { cases as enCases, type CaseStudy } from "./cases";
import { servicePages as enPages, type ServicePage } from "./services-content";
import * as tr from "./tr/site";
import * as trProfile from "./tr/profile";
import { cases as trCases } from "./tr/cases";
import { pages as trPages } from "./tr/services-content";

const quote = <T extends { name: string; quote: string; title: string; source: string }>(t: T): T => ({ ...t, ...tr.quotes[t.name] });

function build(lang: Lang) {
  if (lang === "en") {
    return {
      lang,
      identity: en.identity,
      navLinks: en.navLinks,
      services: en.services,
      keyNumbers: en.keyNumbers,
      featuredWork: en.featuredWork,
      processSteps: en.processSteps,
      testimonials: en.testimonials,
      story: en.story,
      cases: enCases,
      servicePages: enPages,
      about: enProfile.about,
      education: enProfile.education,
      allTestimonials: enProfile.allTestimonials,
      resumeSummary: enProfile.resumeSummary,
      resumeNumbers: enProfile.resumeNumbers,
      experience: enProfile.experience,
      skills: enProfile.skills,
      sideProjects: enProfile.sideProjects,
      certifications: enProfile.certifications,
      featuredCerts: enProfile.featuredCerts,
      contact: enProfile.contact,
    };
  }

  const services = en.services.map((s) => ({ ...s, ...tr.services[en.serviceSlug(s)] }));
  const cases: CaseStudy[] = enCases.map((c) => ({ ...c, ...trCases[c.slug], metaTitle: `${c.title} Vaka Çalışması | ${en.identity.name}` }));
  const servicePages: ServicePage[] = enPages.map((p) => {
    const t = trPages[p.slug];
    const name = tr.services[p.slug]?.name ?? p.slug;
    return {
      ...p,
      keyLine: t.keyLine,
      intro: t.intro,
      hookVideo: p.hookVideo && t.hookLine ? { line: t.hookLine } : p.hookVideo,
      segments: p.segments.map((g) => ({ ...g, ...t.segments?.[g.id] })),
      websites: p.websites?.map((w) => ({ ...w, ...t.websites?.[w.slug] })),
      closing: t.closing,
      metaTitle: `${name} | ${en.identity.name}`,
      metaDescription: t.metaDescription,
    };
  });
  const month = (d: string) => d.replace(/^[A-Z][a-z]{2}/, (m) => trProfile.months[m] ?? m);
  const certifications = enProfile.certifications.map((c) => ({ ...c, issued: month(c.issued) }));
  return {
    lang,
    identity: { ...en.identity, ...tr.identity },
    navLinks: en.navLinks.map((l) => ({ ...l, label: tr.navLabels[l.href] ?? l.label })),
    services,
    keyNumbers: en.keyNumbers.map((k, i) => ({ ...k, label: tr.keyNumberLabels[i] })),
    featuredWork: en.featuredWork.map((w) => ({ ...w, ...tr.featuredWork[w.slug] })),
    processSteps: en.processSteps.map((s, i) => ({ ...s, ...tr.processSteps[i] })),
    testimonials: en.testimonials.map(quote),
    story: tr.story,
    cases,
    servicePages,
    about: trProfile.about,
    education: trProfile.education,
    allTestimonials: enProfile.allTestimonials.map(quote),
    resumeSummary: trProfile.resumeSummary,
    resumeNumbers: trProfile.resumeNumbers,
    experience: enProfile.experience.map((e, i) => ({ ...e, ...trProfile.experience[i] })),
    skills: trProfile.skills,
    sideProjects: enProfile.sideProjects.map((p, i) => ({ ...p, ...trProfile.sideProjects[i] })),
    certifications,
    featuredCerts: enProfile.featuredCerts.map((f) => certifications.find((c) => c.n === f.n)!),
    contact: trProfile.contact,
  };
}

export type Content = ReturnType<typeof build>;
const cache: Partial<Record<Lang, Content>> = {};
export const content = (lang: Lang): Content => (cache[lang] ??= build(lang));

export const caseIn = (lang: Lang, slug: string) => content(lang).cases.find((c) => c.slug === slug);
export const serviceIn = (lang: Lang, slug: string) => content(lang).services.find((s) => en.serviceSlug(s) === slug);
export const servicePageIn = (lang: Lang, slug: string) => content(lang).servicePages.find((p) => p.slug === slug);
