<script setup lang="ts">
/*
  CH04 — one unified project index, not one scene per project.

  Figma node `32:10`. The measurements below are that frame's: a 1312 content
  width inside the 64px margin, four tracks at 48 / 324 / 258 / 586 with 32px
  gaps, and 204px rows separated by full-width 1px ink rules.

  The row is the link. The whole row, not the project name — so the target is
  large, the accessible name reads "Kredivo Checkout, Role: Senior UX Designer,
  Year: 2022–Present, Impact: …", and keyboard focus lands on exactly the thing
  a pointer would hit.

  Nothing essential lives in the preview. It is a dummy thumbnail, decorative,
  `pointer-events: none`, and every fact it shows is already in the row.

  PHASE 2 mounts here: `data-ch04-state` carries the registered index states
  (idle / row-focus / thumbnail / exit), the preview is the element that starts
  following the pointer with 120ms lag, and non-focused rows drop to 45%
  opacity over 120ms. Phase 1 ships the reduced-motion baseline the handoff
  already specifies — a preview fixed beside its own row.
*/
import { projects } from '~/content/work'
</script>

<template>
  <section id="selected-work" aria-labelledby="selected-work-heading" class="work">
    <h2 id="selected-work-heading" class="visually-hidden">Selected Work</h2>

    <div class="work__inner" data-ch04-state="idle">
      <p class="t-display work__display">Ideas become real<br class="work__break">through the work.</p>

      <p class="t-body work__intro">
        Here are three projects where clarity turned into measurable progress.
      </p>

      <p class="t-label work__section-label">Selected work</p>

      <div class="work__columns t-label" aria-hidden="true">
        <span class="work__col-project">Project</span>
        <span class="work__col-meta">Role · Year</span>
        <span class="work__col-impact">Impact</span>
      </div>

      <ul class="work__index">
        <li v-for="project in projects" :key="project.href">
          <a class="work__row" :href="project.href">
            <span class="t-label work__number">{{ project.number }}</span>

            <h3 class="t-heading work__name">{{ project.name }}</h3>

            <p class="t-body-strong work__meta">
              <span class="visually-hidden">Role: </span>{{ project.role }}<br>
              <span class="visually-hidden">Year: </span>{{ project.year }}
            </p>

            <p class="t-body work__impact">
              <span class="visually-hidden">Impact: </span>{{ project.impact }}
            </p>

            <span class="work__preview" aria-hidden="true">
              <svg class="work__preview-graphic" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice" focusable="false">
                <circle cx="330" cy="40" r="110" :class="`work__preview-dot work__preview-dot--${project.preview}`" />
              </svg>
              <span class="t-label work__preview-label">Preview · {{ project.number }}</span>
              <span class="t-heading work__preview-title">{{ project.name }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: var(--surface);
  padding-block: var(--space-9) calc(var(--space-9) * 1.5);
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
  display: none;
  position: absolute;
  overflow: clip;
  background: var(--color-cobalt-500);
  color: var(--color-paper);
  pointer-events: none;
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
  .work__break {
    display: inline;
  }

  .work__display {
    max-inline-size: 68.06%; /* 980 of 1440 */
  }

  .work__intro {
    max-inline-size: 54.17%; /* 780 of 1440 */
  }

  .work__columns {
    display: grid;
    grid-template-columns: 3.6585% 24.6951% 19.6646% 44.6646%;
    column-gap: 2.439%;
    margin-block-start: var(--space-6);
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
  }

  .work__number {
    /* Figma nudges the number down to sit with the name's cap height. */
    padding-block-start: 8px;
  }

  .work__preview {
    display: block;
    inset-inline-start: 68.6%;
    inset-block-start: 50%;
    translate: 0 -50%;
    inline-size: 27.44%;
    aspect-ratio: 360 / 240;
    padding: var(--space-5);
    opacity: 0;
    transition: opacity var(--dur-fade) var(--ease-out-expo);
  }

  .work__preview-title {
    margin-block-start: var(--space-6);
  }

  .work__row:hover .work__preview,
  .work__row:focus-visible .work__preview {
    opacity: 1;
  }
}
</style>
