<template>
  <div class="baseline">
    <!-- Nav · edge-aligned, same grammar as the homepage -->
    <header class="bl-nav">
      <div class="bl-nav__inner">
        <NuxtLink to="/" class="bl-nav__wordmark">Alfathony</NuxtLink>
        <span class="bl-nav__label">Baseline</span>
      </div>
    </header>

    <main id="top">
      <!-- Masthead -->
      <section class="bl-head">
        <p class="bl-head__eyebrow">Design system</p>
        <h1 class="bl-head__title">Baseline</h1>
        <p class="bl-head__lede">
          The tokens every page is built from &mdash; colour, type, space,
          motion, depth. Nothing here is decorative. If a value is not on this
          page, it does not belong in a component.
        </p>
        <p class="bl-head__dateline">
          Atelier &middot; warm-oat &middot; anchor hue 85
        </p>
      </section>

      <!-- ── Colour ─────────────────────────────────────────────────── -->
      <section class="bl-section" aria-labelledby="colour-title">
        <div class="bl-section__head">
          <h2 id="colour-title" class="bl-section__title">Colour</h2>
          <p class="bl-section__note">
            No pure black, no pure white. Every neutral carries a trace of the
            anchor hue, so the greys read warm against the amber accent.
            Contrast ratios are measured against <code>--color-paper</code>.
          </p>
        </div>

        <ul class="bl-swatches">
          <li v-for="c in colours" :key="c.token" class="bl-swatch">
            <span
              class="bl-swatch__chip"
              :style="{ background: `var(--${c.token})` }"
              aria-hidden="true"
            />
            <div class="bl-swatch__body">
              <p class="bl-swatch__name">{{ c.token }}</p>
              <p class="bl-swatch__value">{{ c.value }}</p>
              <p class="bl-swatch__role">
                {{ c.role }}<template v-if="c.contrast">
                  <span class="bl-swatch__dot" aria-hidden="true">&middot;</span>
                  <span class="bl-swatch__contrast">{{ c.contrast }}</span>
                </template>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- ── Type ───────────────────────────────────────────────────── -->
      <section class="bl-section" aria-labelledby="type-title">
        <div class="bl-section__head">
          <h2 id="type-title" class="bl-section__title">Type</h2>
          <p class="bl-section__note">
            Two families. Three is the ceiling; two is canonical. Fraunces sets
            display, Newsreader sets body &mdash; italic is emphasis, never a
            third voice. Major-third scale (1.25) from a 17px body.
          </p>
        </div>

        <ul class="bl-scale">
          <li v-for="t in typeScale" :key="t.token" class="bl-scale__row">
            <p class="bl-scale__meta">
              <span class="bl-scale__token">{{ t.token }}</span>
              <span class="bl-scale__value">{{ t.value }}</span>
            </p>
            <p
              class="bl-scale__specimen"
              :class="t.display && 'bl-scale__specimen--display'"
              :style="{ fontSize: `var(--${t.token})` }"
            >{{ t.sample }}</p>
          </li>
        </ul>

        <!-- Base element specimens — how the tokens behave in running prose -->
        <div class="bl-prose">
          <h3 class="bl-prose__head">Running text</h3>
          <p>
            Body copy sits at <code>--text-base</code> on a 60ch measure, with
            old-style numerals so figures like 1743 and 2026 sit inside the
            line rather than shouting above it. Emphasis is
            <em>italic Newsreader</em>; a term worth keeping is
            <mark>marked with the highlight band</mark>, which is the only
            place <code>--color-highlight</code> ever appears.
          </p>
          <p>
            Links are <a class="bl-link" href="#top">underlined at the ink
            colour</a> and shift to accent on hover. Focus is instant and never
            transitioned &mdash; tab through this page to see it.
          </p>
          <blockquote class="bl-quote">
            Every value on this page earns its place by being used twice.
          </blockquote>
        </div>
      </section>

      <!-- ── Space ──────────────────────────────────────────────────── -->
      <section class="bl-section" aria-labelledby="space-title">
        <div class="bl-section__head">
          <h2 id="space-title" class="bl-section__title">Space</h2>
          <p class="bl-section__note">
            A 4pt scale named by role, never raw pixels. The page gutter and
            measure are fluid; everything else is fixed so rhythm survives a
            resize.
          </p>
        </div>

        <ul class="bl-space">
          <li v-for="s in spaceScale" :key="s.token" class="bl-space__row">
            <p class="bl-space__meta">
              <span class="bl-space__token">{{ s.token }}</span>
              <span class="bl-space__value">{{ s.value }}</span>
            </p>
            <span
              class="bl-space__bar"
              :style="{ inlineSize: `var(--${s.token})` }"
              aria-hidden="true"
            />
          </li>
        </ul>

        <dl class="bl-defs">
          <div v-for="f in fluidTokens" :key="f.token" class="bl-defs__item">
            <dt class="bl-defs__term">{{ f.token }}</dt>
            <dd class="bl-defs__desc">
              <span class="bl-defs__value">{{ f.value }}</span>
              {{ f.role }}
            </dd>
          </div>
        </dl>
      </section>

      <!-- ── Motion ─────────────────────────────────────────────────── -->
      <section class="bl-section" aria-labelledby="motion-title">
        <div class="bl-section__head">
          <h2 id="motion-title" class="bl-section__title">Motion</h2>
          <p class="bl-section__note">
            Three easings, three durations, no browser defaults. Hover a row to
            run it. Everything below is suppressed under
            <code>prefers-reduced-motion</code>.
          </p>
        </div>

        <ul class="bl-motion">
          <li v-for="m in motion" :key="m.token" class="bl-motion__row">
            <p class="bl-motion__meta">
              <span class="bl-motion__token">{{ m.token }}</span>
              <span class="bl-motion__value">{{ m.value }}</span>
            </p>
            <span class="bl-motion__track" aria-hidden="true">
              <span
                class="bl-motion__dot"
                :style="{
                  transitionTimingFunction: `var(--${m.ease})`,
                  transitionDuration: `var(--${m.dur})`
                }"
              />
            </span>
            <p class="bl-motion__role">{{ m.role }}</p>
          </li>
        </ul>
      </section>

      <!-- ── Depth ──────────────────────────────────────────────────── -->
      <section class="bl-section" aria-labelledby="depth-title">
        <div class="bl-section__head">
          <h2 id="depth-title" class="bl-section__title">Depth</h2>
          <p class="bl-section__note">
            Six named levels. A freestyle <code>z-index: 9999</code> is a bug
            report, not a value.
          </p>
        </div>

        <ul class="bl-depth">
          <li v-for="d in depth" :key="d.token" class="bl-depth__row">
            <span class="bl-depth__token">{{ d.token }}</span>
            <span class="bl-depth__rule" aria-hidden="true" />
            <span class="bl-depth__value">{{ d.value }}</span>
            <span class="bl-depth__role">{{ d.role }}</span>
          </li>
        </ul>
      </section>
    </main>

    <footer class="bl-close">
      <div class="bl-close__inner">
        <p class="bl-close__note">
          Tokens are declared on the <code>.baseline</code> wrapper, not
          <code>:root</code> &mdash; this app runs SPA, and a global block
          would leak the palette onto the other routes after client-side
          navigation. The portable record lives in
          <code>assets/css/tokens.css</code>.
        </p>
        <p class="bl-close__colophon">
          <NuxtLink class="bl-link bl-link--quiet" to="/">Home</NuxtLink>
          <span aria-hidden="true">&middot;</span>
          <span>Set in Fraunces and Newsreader</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: 'Baseline — Alfathony',
  meta: [
    {
      name: 'description',
      content:
        'The design tokens behind alfathony.com — colour, type, space, motion and depth.'
    }
  ]
})

