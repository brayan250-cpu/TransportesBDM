import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TIER_CONFIG = {
  HIGH:   { count: 6000, size: 0.018, speed: 0.35, rings: 5 },
  MEDIUM: { count: 2500, size: 0.022, speed: 0.2, rings: 3 },
}

/* ── Orbiting Particle Vortex ──────────────────────────────── */
function generateVortexPositions(count) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = i / count
    const radius = 1.2 + t * 3.0
    const theta = t * Math.PI * 12 + Math.random() * 0.5
    const y = (Math.random() - 0.5) * 3
    positions[i * 3]     = radius * Math.cos(theta) + (Math.random() - 0.5) * 0.3
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = radius * Math.sin(theta) + (Math.random() - 0.5) * 0.3
  }
  return positions
}

function generateVortexColors(count) {
  const colors = new Float32Array(count * 3)
  const colA = new THREE.Color('#38BDF8') // celeste
  const colB = new THREE.Color('#2563EB') // blue
  const colC = new THREE.Color('#FFFFFF') // white
  for (let i = 0; i < count; i++) {
    const t = Math.random()
    const col = t < 0.4 ? colA.clone().lerp(colB, t / 0.4) :
                t < 0.7 ? colB.clone().lerp(colC, (t - 0.4) / 0.3) :
                           colC.clone().lerp(colA, (t - 0.7) / 0.3)
    colors[i * 3]     = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b
  }
  return colors
}

function ParticleVortex({ count, size, speed }) {
  const pointsRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const originalPositions = useMemo(() => generateVortexPositions(count), [count])
  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions])
  const colors    = useMemo(() => generateVortexColors(count), [count])

  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [gl])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const geo = pointsRef.current.geometry
    const pos = geo.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ox = originalPositions[i3]
      const oy = originalPositions[i3 + 1]
      const oz = originalPositions[i3 + 2]
      const angle = t * speed * 0.3
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      pos[i3]     = ox * cos - oz * sin
      pos[i3 + 1] = oy + Math.sin(t * 0.5 + i * 0.01) * 0.15
      pos[i3 + 2] = ox * sin + oz * cos
    }
    geo.attributes.position.needsUpdate = true

    // Camera parallax
    state.camera.position.x += (mouseRef.current.x * 0.4 - state.camera.position.x) * 0.03
    state.camera.position.y += (mouseRef.current.y * 0.3 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Morphing Icosahedron with Glow ──────────────────────── */
function MorphingIcosahedron({ speed }) {
  const meshRef = useRef()
  const wireRef = useRef()
  const originalPositions = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Morph vertices
    const geo = meshRef.current.geometry
    if (!originalPositions.current) {
      originalPositions.current = geo.attributes.position.array.slice()
    }
    const pos = geo.attributes.position.array
    const orig = originalPositions.current

    for (let i = 0; i < pos.length; i += 3) {
      const ox = orig[i], oy = orig[i + 1], oz = orig[i + 2]
      const dist = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const noise = Math.sin(ox * 3 + t * speed) * Math.cos(oy * 3 + t * speed * 0.7) * Math.sin(oz * 3 + t * speed * 0.5)
      const scale = 1 + noise * 0.15
      pos[i]     = ox * scale
      pos[i + 1] = oy * scale
      pos[i + 2] = oz * scale
    }
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()

    meshRef.current.rotation.y = t * 0.15
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
  })

  return (
    <group>
      {/* Solid subtle inner */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshPhongMaterial
          color="#1D4ED8"
          emissive="#2563EB"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
          flatShading
        />
      </mesh>
      {/* Wireframe glow */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.62, 4]} />
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}

/* ── Floating Ring Particles ──────────────────────────────── */
function FloatingRings({ count }) {
  const groupRef = useRef()
  const rings = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        radius: 0.3 + Math.random() * 0.15,
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6
        ],
        rotationSpeed: 0.2 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      })
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((ring, i) => {
      const data = rings[i]
      ring.rotation.x = t * data.rotationSpeed * 0.5
      ring.rotation.z = t * data.rotationSpeed * 0.3
      ring.position.y = data.position[1] + Math.sin(t * 0.5 + data.floatOffset) * 0.4
    })
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={ring.position}>
          <torusGeometry args={[ring.radius, 0.02, 8, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroParticleScene({ tier }) {
  const config = TIER_CONFIG[tier] ?? TIER_CONFIG.MEDIUM

  return (
    <Canvas
      dpr={tier === 'HIGH' ? [1, 2] : [1, 1]}
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: tier === 'HIGH', alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#38BDF8" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#2563EB" />
      <MorphingIcosahedron speed={config.speed} />
      <ParticleVortex count={config.count} size={config.size} speed={config.speed} />
      <FloatingRings count={config.rings} />
    </Canvas>
  )
}
