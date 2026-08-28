/**
 * The motion engine for the About narrative.
 *
 * One IntersectionObserver and one rAF-throttled scroll listener for the whole
 * page, however many scenes register. Every frame reads all active scenes'
 * geometry first and writes afterwards, so a frame costs one layout at most.
 *
 * DETERMINISTIC, NOT EVENT-DRIVEN
 * Nothing here latches. Every value is a pure function of where the scene sits
 * in the viewport right now, so scrolling back reverses it exactly, a fast
 * flick lands on the correct state rather than an interrupted one, and a reload
 * at a restored scroll offset renders what belongs at that offset. There is no
 * "has entered" class anywhere.
 *
 * WHAT IT WRITES
 *   --sp             per scene, 0-1: the scene's progress through the viewport
 *   --seg / --tail   per path: the visible arc, as a share of the path
 *   --stroke-user    per svg, on resize: stroke width in user units
 *
 * WHY --stroke-user EXISTS
 * The draw is a dash pattern, and dash patterns only respect `pathLength`
 * normalisation when the stroke scales with the geometry. Under
 * `vector-effect: non-scaling-stroke` the browser computes dashes in screen
 * space and `pathLength` is ignored outright — a 0.25 segment paints 96% of the
 * path. So the stroke scales with the canvas, and this converts the design's
 * fixed 150/96/64px into the user units that render to exactly that width.
 * Measured once per resize, never per frame.
 */
import { prefersReducedMotion } from '~/composables/useReducedMotion'

/** Draw window in scene progress, per tempo. Roughly 70-110% of a viewport. */
const TEMPO: Record<string, { enter: number; exit: number; copy: number }> = {
  /*
    Scene progress spans the scene's height plus a viewport, so a 900px scene in
    a 900px window has 1800px of range and a window of 0.5 is one full viewport
    of scrolling.

    Each reveal begins while the path's entry is still below the fold, keeps
    developing while the copy is readable, completes near the scene's exit, and
    then holds — the hold is what lets a scene feel finished rather than cut off.
  */
  build: { enter: 0.14, exit: 0.76, copy: 0.34 },
  settle: { enter: 0.18, exit: 0.72, copy: 0.32 },
  direct: { enter: 0.22, exit: 0.64, copy: 0.30 }
}

/** How a scene's draw is paced across its window. */
const CURVES: Record<string, (t: number) => number> = {
  steady: (t) => t,
  /* CH02: advance, hold, resume. The hold is the point — it reads as noticing. */
  observe: (t) =>
    t < 0.42 ? t * 1.071 : t < 0.58 ? 0.45 + (t - 0.42) * 0.3125 : 0.5 + (t - 0.58) * 1.1905,
  /* CH03: slow to commit, quick through the middle, easing out. */
  iterate: (t) => t * t * (3 - 2 * t)
}

const CANVAS_WIDTH = 1440

interface PathPlan {
  el: SVGPathElement
  enter: number
  exit: number
  retract?: [number, number]
  lead: number
}

