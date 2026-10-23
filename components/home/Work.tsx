"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredWork } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// Pinned horizontal run through the featured cases. Cards lean into the scroll velocity.
export function Work() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const lean = gsap.quickTo(".wk-card", "rotationY", { duration: 0.6, ease: "power3.out" });

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => lean(gsap.utils.clamp(-14, 14, self.getVelocity() / -120)),
        },
      });
      gsap.to(".wk-ghost", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} id="work" data-chapter="Work" className="relative overflow-hidden bg-void" aria-labelledby="work-h">
      <p className="wk-ghost type-x outline-type [--stroke:rgba(238,234,225,0.14)] absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[26vw] leading-none pointer-events-none select-none" aria-hidden="true">
        Selected work · Selected work
      </p>
      <div ref={track} className="relative flex flex-col md:flex-row md:items-center gap-10 md:gap-[4vw] px-5 md:px-8 py-24 md:h-svh md:w-max [perspective:1600px]">
        <div className="md:w-[34vw] shrink-0">
          <p className="label text-fog">04 / Selected cases</p>
          <h2 id="work-h" className="type-x text-[13vw] md:text-[6.6vw] leading-[0.86] mt-4">
            Work that started with a blank page
          </h2>
          <p className="mt-6 max-w-[420px] text-mist">Eleven stories, from a first internship to a five-unit education group. Each one starts with a problem and ends with a result.</p>
        </div>

        {featuredWork.map((w) => (
          <Link
            key={w.slug}
            href={`/case-studies/${w.slug}`}
            className="wk-card group relative block shrink-0 w-full md:w-[42vw] h-[62vh] md:h-[68vh] [transform-style:preserve-3d]"
          >
            <span className="absolute inset-0 rounded-[22px] translate-x-3.5 translate-y-3.5 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5" style={{ background: w.plate }} />
            <span className="absolute inset-0 rounded-[22px] overflow-hidden border border-hair bg-carbon">
              <Image src={w.image} alt={`${w.title} key visual`} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
              {w.tag && (
                <span className="label absolute top-4 left-4 rounded-full px-3 py-2 text-void" style={{ background: w.plate }}>
                  {w.tag}
                </span>
              )}
              <span className="absolute inset-x-4 bottom-4 rounded-2xl bg-void border border-hair p-5 md:p-6 flex items-end justify-between gap-5">
                <span>
                  <span className="label text-fog block">
                    Case {w.index} · {w.year}
                    {w.via ? " · via Watch How Malaysia" : ""}
                  </span>
                  <span className="type-x block text-[28px] md:text-[2.4vw] leading-none mt-2">{w.title}</span>
                  <span className="block text-mist mt-2 text-[15px]">{w.summary}</span>
                </span>
                <span className="grid place-items-center size-12 shrink-0 rounded-full bg-bone text-void transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M7 17L17 7M8 7h9v9" /></svg>
                </span>
              </span>
            </span>
          </Link>
        ))}

        <Link href="/case-studies" className="group shrink-0 grid place-items-center size-[64vw] md:size-[26vw] rounded-full border border-bone/25 hover:bg-signal hover:border-signal hover:text-void transition-colors md:mr-[6vw]">
          <span className="text-center">
            <span className="type-x block text-[9vw] md:text-[3.6vw] leading-[0.9]">All 11</span>
            <span className="label block mt-3">Case studies</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
