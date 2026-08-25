<script setup lang="ts">
/**
 * A single wave canvas, drawn in 2D.
 *
 * These are the site's authored artwork. No project imagery, hobby footage or
 * portrait exists yet, and the brief forbids inventing project detail — so
 * rather than filling those slots with grey rectangles or stock photography,
 * every one of them is a real work from this gallery, each with its own
 * frequency signature.
 *
 * Canvas 2D rather than WebGL on purpose: there can be a dozen of these on the
 * page at once, and a dozen WebGL contexts is how you lose the frame budget. The
 * shader in WaveCanvas.vue is reserved for the one place it argues something.
 *
 * ---
 *
 * ONE CLOCK. This block does not own a requestAnimationFrame loop. It joins
 * GSAP's ticker — the same clock Lenis and every ScrollTrigger already run on —
 * so ten blocks cost one rAF between them rather than ten competing with it.
 *
 * And it only joins while it has something to do. Membership is dropped the
 * frame the pointer ease settles, and again whenever the block scrolls out of
 * view or the tab is hidden, which is the same rule `useThreeStage` applies to
 * the WebGL stage. A wall of resting canvases costs nothing per frame.
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    /** Lines across the block. Higher reads as further away, or as finer. */
    frequency?: number
    /** Vertical swell, as a fraction of block height. */
    amplitude?: number
    /** Horizontal cycles of the swell. */
    cycles?: number
    /**
     * Ink coverage as a fraction of the line spacing. This, not a pixel weight,
     * is what keeps a field looking like the same material at any size: at 0.45
     * the black and white bands are near-equal and the block reads as a proper
     * wave canvas, where a fixed 2px stroke turns into a faint grey haze as soon
     * as the block gets large.
     */
    duty?: number
    /** Absolute stroke weight in CSS pixels. Overrides `duty` when set. */
    weight?: number
    /** Phase offset, so sibling blocks are not identical. */
    phase?: number
    /** Vertical lines instead of horizontal — the accent band's orientation. */
    vertical?: boolean
    /** Paint the field in the accent frequency's colour. */
    accent?: boolean
    /** React to pointer position: the field recalculates as the viewer moves. */
    reactive?: boolean
  }>(),
  {
    frequency: 34,
    amplitude: 0.06,
    cycles: 1.3,
    duty: 0.45,
    weight: 0,
    phase: 0,
    vertical: false,
    accent: false,
    reactive: false,
  },
)

const canvas = ref<HTMLCanvasElement | null>(null)
const host = ref<HTMLElement | null>(null)

let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null
let onVisibility: (() => void) | null = null

let pointer = 0
let pointerTarget = 0

/** True once this block is on the ticker. Never more than one callback. */
let running = false
/** Whether this block reacts to the pointer at all. Fixed at mount. */
let animated = false
let visible = false
let tabVisible = true

/** Below this the ease has arrived and there is nothing left to draw. */
const SETTLED = 0.0005

