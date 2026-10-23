"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CARD_H, CARD_W } from "./swatchTexture";
import { heroState, pointer, smooth } from "./store";
import { useSwatchTextures } from "./useSwatchTextures";
import { Dust } from "./Dust";

// Rivet position on the card, in card units from its centre. The fan pivots here.
const PIVOT = new THREE.Vector2(CARD_W / 2 - 0.193, -CARD_H / 2 + 0.193);
const CAM_Z = 8;

function SwatchBook({ textures, fixedProgress }: { textures: THREE.CanvasTexture[]; fixedProgress?: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const { camera, viewport } = useThree();
  const t = useMemo(
    () => ({
      fanM: new THREE.Matrix4(),
      cardM: new THREE.Matrix4(),
      pA: new THREE.Vector3(),
      pB: new THREE.Vector3(),
      qA: new THREE.Quaternion(),
      qB: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      e: new THREE.Euler(),
      v: new THREE.Vector3(),
    }),
    []
  );
  const n = textures.length;

  useFrame((state, dt) => {
    // A fixed progress freezes the book open, for pages that show it without the scroll story.
    const p = fixedProgress ?? heroState.progress;
    const intro = fixedProgress === undefined ? heroState.intro : 1;
    const time = state.clock.elapsedTime;
    const narrow = viewport.aspect < 1;

    // Stage weights: fan opens (0-0.3), cards lift into a curved wall around the viewer (0.3-0.72),
    // the bone card flies forward and becomes the next page (0.78-0.98).
    const open = smooth(0, 0.3, p);
    const lift = smooth(0.28, 0.7, p);
    const final = smooth(0.78, 0.97, p);

    const yaw = THREE.MathUtils.lerp(0.55, -0.55, smooth(0.36, 0.76, p)) * lift * (1 - smooth(0.72, 0.84, p));
    camera.rotation.set(pointer.y * 0.04 * (1 - final), yaw - pointer.x * 0.06 * (1 - final), 0);
    camera.position.set(0, 0, CAM_Z);

    // Pivot sits right of centre and low; the fan swings clockwise into the empty right side.
    const { width: vw, height: vh } = viewport;
    const origin = narrow ? t.v.set(vw * 0.12, -vh * 0.08, 0) : t.v.set(vw * 0.27, -vh * 0.25, 0);
    const fanScale = Math.min(narrow ? vw / 5.6 : vh / 7, 1);
    t.e.set(0.2 + Math.sin(time * 0.4) * 0.03, -0.38 + pointer.x * 0.08, 0.04);
    t.fanM.compose(origin, t.qA.setFromEuler(t.e), t.s.setScalar(fanScale));

    const spread = -(0.04 + 0.13 * intro + 0.07 * open);

    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;

      // Fan: rotate around the rivet, stacked slightly in depth.
      const a = i * spread;
      const cx = -PIVOT.x * Math.cos(a) + PIVOT.y * Math.sin(a);
      const cy = -PIVOT.x * Math.sin(a) - PIVOT.y * Math.cos(a);
      t.cardM.compose(t.pA.set(cx, cy, -i * 0.025), t.qA.setFromEuler(t.e.set(0, 0, a)), t.s.setScalar(1));
      t.cardM.premultiply(t.fanM);
      t.cardM.decompose(t.pA, t.qA, t.s);
      let cardScale = THREE.MathUtils.lerp(t.s.x, 0.8, lift);

      // Curved wall: cards stand on an arc around the camera and face it.
      const theta = (i - (n - 1) / 2) * 0.3;
      const R = 6.6;
      t.pB.set(Math.sin(theta) * R, Math.sin(i * 1.7 + time * 0.6) * 0.12 + (i % 2 ? 0.25 : -0.25), CAM_Z - Math.cos(theta) * R);
      t.qB.setFromEuler(t.e.set(0, -theta, (i % 2 ? 1 : -1) * 0.03));

      t.pA.lerp(t.pB, lift);
      t.qA.slerp(t.qB, lift);

      // Finale: the last (bone) card fills the frame; the rest scatter back into the field.
      // The card's bone label strip is what lands centred in frame.
      if (i === n - 1) {
        t.pB.set(0, CARD_H * 0.33, CAM_Z - 1.4);
        t.qB.identity();
        t.pA.lerp(t.pB, final);
        t.qA.slerp(t.qB, final);
        cardScale = THREE.MathUtils.lerp(cardScale, 1, final);
      } else if (final > 0) {
        t.pA.multiplyScalar(1 + final * 1.6);
        t.pA.z -= final * 8;
      }

      const k = 1 - Math.pow(0.0008, dt);
      mesh.position.lerp(t.pA, k);
      mesh.quaternion.slerp(t.qA, k);
      mesh.scale.setScalar(cardScale * (0.35 + 0.65 * intro));
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = i === n - 1 ? 1 : 1 - final * 0.9;
    });
  });

  return (
    <>
      {textures.map((tex, i) => (
        <mesh key={i} ref={(m) => { meshes.current[i] = m; }} renderOrder={i === n - 1 ? 10 : n - i}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={tex} transparent alphaTest={0.02} roughness={0.62} metalness={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

export default function HeroScene({ active, fixedProgress }: { active: boolean; fixedProgress?: number }) {
  const textures = useSwatchTextures();
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAM_Z], fov: 35, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <pointLight position={[-4, -2, 4]} intensity={18} color="#FF4A1C" distance={14} />
      <Dust count={1600} progress={() => fixedProgress ?? heroState.progress} />
      {textures && <SwatchBook textures={textures} fixedProgress={fixedProgress} />}
    </Canvas>
  );
}
