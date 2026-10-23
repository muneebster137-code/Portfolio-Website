import { DreamSequence } from "@/components/home/DreamSequence";
import { WorkSequence } from "@/components/home/WorkSequence";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { ServicesShowcase } from "@/components/service/ServicesShowcase";
import { CtaBand } from "@/components/page/CtaBand";

// One sheet of paper, one story: reality, the sketch, the fold, inside the dream, the engine, the kick.
export default function Home() {
  return (
    <>
      <DreamSequence />
      <WorkSequence />
      <ServicesShowcase label="05 · The engine" />
      <Process />
      <Proof />
      <CtaBand line="Have a vision?" />
    </>
  );
}
