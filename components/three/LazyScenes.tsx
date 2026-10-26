"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInViewport } from "./useInViewport";

// Client-only wrappers so server pages can place 3D scenes. Each pauses while off screen.

const ServiceObjectScene = dynamic(() => import("./ServiceObjectScene"), { ssr: false });
const PackagingScene = dynamic(() => import("./PackagingScene"), { ssr: false });

export function ServiceObject({ index, textures, className = "" }: { index: number; textures?: (string | undefined)[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewport(ref, "0px");
  return (
    <div ref={ref} className={className}>
      <ServiceObjectScene index={index} active={active} textures={textures} />
    </div>
  );
}

export function PackagingModel({ modelSrc, boxTexture, className = "" }: { modelSrc?: string; boxTexture?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewport(ref, "0px");
  return (
    <div ref={ref} className={className}>
      <PackagingScene modelSrc={modelSrc} boxTexture={boxTexture} active={active} />
    </div>
  );
}
