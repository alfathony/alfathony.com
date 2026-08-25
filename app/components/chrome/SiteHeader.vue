<script setup lang="ts">
/*
  The wordmark and the menu trigger, positioned exactly where Figma puts them in
  the opening scene of a chapter: wordmark at the horizontal margin, trigger
  inset by the same margin on the right, both inside a header band of
  112 / 96 / 80px.

  The header sits over the first scene rather than sticking to the viewport.
  That is what the Hi-Fi draws — the chrome appears once, at the top, and the
  ribbon runs unbroken from there down. A persistent, scroll-aware header would
  need to know where the ribbon is and recolour itself against it (Figma ships a
  Paper-coloured trigger variant for exactly that), which is scroll-driven
  behaviour and belongs to Phase 2.

  The panel is a DOCUMENTED PLACEHOLDER. Final navigation content is not locked,
  so this invents none of it: the disclosure mechanics, the landmark and the
  focus behaviour are real, and the contents say plainly that they are pending.
*/
const PANEL_ID = 'site-navigation-panel'

const open = ref(false)
const panel = ref<HTMLElement | null>(null)

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="site-header">
    <p class="t-brand site-header__brand">Alfathony</p>

    <MenuTrigger
      :expanded="open"
      :controls="PANEL_ID"
      @click="open = !open"
    />

    <nav
      :id="PANEL_ID"
      ref="panel"
      class="site-header__panel"
      aria-label="Primary"
      :hidden="!open"
    >
      <p class="t-label site-header__panel-label">Navigation</p>
      <p class="t-body site-header__panel-body">
        Menu content is not finalised. This panel is a placeholder: the
        disclosure behaviour, landmark and focus handling are in place, and the
        links land here once the navigation model is agreed.
      </p>
      <button class="t-label site-header__close" type="button" @click="close">
        Close
      </button>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: absolute;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: var(--z-header);
  block-size: var(--header-block);
  padding-inline: var(--margin-x);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
}

.site-header__brand {
  /* Figma sets the wordmark in the brand style; it is not a heading. */
  margin: 0;
}

.site-header__panel {
  position: absolute;
  inset-block-start: var(--header-block);
  inset-inline-end: var(--margin-x);
  z-index: var(--z-overlay);
  inline-size: min(28rem, calc(100vw - (var(--margin-x) * 2)));
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  /* Paper on Cobalt — the one place the palette allows Paper, as an on-colour
     foreground. Approximately 6.3:1 against Cobalt 700. */
  background: var(--color-cobalt-700);
  color: var(--color-paper);
}

.site-header__panel[hidden] {
  display: none;
}

.site-header__panel-label,
.site-header__panel-body,
.site-header__close {
  color: inherit;
}

.site-header__close {
  align-self: flex-start;
  min-block-size: var(--tap-min);
  min-inline-size: var(--tap-min);
  padding-inline: var(--space-4);
  display: inline-flex;
  align-items: center;
  border: var(--rule-width) solid currentColor;
  cursor: pointer;
}

.site-header__panel :focus-visible {
  outline-color: var(--color-paper);
}
</style>
