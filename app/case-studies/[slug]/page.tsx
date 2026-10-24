import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase, caseIndex, onColor } from "@/lib/cases";
import { serviceBySlug, testimonials } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/page/SectionHead";
import { CaseGallery } from "@/components/case/CaseGallery";
import { caseCovers, caseGalleries } from "@/lib/media-manifest";
import { resolveAll, resolveSlot } from "@/lib/media.server";
import { OpeningVisual } from "@/components/case/OpeningVisual";
import { DreamLevels } from "@/components/fx/DreamLevels";
import { CtaBand } from "@/components/page/CtaBand";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCase((await params).slug);
  return c ? { title: c.metaTitle, description: c.metaDescription } : {};
}

const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
);

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const i = caseIndex(slug);
  const n = String(i + 1).padStart(2, "0");
  const next = cases[(i + 1) % cases.length];
  const ink = onColor(c.accent);
  const quote = c.testimonial ? testimonials.find((t) => t.name === c.testimonial) : undefined;
  const words = c.title.split(" ");
  const [first, rest] = [words[0], words.slice(1).join(" ")];
  const steps = c.steps ?? [];
  const gallery = resolveAll(caseGalleries[c.slug]);
  const cover = resolveSlot(caseCovers[c.slug]);
  // Expanded caps run about 1.05em per letter; long single words shrink to fit the row.
  const titleVw = Math.min(13.5, 92 / first.length);

  return (
    <article style={{ ["--case" as string]: c.accent }}>
      <DreamLevels />
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-32">
        <div className="flex flex-wrap justify-between gap-3 label text-fog" data-fade>
          <span>
            <Link href="/case-studies" className="hover:text-bone">Case studies</Link> / {n} of 11
          </span>
          <span>{[c.major && "Major case study", c.via && "via Watch How Malaysia", c.year].filter(Boolean).join(" · ")}</span>
        </div>
        <h1 className="leading-[0.82] mt-12">
          <span className="block overflow-hidden"><span data-line data-ink className="block type-x" style={{ fontSize: `${titleVw}vw` }}>{first}</span></span>
          <span className="flex flex-wrap items-end gap-x-[3vw] gap-y-4">
            {rest && <span className="block overflow-hidden"><span data-line data-ink className="block type-c font-light text-mist text-[15vw] md:text-[10vw]">{rest}</span></span>}
            <span data-fade className="max-w-[460px] font-sans normal-case text-[19px] md:text-[22px] leading-[1.4] text-bone/85 font-light pb-[1.6vw]">{c.summary}</span>
          </span>
        </h1>
      </Reveal>

      <section aria-label="Opening visual" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-16">
        <OpeningVisual src={cover.src} alt={`${c.title} opening visual`} accent={c.accent} video={c.opening === "video"} initials={c.shortTitle.slice(0, 2)} />
      </section>

      <Reveal as="section" aria-label="Snapshot" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-24">
        <dl className="grid md:grid-cols-[1.2fr_0.5fr_1.2fr_1.2fr] gap-x-8 border-t border-hair">
          {[
            ["Client", c.client],
            ["Year", c.year],
            ["Role", c.role],
            ["Services", c.services],
          ].map(([k, v], idx) => (
            <div key={k} data-rise className={`pt-6 pb-2 ${idx < 3 ? "border-b md:border-b-0 border-hair pb-6 md:pb-2" : ""}`}>
              <dt className="label text-fog">{k}</dt>
              <dd className="mt-3 text-[16px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {c.intro && (
        <Reveal as="section" aria-label={c.intro.label} className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32 grid md:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <p className="label text-fog" data-fade>{c.intro.label}</p>
          <p data-words className="font-display text-[28px] md:text-[clamp(32px,3.4vw,56px)] leading-[1.1] tracking-[-0.015em]">{c.intro.text}</p>
        </Reveal>
      )}

      {steps.length > 0 && (
        <section aria-labelledby="story-h" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32">
          <Reveal>
            <SectionHead id="story-h" label="Problem to result" title="The story" />
          </Reveal>
          <div className="mt-8 border-t border-hair">
            {steps.map((st, si) => {
              const last = si === steps.length - 1;
              return (
                <Reveal
                  key={st.title}
                  className={`grid md:grid-cols-[200px_minmax(0,4fr)_minmax(0,7fr)] gap-6 md:gap-10 items-start ${last ? "rounded-[24px] px-6 md:px-10 py-10 md:py-12 -mx-1 md:-mx-10 mt-4" : "py-10 border-b border-hair"}`}
                  style={last ? { background: c.accent, color: ink } : undefined}
                >
                  <p className={`overflow-hidden type-x text-[22vw] md:text-[120px] leading-[0.8] ${last ? "" : "outline-type"}`}>
                    <span data-line className="block">{String(si + 1).padStart(2, "0")}</span>
                  </p>
                  <div>
                    <h3 className="overflow-hidden"><span data-line className="block type-m text-[9vw] md:text-[40px] leading-none">{st.title}</span></h3>
                    {last && c.stat && (
                      <div data-fade className="mt-6">
                        <p className="type-x text-[13vw] md:text-[64px] leading-[0.9]">{c.stat.value}</p>
                        <p className="label mt-2 opacity-75">{c.stat.label}</p>
                      </div>
                    )}
                  </div>
                  <p data-fade className={`text-[18px] md:text-[20px] leading-[1.55] font-light ${last ? "" : "text-bone/80"}`}>{st.body}</p>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {c.did && (
        <Reveal as="section" aria-label="What I did" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32 grid md:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <p className="label text-fog" data-fade>What I did</p>
          <p data-words className="font-display text-[28px] md:text-[clamp(32px,3.4vw,56px)] leading-[1.1] tracking-[-0.015em]">{c.did}</p>
        </Reveal>
      )}

      {c.optionalLine && (
        <Reveal as="figure" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-36">
          <blockquote data-words className="font-display font-light text-[34px] md:text-[clamp(40px,5vw,84px)] leading-[1.02] tracking-[-0.02em] max-w-[1300px]">{c.optionalLine}</blockquote>
        </Reveal>
      )}

      <section aria-labelledby="work-h" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-h" className="overflow-hidden"><span data-line className="block type-x text-[13vw] md:text-[6vw] leading-[0.88]">The work</span></h2>
          <p className="label text-fog" data-fade>{c.workLabel}</p>
        </Reveal>
        <Reveal className="mt-12">
          <CaseGallery gallery={gallery} unitText={Object.fromEntries((c.units ?? []).map((u) => [u.name, u.text]))} />
        </Reveal>
      </section>

      {(c.website || c.notes || c.clients) && (
        <Reveal as="section" aria-label="Details" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-40 grid md:grid-cols-2 gap-6">
          {c.website && (
            <div data-rise className="border-t border-hair pt-7">
              <p className="label text-fog">Website</p>
              <p className="mt-4 text-[17px] leading-relaxed">{c.website}</p>
              {c.liveUrl && (
                <a href={c.liveUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 text-[15px] underline decoration-bone/30 underline-offset-4 hover:decoration-bone">
                  Visit the live site
                </a>
              )}
            </div>
          )}
          {c.notes?.map((note) => (
            <div key={note.label} data-rise className="border-t border-hair pt-7">
              <p className="label text-fog">{note.label}</p>
              <p className="mt-4 text-[17px] leading-relaxed">{note.text}</p>
            </div>
          ))}
          {c.clients && (
            <div data-rise className="border-t border-hair pt-7 md:col-span-2">
              <p className="label text-fog">Clients the studio won</p>
              {c.clients.map((cl) =>
                cl.slug ? (
                  <Link key={cl.name} href={`/case-studies/${cl.slug}`} className="group flex flex-wrap justify-between items-center gap-4 py-5 border-b border-hair">
                    <span className="type-x text-[30px]">{cl.name}</span>
                    <span className="text-mist group-hover:text-bone flex items-center gap-2">{cl.text} <Arrow /></span>
                  </Link>
                ) : (
                  <div key={cl.name} className="flex flex-wrap justify-between items-center gap-4 pt-5">
                    <span className="type-x text-[30px]">{cl.name}</span>
                    <span className="text-mist">{cl.text}</span>
                  </div>
                )
              )}
            </div>
          )}
        </Reveal>
      )}

      {quote && (
        <Reveal as="figure" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-40 relative">
          <span className="type-x absolute -top-10 left-3 md:left-6 text-[160px] md:text-[220px] leading-none" style={{ color: c.accent }} aria-hidden="true">“</span>
          <blockquote data-words className="relative pt-20 font-display font-light text-[30px] md:text-[clamp(36px,4.2vw,68px)] leading-[1.05] tracking-[-0.02em] max-w-[1250px]">{quote.quote}</blockquote>
          <figcaption className="label text-fog mt-8" data-fade>{quote.name} · {quote.title} · {quote.source}</figcaption>
        </Reveal>
      )}

      <Reveal as="section" aria-label="Related" className="mx-auto max-w-[1600px] px-5 md:px-10 mt-40 grid md:grid-cols-2 gap-6">
        <div data-rise className="border-t border-hair pt-7">
          <p className="label text-fog">Related services</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {c.relatedServices.map(serviceBySlug).filter((s) => s !== undefined).map((s) => (
              <Link key={s.code} href={s.href} className="text-[17px] underline decoration-bone/25 underline-offset-4 hover:decoration-bone">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div data-rise className="border-t border-hair pt-7">
          <p className="label text-fog">Related cases</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {c.relatedCases.map(getCase).filter((x) => x !== undefined).map((x) => (
              <Link key={x.slug} href={`/case-studies/${x.slug}`} className="text-[17px] underline decoration-bone/25 underline-offset-4 hover:decoration-bone">
                {x.title}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Link href={`/case-studies/${next.slug}`} className="group block mt-32 border-y border-hair">
        <span className="mx-auto max-w-[1600px] px-5 md:px-10 py-14 md:py-20 flex flex-wrap items-end justify-between gap-6">
          <span>
            <span className="label text-fog block">Next case · {String(caseIndex(next.slug) + 1).padStart(2, "0")} · {next.year}</span>
            <span className="type-x block text-[13vw] md:text-[8vw] leading-[0.84] mt-4 transition-colors duration-500 group-hover:text-[var(--next)]" style={{ ["--next" as string]: next.accent }}>{next.title}</span>
          </span>
          <span className="transition-transform duration-500 group-hover:rotate-45"><Arrow size={72} /></span>
        </span>
      </Link>

      <CtaBand line="Have a vision?" />
    </article>
  );
}
