import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import {
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
} from "@react-three/rapier";
import { useMemo, useRef, useState, Suspense, useCallback, memo } from "react";

import DraggableRigidBody from "./DraggableRigidBody";

const MODEL_URL = "/assets/models/mahjongborderinset.glb";
const MODEL_URL2 = "/assets/models/mahjong2.glb";

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const baubles = [...Array(18)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
}));

const green = new THREE.Color("#0a8f4d");
const ivory = new THREE.Color("#fffff0");

// Opaque materials (avoid transparency sorting/blending issues)

const glassMat = new THREE.MeshPhysicalMaterial({
  // Emerald-like green base
  color: green,
  // Physically based transmission/refraction
  transparent: true,
  transmission: 0.8, // enable real refraction
  ior: 1.57, // emerald ~1.57
  thickness: 1.0, // controls refraction path length
  // Crisp, glassy surface
  roughness: 0.3,
  metalness: 0.0,
  castShadow: true,
  receiveShadow: true,

  //   envMapIntensity: 2.0,

  //   side: THREE.DoubleSide,
});

const material = new THREE.MeshStandardMaterial({
  color: ivory,
  roughness: 0.9,
  metalness: 0.2,
  castShadow: true,
  receiveShadow: true,
});
const materialGloss = new THREE.MeshStandardMaterial({
  color: green,
  roughness: 0.01,
  metalness: 0.2,
  transparent: false,
  depthWrite: true,
  depthTest: true,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
  depthWrite: true,
  depthTest: true,
  castShadow: true,
  receiveShadow: true,
});

const PhysicsTest = () => {
  // Z plane where you want the screen bounds (same Z as the moving object)
  const planeZ = 0;

  const { camera, size, viewport } = useThree();
  // Compute the current viewport (in world units) at planeZ
  const vp = useMemo(
    () => viewport.getCurrentViewport(camera, [0, 0, planeZ], size),
    [camera, size, viewport]
  );

  // Half extents for convenience
  const halfW = vp.width / 2;
  const halfH = vp.height / 2;

  // Wall thickness (very thin) and depth in Z for the colliders
  const THICK = 0.02; // thin in the normal direction of each wall
  const DEPTH = 2; // extend a bit in Z so fast objects don't tunnel

  const DraggableRigidBodyProps = {
    rigidBodyProps: {
      gravityScale: 3.5,
      linearDamping: 5,
      angularDamping: 0.2,
    },
    boundingBox: [
      [-8, 8],
      [0.5, 8],
      [-8, 8],
    ],
    dragControlsProps: {
      preventOverlap: true,
    },
  };

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

      {/* Moving cube */}
      {/* <RigidBody>
        <mesh position={[-1, 0, planeZ]} scale={[1, 1, 1]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </RigidBody>

      <Suspense fallback={null}>
        <StonePrimitive />
      </Suspense> */}
      {/* 
      <DraggableRigidBody
        // {...DraggableRigidBodyProps}
        visibleMesh={
          <mesh position={[1, 0, planeZ]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial visible={true} />
          </mesh>
        }
      /> */}
    </>
  );
};

export default PhysicsTest;

function StonePrimitive() {
  const { scene } = useGLTF(MODEL_URL);
  return (
    <RigidBody>
      <primitive object={scene} />
    </RigidBody>
  );
}

const Stone1 = memo(function Stone1({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}) {
  const api = useRef();

  const { scene: stoneScene, nodes } = useGLTF(MODEL_URL);

  const top = nodes.TopBase002;
  const symbols = nodes.Curve011;
  const middle = nodes.FirstStoneBottom005;
  const bottom = nodes.FirstStoneMiddle003;

  const baubleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        roughness: 0.01,
        metalness: 0.2,
        transparent: false,
        depthWrite: true,
        depthTest: true,
        castShadow: true,
        receiveShadow: true,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({
          x: -50 * delta * scale,
          y: -150 * delta * scale,
          z: -50 * delta * scale,
        })
    );
  });
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      //   colliders={false}
      dispose={null}
    >
      {/* <CuboidCollider position={[0, 0, 0]} args={[1, 2, 0.4]} /> */}
      {/* <primitive object={stoneScene} /> */}

      {/* <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      /> */}
      <group castShadow receiveShadow>
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
}) {
  const api = useRef();

  const { scene: stoneScene, nodes } = useGLTF(MODEL_URL2);

  const baubleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        roughness: 0.01,
        metalness: 0.2,
        transparent: false,
        castShadow: true,
        receiveShadow: true,
      }),
    []
  );

  const top = nodes.TopBase001;
  const middle = nodes.FirstStoneBottom004;
  const bottom = nodes.FirstStoneMiddle002;
  const symbols = [
    nodes["symbol-1002"],
    nodes["symbol-2002"],
    nodes["symbol-3002"],
    nodes["SYMBOL-4002"],
  ];

  useFrame((state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({
          x: -50 * delta * scale,
          y: -150 * delta * scale,
          z: -50 * delta * scale,
        })
    );
  });
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      //   colliders={false}
      dispose={null}
    >
      {/* <CuboidCollider position={[0, 0, 0]} args={[1, 2, 0.4]} /> */}
      {/* <primitive object={stoneScene} /> */}

      {/* <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      /> */}
      <group castShadow receiveShadow>
        <mesh scale={1} geometry={middle.geometry} material={glassMat} />
        <mesh scale={1} geometry={bottom.geometry} material={material} />
        <mesh scale={1} geometry={top.geometry} material={glassMat} />
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
  useFrame(({ mouse, viewport }) => {
    if (!ref.current) return;
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      },
      0.2
    );
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
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </RigidBody>
  );
});
