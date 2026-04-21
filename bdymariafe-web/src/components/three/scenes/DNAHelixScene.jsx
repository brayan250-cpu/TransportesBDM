import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function DNAHelix({ count = 200, speed = 0.5, heightRange = 10 }) {
  const groupRef = useRef()
  const spheresA = useRef([])
  const spheresB = useRef([])
  const lines = useRef([])

  const data = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6
      const y = (i / count) * heightRange - heightRange / 2
      arr.push({ t, y, radius: 1.2 })
    }
    return arr
  }, [count, heightRange])

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed
    data.forEach((d, i) => {
      const angle = d.t + time
      const x1 = Math.cos(angle) * d.radius
      const z1 = Math.sin(angle) * d.radius
      const x2 = Math.cos(angle + Math.PI) * d.radius
      const z2 = Math.sin(angle + Math.PI) * d.radius

      if (spheresA.current[i]) {
        spheresA.current[i].position.set(x1, d.y, z1)
      }
      if (spheresB.current[i]) {
        spheresB.current[i].position.set(x2, d.y, z2)
      }
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.055, 8, 8), [])
  const matA = useMemo(() => new THREE.MeshBasicMaterial({ color: '#2563EB', transparent: true, opacity: 0.82 }), [])
  const matB = useMemo(() => new THREE.MeshBasicMaterial({ color: '#38BDF8', transparent: true, opacity: 0.72 }), [])

  return (
    <group ref={groupRef}>
      {data.map((_, i) => (
        <group key={i}>
          <mesh ref={el => spheresA.current[i] = el} geometry={sphereGeo} material={matA} />
          <mesh ref={el => spheresB.current[i] = el} geometry={sphereGeo} material={matB} />
        </group>
      ))}
      {/* Connecting bars every few steps */}
      {data.filter((_, i) => i % 8 === 0).map((d, i) => (
        <ConnectorBar key={i} index={i * 8} data={data} speed={speed} />
      ))}
    </group>
  )
}

function ConnectorBar({ index, data, speed }) {
  const lineRef = useRef()

  useFrame((state) => {
    if (!lineRef.current || !data[index]) return
    const time = state.clock.elapsedTime * speed
    const d = data[index]
    const angle = d.t + time
    const positions = lineRef.current.geometry.attributes.position.array
    positions[0] = Math.cos(angle) * d.radius
    positions[1] = d.y
    positions[2] = Math.sin(angle) * d.radius
    positions[3] = Math.cos(angle + Math.PI) * d.radius
    positions[4] = d.y
    positions[5] = Math.sin(angle + Math.PI) * d.radius
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  const positions = useMemo(() => new Float32Array(6), [])

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#BAE6FD" transparent opacity={0.38} />
    </line>
  )
}

export default function DNAHelixScene({ count = 180, speed = 0.4, heightRange = 10, style = {} }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0, ...style }}
      aria-hidden="true"
    >
      <DNAHelix count={count} speed={speed} heightRange={heightRange} />
    </Canvas>
  )
}

export function GlobalDNABackground() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.11,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      aria-hidden="true"
    >
      <DNAHelix count={400} speed={0.8} heightRange={20} />
    </Canvas>
  )
}
