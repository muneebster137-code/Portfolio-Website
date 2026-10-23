"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { keyNumbers, story } from "@/lib/site";
import { dreamState } from "@/components/three/store";
import { useInViewport } from "@/components/three/useInViewport";
import { PRELOADER_DONE } from "@/components/shell/Preloader";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { rustle } from "@/components/fx/sound";
import { StillIntro } from "./StillScenes";

gsap.registerPlugin(ScrollTrigger);

const PaperScene = dynamic(() => import("@/components/three/PaperScene"), { ssr: false });

// Shots 01 to 03 in one pinned scene: a blank sheet (reality), the sketch (my story),
// and the fold that turns the page into the work. Captions are timed to the same scroll.
const SUB_START = 0.24;
const SUB_LEN = 0.065;

export function DreamSequence({ sheetBack }: { sheetBack?: string }) {
  const reduced = useReducedMotion();
  return reduced ? <StillIntro sheetBack={sheetBack} /> : <AnimatedIntro sheetBack={sheetBack} />;
}

function AnimatedIntro({ sheetBack }: { sheetBack?: string }) {
  const wrap = useRef<HTMLElement>(null);
  const active = useInViewport(wrap, "0px");

  useEffect(() => {
    const q = gsap.utils.selector(wrap);
    let intro: gsap.core.Timeline | undefined;
    const play = () => {
      intro = gsap
        .timeline()
        .from(q(".ds-line"), { yPercent: 110, duration: 1.4, stagger: 0.1, ease: "expo.out" })
        .from(q(".ds-fade"), { autoAlpha: 0, y: 14, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=1");
      // The first pencil stroke on the sheet (where the preloader's line just landed).
      if (dreamState.first < 1) gsap.to(dreamState, { first: 1, duration: 0.9, ease: "power2.inOut" });
    };
    if ((window as unknown as { __mmbReady?: boolean }).__mmbReady) play();
    else window.addEventListener(PRELOADER_DONE, play, { once: true });

    // Which side of the page turn the reader is on, so the rustle plays once per turn, either way.
    let turned = false;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
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

    return () => {
      window.removeEventListener(PRELOADER_DONE, play);
      intro?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrap} id="intro" data-chapter="Reality" className="relative h-[780svh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden bg-void">
        <div className="absolute inset-0">
          <PaperScene active={active} backSrc={sheetBack} />
        </div>

        {/* 01 · Reality */}
        <div className="ds-s1 absolute inset-0 px-5 md:px-10 pt-28 pb-10 flex flex-col justify-between pointer-events-none">
          <p className="ds-fade label text-fog">Founder and Creative Specialist</p>
          <div className="max-w-[760px]">
            <h1 className="type-x text-[15vw] md:text-[clamp(56px,8.4vw,150px)] leading-[0.9]">
              <span className="block overflow-hidden"><span className="ds-line block">I bring visions</span></span>
              <span className="block overflow-hidden"><span className="ds-line block">to life<span className="text-signal">.</span></span></span>
            </h1>
            <p className="ds-fade mt-8 max-w-[440px] text-[17px] leading-[1.6] text-mist">
              Social media, video, print, branding, websites, packaging and pitch decks from one creative engine. I start by understanding what you want people to feel, then I build everything around that vision.
            </p>
            <div className="ds-fade mt-8 flex flex-wrap gap-3 pointer-events-auto">
              <Link href="/case-studies" className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-[15px] font-medium text-void hover:bg-signal transition-colors">View case studies</Link>
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full px-6 text-[15px] ring-1 ring-bone/25 hover:ring-bone transition">Start a project</Link>
            </div>
          </div>
          <p className="ds-fade label text-fog">Scroll<span className="hidden [@media(hover:hover)]:inline"> · or draw on the page</span></p>
        </div>

        {/* 02 · The sketch */}
        <p className="ds-s2-label invisible absolute left-5 md:left-10 top-28 label text-fog">02 · My story</p>
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
        <p className="ds-fold invisible absolute left-5 md:left-10 top-28 label text-fog">03 · Turn the page</p>
        <h2 className="ds-fold invisible absolute inset-x-5 bottom-[8vh] text-center type-x text-[8vw] md:text-[clamp(32px,3.6vw,60px)] leading-[1] pointer-events-none">Work that started with a blank page</h2>

        <div className="ds-black invisible absolute inset-0 bg-void" />
      </div>
    </section>
  );
}
