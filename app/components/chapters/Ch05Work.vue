<script setup lang="ts">
/**
 * CHAPTER 05 — Some things I've had my hands on.
 *
 * Teasers, not case studies. Each project is a work hung on the wall with its
 * own frequency signature and its own label.
 *
 * On the honesty of this chapter: the project NAMES are real and were given by
 * Alfathony. Nothing else was. So the labels show the real name and mark every
 * unknown field as awaiting copy rather than inventing a role, a year, a client
 * or an outcome — see app/content/projects.ts. A project with no destination is
 * not rendered as a link and does not take the VIEW cursor, because a teaser
 * that goes nowhere is worse than a teaser that admits it.
 */
import { ref } from 'vue'
import { projects } from '~/content/projects'
import { workSignature } from '~/content/fields'

const hovered = ref<number | null>(null)
</script>

<template>
  <section id="chapter-05" class="chapter work">
    <ChapterMark index="05" label="Things I've had my hands on" />
    <div class="chapter__head">
      <h2 v-reveal class="statement work__lead">
        <span class="cut cut-line">Some things I've</span> <span class="cut cut-line">had my hands on.</span>
      </h2>
    </div>

    <ul
      v-reveal="{ children: '.work__item', stagger: 0.09, y: 34 }"
      class="work__grid"
      @pointerleave="hovered = null"
    >
      <li
        v-for="(project, i) in projects"
        :key="project.name"
        class="work__item"
        :class="{ 'is-dimmed': hovered !== null && hovered !== i }"
        @pointerenter="hovered = i"
      >
        <component
          :is="project.href ? 'a' : 'div'"
          :href="project.href || undefined"
          class="work__plate"
          v-cursor="project.href ? { state: 'view', label: project.name } : 'default'"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="`${project.name} — project image`"
          >
          <WaveBlock v-else v-bind="workSignature(i)" reactive />
        </component>

        <WallLabel
          :title="project.name"
          :accent="i === 0"
          :details="[
            { term: 'Year', value: project.year },
            { term: 'Context', value: project.context },
          ]"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
/*
  The cut stripes are derived from the canvases hanging below them, not picked:
  a plate is (viewport − gutters − 2 gaps) / 3 wide at 4:3, and the first
  plate's field is 18 lines tall, so its period is plateHeight / 18 — ~16.7px
  at 1440px, which is what that canvas actually measures.

  Then clamped to 10px, because an erosion band on a headline is roughly a
  third the height of a plate: at the plate's full period the glyph would take
  one or two cuts and read as amputated rather than eroded. The card shows the
  same relationship — its letter erosion is visibly finer than its canvases.
*/
.work__lead {
  --plate-w: calc((100vw - 2 * var(--gutter) - 6rem) / 3);
  --cut-period: clamp(4px, calc(var(--plate-w) * 0.75 / 18), 18px);
  --cut-solid: 64%;
  max-width: 18ch;
}

.work__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(19rem, 100%), 1fr));
  gap: var(--s-5) var(--s-4);
}

/* Fewer columns means wider plates, so the derived period widens with them. */
@media (max-width: 1000px) {
  .work__lead { --plate-w: calc((100vw - 2 * var(--gutter) - 3rem) / 2); }
}

@media (max-width: 640px) {
  .work__lead { --plate-w: calc(100vw - 2 * var(--gutter)); }
}

.work__item {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  transition: opacity var(--dur-mid) var(--ease-optical);
}

/* The active work becomes dominant by the others receding, not by growing. */
.work__item.is-dimmed {
  opacity: 0.28;
}

.work__plate {
  display: block;
  aspect-ratio: 4 / 3;
  border: var(--hairline) solid var(--ink);
  overflow: hidden;
  background: var(--gallery);
}

.work__plate img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* The first work is offset upward, so the wall does not read as a grid of tiles. */
@media (min-width: 1000px) {
  .work__item:nth-child(3n + 2) {
    margin-top: var(--s-5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .work__item.is-dimmed {
    opacity: 1;
  }
}
</style>
