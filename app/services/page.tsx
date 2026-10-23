import type { Metadata } from "next";
import { services } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { OpenFan } from "@/components/three/LazyScenes";
import { PreviewList } from "@/components/page/PreviewList";
import { CtaBand } from "@/components/page/CtaBand";

export const metadata: Metadata = {
  title: "Services | Muhammad Muneeb Bilal",
  description: "Seven creative services from one engine: social media, video, print, branding, websites, packaging and pitch decks.",
};

export default function ServicesPage() {
  return (
    <>
      <Reveal as="header" immediate className="relative min-h-svh overflow-hidden">
        <OpenFan className="absolute inset-0" />
        <div className="relative mx-auto max-w-[1600px] px-5 md:px-8 pt-32 pb-16 min-h-svh flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between label text-fog" data-fade>
            <span>Services / Overview</span>
            <span className="hidden md:inline">MMB 01-C to 07-C</span>
          </div>
          <h1 className="uppercase leading-[0.84] mt-10">
            <span className="block overflow-hidden"><span data-line className="block type-c font-light text-mist text-[14vw] md:text-[7.6vw]">Seven services.</span></span>
            <span className="block overflow-hidden"><span data-line className="block type-x text-[12vw] md:text-[7.6vw]">One creative</span></span>
            <span className="block overflow-hidden"><span data-line className="block type-x text-[12vw] md:text-[7.6vw]">engine<span className="text-signal">.</span></span></span>
          </h1>
          <p data-fade className="mt-10 max-w-[520px] text-[18px] md:text-[20px] leading-[1.5] text-mist font-light">
            Whatever the format, the process is the same: I understand the need, build on your vision, and deliver creative designed around how people actually pay attention.
          </p>
        </div>
      </Reveal>

      <section aria-label="All services" className="mx-auto max-w-[1600px] px-5 md:px-8 pb-10">
        <PreviewList
          items={services.map((s, i) => ({
            href: s.href,
            index: s.code,
            title: s.name,
            summary: s.hook,
            meta: `${s.number} ${s.unit}`,
            color: s.color,
            tags: [String(i + 1).padStart(2, "0") + " of 07"],
          }))}
        />
        <p className="label text-fog mt-6">&quot;4 featured decks&quot; counts what is shown, not total decks delivered.</p>
      </section>

      <Reveal as="section" className="mx-auto max-w-[1600px] px-5 md:px-8 py-28" aria-label="How every service works">
        <p className="label text-fog mb-8" data-fade>The same process, every format</p>
        <div className="grid md:grid-cols-3 gap-px bg-hair border border-hair rounded-[22px] overflow-hidden">
        {[
          ["01", "Listen", "I start with your need: what should this brand make people feel, remember and do?"],
          ["02", "Shape the vision", "I build on yours, or help you create one."],
          ["03", "Deliver", "Creative that stops the scroll, holds attention and gives people a clear next step."],
        ].map(([n, t, b]) => (
          <div key={n} data-rise className="bg-void p-8 md:p-10">
            <p className="type-x outline-type text-[90px] leading-none">{n}</p>
            <h2 className="type-m text-[34px] mt-8">{t}</h2>
            <p className="text-mist mt-3 leading-relaxed">{b}</p>
          </div>
        ))}
        </div>
      </Reveal>

      <CtaBand line="Have a vision?" />
    </>
  );
}
