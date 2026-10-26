"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { SKETCHED, dreamState, pointer, smooth, time } from "./store";
import { FIRST, SketchSheet, TOTAL, makeWorkSide, toSheet } from "./paperTextures";
import { pencil as pencilSound } from "@/components/fx/sound";
import { canvasQuality, getTier, sized, useTier } from "@/components/fx/perf";

const W = 2.1;
const H = 2.97;
const SEG = 160;
const RADIUS = 0.2; // curl radius of the turning page, local units
const CAM_Z = 6.5;
const BOW = 0.045; // paper never lies quite flat: a slight bow across the sheet

const bowAt = (x: number) => BOW * (1 - (2 * x / W) ** 2);

// Soft-edged textures for the lamp's pool of light and the sheet's shadow.
function glowTexture(inner: string, outer: string, round = false) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  if (round) {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  } else {
    ctx.filter = "blur(18px)";
    ctx.fillStyle = inner;
    ctx.fillRect(40, 40, 176, 176);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// A half-sharpened pencil, built point first along +y so it can be placed by its tip.
function PencilModel() {
  return (
    <group>
      <mesh position={[0, 0.025, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.014, 0.05, 6]} />
        <meshStandardMaterial color="#2A2C31" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.042, 0.014, 0.16, 6]} />
        <meshStandardMaterial color="#D8B48A" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.76, 0]}>
        <cylinderGeometry args={[0.042, 0.042, 1.1, 6]} />
        <meshStandardMaterial color="#1B1E24" roughness={0.45} metalness={0.2} flatShading />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.08, 18]} />
        <meshStandardMaterial color="#B9BDC4" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.435, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.09, 18]} />
        <meshStandardMaterial color="#FF4A1C" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Where the pencil lies before the story starts, and the angle it is held at while drawing.
const REST_TIP = new THREE.Vector3(-0.55, -0.98, 0.05);
const REST_DIR = new THREE.Vector3(0.92, -0.12, 0.04).normalize();
const DRAW_DIR = new THREE.Vector3(0.4, -0.36, 0.84).normalize();
const UP = new THREE.Vector3(0, 1, 0);
const LEAVE = new THREE.Vector3(1.1, -0.6, 2.2);

