<script setup lang="ts">
/*
  Document shell.

  Phase 1 is a static foundation, so there is no scroll rig, no cursor layer and
  no motion runtime mounted here. What is set up: the skip link lands on the
  page's own main landmark, reduced-motion preference is reflected onto the root
  element so CSS can act on it without asking JavaScript, and the page content
  is marked `inert` while the navigation overlay is open — which is what keeps
  everything behind the panel out of the tab order and out of the accessibility
  tree, without a hand-rolled trap trying to guess at it.
*/
const { open } = useNavigation()

onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.setAttribute('data-reduced-motion', '')
  }
})
</script>

<template>
  <div class="page">
    <NuxtRouteAnnouncer />
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <div :inert="open ? true : undefined">
      <NuxtPage />
    </div>
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
