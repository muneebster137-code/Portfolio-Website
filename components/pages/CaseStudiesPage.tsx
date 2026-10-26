import type { Lang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { ui } from "@/lib/ui";
import { caseCovers } from "@/lib/media-manifest";
import { resolveSlot } from "@/lib/media.server";
import { Reveal } from "@/components/motion/Reveal";
import { PreviewList } from "@/components/page/PreviewList";
import { CtaBand } from "@/components/page/CtaBand";

export function CaseStudiesPage({ lang }: { lang: Lang }) {
  const { cases } = content(lang);
  const t = ui[lang];
  const p = t.casesPage;
  return (
    <>
      <Reveal as="header" immediate className="relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-32 pb-16">
          <div className="flex justify-between label text-fog" data-fade>
            <span>{p.crumb}</span>
            <span>{p.count}</span>
          </div>
          <h1 className="leading-[0.82] mt-12">
            <span className="block overflow-hidden"><span data-line data-ink className="block type-x text-[19vw] md:text-[15vw]">{p.word1}</span></span>
            <span className="flex flex-wrap items-end gap-x-[3vw] gap-y-4">
              <span className="block overflow-hidden"><span data-line data-ink className="block type-c font-light text-mist text-[19vw] md:text-[15vw]">{p.word2}</span></span>
              <span data-fade className="max-w-[440px] font-sans normal-case text-[18px] md:text-[20px] leading-[1.5] text-bone/80 font-light pb-[2vw]">
                {p.body}
              </span>
            </span>
          </h1>
        </div>
      </Reveal>

      <section aria-label={p.all} className="mx-auto max-w-[1600px] px-5 md:px-8 pb-24">
        <PreviewList
          items={cases.map((c, i) => ({
            href: `/case-studies/${c.slug}`,
            index: String(i + 1).padStart(2, "0"),
            title: c.title,
            summary: c.summary,
            meta: c.year,
            color: c.accent,
            image: resolveSlot(caseCovers[c.slug]).src,
            tags: [...(c.major ? [t.common.majorCase] : []), ...(c.via ? [t.dream.via] : [])],
          }))}
        />
      </section>

      <CtaBand />
    </>
  );
}
