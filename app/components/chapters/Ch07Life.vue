<script setup lang="ts">
/**
 * CHAPTER 07 — Life outside work.
 *
 * Three works, hung large, named and nothing else. The brief is firm that these
 * do not get described or explained, so the only text in the chapter is the
 * three words.
 *
 * Each field is tuned to its subject's motion and responds to the pointer, which
 * is this world's native interaction: the canvas holds still, the viewer moves,
 * and the work recalculates.
 */
import { life } from '~/content/life'
</script>

<template>
  <section id="chapter-07" class="chapter life">
    <ChapterMark index="07" label="Outside" />
    <div class="chapter__head">
      <h2 v-reveal class="statement life__lead">When I'm not making things make sense…</h2>
    </div>

    <ul class="life__works">
      <li
        v-for="(subject, i) in life"
        :key="subject.label"
        v-reveal="{ y: 40, delay: i * 0.08 }"
        class="life__work"
      >
        <div class="life__frame" v-cursor="'look'">
          <video
            v-if="subject.video"
            :src="subject.video"
            :poster="subject.poster || undefined"
            autoplay
            muted
            loop
            playsinline
          />
          <WaveBlock v-else v-bind="subject.field" reactive />
        </div>
        <h3 class="display cut life__name">{{ subject.label }}</h3>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.life__lead {
  max-width: 20ch;
}

.life__works {
  display: flex;
  flex-direction: column;
  gap: var(--s-6);
}

.life__work {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: var(--s-4);
}

/* Alternate the side each work hangs on so the wall has a rhythm. */
.life__work:nth-child(even) {
  direction: rtl;
}

.life__work:nth-child(even) > * {
  direction: ltr;
}

.life__frame {
  aspect-ratio: 16 / 10;
  border: var(--hairline) solid var(--ink);
  overflow: hidden;
  background: var(--gallery);
}

.life__frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.life__name {
  /*
    Derived from the frame hanging beside it: that canvas is half the content
    width at 16:10 and carries 54 lines, so its period is width * 0.625 / 54.
  */
  --frame-w: calc((100vw - 2 * var(--gutter) - var(--s-4)) / 2);
  --cut-period: clamp(4px, calc(var(--frame-w) * 0.625 / 54), 10px);
  --cut-solid: 60%;
  font-size: clamp(3rem, 11vw, 11rem);
  line-height: 0.82;
}

@media (max-width: 780px) {
  .life__work,
  .life__work:nth-child(even) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: var(--s-2);
  }

  .life__works {
    gap: var(--s-5);
  }
}
</style>
