<script setup lang="ts">
/*
  CH04 — one unified project index, and the narrative's conclusion.

  Figma node `32:10`. The measurements are that frame's: a 1312 content width
  inside the 64px margin, four tracks at 48 / 324 / 258 / 586 with 32px gaps,
  and 204px rows separated by full-width 1px ink rules.

  THE LEAD-IN
  CH03 leaves the frame on a Yellow line travelling right at y=725. CH04 opens
  on that same line, at that same height, running dead straight — the ribbon has
  stopped searching. That is the whole gesture, and after it the index runs on
  white with no ribbon at all, because here the work is the subject.

  THE ROW
  The row is the link. The whole row, not the project name — so the target is
  large, the accessible name reads "Kredivo Checkout, Role: Senior UX Designer,
  Year: 2022–Present, Impact: …", and keyboard focus lands on exactly the thing
  a pointer would hit.

  THE PREVIEW
  One element for the whole index, not one per row, so only ever one is visible
  and only one animation frame is ever in flight. With a fine pointer it eases
  toward the cursor — smoothed, not pinned, and clamped inside the viewport.
  With the keyboard it appears stationary beside the focused row, which is the
  same information without the movement. It is decorative and
  `pointer-events: none`; every fact it shows is already in the row, so nothing
  is lost to anyone who never triggers it.
*/
import type { Scene } from '~/content/narrative'
import { featuredProjects, projectHref } from '~/content/work'
import { prefersReducedMotion } from '~/composables/useReducedMotion'

/* The ribbon settling into a straight line, at the exact height and colour
   CH03's exit hands over on. */
const leadIn: Scene = {
  id: 'ch04.settle',
  tempo: 'direct',
  pace: 'minimal',
  ribbons: [{ id: 'ch04-settle', color: 'yellow', d: 'M-120 725H1560' }],
  texts: []
}

const index = useTemplateRef<HTMLElement>('index')
useNarrativeMotion(index, () => 'direct')

const activeIndex = ref<number | null>(null)
const stationary = ref(false)
const preview = useTemplateRef<HTMLElement>('preview')

const activeProject = computed(() =>
  activeIndex.value === null ? null : featuredProjects[activeIndex.value] ?? null
)

/* ------------------------------------------------------------- pointer --- */
const target = { x: 0, y: 0 }
const eased = { x: 0, y: 0 }
let frame = 0
let primed = false

function canFollow() {
  return (
    !prefersReducedMotion() &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
}

/** Keep the whole preview on screen, whatever the pointer is doing. */
function clampToViewport(x: number, y: number) {
  const node = preview.value
  const margin = 16
  const w = node?.offsetWidth ?? 320
  const h = node?.offsetHeight ?? 214
  return {
    x: Math.min(Math.max(x, margin), window.innerWidth - w - margin),
    y: Math.min(Math.max(y, margin), window.innerHeight - h - margin)
  }
}

function paint() {
  frame = 0
  if (activeIndex.value === null || stationary.value) return

  /* Exponential ease toward the pointer — roughly the 120ms lag the handoff
     asks for, without pinning the preview rigidly to the cursor. */
  eased.x += (target.x - eased.x) * 0.16
  eased.y += (target.y - eased.y) * 0.16

  const { x, y } = clampToViewport(eased.x, eased.y)
  preview.value?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`)

  if (Math.abs(target.x - eased.x) > 0.4 || Math.abs(target.y - eased.y) > 0.4) {
    frame = requestAnimationFrame(paint)
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(paint)
}

function onPointerEnter(event: PointerEvent, i: number) {
  if (event.pointerType !== 'mouse' || !canFollow()) return
  stationary.value = false
  activeIndex.value = i
  target.x = event.clientX + 28
  target.y = event.clientY + 24
  if (!primed) {
    /* First reveal snaps to the cursor rather than flying in from the corner. */
    eased.x = target.x
    eased.y = target.y
    primed = true
  }
  schedule()
}

function onPointerMove(event: PointerEvent) {
  if (activeIndex.value === null || stationary.value) return
  target.x = event.clientX + 28
  target.y = event.clientY + 24
  schedule()
}

function clearPointer() {
  if (stationary.value) return
  activeIndex.value = null
  primed = false
}

/* -------------------------------------------------------------- focus --- */
/* Keyboard gets the same preview, held still beside its row. */
function onFocusIn(event: FocusEvent) {
  const row = (event.target as HTMLElement)?.closest?.('.work__row') as HTMLElement | null
  if (!row) return
  const i = Number(row.dataset.rowIndex)
  if (Number.isNaN(i)) return
  if (!window.matchMedia('(min-width: 1200px)').matches) return

  stationary.value = true
  activeIndex.value = i

  nextTick(() => {
    const rect = row.getBoundingClientRect()
    const { x, y } = clampToViewport(rect.right - (preview.value?.offsetWidth ?? 320), rect.top)
    preview.value?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`)
  })
}

