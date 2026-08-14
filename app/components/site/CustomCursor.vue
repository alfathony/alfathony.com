<script setup lang="ts">
/**
 * The cursor as a gallery instrument.
 *
 * At rest it is a small ink square — the smallest possible unit of the wave
 * field. On anything interactive it opens into a labelled disc. It does not
 * pulse, spin, or trail, because the brief is explicit that a constantly
 * animated cursor is an annoying one, and because in this world the work holds
 * still and only the viewer moves.
 *
 * Never rendered for coarse pointers or reduced motion; those visitors keep the
 * system cursor, which is the correct experience rather than a fallback.
 */
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { useCursor } from '~/composables/useCursor'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

const { state, label, magnet } = useCursor()

const enabled = ref(false)
/** Stays false until the pointer reports a real position. */
const seen = ref(false)
const root = ref<HTMLElement | null>(null)

let setX: ((v: number) => void) | null = null
let setY: ((v: number) => void) | null = null

const open = computed(() => state.value !== 'default' && state.value !== 'hidden')

function move(e: PointerEvent) {
  // Until the pointer has actually moved we have no position, and parking the
  // mark at 0,0 leaves a stray black square in the corner of the first paint.
  if (!seen.value) seen.value = true

  let x = e.clientX
  let y = e.clientY

  // Magnetism: when hovering a magnetic element, the cursor is pulled toward
  // its centre rather than sitting exactly under the pointer.
  const el = magnet.value
  if (el) {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x += (cx - x) * 0.32
    y += (cy - y) * 0.32
  }

  setX?.(x)
  setY?.(y)
}

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  if (!fine || prefersReducedMotion()) return

  enabled.value = true
  document.body.classList.add('has-custom-cursor')

  // quickTo keeps the follow on GSAP's ticker instead of firing a tween per
  // pointer event.
  setX = gsap.quickTo(root.value!, 'x', { duration: 0.32, ease: 'power3' })
  setY = gsap.quickTo(root.value!, 'y', { duration: 0.32, ease: 'power3' })

  window.addEventListener('pointermove', move, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', move)
  document.body.classList.remove('has-custom-cursor')
})

watch(open, (isOpen) => {
  if (!root.value) return
  gsap.to(root.value.querySelector('.cursor__disc'), {
    scale: isOpen ? 1 : 0.16,
    duration: 0.36,
    ease: 'power3.out',
  })
})
</script>

<template>
  <div
    v-show="enabled && seen"
    ref="root"
    class="cursor"
    :class="[`is-${state}`, { 'is-open': open }]"
    aria-hidden="true"
  >
    <div class="cursor__disc">
      <span v-if="label" class="cursor__label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-cursor);
  pointer-events: none;
  will-change: transform;
}

.cursor__disc {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  margin: -38px 0 0 -38px;
  background: var(--ink);
  border-radius: 50%;
  /* Resting scale is set here so the first frame is a small square, not a
     full-size disc that snaps down after hydration. */
  transform: scale(0.16);
}

/* At rest the disc is small enough to read as a square mark, so square it off. */
.cursor:not(.is-open) .cursor__disc {
  border-radius: 2px;
}

.cursor__label {
  font-size: var(--t-caption);
  font-variation-settings: 'wdth' 87, 'wght' 700;
  letter-spacing: var(--track-caption);
  text-transform: uppercase;
  color: var(--gallery);
  white-space: nowrap;
}

.cursor.is-hidden {
  opacity: 0;
}
</style>
