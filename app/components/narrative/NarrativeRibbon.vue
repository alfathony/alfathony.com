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

  DRAWING
  `pathLength="1"` is the whole trick. It renormalises the path so that, for
  dash purposes, every path is exactly 1 unit long regardless of its real
  geometry. That means the draw is `stroke-dasharray: 1` against a dashoffset of
  `1 - progress`, in CSS, with no `getTotalLength()` call and no measurement of
  any kind — nothing recalculates when the viewport changes, and adding a path
  costs nothing.

  Where a scene carries more than one path, `--i` staggers them, so the
  peak-complexity beat accumulates Cobalt, then Red, then Yellow rather than
  flashing all three at once.
*/
import type { RibbonPath } from '~/content/narrative'

defineProps<{
  paths: RibbonPath[]
  /** Scene id, e.g. `ch01.peak` — the choreography's addressing handle. */
  state: string
}>()
</script>

<template>
  <svg
    class="ribbon"
    :class="{ 'ribbon--multi': paths.length > 1 }"
    :data-ribbon-state="state"
    viewBox="0 0 1440 900"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(path, index) in paths"
      :id="path.id"
      :key="path.id"
      class="ribbon__path"
      :style="{ '--i': index }"
      :data-color="path.color"
      :d="path.d"
      path-length="1"
      :transform="path.dx || path.dy ? `translate(${path.dx ?? 0} ${path.dy ?? 0})` : undefined"
    />
  </svg>
</template>
