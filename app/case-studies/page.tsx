import type { Metadata } from "next";
import { cases } from "@/lib/cases";
import { Reveal } from "@/components/motion/Reveal";
import { PreviewList } from "@/components/page/PreviewList";
import { CtaBand } from "@/components/page/CtaBand";

export const metadata: Metadata = {
  title: "Case Studies | Muhammad Muneeb Bilal",
  description: "Eleven stories from a first internship to a five-unit education group, each from problem to result.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Reveal as="header" immediate className="relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-32 pb-16">
          <div className="flex justify-between label text-fog" data-fade>
            <span>Case studies / Index</span>
            <span>11 stories · 2022 to 2026</span>
          </div>
          <h1 className="leading-[0.82] mt-12">
            <span className="block overflow-hidden"><span data-line className="block type-x text-[19vw] md:text-[15vw]">Case</span></span>
            <span className="flex flex-wrap items-end gap-x-[3vw] gap-y-4">
              <span className="block overflow-hidden"><span data-line className="block type-c font-light text-mist text-[19vw] md:text-[15vw]">studies</span></span>
              <span data-fade className="max-w-[440px] font-sans normal-case text-[18px] md:text-[20px] leading-[1.5] text-bone/80 font-light pb-[2vw]">
                Eleven stories, from a first internship to a five-unit education group. Each one starts with a problem and ends with a result.
              </span>
            </span>
          </h1>
        </div>
      </Reveal>

      <section aria-label="All case studies" className="mx-auto max-w-[1600px] px-5 md:px-8 pb-24">
        <PreviewList
          items={cases.map((c, i) => ({
            href: `/case-studies/${c.slug}`,
            index: String(i + 1).padStart(2, "0"),
            title: c.title,
            summary: c.summary,
            meta: c.year,
            color: c.accent,
            image: c.cover || undefined,
            tags: [...(c.major ? ["Major case study"] : []), ...(c.via ? ["via Watch How Malaysia"] : [])],
          }))}
        />
      </section>

      <CtaBand line="Have a vision?" />
    </>
  );
}
