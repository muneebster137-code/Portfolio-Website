// Shrinks every video under public/media without visible loss, and adds what the site needs around them.
//
//   node scripts/compress-videos.mjs          (needs ffmpeg; set FFMPEG=path\to\ffmpeg.exe if it is not on PATH)
//
// For each video it:
//   1. encodes a high-quality H.264 MP4 (CRF 22, fast start so it plays before it has fully downloaded),
//   2. compares it with the original frame by frame (SSIM) and only keeps it if it looks the same
//      (SSIM 0.97 or more) and is at least 20% smaller; otherwise the original stays untouched,
//   3. saves a poster frame next to it (name.poster.webp), shown until the video plays,
//   4. for the 16:9 films, also saves name.scrub.mp4: a light copy (960 wide, 24 fps) with a keyframe every few frames,
//      so the page can play it frame by frame as you scroll.
// Safe to re-run: files already done are skipped.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FFMPEG = process.env.FFMPEG || "ffmpeg";
const FFPROBE = FFMPEG.replace(/ffmpeg(\.exe)?$/i, (m) => m.replace("ffmpeg", "ffprobe"));
const ROOT = path.join(process.cwd(), "public", "media");
const DONE = path.join(process.cwd(), "scripts", ".compressed-videos.json");
const done = new Set(fs.existsSync(DONE) ? JSON.parse(fs.readFileSync(DONE, "utf8")) : []);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const videos = walk(ROOT).filter((f) => /\.(mp4|webm|mov)$/i.test(f) && !/\.(scrub|tmp)\.mp4$/i.test(f));
const mb = (f) => (fs.statSync(f).size / 1048576).toFixed(1);

function probe(file) {
  const out = execFileSync(FFPROBE, ["-v", "error", "-show_entries", "stream=codec_type,width,height", "-show_entries", "format=duration", "-of", "json", file], { encoding: "utf8" });
  const j = JSON.parse(out);
  const v = j.streams.find((s) => s.codec_type === "video");
  return { w: v.width, h: v.height, audio: j.streams.some((s) => s.codec_type === "audio"), duration: Number(j.format.duration) || 0 };
}

function ssim(a, b) {
  const r = spawnSync(FFMPEG, ["-hide_banner", "-i", a, "-i", b, "-lavfi", "[0:v]setpts=PTS-STARTPTS[x];[1:v]setpts=PTS-STARTPTS[y];[x][y]ssim", "-f", "null", "-"], { encoding: "utf8" });
  const m = /All:([0-9.]+)/.exec(r.stderr);
  return m ? Number(m[1]) : 0;
}

const run = (args) => {
  const r = spawnSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(r.stderr);
};

let saved = 0;
for (const file of videos) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  const base = file.replace(/\.(mp4|webm|mov)$/i, "");
  const info = probe(file);
  const long = Math.max(info.w, info.h);
  const scale = long > 1920 ? (info.w >= info.h ? "scale=1920:-2" : "scale=-2:1920") : "scale=trunc(iw/2)*2:trunc(ih/2)*2";

  if (!done.has(rel)) {
    const tmp = `${base}.tmp.mp4`;
    run(["-i", file, "-vf", scale, "-c:v", "libx264", "-preset", "medium", "-crf", "22", "-pix_fmt", "yuv420p", "-profile:v", "high", ...(info.audio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"]), "-movflags", "+faststart", tmp]);
    const quality = ssim(tmp, file);
    const before = fs.statSync(file).size;
    const after = fs.statSync(tmp).size;
    if (quality >= 0.97 && after < before * 0.8) {
      fs.rmSync(file);
      fs.renameSync(tmp, `${base}.mp4`);
      saved += before - after;
      console.log(`✓ ${rel}: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (SSIM ${quality.toFixed(3)})`);
    } else {
      fs.rmSync(tmp);
      console.log(`· ${rel}: kept original (SSIM ${quality.toFixed(3)}, ${(after / before * 100).toFixed(0)}% of size)`);
    }
    done.add(path.relative(ROOT, fs.existsSync(`${base}.mp4`) ? `${base}.mp4` : file).replaceAll("\\", "/"));
    fs.writeFileSync(DONE, JSON.stringify([...done].sort(), null, 1));
  }

  const current = fs.existsSync(`${base}.mp4`) ? `${base}.mp4` : file;
  const poster = `${base}.poster.webp`;
  if (!fs.existsSync(poster)) {
    const at = Math.min(1, info.duration * 0.1).toFixed(2);
    run(["-ss", at, "-i", current, "-frames:v", "1", "-vf", long > 1080 ? (info.w >= info.h ? "scale=1080:-2" : "scale=-2:1080") : "null", "-c:v", "libwebp", "-quality", "80", poster]);
    console.log(`  poster ${path.relative(ROOT, poster)}`);
  }

  // Films (16:9) get a scroll copy: 960 wide, 24 fps, a keyframe every 6 frames, no sound.
  const scrub = `${base}.scrub.mp4`;
  if (/\/film-\d+$/.test(base.replaceAll("\\", "/")) && info.w > info.h && !fs.existsSync(scrub)) {
    run(["-i", current, "-vf", "scale=960:-2,fps=24", "-c:v", "libx264", "-preset", "medium", "-crf", "30", "-g", "6", "-keyint_min", "6", "-sc_threshold", "0", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", scrub]);
    console.log(`  scroll copy ${path.relative(ROOT, scrub)} (${mb(scrub)} MB)`);
  }
}
console.log(`Done. Saved ${(saved / 1048576).toFixed(0)} MB.`);