const colours = [
  { token: 'color-paper', value: 'oklch(97% 0.009 85)', role: 'Base surface' },
  { token: 'color-paper-2', value: 'oklch(94.5% 0.012 85)', role: 'Raised surface' },
  { token: 'color-rule', value: 'oklch(85% 0.012 80)', role: 'Hairlines' },
  { token: 'color-neutral', value: 'oklch(58% 0.011 75)', role: 'Large text, metadata' },
  { token: 'color-muted', value: 'oklch(42% 0.013 70)', role: 'Secondary body', contrast: '5.4:1' },
  { token: 'color-ink', value: 'oklch(22% 0.015 60)', role: 'Primary text', contrast: '14:1' },
  { token: 'color-accent', value: 'oklch(45% 0.15 52)', role: 'Burnt amber', contrast: '4.9:1' },
  { token: 'color-accent-ink', value: 'oklch(97% 0.009 85)', role: 'Text on an accent fill' },
  { token: 'color-highlight', value: 'oklch(88% 0.135 95)', role: 'Highlighter band only' }
]

const typeScale = [
  { token: 'text-display', value: 'clamp(2.5rem, 4.2vw + 1rem, 4.25rem)', sample: 'Display', display: true },
  { token: 'text-2xl', value: '2.4414rem', sample: 'Section title', display: true },
  { token: 'text-xl', value: '1.9531rem', sample: 'Subsection', display: true },
  { token: 'text-lg', value: '1.5625rem', sample: 'Lead paragraph' },
  { token: 'text-md', value: '1.25rem', sample: 'Standfirst and wordmark' },
  { token: 'text-base', value: '1.0625rem', sample: 'Body copy — the default' },
  { token: 'text-sm', value: '0.875rem', sample: 'Secondary and captions' },
  { token: 'text-xs', value: '0.75rem', sample: 'Metadata, eyebrows, labels' }
]

