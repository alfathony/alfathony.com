<script setup lang="ts">
/*
  A chapter section: the landmark, its heading, and its scenes in order.

  The heading is visually hidden. Figma carries the chapter name as a small
  tracked label placed for composition — mid-chapter in CH01, first scene in
  CH02, absent entirely in CH03 — which is a fine thing for a page to look like
  and a poor thing for a document to be. So the label stays where Figma put it,
  as copy, and the section gets a real <h2> in the one place a heading belongs:
  the top of the region it names.
*/
import type { Chapter } from '~/content/narrative'

defineProps<{ chapter: Chapter }>()
</script>

<template>
  <section :id="chapter.id" :aria-labelledby="`${chapter.id}-heading`">
    <h2 :id="`${chapter.id}-heading`" class="visually-hidden">{{ chapter.title }}</h2>
    <NarrativeScene v-for="scene in chapter.scenes" :key="scene.id" :scene="scene" />
  </section>
</template>
