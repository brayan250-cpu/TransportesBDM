import { useState, useEffect, useRef } from 'react'

/**
 * Wrapper de IntersectionObserver.
 * Devuelve [ref, isVisible]. Por defecto triggerea una sola vez.
 */
export function useIntersectionObserver(options = {}) {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isVisible]
}
