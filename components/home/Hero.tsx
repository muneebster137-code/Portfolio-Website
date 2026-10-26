"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { identity } from "@/lib/site";
import { useInViewport } from "@/components/three/useInViewport";
import { PRELOADER_DONE } from "@/components/shell/Preloader";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const PortraitScene = dynamic(() => import("@/components/three/PortraitScene"), { ssr: false });

// The way to the work: a big round button on the right, its label running round the rim.
function WorkButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // A little magnetic: it leans toward the mouse when the mouse comes close.
    const x = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < r.width;
      x(near ? dx * 0.18 : 0);
      y(near ? dy * 0.18 : 0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <Link ref={ref} href="/case-studies" aria-label="View case studies" className="hero-cta group pointer-events-auto relative grid size-28 md:size-44 place-items-center rounded-full bg-signal text-void shadow-[0_30px_60px_-20px_rgba(255,74,28,0.45)]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_16s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="cta-rim" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <text className="label" fill="currentColor" fontSize="15" letterSpacing="2.6">
          <textPath href="#cta-rim">VIEW CASE STUDIES · ELEVEN STORIES · </textPath>
        </text>
      </svg>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
        <path d="M7 17L17 7M8 7h9v9" />
      </svg>
    </Link>
  );
}

// The first screen: who, the line, and Muneeb himself floating in the dream, with the work around him.
export function Hero({ portrait, cutout, tiles }: { portrait?: string; cutout: boolean; tiles: string[] }) {
  const wrap = useRef<HTMLElement>(null);
  const active = useInViewport(wrap, "0px");
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(wrap);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Everything waits out of sight until the preloader hands over, then arrives in one move.
    if (!still) {
      gsap.set(q(".hero-line"), { yPercent: 110 });
      gsap.set(q(".hero-fade"), { autoAlpha: 0, y: 14 });
      gsap.set(q(".hero-cta"), { scale: 0, rotation: -90 });
      gsap.set(q(".hero-under"), { strokeDashoffset: 1 });
    }
    let tl: gsap.core.Timeline | undefined;
    const play = () => {
      setReady(true);
      if (still) return;
      tl = gsap
        .timeline()
        .to(q(".hero-under"), { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, 0)
        .to(q(".hero-line"), { yPercent: 0, duration: 1.3, stagger: 0.1, ease: "expo.out" }, 0)
        .to(q(".hero-fade"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "power3.out" }, 0.3)
        .to(q(".hero-cta"), { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.6)" }, 0.5);
    };
    if ((window as unknown as { __mmbReady?: boolean }).__mmbReady) play();
    else window.addEventListener(PRELOADER_DONE, play, { once: true });
    return () => {
      window.removeEventListener(PRELOADER_DONE, play);
      tl?.kill();
    };
  }, []);

  return (
    <section ref={wrap} id="hero" data-chapter="Hello" aria-labelledby="hero-h" className="relative h-svh min-h-[640px] overflow-hidden bg-void">
      <div className="absolute inset-x-0 top-[12svh] h-[46svh] md:inset-y-0 md:h-auto md:left-[46%] md:top-0">
        {reduced ? (
          portrait && (
            <div className="relative mx-auto h-full max-h-[70svh] aspect-[3/4] mt-[6svh]">
              <span className="absolute left-1/2 top-[18%] -translate-x-1/2 size-[70%] aspect-square rounded-full bg-signal" aria-hidden="true" />
              <Image src={portrait} alt="" fill sizes="40vw" className={cutout ? "object-contain" : "object-cover rounded-[14px]"} />
            </div>
          )
        ) : (
          <PortraitScene active={active} src={portrait} cutout={cutout} tiles={tiles} ready={ready} />
        )}
      </div>

      <div className="relative z-10 h-full px-5 md:px-10 pt-28 pb-10 flex flex-col justify-between pointer-events-none">
        <p className="hero-fade label text-fog">{identity.role}</p>
        <div className="max-w-[820px] md:mb-[6vh]">
          <h1 id="hero-h" className="type-x text-[12.5vw] md:text-[clamp(48px,5.6vw,112px)] leading-[0.9]">
            <span className="block overflow-hidden"><span className="hero-line block">Dreamt in pencil.</span></span>
            <span className="relative inline-block overflow-hidden pb-[0.16em]">
              <span className="hero-line block">
                Delivered in <span className="text-signal">colour</span>.
              </span>
              {/* A pencil underline; the preloader's line lands here. */}
              <svg data-landing viewBox="0 0 400 12" preserveAspectRatio="none" className="absolute left-0 right-[4%] bottom-0 h-[0.14em] w-[96%]" aria-hidden="true">
                <path className="hero-under" d="M2 7 C 80 3, 160 10, 240 6 S 360 4, 398 7" fill="none" stroke="#EEEAE1" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
              </svg>
            </span>
          </h1>
          <p className="hero-fade hidden md:block mt-8 max-w-[440px] text-[17px] leading-[1.6] text-mist">
            Social media, video, print, branding, websites, packaging and pitch decks from one creative engine. I start by understanding what you want people to feel, then I build everything around that vision.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3 pointer-events-auto">
            <Link href="/contact" className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-[15px] font-medium text-void hover:bg-signal transition-colors">Start a project</Link>
            <Link href="/resume" className="inline-flex h-12 items-center rounded-full px-6 text-[15px] ring-1 ring-bone/25 hover:ring-bone transition">Resume</Link>
          </div>
        </div>
        <p className="hero-fade hidden md:block label text-fog">Scroll</p>
      </div>

      <div className="absolute z-20 right-5 top-[46svh] md:top-auto md:right-10 md:bottom-[12vh]">
        <WorkButton />
      </div>
    </section>
  );
}
