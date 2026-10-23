import Link from "next/link";
import type { Website } from "@/lib/services-content";
import { Reveal } from "@/components/motion/Reveal";

const statusColor: Record<Website["status"], string> = {
  Active: "#12B07F",
  Inactive: "#8E929B",
  "Client mockup": "#8E63FF",
};

// The seven selected websites. Each gets a browser frame for its 1440 × 3115 showcase image.
export function SiteShowcase({ sites }: { sites: Website[] }) {
  return (
    <section aria-labelledby="sites-h" className="mx-auto max-w-[1600px] px-5 md:px-8 py-24">
      <Reveal>
        <p className="label text-fog" data-fade>Selected websites · 7</p>
        <h2 id="sites-h" className="overflow-hidden mt-4"><span data-line className="block type-x text-[12vw] md:text-[6vw] leading-[0.88]">Selected websites</span></h2>
      </Reveal>
      <div className="mt-16 space-y-24">
        {sites.map((s, i) => (
          <Reveal key={s.name} as="article" className="grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-start">
            <div data-rise className={`[perspective:1600px] ${i % 2 ? "lg:order-2" : ""}`}>
              <div className={`rounded-[18px] border border-hair bg-carbon overflow-hidden ${i % 2 ? "lg:[transform:rotateY(-8deg)]" : "lg:[transform:rotateY(8deg)]"}`}>
                <div className="flex items-center gap-1.5 px-4 h-9 border-b border-hair">
                  <span className="size-2 rounded-full bg-bone/20" /><span className="size-2 rounded-full bg-bone/20" /><span className="size-2 rounded-full bg-bone/20" />
                  <span className="label text-fog ml-3 truncate">{s.name}</span>
                </div>
                <div className="relative h-[460px] grid place-items-center text-center [background:repeating-linear-gradient(135deg,transparent_0_14px,rgba(238,234,225,0.04)_14px_15px)]">
                  <span>
                    <span className="label text-fog block">To supply</span>
                    <span className="block text-sm text-mist mt-2">Showcase image, 1440 × 3115 px{s.status === "Client mockup" ? " (mockup)" : ""}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3" data-fade>
                <span className="label text-fog">{String(i + 1).padStart(2, "0")} / 07</span>
                <span className="label inline-flex items-center gap-2 rounded-full border border-bone/20 px-3 py-1.5">
                  <span className="size-2 rounded-full" style={{ background: statusColor[s.status] }} />
                  {s.status}
                </span>
              </div>
              <h3 className="overflow-hidden mt-5"><span data-line className="block type-x text-[9vw] md:text-[3.4vw] leading-[0.9]">{s.name}</span></h3>
              <dl className="mt-8 grid grid-cols-3 border-y border-hair" data-fade>
                <div className="py-4 pr-3 border-r border-hair"><dt className="label text-fog">Platform</dt><dd className="mt-2 text-[15px]">{s.platform}</dd></div>
                <div className="py-4 px-3 border-r border-hair"><dt className="label text-fog">Build</dt><dd className="mt-2 text-[15px]">{s.build}</dd></div>
                <div className="py-4 pl-3"><dt className="label text-fog">Year</dt><dd className="mt-2 text-[15px]">{s.year || "—"}</dd></div>
              </dl>
              <p className="mt-6 text-mist leading-relaxed text-[17px]" data-fade>{s.text}</p>
              <div className="mt-6" data-fade>
                {s.caseSlug ? (
                  <Link href={`/case-studies/${s.caseSlug}`} className="inline-flex h-12 items-center rounded-full border border-bone/25 px-5 hover:bg-bone hover:text-void transition-colors">View case study</Link>
                ) : s.status === "Active" ? (
                  <span className="label text-fog">Live link: to supply</span>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
