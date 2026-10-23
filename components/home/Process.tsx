import { processSteps } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/page/SectionHead";

// A quiet interlude: three lines, one motion each.
export function Process() {
  return (
    <section id="process" data-chapter="Process" className="relative bg-void" aria-labelledby="process-h">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-36 md:py-48">
        <Reveal>
          <SectionHead id="process-h" label="Process" title="How I work" />
        </Reveal>
        <ol className="mt-16 space-y-20 md:space-y-28">
          {processSteps.map((s) => (
            <Reveal as="li" key={s.n} className="grid md:grid-cols-[120px_minmax(0,1fr)_minmax(0,380px)] gap-4 md:gap-10 items-end">
              <span className="label text-fog" data-fade>{s.n}</span>
              <h3 className="overflow-hidden"><span data-line className="block type-x text-[13vw] md:text-[clamp(56px,7.6vw,132px)] leading-[0.95]">{s.title}.</span></h3>
              <p className="text-mist text-[17px] leading-[1.6] md:pb-4" data-fade>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
