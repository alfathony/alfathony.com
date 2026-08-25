<script setup lang="ts">
/*
  ABOUT — one continuous scroll narrative, four ordered chapters, one <main>.

  This is the original storytelling page, moved off `/` unchanged. Its scenes,
  ribbon geometry, chapter order, responsive behaviour and accessibility are
  untouched; only the route and the metadata moved.

  CH01–CH03 are nine Figma scenes each; CH04 is a single unified project index.
  The visual composition is asymmetric on desktop, but this document reads
  top-to-bottom in narrative order at every breakpoint and in every screen
  reader — which is the whole reason the scene coordinates live in content and
  not in the markup.
*/
import { chapters } from '~/content/narrative'

useHead({
  title: 'About Alfathony — Why I make, who I make for, and what I make',
  meta: [
    {
      name: 'description',
      content:
        'Everything starts with a reason. A scroll narrative about why I make, who I make for, what I make, and the work that proves it.'
    }
  ]
})
</script>

<template>
  <main id="main-content">
    <h1 class="visually-hidden">
      Alfathony — things I make, things I think about, and everything in between
    </h1>

    <NarrativeChapter
      v-for="chapter in chapters"
      :key="chapter.id"
      :chapter="chapter"
    />

    <Ch04SelectedWork />
  </main>
</template>
