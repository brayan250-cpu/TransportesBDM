import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GlobeWireframe() {
  const globeRef = useRef()
  const dotsRef = useRef()
  const arcGroupRef = useRef()

  // Generate dots on sphere surface
  const dotData = useMemo(() => {
    const positions = []
    const count = 800
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const x = 1.5 * Math.cos(theta) * Math.sin(phi)
      const y = 1.5 * Math.sin(theta) * Math.sin(phi)
      const z = 1.5 * Math.cos(phi)
      positions.push(x, y, z)
    }
    return new Float32Array(positions)
  }, [])

  // Generate animated arcs
  const arcs = useMemo(() => {
    const arcList = []
    const cities = [
      [0.2, 0.8, -1.2], [-0.5, 0.3, 1.4], [1.0, -0.5, 0.9],
      [-1.1, 0.6, -0.5], [0.7, -0.9, -0.8], [-0.3, 1.1, 0.6],
    ]
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.5) continue
        arcList.push({ from: cities[i], to: cities[j] })
      }
    }
    return arcList
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y = t * 0.08
    }
    if (arcGroupRef.current) {
      arcGroupRef.current.rotation.y = t * 0.08
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Wireframe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Dots on surface */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotData, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#38BDF8" size={0.015} transparent opacity={0.5} sizeAttenuation />
      </points>

      {/* Glowing arcs */}
      <group ref={arcGroupRef}>
        {arcs.map((arc, i) => (
          <ArcLine key={i} from={arc.from} to={arc.to} index={i} />
        ))}
      </group>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.85, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ArcLine({ from, to, index }) {
  const lineRef = useRef()

  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const mid = start.clone().add(end).multiplyScalar(0.5)
    mid.normalize().multiplyScalar(2.5)
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [from, to])

  const positions = useMemo(() => {
    const pts = curve.getPoints(40)
    const arr = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z })
    return arr
  }, [curve])

  useFrame((state) => {
    if (lineRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 0.5 + index) + 1) * 0.5
      lineRef.current.material.opacity = 0.1 + t * 0.35
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#38BDF8" transparent opacity={0.3} />
    </line>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.3} />
      <GlobeWireframe />
    </Canvas>
  )
}