const spaceScale = [
  { token: 'space-3xs', value: '0.125rem' },
  { token: 'space-2xs', value: '0.25rem' },
  { token: 'space-xs', value: '0.5rem' },
  { token: 'space-sm', value: '0.75rem' },
  { token: 'space-md', value: '1rem' },
  { token: 'space-lg', value: '1.5rem' },
  { token: 'space-xl', value: '2.5rem' },
  { token: 'space-2xl', value: '4rem' },
  { token: 'space-3xl', value: '6rem' },
  { token: 'space-4xl', value: '9rem' }
]

const fluidTokens = [
  {
    token: '--page-gutter',
    value: 'clamp(1.25rem, 5vw, 4.5rem)',
    role: '— the page edge. Never a fixed value; it is what makes the layout mobile-safe.'
  },
  {
    token: '--measure',
    value: '60ch',
    role: '— the reading column. Prose never exceeds it, regardless of viewport.'
  },
  {
    token: '--rule-hair',
    value: '1px',
    role: '— the only border width in the system.'
  }
]

const motion = [
  { token: '--ease-out', value: 'cubic-bezier(0.16, 1, 0.3, 1)', ease: 'ease-out', dur: 'dur-short', role: 'Entrances, hovers — the default' },
  { token: '--ease-in', value: 'cubic-bezier(0.7, 0, 0.84, 0)', ease: 'ease-in', dur: 'dur-short', role: 'Exits, dismissals' },
  { token: '--ease-in-out', value: 'cubic-bezier(0.65, 0, 0.35, 1)', ease: 'ease-in-out', dur: 'dur-long', role: 'Moves between two on-screen states' },
  { token: '--dur-micro', value: '120ms', ease: 'ease-out', dur: 'dur-micro', role: 'Colour and border changes' },
  { token: '--dur-short', value: '220ms', ease: 'ease-out', dur: 'dur-short', role: 'Most transitions' },
  { token: '--dur-long', value: '420ms', ease: 'ease-out', dur: 'dur-long', role: 'Layout-scale movement' }
]

const depth = [
  { token: '--z-base', value: '1', role: 'In-flow content' },
  { token: '--z-raised', value: '10', role: 'Cards, hover lifts' },
  { token: '--z-dropdown', value: '100', role: 'Menus, popovers' },
  { token: '--z-sticky', value: '200', role: 'Sticky headers' },
  { token: '--z-modal', value: '400', role: 'Dialogs, overlays' },
  { token: '--z-toast', value: '500', role: 'Transient notices' }
]
</script>

<style>
/* Page-edge clipping. `clip`, not `hidden`: preserves sticky/fixed. */
html,
body {
  overflow-x: clip;
}
</style>

<style scoped>
/* Baseline — the specimen sheet for assets/css/tokens.css.
 *
 * Two isolation decisions, matching /index:
 *  1. Tokens are scoped to .baseline, not :root — this app is SPA
 *     (ssr: false), and a global :root block would leak this palette onto
 *     /minimal, /creative and /brutalism after client-side navigation.
 *  2. Every class is `bl-` prefixed, and the element-level rules from the
 *     legacy global assets/css/main.css (`section`, `footer`, `.hero`) are
 *     neutralised below. main.css still styles the other routes; it must not
 *     reach into this page.
 */

.baseline {
  --color-paper: oklch(97% 0.009 85);
  --color-paper-2: oklch(94.5% 0.012 85);
  --color-rule: oklch(85% 0.012 80);
  --color-neutral: oklch(58% 0.011 75);
  --color-muted: oklch(42% 0.013 70);
  --color-ink: oklch(22% 0.015 60);
  --color-accent: oklch(45% 0.15 52);
  --color-accent-ink: oklch(97% 0.009 85);
  --color-highlight: oklch(88% 0.135 95);
  --color-focus: oklch(45% 0.15 52);

  --font-display: 'Fraunces', ui-serif, Georgia, serif;
  --font-body: 'Newsreader', ui-serif, Georgia, serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1.0625rem;
  --text-md: 1.25rem;
  --text-lg: 1.5625rem;
  --text-xl: 1.9531rem;
  --text-2xl: 2.4414rem;
  --text-display: clamp(2.25rem, 3.6vw + 1rem, 4rem);

  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 9rem;
  --page-gutter: clamp(1.25rem, 5vw, 4.5rem);
  --measure: 60ch;
  --shell: 60rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long: 420ms;

  --z-base: 1;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 400;
  --z-toast: 500;

  --rule-hair: 1px;

  min-height: 100dvh;
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  font-variant-numeric: oldstyle-nums;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}

