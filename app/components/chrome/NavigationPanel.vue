<script setup lang="ts">
/*
  The primary navigation.

  Editorial rather than app-drawer: six numbered lines set in the heading voice
  on a full-bleed deep Cobalt field, with Paper as the on-colour foreground —
  the one use the palette sanctions for it. Paper on Cobalt 700 measures about
  8.3:1.

  Behaviour that matters more than the look:

  - The current page is marked with `aria-current="page"` and shown with a solid
    rule and an underline as well as a colour change, so it is never carried by
    colour alone.
  - Escape closes, and focus returns to the trigger, which is the caller's job
    since it owns the trigger.
  - Focus moves into the panel on open and cannot leave it: the shell marks the
    page content `inert`, and Tab wraps between the trigger and the last link.
  - The page behind cannot scroll while the panel is open, and the scrollbar's
    width is held so the page does not shift as it locks.
  - Navigating closes the panel — including a click on the link for the page you
    are already on, which produces no route change to react to.
*/
import { navigation, isCurrentRoute } from '~/content/site'

const props = defineProps<{ open: boolean; panelId: string }>()
const emit = defineEmits<{ close: [] }>()

const route = useRoute()
const panel = useTemplateRef<HTMLElement>('panel')

const items = computed(() =>
  navigation.map((item) => ({ ...item, current: isCurrentRoute(route.path, item.to) }))
)

function focusables(): HTMLElement[] {
  const root = panel.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
}

function onKeydown(event: KeyboardEvent) {
  if (!props.open) return

  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key !== 'Tab') return

  /* The trigger lives outside the panel but stays reachable, so it is the wrap
     point in both directions. */
  const stops = focusables()
  const first = stops[0]
  const last = stops[stops.length - 1]
  if (!first || !last) return

  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

function lockScroll(locked: boolean) {
  const root = document.documentElement
  if (locked) {
    const gutter = window.innerWidth - root.clientWidth
    root.style.setProperty('--scrollbar-gutter', `${gutter}px`)
    root.classList.add('is-nav-open')
  } else {
    root.classList.remove('is-nav-open')
    root.style.removeProperty('--scrollbar-gutter')
  }
}

watch(
  () => props.open,
  async (open) => {
    lockScroll(open)
    if (!open) return
    await nextTick()
    focusables()[0]?.focus()
  }
)

/* Any route change while the panel is open closes it. */
watch(() => route.fullPath, () => {
  if (props.open) emit('close')
})

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<template>
  <div
    v-show="open"
    :id="panelId"
    ref="panel"
    class="nav-panel"
  >
    <nav class="nav-panel__inner" aria-label="Primary">
      <ul class="nav-panel__list">
        <li v-for="item in items" :key="item.to">
          <NuxtLink
            class="nav-panel__link"
            :class="{ 'is-current': item.current }"
            :to="item.to"
            :aria-current="item.current ? 'page' : undefined"
            @click="emit('close')"
          >
            <span class="t-label nav-panel__index" aria-hidden="true">{{ item.index }}</span>
            <span class="t-heading nav-panel__label">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.nav-panel {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  padding-inline: var(--margin-x);
  padding-block: calc(var(--header-block) + var(--space-7)) var(--space-8);
  /* Deep Cobalt carrying Paper — the palette's one sanctioned on-colour pair. */
  background: var(--color-cobalt-700);
  color: var(--color-paper);
  animation: nav-panel-in var(--dur-fade) var(--ease-out-expo) both;
}

@keyframes nav-panel-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.nav-panel__inner {
  inline-size: min(100%, 1920px);
  margin-inline: auto;
}

.nav-panel__list {
  display: flex;
  flex-direction: column;
}

.nav-panel__link {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  align-items: center;
  gap: var(--space-4);
  /* Comfortably past the 48px floor, and past the 44px mobile floor. */
  min-block-size: max(var(--tap-min), 1.9em);
  padding-block: var(--space-3);
  /* Reserved on every item, not just the current one, so the list keeps a
     single left edge and the rule appears in the gutter instead of shoving the
     active label sideways. */
  padding-inline-start: var(--space-5);
  color: inherit;
}

.nav-panel__index {
  color: inherit;
  opacity: 0.6;
}

.nav-panel__label {
  text-transform: uppercase;
}

/*
  The current page is marked three ways — a solid rule, an underline and a
  colour — so it never depends on colour alone.
*/
.nav-panel__link.is-current .nav-panel__index {
  opacity: 1;
  color: var(--color-yellow);
}

.nav-panel__link.is-current .nav-panel__label {
  text-decoration: underline;
  text-underline-offset: 0.16em;
  text-decoration-thickness: 3px;
}

.nav-panel__link.is-current {
  box-shadow: inset 4px 0 0 0 var(--color-yellow);
}

.nav-panel__link:hover .nav-panel__label {
  text-decoration: underline;
  text-underline-offset: 0.16em;
  text-decoration-thickness: 3px;
}

/* The site-wide Cobalt focus ring would vanish against this field. */
.nav-panel :focus-visible {
  outline-color: var(--color-paper);
}

@media (min-width: 768px) {
  .nav-panel__link {
    grid-template-columns: 5rem minmax(0, 1fr);
    padding-block: var(--space-4);
  }
}
</style>
