/**
 * The motion engine for the About narrative.
 *
 * One IntersectionObserver and one rAF-throttled scroll listener for the whole
 * page, however many scenes register. Nothing here owns a listener of its own,
 * because 27 scenes with 27 scroll handlers is how a long page starts dropping
 * frames.
 *
 * WHAT IT WRITES
 *   data-armed    once, at registration — "motion is running, CSS may hide me"
 *   data-entered  one-shot, when the scene first comes near the viewport
 *   --draw        0 to 1, scrubbed with scroll, driving the ribbon's stroke
 *
 * WHY IT ARMS RATHER THAN HIDES BY DEFAULT
 * The hidden state lives behind `[data-armed]`, which only ever appears if this
 * engine starts. So the server-rendered document is fully legible on its own: if
 * the script never runs, or the visitor asked for reduced motion, every line of
 * copy and every ribbon is simply there, drawn, with nothing to wait for. There
 * is no flash of hidden content either — registration marks whatever is already
 * on screen as entered synchronously, before the first paint after hydration.
 *
 * READS AND WRITES ARE BATCHED
 * Each frame reads every active scene's rect first and writes afterwards, so a
 * frame costs one layout at most instead of one per scene.
 */
import { prefersReducedMotion } from '~/composables/useReducedMotion'

/** How far through the scene's approach the ribbon finishes drawing. */
const TEMPO_SPAN: Record<string, number> = {
  /* Complexity builds: the line keeps drawing well into the scene. */
  build: 1,
  /* The default settle. */
  settle: 0.85,
  /* Resolution arrives: the line is complete early, then simply holds. */
  direct: 0.62
}

interface SceneEntry {
  span: number
}

interface Engine {
  register: (el: HTMLElement, tempo: string) => void
  release: (el: HTMLElement) => void
  destroy: () => void
}

let engine: Engine | null = null
let refCount = 0

function createEngine(): Engine {
  const scenes = new Map<HTMLElement, SceneEntry>()
  const active = new Set<HTMLElement>()
  let pending: HTMLElement[] = []
  let frame = 0

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          active.add(el)
          /* One-shot: copy that has arrived never leaves again, so a fast
             scroll back up cannot blank the page. */
          el.dataset.entered = ''
        } else {
          active.delete(el)
        }
      }
      schedule()
    },
    /* Generous margin: the entrance is already under way by the time a scene
       reaches the viewport, so fast scrolling never outruns the copy. */
    { rootMargin: '25% 0px 25% 0px', threshold: 0 }
  )

  function schedule() {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  function tick() {
    frame = 0
    const viewport = window.innerHeight

    /* Read everything first… */
    const measured: Array<[HTMLElement, number]> = []
    for (const el of active) {
      const entry = scenes.get(el)
      if (!entry) continue
      const top = el.getBoundingClientRect().top
      const progress = (viewport - top) / (viewport * entry.span)
      measured.push([el, progress < 0 ? 0 : progress > 1 ? 1 : progress])
    }

    /* …then write. Never interleaved. */
    for (const [el, progress] of measured) {
      el.style.setProperty('--draw', progress.toFixed(4))
    }
  }

  function flush() {
    if (!pending.length) return
    const batch = pending
    pending = []

    /*
      Arming only toggles opacity and transform, so it cannot invalidate layout
      — the rects read on the next line are still the real ones.

      `--draw: 0` matters: without it a scene that has not been observed yet
      falls back to the CSS default of 1 and appears fully drawn for the frame
      between entering the viewport and the observer firing.
    */
    for (const el of batch) {
      el.dataset.armed = ''
      el.style.setProperty('--draw', '0')
    }

    const viewport = window.innerHeight
    const rects = batch.map((el) => el.getBoundingClientRect())

    batch.forEach((el, index) => {
      const rect = rects[index]
      if (rect && rect.top < viewport && rect.bottom > 0) {
        el.dataset.entered = ''
      }
      observer.observe(el)
    })

    tick()
  }

  const onScroll = () => schedule()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })

  return {
    register(el, tempo) {
      scenes.set(el, { span: TEMPO_SPAN[tempo] ?? TEMPO_SPAN.settle! })
      pending.push(el)
      /* Microtasks run before paint, so every scene mounted in this tick is
         measured together, in one batch, ahead of the first frame. */
      queueMicrotask(flush)
    },
    release(el) {
      scenes.delete(el)
      active.delete(el)
      observer.unobserve(el)
    },
    destroy() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      scenes.clear()
      active.clear()
      pending = []
    }
  }
}

/**
 * Registers one scene with the shared engine for as long as it is mounted.
 *
 * Returns without doing anything when the visitor asked for reduced motion —
 * which is the whole reduced-motion implementation: no engine, so no
 * `data-armed`, so nothing is ever hidden and nothing is ever interpolated.
 */
export function useNarrativeMotion(
  el: Ref<HTMLElement | null>,
  tempo: () => string
) {
  onMounted(() => {
    if (prefersReducedMotion()) return
    const node = el.value
    if (!node) return

    engine ??= createEngine()
    refCount += 1
    engine.register(node, tempo())
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