function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as HTMLElement | null
  if (next?.closest?.('.work__row')) return
  if (!stationary.value) return
  activeIndex.value = null
  stationary.value = false
}

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <section id="selected-work" aria-labelledby="selected-work-heading" class="work">
    <h2 id="selected-work-heading" class="visually-hidden">Selected Work</h2>

    <div class="work__lead">
      <NarrativeScene :scene="leadIn" />
    </div>

    <div ref="index" class="work__inner" data-ch04-state="idle">
      <p class="t-display work__display reveal" style="--copy-i: 0">
        Ideas become real<br class="work__break">through the work.
      </p>

      <p class="t-body work__intro reveal" style="--copy-i: 1">
        Here are three projects where clarity turned into measurable progress.
      </p>

      <p class="t-label work__section-label reveal" style="--copy-i: 2">Selected work</p>

      <div class="work__columns t-label reveal" style="--copy-i: 3" aria-hidden="true">
        <span class="work__col-project">Project</span>
        <span class="work__col-meta">Role · Year</span>
        <span class="work__col-impact">Impact</span>
      </div>

      <ul
        class="work__index"
        :data-previewing="activeIndex !== null ? 'true' : 'false'"
        @pointermove="onPointerMove"
        @pointerleave="clearPointer"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
      >
        <li
          v-for="(project, i) in featuredProjects"
          :key="project.slug"
          class="reveal"
          :style="{ '--copy-i': 4 + i }"
        >
          <a
            class="work__row"
            :class="{ 'is-dimmed': activeIndex !== null && activeIndex !== i }"
            :href="projectHref(project)"
            :data-row-index="i"
            @pointerenter="onPointerEnter($event, i)"
          >
            <span class="t-label work__number">{{ project.number }}</span>

            <h3 class="t-heading work__name">{{ project.name }}</h3>

            <p class="t-body-strong work__meta">
              <span class="visually-hidden">Role: </span>{{ project.role }}<br>
              <span class="visually-hidden">Year: </span>{{ project.year }}
            </p>

            <p class="t-body work__impact">
              <span class="visually-hidden">Impact: </span>{{ project.impact }}
            </p>
          </a>
        </li>
      </ul>
    </div>

    <!-- One preview for the whole index. Decorative, and it never takes a click. -->
    <div
      ref="preview"
      class="work__preview"
      :data-visible="activeProject ? 'true' : 'false'"
      aria-hidden="true"
    >
      <template v-if="activeProject">
        <svg class="work__preview-graphic" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice" focusable="false">
          <!--
            Parked clear of the type. Figma's dummy lets the accent run behind
            the title, which is survivable on Yellow and invisible on Paper —
            Paper type on a Paper shape is nothing at all. Sitting it above the
            title's cap line keeps every accent legible without touching the
            palette or the shape language.
          -->
          <circle cx="340" cy="-40" r="100" :class="`work__preview-dot work__preview-dot--${activeProject.thumbnail.accent}`" />
        </svg>
        <span class="t-label work__preview-label">Preview · {{ activeProject.number }}</span>
        <span class="t-heading work__preview-title">{{ activeProject.name }}</span>
      </template>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: var(--surface);
  padding-block: 0 calc(var(--space-9) * 1.5);
}

.work__inner {
  inline-size: min(100%, 1920px);
  margin-inline: auto;
  padding-inline: var(--margin-x);
}

/*
  Figma's break — "Ideas become real / through the work." — is a desktop
  composition, and so is the measure that holds it. Below 1200 the line finds
  its own break against the column instead of being forced into a shape the
  column is too narrow to hold.
*/
.work__break {
  display: none;
}

.work__intro {
  margin-block-start: var(--space-6);
  max-inline-size: 46ch;
}

.work__section-label {
  margin-block-start: var(--space-7);
}

/* Column headings only exist where there are columns. */
.work__columns {
  display: none;
}

