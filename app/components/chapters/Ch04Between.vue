<script setup lang="ts">
/**
 * CHAPTER 04 — Somewhere between.
 *
 * The one place the page becomes genuinely playful, and it earns it by being
 * literal. Between each pair of opposed words sits a strip containing two line
 * fields at slightly different angles. Their interference produces a moiré — a
 * third pattern that exists in neither field and only appears where they
 * overlap.
 *
 * That is not a metaphor for "the interesting part is usually somewhere
 * between", it is a demonstration of it. Moving the pointer across a strip
 * changes the angle between the fields, and the visitor discovers that the
 * interesting pattern is strongest at small differences and collapses when the
 * two agree completely.
 */
import { ref } from 'vue'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

const pairs = [
  { a: 'User', b: 'Business' },
  { a: 'Design', b: 'Technology' },
  { a: 'Idea', b: 'Reality' },
  { a: 'Problem', b: 'Solution' },
]

/**
 * The two fields differ in PERIOD, not in angle.
 *
 * Rotating a 9px grating by two degrees puts its spatial frequency far past
 * what a pixel grid can represent, and CSS gradients are not antialiased, so
 * the strip renders as random barcode noise instead of a fringe. Two
 * axis-aligned gratings of slightly different period produce the same
 * interference, render crisply at any density, and give a beat spacing of
 * p1·p2/|p1−p2| — which is a number we can actually steer.
 */
/**
 * Coarse on purpose. At a 9px period the half-bars land on sub-pixel boundaries
 * and the rasteriser's rounding jitter is larger than the beat itself, so the
 * strip reads as a barcode. At 20px every bar is cleanly resolved and the
 * interference is visible as what it is: bars drifting into and out of
 * alignment across the width.
 */
const BASE_PERIOD = 20

/** Resting periods differ per row so the page is not four identical fringes. */
const restPeriod = (i: number) => BASE_PERIOD + 1.1 + i * 0.5
const periods = ref(pairs.map((_, i) => restPeriod(i)))
const reduced = prefersReducedMotion()

function onMove(e: PointerEvent, index: number) {
  if (reduced) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const t = (e.clientX - r.left) / r.width
  // At the left edge the two fields nearly agree and the fringe stretches
  // toward infinity — it disappears. Disagreement is what makes the pattern.
  periods.value[index] = BASE_PERIOD + 0.15 + t * 4.5
}

function onLeave(index: number) {
  if (reduced) return
  periods.value[index] = restPeriod(index)
}
</script>

<template>
  <section id="chapter-04" class="chapter between">
    <ChapterMark index="04" label="Somewhere between" />
    <div class="chapter__head">
      <h2 v-reveal class="statement between__lead">
        The interesting part is usually somewhere between.
      </h2>
    </div>

    <ul v-reveal="{ children: '.between__row', stagger: 0.1, y: 24 }" class="between__rows">
      <li
        v-for="(pair, i) in pairs"
        :key="pair.a"
        class="between__row"
        @pointermove="onMove($event, i)"
        @pointerleave="onLeave(i)"
      >
        <span class="between__word">{{ pair.a }}</span>

        <span class="between__strip" aria-hidden="true">
          <span class="between__field between__field--a" />
          <span
            class="between__field between__field--b"
            :style="{ '--period': `${periods[i]}px` }"
          />
        </span>

        <span class="between__word between__word--end">{{ pair.b }}</span>
      </li>
    </ul>

    <p v-reveal="{ delay: 0.2 }" class="lead between__close">
      That's probably why I never really fit into one box.
    </p>
  </section>
</template>

<style scoped>
/* Shell comes from `.chapter`; the ruled edges are this chapter's own. */
.between {
  border-block: var(--hairline) solid var(--ink);
}

.between__lead {
  max-width: 16ch;
}

.between__rows {
  display: flex;
  flex-direction: column;
}

.between__row {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(3rem, 1fr) minmax(0, auto);
  align-items: center;
  gap: clamp(0.75rem, 2.5vw, 2.5rem);
  padding: clamp(0.6rem, 1.6vw, 1.4rem) 0;
  border-bottom: var(--hairline) solid var(--rule);
}

.between__row:first-child {
  border-top: var(--hairline) solid var(--rule);
}

.between__word {
  font-size: clamp(1.6rem, 5vw, 4.4rem);
  line-height: 1;
  font-variation-settings: 'wdth' 72, 'wght' 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}

.between__word--end {
  text-align: right;
}

/* The strip: two line fields, overlapping, differing only in angle. */
.between__strip {
  position: relative;
  display: block;
  height: clamp(1.8rem, 4.6vw, 4rem);
  overflow: hidden;
  background: var(--gallery);
  isolation: isolate;
}

/*
  Animating a custom property requires registering its type, otherwise the
  fringe jumps between pointer samples instead of sliding.
*/
@property --period {
  syntax: '<length>';
  inherits: false;
  initial-value: 21.1px;
}

/*
  Hard-edged, not ramped. A ramp between ink and paper produces mid greys, and
  this world generates tone by line frequency alone — mixing a grey to smooth
  the fringe would buy prettiness by breaking the system's one law. At a 20px
  period the square-wave beat is legible on its own: bars thicken into solid
  nodes where the two gratings agree and thin out where they oppose.
*/
.between__field {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    90deg,
    var(--ink) 0 10px,
    var(--gallery) 10px 20px
  );
}

.between__field--b {
  /* Difference blending is what produces the fringe: where the two gratings
     agree the result is black, where they disagree it is white, and the beat
     between those states — spacing p1·p2/|p1−p2| — is the moire. */
  mix-blend-mode: difference;
  background-image: repeating-linear-gradient(
    90deg,
    var(--ink) 0 calc(var(--period) / 2),
    var(--gallery) calc(var(--period) / 2) var(--period)
  );
  transition: --period var(--dur-fast) linear;
}

/* Type register comes from `.lead`. */
.between__close {
  margin-top: var(--s-6);
  max-width: 24ch;
}

@media (max-width: 640px) {
  .between__row {
    grid-template-columns: 1fr;
    gap: var(--s-2);
    text-align: left;
  }

  .between__word--end {
    text-align: left;
  }

  .between__strip {
    height: 2.4rem;
  }
}
</style>
