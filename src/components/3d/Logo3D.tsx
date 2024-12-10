'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Center, Float, OrbitControls, shaderMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh, Group, ShaderMaterial } from 'three';

// Shader für den Farbverlauf
const GradientMaterial = shaderMaterial(
  {
    time: 0,
    isPrimary: 1,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform float isPrimary;
    varying vec2 vUv;
    
    void main() {
      vec4 primaryColor1 = vec4(0.388, 0.400, 0.965, 0.9); // #6366f1 (primary)
      vec4 primaryColor2 = vec4(0.290, 0.310, 0.965, 0.9); // Dunkleres primary
      vec4 secondaryColor1 = vec4(0.541, 0.388, 0.965, 0.9); // #8A63F1 (secondary)
      vec4 secondaryColor2 = vec4(0.443, 0.290, 0.965, 0.9); // Dunkleres secondary
      
      vec4 color1 = isPrimary > 0.5 ? primaryColor1 : secondaryColor1;
      vec4 color2 = isPrimary > 0.5 ? primaryColor2 : secondaryColor2;
      
      vec2 uv = vUv;
      uv.y += time * 0.1;
      
      float mixValue = distance(vec2(uv.x, uv.y), vec2(0.5, 0.5));
      vec4 finalColor = mix(color1, color2, mixValue);
      
      gl_FragColor = finalColor;
    }
  `
);

extend({ GradientMaterial });

interface BarProps {
  position: [number, number, number];
  height: number;
  delay?: number;
  isPrimary?: boolean;
}

function Bar({ position, height, delay = 0, isPrimary = true }: BarProps) {
  const barRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (barRef.current) {
      const time = Math.max(0, state.clock.elapsedTime - delay);
      const currentHeight = Math.min(height, time * 2);
      barRef.current.scale.y = currentHeight;

      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      barRef.current.scale.x = pulse;
      barRef.current.scale.z = pulse;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={barRef} position={position}>
      <boxGeometry args={[0.8, 1, 0.8]} />
      {/* @ts-ignore */}
      <gradientMaterial ref={materialRef} transparent isPrimary={isPrimary ? 1.0 : 0.0} />
    </mesh>
  );
}

function BarChart() {
  const groupRef = useRef<Group>(null);
  const heights = [1, 2, 3, 4, 5];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {heights.map((height, index) => {
        const position: [number, number, number] = [
          index * 1.2 - (heights.length - 1) * 0.6,
          height / 2,
          0,
        ];
        return (
          <Bar
            key={index}
            position={position}
            height={height}
            delay={index * 0.1}
            isPrimary={index % 2 === 0}
          />
        );
      })}

      {/* Basis-Linie */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[heights.length * 1.2 + 0.8, 0.1, 0.8]} />
        {/* @ts-ignore */}
        <gradientMaterial transparent isPrimary={1.0} />
      </mesh>
    </group>
  );
}

export default function Logo3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-25">
      <Canvas camera={{ position: [0, 6, 12], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
          <Center>
            <BarChart />
          </Center>
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
