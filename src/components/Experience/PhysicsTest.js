import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider, BallCollider } from "@react-three/rapier";
import {
  useMemo,
  useRef,
  useState,
  Suspense,
  useCallback,
  memo,
  useLayoutEffect,
  useEffect,
} from "react";

import DraggableRigidBody from "./DraggableRigidBody";

const MODEL_URL = "/assets/models/mahjongborderinset.glb";
const MODEL_URL2 = "/assets/models/mahjong2.glb";

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const baubles = [...Array(12)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
  color: new THREE.Color(Math.random(), Math.random(), Math.random()),
  mat: new THREE.MeshStandardMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    roughness: 0.01,
    metalness: 0.2,
    transparent: false,
    depthWrite: true,
    depthTest: true,
  }),
}));

const green = new THREE.Color("#0a8f4d");
const ivory = new THREE.Color("#fffff0");

// Opaque materials (avoid transparency sorting/blending issues)

const glassMat = new THREE.MeshPhysicalMaterial({
  // Emerald-like green base
  color: green,
  // Physically based transmission/refraction

  transmission: 0.8, // enable real refraction
  ior: 1.57, // emerald ~1.57
  thickness: 1.0, // controls refraction path length
  // Crisp, glassy surface
  roughness: 0.3,
  metalness: 0.0,

  //   envMapIntensity: 2.0,

  //   side: THREE.DoubleSide,
});

const material = new THREE.MeshStandardMaterial({
  color: ivory,
  roughness: 0.9,
  metalness: 0.2,
});
// const materialGloss = new THREE.MeshStandardMaterial({
//   color: green,
//   roughness: 0.01,
//   metalness: 0.2,
//   transparent: false,
//   depthWrite: true,
//   depthTest: true,
//   polygonOffset: true,
//   polygonOffsetFactor: 1,
//   polygonOffsetUnits: 1,
//   depthWrite: true,
//   depthTest: true,
// });

const PhysicsTest = () => {
  return (
    <>
      <Pointer />

      <Suspense fallback={null}>
        {baubles.map((props, i) => {
          if (i % 2 === 0) {
            return <Stone2 key={i} {...props} />;
          } else {
            return <Stone1 key={i} {...props} />;
          }
        })}

        {/* {baubles.map((props, i) => {
          return <Stone2 key={i} {...props} />;
        })} */}
      </Suspense>
    </>
  );
};

export default PhysicsTest;

export const StonePrimitive = ({ url }) => {
  const { scene } = useGLTF(url);

  const groupRef = useRef(null);
  // Assign a fresh MeshStandardMaterial with a random color to each mesh once on mount
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const oldMat = child.material;

        if (child.name.toLowerCase().includes("bottom")) {
          child.material = glassMat;
        } else if (child.name.toLowerCase().includes("middle")) {
          child.material = material;
        } else if (child.name.toLowerCase().includes("top")) {
          child.material = glassMat;
        } else {
          child.material = material;
        }

        if (oldMat && typeof oldMat.dispose === "function") oldMat.dispose();
      }
    });
  }, [scene]);

  return (
    <RigidBody>
      <group ref={groupRef} rotation={[Math.PI * 0.5, 0, 0]}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
};

const Stone1 = memo(function Stone1({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  mat,
}) {
  const api = useRef();

  const { scene: stoneScene, nodes } = useGLTF(MODEL_URL);

  const top = nodes.TopBase002;
  const symbols = nodes.Curve011;
  const middle = nodes.FirstStoneBottom005;
  const bottom = nodes.FirstStoneMiddle003;

  const baubleMaterial = mat;
  const tmp = new THREE.Vector3();
  useFrame((state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      tmp
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(-delta * scale) // scale once
        .multiply(new THREE.Vector3(50, 150, 50)) // or set(x,y,z)
    );
  });
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
      dispose={null}
    >
      <CuboidCollider position={[0, 0, 0]} args={[1, 0.6, 1]} />
      {/* <primitive object={stoneScene} /> */}

      {/* <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      /> */}
      <group>
        <mesh scale={1} geometry={middle.geometry} material={glassMat} />
        <mesh scale={1} geometry={bottom.geometry} material={material} />
        <mesh scale={1} geometry={top.geometry} material={glassMat} />
        <mesh
          scale={1}
          position={[
            symbols.position.x,
            symbols.position.y,
            symbols.position.z,
          ]}
          geometry={symbols.geometry}
          material={baubleMaterial}
          frustumCulled={false}
        />
      </group>
    </RigidBody>
  );
});

const Stone2 = memo(function Stone2({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  color,
  mat,
}) {
  const api = useRef();

  const { scene: stoneScene, nodes } = useGLTF(MODEL_URL2);

  const baubleMaterial = mat;

  console.log("nodees", nodes);

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

  const tmp = new THREE.Vector3();
  useFrame((state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      tmp
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(-delta * scale) // scale once
        .multiply(new THREE.Vector3(50, 150, 50)) // or set(x,y,z)
    );
  });
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
      dispose={null}
    >
      <CuboidCollider position={[0, 0, 0]} args={[1, 0.6, 1]} />
      {/* <primitive object={stoneScene} /> */}

      {/* <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      /> */}
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
    </RigidBody>
  );
});

const Pointer = memo(function Pointer({ vec = new THREE.Vector3() }) {
  const [pressed, setPressed] = useState(false);
  const baseRadius = 2; // base collider/visual radius
  const radius = pressed ? baseRadius * 1.6 : baseRadius; // scale up on press

  const onDown = useCallback(() => setPressed(true), []);
  const onUp = useCallback(() => setPressed(false), []);
  const onCancel = useCallback(() => setPressed(false), []);
  const onOut = useCallback(() => setPressed(false), []);

  const ref = useRef();
  const target = useRef(new THREE.Vector3());
  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    target.current.set(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );
    vec.lerp(target.current, 0.2);
    ref.current.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      {/* Collider scales with press state */}
      <BallCollider args={[radius]} />

      {/* Invisible mesh to capture pointer events; scales with collider */}
      <mesh
        scale={[radius, radius, radius]}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
        onPointerOut={onOut}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </RigidBody>
  );
});

useGLTF.preload(MODEL_URL);
useGLTF.preload(MODEL_URL2);
