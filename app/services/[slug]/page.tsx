import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, serviceBySlug } from "@/lib/site";
import { getServicePage, servicePages } from "@/lib/services-content";
import { getCase, onColor } from "@/lib/cases";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceObject, PackagingModel } from "@/components/three/LazyScenes";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CaseCard } from "@/components/page/CaseCard";
import { CtaBand } from "@/components/page/CtaBand";
import { SegmentRail } from "@/components/service/SegmentRail";
import { SiteShowcase } from "@/components/service/SiteShowcase";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  return page ? { title: page.metaTitle, description: page.metaDescription } : {};
}

const spanFor = (ratio: string | undefined, allSquare: boolean) =>
  allSquare ? "" : ratio === "tall" ? "col-span-1" : "col-span-2";

export default async function ServiceDetail({ params }: Params) {
  const { slug } = await params;
  const page = getServicePage(slug);
  const s = serviceBySlug(slug);
  if (!page || !s) notFound();

  const i = services.indexOf(s);
  const next = services[(i + 1) % services.length];
  const tint = `color-mix(in srgb, ${s.color} 11%, #060708)`;
  const swatchText = s.color === "#EEEAE1" ? "#EEEAE1" : s.color;
  const related = page.relatedCases.map(getCase).filter((c) => c !== undefined);

  return (
    <>
      <Reveal as="header" immediate className="relative overflow-hidden" style={{ background: tint }}>
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-32 pb-20 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 min-h-svh items-end">
          <div className="relative z-10">
            <p className="label flex items-center gap-3" style={{ color: swatchText }} data-fade>
              <Link href="/services" className="text-fog hover:text-bone">Services</Link>
              <span className="text-fog">/</span>
              <span className="size-2.5 rounded-[3px]" style={{ background: s.color }} />
              {s.code} · {String(i + 1).padStart(2, "0")} of 07
            </p>
            <h1 className="overflow-hidden mt-8"><span data-line className="block type-x text-[13vw] md:text-[7.2vw] leading-[0.86]">{s.name}</span></h1>
            <p className="overflow-hidden mt-8"><span data-line className="block type-c font-light text-mist text-[9vw] md:text-[4.4vw] leading-[0.95]">{s.hook}</span></p>
            <div className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6" data-fade>
              <p className="type-x text-[18vw] md:text-[9vw] leading-[0.8]">{s.number}</p>
              <p className="label text-fog pb-2">{page.keyLine}</p>
            </div>
            <p className="mt-10 max-w-[620px] text-[18px] md:text-[20px] leading-[1.55] text-bone/80 font-light" data-fade>{page.intro}</p>
            {page.tools && (
              <ul className="mt-8 flex flex-wrap gap-2" data-fade aria-label="Tools">
                {page.tools.map((t) => <li key={t} className="label rounded-full border border-bone/20 px-3.5 py-2">{t}</li>)}
              </ul>
            )}
          </div>
          <ServiceObject index={i} className="relative h-[52vh] lg:h-[78vh]" />
        </div>
      </Reveal>

      {page.hookVideo && (
        <Reveal as="section" aria-label="Opening clip" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
          <div data-rise className="relative aspect-[16/9] rounded-[22px] border border-hair bg-carbon overflow-hidden grid place-items-center text-center">
            <span className="px-6">
              <span className="label text-fog block">Opening clip · 5 seconds · to supply</span>
              <span className="block text-mist mt-3 max-w-[460px]">A bullet is fired and hits a balloon. It slows right before impact as the camera fades in. No music, only action sound.</span>
            </span>
          </div>
          <p data-words className="mt-16 font-display font-light text-[30px] md:text-[clamp(36px,4.4vw,72px)] leading-[1.05] tracking-[-0.02em] max-w-[1300px]">{page.hookVideo.line}</p>
        </Reveal>
      )}

      {page.model3d && (
        <section aria-labelledby="model-h" className="mx-auto max-w-[1600px] px-5 md:px-10 pt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-fog" data-fade>Segment 00 · 3D models</p>
              <h2 id="model-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[11vw] md:text-[5vw] leading-[0.9]">Turn it in your hands</span></h2>
            </div>
            <p className="label text-fog" data-fade>Drag to rotate · placeholder until the model is supplied</p>
          </Reveal>
          <div className="mt-10 h-[70vh] rounded-[22px] border border-hair overflow-hidden" style={{ background: tint }}>
            <PackagingModel className="size-full cursor-grab active:cursor-grabbing" />
          </div>
        </section>
      )}

      {page.segments.length > 0 && (
        <section aria-label="Segments" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-12">
          <SegmentRail names={page.segments.map((g) => g.name)} color={s.color} />
          <div className="space-y-32">
            {page.segments.map((g, gi) => {
              const shown = g.media.filter((m) => m.src);
              const pending = g.media.length - shown.length;
              const allSquare = shown.every((m) => m.ratio === "square");
              return (
                <Reveal key={g.name} as="article" id={`seg-${gi}`} aria-labelledby={`seg-h-${gi}`}>
                  <div className="flex flex-wrap items-end justify-between gap-6 border-t border-hair pt-8">
                    <div className="max-w-[760px]">
                      <p className="label text-fog" data-fade>
                        Segment {String(gi + 1).padStart(2, "0")}
                        {g.count ? ` · ${g.count} ${g.count === "1" ? "piece" : "pieces"}` : ""}
                      </p>
                      <h2 id={`seg-h-${gi}`} className="overflow-hidden mt-4"><span data-line className="block type-m text-[10vw] md:text-[4.2vw] leading-[0.92]">{g.name}</span></h2>
                      <p className="mt-4 text-[18px] text-mist leading-relaxed" data-fade>{g.text}</p>
                    </div>
                    {g.caseSlug && (
                      <Link data-fade href={`/case-studies/${g.caseSlug}`} className="text-[15px] underline decoration-bone/25 underline-offset-4 hover:decoration-bone">View case study</Link>
                    )}
                  </div>
                  {shown.length > 0 && (
                    <div className={`mt-10 grid gap-5 md:gap-6 ${allSquare ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
                      {shown.map((m, mi) => (
                        <div key={mi} data-rise className={spanFor(m.ratio, allSquare)}>
                          <MediaFrame media={m} sizes="(min-width: 768px) 40vw, 100vw" />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Work not supplied yet: one quiet line instead of rows of empty frames. */}
                  {pending > 0 && (
                    <p className="mt-6 label text-fog" data-fade>
                      {shown.length ? `${pending} more to come` : `${pending} ${pending === 1 ? "piece" : "pieces"} to come`}
                    </p>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {page.websites && <SiteShowcase sites={page.websites} />}

      {page.brands && (
        <section aria-labelledby="brands-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
          <Reveal>
            <p className="label text-fog" data-fade>A curated selection · 6 brands</p>
            <h2 id="brands-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[12vw] md:text-[6vw] leading-[0.88]">Brands built</span></h2>
          </Reveal>
          <Reveal className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
            {page.brands.map((b) => {
              return (
                <article key={b.name} data-rise className="flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-carbon">
                    {b.image ? (
                      <Image src={b.image} alt={`${b.name} brand work`} fill sizes="(min-width: 1280px) 33vw, 50vw" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center label text-fog">Brand work to come</span>
                    )}
                  </div>
                  <h3 className="type-m text-[26px] leading-none mt-5">{b.name}</h3>
                  <p className="text-mist text-[15px] mt-2">Logo, colour palette, guidelines and brand assets.</p>
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                    <Link href={`/case-studies/${b.caseSlug}`} className="underline decoration-bone/25 underline-offset-4 hover:decoration-bone">Case study</Link>
                    {b.guidelinesPdf && (
                      <a href={b.guidelinesPdf} target="_blank" rel="noreferrer" className="underline decoration-bone/25 underline-offset-4 hover:decoration-bone">Brand guidelines (PDF)</a>
                    )}
                  </p>
                </article>
              );
            })}
          </Reveal>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="rel-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
          <Reveal>
            <p className="label text-fog" data-fade>Related case studies</p>
            <h2 id="rel-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[11vw] md:text-[5vw] leading-[0.9]">See it in the work</span></h2>
          </Reveal>
          <Reveal className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {related.slice(0, 3).map((c) => <CaseCard key={c.slug} c={c} />)}
          </Reveal>
        </section>
      )}

      <CtaBand line={page.closing} service={slug} />

      <Link href={next.href} className="group relative block overflow-hidden" style={{ background: next.color, color: onColor(next.color) }}>
        <span className="relative mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24 flex flex-wrap items-end justify-between gap-6">
          <span>
            <span className="label block opacity-70">Next service · {next.code}</span>
            <span className="type-x block text-[12vw] md:text-[7vw] leading-[0.86] mt-4">{next.name}</span>
          </span>
          <svg className="transition-transform duration-500 group-hover:rotate-45" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </span>
      </Link>
    </>
  );
}
