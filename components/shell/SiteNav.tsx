"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { identity, navLinks, services } from "@/lib/site";
import { getLenis } from "./SmoothScroll";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(overlay.current, { autoAlpha: 1 })
        .fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" })
        .from(".menu-link", { yPercent: 110, duration: 0.8, stagger: 0.06, ease: "expo.out" }, "-=0.35")
        .from(".menu-aside > *", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.04 }, "<0.1");
    }, overlay);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open) {
      getLenis()?.stop();
      tl.current?.timeScale(1).play();
    } else {
      getLenis()?.start();
      tl.current?.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 md:px-8 pt-5 pointer-events-none">
        <Link href="/" className="pointer-events-auto mix-blend-difference text-bone flex items-center gap-3" aria-label="Muhammad Muneeb Bilal, home">
          <span className="type-x text-[22px] leading-none">MMB<span className="text-signal">.</span></span>
          <span className="label hidden md:inline">N°01 / Creative engine</span>
        </Link>
        <div className="pointer-events-auto flex items-center gap-2">
          <Link href="/resume" className="hidden md:inline-flex h-11 items-center rounded-full border border-hair bg-void/60 backdrop-blur-sm px-5 text-sm hover:border-bone transition-colors">
            Resume
          </Link>
          <Link href="/contact" className="hidden sm:inline-flex h-11 items-center rounded-full bg-signal px-5 text-sm font-medium text-void hover:bg-bone transition-colors">
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="h-11 inline-flex items-center gap-3 rounded-full bg-bone pl-5 pr-1.5 text-sm font-medium text-void"
          >
            {open ? "Close" : "Menu"}
            <span className="grid place-items-center size-8 rounded-full bg-void" aria-hidden="true">
              <span className={`block h-px w-3.5 bg-bone transition-transform duration-500 ${open ? "rotate-45 translate-y-px" : "-translate-y-[3px]"}`} />
              <span className={`block h-px w-3.5 bg-bone transition-transform duration-500 ${open ? "-rotate-45 -translate-y-px" : "translate-y-[3px]"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={overlay}
        id="site-menu"
        className="fixed inset-0 z-40 invisible bg-void text-bone overflow-y-auto"
        aria-hidden={!open}
      >
        <div className="min-h-full grid lg:grid-cols-[1fr_380px] gap-12 px-5 md:px-8 pt-28 pb-10">
          <nav aria-label="Main menu" className="flex flex-col justify-end">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="group relative overflow-hidden border-t border-hair py-2 flex items-baseline gap-6"
              >
                <span className="label text-fog w-10">{String(i + 1).padStart(2, "0")}</span>
                <span className="menu-link block type-x text-[13vw] lg:text-[8.5vw] leading-[0.9] transition-[font-stretch,color] duration-500 group-hover:text-signal [font-stretch:125%] group-hover:[font-stretch:62%]">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>
          <aside className="menu-aside flex flex-col justify-end gap-8">
            <div>
              <p className="label text-fog mb-4">Seven services</p>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.code} className="flex items-center gap-3 text-sm text-mist">
                    <span className="size-3 rounded-[3px]" style={{ background: s.color }} />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1 text-sm">
              <a href={`mailto:${identity.email}`} tabIndex={open ? 0 : -1} className="block hover:text-signal">{identity.email}</a>
              <a href={identity.phoneHref} tabIndex={open ? 0 : -1} className="block hover:text-signal">{identity.phone}</a>
              <a href={identity.linkedin} tabIndex={open ? 0 : -1} className="block hover:text-signal">LinkedIn</a>
              <p className="label text-fog pt-3">{identity.location}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
