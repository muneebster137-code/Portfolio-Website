"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { identity } from "@/lib/site";
import { braam } from "@/components/fx/sound";

gsap.registerPlugin(ScrollTrigger);

// Every page ends the same way: you wake up. The dark parts like eyelids over a bright page with one button.
// `service` pre-selects that service in the contact form.
export function CtaBand({ line, sub = "Let's bring it to life.", service }: { line: string; sub?: string; service?: string }) {
  const root = useRef<HTMLElement>(null);
  const href = service ? `/contact?service=${service}` : "/contact";

  useEffect(() => {
    // Less motion asked for: the eyes are already open.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root.current!.querySelectorAll(".kick-lid-top, .kick-lid-bottom"), { autoAlpha: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const lids = { trigger: root.current, start: "top 80%", end: "top 10%", scrub: true };
      gsap.fromTo(".kick-lid-top", { yPercent: 0 }, { yPercent: -101, ease: "power1.in", scrollTrigger: lids });
      gsap.fromTo(".kick-lid-bottom", { yPercent: 0 }, { yPercent: 101, ease: "power1.in", scrollTrigger: lids });
      gsap.from(".kick-line", { yPercent: 110, duration: 1.3, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 40%" } });
      gsap.from(".kick-fade", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 35%" } });
      // The kick: the moment you reach "Wake up", the world tips and drops, like falling out of a dream.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        onEnter: () => {
          const main = document.querySelector("main");
          if (!main) return;
          braam();
          gsap
            .timeline()
            .set(main, { transformOrigin: `50% ${window.scrollY + window.innerHeight / 2}px` })
            .to(main, { y: 34, rotation: 0.9, duration: 0.16, ease: "power2.in" })
            .to(main, { y: -10, rotation: -0.3, duration: 0.2, ease: "power2.out" })
            .to(main, { y: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", clearProps: "transform,transformOrigin" });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contact" data-chapter="Wake" className="relative bg-bone text-void" aria-labelledby="kick-h">
      {/* Eyelids: the dark parts from the middle as you scroll in. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
        <div className="kick-lid-top absolute inset-x-0 top-0 h-1/2 bg-void" />
        <div className="kick-lid-bottom absolute inset-x-0 bottom-0 h-1/2 bg-void" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 min-h-svh py-32 flex flex-col items-center justify-center text-center">
        <p className="kick-fade label text-void/55">Wake up</p>
        <h2 id="kick-h" className="type-x mt-8 text-[15vw] md:text-[clamp(64px,10vw,180px)] leading-[0.9]">
          <span className="block overflow-hidden"><span className="kick-line block">{line}</span></span>
          <span className="block overflow-hidden"><span className="kick-line block text-void/40">{sub}</span></span>
        </h2>
        <Link href={href} className="kick-fade mt-14 inline-flex h-16 items-center gap-3 rounded-full bg-signal px-9 text-lg font-medium text-void hover:bg-void hover:text-bone transition-colors">
          Start a project
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
        </Link>
        <p className="kick-fade mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] text-void/65">
          <a href={`mailto:${identity.email}`} className="hover:text-void">{identity.email}</a>
          <a href={identity.phoneHref} className="hover:text-void">{identity.phone}</a>
          <a href={identity.linkedin} className="hover:text-void">LinkedIn</a>
        </p>
      </div>
    </section>
  );
}
