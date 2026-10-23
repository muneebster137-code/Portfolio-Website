"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { serviceBySlug } from "@/lib/site";
import { getCase } from "@/lib/cases";

function nameFor(path: string, fallback: string) {
  const [a, b] = path.split("/").filter(Boolean);
  if (!a) return "Home";
  if (a === "services") return b ? serviceBySlug(b)?.name ?? fallback : "Services";
  if (a === "case-studies") return b ? getCase(b)?.title ?? fallback : "Case studies";
  return a.charAt(0).toUpperCase() + a.slice(1);
}

// Between pages the dark closes in from where you clicked, like an iris, names where you are going,
// and opens again on the next page.
export function DreamTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const [name, setName] = useState("");

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
      setName(nameFor(url.pathname, a.textContent?.trim() || ""));

      const at = `${e.clientX}px ${e.clientY}px`;
      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .set(root.current, { autoAlpha: 1 })
        .fromTo(root.current, { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: 0.9, ease: "power3.inOut" })
        .fromTo(".it-text", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.35");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    const tl = gsap
      .timeline({
        delay: 0.2,
        onComplete: () => {
          pending.current = false;
          gsap.set(root.current, { autoAlpha: 0 });
        },
      })
      .to(".it-text", { autoAlpha: 0, y: -10, duration: 0.3 })
      .to(root.current, { clipPath: "circle(0% at 50% 50%)", duration: 0.9, ease: "power3.inOut" }, "-=0.05");
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={root} className="fixed inset-0 z-[90] invisible bg-void pointer-events-none grid place-items-center" aria-hidden={!name}>
      <div className="text-center">
        <p className="it-text label text-fog">Going to</p>
        <p className="it-text type-x text-bone text-[9vw] md:text-[4.6vw] leading-none mt-4">{name}</p>
      </div>
    </div>
  );
}
