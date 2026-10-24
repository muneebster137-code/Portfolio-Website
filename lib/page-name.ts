import { serviceBySlug } from "./site";
import { getCase } from "./cases";

// What to call a page: in full for the page transition, short for the dream map in the footer.
export function nameFor(path: string, fallback = "", short = false) {
  const [a, b] = path.split("/").filter(Boolean);
  if (!a) return "Home";
  if (a === "services") {
    const s = b ? serviceBySlug(b) : undefined;
    return b ? (short ? s?.short : s?.name) ?? fallback : "Services";
  }
  if (a === "case-studies") {
    const c = b ? getCase(b) : undefined;
    return b ? (short ? c?.shortTitle : c?.title) ?? fallback : "Case studies";
  }
  return a.charAt(0).toUpperCase() + a.slice(1);
}
