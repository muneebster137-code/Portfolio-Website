"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { pointer, showcaseState, smooth, time } from "./store";
import { canvasQuality, sized, useTier } from "@/components/fx/perf";

// What an object shows before its picture is supplied: a quiet graphite card.
let placeholderUrl = "";
function placeholder() {
  if (placeholderUrl) return placeholderUrl;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#1B1E24";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(238,234,225,0.25)";
  ctx.strokeRect(12, 12, 232, 232);
  placeholderUrl = c.toDataURL();
  return placeholderUrl;
}

// Pictures for each object, in shelf order; they come from the media/home/engine slots.
export type ShelfTextures = (string | undefined)[][];

// Crop a 16:9 image to fill a surface of the given aspect.
function cover(tex: THREE.Texture, aspect: number) {
  const img = tex.image as { width: number; height: number } | undefined;
  const src = img ? img.width / img.height : 16 / 9;
  tex.colorSpace = THREE.SRGBColorSpace;
  if (src > aspect) {
    tex.repeat.set(aspect / src, 1);
    tex.offset.set((1 - aspect / src) / 2, 0);
  } else {
    tex.repeat.set(1, src / aspect);
    tex.offset.set(0, (1 - src / aspect) / 2);
  }
  tex.needsUpdate = true;
  return tex;
}

function discTexture(img: HTMLImageElement, label: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const ctx = c.getContext("2d")!;
  const mono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "monospace";
  const display = getComputedStyle(document.body).getPropertyValue("--font-archivo").trim() || "sans-serif";
  ctx.save();
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.clip();
  const s = Math.max(1024 / img.width, 1024 / img.height);
  ctx.drawImage(img, 512 - (img.width * s) / 2, 512 - (img.height * s) / 2, img.width * s, img.height * s);
  ctx.fillStyle = "rgba(6,7,8,0.25)";
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.fillStyle = "#EEEAE1";
  ctx.font = `900 92px ${display}`;
  ctx.fontStretch = "expanded";
  ctx.textAlign = "center";
  ctx.fillText(label, 512, 300);
  ctx.font = `500 30px ${mono}`;
  ctx.fillText("MMB 02-C · 100+ REELS", 512, 350);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(512, 512, 120, 0, Math.PI * 2);
  ctx.fillStyle = "#C9CDD3";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(512, 512, 60, 0, Math.PI * 2);
  ctx.globalCompositeOperation = "destination-out";
  ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Phone({ src }: { src?: string }) {
  const tex = useTexture(sized(src, 1080) ?? placeholder());
  const map = useMemo(() => cover(tex.clone(), 1.12 / 2.36), [tex]);
  return (
    <group>
      <RoundedBox args={[1.25, 2.5, 0.12]} radius={0.14} smoothness={6}>
        <meshStandardMaterial color="#0E1013" roughness={0.3} metalness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[1.12, 2.36]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Disc({ src }: { src?: string }) {
  const tex = useTexture(sized(src, 1080) ?? placeholder());
  const top = useMemo(() => discTexture(tex.image as HTMLImageElement, "REELS"), [tex]);
  const disc = useRef<THREE.Mesh>(null);
  useFrame((_, rawDt) => {
    const dt = rawDt * time.scale;
    if (disc.current) disc.current.rotation.y += dt * 0.5;
  });
  return (
    <group rotation={[Math.PI / 2 - 0.35, 0, 0.25]}>
      <mesh ref={disc}>
        <cylinderGeometry args={[1.35, 1.35, 0.035, 96]} />
        <meshStandardMaterial attach="material-0" color="#D9DCE0" metalness={0.9} roughness={0.25} />
        <meshStandardMaterial attach="material-1" map={top} transparent roughness={0.35} />
        <meshStandardMaterial attach="material-2" color="#C9CDD3" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Magazine({ src }: { src?: string }) {
  const tex = useTexture(sized(src, 1080) ?? placeholder());
  const map = useMemo(() => cover(tex.clone(), 1.7 / 2.3), [tex]);
  return (
    <group>
      {[2, 1].map((k) => (
        <mesh key={k} position={[k * 0.06, -k * 0.05, -k * 0.05]} rotation={[0, 0, -k * 0.04]}>
          <boxGeometry args={[1.7, 2.3, 0.04]} />
          <meshStandardMaterial color="#E6E2D8" roughness={0.9} />
        </mesh>
      ))}
      <mesh>
        <boxGeometry args={[1.7, 2.3, 0.05]} />
        <meshStandardMaterial attach="material-0" color="#EEEAE1" />
        <meshStandardMaterial attach="material-1" color="#EEEAE1" />
        <meshStandardMaterial attach="material-2" color="#EEEAE1" />
        <meshStandardMaterial attach="material-3" color="#EEEAE1" />
        <meshStandardMaterial attach="material-4" map={map} roughness={0.5} />
        <meshStandardMaterial attach="material-5" color="#EEEAE1" />
      </mesh>
    </group>
  );
}

// The cover of the brand book: a looping video once one is supplied, until then a quiet cloth cover.
function bookCoverTexture() {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 1024;
  const ctx = c.getContext("2d")!;
  const mono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() || "monospace";
  const display = getComputedStyle(document.body).getPropertyValue("--font-archivo").trim() || "sans-serif";
  ctx.fillStyle = "#12B07F";
  ctx.fillRect(0, 0, 768, 1024);
  ctx.strokeStyle = "rgba(6,7,8,0.55)";
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 672, 928);
  ctx.fillStyle = "#060708";
  ctx.font = `500 26px ${mono}`;
  ctx.fillText("MMB 04-C", 84, 112);
  ctx.textAlign = "right";
  ctx.fillText("N°04", 684, 112);
  ctx.textAlign = "left";
  ctx.font = `900 112px ${display}`;
  ctx.fontStretch = "expanded";
  ["The", "brand", "book"].forEach((w, i) => ctx.fillText(w, 80, 600 + i * 108));
  ctx.font = `500 24px ${mono}`;
  ctx.fillText("10+ BRANDS FROM SCRATCH", 84, 930);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const isVideo = (src?: string) => !!src && /\.(mp4|webm|mov)$/i.test(src);

function useCoverTexture(src: string | undefined, aspect: number) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!isVideo(src)) {
      const t = bookCoverTexture();
      setTex(t);
      return () => t.dispose();
    }
    const v = document.createElement("video");
    Object.assign(v, { src, muted: true, loop: true, playsInline: true, crossOrigin: "anonymous", preload: "auto" });
    const t = new THREE.VideoTexture(v);
    t.colorSpace = THREE.SRGBColorSpace;
    const fit = () => {
      t.image = v;
      const ratio = v.videoWidth / v.videoHeight || aspect;
      if (ratio > aspect) {
        t.repeat.set(aspect / ratio, 1);
        t.offset.set((1 - aspect / ratio) / 2, 0);
      } else {
        t.repeat.set(1, ratio / aspect);
        t.offset.set(0, (1 - ratio / aspect) / 2);
      }
      setTex(t);
    };
    v.addEventListener("loadedmetadata", fit, { once: true });
    v.play().catch(() => {});
    return () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
      t.dispose();
    };
  }, [src, aspect]);
  return tex;
}

