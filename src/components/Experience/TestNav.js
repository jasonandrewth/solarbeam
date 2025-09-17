"use client";
import React, { memo, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCursor, useGLTF } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { randomWarmVivid } from "./PhysicsTest";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MediaQueries } from "@/styles/mixins/MediaQueries";
import { useGlobalData } from "@/context/globalContext";

const MODEL_URL = "/assets/models/mahjongborderinset.glb";
const MODEL_URL2 = "/assets/models/mahjong2.glb";
const MODEL_URL3 = "/assets/models/mahjong1.glb";

// Generate once per module load to avoid re-randomizing on route changes/rerenders

const GREEN = new THREE.Color("#0a8f4d");
const IVORY = new THREE.Color("#f4f4efff");

function StoneLink({
  position = [0, 0, 0],
  href = "/",
  glassMat,
  baseMat,
  type = 1,
  isMobile = false,
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const ref = React.useRef();

  const { selectedNavItem, setSelectedNavItem } = useGlobalData();

  const hitSound = React.useMemo(
    () => (!isMobile ? new Audio("/assets/audio/impact.mp3") : null),
    [isMobile]
  );

  const playSound = () => {
    if (!hitSound) return;
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  useCursor(!isMobile && hovered, "pointer", "auto");

  const defaultRot = React.useRef(new THREE.Euler(Math.PI * 0.5, 0, 0));
  const rotTarget = React.useRef(new THREE.Euler().copy(defaultRot.current));
  const hasPlayedRef = React.useRef(false);

  const baseY = position[1] || 0;

  // Smooth lift on hover
  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (!ref.current) return;
    // World-space delta from stone center to pointer hit point
    const p = e.point;
    const pos = ref.current.getWorldPosition(new THREE.Vector3());
    const dx = p.x - pos.x;
    const dy = p.y - pos.y;

    const factor = 0.25; // tilt sensitivity
    const max = 0.35; // clamp in radians (~20deg)

    rotTarget.current.x =
      defaultRot.current.x + THREE.MathUtils.clamp(-dy * factor, -max, max);
    rotTarget.current.y =
      defaultRot.current.y + THREE.MathUtils.clamp(dx * factor, -max, max);
    // keep z aligned with default
    rotTarget.current.z = defaultRot.current.z;
  };

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (isMobile) return; // no hover/tilt on mobile (Float will handle subtle movement)

    // hover lift
    const targetY = baseY + (hovered ? 0.2 : 0);
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY,
      6,
      delta
    );

    // rotation: when not hovered, ease back to default
    if (!hovered) rotTarget.current.copy(defaultRot.current);

    const r = ref.current.rotation;
    r.x = THREE.MathUtils.damp(r.x, rotTarget.current.x, 6, delta);
    r.y = THREE.MathUtils.damp(r.y, -rotTarget.current.y, 6, delta);
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={[Math.PI * 0.5, 0, 0]}
      onPointerMove={isMobile ? undefined : handlePointerMove}
      onClick={(e) => {
        e.stopPropagation();
        router.push(href);
      }}
      onPointerOver={
        isMobile
          ? undefined
          : (e) => {
              e.stopPropagation();
              setSelectedNavItem(href);
              console.log(selectedNavItem, "navsel");
              setHovered(true);
            }
      }
      onPointerEnter={(e) => {
        if (isMobile) return;
        e.stopPropagation();
        setSelectedNavItem(href);
        if (!hasPlayedRef.current) {
          playSound();
          hasPlayedRef.current = true;
        }
        setHovered(true);
      }}
      onPointerOut={
        isMobile
          ? undefined
          : (e) => {
              e.stopPropagation();
              setHovered(false);
              setSelectedNavItem("");
              hasPlayedRef.current = false; // allow sound again on next true enter
            }
      }
    >
      {(type === 1 && <Stone1 glassMat={glassMat} material={baseMat} />) ||
        (type === 2 && <Stone2 glassMat={glassMat} material={baseMat} />) || (
          <Stone3 glassMat={glassMat} material={baseMat} />
        )}
    </group>
  );
}

const Stone1 = memo(function Stone1({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,

  glassMat,
  material,
  url = MODEL_URL,
}) {
  const { scene, nodes } = useGLTF(url);

  const top = nodes.TopBase002;
  const symbols = nodes.Curve011;
  const middle = nodes.FirstStoneBottom005;
  const bottom = nodes.FirstStoneMiddle003;

  const baubleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(randomWarmVivid()), // generated once per module
        roughness: 0.01,
        metalness: 0.2,
        transparent: false,
        depthWrite: true,
        depthTest: true,
      }),
    []
  );

  React.useEffect(() => {
    return () => {
      baubleMaterial.dispose?.();
    };
  }, [baubleMaterial]);

  return (
    <group>
      <mesh scale={1} geometry={middle.geometry} material={glassMat} />
      <mesh scale={1} geometry={bottom.geometry} material={material} />
      <mesh scale={1} geometry={top.geometry} material={glassMat} />
      <mesh
        scale={1}
        position={[symbols.position.x, symbols.position.y, symbols.position.z]}
        geometry={symbols.geometry}
        material={baubleMaterial}
        frustumCulled={false}
      />
    </group>
  );
});

