"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { services } from "@/lib/site";
import { servicePages } from "@/lib/services-content";
import { useInViewport } from "@/components/three/useInViewport";
import { getLenis } from "@/components/shell/SmoothScroll";
import { showcaseState } from "@/components/three/store";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { StillServices } from "@/components/home/StillScenes";

gsap.registerPlugin(ScrollTrigger);

const ServiceObjects = dynamic(() => import("@/components/three/ServiceObjects"), { ssr: false });

const segmentsOf = (href: string) => {
  const page = servicePages.find((p) => href.endsWith(p.slug));
  if (!page) return [];
  if (page.websites) return page.websites.map((w) => w.name.split(" (")[0]);
  if (page.brands) return page.brands.map((b) => b.name);
  return page.segments.map((g) => g.name);
};

// The seven services as objects on a shelf (after the A24 film library): scroll turns the arc,
// the object in front gets its credits top-left and two lines of proof below.
type Props = { label?: string; textures: (string | undefined)[][]; intro?: boolean };

export function ServicesShowcase(props: Props) {
  const reduced = useReducedMotion();
  return reduced ? <StillServices label={props.label} intro={props.intro} /> : <AnimatedShowcase {...props} />;
}

function AnimatedShowcase({ label, textures, intro = false }: Props) {
  const wrap = useRef<HTMLElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const active = useInViewport(wrap, "0px");
  const s = services[index];
  const segs = segmentsOf(s.href);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        showcaseState.head = self.progress * (services.length - 1);
        setIndex(Math.round(self.progress * (services.length - 1)));
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!meta.current) return;
    const tw = gsap.from(meta.current.querySelectorAll("[data-in]"), { yPercent: 100, autoAlpha: 0, duration: 0.7, stagger: 0.04, ease: "expo.out" });
    return () => {
      tw.kill();
    };
  }, [index]);

  const go = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    getLenis()?.scrollTo(top + (span * Math.max(0, Math.min(6, i))) / 6, { duration: 1.2 });
  };

  return (
    <>
    {intro && (
      <header className="mx-auto max-w-[1600px] px-5 md:px-10 pt-36 pb-16 bg-void">
        <p className="label text-fog">{label}</p>
        <h2 className="type-x mt-6 text-[12vw] md:text-[clamp(48px,6.4vw,116px)] leading-[0.92] max-w-[1200px]">One engine. Seven ways to bring your vision to life.</h2>
      </header>
    )}
    <section ref={wrap} id="services" data-chapter="Engine" aria-labelledby="shelf-h" className="relative h-[720svh] bg-void text-bone">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <ServiceObjects active={active} textures={textures} />
        </div>

        <div ref={meta} key={index} className="absolute inset-0 px-5 md:px-10 pt-24 pb-24 md:pb-16 flex flex-col justify-between pointer-events-none">
          <div className="max-w-[min(820px,62vw)]">
            <p className="label text-fog overflow-hidden"><span data-in className="block">{label ? `${label} · ` : ""}{String(index + 1).padStart(2, "0")} / 07 · {s.code}</span></p>
            <h2 id="shelf-h" className="overflow-hidden mt-4"><span data-in className="block type-x text-[11vw] md:text-[clamp(44px,5.6vw,104px)] leading-[0.92]">{s.name}</span></h2>
            <p className="overflow-hidden mt-4"><span data-in className="block type-c text-[6vw] md:text-[clamp(22px,2.4vw,40px)] leading-[1.1] text-mist">&ldquo;{s.hook}&rdquo;</span></p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="hidden lg:block text-[14px] text-bone/75">
              <p className="label text-fog mb-3 overflow-hidden"><span data-in className="block">Segments</span></p>
              <ul className="columns-2 gap-10">
                {segs.map((g) => <li key={g} className="overflow-hidden"><span data-in className="block py-0.5">{g}</span></li>)}
              </ul>
            </div>
            <div className="text-right ml-auto">
              <p className="overflow-hidden"><span data-in className="block type-x text-[16vw] md:text-[clamp(56px,7vw,124px)] leading-[0.85]">{s.number}</span></p>
              <p className="label text-fog mt-2 overflow-hidden"><span data-in className="block">{s.unit}</span></p>
            </div>
          </div>
        </div>

        <Link
          href={s.href}
          aria-label={`Open ${s.name}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[46vh] rounded-full"
        />

        <div className="absolute left-1/2 bottom-6 md:bottom-16 -translate-x-1/2 flex items-center gap-3">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous service" className="grid place-items-center size-11 rounded-full border border-bone/25 hover:bg-bone hover:text-void transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <Link href={s.href} className="label text-bone/80 hover:text-bone px-2">Open</Link>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next service" className="grid place-items-center size-11 rounded-full border border-bone/25 hover:bg-bone hover:text-void transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
