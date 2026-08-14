<script setup lang="ts">
/**
 * CHAPTER 06 — Apparently, people don't hate working with me.
 *
 * No real quotes have been supplied, and the brief forbids fabricating them. So
 * this chapter ships in its awaiting state: the composition is complete and the
 * slots are real, hung and labelled, but every one of them says plainly that a
 * quote is pending rather than showing a plausible invention.
 *
 * The moment `voices` in app/content/voices.ts has entries, this switches to the
 * real rendering with no layout change. That is the entire mechanism.
 */
import { voices, slotCount, awaitingNote } from '~/content/voices'
</script>

<template>
  <section id="chapter-06" class="voices">
    <ChapterMark index="06" label="People I've worked with" />
    <div class="voices__head">
      <h2 v-reveal class="statement voices__lead">
        Apparently, people don't hate working with me.
      </h2>
    </div>

    <ul v-if="voices.length" class="voices__wall">
      <li
        v-for="voice in voices"
        :key="voice.name"
        v-reveal="{ y: 20 }"
        class="voices__note"
      >
        <blockquote class="voices__quote">{{ voice.quote }}</blockquote>
        <WallLabel
          :title="voice.name"
          :details="[
            { term: 'Role', value: voice.role },
            { term: 'At', value: voice.company },
          ]"
        />
      </li>
    </ul>

    <!--
      Awaiting state. Real hung canvases with real wall labels, not dashed
      wireframe boxes: an empty gallery still looks like a gallery. The first
      slot carries a wave field so the chapter holds the same material as every
      other wall in the building.
    -->
    <div v-else class="voices__wall">
      <div
        v-for="n in slotCount"
        :key="n"
        v-reveal="{ y: 20, delay: n * 0.05 }"
        class="voices__note"
      >
        <div class="voices__slot">
          <WaveBlock
            v-if="n === 1"
            :frequency="26"
            :amplitude="0.1"
            :cycles="1.6"
            :duty="0.45"
            reactive
          />
        </div>
        <WallLabel
          :title="`Untitled (${String(n).padStart(2, '0')})`"
          :accent="n === 1"
          :details="[
            { term: 'Speaker', value: '' },
            { term: 'Status', value: awaitingNote },
          ]"
        />
      </div>
      <p class="voices__explain">
        Real quotes from real people are going here. Rather than fill the wall
        with invented ones, it's hanging empty until they arrive.
      </p>
    </div>
  </section>
</template>

<style scoped>
.voices {
  position: relative;
  padding: var(--s-7) var(--gutter);
  background: var(--wall);
  border-block: var(--hairline) solid var(--ink);
}

.voices__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-6);
}

.voices__lead {
  max-width: 20ch;
}

/*
  Not a card grid: the notes sit at irregular heights and widths, the way things
  actually get pinned to a wall.
*/
.voices__wall {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-4) var(--s-5);
  align-items: flex-start;
}

.voices__note {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  flex: 1 1 15rem;
  max-width: 22rem;
}

.voices__note:nth-child(even) {
  margin-top: var(--s-4);
}

.voices__quote {
  font-size: var(--t-large);
  line-height: 1.3;
  font-variation-settings: 'wdth' 92, 'wght' 400;
  text-wrap: pretty;
}

.voices__slot {
  aspect-ratio: 5 / 4;
  border: var(--hairline) solid var(--ink);
  background: var(--gallery);
  overflow: hidden;
}

.voices__explain {
  flex: 1 1 100%;
  max-width: var(--measure);
  margin-top: var(--s-4);
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}
</style>
