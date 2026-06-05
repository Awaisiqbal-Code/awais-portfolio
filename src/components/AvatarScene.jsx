import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// Utility: smooth lerp
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 0 — THE ORIGIN: Digital Seed
// ─────────────────────────────────────────────────────────────────────────────
const DigitalSeed = ({ visible }) => {
  const mesh = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.4;
      mesh.current.rotation.x = t * 0.25;
      const s = 1 + Math.sin(t * 1.5) * 0.08;
      mesh.current.scale.setScalar(visible ? s : 0);
    }
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.6;
      ring1.current.rotation.x = t * 0.3;
      ring1.current.scale.setScalar(visible ? 1 : 0);
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.45;
      ring2.current.rotation.y = t * 0.5;
      ring2.current.scale.setScalar(visible ? 1 : 0);
    }
  });

  return (
    <group>
      {/* Core seed sphere */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.7}
          emissive="#7b61ff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Inner solid glow */}
      <mesh>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          transparent
          opacity={visible ? 0.9 : 0}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.02, 8, 80]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} transparent opacity={0.5} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[3.2, 0.015, 8, 80]} />
        <meshStandardMaterial color="#7b61ff" emissive="#7b61ff" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — THE CREATION: Wireframe Terrain + Neural Sky
// ─────────────────────────────────────────────────────────────────────────────
const CreationTerrain = ({ progress }) => {
  const mesh = useRef();
  const skyWeb = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 40, 40);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2.5 + Math.sin(x * 0.1 + z * 0.15) * 1.5);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Neural sky web lines
  const skyLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 30; i++) {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * 50, 12 + Math.random() * 10, (Math.random() - 0.5) * 50);
      const p2 = new THREE.Vector3((Math.random() - 0.5) * 50, 10 + Math.random() * 12, (Math.random() - 0.5) * 50);
      lines.push([p1, p2]);
    }
    return lines;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      const pos = mesh.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setY(i, Math.sin(x * 0.3 + t * 0.3) * Math.cos(z * 0.3 + t * 0.2) * 2.5 + Math.sin(x * 0.1 + z * 0.15 + t * 0.15) * 1.5);
      }
      pos.needsUpdate = true;
      mesh.current.geometry.computeVertexNormals();
    }
  });

  const vis = progress > 0 ? Math.min(progress * 3, 1) : 0;

  return (
    <group position={[0, -6, 0]}>
      {/* Ground wireframe */}
      <mesh ref={mesh} geometry={geometry}>
        <meshStandardMaterial
          color="#7b61ff"
          wireframe
          transparent
          opacity={0.25 * vis}
          emissive="#7b61ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Solid ground underneath */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#050816"
          transparent
          opacity={0.9 * vis}
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      {/* Neural sky lines */}
      {skyLines.map(([p1, p2], idx) => {
        const points = [p1, p2];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={idx} geometry={lineGeo}>
            <lineBasicMaterial color="#00ffff" transparent opacity={0.08 * vis} />
          </line>
        );
      })}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — KNOWLEDGE FOREST: Skill Trees
