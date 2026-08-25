<script setup lang="ts">
/*
  One Figma scene: a full-bleed ribbon and the copy that sits over it.

  Desktop reproduces the 1440x900 frame — every text block is placed as a
  percentage of the stage, so the composition is exact at the reference frame
  and keeps its relationships either side of it.

  Tablet and mobile throw the frame away, as the responsive direction requires:
  the ribbon becomes a band, the copy becomes a vertical reading path beneath
  it, and nothing complex is ever scaled down into the text column.

  `texts` is authored in reading order, so DOM order stays logical even where
  the desktop composition is asymmetric.
*/
import type { Scene } from '~/content/narrative'

const props = defineProps<{ scene: Scene }>()

const kindClass: Record<string, string> = {
  'display-xl': 't-display-xl',
  display: 't-display',
  heading: 't-heading',
  body: 't-body',
  label: 't-label'
}

const hasRibbon = computed(() => props.scene.ribbons.length > 0)
</script>

<template>
  <div
    class="scene"
    :class="{ 'scene--no-ribbon': !hasRibbon }"
    :data-scene="scene.id"
  >
    <div class="scene__ribbon">
      <NarrativeRibbon v-if="hasRibbon" :paths="scene.ribbons" :state="scene.id" />
    </div>

    <div class="scene__stage">
      <p
        v-for="item in scene.texts"
        :id="item.id"
        :key="item.id"
        class="scene__item"
        :class="[kindClass[item.kind], { 'scene__item--wide': item.kind === 'label' }]"
        :style="placeOnCanvas(item.x, item.y, item.w)"
        :data-hide-mobile="item.hideOnMobile ? 'true' : undefined"
      >
        {{ item.text }}
      </p>
    </div>
  </div>
</template>
