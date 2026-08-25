<script setup lang="ts">
/*
  The layout every unfinished page shares.

  It reuses the scene primitive the About narrative is built from — the same
  1440x900 stage on desktop, the same ribbon-band-then-copy vertical path on
  tablet and mobile — so a placeholder is recognisably the same site rather than
  a holding page bolted on beside it.

  It is a layout, not a page: the sentence, the kicker and the gesture all come
  from configuration, so the next phase replaces the homepage by writing a new
  page component, without touching anything shared.

  The sentence is set in the heading voice rather than the display voice. Two
  reasons, and both matter: a placeholder should be quiet, and the display size
  reflows to five lines in the narrower desktop columns, which overruns the
  stage and clips. The heading size holds three lines with room to spare at
  every width from 1200 up.
*/
import { PLACEHOLDER_SENTENCE, type PlaceholderPageConfig } from '~/content/site'

defineProps<{ page: PlaceholderPageConfig }>()
</script>

<template>
  <main id="main-content" class="placeholder">
    <div class="scene" :data-scene="page.ribbon.id">
      <div class="scene__ribbon">
        <NarrativeRibbon :paths="[page.ribbon]" :state="page.ribbon.id" />
      </div>

      <div class="scene__stage">
        <h1 class="scene__item placeholder__headline" :style="placeOnCanvas(64, 480, 720)">
          <span class="t-label placeholder__eyebrow">{{ page.eyebrow }}</span>
          <!-- An explicit space: the two spans are block-level, and this keeps
               the computed accessible name from running them together. -->
          {{ ' ' }}
          <span class="t-heading placeholder__sentence">{{ PLACEHOLDER_SENTENCE }}</span>
        </h1>
      </div>
    </div>
  </main>
</template>

<style scoped>
.placeholder {
  background: var(--surface);
}

.placeholder__headline {
  /* The kicker names the page; the sentence is the page. */
  display: block;
}

.placeholder__eyebrow {
  display: block;
  margin-block-end: var(--space-5);
}

.placeholder__sentence {
  display: block;
}
</style>