function paint() {
  const el = canvas.value
  const box = host.value
  if (!el || !box) return

  const dpr = Math.min(window.devicePixelRatio, 2)
  const w = box.clientWidth
  const h = box.clientHeight
  if (w === 0 || h === 0) return

  if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
    el.style.width = `${w}px`
    el.style.height = `${h}px`
  }

  const ctx = el.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = props.accent ? '#FFC400' : '#000000'
  ctx.lineCap = 'butt'

  const span = props.vertical ? w : h
  const across = props.vertical ? h : w
  const count = props.frequency
  const step = span / count

  ctx.lineWidth = props.weight > 0 ? props.weight : Math.max(1, step * props.duty)
  const amp = span * props.amplitude * (1 + pointer * 0.5)
  const segments = Math.max(24, Math.round(across / 6))

  for (let i = 0; i <= count; i++) {
    const base = i * step
    ctx.beginPath()
    for (let s = 0; s <= segments; s++) {
      const t = s / segments
      const swell =
        Math.sin(t * Math.PI * 2 * props.cycles + props.phase + pointer * 0.8) *
        amp *
        // Damp the swell toward the edges so the block reads as a framed work
        // rather than a slice of an endless pattern.
        Math.sin(t * Math.PI)

      const along = t * across
      const offset = base + swell

      const x = props.vertical ? offset : along
      const y = props.vertical ? along : offset

      if (s === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

/* ------------------------------------------------------------- clock ---- */

function setRunning(next: boolean) {
  if (next === running) return
  running = next
  if (running) gsap.ticker.add(tick)
  else gsap.ticker.remove(tick)
}

/**
 * Ease toward the pointer target, then get off the ticker.
 *
 * Same 0.07 lerp and same settle threshold the old rAF loop used, so the swell
 * arrives with exactly the weight it did before — GSAP's ticker and rAF both
 * run at display rate, so a frame here is the same length as a frame there.
 */
function tick() {
  const next = pointer + (pointerTarget - pointer) * 0.07
  if (Math.abs(next - pointer) > SETTLED) {
    pointer = next
    paint()
    return
  }

  // Land exactly on the target, draw the final frame, then stop costing
  // anything at all until the pointer moves again.
  if (pointer !== pointerTarget) {
    pointer = pointerTarget
    paint()
  }
  setRunning(false)
}

/** Rejoin the ticker, if there is anything to animate and anyone to see it. */
function wake() {
  if (!animated || !visible || !tabVisible) return
  if (pointer === pointerTarget) return
  setRunning(true)
}

function evaluate() {
  if (!visible || !tabVisible) {
    setRunning(false)
    return
  }
  wake()
}

/* ----------------------------------------------------------- pointer ---- */

function onMove(e: PointerEvent) {
  const box = host.value
  if (!box) return
  const r = box.getBoundingClientRect()
  pointerTarget = ((e.clientY - r.top) / r.height - 0.5) * 2
  wake()
}

function onLeave() {
  pointerTarget = 0
  wake()
}

/* --------------------------------------------------------- lifecycle ---- */

onMounted(() => {
  paint()

  ro = new ResizeObserver(() => paint())
  if (host.value) ro.observe(host.value)

  animated = props.reactive && !prefersReducedMotion()
  if (!animated || !host.value) return

  host.value.addEventListener('pointermove', onMove)
  host.value.addEventListener('pointerleave', onLeave)

  io = new IntersectionObserver(
    (entries) => {
      const next = entries.some((entry) => entry.isIntersecting)

      // Scrolling a block away does not fire pointerleave, so it could return
      // still holding a swell. Send it back to rest while nobody is looking.
      if (visible && !next && pointer !== 0) {
        pointerTarget = 0
        pointer = 0
        paint()
      }

      visible = next
      evaluate()
    },
    // Start a beat before it scrolls into view, matching the WebGL stage.
    { rootMargin: '15% 0px 15% 0px' },
  )
  io.observe(host.value)

  onVisibility = () => {
    tabVisible = document.visibilityState === 'visible'
    evaluate()
  }
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  setRunning(false)

  ro?.disconnect()
  io?.disconnect()
  ro = null
  io = null

  if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)
  onVisibility = null

  host.value?.removeEventListener('pointermove', onMove)
  host.value?.removeEventListener('pointerleave', onLeave)
})

// Every prop that changes what gets drawn. `cycles`, `phase` and `vertical`
// were missing here before, so retuning them appeared to do nothing until
// something else happened to trigger a repaint.
watch(
  () => [
    props.frequency,
    props.amplitude,
    props.cycles,
    props.duty,
    props.weight,
    props.phase,
    props.vertical,
    props.accent,
  ],
  () => paint(),
  { flush: 'post' },
)
</script>

<template>
  <div ref="host" class="block">
    <canvas ref="canvas" aria-hidden="true" />
  </div>
</template>

<style scoped>
.block {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--gallery);
  overflow: hidden;
}

canvas {
  display: block;
}
</style>
