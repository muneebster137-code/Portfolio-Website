import type { Lang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { ui } from "@/lib/ui";
import { Reveal } from "@/components/motion/Reveal";
import { PreviewList } from "@/components/page/PreviewList";
import { CtaBand } from "@/components/page/CtaBand";
import { ServicesShowcase } from "@/components/service/ServicesShowcase";
import { shelfTextures } from "@/lib/media.server";

export function ServicesPage({ lang }: { lang: Lang }) {
  const { services } = content(lang);
  const t = ui[lang];
  const p = t.servicesPage;
  return (
    <>
      <Reveal as="header" immediate className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-20">
        <p className="label text-fog" data-fade>{t.pages.services}</p>
        <h1 className="type-x mt-8 text-[13vw] md:text-[clamp(56px,7vw,124px)] leading-[0.92]">
          <span className="block overflow-hidden"><span data-line data-ink className="block">{p.line1}</span></span>
          <span className="block overflow-hidden"><span data-line data-ink className="block text-mist">{p.line2}</span></span>
        </h1>
        <p data-fade className="mt-10 max-w-[520px] text-[18px] leading-[1.6] text-mist">
          {p.body}
        </p>
      </Reveal>

      <ServicesShowcase textures={shelfTextures()} />

      <section aria-label={p.all} className="mx-auto max-w-[1600px] px-5 md:px-10 pt-32 pb-10">
        <p className="label text-fog mb-8">{p.index}</p>
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
        <p className="label text-fog mt-6">{p.decksNote}</p>
      </section>

      <CtaBand />
    </>
  );
}
