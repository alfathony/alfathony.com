<script setup lang="ts">
/*
  Case study STUB.

  Phase 1 explicitly excludes final case-study pages, but the project rows in
  CH04 are real links and a real link needs somewhere real to land. This is the
  minimum that keeps them honest: the facts already published in the index, and
  a plain statement that the case study itself is still being written.

  Phase 2 replaces the body of this page; the route and the data lookup stay.
*/
import { projects } from '~/content/work'

const route = useRoute()
const project = computed(() =>
  projects.find((candidate) => candidate.href === `/work/${route.params.slug}`)
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useHead(() => ({ title: `${project.value?.name ?? 'Work'} — Alfathony` }))
</script>

<template>
  <main v-if="project" id="main-content" class="case">
    <p class="t-label case__number">{{ project.number }}</p>
    <h1 class="t-display case__name">{{ project.name }}</h1>

    <dl class="case__facts">
      <div>
        <dt class="t-label">Role</dt>
        <dd class="t-body-strong">{{ project.role }}</dd>
      </div>
      <div>
        <dt class="t-label">Year</dt>
        <dd class="t-body-strong">{{ project.year }}</dd>
      </div>
      <div>
        <dt class="t-label">Impact</dt>
        <dd class="t-body">{{ project.impact }}</dd>
      </div>
    </dl>

    <p class="t-body case__pending">The full case study is still being written.</p>

    <NuxtLink class="t-label case__back" to="/#selected-work">Back to selected work</NuxtLink>
  </main>
</template>

<style scoped>
.case {
  min-block-size: 100svh;
  padding-block: calc(var(--header-block) + var(--space-9)) var(--space-9);
  padding-inline: var(--margin-x);
  inline-size: min(100%, 1920px);
  margin-inline: auto;
}

.case__name {
  margin-block-start: var(--space-4);
  max-inline-size: 20ch;
}

.case__facts {
  margin-block-start: var(--space-8);
  display: grid;
  gap: var(--space-6);
  max-inline-size: 46rem;
}

.case__facts dd {
  margin: 0;
  margin-block-start: var(--space-2);
}

.case__pending {
  margin-block-start: var(--space-8);
}

.case__back {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--tap-min);
  margin-block-start: var(--space-6);
  text-decoration: underline;
  text-underline-offset: 0.3em;
}
</style>