.work__index {
  margin-block-start: var(--space-5);
  border-block-start: var(--rule-width) solid var(--rule);
}

.work__row {
  position: relative;
  display: grid;
  gap: var(--space-3) 0;
  padding-block: var(--space-5);
  border-block-end: var(--rule-width) solid var(--rule);
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'number'
    'name'
    'meta'
    'impact';
}

.work__number { grid-area: number; }
.work__name   { grid-area: name; }
.work__meta   { grid-area: meta; }
.work__impact { grid-area: impact; }

.work__name {
  /* The row is the heading's link; the heading keeps its own weight. */
  font-weight: var(--weight-bold);
}

/*
  Hover and focus produce the SAME state, which the handoff requires. It is a
  colour plus an underline, never colour alone.
*/
.work__row:hover .work__name,
.work__row:focus-visible .work__name {
  color: var(--color-cobalt-500);
  text-decoration: underline;
  text-underline-offset: 0.12em;
  text-decoration-thickness: 2px;
}

/* ---------------------------------------------------------- preview --- */
.work__preview {
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
  z-index: var(--z-content);
  inline-size: clamp(260px, 24vw, 360px);
  aspect-ratio: 360 / 240;
  padding: var(--space-5);
  overflow: clip;
  background: var(--color-cobalt-500);
  color: var(--color-paper);
  /* It can never take a click, a hover or a tap from the row underneath. */
  pointer-events: none;
  opacity: 0;
  scale: 0.96;
  visibility: hidden;
  transition:
    opacity var(--dur-fade) var(--ease-out-expo),
    scale var(--dur-fade) var(--ease-out-expo),
    visibility 0s linear var(--dur-fade);
}

.work__preview[data-visible='true'] {
  opacity: 1;
  scale: 1;
  visibility: visible;
  transition-delay: 0s;
}

.work__preview-graphic {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
}

.work__preview-dot--yellow { fill: var(--color-yellow); }
.work__preview-dot--paper  { fill: var(--color-paper); }
.work__preview-dot--green  { fill: var(--color-green); }

.work__preview-label,
.work__preview-title {
  position: relative;
  display: block;
}

.work__preview-title {
  margin-block-start: var(--space-6);
}

/* Below the desktop breakpoint there is nowhere sensible to put it, and the
   row already carries every fact it would show. */
@media (max-width: 1199px) {
  .work__preview {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .work__preview {
    transition: opacity 1ms linear;
    scale: 1;
  }
}

/* ----------------------------------------------------------- tablet ---
   Project and role/year sit above impact. */
@media (min-width: 768px) {
  .work__row {
    grid-template-columns: 48px minmax(0, 1fr) minmax(0, 15rem);
    grid-template-areas:
      'number name   meta'
      '.      impact impact';
    column-gap: var(--space-6);
    padding-block: var(--space-6);
  }
}

/* ---------------------------------------------------------- desktop ---
   Three columns after the index number, on the Figma track widths. */
@media (min-width: 1200px) {
  .work__columns {
    display: grid;
    grid-template-columns: 3.6585% 24.6951% 19.6646% 44.6646%;
    column-gap: 2.439%;
    margin-block-start: var(--space-6);
  }

  .work__break {
    display: inline;
  }

  .work__display {
    max-inline-size: 68.06%; /* 980 of 1440 */
  }

  .work__intro {
    max-inline-size: 54.17%; /* 780 of 1440 */
  }

  .work__col-project { grid-column: 2; }
  .work__col-meta    { grid-column: 3; }
  .work__col-impact  { grid-column: 4; }

  .work__index {
    margin-block-start: var(--space-3);
  }

  .work__row {
    grid-template-columns: 3.6585% 24.6951% 19.6646% 44.6646%;
    grid-template-areas: 'number name meta impact';
    column-gap: 2.439%;
    align-items: start;
    min-block-size: 204px;
    padding-block: 20px;
    transition: opacity var(--dur-row) var(--ease-out-expo);
  }

  .work__number {
    /* Figma nudges the number down to sit with the name's cap height. */
    padding-block-start: 8px;
  }

  /*
    The handoff asks for 45% on the inactive rows. That lands ink around 3.5:1
    on white, which fails AA for body text, so the dim stops at a level that
    still reads as recessive and still passes. Deliberate deviation.
  */
  .work__row.is-dimmed {
    opacity: 0.72;
  }
}

@media (prefers-reduced-motion: reduce) {
  .work__row {
    transition: none;
  }
}
</style>
