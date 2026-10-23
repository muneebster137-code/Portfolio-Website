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
export function ServicesShowcase({ label }: { label?: string }) {
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
    <section ref={wrap} id="services" data-chapter="Engine" aria-labelledby="shelf-h" className="relative h-[720vh] bg-void text-bone">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <ServiceObjects active={active} />
        </div>

        <div className="absolute inset-x-0 top-0 pt-24 px-5 md:px-8 flex justify-between items-start pointer-events-none">
          <div ref={meta} key={index} className="w-[300px] max-w-[46vw] text-[12px]">
            {label && <p className="label text-fog mb-6">{label}</p>}
            <h2 id="shelf-h" className="overflow-hidden"><span data-in className="block type-x text-[22px] md:text-[28px] leading-none">{s.short}</span></h2>
            <dl className="mt-4 border-t border-bone/15">
              {[
                ["Service", s.name],
                ["Code", s.code],
                ["Output", `${s.number} ${s.unit}`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] border-b border-bone/15 py-1.5 overflow-hidden">
                  <dt data-in className="label text-fog">{k}</dt>
                  <dd data-in>{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[90px_1fr] border-b border-bone/15 py-1.5 overflow-hidden">
                <dt data-in className="label text-fog">Segments</dt>
                <dd data-in className="hidden md:block">{segs.slice(0, 7).map((g) => <span key={g} className="block">{g}</span>)}</dd>
                <dd data-in className="md:hidden">{segs.length}</dd>
              </div>
            </dl>
          </div>
          <p className="label text-fog tabular-nums">{String(index + 1).padStart(2, "0")} / 07</p>
        </div>

        <Link
          href={s.href}
          aria-label={`Open ${s.name}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[46vh] rounded-full"
        />

        <div className="absolute inset-x-0 bottom-0 pb-14 md:pb-16 px-5 md:px-8 pointer-events-none">
          <div className="mx-auto max-w-[760px] grid grid-cols-2 gap-6 md:gap-16 text-center">
            <div>
              <p className="label text-fog mt-2">Hook</p>
              <p className="type-c font-bold text-[18px] md:text-[22px] leading-[1.05] mt-1">&ldquo;{s.hook}&rdquo;</p>
            </div>
            <div>
              <p className="label text-fog mt-2">Proof</p>
              <p className="type-c font-bold text-[18px] md:text-[22px] leading-[1.05] mt-1">&ldquo;{s.number} {s.unit}&rdquo;</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between pointer-events-auto">
            <p className="label text-fog hidden md:block">Click the object to open</p>
            <div className="flex gap-2 ml-auto">
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous service" className="grid place-items-center size-11 rounded-full border border-bone/25 hover:bg-bone hover:text-void transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next service" className="grid place-items-center size-11 rounded-full border border-bone/25 hover:bg-bone hover:text-void transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
