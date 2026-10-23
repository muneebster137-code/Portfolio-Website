"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media } from "@/lib/cases";

const ratioClass = { wide: "aspect-[16/9]", tall: "aspect-[9/16]", square: "aspect-square" } as const;

// One piece of work: an image, a muted looping video that plays only on screen, or a labelled slot to fill.
export function MediaFrame({ media, sizes = "50vw", className = "" }: { media: Media; sizes?: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ratio = ratioClass[media.ratio ?? "wide"];

  return (
    <figure className={`group relative ${className}`}>
      <div className={`relative ${ratio} overflow-hidden rounded-[18px] border border-hair bg-carbon`}>
        {media.src && media.kind === "video" ? (
          <video ref={video} src={media.src} muted loop playsInline preload="metadata" aria-label={media.alt} className="absolute inset-0 size-full object-cover" />
        ) : media.src ? (
          <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-4 text-center">
            <span>
              <span className="label text-fog block">To supply</span>
              <span className="block text-sm text-mist mt-2">{media.alt.replace(" (to supply)", "")}</span>
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}
