import { Hero } from "@/components/home/Hero";
import { SpatialMarquee, type MarqueeItem } from "@/components/home/SpatialMarquee";
import { DreamSequence } from "@/components/home/DreamSequence";
import { WorkSequence } from "@/components/home/WorkSequence";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { ServicesShowcase } from "@/components/service/ServicesShowcase";
import { CtaBand } from "@/components/page/CtaBand";
import type { Lang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { ui } from "@/lib/ui";
import { aboutPortrait, caseCovers, homeMedia } from "@/lib/media-manifest";
import { resolveSlot, shelfTextures } from "@/lib/media.server";

// Muneeb in the dream, the work in orbit, then one sheet of paper, one story: reality, the sketch,
// the turn, inside the dream, the engine, the kick.
export function HomePage({ lang }: { lang: Lang }) {
  const sheetBack = resolveSlot(homeMedia.sheetBack).src;
  const dreamImages = Object.fromEntries(Object.entries(homeMedia.insideTheDream).map(([slug, slot]) => [slug, resolveSlot(slot).src]));
  // A dedicated hero portrait is shown as a cut-out; otherwise the About portrait floats as a card.
  const heroPortrait = resolveSlot(homeMedia.portrait).src;
  const portrait = heroPortrait ?? resolveSlot(aboutPortrait).src;
  const work: MarqueeItem[] = content(lang).cases.flatMap((c) => {
    const src = resolveSlot(caseCovers[c.slug]).src;
    return src ? [{ slug: c.slug, title: c.title, year: c.year, src }] : [];
  });
  return (
    <>
      <Hero portrait={portrait} cutout={!!heroPortrait} tiles={work.map((w) => w.src)} />
      <SpatialMarquee items={work} />
      <DreamSequence sheetBack={sheetBack} />
      <WorkSequence images={dreamImages} />
      <ServicesShowcase label={ui[lang].dream.engine} textures={shelfTextures()} intro />
      <Process lang={lang} />
      <Proof lang={lang} />
      <CtaBand />
    </>
  );
}