// ─────────────────────────────────────────────────────────────────────────────
const SkillTree = ({ position, color, height, label, onClick, glowing }) => {
  const group = useRef();
  const leaves = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2 + position[0]) * 0.04;
    }
    if (leaves.current) {
      const s = 1 + (glowing ? Math.sin(t * 2) * 0.06 : Math.sin(t * 0.5 + position[0]) * 0.02);
      leaves.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={position} onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.12, 0.22, height, 8]} />
        <meshStandardMaterial color="#2a1a40" emissive={color} emissiveIntensity={0.3} metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Canopy */}
      <group ref={leaves} position={[0, height + 1.2, 0]}>
        <mesh>
          <sphereGeometry args={[1.6, 12, 12]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.25}
            emissive={color}
            emissiveIntensity={glowing ? 2.5 : 0.8}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.3, 10, 10]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={glowing ? 0.45 : 0.15}
            emissive={color}
            emissiveIntensity={glowing ? 3 : 0.6}
          />
        </mesh>

        {/* Floating label */}
        <Text
          position={[0, 2.4, 0]}
          fontSize={0.38}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
          maxWidth={3}
        >
          {label}
        </Text>
      </group>

      {/* Ground glow ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glowing ? 3 : 1} transparent opacity={glowing ? 0.5 : 0.2} />
      </mesh>
    </group>
  );
};

const KnowledgeForest = ({ visible, onSkillClick }) => {
  const trees = [
    { key: 'react',  pos: [-6,  -5,  -2], color: '#00d8ff', h: 5.5, label: 'React' },
    { key: 'nextjs', pos: [6,   -5, -4],  color: '#ffffff', h: 5.0, label: 'Next.js' },
    { key: 'node',   pos: [0,   -5, -8],  color: '#8dc647', h: 5.2, label: 'Node.js' },
    { key: 'python', pos: [-9,  -5, -8],  color: '#3572a5', h: 5.8, label: 'Python' },
    { key: 'ai',     pos: [9,   -5, -6],  color: '#ffd700', h: 4.8, label: 'AI / ML' },
  ];

  return (
    <group>
      {trees.map(t => (
        <SkillTree
          key={t.key}
          position={t.pos}
          color={t.color}
          height={t.h}
          label={t.label}
          glowing={false}
          onClick={() => visible && onSkillClick(t.key)}
        />
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — INNOVATION CITY: Project Buildings
// ─────────────────────────────────────────────────────────────────────────────
const ProjectBuilding = ({ position, color, height, label, onClick }) => {
  const group = useRef();
  const windows = useMemo(() => {
    const ws = [];
    const cols = 3, rows = Math.floor(height / 1.2);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ws.push({
          x: (c - 1) * 0.5,
          y: 0.8 + r * 1.1,
          on: Math.random() > 0.35,
        });
      }
    }
    return ws;
  }, [height]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = Math.sin(t * 0.1 + position[0] * 0.3) * 0.015;
  });

  return (
    <group ref={group} position={position} onClick={onClick}>
      {/* Main building body */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[2.2, height, 2.2]} />
        <meshStandardMaterial color="#050816" metalness={0.9} roughness={0.1} transparent opacity={0.95} />
      </mesh>

      {/* Wireframe outline */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[2.25, height + 0.05, 2.25]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.3} emissive={color} emissiveIntensity={0.8} />
      </mesh>

      {/* Windows */}
      {windows.map((w, i) => (
        <mesh key={i} position={[w.x, w.y, 1.12]}>
          <planeGeometry args={[0.3, 0.4]} />
          <meshStandardMaterial
            color={w.on ? color : '#111'}
            emissive={w.on ? color : '#000'}
            emissiveIntensity={w.on ? 1.5 : 0}
            transparent
            opacity={w.on ? 0.9 : 0.3}
          />
        </mesh>
      ))}

      {/* Roof glow */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[2.4, 0.12, 2.4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.8} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, height + 1.2, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        {label}
      </Text>

      {/* Ground glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

const InnovationCity = ({ visible, onProjectClick }) => {
  const buildings = [
    { key: 'proj_portfolio',  pos: [-8,  -5, -2],  color: '#00ffff', h: 9,  label: 'Portfolio\nCivilization' },
    { key: 'proj_ecommerce',  pos: [7,   -5, -3],  color: '#7b61ff', h: 7.5, label: 'E-Commerce\nPlatform' },
    { key: 'proj_ai_assistant', pos: [0, -5, -10], color: '#ffd700', h: 11, label: 'AI Content\nAssistant' },
    { key: 'proj_networking', pos: [-4, -5, -12],  color: '#00ff88', h: 6,  label: 'Network\nMonitor' },
  ];

  // City ground grid
  const gridLines = useMemo(() => {
    const lines = [];
    for (let i = -15; i <= 15; i += 3) {
      lines.push({ start: new THREE.Vector3(i, -5, -20), end: new THREE.Vector3(i, -5, 5) });
      lines.push({ start: new THREE.Vector3(-15, -5, i), end: new THREE.Vector3(15, -5, i) });
    }
    return lines;
  }, []);

  return (
    <group>
      {/* City ground grid */}
      {gridLines.map((l, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([l.start, l.end]);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#7b61ff" transparent opacity={visible ? 0.08 : 0} />
          </line>
        );
      })}

      {/* Buildings */}
      {buildings.map(b => (
        <ProjectBuilding
          key={b.key}
          position={b.pos}
          color={b.color}
          height={b.h}
          label={b.label}
          onClick={() => visible && onProjectClick(b.key)}
        />
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 4 — HALL OF ACHIEVEMENTS: Energy Crystals
// ─────────────────────────────────────────────────────────────────────────────
const EnergyCrystal = ({ position, color, label, onClick }) => {
  const mesh = useRef();
  const glow = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.5 + position[0];
      mesh.current.rotation.x = t * 0.3;
    }
    if (glow.current) {
      const s = 1 + Math.sin(t * 1.8 + position[0]) * 0.12;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position} onClick={onClick}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
        {/* Crystal facets */}
        <mesh ref={mesh}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Glow aura */}
        <mesh ref={glow}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.08} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.22}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {label}
        </Text>
      </Float>

      {/* Ground beam */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.02, 0.4, 5, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const HallOfAchievements = ({ visible, onCertClick }) => {
  const certs = [
    { key: 'c1',  pos: [-10, 0, -2],  color: '#ffd700', label: 'Python I' },
    { key: 'c2',  pos: [-7,  1, -5],  color: '#ffd700', label: 'Python II' },
    { key: 'c3',  pos: [-4,  0, -3],  color: '#00ffff', label: 'IoT' },
    { key: 'c4',  pos: [-1, -1, -6],  color: '#ff0055', label: 'Cybersec' },
    { key: 'c5',  pos: [2,   0, -2],  color: '#7b61ff', label: 'Network I' },
    { key: 'c6',  pos: [5,   1, -5],  color: '#7b61ff', label: 'Network II' },
    { key: 'c7',  pos: [8,   0, -3],  color: '#00ff88', label: 'Dig Safety' },
    { key: 'c8',  pos: [11, -1, -6],  color: '#ff8800', label: 'Social Mkt' },
    { key: 'c9',  pos: [-6,  2, -9],  color: '#00ccff', label: 'Reports' },
    { key: 'c10', pos: [3,  -1, -9],  color: '#ff66cc', label: 'Content' },
  ];

  return (
    <group>
      {certs.map(c => (
        <EnergyCrystal
          key={c.key}
          position={c.pos}
          color={c.color}
          label={c.label}
          onClick={() => visible && onCertClick(c.key)}
        />
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 5 — THE FINAL SCENE: Architect + Civilization Zoom-Out
// ─────────────────────────────────────────────────────────────────────────────
const ArchitectFigure = ({ visible }) => {
  const group = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.15;
    }
  });

  const opacity = visible ? 0.9 : 0;

  return (
    <group ref={group} position={[0, -3, 0]}>
      {/* Head */}
      <mesh position={[0, 4.2, 0]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={opacity} emissive="#00ffff" emissiveIntensity={1.5} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[1, 1.8, 0.5]} />
        <meshStandardMaterial color="#7b61ff" wireframe transparent opacity={opacity} emissive="#7b61ff" emissiveIntensity={1.2} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.9, 2.8, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 8]} />
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={opacity} emissive="#00ffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.9, 2.8, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 8]} />
        <meshStandardMaterial color="#00ffff" wireframe transparent opacity={opacity} emissive="#00ffff" emissiveIntensity={1} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.28, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.6, 8]} />
        <meshStandardMaterial color="#7b61ff" wireframe transparent opacity={opacity} emissive="#7b61ff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.28, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.6, 8]} />
        <meshStandardMaterial color="#7b61ff" wireframe transparent opacity={opacity} emissive="#7b61ff" emissiveIntensity={1} />
      </mesh>

      {/* Orbit ring around figure */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.03, 8, 100]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} transparent opacity={opacity * 0.6} />
      </mesh>

      {/* "I build worlds" label */}
      {visible && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          {"I don't just develop products.\nI build worlds."}
        </Text>
      )}
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA CONTROLLER — lerps camera based on scroll progress
// ─────────────────────────────────────────────────────────────────────────────
const CAMERA_KEYFRAMES = [
  // Phase 0 — Origin
  { pos: [0, 0, 10],   target: [0, 0, 0] },
  // Phase 1 — Creation
  { pos: [0, 5, 18],   target: [0, -3, 0] },
  // Phase 2 — Forest
  { pos: [0, 2, 8],    target: [0, 1, -5] },
  // Phase 3 — City
  { pos: [3, 3, 12],   target: [0, 0, -5] },
  // Phase 4 — Hall
  { pos: [-2, 2, 8],   target: [0, 0, -4] },
  // Phase 5 — Final
  { pos: [0, 8, 22],   target: [0, -2, 0] },
];

