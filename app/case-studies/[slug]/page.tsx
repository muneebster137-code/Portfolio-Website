import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cases, getCase, caseIndex, onColor } from "@/lib/cases";
import { serviceBySlug, testimonials } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { OpeningVisual } from "@/components/case/OpeningVisual";
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
  // Expanded caps run about 1.05em per letter; long single words shrink to fit the row.
  const titleVw = Math.min(13.5, 92 / first.length);

  return (
    <article style={{ ["--case" as string]: c.accent }}>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-8 pt-32">
        <div className="flex flex-wrap justify-between gap-3 label text-fog" data-fade>
          <span>
            <Link href="/case-studies" className="hover:text-bone">Case studies</Link> / {n} of 11
          </span>
          <span className="flex flex-wrap gap-2">
            {c.major && <span className="rounded-full bg-bone px-3 py-1.5 text-void">Major case study</span>}
            {c.via && <span className="rounded-full border border-bone/20 px-3 py-1.5">via Watch How Malaysia</span>}
            <span className="rounded-full border border-bone/20 px-3 py-1.5 flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: c.accent }} />{c.year}</span>
          </span>
        </div>
        <h1 className="uppercase leading-[0.82] mt-12">
          <span className="block overflow-hidden"><span data-line className="block type-x" style={{ fontSize: `${titleVw}vw` }}>{first}</span></span>
          <span className="flex flex-wrap items-end gap-x-[3vw] gap-y-4">
            {rest && <span className="block overflow-hidden"><span data-line className="block type-c font-light text-mist text-[15vw] md:text-[10vw]">{rest}</span></span>}
            <span data-fade className="max-w-[460px] font-sans normal-case text-[19px] md:text-[22px] leading-[1.4] text-bone/85 font-light pb-[1.6vw]">{c.summary}</span>
          </span>
        </h1>
      </Reveal>

      <section aria-label="Opening visual" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-16">
        <OpeningVisual src={c.cover || undefined} alt={`${c.title} opening visual`} accent={c.accent} video={c.opening === "video"} initials={c.shortTitle.slice(0, 2)} />
      </section>

      <Reveal as="section" aria-label="Snapshot" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-24">
        <dl className="grid md:grid-cols-[1.2fr_0.5fr_1.2fr_1.2fr] border border-hair rounded-[20px] overflow-hidden bg-carbon">
          {[
            ["Client", c.client],
            ["Year", c.year],
            ["Role", c.role],
            ["Services", c.services],
          ].map(([k, v], idx) => (
            <div key={k} data-rise className={`p-6 ${idx < 3 ? "border-b md:border-b-0 md:border-r border-hair" : ""}`}>
              <dt className="label text-fog">{k}</dt>
              <dd className={`mt-3 ${k === "Year" ? "type-x text-[36px] leading-none" : "text-[16px] leading-snug"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {c.intro && (
        <Reveal as="section" aria-label={c.intro.label} className="mx-auto max-w-[1600px] px-5 md:px-8 mt-32 grid md:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <p className="label text-fog" data-fade>{c.intro.label}</p>
          <p data-words className="font-display [font-stretch:88%] text-[28px] md:text-[clamp(32px,3.4vw,56px)] leading-[1.1] tracking-[-0.015em]">{c.intro.text}</p>
        </Reveal>
      )}

      {steps.length > 0 && (
        <section aria-labelledby="story-h" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-32">
          <Reveal>
            <h2 id="story-h" className="label text-fog" data-fade>The story · problem to result</h2>
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
        <Reveal as="section" aria-label="What I did" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-32 grid md:grid-cols-[260px_minmax(0,1fr)] gap-8">
          <p className="label text-fog" data-fade>What I did</p>
          <p data-words className="font-display [font-stretch:88%] text-[28px] md:text-[clamp(32px,3.4vw,56px)] leading-[1.1] tracking-[-0.015em]">{c.did}</p>
        </Reveal>
      )}

      {c.optionalLine && (
        <Reveal as="figure" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-36">
          <blockquote data-words className="font-display font-light [font-stretch:80%] text-[34px] md:text-[clamp(40px,5vw,84px)] leading-[1.02] tracking-[-0.02em] max-w-[1300px]">{c.optionalLine}</blockquote>
        </Reveal>
      )}

      {c.units && (
        <section aria-labelledby="units-h" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-32">
          <Reveal>
            <p className="label text-fog" data-fade>Five units, five voices</p>
            <h2 id="units-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[11vw] md:text-[5vw] leading-[0.9]">The units</span></h2>
          </Reveal>
          <Reveal className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {c.units.map((u, ui) => (
              <TiltCard key={u.name} className="h-full">
                <div data-rise className="h-full min-h-[240px] rounded-[20px] border border-hair bg-carbon p-6 flex flex-col justify-between">
                  <span className="label text-fog">{String(ui + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="type-m block text-[28px] leading-none">{u.name}</span>
                    <span className="block text-mist mt-3 text-[15px] leading-snug">{u.text}</span>
                  </span>
                </div>
              </TiltCard>
            ))}
          </Reveal>
        </section>
      )}

      <section aria-labelledby="work-h" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-h" className="overflow-hidden"><span data-line className="block type-x text-[13vw] md:text-[6vw] leading-[0.88]">The work</span></h2>
          <p className="label text-fog" data-fade>{c.workLabel}</p>
        </Reveal>
        <Reveal className={`mt-12 grid gap-6 md:gap-8 ${c.work.every((m) => m.ratio === "tall") ? "grid-cols-2 md:grid-cols-4" : c.work.every((m) => m.ratio === "square") ? "sm:grid-cols-3" : "md:grid-cols-2"}`}>
          {c.work.map((m, mi) => (
            <div key={mi} data-rise className={mi % 2 && c.work.length > 2 ? "md:translate-y-16" : ""}>
              <MediaFrame media={m} plate={mi === 0 ? c.accent : undefined} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </Reveal>
      </section>

      {(c.website || c.notes || c.clients) && (
        <Reveal as="section" aria-label="Details" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-40 grid md:grid-cols-2 gap-6">
          {c.website && (
            <div data-rise className="rounded-[20px] border border-hair bg-carbon p-7">
              <p className="label text-fog">Website</p>
              <p className="mt-4 text-[17px] leading-relaxed">{c.website}</p>
            </div>
          )}
          {c.notes?.map((note) => (
            <div key={note.label} data-rise className="rounded-[20px] border border-hair bg-carbon p-7">
              <p className="label text-fog">{note.label}</p>
              <p className="mt-4 text-[17px] leading-relaxed">{note.text}</p>
            </div>
          ))}
          {c.clients && (
            <div data-rise className="rounded-[20px] border border-hair bg-carbon p-7 md:col-span-2">
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
        <Reveal as="figure" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-40 relative">
          <span className="type-x absolute -top-10 left-3 md:left-6 text-[160px] md:text-[220px] leading-none" style={{ color: c.accent }} aria-hidden="true">“</span>
          <blockquote data-words className="relative pt-20 font-display font-light [font-stretch:85%] text-[30px] md:text-[clamp(36px,4.2vw,68px)] leading-[1.05] tracking-[-0.02em] max-w-[1250px]">{quote.quote}</blockquote>
          <figcaption className="label text-fog mt-8" data-fade>{quote.name} · {quote.title} · {quote.source}</figcaption>
        </Reveal>
      )}

      <Reveal as="section" aria-label="Related" className="mx-auto max-w-[1600px] px-5 md:px-8 mt-40 grid md:grid-cols-2 gap-6">
        <div data-rise className="rounded-[20px] border border-hair p-7">
          <p className="label text-fog">Related services</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.relatedServices.map(serviceBySlug).filter((s) => s !== undefined).map((s) => (
              <Link key={s.code} href={s.href} className="inline-flex h-12 items-center gap-2.5 rounded-full border border-bone/20 px-4 hover:border-bone transition-colors">
                <span className="size-3 rounded-[3px]" style={{ background: s.color }} />
                {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div data-rise className="rounded-[20px] border border-hair p-7">
          <p className="label text-fog">Related cases</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.relatedCases.map(getCase).filter((x) => x !== undefined).map((x) => (
              <Link key={x.slug} href={`/case-studies/${x.slug}`} className="inline-flex h-12 items-center gap-2.5 rounded-full border border-bone/20 px-4 hover:border-bone transition-colors">
                <span className="size-2.5 rotate-45" style={{ background: x.accent }} />
                {x.title}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Link href={`/case-studies/${next.slug}`} className="group block mt-32 border-y border-hair">
        <span className="mx-auto max-w-[1600px] px-5 md:px-8 py-14 md:py-20 flex flex-wrap items-end justify-between gap-6">
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
