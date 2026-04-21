import { useMemo } from 'react'

/**
 * Detecta el tier de capacidad del dispositivo del visitante.
 * HIGH  → desktop potente (3D completo, post-processing, 60fps)
 * MEDIUM → desktop/tablet estándar (3D reducido, 30fps)
 * LOW   → smartphone rural, batería baja o prefers-reduced-motion (CSS fallbacks)
 */
export function useDeviceTier() {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'LOW'

    const memory  = navigator.deviceMemory  ?? 4
    const cores   = navigator.hardwareConcurrency ?? 4
    const dpr     = window.devicePixelRatio ?? 1
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile  = /Mobi|Android/i.test(navigator.userAgent)

    if (reduced) return 'LOW'
    if (!mobile && memory >= 6 && cores >= 8 && dpr >= 2) return 'HIGH'
    if (memory >= 3 && cores >= 4) return 'MEDIUM'
    return 'LOW'
  }, [])
}
