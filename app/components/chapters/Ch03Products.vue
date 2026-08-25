<script setup lang="ts">
/**
 * CHAPTER 03 — For products.
 *
 * The positioning beat: design is the starting point, not the boundary. The
 * copy carries that; the visual carries the *transformation*. Four fields, left
 * to right, going from a question (high frequency, unstable, high swell) to a
 * shipped thing (wide, calm, regular). Same material throughout — it is the same
 * work at four stages, not four different things.
 */
import { stages } from '~/content/fields'
</script>

<template>
  <section id="chapter-03" class="chapter products">
    <ChapterMark index="03" label="For products" />
    <div class="chapter__head">
      <h2 v-reveal class="statement products__lead">
        Then I turn those questions into products.
      </h2>
    </div>

    <ol
      v-reveal="{ children: '.products__stage', stagger: 0.12, y: 30 }"
      class="products__stages"
    >
      <li v-for="(s, i) in stages" :key="s.term" class="products__stage">
        <div class="products__field">
          <WaveBlock v-bind="s.field" />
        </div>
        <WallLabel
          :title="s.term"
          :details="[{ term: 'Stage', value: String(i + 1).padStart(2, '0') }]"
        />
      </li>
    </ol>

    <div class="products__close">
      <p v-reveal class="lead">Design is usually where I start.</p>
      <p v-reveal="{ delay: 0.25 }" class="lead lead--strong products__line--strong">
        It doesn't have to be where I stop.
      </p>
    </div>
  </section>
</template>

<style scoped>
.products__lead {
  max-width: 17ch;
}

.products__stages {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s-3);
}

.products__stage {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.products__field {
  aspect-ratio: 4 / 5;
  border: var(--hairline) solid var(--ink);
}

.products__close {
  margin-top: var(--s-6);
  margin-left: auto;
  max-width: 30ch;
  text-align: right;
}

/* Type register comes from `.lead` / `.lead--strong`; only the gap is local. */
.products__line--strong {
  margin-top: var(--s-2);
}

@media (max-width: 780px) {
  .products__stages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s-2) var(--s-3);
  }

  .products__close {
    text-align: left;
    margin-left: 0;
  }
}
</style>
