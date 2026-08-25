<script setup lang="ts">
/*
  CONTACT — no form in this phase; this route exists so the navigation is complete and honest.

  Content is deliberately thin: this phase ships the route, the shared chrome
  and the visual language, not the page. Replacing it means replacing this
  component — nothing shared knows it is a placeholder.
*/
import { placeholderPages } from '~/content/site'

const page = placeholderPages['/contact']!

useHead({
  title: page.title,
  meta: [{ name: 'description', content: page.description }]
})
</script>

<template>
  <PlaceholderPage :page="page" />
</template>