const Stone2 = memo(function Stone1({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,

  glassMat,
  material,
  url = MODEL_URL2,
}) {
  const { scene, nodes } = useGLTF(url);

  const top = nodes.TopBase001;
  const middle = nodes.FirstStoneBottom004;
  const bottom = nodes.FirstStoneMiddle002;
  const logo = nodes.sblogo;
  const symbols = [
    nodes["symbol-1002"],
    nodes["symbol-2002"],
    nodes["symbol-3002"],
    nodes["SYMBOL-4002"],
  ];

  const baubleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(randomWarmVivid()), // generated once per module
        roughness: 0.01,
        metalness: 0.2,
        transparent: false,
        depthWrite: true,
        depthTest: true,
      }),
    []
  );

  React.useEffect(() => {
    return () => {
      baubleMaterial.dispose?.();
    };
  }, [baubleMaterial]);

  return (
    <group>
      <mesh scale={1} geometry={middle.geometry} material={glassMat} />
      <mesh scale={1} geometry={bottom.geometry} material={material} />
      <mesh scale={1} geometry={top.geometry} material={glassMat} />
      <mesh
        position={[logo.position.x, logo.position.y, logo.position.z]}
        geometry={logo.geometry}
        material={baubleMaterial}
        scale={logo.scale}
      />
      {symbols.map((sym, idx) => {
        return (
          <mesh
            key={idx}
            scale={sym.scale.x}
            position={[
              sym.position.x,
              sym.position.y + (idx === 0 ? 0.021 : 0),
              sym.position.z,
            ]}
            geometry={sym.geometry}
            material={baubleMaterial}
            frustumCulled={false}
          />
        );
      })}
    </group>
  );
});

const Stone3 = memo(function Stone1({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,

  glassMat,
  material,
  url = MODEL_URL3,
}) {
  const { scene, nodes } = useGLTF(url);

  const top = nodes.FirstStone;
  const symbol = nodes.InnerMascot;
  const middle = nodes.FirstStoneMiddle;
  const bottom = nodes.FirstStoneBottom001;

  const baubleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(randomWarmVivid()), // generated once per module
        roughness: 0.01,
        metalness: 0.2,
        transparent: false,
        depthWrite: true,
        depthTest: true,
      }),
    []
  );

  React.useEffect(() => {
    return () => {
      baubleMaterial.dispose?.();
    };
  }, [baubleMaterial]);

  return (
    <group rotation={[0, 0, Math.PI]}>
      <mesh scale={1} geometry={middle.geometry} material={material} />
      <mesh scale={1} geometry={bottom.geometry} material={glassMat} />
      <mesh scale={1} geometry={top.geometry} material={glassMat} />
      <mesh
        scale={1}
        position={[
          symbol.position.x,
          symbol.position.y + 0.05,
          symbol.position.z,
        ]}
        geometry={symbol.geometry}
        material={baubleMaterial}
      />
    </group>
  );
});

const TestNav = () => {
  // Materials are memoized so they are created once per mount and reused
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: GREEN, // emerald-like green base
        transmission: 0.8,
        ior: 1.57,
        thickness: 1.0,
        roughness: 0.3,
        metalness: 0.0,
      }),
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: IVORY,
        roughness: 0.1,
        metalness: 0.0,
      }),
    []
  );

  React.useEffect(() => {
    return () => {
      glassMat.dispose?.();
      material.dispose?.();
    };
  }, [glassMat, material]);

  const isMobile = useMediaQuery(MediaQueries.mobile);

  const positions = isMobile
    ? [
        [0, 4, 0],
        [0, 0, 0],
        [0, -4, 0],
      ] // vertical stack with even spacing
    : [
        [-4, 0, 0],
        [0, 0, 0],
        [4, 0, 0],
      ]; // horizontal on desktop

  const links = [
    { href: "/about", type: 1 },
    { href: "/gallery", type: 2 },
    { href: "/archive", type: 3 },
  ];

  return (
    <group>
      {links.map((l, i) => {
        const content = (
          <StoneLink
            key={l.href}
            position={positions[i]}
            href={l.href}
            glassMat={glassMat}
            baseMat={material}
            type={l.type}
            isMobile={isMobile}
          />
        );
        return isMobile ? (
          <Float
            key={l.href}
            floatIntensity={1}
            rotationIntensity={1}
            speed={4}
          >
            {content}
          </Float>
        ) : (
          content
        );
      })}
    </group>
  );
};

export default TestNav;
