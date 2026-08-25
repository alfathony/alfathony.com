<script setup lang="ts">
/*
  JOURNAL — writing in progress. The journal system itself is out of scope for this phase.

  Content is deliberately thin: this phase ships the route, the shared chrome
  and the visual language, not the page. Replacing it means replacing this
  component — nothing shared knows it is a placeholder.
*/
import { placeholderPages } from '~/content/site'

const page = placeholderPages['/journal']!

useHead({
  title: page.title,
  meta: [{ name: 'description', content: page.description }]
})
</script>

<template>
  <PlaceholderPage :page="page" />
</template>
