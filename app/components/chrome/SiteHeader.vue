<script setup lang="ts">
/*
  The wordmark and the menu trigger.

  FIXED, AND IT CONTRACTS
  At the top of the page this is exactly what the Hi-Fi draws: wordmark at the
  horizontal margin, trigger inset by the same margin, no surface behind either.
  Once the opening scene is behind you the wordmark steps aside and the trigger
  alone stays, so the menu is reachable from anywhere in a 27-viewport page
  without a persistent bar cutting across the ribbon.

  CONTRAST OVER THE RIBBON
  A fixed trigger travelling over Cobalt, Green, Red and Yellow cannot be ink
  dots on nothing. In its compact state the trigger sits on a small solid white
  disc — solid, not blurred, and only as large as the 48px target itself, so it
  reads as a control rather than a navigation bar. A hairline of ink at 14%
  keeps the disc's edge legible where it crosses white, which is the one case
  the disc alone cannot solve.

  The panel is a separate concern; the header only stays above it and flips to
  the on-colour tone Figma ships a Paper trigger variant for.
*/
const PANEL_ID = 'primary-navigation'

const { open, closeNav, toggleNav } = useNavigation()
const sentinel = useTemplateRef<HTMLElement>('sentinel')
const { compact } = useHeaderState(sentinel)
const trigger = useTemplateRef<{ focus: () => void }>('trigger')

/* Full form whenever the menu is open, whatever the scroll position: the panel
   covers the page anyway, and the wordmark anchors it. */
const isCompact = computed(() => compact.value && !open.value)

/* The panel is a dialog in everything but name: whatever dismisses it — Escape,
   a link, the trigger — puts focus back where it came from. */
function close() {
  closeNav()
  nextTick(() => trigger.value?.focus())
}
</script>

<template>
  <div>
    <!-- The threshold for contracting the header, and nothing else. -->
    <div ref="sentinel" class="site-header__sentinel" aria-hidden="true" />

    <header
      class="site-header"
      :data-tone="open ? 'on-color' : 'ink'"
      :data-compact="isCompact ? 'true' : 'false'"
    >
      <NuxtLink class="t-brand site-header__brand" to="/">Alfathony</NuxtLink>

      <div class="site-header__control">
        <MenuTrigger
          ref="trigger"
          :expanded="open"
          :controls="PANEL_ID"
          @click="toggleNav"
        />
      </div>
    </header>

    <NavigationPanel :open="open" :panel-id="PANEL_ID" @close="close" />
  </div>
</template>

<style scoped>
/*
  The distance from the trigger's place on the margin grid to a 16px corner
  inset, per breakpoint. Trigger top on the grid is (header-block - 48) / 2.
*/
.site-header {
  --tuck-x: 16px;
  --tuck-y: 0px;
}

@media (min-width: 768px) {
  .site-header {
    --tuck-x: 32px;  /* margin 48 → 16 */
    --tuck-y: -8px;  /* top 24 → 16 */
  }
}

@media (min-width: 1200px) {
  .site-header {
    --tuck-x: 48px;   /* margin 64 → 16 */
    --tuck-y: -16px;  /* top 32 → 16 */
  }
}

.site-header__sentinel {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 1px;
  /* Roughly the opening scene: contract once it is behind us. */
  block-size: 72svh;
  pointer-events: none;
}

.site-header {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: var(--z-header);
  block-size: var(--header-block);
  /* Respect a notch or a rounded corner without moving the target. */
  padding-inline: max(var(--margin-x), env(safe-area-inset-left)) max(var(--margin-x), env(safe-area-inset-right));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  color: var(--color-ink);
  /* The bar itself is never a surface — only the trigger's disc is. */
  background: none;
  pointer-events: none;
}

.site-header > * {
  pointer-events: auto;
}

.site-header[data-tone='on-color'] {
  /* Above the overlay, so the trigger stays put and stays the only way in or
     out of the panel. */
  z-index: calc(var(--z-overlay) + 1);
  color: var(--color-paper);
}

.site-header[data-tone='on-color'] :focus-visible {
  outline-color: var(--color-paper);
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--tap-min);
  color: inherit;
  transition:
    opacity var(--dur-fade) var(--ease-out-expo),
    transform var(--dur-fade) var(--ease-out-expo);
}

/* Contracted: the wordmark leaves, the trigger stays. */
.site-header[data-compact='true'] .site-header__brand {
  opacity: 0;
  transform: translate3d(0, -0.4em, 0);
  pointer-events: none;
}

.site-header__control {
  display: grid;
  place-items: center;
  border-radius: 50%;
  /* Solid white, sized to the target. No blur, no full-width bar. */
  background: transparent;
  box-shadow: none;
  transition:
    background-color var(--dur-fade) var(--ease-out-expo),
    box-shadow var(--dur-fade) var(--ease-out-expo),
    transform var(--dur-fade) var(--ease-out-expo);
}

/*
  Contracted, the trigger leaves the margin grid and tucks into the very corner.

  This is not decoration. The Hi-Fi puts display copy high in the frame in a
  dozen scenes — CH03 scene 07 sets a line that ends at x=1369 on a 1440 canvas
  — and a control parked on the 64px margin lands squarely on top of it. Figma
  only ever drew the menu in an opening scene, so it never had to answer for the
  rest of them. Moving to the corner clears every text column in the narrative,
  and it reads as what it now is: a floating control rather than part of the
  header's grid.

  Transform, not `top`/`right`, so the move never touches layout.
*/
.site-header[data-compact='true'] .site-header__control {
  background: var(--color-white);
  /* A hairline, for the one case the white disc cannot solve: white on white. */
  box-shadow: 0 0 0 1px rgb(13 13 13 / 14%);
  transform: translate3d(var(--tuck-x), var(--tuck-y), 0);
}

@media (prefers-reduced-motion: reduce) {
  .site-header__brand,
  .site-header__control {
    transition: none;
  }
}

/* Never let the tucked control sit under a notch or a rounded corner. */
@supports (padding: max(0px)) {
  .site-header[data-compact='true'] .site-header__control {
    margin-block-start: env(safe-area-inset-top);
    margin-inline-end: calc(env(safe-area-inset-right) * -1);
  }
}
</style>
