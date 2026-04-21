import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ColdChainScene — Cadena de Frío ≤6°C
 * Cristales de hielo flotando que representan el control de temperatura.
 * Partículas azul-celeste descendiendo suavemente como copos de nieve
 * microscópicos dentro de una cisterna refrigerada.
 */

function IceParticles({ count = 120 }) {
  const pointsRef = useRef()

  const { positions, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10   // x spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8    // y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4    // z depth
      vel[i] = 0.003 + Math.random() * 0.008         // fall speed
      sz[i] = 0.5 + Math.random() * 1.5              // size variation
    }
    return { positions: pos, velocities: vel, sizes: sz }
  }, [count])

  const colors = useMemo(() => {
    const c = new Float32Array(count * 3)
    const colA = new THREE.Color('#BAE6FD')  // ice light
    const colB = new THREE.Color('#38BDF8')  // celeste
    const colC = new THREE.Color('#FFFFFF')  // pure white
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const col = t < 0.35 ? colA : t < 0.7 ? colB : colC
      c[i * 3]     = col.r
      c[i * 3 + 1] = col.g
      c[i * 3 + 2] = col.b
    }
    return c
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Gentle fall
      pos[i3 + 1] -= velocities[i]
      // Horizontal drift (sine wave)
      pos[i3] += Math.sin(t * 0.5 + i * 0.1) * 0.002
      // Reset when below view
      if (pos[i3 + 1] < -4.5) {
        pos[i3 + 1] = 4.5
        pos[i3] = (Math.random() - 0.5) * 10
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

/* Hexagonal ice crystals floating */
function IceCrystal({ position, scale = 1, speed = 0.3 }) {
  const meshRef = useRef()
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.z = t * speed * 0.5
    meshRef.current.rotation.x = Math.sin(t * 0.3 + offset) * 0.3
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4 + offset) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshBasicMaterial
        color="#BAE6FD"
        transparent
        opacity={0.35}
        wireframe
      />
    </mesh>
  )
}

/* Temperature line: horizontal sine wave representing ≤6°C */
function TemperatureLine() {
  const lineRef = useRef()
  const count = 100

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (i / count) * 10 - 5
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = 0
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!lineRef.current) return
    const pos = lineRef.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const x = (i / count) * 10 - 5
      pos[i * 3 + 1] = Math.sin(x * 1.5 + t * 1.2) * 0.15
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <line ref={lineRef} position={[0, -2.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#38BDF8" transparent opacity={0.4} />
    </line>
  )
}

export default function ColdChainScene() {
  const crystalPositions = useMemo(() => [
    [-3, 1.5, -1], [2.5, 0.8, -0.5], [-1, -0.5, 0.5],
    [3.5, -1, -1], [-2, 2.2, 0], [1, 2, -1.5],
    [4, 1, 0.5], [-3.5, -1.5, -0.5],
  ], [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        background: 'transparent',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <IceParticles count={150} />
      {crystalPositions.map((pos, i) => (
        <IceCrystal
          key={i}
          position={pos}
          scale={0.6 + Math.random() * 0.8}
          speed={0.2 + Math.random() * 0.3}
        />
      ))}
      <TemperatureLine />
    </Canvas>
  )
}
