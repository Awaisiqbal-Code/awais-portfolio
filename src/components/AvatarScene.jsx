import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Rotating hologram core sphere representing the developer's neural processing center
const NeuralCore = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.15}
          emissive="#7b61ff"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Orbital particles orbiting the core
const OrbitalParticles = ({ count = 250 }) => {
  const pointsRef = useRef();

  const [positions, speeds, phases] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);
    const phaseArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 5;
      
      // Position coordinates
      posArray[i * 3] = Math.cos(theta) * radius;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 6;
      posArray[i * 3 + 2] = Math.sin(theta) * radius;

      speedArray[i] = 0.15 + Math.random() * 0.3;
      phaseArray[i] = Math.random() * Math.PI;
    }

    return [posArray, speedArray, phaseArray];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < count; i++) {
      const radius = Math.sqrt(array[i * 3] ** 2 + array[i * 3 + 2] ** 2);
      const angle = t * speeds[i] + phases[i];
      
      array[i * 3] = Math.cos(angle) * radius;
      array[i * 3 + 2] = Math.sin(angle) * radius;
      array[i * 3 + 1] += Math.sin(t + i) * 0.002;
    }

    posAttr.needsUpdate = true;
    points.rotation.y = t * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AvatarScene = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024); // Disable WebGL entirely on mobile/tablet
      setIsLowPerformance(width < 1280); // Disable heavy postprocessing on smaller screens
    };
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas eventSource={document.getElementById('root')}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7b61ff" />

        {/* Neural Hologram Components */}
        <NeuralCore />
        <OrbitalParticles count={isLowPerformance ? 80 : 300} />

        {/* Ambient starfield background */}
        <Stars radius={100} depth={50} count={isLowPerformance ? 500 : 2000} factor={4} saturation={0} fade speed={1} />

        {/* Bloom / Postprocessing FX - Only enable on high-performance desktop */}
        {!isLowPerformance && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default AvatarScene;
