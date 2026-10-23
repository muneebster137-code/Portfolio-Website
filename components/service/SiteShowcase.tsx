import Image from "next/image";
import Link from "next/link";
import type { Website } from "@/lib/services-content";
import type { Resolved } from "@/lib/media.server";
import { Reveal } from "@/components/motion/Reveal";
import { Placeholder } from "@/components/ui/Slot";

const statusColor: Record<Website["status"], string> = {
  Active: "#12B07F",
  Inactive: "#8E929B",
  "Client mockup": "#8E63FF",
};

// The seven selected websites. Each full-page screenshot (1440 × 3115) scrolls inside its browser frame.
export function SiteShowcase({ sites }: { sites: (Website & { showcase: Resolved })[] }) {
  return (
    <section aria-labelledby="sites-h" className="mx-auto max-w-[1600px] px-5 md:px-10 py-24">
      <Reveal>
        <p className="label text-fog" data-fade>Selected websites · 7</p>
        <h2 id="sites-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[12vw] md:text-[6vw] leading-[0.88]">Selected websites</span></h2>
      </Reveal>
      <div className="mt-16 space-y-28">
        {sites.map((s, i) => (
          <Reveal key={s.slug} as="article" className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-start">
            <div data-rise className={i % 2 ? "lg:order-2" : ""}>
              <div className="rounded-[12px] ring-1 ring-hair bg-carbon overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 h-9 border-b border-hair">
                  <span className="size-2 rounded-full bg-bone/20" /><span className="size-2 rounded-full bg-bone/20" /><span className="size-2 rounded-full bg-bone/20" />
                  <span className="label text-fog ml-3 truncate">{s.url ? s.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : s.name}</span>
                </div>
                <div data-lenis-prevent tabIndex={0} aria-label={`${s.name}, full page. Scroll to see more.`} className="relative h-[520px] overflow-y-auto overscroll-contain [scrollbar-width:thin]">
                  {s.showcase.src ? (
                    <Image src={s.showcase.src} alt={`${s.name}, full page`} width={1440} height={3115} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-auto" />
                  ) : (
                    <div className="relative" style={{ aspectRatio: "1440 / 3115" }}>
                      <Placeholder slot={s.showcase} />
                    </div>
                  )}
                </div>
              </div>
              <p className="label text-fog mt-3">Scroll inside the frame</p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3" data-fade>
                <span className="label text-fog">{String(i + 1).padStart(2, "0")} / 07</span>
                <span className="label inline-flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: statusColor[s.status] }} />
                  {s.status}
                </span>
              </div>
              <h3 className="overflow-hidden mt-5"><span data-line className="block type-x text-[9vw] md:text-[3.4vw] leading-[0.95]">{s.name}</span></h3>
              <dl className="mt-8 grid grid-cols-3 border-y border-hair" data-fade>
                <div className="py-4 pr-3"><dt className="label text-fog">Platform</dt><dd className="mt-2 text-[15px]">{s.platform}</dd></div>
                <div className="py-4 px-3"><dt className="label text-fog">Build</dt><dd className="mt-2 text-[15px]">{s.build}</dd></div>
                <div className="py-4 pl-3"><dt className="label text-fog">Year</dt><dd className="mt-2 text-[15px]">{s.year || "—"}</dd></div>
              </dl>
              <p className="mt-6 text-mist leading-relaxed text-[17px]" data-fade>{s.text}</p>
              <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px]" data-fade>
                {s.url && (
                  <a href={s.url} target="_blank" rel="noreferrer" className="underline decoration-bone/30 underline-offset-4 hover:decoration-bone">Visit the live site</a>
                )}
                {s.caseSlug && (
                  <Link href={`/case-studies/${s.caseSlug}`} className="underline decoration-bone/30 underline-offset-4 hover:decoration-bone">View case study</Link>
                )}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
