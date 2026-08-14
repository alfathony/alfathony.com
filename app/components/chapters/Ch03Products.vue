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
const stages = [
  { term: 'A question', frequency: 62, amplitude: 0.22, cycles: 3.8, duty: 0.38 },
  { term: 'A pattern', frequency: 40, amplitude: 0.14, cycles: 2.4, duty: 0.42 },
  { term: 'A structure', frequency: 22, amplitude: 0.07, cycles: 1.5, duty: 0.46 },
  { term: 'A product', frequency: 12, amplitude: 0.02, cycles: 0.8, duty: 0.5 },
]
</script>

<template>
  <section id="chapter-03" class="products">
    <ChapterMark index="03" label="For products" />
    <div class="products__head">
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
          <WaveBlock
            :frequency="s.frequency"
            :amplitude="s.amplitude"
            :cycles="s.cycles"
            :duty="s.duty"
            :phase="i * 0.9"
          />
        </div>
        <WallLabel
          :title="s.term"
          :details="[{ term: 'Stage', value: String(i + 1).padStart(2, '0') }]"
        />
      </li>
    </ol>

    <div class="products__close">
      <p v-reveal class="products__line">Design is usually where I start.</p>
      <p v-reveal="{ delay: 0.25 }" class="products__line products__line--strong">
        It doesn't have to be where I stop.
      </p>
    </div>
  </section>
</template>

<style scoped>
.products {
  position: relative;
  padding: var(--s-7) var(--gutter);
  background: var(--wall);
}

.products__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-6);
}

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

.products__line {
  font-size: var(--t-large);
  line-height: 1.25;
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}

.products__line--strong {
  margin-top: var(--s-2);
  font-variation-settings: 'wdth' 88, 'wght' 700;
  color: var(--ink);
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
