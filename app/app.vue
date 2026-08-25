<script setup lang="ts">
/*
  Document shell.

  Phase 1 is a static foundation, so there is no scroll rig, no cursor layer and
  no motion runtime mounted here. Two things are still true of the finished
  experience and are set up now: the skip link lands on the first chapter
  landmark, and reduced-motion preference is reflected onto the root element so
  CSS can act on it without asking JavaScript.
*/
onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.setAttribute('data-reduced-motion', '')
  }
})
</script>

<template>
  <div class="page">
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#why-i-make">Skip to content</a>
    <SiteHeader />
    <NuxtPage />
  </div>
</template>

<style>
.page {
  position: relative;
  /* The header is positioned against this, and the ribbon runs unbroken
     beneath it. */
  isolation: isolate;
}
</style>
