/**
 * The page's two custom directives, registered on both server and client.
 *
 * They must exist during SSR even though they do nothing there: a directive
 * registered only on the client makes the server renderer throw when it tries to
 * read `getSSRProps` off a directive that isn't there. So the server branch
 * registers inert versions and returns.
 *
 * ---
 *
 * `v-reveal` — scroll entry for narrative lines.
 *
 *   <p v-reveal>…</p>
 *   <div v-reveal="{ children: '.line', stagger: 0.1 }">…</div>
 *
 * The hidden state is applied here, in JS, never in CSS. That ordering is the
 * point: if JavaScript fails, if GSAP never loads, or if the visitor asked for
 * reduced motion, the markup is simply visible. Nothing on this page is gated
 * behind an animation that might not run.
 *
 * `v-cursor` — declarative custom-cursor states.
 *
 *   <a v-cursor="'open'">
 *   <div v-cursor="{ state: 'view', label: 'Pestapora', magnetic: true }">
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor, type CursorState } from '~/composables/useCursor'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

interface RevealOptions {
  delay?: number
  y?: number
  stagger?: number
  children?: string
  start?: string
}

type CursorBinding =
  | CursorState
  | { state: CursorState; label?: string; magnetic?: boolean }

interface CursorHandlers {
  enter: () => void
  leave: () => void
}

const revealTriggers = new WeakMap<HTMLElement, ScrollTrigger>()
const cursorHandlers = new WeakMap<HTMLElement, CursorHandlers>()

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp

  if (import.meta.server) {
    const inert = { getSSRProps: () => ({}) }
    app.directive('reveal', inert)
    app.directive('cursor', inert)
    return
  }

  /* ------------------------------------------------------------- reveal --- */

  app.directive('reveal', {
    getSSRProps: () => ({}),

    mounted(el: HTMLElement, binding) {
      if (prefersReducedMotion()) return

      gsap.registerPlugin(ScrollTrigger)
      const opts: RevealOptions = binding.value ?? {}

      const targets = opts.children
        ? Array.from(el.querySelectorAll<HTMLElement>(opts.children))
        : [el]
      if (targets.length === 0) return

      gsap.set(targets, { opacity: 0, y: opts.y ?? 26 })

      revealTriggers.set(
        el,
        ScrollTrigger.create({
          trigger: el,
          start: opts.start ?? 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: opts.delay ?? 0,
              stagger: opts.stagger ?? 0,
              ease: 'power3.out',
            })
          },
        }),
      )
    },

    unmounted(el: HTMLElement) {
      revealTriggers.get(el)?.kill()
      revealTriggers.delete(el)
    },
  })

  /* ------------------------------------------------------------- cursor --- */

  const cursor = useCursor()

  const finePointer = () =>
    window.matchMedia?.('(pointer: fine)').matches === true

  function parse(value: CursorBinding) {
    return typeof value === 'string'
      ? { state: value, label: undefined as string | undefined, magnetic: false }
      : { magnetic: false, ...value }
  }

  function unbindCursor(el: HTMLElement) {
    const h = cursorHandlers.get(el)
    if (!h) return
    el.removeEventListener('pointerenter', h.enter)
    el.removeEventListener('pointerleave', h.leave)
    el.removeEventListener('focus', h.enter)
    el.removeEventListener('blur', h.leave)
    cursorHandlers.delete(el)
  }

  function bindCursor(el: HTMLElement, value: CursorBinding) {
    unbindCursor(el)
    if (!finePointer() || !value) return

    const { state, label, magnetic } = parse(value)
    if (state === 'default') return

    const enter = () => {
      cursor.set(state, label)
      if (magnetic) cursor.attract(el)
    }
    const leave = () => cursor.reset()

    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    // A focused control reads the same as a hovered one for keyboard visitors.
    el.addEventListener('focus', enter)
    el.addEventListener('blur', leave)

    cursorHandlers.set(el, { enter, leave })
  }

  app.directive('cursor', {
    getSSRProps: () => ({}),
    mounted: (el: HTMLElement, binding) => bindCursor(el, binding.value),
    updated: (el: HTMLElement, binding) => {
      if (binding.value !== binding.oldValue) bindCursor(el, binding.value)
    },
    unmounted: unbindCursor,
  })
})
