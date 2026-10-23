// Builds the public/media folder tree from lib/media-manifest.ts and writes public/media/README.md,
// listing every slot with its file path, format and recommended size.
// Run: node scripts/media-folders.ts   (safe to re-run; it never touches files you have added)
import fs from "node:fs";
import path from "node:path";
import { allSlots, EXTENSIONS, RATIOS } from "../lib/media-manifest.ts";

const root = path.join(process.cwd(), "public");
const slots = allSlots();
const dirs = new Set(slots.map((s) => path.dirname(s.path)));

for (const d of dirs) {
  const full = path.join(root, d);
  fs.mkdirSync(full, { recursive: true });
  const keep = path.join(full, ".gitkeep");
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, "");
}

const has = (p: string, kind: keyof typeof EXTENSIONS) => EXTENSIONS[kind].find((e) => fs.existsSync(path.join(root, p + e)));

const groups = new Map<string, string[]>();
for (const s of slots) {
  const group = s.path.split("/").slice(1, 3).join(" / ");
  const found = has(s.path, s.kind);
  const fmt = s.kind === "image" ? `${RATIOS[s.ratio].name}, ${RATIOS[s.ratio].size}` : s.kind === "video" ? `video, ${RATIOS[s.ratio].name} (${RATIOS[s.ratio].size})` : "3D model";
  const line = `| ${found ? "✓" : " "} | \`${s.path}\` | ${s.label} | ${fmt} | ${EXTENSIONS[s.kind].join(" ")} |`;
  groups.set(group, [...(groups.get(group) ?? []), line]);
}

const md = [
  "# Site media",
  "",
  "Every image, video and 3D model on the site lives in this folder. To add or change one, save the file at the path",
  "below with any of the listed extensions (the file name stays the same, only the extension may differ), then",
  "refresh. Until a file exists, the site shows a placeholder in the right shape.",
  "",
  "✓ means a file is already there. Re-run `node scripts/media-folders.ts` after adding files to refresh this list.",
  "",
  ...[...groups.entries()].flatMap(([g, lines]) => [`## ${g}`, "", "| | Path (no extension) | What | Format and size | Extensions |", "|---|---|---|---|---|", ...lines, ""]),
].join("\n");

fs.writeFileSync(path.join(root, "media", "README.md"), md);
console.log(`${slots.length} slots, ${dirs.size} folders, README written.`);