/* Neutralise the legacy global stylesheet. `:where()` contributes zero
 * specificity, so every rule below still wins — but main.css's
 * `section { min-height: 100vh }` and `footer { text-align: center }` no
 * longer reach in. */
.baseline :where(section, footer, header, main, div, ul, ol, li, dl, dt, dd, figure, blockquote) {
  min-height: 0;
  max-height: none;
  padding: 0;
  margin: 0;
  display: block;
  text-align: left;
  background: none;
  border: 0;
  list-style: none;
}

.baseline *,
.baseline *::before,
.baseline *::after {
  box-sizing: border-box;
}

/* Focus: instant, never transitioned. */
.baseline :focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
  border-radius: 2px;
}

.baseline code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
  font-variant-numeric: tabular-nums;
  color: var(--color-muted);
}

/* ── Nav ──────────────────────────────────────────────────────────── */
.bl-nav {
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.bl-nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-md);
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-lg) var(--page-gutter);
}

.bl-nav__wordmark {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  text-decoration: none;
  line-height: 1;
  transition: color var(--dur-micro) var(--ease-out);
}

.bl-nav__wordmark:hover {
  color: var(--color-accent);
}

.bl-nav__label {
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-neutral);
  line-height: 1;
}

/* ── Masthead ─────────────────────────────────────────────────────── */
.bl-head {
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-3xl) var(--page-gutter) var(--space-2xl);
}

.bl-head__eyebrow {
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-neutral);
  margin-bottom: var(--space-md);
}

.bl-head__title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 300;
  line-height: 1.02;
  letter-spacing: -0.025em;
  margin-bottom: var(--space-lg);
}

.bl-head__lede {
  font-size: var(--text-lg);
  line-height: 1.5;
  color: var(--color-muted);
  max-width: var(--measure);
  margin-bottom: var(--space-lg);
}

.bl-head__dateline {
  font-size: var(--text-sm);
  color: var(--color-neutral);
}

/* ── Section shell ────────────────────────────────────────────────── */
.bl-section {
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-2xl) var(--page-gutter);
  border-top: var(--rule-hair) solid var(--color-rule);
}

.bl-section__head {
  margin-bottom: var(--space-xl);
}

.bl-section__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: var(--space-sm);
}

.bl-section__note {
  font-size: var(--text-base);
  color: var(--color-muted);
  max-width: var(--measure);
}

/* ── Colour ───────────────────────────────────────────────────────── */
.bl-swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--space-lg);
}

.bl-swatch {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.bl-swatch__chip {
  flex: none;
  inline-size: 3rem;
  block-size: 3rem;
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 2px;
}

.bl-swatch__body {
  min-width: 0;
}

.bl-swatch__name {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
  line-height: 1.4;
}

.bl-swatch__value {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--color-neutral);
  line-height: 1.5;
}

.bl-swatch__role {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.5;
  margin-top: var(--space-2xs);
}

.bl-swatch__dot {
  margin-inline: var(--space-2xs);
  color: var(--color-neutral);
}

.bl-swatch__contrast {
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
}

/* ── Type scale ───────────────────────────────────────────────────── */
.bl-scale__row {
  display: grid;
  grid-template-columns: 14rem 1fr;
  gap: var(--space-lg);
  align-items: baseline;
  padding-block: var(--space-md);
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.bl-scale__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);
}

.bl-scale__token {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.bl-scale__value {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--color-neutral);
}

.bl-scale__specimen {
  line-height: 1.15;
  letter-spacing: -0.01em;
  min-width: 0;
  overflow-wrap: anywhere;
}

.bl-scale__specimen--display {
  font-family: var(--font-display);
  font-weight: 300;
  letter-spacing: -0.025em;
}

/* ── Prose specimen ───────────────────────────────────────────────── */
.bl-prose {
  max-width: var(--measure);
  margin-top: var(--space-xl);
}

.bl-prose__head {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  margin-bottom: var(--space-sm);
}

.bl-prose p {
  margin-bottom: var(--space-md);
}

