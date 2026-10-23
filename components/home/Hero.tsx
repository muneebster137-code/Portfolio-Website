"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { identity } from "@/lib/site";
import { heroState } from "@/components/three/store";
import { useInViewport } from "@/components/three/useInViewport";
import { PRELOADER_DONE } from "@/components/shell/Preloader";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const active = useInViewport(wrap, "0px");

  useEffect(() => {
    const q = gsap.utils.selector(wrap);
    let introTl: gsap.core.Timeline | undefined;
    const intro = () => {
      introTl = gsap
        .timeline()
        .from(q(".h-line"), { yPercent: 115, duration: 1.3, stagger: 0.09, ease: "expo.out" })
        .from(q(".h-fade"), { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.05, ease: "power3.out" }, "-=0.9")
        .to(heroState, { intro: 1, duration: 2.2, ease: "expo.out" }, 0.1);
    };
    heroState.intro = 0;
    if ((window as unknown as { __mmbReady?: boolean }).__mmbReady) intro();
    else window.addEventListener(PRELOADER_DONE, intro, { once: true });

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => (heroState.progress = self.progress),
        },
      })
        .to(".h-l1", { xPercent: -60, autoAlpha: 0, duration: 0.24 }, 0)
        .to(".h-l3", { xPercent: 60, autoAlpha: 0, duration: 0.24 }, 0)
        .to(".h-l2", { scale: 1.9, autoAlpha: 0, duration: 0.3 }, 0)
        .to(".h-bottom, .h-hud", { y: 40, autoAlpha: 0, duration: 0.12 }, 0)
        .fromTo(".cap-wall", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.4)
        .to(".cap-wall", { autoAlpha: 0, y: -30, duration: 0.06 }, 0.68)
        .fromTo(".h-paper", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.07 }, 0.87)
        .fromTo(".cap-final", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.05 }, 0.93);
    }, wrap);

    return () => {
      window.removeEventListener(PRELOADER_DONE, intro);
      introTl?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrap} id="intro" data-chapter="Intro" className="relative h-[420vh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0"><HeroScene active={active} /></div>

        <div className="h-hud h-fade absolute inset-x-5 md:inset-x-8 top-24 flex flex-wrap justify-between gap-3 label text-fog pointer-events-none">
          <span>{identity.coords}</span>
          <span className="hidden md:inline">Islamabad, Pakistan · GMT+5</span>
          <span className="hidden md:inline">Index 001 / Home</span>
          <span>{identity.role}</span>
        </div>

        <h1 className="absolute inset-x-5 md:inset-x-8 top-[19vh] md:top-[17vh] uppercase pointer-events-none leading-[0.84]">
          <span className="sr-only">I bring visions to life.</span>
          <span aria-hidden="true" className="h-l1 block overflow-hidden">
            <span className="h-line block type-c font-light text-mist text-[13vw] md:text-[7.4vw]">I bring</span>
          </span>
          <span aria-hidden="true" className="h-l2 block overflow-hidden mix-blend-difference origin-[30%_50%]">
            <span className="h-line block type-x text-[17vw] md:text-[12.6vw]">Visions</span>
          </span>
          <span aria-hidden="true" className="h-l3 flex flex-wrap items-end gap-x-8 gap-y-3">
            <span className="block overflow-hidden">
              <span className="h-line block type-c font-extrabold text-[15vw] md:text-[9.6vw]">
                to life<span className="text-signal">.</span>
              </span>
            </span>
            <span className="h-fade label text-fog max-w-[260px] leading-relaxed pb-[1.2vw]">
              From A4 paper and a half-sharpened pencil, to Pantone and hex fields
            </span>
          </span>
        </h1>

        <div className="h-bottom absolute inset-x-5 md:inset-x-8 bottom-10 md:bottom-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-[500px]">
            <p className="h-fade hidden sm:block text-[17px] md:text-[19px] leading-[1.55] text-mist font-light">
              Social media, video, print, branding, websites, packaging and pitch decks from one creative engine. I start by understanding what you want people to feel, then I build everything around that vision.
            </p>
            <div className="h-fade flex flex-wrap gap-2.5 mt-7">
              <Link href="/contact" className="inline-flex h-14 items-center gap-3 rounded-full bg-signal px-7 font-medium text-void hover:bg-bone transition-colors">
                Start a project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </Link>
              <Link href="/work" className="inline-flex h-14 items-center rounded-full border border-bone/30 px-7 hover:border-bone transition-colors">
                View case studies
              </Link>
            </div>
          </div>
          <p className="h-fade label text-fog hidden sm:flex items-center gap-3">
            <span className="block h-10 w-px bg-fog/60 origin-top animate-pulse" />
            Scroll to open the swatch book
          </p>
        </div>

        <div className="cap-wall invisible absolute inset-x-0 bottom-[12vh] text-center pointer-events-none">
          <p className="label text-fog">Seven swatches</p>
          <p className="type-x text-[8vw] md:text-[4.6vw] leading-none mt-3">One creative engine</p>
        </div>

        <div className="h-paper invisible absolute inset-0 bg-bone" />
        <div className="cap-final invisible absolute inset-x-5 md:inset-x-8 bottom-12 flex justify-between label text-void/70 pointer-events-none">
          <span>02 / My story</span>
          <span>It started on a sheet of A4</span>
        </div>
      </div>
    </section>
  );
}