// Page edges: fine stripes so the block reads as paper, not a slab.
let edgeTex: THREE.CanvasTexture | null = null;
function pageEdges() {
  if (edgeTex) return edgeTex;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#EEEAE1";
  ctx.fillRect(0, 0, 64, 256);
  for (let x = 0; x < 64; x += 3) {
    ctx.fillStyle = `rgba(120,110,95,${0.12 + Math.random() * 0.18})`;
    ctx.fillRect(x, 0, 1, 256);
  }
  edgeTex = new THREE.CanvasTexture(c);
  edgeTex.colorSpace = THREE.SRGBColorSpace;
  return edgeTex;
}

const BW = 1.72;
const BH = 2.3;
const BD = 0.34;

// Branding: a hardback story book, standing upright and centred like the others. The cover swings open a little
// and closes again, as if someone is about to start reading.
function StoryBook({ src }: { src?: string }) {
  const map = useCoverTexture(src, (BW - 0.02) / (BH - 0.02));
  const board = useRef<THREE.Group>(null);
  useFrame(() => {
    if (board.current) board.current.rotation.y = -(0.1 + 0.32 * (0.5 - 0.5 * Math.cos(time.t * 0.7)));
  });
  const cloth = "#0E8A63";
  const edges = pageEdges();
  return (
    <group rotation={[0, 0.32, 0]}>
      {/* Back board */}
      <mesh position={[0, 0, -BD / 2 + 0.02]}>
        <boxGeometry args={[BW, BH, 0.04]} />
        <meshStandardMaterial color={cloth} roughness={0.85} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[BW - 0.08, BH - 0.08, BD - 0.08]} />
        <meshStandardMaterial attach="material-0" map={edges} roughness={0.95} />
        <meshStandardMaterial attach="material-1" color="#E6E1D6" roughness={0.95} />
        <meshStandardMaterial attach="material-2" map={edges} roughness={0.95} />
        <meshStandardMaterial attach="material-3" map={edges} roughness={0.95} />
        <meshStandardMaterial attach="material-4" color="#F2EFE7" roughness={0.95} />
        <meshStandardMaterial attach="material-5" color="#F2EFE7" roughness={0.95} />
      </mesh>
      {/* Spine */}
      <mesh position={[-BW / 2, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[BD / 2, BD / 2, BH, 24, 1, false, Math.PI, Math.PI]} />
        <meshStandardMaterial color={cloth} roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      {/* Front board, hinged at the spine */}
      <group ref={board} position={[-BW / 2, 0, BD / 2 - 0.02]}>
        <mesh position={[BW / 2, 0, 0]}>
          <boxGeometry args={[BW, BH, 0.04]} />
          <meshStandardMaterial attach="material-0" color={cloth} roughness={0.85} />
          <meshStandardMaterial attach="material-1" color={cloth} roughness={0.85} />
          <meshStandardMaterial attach="material-2" color={cloth} roughness={0.85} />
          <meshStandardMaterial attach="material-3" color={cloth} roughness={0.85} />
          <meshStandardMaterial attach="material-4" color={cloth} roughness={0.85} />
          <meshStandardMaterial attach="material-5" color="#E9E4D8" roughness={0.9} />
        </mesh>
        {map && (
          <mesh position={[BW / 2, 0, 0.021]}>
            <planeGeometry args={[BW - 0.02, BH - 0.02]} />
            <meshStandardMaterial map={map} roughness={0.55} toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function Browser({ src }: { src?: string }) {
  const tex = useTexture(sized(src, 1080) ?? placeholder());
  const map = useMemo(() => cover(tex.clone(), 2.7 / 1.5), [tex]);
  return (
    <group>
      <RoundedBox args={[2.9, 1.85, 0.06]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#15181D" roughness={0.4} metalness={0.3} />
      </RoundedBox>
      <mesh position={[0, -0.1, 0.035]}>
        <planeGeometry args={[2.7, 1.5]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {[0, 1, 2].map((k) => (
        <mesh key={k} position={[-1.3 + k * 0.12, 0.8, 0.035]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#5E626B" />
        </mesh>
      ))}
    </group>
  );
}

function PackBox({ src }: { src?: string }) {
  const tex = useTexture(sized(src, 1080) ?? placeholder());
  const front = useMemo(() => cover(tex.clone(), 1.5 / 2), [tex]);
  return (
    <mesh rotation={[0, 0.5, 0]}>
      <boxGeometry args={[1.5, 2, 1]} />
      <meshStandardMaterial attach="material-0" color="#FF5FA2" roughness={0.5} />
      <meshStandardMaterial attach="material-1" color="#FF5FA2" roughness={0.5} />
      <meshStandardMaterial attach="material-2" color="#F27BB0" roughness={0.5} />
      <meshStandardMaterial attach="material-3" color="#E0538F" roughness={0.5} />
      <meshStandardMaterial attach="material-4" map={front} roughness={0.45} />
      <meshStandardMaterial attach="material-5" color="#FF5FA2" roughness={0.5} />
    </mesh>
  );
}

function Slides({ srcs = [] }: { srcs?: (string | undefined)[] }) {
  const [a, b, c] = useTexture([0, 1, 2].map((k) => sized(srcs[k], 828) ?? placeholder()));
  const maps = useMemo(() => [c, b, a].map((t) => cover(t.clone(), 16 / 9)), [a, b, c]);
  return (
    <group>
      {maps.map((m, i) => (
        <mesh key={i} position={[(2 - i) * 0.28, (2 - i) * 0.22, -(2 - i) * 0.3]} rotation={[0, 0, (2 - i) * 0.05]}>
          <boxGeometry args={[2.6, 1.46, 0.03]} />
          <meshStandardMaterial attach="material-0" color="#EEEAE1" />
          <meshStandardMaterial attach="material-1" color="#EEEAE1" />
          <meshStandardMaterial attach="material-2" color="#EEEAE1" />
          <meshStandardMaterial attach="material-3" color="#EEEAE1" />
          <meshStandardMaterial attach="material-4" map={m} roughness={0.5} />
          <meshStandardMaterial attach="material-5" color="#EEEAE1" />
        </mesh>
      ))}
    </group>
  );
}

// One shelf object by index, with its pictures.
export function ShelfObject({ index, textures = [] }: { index: number; textures?: (string | undefined)[] }) {
  const [a] = textures;
  switch (index) {
    case 0: return <Phone src={a} />;
    case 1: return <Disc src={a} />;
    case 2: return <Magazine src={a} />;
    case 3: return <StoryBook src={a} />;
    case 4: return <Browser src={a} />;
    case 5: return <PackBox src={a} />;
    default: return <Slides srcs={textures} />;
  }
}

// Seven objects on an arc, like a shelf of records; the one in front turns slowly to show itself.
function Arc({ textures, shadows }: { textures: ShelfTextures; shadows: number }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const target = useMemo(() => new THREE.Vector3(), []);
  const { viewport } = useThree();

  useFrame((_, rawDt) => {
    const dt = rawDt * time.scale;
    const head = showcaseState.head;
    const t = time.t;
    const k = 1 - Math.pow(0.00002, dt);
    groups.current.forEach((g, i) => {
      if (!g) return;
      const d = i - head;
      const a = d * 0.62;
      const R = 7;
      const near = Math.max(0, 1 - Math.abs(d));
      // Portrait screens: the object sits a little lower, between the heading and the number.
      target.set(Math.sin(a) * R, Math.abs(d) * -0.1 + Math.sin(t * 0.8 + i) * 0.05 - (viewport.aspect < 1 ? 0.35 : 0), Math.cos(a) * R - R);
      g.position.lerp(target, k);
      const spin = near * Math.sin(t * 0.5) * 0.35;
      g.rotation.set(0.12 - pointer.y * 0.1 * near, -a * 0.9 + spin + pointer.x * 0.25 * near, (1 - near) * -0.18 * Math.sign(d));
      // Smaller windows get smaller objects so the credits and proof lines stay clear.
      const fit = Math.min(1, viewport.width / 8.5 + (viewport.aspect < 1 ? 0.2 : 0), viewport.height / 4.6);
      const s = (0.82 + 0.3 * smooth(0, 1, near)) * fit;
      g.scale.lerp(target.set(s, s, s), k);

      // Only the object in front catches the light; the rest stay graphite in the dark.
      const lit = 0.16 + 0.84 * smooth(0.2, 1, near);
      g.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (!mat.color) return;
          if (!mat.userData.base) mat.userData.base = mat.color.clone();
          mat.color.copy(mat.userData.base as THREE.Color).multiplyScalar(lit);
          if (mat.emissive) mat.emissiveIntensity = lit;
        });
      });
    });
  });

  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i} ref={(g) => { groups.current[i] = g; }} position={[i * 3, 0, -6]}>
          <Suspense fallback={null}>
            <ShelfObject index={i} textures={textures[i]} />
          </Suspense>
        </group>
      ))}
      {shadows > 0 && <ContactShadows position={[0, -1.85, 0]} opacity={0.7} scale={22} blur={2.4} far={4} resolution={shadows} color="#000000" />}
    </>
  );
}

export default function ServiceObjects({ active, textures }: { active: boolean; textures: ShelfTextures }) {
  const q = canvasQuality(useTier());
  return (
    <Canvas flat dpr={q.dpr} frameloop={active ? "always" : "never"} camera={{ position: [0, 0.35, 7.6], fov: 32 }} gl={{ antialias: q.antialias, alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.9} />
      <spotLight position={[0, 6, 6]} angle={0.45} penumbra={0.9} intensity={60} distance={20} />
      <directionalLight position={[-5, 2, 3]} intensity={0.35} color="#EEEAE1" />
      <Arc textures={textures} shadows={q.shadows} />
    </Canvas>
  );
}
