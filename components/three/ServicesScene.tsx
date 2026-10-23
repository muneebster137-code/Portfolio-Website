"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CARD_H, CARD_W } from "./swatchTexture";
import { pointer, servicesState } from "./store";
import { useSwatchTextures } from "./useSwatchTextures";
import { Dust } from "./Dust";

const CAM_Z = 8;

// A corridor of swatches: scroll walks the camera's attention down the line, one service per step.
function Corridor({ textures }: { textures: THREE.CanvasTexture[] }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const { viewport, camera } = useThree();
  const n = textures.length;
  const target = new THREE.Vector3();
  const euler = new THREE.Euler();
  const quat = new THREE.Quaternion();

  useFrame((state, dt) => {
    const head = servicesState.progress * (n - 1);
    const narrow = viewport.aspect < 1;
    const time = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.001, dt);

    camera.position.x += (pointer.x * 0.35 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.2 - camera.position.y) * k;
    camera.lookAt(narrow ? 0 : viewport.width * 0.17, 0, 0);

    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = i - head;
      const near = Math.max(0, 1 - Math.abs(d));
      target.set(
        (narrow ? 0.7 : viewport.width * 0.24) + d * (narrow ? 0.35 : 0.85),
        (narrow ? 0.55 : 0) - d * 0.22 + Math.sin(time * 0.7 + i) * 0.06,
        -d * 2.6 + near * 0.6
      );
      euler.set(0.04, -0.55 + near * 0.4 + d * 0.06, d * 0.04 + (1 - near) * 0.05);
      quat.setFromEuler(euler);
      mesh.position.lerp(target, k);
      mesh.quaternion.slerp(quat, k);
      mesh.scale.setScalar(narrow ? 0.55 : 1);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = d < 0 ? Math.max(0, 1 + d * 1.1) : Math.max(0.15, 1 - d * 0.16);
      mesh.visible = mat.opacity > 0.01;
    });
  });

  return (
    <>
      {textures.map((tex, i) => (
        <mesh key={i} ref={(m) => { meshes.current[i] = m; }} position={[2, 0, -i * 2.6]}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshStandardMaterial map={tex} transparent alphaTest={0.02} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
}

export default function ServicesScene({ active }: { active: boolean }) {
  const textures = useSwatchTextures();
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAM_Z], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[-3, 4, 6]} intensity={1.5} />
      <Dust count={1000} />
      {textures && <Corridor textures={textures} />}
    </Canvas>
  );
}
