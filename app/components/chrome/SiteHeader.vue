<script setup lang="ts">
/*
  The wordmark and the menu trigger, positioned exactly where Figma puts them in
  the opening scene of a chapter: wordmark at the horizontal margin, trigger
  inset by the same margin on the right, both inside a header band of
  112 / 96 / 80px.

  The header sits above the navigation overlay, not under it, so the trigger
  stays visible and stays the single control: one button, one `aria-expanded`.
  When the panel is open the header switches to its on-colour tone — the Paper
  wordmark and Paper dots Figma ships a variant for.
*/
const PANEL_ID = 'primary-navigation'

const { open, closeNav, toggleNav } = useNavigation()
const trigger = useTemplateRef<{ focus: () => void }>('trigger')

/* The panel is a dialog in everything but name: whatever dismisses it — Escape,
   a link, the trigger — puts focus back where it came from. */
function close() {
  closeNav()
  nextTick(() => trigger.value?.focus())
}
</script>

<template>
  <div>
    <header class="site-header" :data-tone="open ? 'on-color' : 'ink'">
      <NuxtLink class="t-brand site-header__brand" to="/">Alfathony</NuxtLink>

      <MenuTrigger
        ref="trigger"
        :expanded="open"
        :controls="PANEL_ID"
        @click="toggleNav"
      />
    </header>

    <NavigationPanel :open="open" :panel-id="PANEL_ID" @close="close" />
  </div>
</template>

<style scoped>
.site-header {
  position: absolute;
  inset-block-start: 0;
  inset-inline: 0;
  /* Above the overlay: the trigger is the only control the panel needs. */
  z-index: var(--z-header);
  block-size: var(--header-block);
  padding-inline: var(--margin-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  color: var(--color-ink);
}

.site-header[data-tone='on-color'] {
  /* Fixed and above the overlay, so the trigger stays put and stays the only
     way in or out of the panel. */
  position: fixed;
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
}
</style>
