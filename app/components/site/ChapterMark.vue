<script setup lang="ts">
/**
 * The chapter numeral, as a placard at the corner of the wall.
 *
 * Not stacked above the headline: a small tracked label sitting directly on top
 * of a large heading in the same column is an eyebrow, which the craft floor
 * refuses outright. In a gallery the number lives on the wall beside the work,
 * so it sits at the frame corner — the placement Chapter 01 already uses.
 *
 * The host section must be `position: relative`.
 */
defineProps<{ index: string; label: string }>()
</script>

<template>
  <p class="mark caption">
    <span class="mark__rule" aria-hidden="true" />
    <span class="mark__index">{{ index }}</span>
    <span class="mark__label">{{ label }}</span>
  </p>
</template>

<style scoped>
.mark {
  position: absolute;
  top: var(--s-4);
  left: var(--gutter);
  right: var(--gutter);
  display: flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--ink-soft);
}

.mark__rule {
  width: clamp(1.5rem, 4vw, 3.5rem);
  height: 2px;
  background: var(--ink);
  flex: none;
}

.mark__index {
  font-variation-settings: 'wdth' 87, 'wght' 700;
  color: var(--ink);
}

@media (max-width: 700px) {
  .mark {
    top: var(--s-3);
  }
}
</style>
