import fs from "node:fs";
import path from "node:path";
import { EXTENSIONS, homeMedia, type Slot } from "./media-manifest";

export type Resolved = Slot & { src?: string };

const PUBLIC = path.join(process.cwd(), "public");

// Finds the file for a slot, whatever extension it was saved with. No file: no src, so a placeholder shows.
export function resolveSlot(slot: Slot): Resolved {
  for (const ext of EXTENSIONS[slot.kind]) {
    if (fs.existsSync(path.join(PUBLIC, slot.path + ext))) return { ...slot, src: `/${slot.path}${ext}` };
  }
  return { ...slot };
}

// Resolves every slot inside any nested object or array, leaving everything else as it is.
export function resolveAll<T>(value: T): T {
  if (Array.isArray(value)) return value.map(resolveAll) as T;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.path === "string" && typeof o.ratio === "string" && typeof o.kind === "string") return resolveSlot(o as unknown as Slot) as T;
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, resolveAll(v)])) as T;
  }
  return value;
}

// Pictures for the seven shelf objects, in shelf order (branding's is the story book's cover video).
export function shelfTextures(): (string | undefined)[][] {
  const e = homeMedia.engine;
  return [[e.social], [e.video], [e.print], [e.branding], [e.web], [e.packaging], e.decks].map((group) => group.map((s) => resolveSlot(s).src));
}
