<script setup lang="ts">
/*
  WORK — the project index. Selected Work currently lives inside the About narrative, where it acts as the proof of the story; this route becomes the full index.

  Content is deliberately thin: this phase ships the route, the shared chrome
  and the visual language, not the page. Replacing it means replacing this
  component — nothing shared knows it is a placeholder.
*/
import { placeholderPages } from '~/content/site'

const page = placeholderPages['/work']!

useHead({
  title: page.title,
  meta: [{ name: 'description', content: page.description }]
})
</script>

<template>
  <PlaceholderPage :page="page" />
</template>
