import type { Metadata } from "next";
import { services } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { PreviewList } from "@/components/page/PreviewList";
import { CtaBand } from "@/components/page/CtaBand";
import { ServicesShowcase } from "@/components/service/ServicesShowcase";

export const metadata: Metadata = {
  title: "Services | Muhammad Muneeb Bilal",
  description: "Seven creative services from one engine: social media, video, print, branding, websites, packaging and pitch decks.",
};

export default function ServicesPage() {
  return (
    <>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-20">
        <p className="label text-fog" data-fade>Services</p>
        <h1 className="type-x mt-8 text-[13vw] md:text-[clamp(56px,7vw,124px)] leading-[0.92]">
          <span className="block overflow-hidden"><span data-line className="block">Seven services.</span></span>
          <span className="block overflow-hidden"><span data-line className="block text-mist">One creative engine.</span></span>
        </h1>
        <p data-fade className="mt-10 max-w-[520px] text-[18px] leading-[1.6] text-mist">
          Whatever the format, the process is the same: I understand the need, build on your vision, and deliver creative designed around how people actually pay attention.
        </p>
      </Reveal>

      <ServicesShowcase />

      <section aria-label="All services" className="mx-auto max-w-[1600px] px-5 md:px-10 pt-32 pb-10">
        <p className="label text-fog mb-8">Index</p>
        <PreviewList
          items={services.map((s) => ({
            href: s.href,
            index: s.code,
            title: s.name,
            summary: s.hook,
            meta: `${s.number} ${s.unit}`,
            color: s.color,
          }))}
        />
        <p className="label text-fog mt-6">&quot;4 featured decks&quot; counts what is shown, not total decks delivered.</p>
      </section>

      <CtaBand line="Have a vision?" />
    </>
  );
}
