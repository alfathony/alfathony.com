<script setup lang="ts">
/**
 * A gallery wall label.
 *
 * This is the system's only metadata component. It carries chapter numerals,
 * project details, and the "awaiting copy" states — because in a gallery, the
 * label is where every fact about a work lives, and a label that has nothing to
 * say says so rather than disappearing.
 */
withDefaults(
  defineProps<{
    /** Left-hand identifier: a chapter numeral, a project name. */
    title: string
    /** Ordered detail rows. Empty values render the awaiting state. */
    details?: Array<{ term: string; value: string }>
    /** Renders the yellow accent band on the rule. Use sparingly. */
    accent?: boolean
    align?: 'left' | 'right'
  }>(),
  { details: () => [], accent: false, align: 'left' },
)
</script>

<template>
  <div class="label" :class="[`is-${align}`]">
    <div class="label__rule" :class="{ 'accent-band': accent }" />
    <p class="label__title caption">{{ title }}</p>
    <dl v-if="details.length" class="label__details">
      <template v-for="d in details" :key="d.term">
        <dt class="caption">{{ d.term }}</dt>
        <dd class="caption" :class="{ 'is-awaiting': !d.value }">
          {{ d.value || 'awaiting copy' }}
        </dd>
      </template>
    </dl>
  </div>
</template>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  min-width: 0;
}

.is-right {
  text-align: right;
  align-items: flex-end;
}

.label__rule {
  width: 100%;
  height: 2px;
  background-color: var(--ink);
  background-size: 100% 2px;
}

/* When the accent band is on, the rule becomes the tightest wave frequency. */
.label__rule.accent-band {
  background-color: var(--ink);
  height: 3px;
}

.label__title {
  color: var(--ink);
  font-variation-settings: 'wdth' 87, 'wght' 700;
}

.label__details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px var(--s-2);
  margin-top: var(--s-1);
}

.is-right .label__details {
  grid-template-columns: 1fr auto;
}

.label__details dt {
  color: var(--ink-faint);
}

.label__details dd {
  color: var(--ink-soft);
}

.label__details dd.is-awaiting {
  color: var(--ink-faint);
  font-variation-settings: 'wdth' 87, 'wght' 400;
  font-style: italic;
  text-transform: none;
  letter-spacing: 0.04em;
}
</style>
