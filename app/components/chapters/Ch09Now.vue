<script setup lang="ts">
/**
 * CHAPTER 09 — What I'm making now.
 *
 * This is the page's defence against going stale. It reads as a working list
 * with dates, so a short list looks correct and an old one looks obviously
 * wrong — which is the pressure that keeps it updated.
 *
 * Entries still marked `placeholder` say so on screen. See app/content/now.ts.
 */
import { computed } from 'vue'
import { now } from '~/content/now'

const entries = computed(() =>
  [...now].sort((a, b) => b.date.localeCompare(a.date)),
)

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function stamp(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : formatter.format(d)
}
</script>

<template>
  <section id="chapter-09" class="now">
    <ChapterMark index="09" label="Now" />
    <div class="now__head">
      <h2 v-reveal class="statement now__lead">I'm still making things.</h2>
    </div>

    <ul v-reveal="{ children: '.now__entry', stagger: 0.08, y: 20 }" class="now__list">
      <li v-for="entry in entries" :key="entry.title + entry.date" class="now__entry">
        <p class="caption now__kind">{{ entry.kind }}</p>

        <div class="now__body">
          <component
            :is="entry.href ? 'a' : 'h3'"
            :href="entry.href || undefined"
            class="now__title"
            v-cursor="entry.href ? 'open' : 'default'"
          >
            {{ entry.title }}
            <span v-if="entry.placeholder" class="now__tag">placeholder</span>
          </component>
          <p class="now__note">{{ entry.note }}</p>
        </div>

        <time class="caption now__date" :datetime="entry.date">{{ stamp(entry.date) }}</time>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.now {
  position: relative;
  padding: var(--s-7) var(--gutter);
  background: var(--wall);
}

.now__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-5);
}

.now__list {
  border-top: var(--hairline) solid var(--ink);
}

.now__entry {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: baseline;
  padding: var(--s-3) 0;
  border-bottom: var(--hairline) solid var(--rule);
}

.now__kind {
  color: var(--ink-faint);
}

.now__title {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font-size: var(--t-large);
  line-height: 1.15;
  font-variation-settings: 'wdth' 88, 'wght' 600;
  letter-spacing: -0.01em;
}

a.now__title {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
}

/*
  The placeholder tag is a label with the accent BAND under it, not a solid
  yellow chip. The accent in this system is a frequency — the tightest band —
  and it is never a fill sitting behind content.
*/
.now__tag {
  padding-bottom: 4px;
  color: var(--ink-soft);
  font-size: var(--t-caption);
  font-variation-settings: 'wdth' 87, 'wght' 700;
  letter-spacing: var(--track-caption);
  text-transform: uppercase;
  white-space: nowrap;
  background-image: repeating-linear-gradient(
    90deg,
    var(--accent) 0 1.5px,
    transparent 1.5px 3px
  );
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 100% 3px;
}

.now__note {
  max-width: 46ch;
  margin-top: var(--s-1);
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}

.now__date {
  color: var(--ink-faint);
  white-space: nowrap;
}

@media (max-width: 700px) {
  .now__entry {
    grid-template-columns: 1fr auto;
    gap: var(--s-1) var(--s-2);
  }

  .now__kind {
    grid-column: 1 / -1;
  }
}
</style>