// One sheet of A4 carries the whole intro: it waits under a lamp with a pencil on it, gets sketched on,
// then turns like a page to show the work printed on its back, and the camera dives into it.
function Sheet({ backSrc }: { backSrc?: string }) {
  const group = useRef<THREE.Group>(null);
  const pencil = useRef<THREE.Group>(null);
  const extras = useRef<THREE.Group>(null);
  const { camera, viewport } = useThree();
  const [workTex, setWorkTex] = useState<THREE.Texture | null>(null);
  const lastCurl = useRef(-1);
  const started = useRef(false);
  const curlCentre = useRef(0);
  // The cursor on the sheet, in sheet units, while the visitor draws.
  const hover = useRef<{ x: number; y: number } | null>(null);
  const hoverW = useRef(0);
  const lastDrawn = useRef(0);
  const sketched = useRef(false);

  const sketch = useMemo(() => new SketchSheet({ high: 1, mid: 0.75, low: 0.5 }[getTier()]), []);
  const geo = useMemo(() => new THREE.PlaneGeometry(W, H, SEG, 1), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const glow = useMemo(() => glowTexture("rgba(255,236,206,0.17)", "rgba(255,236,206,0)", true), []);
  const shadow = useMemo(() => glowTexture("rgba(0,0,0,0.75)", "rgba(0,0,0,0)"), []);

  useEffect(() => {
    // A supplied back image (media/home/sheet/back) wins; otherwise the sheet shows a contact sheet of the work.
    const t = backSrc ? new THREE.TextureLoader().load(sized(backSrc, 1200)!) : makeWorkSide(() => {});
    t.colorSpace = THREE.SRGBColorSpace;
    // The back is seen mirrored once the page has turned, so flip it to read the right way round.
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = -1;
    setWorkTex(t);
    return () => {
      dreamState.sketch = null;
      t.dispose();
      sketch.texture.dispose();
      sketch.mask.dispose();
      geo.dispose();
      glow.dispose();
      shadow.dispose();
    };
  }, [sketch, geo, backSrc, glow, shadow]);

  const tmp = useMemo(
    () => ({ p: new THREE.Vector3(), q: new THREE.Quaternion(), e: new THREE.Euler(), pc: new THREE.Vector3(), qc: new THREE.Quaternion(), tip: new THREE.Vector3(), aim: new THREE.Vector3(), dir: new THREE.Vector3(), a: new THREE.Vector3() }),
    []
  );

  useFrame((_, rawDt) => {
    const dt = rawDt * time.scale;
    const g = group.current;
    if (!g) return;
    const p = dreamState.progress;
    const t = time.t;
    // Below roughly 5:4 there is no room beside the headline, so the sheet waits underneath it.
    const narrow = viewport.aspect < 1.25;
    // Progress is already smoothed by the scroll timeline; only a light damping on top, and none
    // on the first frame so the sheet starts where it belongs instead of flying in from the centre.
    const k = started.current ? 1 - Math.pow(1e-9, dt) : 1;
    started.current = true;

    const center = smooth(0.1, 0.22, p);
    const turn = smooth(0.62, 0.86, p);
    const dive = smooth(0.86, 1, p);
    const sketchDrawn = Math.max(FIRST * dreamState.first, smooth(0.24, 0.5, p));

    sketch.draw(sketchDrawn, smooth(0.5, 0.56, p), 1 - smooth(0.12, 0.22, p));

    // The pencil is heard while it draws: the sketch as you scroll, or your own marks.
    const inked = Math.abs(sketchDrawn - lastDrawn.current) * TOTAL + sketch.doodleInk;
    lastDrawn.current = sketchDrawn;
    sketch.doodleInk = 0;
    if (dt > 0) pencilSound(inked / dt);

    // Idle: off to the side, turning slowly. Centre: square to the viewer, ready to be drawn on.
    const idlePos = narrow ? tmp.p.set(viewport.width * 0.18, -viewport.height * 0.8, -1) : tmp.p.set(viewport.width * 0.29, -0.05, 0);
    tmp.e.set(0.1 + pointer.y * 0.12, -0.42 + Math.sin(t * 0.4) * 0.12 + pointer.x * 0.22, -0.05);
    tmp.q.setFromEuler(tmp.e);
    const idleScale = narrow ? 0.45 : Math.min(0.74, viewport.height / 5.2);

    // While the page turns, the sheet leans a little so the curl reads in depth.
    tmp.pc.set(0, narrow ? 0.26 : 0.22, 0);
    tmp.e.set(pointer.y * 0.04 + turn * (1 - turn) * 0.5, pointer.x * 0.06 - turn * (1 - turn) * 0.9, Math.sin(t * 0.5) * 0.01);
    tmp.qc.setFromEuler(tmp.e);
    idlePos.lerp(tmp.pc, center);
    tmp.q.slerp(tmp.qc, center);
    const turnShrink = narrow ? 1 - 0.32 * Math.sin(Math.PI * turn) : 1;
    const scale = THREE.MathUtils.lerp(idleScale, narrow ? 0.66 : 0.8, center) * turnShrink;
    // Keep the sheet's visible middle on screen while it curls (its shape shifts sideways as it turns).
    idlePos.x -= curlCentre.current * scale * center;

    g.position.lerp(idlePos, k);
    g.quaternion.slerp(tmp.q, k);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, k));

    // Lamp light and shadow belong to the desk, not the dream: they go before the page turns.
    if (extras.current) {
      const fade = 1 - smooth(0.56, 0.64, p);
      extras.current.visible = fade > 0.01;
      extras.current.children.forEach((m) => (((m as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = fade));
    }

    // The pencil: resting on the sheet, following the cursor while the visitor draws, drawing the sketch
    // as the story is told, then lifted away before the page turns.
    const pen = pencil.current;
    if (pen) {
      const engage = smooth(0.14, 0.24, p) * (1 - smooth(0.5, 0.58, p));
      const wantHover = hover.current && p < 0.1 ? 1 : 0;
      hoverW.current += (wantHover - hoverW.current) * (1 - Math.pow(0.0001, dt));
      const drawW = Math.max(engage, hoverW.current);
      if (engage > 0.001) {
        const [x, y] = toSheet(sketch.tipAt(sketchDrawn), W, H);
        tmp.aim.set(x, y, 0);
      } else if (hover.current) tmp.aim.set(hover.current.x, hover.current.y, 0);
      tmp.aim.z = bowAt(tmp.aim.x) + 0.006;
      const target = tmp.a.copy(REST_TIP).lerp(tmp.aim, drawW);
      const leave = smooth(0.5, 0.6, p);
      target.addScaledVector(LEAVE, leave);
      tmp.tip.copy(pen.position).lerp(target, started.current ? 1 - Math.pow(1e-7, dt) : 1);
      pen.position.copy(tmp.tip);
      tmp.dir.copy(REST_DIR).lerp(DRAW_DIR, drawW).normalize();
      pen.quaternion.setFromUnitVectors(UP, tmp.dir);
      pen.scale.setScalar(Math.max(0.0001, 1 - leave));
      pen.visible = leave < 0.999;
    }

    // Dive: the camera falls into the work on the back of the page.
    camera.position.set(0, THREE.MathUtils.lerp(0, 0.22, dive), THREE.MathUtils.lerp(CAM_Z, 0.9, dive * dive));
    camera.rotation.set(0, 0, 0);

    // Page curl: a cylinder rolls from the right edge to the left. Paper past the roll line wraps
    // over it and lands face down on the left, so the turned page shows its back.
    const curl = turn;
    if (Math.abs(curl - lastCurl.current) > 0.0005) {
      lastCurl.current = curl;
      const pos = geo.attributes.position.array as Float32Array;
      const xc = THREE.MathUtils.lerp(W / 2, -W / 2 - Math.PI * RADIUS, curl);
      const shift = (W + Math.PI * RADIUS) * curl; // keeps the sheet centred as it lands on the other side
      for (let i = 0; i < pos.length; i += 3) {
        const x = base[i];
        const d = x - xc;
        let nx = x;
        let nz = 0;
        if (d > 0) {
          if (d < Math.PI * RADIUS) {
            const a = d / RADIUS;
            nx = xc + RADIUS * Math.sin(a);
            nz = RADIUS * (1 - Math.cos(a));
          } else {
            nx = xc - (d - Math.PI * RADIUS);
            nz = 2 * RADIUS;
          }
        }
        pos[i] = nx + shift;
        pos[i + 2] = nz + bowAt(x) * (1 - curl);
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
      geo.computeBoundingBox();
      const box = geo.boundingBox!;
      curlCentre.current = (box.min.x + box.max.x) / 2;
    }
  });

  // Drawing on the sheet with the cursor (mouse only, and only before the story starts).
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.pointerType !== "mouse" || dreamState.progress > 0.1 || !e.uv) {
      hover.current = null;
      return;
    }
    e.stopPropagation();
    const fresh = !hover.current;
    hover.current = { x: (e.uv.x - 0.5) * W, y: (e.uv.y - 0.5) * H };
    sketch.scribble(e.uv.x, e.uv.y, fresh);
    if (!sketched.current && sketch.inkTotal > 500) {
      sketched.current = true;
      dreamState.sketch = () => sketch.exportDoodle();
      window.dispatchEvent(new Event(SKETCHED));
    }
  };
  const onLeave = () => {
    hover.current = null;
  };

  return (
    <group ref={group} scale={0.74}>
      <group ref={extras}>
        <mesh position={[0.15, -0.1, -0.6]} renderOrder={-2}>
          <planeGeometry args={[7, 7]} />
          <meshBasicMaterial map={glow} transparent depthWrite={false} toneMapped={false} />
        </mesh>
        <mesh position={[0.1, -0.13, -0.09]} renderOrder={-1}>
          <planeGeometry args={[W * 1.45, H * 1.4]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
      <mesh geometry={geo} onPointerMove={onMove} onPointerOut={onLeave}>
        <meshStandardMaterial map={sketch.texture} alphaMap={sketch.mask} transparent alphaTest={0.02} roughness={0.92} metalness={0} side={THREE.FrontSide} />
      </mesh>
      {workTex && (
        <mesh geometry={geo}>
          <meshStandardMaterial map={workTex} emissiveMap={workTex} emissive="#ffffff" emissiveIntensity={0.55} alphaMap={sketch.mask} transparent alphaTest={0.02} roughness={0.7} side={THREE.BackSide} />
        </mesh>
      )}
      <group ref={pencil} position={REST_TIP.toArray()}>
        <PencilModel />
      </group>
    </group>
  );
}

export default function PaperScene({ active, backSrc }: { active: boolean; backSrc?: string }) {
  const q = canvasQuality(useTier());
  return (
    <Canvas
      flat
      dpr={q.dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAM_Z], fov: 32, near: 0.05, far: 60 }}
      gl={{ antialias: q.antialias, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[2.5, 4, 5]} intensity={2.1} color="#FFF6E8" />
      <directionalLight position={[-4, 1, -2]} intensity={0.5} color="#EEEAE1" />
      <Sheet backSrc={backSrc} />
    </Canvas>
  );
}
