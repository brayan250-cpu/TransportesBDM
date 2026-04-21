import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ geometry, position, color, rotSpeed, floatSpeed, floatAmp, delay }) {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay
    if (meshRef.current) {
      meshRef.current.rotation.x = t * rotSpeed * 0.4
      meshRef.current.rotation.y = t * rotSpeed * 0.6
      meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed) * floatAmp
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * rotSpeed * 0.4
      wireRef.current.rotation.y = t * rotSpeed * 0.6
      wireRef.current.position.y = position[1] + Math.sin(t * floatSpeed) * floatAmp
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshPhongMaterial color={color} transparent opacity={0.08} flatShading />
      </mesh>
      <mesh ref={wireRef} position={position}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function ConnectingLines({ shapes }) {
  const lineRef = useRef()

  const positions = useMemo(() => {
    const pts = []
    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        pts.push(...shapes[i].position, ...shapes[j].position)
      }
    }
    return new Float32Array(pts)
  }, [shapes])

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#38BDF8" transparent opacity={0.06} />
    </lineSegments>
  )
}

const shapes = [
  { type: 'octahedron', position: [-2.5, 0.5, -1], color: '#2563EB', rotSpeed: 0.4, floatSpeed: 0.6, floatAmp: 0.3, delay: 0, args: [0.6, 0] },
  { type: 'torus', position: [2.8, -0.3, -0.5], color: '#38BDF8', rotSpeed: 0.3, floatSpeed: 0.5, floatAmp: 0.4, delay: 1, args: [0.5, 0.15, 8, 24] },
  { type: 'dodecahedron', position: [0, 1.5, -2], color: '#1D4ED8', rotSpeed: 0.25, floatSpeed: 0.7, floatAmp: 0.25, delay: 2, args: [0.5, 0] },
  { type: 'icosahedron', position: [-1.5, -1.2, 0.5], color: '#38BDF8', rotSpeed: 0.35, floatSpeed: 0.4, floatAmp: 0.35, delay: 3, args: [0.45, 0] },
  { type: 'torusKnot', position: [1.5, 1, -1.5], color: '#2563EB', rotSpeed: 0.2, floatSpeed: 0.55, floatAmp: 0.3, delay: 4, args: [0.35, 0.1, 64, 8, 2, 3] },
]

const geometryMap = {
  octahedron:   (args) => <octahedronGeometry args={args} />,
  torus:        (args) => <torusGeometry args={args} />,
  dodecahedron: (args) => <dodecahedronGeometry args={args} />,
  icosahedron:  (args) => <icosahedronGeometry args={args} />,
  torusKnot:    (args) => <torusKnotGeometry args={args} />,
}

export default function FloatingGeometryScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#38BDF8" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#2563EB" />

      {shapes.map((s, i) => (
        <FloatingShape
          key={i}
          geometry={geometryMap[s.type](s.args)}
          position={s.position}
          color={s.color}
          rotSpeed={s.rotSpeed}
          floatSpeed={s.floatSpeed}
          floatAmp={s.floatAmp}
          delay={s.delay}
        />
      ))}
      <ConnectingLines shapes={shapes} />
    </Canvas>
  )
}
