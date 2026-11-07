"use client";

/**
 * THE SIX / NINE SIGNATURE SCENE
 *
 * A single numeral — the "9" from the site's own display typeface (Instrument
 * Serif) — is cast in champagne metal and laid flat on a dark plane, with a
 * vantage point engraved on either side. The camera begins at a grazing angle where
 * the form is only an abstract edge of light, rises until it reads as a nine,
 * then walks a half-circle to the opposite side, where the very same object
 * reads as a six.
 *
 * Optics note: from the far side the viewer sees the glyph rotated 180°. In
 * this typeface a rotated nine reads naturally as a six; it is the same form
 * seen from another side, not a separate "6" model.
 *
 * Rendering is on-demand: frames are drawn only when scroll progress changes.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import glyph from "@/data/glyph-nine.json";
import { keyframes, perspectiveStore } from "@/animations/perspectiveStore";

const CHAMPAGNE = "#bda47d";
const GLYPH_HEIGHT = 3.1;

function useNineGeometry(compact: boolean) {
  return useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${glyph.path}"/></svg>`;
    const data = new SVGLoader().parse(svg);
    // Font outlines: outer contour + counter (hole). toShapes() resolves the hole by winding.
    const shapes = data.paths.flatMap((p) => p.toShapes());
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 64,
      bevelEnabled: true,
      bevelThickness: 7,
      bevelSize: 4.5,
      bevelSegments: compact ? 3 : 5,
      curveSegments: compact ? 12 : 22,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, [compact]);
}

function Nine({ compact }: { compact: boolean }) {
  const geometry = useNineGeometry(compact);
  const [, , , maxY] = glyph.bounds;
  const s = GLYPH_HEIGHT / (maxY - glyph.bounds[1]);
  // Font outlines are y-up; lay the glyph face-up with its top pointing north (−z).
  return (
    <mesh geometry={geometry} scale={[s, s, s]} rotation={[-Math.PI / 2, 0, 0]} position={[0, (64 * s) / 2 + 0.02, 0]} castShadow>
      {compact ? (
        <meshStandardMaterial color={CHAMPAGNE} metalness={1} roughness={0.28} envMapIntensity={1.7} />
      ) : (
        <meshPhysicalMaterial color={CHAMPAGNE} metalness={1} roughness={0.26} clearcoat={0.35} clearcoatRoughness={0.4} envMapIntensity={1.7} />
      )}
    </mesh>
  );
}

/** A vantage point engraved on the ground: "stand here". */
function Vantage({ z }: { z: number }) {
  const ref = useRef<THREE.Group>(null);
  // Hidden during the grazing opening, where it would sit right at the lens.
  useFrame(() => {
    if (ref.current) ref.current.visible = perspectiveStore.progress > 0.18;
  });
  return (
    <group ref={ref} position={[0, 0.004, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[0.2, 0.215, 64]} />
        <meshBasicMaterial color={CHAMPAGNE} transparent opacity={0.7} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.045, 32]} />
        <meshBasicMaterial color={CHAMPAGNE} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 96]} />
        <meshStandardMaterial color="#121316" roughness={0.94} metalness={0} />
      </mesh>
      {/* The axis between the two vantage points — an engraved hairline. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[0.012, 9.5]} />
        <meshBasicMaterial color={CHAMPAGNE} transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[2.55, 2.562, 160]} />
        <meshBasicMaterial color={CHAMPAGNE} transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/** Camera path and light, driven entirely by scroll progress. */
function Rig({ compact }: { compact: boolean }) {
  const { camera, invalidate, size } = useThree();
  const key = useRef<THREE.DirectionalLight>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    perspectiveStore.invalidate = invalidate;
    invalidate();
    return () => {
      perspectiveStore.invalidate = null;
    };
  }, [invalidate]);

  useFrame(() => {
    const p = perspectiveStore.progress;
    const aspect = size.width / size.height;
    const fit = aspect < 1 ? 1 + (1 - aspect) * 0.9 : 1;

    const theta = keyframes([[0.34, 0], [0.8, Math.PI]], p);
    const h = keyframes([[0, 0.32], [0.26, 4.5], [0.57, 5.6], [0.86, 4.6], [1, 6.6]], p);
    const r = keyframes([[0, 4.4], [0.26, 6.1], [0.57, 6.7], [0.86, 5.9], [1, 7.4]], p) * fit * (compact ? 1.05 : 1);
    const lookY = keyframes([[0, 0.12], [0.26, 0.7], [0.86, 0.7], [1, -0.75]], p);

    camera.position.set(Math.sin(theta) * r, h, Math.cos(theta) * r);
    target.set(0, lookY, 0);
    camera.lookAt(target);

    // A raking key light that sweeps ahead of the viewer: the reveal is lit, not faded.
    if (key.current) {
      const phi = theta + keyframes([[0, 1.9], [0.3, 0.9]], p);
      key.current.position.set(Math.sin(phi) * 6, keyframes([[0, 0.9], [0.3, 6]], p), Math.cos(phi) * 6);
      key.current.intensity = keyframes([[0, 1.6], [0.22, 3.4]], p);
    }
  });

  return (
    <>
      <directionalLight ref={key} color="#f3ead8" intensity={2} castShadow={false} />
      <directionalLight position={[-4, 3, -6]} color="#9fb1c8" intensity={0.35} />
    </>
  );
}

export default function PerspectiveScene({ compact = false, onReady }: { compact?: boolean; onReady?: () => void }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={compact ? [1, 1.5] : [1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      camera={{ fov: compact ? 36 : 30, near: 0.1, far: 80, position: [0, 0.32, 4.4] }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#101114");
        scene.fog = new THREE.Fog("#101114", 7, 17);
        requestAnimationFrame(() => onReady?.());
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.22} />
      <Environment resolution={compact ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#f6efe2" position={[0, 5, -4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#bda47d" position={[-5, 2, 3]} rotation-y={Math.PI / 2} scale={[8, 1.5, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#b8c2d0" position={[5, 1.5, 2]} rotation-y={-Math.PI / 2} scale={[8, 1, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#f6efe2" position={[0, 5, 4]} rotation-y={Math.PI} scale={[10, 2, 1]} />
        <Lightformer form="circle" intensity={1.4} color="#ffffff" position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={3} />
      </Environment>
      <Rig compact={compact} />
      <Ground />
      <Nine compact={compact} />
      <Vantage z={3.3} />
      <Vantage z={-3.3} />
      <ContactShadows position={[0, 0.002, 0]} opacity={0.7} scale={9} blur={2.6} far={1.2} frames={1} resolution={compact ? 256 : 512} color="#000000" />
    </Canvas>
  );
}
