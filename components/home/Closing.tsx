"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { identity, services } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const tapeA = Array.from({ length: 4 }, () => services.map((s) => s.short)).flat();
const tapeB = Array.from({ length: 4 }, () => ["Start a project", "Have a vision?", "Let's bring it to life"]).flat();

function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.3);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => { x(0); y(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <span ref={ref} className="inline-block">{children}</span>;
}

export function Closing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cl-tapes", { rotate: 0 }, { rotate: -2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true } });
      gsap.from(".cl-line", { yPercent: 110, stagger: 0.1, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".cl-head", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" data-chapter="Contact" className="relative bg-void overflow-hidden" aria-labelledby="cta-h">
      <div className="cl-tapes relative h-[220px] md:h-[260px] mt-10" aria-hidden="true">
        <div className="absolute left-[-10%] w-[120%] top-[60px] rotate-[3deg] bg-bone text-void py-4 overflow-hidden">
          <div className="marquee-track gap-10 type-x text-[28px] md:text-[34px] whitespace-nowrap" style={{ ["--marquee-speed" as string]: "40s" }}>
            {[...tapeA, ...tapeA].map((t, i) => (
              <span key={i} className="flex items-center gap-10">{t}<span className="size-3 rotate-45 bg-signal" /></span>
            ))}
          </div>
        </div>
        <div className="absolute left-[-10%] w-[120%] top-[86px] -rotate-[3.5deg] bg-signal text-void py-4 overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          <div data-reverse className="marquee-track gap-10 type-c font-light text-[28px] md:text-[34px] whitespace-nowrap" style={{ ["--marquee-speed" as string]: "34s" }}>
            {[...tapeB, ...tapeB].map((t, i) => (
              <span key={i} className="flex items-center gap-10">{t}<span className="size-3 rotate-45 bg-void" /></span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-24 pb-32">
        <p className="label text-fog">07 / Contact</p>
        <h2 id="cta-h" className="cl-head mt-6 uppercase leading-[0.84]">
          <span className="block overflow-hidden"><span className="cl-line block type-x text-[15vw] md:text-[12vw]">Have a vision?</span></span>
          <span className="block overflow-hidden"><span className="cl-line block type-c font-light text-mist text-[12vw] md:text-[7.6vw]">Let&apos;s bring it to life.</span></span>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link href="/contact" className="inline-flex h-[72px] items-center gap-3 rounded-full bg-signal px-9 text-lg font-medium text-void hover:bg-bone transition-colors">
              Start a project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
            </Link>
          </Magnetic>
          <a href={`mailto:${identity.email}`} className="inline-flex h-[72px] items-center rounded-full border border-bone/25 px-7 hover:border-bone">{identity.email}</a>
          <a href={identity.phoneHref} className="inline-flex h-[72px] items-center rounded-full border border-bone/25 px-7 hover:border-bone">{identity.phone}</a>
          <a href={identity.linkedin} className="inline-flex h-[72px] items-center rounded-full border border-bone/25 px-7 hover:border-bone">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
