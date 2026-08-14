/**
 * Single source of truth for whether this visitor wants motion.
 *
 * The homepage is a scroll narrative, so "reduced motion" cannot mean "the page
 * stops working". Everywhere this returns true, the corresponding chapter must
 * render its FINAL state immediately — all copy present, nothing waiting on a
 * scroll trigger that will never fire.
 */
import { ref, onMounted, onBeforeUnmount, readonly } from 'vue'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  // Default to `true` on the server and before hydration: the static, fully
  // legible rendering is the safe state to send down the wire.
  const reduced = ref(true)

  let mql: MediaQueryList | null = null
  const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
    reduced.value = e.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    mql = window.matchMedia(QUERY)
    onChange(mql)
    mql.addEventListener('change', onChange as EventListener)
  })

  onBeforeUnmount(() => {
    mql?.removeEventListener('change', onChange as EventListener)
    mql = null
  })

  return { reduced: readonly(reduced) }
}

/**
 * Imperative one-shot check, for setup paths that run outside a component's
 * reactive scope (GSAP context creation, WebGL boot).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return window.matchMedia(QUERY).matches
}
