"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocalLink as Link, useContent, useUI } from "@/components/i18n";
import { getLenis } from "./SmoothScroll";
import { DreamMap } from "@/components/fx/DreamMap";

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);
  const { identity, navLinks } = useContent();
  const ui = useUI();
  const t = ui.footer;

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
    <footer ref={root} className="relative bg-bone text-void border-t border-void/10 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 pt-16 pb-6 grid gap-10 md:grid-cols-[5fr_3fr_4fr]">
        <div>
          <p className="type-x text-2xl">{identity.name}</p>
          <p className="text-void/60 mt-2">{identity.role}</p>
        </div>
        <nav aria-label={t.footerNav} className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-void/65">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-void">{l.label}</Link>
          ))}
          <Link href="/resume" className="hover:text-void">{ui.nav.resume}</Link>
        </nav>
        <div className="flex flex-col gap-1.5 text-sm text-void/65">
          <a href={`mailto:${identity.email}`} className="hover:text-void">{identity.email}</a>
          <a href={identity.phoneHref} className="hover:text-void">{identity.phone}</a>
          <span>{identity.location}</span>
          <a href={identity.linkedin} className="hover:text-void">LinkedIn</a>
        </div>
      </div>
      <DreamMap />
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 flex flex-wrap items-center justify-between gap-4 pb-4">
        <p className="label text-void/55">© 2026 {identity.name}. {t.rights}</p>
        <button type="button" onClick={() => getLenis()?.scrollTo(0, { duration: 2 })} className="label text-void/55 hover:text-void">
          {t.backToTop}
        </button>
      </div>
      <p className="ft-word type-x flex justify-between px-4 md:px-8 text-[27vw] leading-[0.8] tracking-[-0.06em] select-none pb-[1vw]" aria-hidden="true">
        {"Muneeb".split("").map((c, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <span className="ft-letter inline-block">{c}</span>
          </span>
        ))}
      </p>
    </footer>
  );
}
