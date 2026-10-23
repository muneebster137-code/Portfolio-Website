import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";
import { caseIndex } from "@/lib/cases";
import { caseCovers } from "@/lib/media-manifest";
import { resolveSlot } from "@/lib/media.server";
import { SketchHover } from "@/components/fx/SketchHover";
import { TiltSheen } from "@/components/fx/TiltSheen";

export function CaseCard({ c, tall = false }: { c: CaseStudy; tall?: boolean }) {
  const n = String(caseIndex(c.slug) + 1).padStart(2, "0");
  const cover = resolveSlot(caseCovers[c.slug]).src;
  return (
    <Link href={`/case-studies/${c.slug}`} className={`group relative block ${tall ? "h-[560px]" : "h-[440px]"}`} data-rise>
      <span className="absolute inset-0 rounded-[22px] overflow-hidden border border-hair bg-carbon">
        {cover ? (
          <>
            <Image src={cover} alt={`${c.title} key visual`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
            <SketchHover src={cover} className="transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
          </>
        ) : (
          <span className="absolute inset-0 grid place-items-center type-x text-[18vw] md:text-[7vw] opacity-90" style={{ color: c.accent }} aria-hidden="true">
            {c.shortTitle.slice(0, 2)}
          </span>
        )}
        {c.major && <span className="label absolute top-4 left-4 rounded-full bg-bone px-3 py-2 text-void">Major case study</span>}
        <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-void border border-hair p-5">
          <span className="label text-fog block">
            Case {n} · {c.year}
            {c.via ? " · via Watch How Malaysia" : ""}
          </span>
          <span className="type-x block text-[26px] leading-none mt-2">{c.title}</span>
          <span className="block text-mist mt-2 text-[15px] leading-snug">{c.summary}</span>
        </span>
      </span>
      <TiltSheen />
    </Link>
  );
}
