<script setup lang="ts">
/*
  Navigation / Grid Menu Trigger — Figma component `15:2`.

  The component's own description in Figma: "Primary menu trigger. Four dots
  represent the portfolio's four main navigation options. Use a 48x48
  interaction target."

  Geometry is the exported vector verbatim: r=4.5 circles at 14.5 / 33.5 in a
  48x48 box. The dots take `currentColor`, because Figma ships a Paper-coloured
  variant of this icon for when the trigger sits on a colour field — which is
  exactly what happens when the navigation panel is open behind it.

  The trigger stays above the panel and keeps toggling it, so there is one
  control with one `aria-expanded` state rather than a separate close button
  with a second, competing story about what is open.
*/
defineProps<{ expanded: boolean; controls: string }>()

const el = useTemplateRef<HTMLButtonElement>('el')

/* The panel returns focus here when it closes. */
defineExpose({ focus: () => el.value?.focus() })
</script>

<template>
  <button
    ref="el"
    class="menu-trigger"
    type="button"
    aria-label="Open navigation"
    :aria-expanded="expanded"
    :aria-controls="controls"
  >
    <svg class="menu-trigger__dots" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="14.5" cy="14.5" r="4.5" />
      <circle cx="33.5" cy="14.5" r="4.5" />
      <circle cx="14.5" cy="33.5" r="4.5" />
      <circle cx="33.5" cy="33.5" r="4.5" />
    </svg>
  </button>
</template>

<style scoped>
.menu-trigger {
  /* The handoff floor for every interactive target, in both axes. */
  inline-size: var(--tap-min);
  block-size: var(--tap-min);
  display: grid;
  place-items: center;
  color: inherit;
  cursor: pointer;
}

.menu-trigger__dots {
  inline-size: 100%;
  block-size: 100%;
  fill: currentColor;
}
</style>
