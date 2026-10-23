"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/site";
import { servicesState } from "@/components/three/store";
import { useInViewport } from "@/components/three/useInViewport";
import { getLenis } from "@/components/shell/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const ServicesScene = dynamic(() => import("@/components/three/ServicesScene"), { ssr: false });

export function Services() {
  const wrap = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const active = useInViewport(wrap, "0px");
  const s = services[index];

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: wrap.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        servicesState.progress = self.progress;
        setIndex(Math.min(services.length - 1, Math.round(self.progress * (services.length - 1))));
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const tween = gsap.fromTo(el.querySelectorAll(".sv-in"), { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: "expo.out" });
    return () => {
      tween.kill();
    };
  }, [index]);

  const jumpTo = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    getLenis()?.scrollTo(top + (span * i) / (services.length - 1), { duration: 1.4 });
  };

  return (
    <section
      ref={wrap}
      id="services"
      data-chapter="Services"
      className="relative h-[620vh] transition-colors duration-700"
      style={{ backgroundColor: `color-mix(in srgb, ${s.color} 9%, #060708)` }}
      aria-labelledby="services-h"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <ServicesScene active={active} />
        </div>

        <div className="relative h-full mx-auto max-w-[1600px] px-5 md:px-8 pt-24 pb-16 flex flex-col justify-between pointer-events-none">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <p className="label text-fog">03 / Services</p>
              <h2 id="services-h" className="type-m text-[8vw] md:text-[3.4vw] leading-[0.95] mt-3 max-w-[640px]">
                One engine. Seven ways to bring your vision to life.
              </h2>
            </div>
            <ol className="hidden md:flex flex-col gap-1.5 pointer-events-auto" aria-label="Services">
              {services.map((sv, i) => (
                <li key={sv.code}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === index}
                    className={`flex items-center gap-3 label transition-colors ${i === index ? "text-bone" : "text-fog hover:text-mist"}`}
                  >
                    <span className="size-2.5 rotate-45 border border-current" style={i === index ? { background: sv.color, borderColor: sv.color } : undefined} />
                    {sv.code}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div ref={nameRef} key={index} className="max-w-[min(760px,100%)]" aria-live="polite">
            <div className="overflow-hidden">
              <p className="sv-in label flex items-center gap-3" style={{ color: s.color === "#EEEAE1" ? "#EEEAE1" : s.color }}>
                <span className="size-3 rounded-[3px]" style={{ background: s.color }} />
                {s.code} · {String(index + 1).padStart(2, "0")} of 07
              </p>
            </div>
            <div className="overflow-hidden mt-4">
              <h3 className="sv-in type-x text-[11vw] md:text-[6.2vw] leading-[0.86]">{s.name}</h3>
            </div>
            <div className="overflow-hidden mt-6">
              <p className="sv-in font-display [font-stretch:85%] font-light text-[24px] md:text-[34px] leading-[1.1] text-mist">{s.hook}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-end gap-8">
              <div className="overflow-hidden">
                <p className="sv-in">
                  <span className="type-x text-[56px] md:text-[80px] leading-none">{s.number}</span>
                  <span className="label text-fog ml-3">{s.unit}</span>
                </p>
              </div>
              <Link
                href={s.href}
                className="pointer-events-auto inline-flex h-14 items-center gap-3 rounded-full border border-bone/30 px-6 hover:bg-bone hover:text-void transition-colors"
              >
                Explore {s.short.toLowerCase()}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
