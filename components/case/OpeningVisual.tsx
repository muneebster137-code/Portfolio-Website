"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The opening visual starts tilted back in space and settles flat as it scrolls into place.
export function OpeningVisual({ src, alt, accent, video, initials }: { src?: string; alt: string; accent: string; video: boolean; initials: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        plane.current,
        { rotationX: 22, scale: 0.86, y: 40 },
        { rotationX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top 20%", scrub: true } }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="[perspective:2000px]">
      <div ref={plane} className="relative aspect-[16/9] md:aspect-[21/9] origin-bottom">
        <div className="absolute inset-0 rounded-[26px] overflow-hidden border border-hair bg-carbon">
          {src ? (
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <span className="absolute inset-0 grid place-items-center type-x text-[30vw] md:text-[16vw] leading-none" style={{ color: accent }} aria-hidden="true">{initials}</span>
          )}
          {video && (
            <>
              <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                <span className="grid place-items-center size-24 md:size-28 rounded-full bg-bone text-void">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
              <span className="label absolute left-5 bottom-5 rounded-full bg-void border border-hair px-3 py-2">Opening reel · video to supply</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
