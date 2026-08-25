<script setup lang="ts">
/*
  The ribbon. One stroked SVG path per Figma vector, nothing else.

  Decorative by contract: `aria-hidden`, `focusable="false"`, and
  `pointer-events: none` from the stylesheet, so it is out of the accessibility
  tree and can never intercept a click meant for the copy above it.

  `preserveAspectRatio="none"` is deliberate and is what makes the composition
  hold together. The SVG box is the same box the copy is positioned in, so a
  path drawn at x=64 in Figma's 1440-wide canvas lands under the sentence Figma
  also placed at x=64 — at any viewport width. The stroke does not stretch with
  it, because `vector-effect: non-scaling-stroke` keeps stroke-width in screen
  pixels; that is how the ribbon holds its specified 150 / 96 / 64px width per
  breakpoint instead of quietly scaling with the canvas.

  PHASE 2: `d` is the only thing that needs to change to morph a state. Every
  path carries a stable `id`, and the scene carries `data-scene`, so a timeline
  can address geometry without depending on DOM position.
*/
import type { RibbonPath } from '~/content/narrative'

defineProps<{
  paths: RibbonPath[]
  /** Scene id, e.g. `ch01.peak` — the Phase 2 addressing handle. */
  state: string
}>()
</script>

<template>
  <svg
    class="ribbon"
    :data-ribbon-state="state"
    viewBox="0 0 1440 900"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="path in paths"
      :id="path.id"
      :key="path.id"
      class="ribbon__path"
      :data-color="path.color"
      :d="path.d"
      :transform="path.dx || path.dy ? `translate(${path.dx ?? 0} ${path.dy ?? 0})` : undefined"
    />
  </svg>
</template>