const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();

  useFrame(() => {
    const totalFrames = CAMERA_KEYFRAMES.length - 1;
    const raw = scrollProgress * totalFrames;
    const idx = Math.min(Math.floor(raw), totalFrames - 1);
    const frac = raw - idx;

    const a = CAMERA_KEYFRAMES[idx];
    const b = CAMERA_KEYFRAMES[Math.min(idx + 1, totalFrames)];

    const speed = 0.06;
    camera.position.x = lerp(camera.position.x, lerp(a.pos[0], b.pos[0], frac), speed);
    camera.position.y = lerp(camera.position.y, lerp(a.pos[1], b.pos[1], frac), speed);
    camera.position.z = lerp(camera.position.z, lerp(a.pos[2], b.pos[2], frac), speed);

    const tx = lerp(a.target[0], b.target[0], frac);
    const ty = lerp(a.target[1], b.target[1], frac);
    const tz = lerp(a.target[2], b.target[2], frac);
    camera.lookAt(tx, ty, tz);
  });

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN AvatarScene EXPORT
// ─────────────────────────────────────────────────────────────────────────────
const AvatarScene = ({ scrollProgress = 0, onSkillClick, onProjectClick, onCertClick }) => {
  const p = scrollProgress;

  // Phase visibility
  const showSeed    = p < 0.20;
  const showCreation = p >= 0.10 && p < 0.38;
  const showForest  = p >= 0.28 && p < 0.58;
  const showCity    = p >= 0.48 && p < 0.78;
  const showHall    = p >= 0.68 && p < 0.92;
  const showFinal   = p >= 0.84;

  const creationProgress = Math.max(0, Math.min(1, (p - 0.10) / 0.20));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100vh',
        zIndex: 0,
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#020510' }}
        eventSource={document.getElementById('root')}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={62} near={0.1} far={500} />
        <CameraController scrollProgress={p} />

        {/* Lights */}
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 8, 5]} intensity={2} color="#00ffff" />
        <pointLight position={[-12, 4, -8]} intensity={1.5} color="#7b61ff" />
        <pointLight position={[12, 4, -8]} intensity={1} color="#ffd700" />
        <pointLight position={[0, -3, -10]} intensity={0.8} color="#00ff88" />

        {/* Ambient starfield — always visible */}
        <Stars radius={120} depth={60} count={2500} factor={4} saturation={0} fade speed={0.5} />

        {/* ── PHASE 0: THE ORIGIN ── */}
        <DigitalSeed visible={showSeed} />

        {/* ── PHASE 1: THE CREATION ── */}
        <CreationTerrain progress={creationProgress} />

        {/* ── PHASE 2: KNOWLEDGE FOREST ── */}
        <KnowledgeForest visible={showForest} onSkillClick={onSkillClick} />

        {/* ── PHASE 3: INNOVATION CITY ── */}
        <InnovationCity visible={showCity} onProjectClick={onProjectClick} />

        {/* ── PHASE 4: HALL OF ACHIEVEMENTS ── */}
        <HallOfAchievements visible={showHall} onCertClick={onCertClick} />

        {/* ── PHASE 5: THE FINAL SCENE ── */}
        <ArchitectFigure visible={showFinal} />

        {/* Post-processing Bloom */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default AvatarScene;
