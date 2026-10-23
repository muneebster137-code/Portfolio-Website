import Image from "next/image";
import { RATIOS } from "@/lib/media-manifest";
import type { Resolved } from "@/lib/media.server";

// What shows until a file is dropped into a slot: the right shape, what goes here and at what size.
// In development the folder path is shown too, so it is obvious where the file belongs.
export function Placeholder({ slot }: { slot: Resolved }) {
  const r = RATIOS[slot.ratio];
  return (
    <div className="absolute inset-0 grid place-items-center p-4 text-center bg-carbon">
      <span className="max-w-full">
        <span className="block text-[14px] text-bone/70">{slot.label}</span>
        <span className="label text-fog block mt-2">{r.name} · {r.size}</span>
        {process.env.NODE_ENV !== "production" && <span className="block mt-2 font-mono text-[10px] text-fog/70 break-all">/{slot.path}</span>}
      </span>
    </div>
  );
}

// An image slot in its native shape. Server-rendered: no hooks, so it works inside any page.
export function MediaSlot({ slot, sizes = "50vw", className = "", rounded = "rounded-[10px]", priority = false }: { slot: Resolved; sizes?: string; className?: string; rounded?: string; priority?: boolean }) {
  return (
    <figure className={`relative overflow-hidden ${rounded} ring-1 ring-inset ring-hair bg-carbon ${className}`} style={{ aspectRatio: RATIOS[slot.ratio].css }}>
      {slot.src ? <Image src={slot.src} alt={slot.label} fill sizes={sizes} priority={priority} className="object-cover" /> : <Placeholder slot={slot} />}
    </figure>
  );
}
