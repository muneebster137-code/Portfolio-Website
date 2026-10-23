"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { keyNumbers, story } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

// The paper the hero's bone swatch turns into: the origin story, read word by word, then the numbers.
export function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.from(".st-head-line", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".st-head", start: "top 80%" },
      });

      splits = gsap.utils.toArray<HTMLElement>(".st-para").map((p) => {
        const split = new SplitText(p, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 45%", scrub: true } }
        );
        return split;
      });

      gsap.fromTo(
        ".st-pencil path",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".st-body", start: "top 80%", end: "bottom 60%", scrub: true } }
      );

      gsap.utils.toArray<HTMLElement>(".st-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    }, root);
    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="story" data-chapter="Story" className="relative bg-bone text-void overflow-hidden" aria-labelledby="story-h">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-28 md:pt-36 pb-24">
        <div className="flex justify-between label text-void/60">
          <span>02 / My story</span>
          <span className="hidden md:inline">Founder and Creative Specialist</span>
        </div>

        <h2 id="story-h" className="st-head mt-10 uppercase leading-[0.84]">
          <span className="block overflow-hidden"><span className="st-head-line block type-x text-[15vw] md:text-[10.4vw]">Imagination</span></span>
          <span className="flex flex-wrap items-baseline gap-x-[2vw]">
            <span className="block overflow-hidden"><span className="st-head-line block type-c font-light text-[15vw] md:text-[10.4vw] text-void/45">first.</span></span>
            <span className="block overflow-hidden"><span className="st-head-line block type-c font-extrabold text-[15vw] md:text-[10.4vw]">Strategy</span></span>
          </span>
          <span className="block overflow-hidden"><span className="st-head-line block type-x text-[15vw] md:text-[10.4vw]">always<span className="text-signal">.</span></span></span>
        </h2>

        <div className="st-body relative mt-24 md:mt-32 grid gap-14 md:grid-cols-12">
          <svg className="st-pencil absolute -left-6 top-0 h-full w-[60%] pointer-events-none hidden md:block" viewBox="0 0 600 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M20 10 C 140 120, 40 240, 220 300 S 520 360, 420 520 S 120 640, 300 790" stroke="#3F6FE8" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" />
          </svg>
          {story.map((para, i) => (
            <p
              key={i}
              className={`st-para relative font-display font-normal [font-stretch:88%] text-[26px] md:text-[clamp(28px,2.6vw,44px)] leading-[1.15] tracking-[-0.015em] md:col-span-7 ${i % 2 ? "md:col-start-6" : "md:col-start-1"}`}
            >
              {para}
            </p>
          ))}
        </div>

        <dl className="mt-28 md:mt-40 grid grid-cols-2 md:grid-cols-4 border-t border-void/15">
          {keyNumbers.map((k, i) => (
            <div key={k.label} className={`pt-6 pb-2 pr-4 ${i < 3 ? "md:border-r border-void/15" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} border-void/15 md:pl-6 first:pl-0`}>
              <dt className="label text-void/55">{String(i + 1).padStart(2, "0")} / {k.label}</dt>
              <dd className="type-x text-[18vw] md:text-[8vw] leading-[0.9] mt-4">
                <span className="st-num" data-value={k.value}>0</span>
                {k.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[520px] text-void/70">I&apos;m also the founder of Anebos Studios, where the promise is simple: standout creative in hours, not days.</p>
          <Link href="/about" className="inline-flex h-14 items-center rounded-full bg-void px-7 text-bone hover:bg-signal hover:text-void transition-colors">
            More about me
          </Link>
        </div>
      </div>
    </section>
  );
}
