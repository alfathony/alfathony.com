<script setup lang="ts">
/**
 * CHAPTER 01 — Making things make sense.
 *
 * The visitor meets the idea before they meet the person. No name, no portrait,
 * no navigation: one canvas hung on a white wall with a sentence already inside
 * it, waiting to become legible.
 */
import { ref, computed } from 'vue'

const root = ref<HTMLElement | null>(null)
const wave = ref<{ active: boolean } | null>(null)

// While the shader is running it is drawing the headline itself, so the DOM copy
// steps out of the way visually — but stays in the document for assistive tech,
// for crawlers, and for the moment WebGL dies.
const live = computed(() => wave.value?.active === true)
</script>

<template>
  <section id="chapter-01" ref="root" class="opening">
    <div class="opening__sticky">
      <div class="opening__frame">
        <!--
          Client-only so Three.js never enters the server bundle. The fallback is
          a real wave field, not a spinner: on a prerendered first paint the
          canvas is already hung on the wall before any JavaScript runs.
        -->
        <ClientOnly>
          <WaveCanvas
            ref="wave"
            :lines="['I SPEND A LOT', 'OF TIME MAKING', 'THINGS MAKE SENSE.']"
            :portrait-lines="['I SPEND', 'A LOT OF TIME', 'MAKING THINGS', 'MAKE SENSE.']"
            :trigger="root"
            :resolve-at="0.7"
          />
          <template #fallback>
            <div class="opening__prefield" aria-hidden="true" />
          </template>
        </ClientOnly>
      </div>

      <div class="opening__chrome">
        <p class="caption opening__mark">01 / Making things make sense</p>

        <h1 class="display opening__title" :class="{ 'is-live': live }">
          I spend a lot of time making things make sense.
        </h1>

        <div class="opening__foot">
          <WallLabel
            title="Untitled (opening)"
            :details="[
              { term: 'Medium', value: 'Line frequency on white' },
              { term: 'State', value: 'Resolving' },
            ]"
          />
          <p class="caption opening__cue" aria-hidden="true">Scroll — it becomes legible</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opening {
  /* Long enough that the resolve is a journey, short enough that nobody feels
     trapped in it. */
  height: 320vh;
  background: var(--wall);
}

.opening__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}

/* The canvas is hung, not applied: white wall stays visible on every side. */
.opening__frame {
  position: absolute;
  inset: clamp(0.75rem, 3.2vw, 3.25rem);
  inset-block-end: clamp(5.5rem, 9vw, 8rem);
  border: var(--hairline) solid var(--ink);
}

.opening__prefield {
  position: absolute;
  inset: 0;
  background-color: var(--gallery);
  background-image: repeating-linear-gradient(
    180deg,
    var(--ink) 0 2px,
    var(--gallery) 2px 15px
  );
}

.opening__chrome {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(1.4rem, 4vw, 4rem);
  pointer-events: none;
}

.opening__mark {
  position: relative;
  align-self: flex-start;
  padding: var(--s-1) var(--s-2);
  background: var(--gallery);
  color: var(--ink);
}

/*
  The headline in markup. Visible whenever the shader is not drawing it, which
  covers reduced motion, WebGL failure, and the first frames of the page.

  It is deliberately set smaller than `--t-display`: at full display scale four
  condensed lines overflow the hung canvas and collide with the wall label
  beneath it. This is a real visitor's view, not a fallback nobody sees, so it
  is sized to sit inside the frame.
*/
.opening__title {
  position: absolute;
  top: 30%;
  left: clamp(1.4rem, 5.5vw, 5.5rem);
  right: clamp(1.4rem, 5.5vw, 5.5rem);
  max-width: 15ch;
  font-size: clamp(2.1rem, 6.4vw, 6.2rem);
  transition: opacity 0.5s var(--ease-optical);
}

.opening__title.is-live {
  opacity: 0;
}

.opening__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--s-4);
}

.opening__foot :deep(.label) {
  width: min(22rem, 42vw);
  background: var(--wall);
  padding-top: var(--s-1);
}

.opening__cue {
  padding: var(--s-1) var(--s-2);
  background: var(--wall);
  color: var(--ink-soft);
}

@media (max-width: 700px) {
  /*
    Set much larger on narrow screens. At the shared clamp the fallback headline
    filled only the top third of a near-full-height frame, and the rest of the
    canvas read as ruled notepaper with a caption rather than as a hung work.
  */
  .opening__title {
    top: 20%;
    max-width: none;
    font-size: clamp(2.4rem, 13vw, 4.5rem);
  }

  .opening__cue {
    display: none;
  }

  /* Leave real room under the canvas: at 42vw the label was 164px wide and
     wrapped into the frame it is supposed to sit beneath. */
  .opening__frame {
    inset-block-end: 8.5rem;
  }

  .opening__foot :deep(.label) {
    width: 100%;
  }

  .opening__foot {
    gap: var(--s-2);
  }
}
</style>
