"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { testimonials } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Tilts a card toward the pointer: a small piece of spatial UI on flat content.
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    };
    const leave = () => { rx(0); ry(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div className="[perspective:1200px]">
      <div ref={ref} className={`[transform-style:preserve-3d] ${className}`}>{children}</div>
    </div>
  );
}

export function Proof() {
  const root = useRef<HTMLElement>(null);
  const [lead, ...rest] = testimonials;

  useEffect(() => {
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = new SplitText(".pf-quote", { type: "lines", mask: "lines" });
      gsap.from(split.lines, { yPercent: 105, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".pf-quote", start: "top 80%" } });
      gsap.from(".pf-cred", { yPercent: 100, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".pf-cred", start: "top 90%" } });
      gsap.from(".pf-card", { y: 80, autoAlpha: 0, stagger: 0.12, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".pf-cards", start: "top 85%" } });
    }, root);
    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="proof" data-chapter="Proof" className="relative bg-void border-t border-hair" aria-labelledby="proof-h">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-28 md:pt-36 pb-28">
        <div className="grid md:grid-cols-[5fr_7fr] gap-10 items-end border-b border-hair pb-14">
          <div className="overflow-hidden">
            <p className="pf-cred type-x text-[34vw] md:text-[17vw] leading-[0.78]">30+</p>
          </div>
          <div>
            <p className="label text-fog">06 / Proof</p>
            <p className="font-display [font-stretch:88%] text-[26px] md:text-[34px] leading-[1.15] mt-4 max-w-[640px]">
              Certifications from international institutions. Six featured, each with its verification link.
            </p>
            <ul className="flex flex-wrap gap-2 mt-7">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <a href="#" className="label inline-flex h-11 items-center rounded-full border border-bone/20 px-4 hover:border-bone">
                    [Certification {i + 1}] ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 id="proof-h" className="label text-fog mt-24">What clients say</h2>
        <figure className="relative mt-10">
          <span className="type-x absolute -top-[0.35em] -left-[0.04em] text-signal text-[180px] md:text-[260px] leading-none select-none" aria-hidden="true">“</span>
          <blockquote className="pf-quote relative font-display font-light [font-stretch:85%] text-[32px] md:text-[clamp(40px,4.6vw,76px)] leading-[1.04] tracking-[-0.02em] max-w-[1280px] pt-16 md:pt-24">
            {lead.quote}
          </blockquote>
          <figcaption className="label text-fog mt-8">
            {lead.name} · {lead.title} · {lead.source}
          </figcaption>
        </figure>

        <div className="pf-cards grid md:grid-cols-2 gap-6 mt-20">
          {rest.map((t) => (
            <TiltCard key={t.name} className="pf-card h-full rounded-[22px] border border-hair bg-carbon p-7 md:p-9">
              <figure>
                <blockquote className="text-[17px] md:text-[19px] leading-[1.6] text-bone/85">{t.quote}</blockquote>
                <figcaption className="label text-fog mt-7">
                  {t.name} · {t.title}
                </figcaption>
              </figure>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
