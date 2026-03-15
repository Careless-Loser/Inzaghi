"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BrutalistShape() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      // 1. Smoothly interpolate the object's rotation to follow the mouse (pointer)
      const targetX = (state.pointer.x * Math.PI) / 2;
      const targetY = (state.pointer.y * Math.PI) / 2;
      
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetX, 0.05);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -targetY, 0.05);

      // 2. Add a tiny bit of constant rotation so it feels alive even when the mouse is still
      mesh.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={2.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        {/* We make it wireframe so it looks like architectural blueprints */}
        <MeshDistortMaterial color="#ffffff" wireframe distort={0.5} speed={2} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-difference">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <BrutalistShape />
      </Canvas>
    </div>
  );
}