interface ScenePlan {
  el: HTMLElement
  svg: SVGSVGElement | null
  paths: PathPlan[]
  curve: (t: number) => number
  copyAt: number
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

let engine: Engine | null = null
let refCount = 0

interface Engine {
  register: (el: HTMLElement, tempo: string, curve: string) => void
  release: (el: HTMLElement) => void
  destroy: () => void
}

function createEngine(): Engine {
  const scenes = new Map<HTMLElement, ScenePlan>()
  const active = new Set<HTMLElement>()
  let pending: HTMLElement[] = []
  let frame = 0

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) active.add(el)
        else active.delete(el)
      }
      schedule()
    },
    /* Wide margin: a scene starts drawing while it is still below the fold, so
       the next ribbon is already moving before the current one has finished —
       which is what stops each scene reading as a separate illustration. */
    { rootMargin: '60% 0px 60% 0px', threshold: 0 }
  )

  function schedule() {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  /** Progress of one scene through the viewport: 0 entering, 1 fully past. */
  function progressOf(rect: DOMRect, viewport: number) {
    return clamp01((viewport - rect.top) / (rect.height + viewport))
  }

  function apply(plan: ScenePlan, sp: number) {
    plan.el.style.setProperty('--sp', sp.toFixed(4))

    for (const path of plan.paths) {
      const span = path.exit - path.enter
      const raw = span > 0 ? (sp - path.enter) / span : 1
      const drawn = plan.curve(clamp01(raw))
      /* `lead` leaves a fragment on screen before the head starts moving. */
      const head = path.lead + drawn * (1 - path.lead)

      let tail = 0
      if (path.retract) {
        const [from, to] = path.retract
        const r = clamp01((sp - from) / (to - from))
        tail = r * head
      }

      path.el.style.setProperty('--tail', tail.toFixed(4))
      path.el.style.setProperty('--seg', Math.max(0, head - tail).toFixed(4))
    }
  }

  function tick() {
    frame = 0
    const viewport = window.innerHeight

    const measured: Array<[ScenePlan, number]> = []
    for (const el of active) {
      const plan = scenes.get(el)
      if (plan) measured.push([plan, progressOf(el.getBoundingClientRect(), viewport)])
    }
    for (const [plan, sp] of measured) apply(plan, sp)
  }

  /**
   * Convert the design's fixed pixel stroke into user units for the current
   * render size. Only the scale changes on resize, never the geometry.
   */
  function rescale() {
    const plans = [...scenes.values()]
    const widths = plans.map((plan) => {
      const box = plan.svg?.getBoundingClientRect()
      const token = getComputedStyle(plan.el).getPropertyValue('--ribbon-width')
      return { box, px: parseFloat(token) || 150 }
    })
    plans.forEach((plan, i) => {
      const w = widths[i]
      if (!plan.svg || !w?.box?.width) return
      const scale = w.box.width / CANVAS_WIDTH
      plan.svg.style.setProperty('--stroke-user', String(w.px / scale))
    })
  }

  function flush() {
    if (!pending.length) return
    pending = []

    /* One batched pass over EVERY registered scene, not only the visible ones:
       a scene below the fold must start at 0 rather than at the CSS default of
       "fully drawn", or it flashes complete for the frame before the observer
       reaches it. */
    const viewport = window.innerHeight
    const plans = [...scenes.values()]
    const rects = plans.map((plan) => plan.el.getBoundingClientRect())

    plans.forEach((plan, i) => {
      const rect = rects[i]
      if (rect) apply(plan, progressOf(rect, viewport))
      observer.observe(plan.el)
    })
    rescale()
  }

  const onScroll = () => schedule()
  const onResize = () => {
    rescale()
    schedule()
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  return {
    register(el, tempo, curve) {
      const timing = TEMPO[tempo] ?? TEMPO.settle!
      const svg = el.querySelector<SVGSVGElement>('svg.ribbon')
      const paths = [...el.querySelectorAll<SVGPathElement>('.ribbon__path')].map((node) => ({
        el: node,
        enter: Number(node.dataset.enter ?? timing.enter),
        exit: Number(node.dataset.exit ?? timing.exit),
        retract: node.dataset.retract
          ? (node.dataset.retract.split(',').map(Number) as [number, number])
          : undefined,
        lead: Number(node.dataset.lead ?? 0)
      }))

      el.style.setProperty('--copy-enter', String(timing.copy))
      scenes.set(el, {
        el,
        svg,
        paths,
        curve: CURVES[curve] ?? CURVES.steady!,
        copyAt: timing.copy
      })
      pending.push(el)
      queueMicrotask(flush)
    },
    release(el) {
      scenes.delete(el)
      active.delete(el)
      observer.unobserve(el)
    },
    destroy() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      scenes.clear()
      active.clear()
      pending = []
    }
  }
}

/**
 * Registers one scene for as long as it is mounted.
 *
 * Returns without doing anything under reduced motion. That is the entire
 * reduced-motion implementation: no engine, so no custom properties are ever
 * written, so every ribbon and every line of copy renders at its CSS default —
 * complete. Nothing can be left half drawn.
 */
export function useNarrativeMotion(
  el: Ref<HTMLElement | null>,
  tempo: () => string,
  curve: () => string
) {
  onMounted(() => {
    if (prefersReducedMotion()) return
    const node = el.value
    if (!node) return
    engine ??= createEngine()
    refCount += 1
    engine.register(node, tempo(), curve())
  })

  onBeforeUnmount(() => {
    const node = el.value
    if (!engine || !node) return
    engine.release(node)
    refCount -= 1
    if (refCount <= 0) {
      engine.destroy()
      engine = null
      refCount = 0
    }
  })
}
