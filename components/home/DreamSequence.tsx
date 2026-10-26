"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocalLink as Link, useContent, useUI } from "@/components/i18n";
import { SKETCHED, SKETCH_KEY, dreamState } from "@/components/three/store";
import { useInViewport } from "@/components/three/useInViewport";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { rustle } from "@/components/fx/sound";
import { StillIntro } from "./StillScenes";

gsap.registerPlugin(ScrollTrigger);

const PaperScene = dynamic(() => import("@/components/three/PaperScene"), { ssr: false });

// The story after the hero and the marquee, shots 01 to 03 in one pinned scene: a blank sheet
// (reality), the sketch (my story), and the fold that turns the page into the work. Captions are timed
// to the same scroll.
const SUB_START = 0.24;
const SUB_LEN = 0.065;

export function DreamSequence({ sheetBack }: { sheetBack?: string }) {
  const reduced = useReducedMotion();
  return reduced ? <StillIntro sheetBack={sheetBack} /> : <AnimatedIntro sheetBack={sheetBack} />;
}

function AnimatedIntro({ sheetBack }: { sheetBack?: string }) {
  const wrap = useRef<HTMLElement>(null);
  const active = useInViewport(wrap, "0px");
  const { keyNumbers, story } = useContent();
  const t = useUI().dream;
  // Once the visitor has drawn on the sheet, they can sign it and send it with their brief.
  const [sketched, setSketched] = useState(false);
  useEffect(() => {
    const on = () => setSketched(true);
    window.addEventListener(SKETCHED, on);
    return () => window.removeEventListener(SKETCHED, on);
  }, []);
  const keepSketch = () => {
    const png = dreamState.sketch?.();
    try {
      if (png) sessionStorage.setItem(SKETCH_KEY, png);
    } catch {}
  };

  useEffect(() => {

    // Which side of the page turn the reader is on, so the rustle plays once per turn, either way.
    let turned = false;
    const ctx = gsap.context(() => {
      // As the sheet comes into view: its first pencil stroke, then the words arrive.
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          if (dreamState.first < 1) gsap.to(dreamState, { first: 1, duration: 0.9, ease: "power2.inOut" });
        },
      });
      gsap.from(".ds-line", { yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: wrap.current, start: "top 60%" } });
      gsap.from(".ds-fade", { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: wrap.current, start: "top 55%" } });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        // The sheet reads the timeline's own (smoothed) progress, so captions and 3D move as one.
        onUpdate() {
          dreamState.progress = this.progress();
          if (this.progress() > 0.7 !== turned) {
            turned = !turned;
            rustle();
          }
        },
      });
      tl.set({}, {}, 1)
        .to(".ds-s1", { autoAlpha: 0, y: -30, duration: 0.07 }, 0.06)
        .fromTo(".ds-s2-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.2)
        .to(".ds-s2-label", { autoAlpha: 0, duration: 0.03 }, 0.6);

      story.forEach((_, i) => {
        const at = SUB_START + i * SUB_LEN;
        tl.fromTo(`.ds-sub-${i}`, { autoAlpha: 0, y: 16, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.018 }, at).to(
          `.ds-sub-${i}`,
          { autoAlpha: 0, y: -16, filter: "blur(6px)", duration: 0.018 },
          at + SUB_LEN - 0.012
        );
      });

      tl.fromTo(".ds-num", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.008, duration: 0.03 }, 0.51)
        .to(".ds-num", { autoAlpha: 0, y: -20, stagger: 0.006, duration: 0.03 }, 0.6)
        .fromTo(".ds-fold", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.04 }, 0.66)
        .to(".ds-fold", { autoAlpha: 0, duration: 0.03 }, 0.88)
        .fromTo(".ds-black", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.95);
    }, wrap);

    return () => ctx.revert();
  }, [story]);

  return (
    <section ref={wrap} id="intro" data-chapter="Reality" className="relative h-[780svh]" aria-label={t.myStory.replace(/^\d+ · /, "")}>
      <div className="sticky top-0 h-svh overflow-hidden bg-void">
        <div className="absolute inset-0">
          <PaperScene active={active} backSrc={sheetBack} />
        </div>

        {/* 01 · Reality */}
        <div className="ds-s1 absolute inset-0 px-5 md:px-10 pt-28 pb-10 flex flex-col justify-between pointer-events-none">
          <p className="ds-fade label text-fog">{t.reality}</p>
          <div className="max-w-[640px]">
            <h2 className="type-x text-[11vw] md:text-[clamp(44px,5.6vw,100px)] leading-[0.92]">
              <span className="block overflow-hidden"><span className="ds-line block">{t.start1}</span></span>
              <span className="block overflow-hidden"><span className="ds-line block">{t.start2}<span className="text-signal">.</span></span></span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="ds-fade label text-fog">{t.scroll}<span className="hidden [@media(hover:hover)]:inline">{t.draw}</span></p>
            {sketched && (
              <Link href="/contact" data-track="sketch_sent_to_brief" onPointerDown={keepSketch} onKeyDown={(e) => e.key === "Enter" && keepSketch()} className="pointer-events-auto label text-bone underline decoration-bone/40 underline-offset-4 hover:decoration-bone animate-[fade-in_0.6s_ease-out]">
                {t.sendSketch}
              </Link>
            )}
          </div>
        </div>

        {/* 02 · The sketch */}
        <p className="ds-s2-label invisible absolute left-5 md:left-10 top-28 label text-fog">{t.myStory}</p>
        <div className="absolute inset-x-5 bottom-[8vh] flex justify-center pointer-events-none">
          <div className="relative w-full max-w-[820px] min-h-[120px]">
            {story.map((line, i) => (
              <p key={i} className={`ds-sub-${i} invisible absolute inset-x-0 bottom-0 text-center type-c text-[22px] md:text-[30px] leading-[1.25] text-bone`}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <dl className="absolute inset-x-5 md:inset-x-10 bottom-[7vh] grid grid-cols-2 md:grid-cols-4 gap-6 pointer-events-none">
          {keyNumbers.map((k) => (
            <div key={k.label} className="ds-num invisible text-center">
              <dd className="type-x text-[44px] md:text-[64px] leading-none">{k.value}{k.suffix}</dd>
              <dt className="label text-fog mt-2">{k.label}</dt>
            </div>
          ))}
        </dl>

        {/* 03 · The fold */}
        <p className="ds-fold invisible absolute left-5 md:left-10 top-28 label text-fog">{t.turn}</p>
        <h2 className="ds-fold invisible absolute inset-x-5 bottom-[8vh] text-center type-x text-[8vw] md:text-[clamp(32px,3.6vw,60px)] leading-[1] pointer-events-none">{t.blankPage}</h2>

        <div className="ds-black invisible absolute inset-0 bg-void" />
      </div>
    </section>
  );
}
