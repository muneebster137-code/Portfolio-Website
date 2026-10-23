"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInViewport } from "./useInViewport";

// Client-only wrappers so server pages can place 3D scenes. Each pauses while off screen.

const ServiceObjectScene = dynamic(() => import("./ServiceObjectScene"), { ssr: false });
const PackagingScene = dynamic(() => import("./PackagingScene"), { ssr: false });

export function ServiceObject({ index, className = "" }: { index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInViewport(ref, "0px");
  return (
    <div ref={ref} className={className}>
      <ServiceObjectScene index={index} active={active} />
    </div>
  );
}

export function PackagingModel({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <PackagingScene />
    </div>
  );
}
