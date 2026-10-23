"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { identity, navLinks } from "@/lib/site";
import { getLenis } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-letter", {
        yPercent: 100,
        stagger: 0.05,
        ease: "expo.out",
        duration: 1.2,
        scrollTrigger: { trigger: ".ft-word", start: "top 95%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative bg-carbon border-t border-hair overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 pt-16 pb-6 grid gap-10 md:grid-cols-[5fr_3fr_4fr]">
        <div>
          <p className="type-x text-2xl">{identity.name}</p>
          <p className="text-mist mt-2">{identity.role}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-mist">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-bone">{l.label}</Link>
          ))}
          <Link href="/resume" className="hover:text-bone">Resume</Link>
        </nav>
        <div className="flex flex-col gap-1.5 text-sm text-mist">
          <a href={`mailto:${identity.email}`} className="hover:text-bone">{identity.email}</a>
          <a href={identity.phoneHref} className="hover:text-bone">{identity.phone}</a>
          <span>{identity.location}</span>
          <a href={identity.linkedin} className="hover:text-bone">LinkedIn</a>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 flex flex-wrap items-center justify-between gap-4 pb-4">
        <p className="label text-fog">© 2026 {identity.name}. All rights reserved.</p>
        <button type="button" onClick={() => getLenis()?.scrollTo(0, { duration: 2 })} className="label text-fog hover:text-bone">
          Back to top ↑
        </button>
      </div>
      <p className="ft-word type-x [font-stretch:100%] flex justify-between px-3 text-[21vw] leading-[0.78] select-none pb-[2vw] md:pb-[3.2vw]" aria-hidden="true">
        {"MUNEEB".split("").map((c, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <span className="ft-letter inline-block">{c}</span>
          </span>
        ))}
      </p>
    </footer>
  );
}
