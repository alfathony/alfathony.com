/**
 * Lenis smooth scroll, wired into GSAP's ticker so scroll position and every
 * ScrollTrigger read from the same clock. Two rAF loops fighting each other is
 * the usual cause of jittery scrub, so there is exactly one here: GSAP's.
 *
 * Honours prefers-reduced-motion by never starting at all — native scrolling is
 * the correct experience for anyone who asked for less motion.
 */
import { onMounted, onBeforeUnmount, shallowRef } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useReducedMotion'

export function useSmoothScroll() {
  const lenis = shallowRef<Lenis | null>(null)

  const tick = (time: number) => {
    // GSAP ticker reports seconds; Lenis wants milliseconds.
    lenis.value?.raf(time * 1000)
  }

  onMounted(() => {
    if (prefersReducedMotion()) return

    gsap.registerPlugin(ScrollTrigger)

    const instance = new Lenis({
      duration: 1.05,
      // Long, soft tail. The narrative wants weight without feeling laggy.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have momentum scrolling; hijacking it feels wrong.
      syncTouch: false,
    })

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    lenis.value = instance
  })

  onBeforeUnmount(() => {
    gsap.ticker.remove(tick)
    lenis.value?.destroy()
    lenis.value = null
  })

  return { lenis }
}
