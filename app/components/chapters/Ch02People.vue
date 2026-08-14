<script setup lang="ts">
/**
 * CHAPTER 02 — For people.
 *
 * Deliberately one of the quiet chapters. The point is to establish that the
 * work starts with behaviour, not with interfaces, and that reads better stated
 * plainly than dramatised. The only visual argument is the readings column: the
 * same five behaviours, each at its own frequency, because a person hesitating
 * and a person dropping off are not the same signal.
 */
const readings = [
  { label: 'Hesitation', frequency: 16, amplitude: 0.11, cycles: 0.9 },
  { label: 'Confusion', frequency: 46, amplitude: 0.16, cycles: 2.6 },
  { label: 'Friction', frequency: 28, amplitude: 0.05, cycles: 3.4 },
  { label: 'The click', frequency: 9, amplitude: 0.02, cycles: 0.6 },
  { label: 'Drop-off', frequency: 34, amplitude: 0.2, cycles: 1.1 },
]
</script>

<template>
  <section id="chapter-02" class="people">
    <ChapterMark index="02" label="For people" />
    <p v-reveal class="statement people__bridge">And somehow, this became my job.</p>

    <div class="people__grid">
      <div class="people__col">

        <h2 v-reveal class="statement people__lead">
          I like figuring out why people do what they do.
        </h2>

        <div
          v-reveal="{ children: '.people__line', stagger: 0.14, y: 18 }"
          class="people__lines"
        >
          <p class="people__line">Why they hesitate.</p>
          <p class="people__line">Why they click.</p>
          <p class="people__line">Why they don't.</p>
          <p class="people__line people__line--wide">
            Why something that seems obvious to us isn't obvious to them.
          </p>
        </div>

        <p v-reveal="{ delay: 0.2 }" class="people__start">That's usually where I start.</p>
      </div>

      <ul
        v-reveal="{ children: '.people__reading', stagger: 0.1, y: 22 }"
        class="people__readings"
      >
        <li v-for="r in readings" :key="r.label" class="people__reading">
          <div class="people__field">
            <WaveBlock
              :frequency="r.frequency"
              :amplitude="r.amplitude"
              :cycles="r.cycles"
              :duty="0.4"
            />
          </div>
          <p class="caption">{{ r.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.people {
  position: relative;
  padding: var(--s-8) var(--gutter) var(--s-7);
  background: var(--wall);
}

.people__bridge {
  max-width: 18ch;
  margin-bottom: var(--s-8);
}

.people__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: var(--s-6);
  align-items: start;
}

.people__col {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}

.people__lead {
  max-width: 15ch;
  margin-top: var(--s-2);
}

.people__lines {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  margin-top: var(--s-3);
  font-size: var(--t-large);
  line-height: 1.25;
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}

.people__line--wide {
  max-width: 26ch;
  margin-top: var(--s-2);
  font-variation-settings: 'wdth' 88, 'wght' 500;
}

.people__start {
  margin-top: var(--s-4);
  font-size: var(--t-large);
  font-variation-settings: 'wdth' 92, 'wght' 600;
}

.people__readings {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  padding-top: var(--s-5);
}

.people__reading {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: var(--s-3);
  padding-bottom: var(--s-1);
  border-bottom: var(--hairline) solid var(--rule);
}

.people__field {
  height: 4.5rem;
}

@media (max-width: 900px) {
  .people {
    padding-top: var(--s-7);
  }

  .people__grid {
    grid-template-columns: 1fr;
    gap: var(--s-5);
  }

  .people__readings {
    padding-top: 0;
  }
}
</style>
