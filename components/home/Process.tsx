"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site";
import { processState } from "@/components/three/store";
import { useInViewport } from "@/components/three/useInViewport";

gsap.registerPlugin(ScrollTrigger);

const ProcessScene = dynamic(() => import("@/components/three/ProcessScene"), { ssr: false });

export function Process() {
  const wrap = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const active = useInViewport(wrap, "0px");

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        processState.progress = self.progress;
        setStep(self.progress < 0.33 ? 0 : self.progress < 0.69 ? 1 : 2);
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!copy.current) return;
    const tw = gsap.fromTo(copy.current.querySelectorAll(".pc-in"), { yPercent: 105, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.06, ease: "expo.out" });
    return () => {
      tw.kill();
    };
  }, [step]);

  const p = processSteps[step];

  return (
    <section ref={wrap} id="process" data-chapter="Process" className="relative h-[360vh] bg-void" aria-labelledby="process-h">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <ProcessScene active={active} />
        </div>
        <div className="relative h-full mx-auto max-w-[1600px] px-5 md:px-8 pt-24 pb-16 flex flex-col justify-between pointer-events-none">
          <div>
            <p className="label text-fog">05 / Process</p>
            <h2 id="process-h" className="type-x text-[12vw] md:text-[5.4vw] leading-[0.86] mt-3">How I work</h2>
          </div>
          <div ref={copy} key={step} className="max-w-[520px]" aria-live="polite">
            <div className="overflow-hidden"><p className="pc-in type-x outline-type text-[28vw] md:text-[13vw] leading-[0.8]">{p.n}</p></div>
            <div className="overflow-hidden mt-4"><h3 className="pc-in type-m text-[10vw] md:text-[4.4vw] leading-none">{p.title}</h3></div>
            <div className="overflow-hidden mt-4"><p className="pc-in text-[18px] leading-[1.55] text-mist">{p.body}</p></div>
          </div>
          <ol className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3" aria-hidden="true">
            {processSteps.map((x, i) => (
              <li key={x.n} className={`size-2.5 rotate-45 border border-bone ${i === step ? "bg-bone" : ""}`} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
