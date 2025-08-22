import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MODEL_URL = "/assets/models/mahjong2.glb";

const Stone = () => {
  const { scene } = useGLTF(MODEL_URL);

  // Assign a fresh MeshStandardMaterial with a random color to each mesh once on mount
  useLayoutEffect(() => {
    const green = new THREE.Color("#0a8f4d");
    const ivory = new THREE.Color("#fffff0");
    const glassMat = new THREE.MeshPhysicalMaterial({
      // Emerald-like green base
      color: green,
      // Physically based transmission/refraction
      transparent: true,
      transmission: 1.0, // enable real refraction
      ior: 1.57, // emerald ~1.57
      thickness: 1.2, // controls refraction path length
      // Crisp, glassy surface
      roughness: 0.3,
      metalness: 0.0,
      // Make the gem pop under environment lighting
      specularIntensity: 1.0,
      specularColor: new THREE.Color("#cde7d6"),
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.0,

      side: THREE.DoubleSide,
    });
    // Slightly heavier: proper light transmission & IOR
    const glassPhysical = new THREE.MeshPhysicalMaterial({
      transmission: 0.6, // less transparency for milkiness
      thickness: 0.5, // thicker look
      ior: 1.3, // closer to milky liquids
      roughness: 0.4, // blurrier, more diffuse
      metalness: 0.0,
      attenuationColor: new THREE.Color(0xfafafa), // soft white tint
      attenuationDistance: 0.5, // absorbs light quickly for cloudy effect
      envMapIntensity: 0.6,
      transparent: true,
      opacity: 0.9, // ensures a cloudy opacity
    });

    const material = new THREE.MeshStandardMaterial({
      color: ivory,
    });
    const materialGloss = new THREE.MeshStandardMaterial({
      color: green,
      roughness: 0.01, // lower roughness for more gloss
      metalness: 0.2, // slight metalness for reflective shine
    });
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child);
        const oldMat = child.material;

        console.log(child.name);

        if (child.name.toLowerCase().includes("bottom")) {
          child.material = glassMat;
        } else if (child.name.toLowerCase().includes("middle")) {
          child.material = glassPhysical;
        } else if (child.name.toLowerCase().includes("top")) {
          child.material = material;
        } else {
          child.material = materialGloss;
        }

        child.castShadow = true;
        child.receiveShadow = true;
        if (oldMat && typeof oldMat.dispose === "function") oldMat.dispose();
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const { clock } = state;
    scene.rotation.z = clock.elapsedTime * -0.5;
  });

  return (
    <primitive
      position={[0, 0, 1]}
      rotation={[Math.PI * 0.5, 0, 0]}
      object={scene}
    />
  );
};

export default Stone;

useGLTF.preload(MODEL_URL);