.bl-prose mark {
  background: var(--color-highlight);
  color: var(--color-ink);
  padding-inline: var(--space-3xs);
}

.bl-quote {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
  color: var(--color-muted);
  padding-left: var(--space-md);
  border-left: var(--rule-hair) solid var(--color-rule);
}

.bl-link {
  color: var(--color-ink);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: var(--rule-hair);
  transition: color var(--dur-micro) var(--ease-out);
}

.bl-link:hover {
  color: var(--color-accent);
}

.bl-link--quiet {
  color: var(--color-neutral);
  text-decoration: none;
}

/* ── Space scale ──────────────────────────────────────────────────── */
.bl-space__row {
  display: grid;
  grid-template-columns: 14rem 1fr;
  gap: var(--space-lg);
  align-items: center;
  padding-block: var(--space-sm);
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.bl-space__meta {
  display: flex;
  justify-content: space-between;
  gap: var(--space-sm);
}

.bl-space__token {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.bl-space__value {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--color-neutral);
}

.bl-space__bar {
  display: block;
  block-size: 0.75rem;
  max-inline-size: 100%;
  background: var(--color-accent);
  border-radius: 1px;
}

.bl-defs {
  margin-top: var(--space-xl);
  max-width: var(--measure);
}

.bl-defs__item + .bl-defs__item {
  margin-top: var(--space-md);
}

.bl-defs__term {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
  margin-bottom: var(--space-3xs);
}

.bl-defs__desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.6;
}

.bl-defs__value {
  font-variant-numeric: tabular-nums;
  color: var(--color-neutral);
}

/* ── Motion ───────────────────────────────────────────────────────── */
.bl-motion__row {
  display: grid;
  grid-template-columns: 14rem minmax(6rem, 12rem) 1fr;
  gap: var(--space-lg);
  align-items: center;
  padding-block: var(--space-md);
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.bl-motion__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);
}

.bl-motion__token {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.bl-motion__value {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--color-neutral);
  overflow-wrap: anywhere;
}

.bl-motion__track {
  position: relative;
  display: block;
  block-size: 0.5rem;
  background: var(--color-paper-2);
  border-radius: 999px;
  /* cqi below lets the dot travel the track's own width, whatever it is */
  container-type: inline-size;
}

.bl-motion__dot {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 0;
  inline-size: 0.75rem;
  block-size: 0.75rem;
  margin-block-start: -0.375rem;
  background: var(--color-accent);
  border-radius: 50%;
  transition-property: translate;
  translate: 0 0;
}

.bl-motion__row:hover .bl-motion__dot,
.bl-motion__row:focus-within .bl-motion__dot {
  translate: calc(100cqi - 0.75rem) 0;
}

.bl-motion__role {
  font-size: var(--text-sm);
  color: var(--color-muted);
}

/* ── Depth ────────────────────────────────────────────────────────── */
.bl-depth__row {
  display: grid;
  grid-template-columns: 9rem 1fr auto 14rem;
  gap: var(--space-md);
  align-items: baseline;
  padding-block: var(--space-sm);
}

.bl-depth__token {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--text-sm);
  color: var(--color-ink);
}

.bl-depth__rule {
  display: block;
  block-size: var(--rule-hair);
  background: var(--color-rule);
  translate: 0 -0.3em;
}

.bl-depth__value {
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
}

.bl-depth__role {
  font-size: var(--text-sm);
  color: var(--color-muted);
}

/* ── Footer ───────────────────────────────────────────────────────── */
.bl-close {
  border-top: var(--rule-hair) solid var(--color-rule);
  margin-top: var(--space-2xl);
}

.bl-close__inner {
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-xl) var(--page-gutter) var(--space-3xl);
}

.bl-close__note {
  font-size: var(--text-sm);
  color: var(--color-muted);
  max-width: var(--measure);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.bl-close__colophon {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--color-neutral);
}

/* ── Responsive: collapse the two-column rows ─────────────────────── */
@media (max-width: 45rem) {
  .bl-scale__row,
  .bl-space__row,
  .bl-motion__row,
  .bl-depth__row {
    grid-template-columns: 1fr;
    gap: var(--space-xs);
  }

  .bl-scale__meta,
  .bl-motion__meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-sm);
  }

  .bl-depth__rule {
    display: none;
  }

  .bl-depth__row {
    grid-template-columns: auto auto;
    justify-content: start;
    column-gap: var(--space-sm);
  }

  .bl-depth__role {
    grid-column: 1 / -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .baseline *,
  .baseline *::before,
  .baseline *::after {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
  }
}
</style>
