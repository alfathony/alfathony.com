<script setup lang="ts">
import { onMounted } from 'vue'
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

useSmoothScroll()

onMounted(() => {
  // CSS needs to know, not just JS: `cursor: none` and every scroll-dependent
  // reveal is gated on this attribute.
  if (prefersReducedMotion()) {
    document.documentElement.setAttribute('data-reduced', '')
  }
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#chapter-01">Skip to content</a>
    <NuxtPage />
    <CustomCursor />
  </div>
</template>
