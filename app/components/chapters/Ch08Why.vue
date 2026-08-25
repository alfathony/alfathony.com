<script setup lang="ts">
/**
 * CHAPTER 08 — Why I make things.
 *
 * The quietest moment on the page, and the only chapter with no artwork in it at
 * all. After six chapters of line fields, a bare white wall is the loudest
 * available move — which is the whole reason the rest of the page stays
 * restrained.
 *
 * It is set small on purpose. A personal principle announced at display size
 * becomes a manifesto, and the brief is explicit that it must not read as one.
 */
</script>

<template>
  <section id="chapter-08" class="why">
    <ChapterMark index="08" label="Why" />

    <blockquote v-reveal="{ y: 16 }" class="why__principle">
      The best of humans are those who bring value to others.
    </blockquote>

    <p v-reveal="{ y: 16, delay: 0.45 }" class="why__after">
      Maybe that's why I've always liked making things.
    </p>
  </section>
</template>

<style scoped>
/*
  The space is the design here. These are the largest paddings in the system by a
  wide margin, and narrowing them to "tighten up the layout" would delete the
  chapter's only idea.
*/
.why {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 150vh;
  padding: var(--s-8) var(--gutter);
  background: var(--wall);
}

.why__principle {
  max-width: 26ch;
  font-size: clamp(1.5rem, 2.6vw, 2.4rem);
  line-height: 1.35;
  font-variation-settings: 'wdth' 96, 'wght' 400;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.why__after {
  max-width: var(--measure);
  margin-top: var(--s-6);
  /* Full ink at lead scale; the quieter rank is the lighter weight, not a grey. */
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}

@media (max-width: 700px) {
  .why {
    min-height: 110vh;
  }
}
</style>
