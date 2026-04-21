import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedWave({ color1 = '#2563EB', color2 = '#38BDF8', segments = 80 }) {
  const meshRef = useRef()
  const colA = useMemo(() => new THREE.Color(color1), [color1])
  const colB = useMemo(() => new THREE.Color(color2), [color2])

  useFrame((state) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry
    const pos = geo.attributes.position
    const col = geo.attributes.color
    const t = state.clock.elapsedTime

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const wave1 = Math.sin(x * 0.6 + t * 1.2) * 0.35
      const wave2 = Math.sin(z * 0.5 + t * 0.8) * 0.2
      const wave3 = Math.cos(x * 0.3 + z * 0.4 + t * 0.6) * 0.15
      pos.setY(i, wave1 + wave2 + wave3)

      const mix = (Math.sin(x * 0.3 + t * 0.5) + 1) * 0.5
      const c = colA.clone().lerp(colB, mix)
      col.setXYZ(i, c.r, c.g, c.b)
    }
    pos.needsUpdate = true
    col.needsUpdate = true
  })

  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(16, 6, segments, segments)
    const colors = new Float32Array(g.attributes.position.count * 3)
    for (let i = 0; i < colors.length; i += 3) {
      colors[i] = colA.r; colors[i + 1] = colA.g; colors[i + 2] = colA.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [segments, colA])

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 3.5, 0, 0]} position={[0, -0.5, 0]}>
      <meshBasicMaterial vertexColors transparent opacity={0.4} side={THREE.DoubleSide} wireframe />
    </mesh>
  )
}

export default function WaveScene({ variant = 'blue' }) {
  const colors = variant === 'celeste'
    ? { c1: '#38BDF8', c2: '#BAE6FD' }
    : { c1: '#2563EB', c2: '#38BDF8' }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <AnimatedWave color1={colors.c1} color2={colors.c2} />
    </Canvas>
  )
}
