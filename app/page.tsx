import { DreamSequence } from "@/components/home/DreamSequence";
import { WorkSequence } from "@/components/home/WorkSequence";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { ServicesShowcase } from "@/components/service/ServicesShowcase";
import { CtaBand } from "@/components/page/CtaBand";
import { homeMedia } from "@/lib/media-manifest";
import { resolveSlot, shelfTextures } from "@/lib/media.server";

// One sheet of paper, one story: reality, the sketch, the turn, inside the dream, the engine, the kick.
export default function Home() {
  const sheetBack = resolveSlot(homeMedia.sheetBack).src;
  const dreamImages = Object.fromEntries(Object.entries(homeMedia.insideTheDream).map(([slug, slot]) => [slug, resolveSlot(slot).src]));
  return (
    <>
      <DreamSequence sheetBack={sheetBack} />
      <WorkSequence images={dreamImages} />
      <ServicesShowcase label="05 · The engine" textures={shelfTextures()} intro />
      <Process />
      <Proof />
      <CtaBand line="Have a vision?" />
    </>
  );
}
