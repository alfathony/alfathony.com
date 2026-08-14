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
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
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
let raf = 0
let pointer = 0
let pointerTarget = 0
let dirty = true

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

function loop() {
  raf = requestAnimationFrame(loop)
  const next = pointer + (pointerTarget - pointer) * 0.07
  if (Math.abs(next - pointer) > 0.0005 || dirty) {
    pointer = next
    dirty = false
    paint()
  }
}

function onMove(e: PointerEvent) {
  const box = host.value
  if (!box) return
  const r = box.getBoundingClientRect()
  pointerTarget = ((e.clientY - r.top) / r.height - 0.5) * 2
}

function onLeave() {
  pointerTarget = 0
}

onMounted(() => {
  paint()
  ro = new ResizeObserver(() => {
    dirty = true
    paint()
  })
  if (host.value) ro.observe(host.value)

  if (props.reactive && !prefersReducedMotion()) {
    host.value?.addEventListener('pointermove', onMove)
    host.value?.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)
  }
})

onBeforeUnmount(() => {
  ro?.disconnect()
  cancelAnimationFrame(raf)
  host.value?.removeEventListener('pointermove', onMove)
  host.value?.removeEventListener('pointerleave', onLeave)
})

watch(() => [props.frequency, props.amplitude, props.weight, props.duty, props.accent], () => {
  dirty = true
  paint()
})
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
