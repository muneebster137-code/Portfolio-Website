"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { nameFor } from "@/lib/page-name";
import { useUI } from "@/components/i18n";
import { langFromPath, stripLang } from "@/lib/i18n";

// Between pages the dark closes in from where you clicked, like an iris, names where you are going,
// and opens again on the next page. Opening a case from its picture is different: the picture itself
// grows until it fills the screen, and on the case page it settles into the opening visual.
export function DreamTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const cover = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const t = useUI().transition;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e: MouseEvent) => {
      if (reduced || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      if (pending.current) return;
      pending.current = true;
      const go = () => router.push(url.pathname + url.search + url.hash);
      router.prefetch(url.pathname);

      const img = /^\/case-studies\/[^/]+$/.test(stripLang(url.pathname)) ? a.querySelector("img") : null;
      if (img) {
        const r = (img.parentElement ?? img).getBoundingClientRect();
        const el = document.createElement("div");
        Object.assign(el.style, { position: "fixed", left: "0", top: "0", zIndex: "95", pointerEvents: "none", backgroundImage: `url("${img.currentSrc || img.src}")`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "20px" });
        document.body.appendChild(el);
        cover.current = el;
        gsap
          .timeline({ onComplete: go })
          .set(el, { x: r.left, y: r.top, width: r.width, height: r.height })
          .to(el, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0, duration: 0.55, ease: "power3.inOut" });
        return;
      }

      setName(nameFor(stripLang(url.pathname), a.textContent?.trim() || "", false, langFromPath(url.pathname)));

      const at = `${e.clientX}px ${e.clientY}px`;
      gsap
        .timeline({ onComplete: go })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(root.current, { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: 0.5, ease: "power2.in" })
        .fromTo(".it-text", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.04 }, "-=0.2");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    const el = cover.current;
    if (el) {
      // Settle the grown picture into the case page's opening visual, then let the real one take over.
      cover.current = null;
      let tl: gsap.core.Timeline | undefined;
      const raf = requestAnimationFrame(() => {
        const target = document.querySelector("[data-opening]")?.getBoundingClientRect();
        tl = gsap.timeline({
          delay: 0.05,
          onComplete: () => {
            el.remove();
            pending.current = false;
          },
        });
        if (target && target.top < window.innerHeight * 0.7) {
          tl.to(el, { x: target.left, y: target.top, width: target.width, height: target.height, borderRadius: 26, duration: 0.6, ease: "power3.inOut" }).to(el, { autoAlpha: 0, duration: 0.25 });
        } else {
          tl.to(el, { autoAlpha: 0, scale: 1.04, duration: 0.6, ease: "power2.out" });
        }
      });
      return () => {
        cancelAnimationFrame(raf);
        tl?.progress(1);
      };
    }
    const tl = gsap
      .timeline({
        delay: 0.05,
        onComplete: () => {
          pending.current = false;
          gsap.set(root.current, { autoAlpha: 0 });
        },
      })
      .to(".it-text", { autoAlpha: 0, y: -10, duration: 0.2 })
      .to(root.current, { clipPath: "circle(0% at 50% 50%)", duration: 0.55, ease: "power2.out" }, "-=0.1");
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={root} className="fixed inset-0 z-[90] invisible bg-void pointer-events-none grid place-items-center" aria-hidden={!name}>
      <div className="text-center">
        <p className="it-text label text-fog">{t.goingTo}</p>
        <p className="it-text type-x text-bone text-[9vw] md:text-[4.6vw] leading-none mt-4">{name}</p>
      </div>
    </div>
  );
}
