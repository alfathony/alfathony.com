<script setup lang="ts">
/*
  The ribbon. One stroked SVG path per Figma vector, nothing else.

  Decorative by contract: `aria-hidden`, `focusable="false"`, and
  `pointer-events: none` from the stylesheet, so it is out of the accessibility
  tree and can never intercept a click meant for the copy above it.

  HOW THE DRAW WORKS
  `pathLength="1"` renormalises every path to a single unit, so the visible arc
  is a dash pattern in path-fraction terms regardless of the real geometry:
  `0 <tail> <segment> 2` paints from `tail` to `tail + segment` and nothing
  else. Animating `segment` advances the head; animating `tail` alongside it
  retracts the line. Both come from the engine as plain numbers.

  WHY THE STROKE IS NOT non-scaling-stroke
  It was, and that was the bug. Under `vector-effect: non-scaling-stroke` the
  browser computes dash patterns in screen space and ignores `pathLength`
  outright — measured: a 0.25 segment paints 96% of the path, so the ribbon was
  fully inked at every scroll position and the "animation" moved a 1px dash
  pattern by one pixel. The stroke now scales with the canvas, and the engine
  converts the design's fixed 150/96/64px into user units on resize, which
  holds the specified widths exactly while leaving the dash maths honest.

  `xMidYMid meet` rather than `none` for the same reason: dashes need a uniform
  scale. The scene box already carries the viewBox's aspect ratio, so this
  changes no geometry — it only guarantees the uniformity the dash relies on.
*/
import type { RibbonPath } from '~/content/narrative'

defineProps<{
  paths: RibbonPath[]
  /** Scene id — the choreography's addressing handle. */
  state: string
  viewBox?: string
}>()
</script>

<template>
  <svg
    class="ribbon"
    :class="{ 'ribbon--multi': paths.length > 1 }"
    :data-ribbon-state="state"
    :viewBox="viewBox ?? '0 0 1440 900'"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="path in paths"
      :id="path.id"
      :key="path.id"
      class="ribbon__path"
      :data-color="path.color"
      :data-enter="path.enter"
      :data-exit="path.exit"
      :data-retract="path.retract ? path.retract.join(',') : undefined"
      :data-lead="path.lead"
      :d="path.d"
      pathLength="1"
      :transform="path.dx || path.dy ? `translate(${path.dx ?? 0} ${path.dy ?? 0})` : undefined"
    />
  </svg>
</template>
