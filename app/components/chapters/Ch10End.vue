<script setup lang="ts">
/**
 * CHAPTER 10 — The ending.
 *
 * Returns to the opening sentence and finishes it, then hands over the signature
 * line. The wave field comes back here as a bookend, but already resolved: wide,
 * calm, regular — the same material as Chapter 01 at the other end of its range.
 *
 * The close is navigation, not a pitch. No "let's build something together".
 */
import { endNav } from '~/content/now'
</script>

<template>
  <footer id="chapter-10" class="end">
    <ChapterMark index="10" label="Everything in between" />
    <!--
      The bookend canvas: Chapter 01's material at the far end of its range.
      Rendered at full ink with a hairline duty rather than at low opacity —
      fading black lines produces grey, and grey is the one thing this world
      does not make. It is framed and labelled like every other work here.
    -->
    <div class="end__field">
      <WaveBlock :frequency="10" :amplitude="0.04" :cycles="0.9" :duty="0.09" reactive />
    </div>
    <p class="caption end__fieldlabel">Untitled (closing) — line frequency on white</p>

    <div class="end__body">

      <p v-reveal class="end__echo">I spend a lot of time making things make sense.</p>
      <p v-reveal="{ delay: 0.25 }" class="end__echo end__echo--strong">
        And I probably will for a while.
      </p>

      <h2 v-reveal="{ delay: 0.4, y: 34 }" class="display end__signature">
        <!-- One line: newlines between spans are condensed away, which would
             leave the accessible name reading "Things I make,things I think". -->
        <span class="cut cut-line">Things I make,</span> <span class="cut cut-line">things I think about,</span> <span class="cut cut-line">and everything in between.</span>
      </h2>

      <nav class="end__nav" aria-label="Site">
        <ul>
          <li v-for="item in endNav" :key="item.label">
            <a
              :href="item.href"
              v-cursor="item.external ? 'open' : { state: 'view', label: item.label, magnetic: true }"
              :rel="item.external ? 'noopener' : undefined"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <p class="caption end__colophon">
        Alfathony — © {{ new Date().getFullYear() }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.end {
  /* Explicit so the signature's cut period can be derived from the field's
     own line spacing: 10 lines across this height. */
  --end-field-h: clamp(180px, 26vh, 320px);
  position: relative;
  padding: var(--s-7) var(--gutter) var(--s-4);
  background: var(--wall);
  border-top: var(--hairline) solid var(--ink);
  overflow: hidden;
}

.end__field {
  position: absolute;
  inset: auto 0 0 0;
  height: var(--end-field-h);
  border-top: var(--hairline) solid var(--ink);
  background: var(--gallery);
}

.end__fieldlabel {
  position: absolute;
  right: var(--gutter);
  bottom: calc(var(--end-field-h) + var(--s-1));
  color: var(--ink-soft);
}

.end__body {
  position: relative;
  padding-bottom: calc(var(--end-field-h) + var(--s-4));
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.end__echo {
  max-width: 30ch;
  font-size: var(--t-large);
  line-height: 1.25;
  font-variation-settings: 'wdth' 96, 'wght' 300;
  color: var(--ink);
}

.end__echo--strong {
  font-variation-settings: 'wdth' 88, 'wght' 700;
}

.end__signature {
  /*
    Derived from the field below it — that canvas is --end-field-h tall and
    carries 10 lines — then clamped to a legible band, for the reason given on
    the .cut utility: past ~10px the stripes stop eroding the glyph and start
    cutting it in half.
  */
  --cut-period: clamp(4px, calc(var(--end-field-h) / 10), 26px);
  --cut-solid: 62%;
  margin-top: var(--s-5);
  font-size: clamp(2.1rem, 7.6vw, 8rem);
}

.end__nav {
  margin-top: var(--s-6);
  padding-top: var(--s-3);
  border-top: var(--hairline) solid var(--ink);
}

.end__nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2) var(--s-5);
}

.end__nav a {
  display: inline-block;
  font-size: var(--t-large);
  font-variation-settings: 'wdth' 80, 'wght' 600;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: border-color var(--dur-fast) var(--ease-snap);
}

.end__nav a:hover,
.end__nav a:focus-visible {
  border-bottom-color: var(--accent);
}

.end__colophon {
  margin-top: var(--s-5);
  color: var(--ink-faint);
}
</style>
