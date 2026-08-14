<template>
  <div class="letter">
    <!-- Nav · N9 Edge-aligned minimal -->
    <header class="lt-nav">
      <div class="lt-nav__inner">
        <a href="#top" class="lt-nav__wordmark">Alfathony</a>
        <a
          class="lt-nav__cta"
          href="https://wa.me/6285155260901"
          target="_blank"
          rel="noopener"
        >Start a project<span aria-hidden="true"> &rarr;</span></a>
      </div>
    </header>

    <main id="top">
      <!-- Hero · H5 Letter -->
      <section class="lt-hero">
        <p class="lt-hero__salutation"><em>Hello &mdash; I&rsquo;m Alfathony.</em></p>
        <h1 class="lt-hero__display">I design software people finish using.</h1>
        <p class="lt-hero__lede">
          Product designer in Jakarta. Eight years in, a little over fifty
          projects &mdash; most of them fintech, marketplaces, and the
          unglamorous internal tools nobody puts on a portfolio.
        </p>
        <p class="lt-hero__dateline">Jakarta, 2026</p>
      </section>

      <!-- The letter continues -->
      <section class="lt-prose" aria-label="About">
        <p>
          For most of those years I&rsquo;ve worked on the part of a product
          nobody photographs: the checkout that simply has to not fail, the
          dashboard someone stares at for six hours a day, the form that
          decides whether a small business gets paid this week.
        </p>

        <p>
          <span class="lt-prose__head">How I work.</span> I start by watching
          people use whatever exists today &mdash; the spreadsheet, the
          competitor, the workaround they invented themselves. Almost every
          brief I&rsquo;ve been handed described the wrong problem, and almost
          every time the real one was visible within an hour of watching.
          After that it is mostly subtraction: fewer steps, fewer decisions,
          fewer places to be confused.
        </p>

        <p>
          I care about the things that are hard to demo &mdash; error states,
          empty states, what happens on a bad connection in a queue at a
          bank. That work rarely makes a nice screenshot. It is usually the
          difference between a product people tolerate and one they
          <mark>actually finish using</mark>.
        </p>

        <p>
          <span class="lt-prose__head">Away from the screen.</span> I play
          drums, loudly, usually until two in the morning. I travel with a
          camera and come home with four hundred photographs of doorways. I
          play golf and I am still chasing par. None of it is a hobby section
          on a portfolio &mdash; it is where most of my ideas about rhythm,
          framing, and patience come from.
        </p>
      </section>

      <!-- Selected work -->
      <section class="lt-index" aria-labelledby="work-title">
        <h2 id="work-title" class="lt-index__title">Selected work</h2>
        <ul class="lt-index__list">
          <li v-for="project in selectedProjects" :key="project.name" class="lt-row">
            <h3 class="lt-row__name">{{ project.name }}</h3>
            <p class="lt-row__desc">{{ project.desc }}</p>
            <p class="lt-row__meta">
              <span>{{ project.category }}</span>
              <span class="lt-row__dot" aria-hidden="true">&middot;</span>
              <span class="lt-row__year">{{ project.year }}</span>
            </p>
            <ul class="lt-row__tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <!-- Side projects -->
      <section class="lt-index" aria-labelledby="side-title">
        <h2 id="side-title" class="lt-index__title">Small things I built</h2>
        <p class="lt-index__note">
          Weekend work. Built to scratch my own itch, kept because someone
          else found them useful.
        </p>
        <ul class="lt-index__list">
          <li v-for="app in sideProjects" :key="app.name" class="lt-row lt-row--tight">
            <h3 class="lt-row__name lt-row__name--sm">{{ app.name }}</h3>
            <p class="lt-row__desc">{{ app.desc }}</p>
          </li>
        </ul>
      </section>

      <!-- Writing -->
      <section class="lt-index" aria-labelledby="journal-title">
        <h2 id="journal-title" class="lt-index__title">Writing</h2>
        <ul class="lt-index__list">
          <li v-for="article in journal" :key="article.title" class="lt-row lt-row--tight">
            <h3 class="lt-row__name lt-row__name--sm">{{ article.title }}</h3>
            <p class="lt-row__desc">{{ article.excerpt }}</p>
            <p class="lt-row__meta">
              <span>{{ article.category }}</span>
              <span class="lt-row__dot" aria-hidden="true">&middot;</span>
              <span class="lt-row__year">{{ article.date }}</span>
            </p>
          </li>
        </ul>
      </section>

      <!-- Words from people -->
      <section class="lt-quotes" aria-labelledby="quotes-title">
        <h2 id="quotes-title" class="lt-index__title">What people say</h2>
        <figure v-for="quote in testimonials" :key="quote.author" class="lt-quote">
          <blockquote class="lt-quote__text">{{ quote.text }}</blockquote>
          <figcaption class="lt-quote__author">&mdash; {{ quote.author }}</figcaption>
        </figure>
      </section>
    </main>

    <!-- Footer · Ft6 Letter close -->
    <footer class="lt-close">
      <div class="lt-close__inner">
      <p class="lt-close__sign">
        Yours,<br />
        <span class="lt-close__name">Alfathony</span>
      </p>
      <p class="lt-close__ps">
        P.S. &mdash; The fastest way to reach me is
        <a
          class="lt-link"
          href="https://wa.me/6285155260901"
          target="_blank"
          rel="noopener"
        >WhatsApp</a>. Email works too, I just answer it slower:
        <a class="lt-link" href="mailto:hello@alfathony.com">hello@alfathony.com</a>.
      </p>
      <p class="lt-close__colophon">
        <a
          class="lt-link lt-link--quiet"
          href="https://linkedin.com/in/alfathony"
          target="_blank"
          rel="noopener"
        >LinkedIn</a>
        <span aria-hidden="true">&middot;</span>
        <a
          class="lt-link lt-link--quiet"
          href="https://dribbble.com/alfathony"
          target="_blank"
          rel="noopener"
        >Dribbble</a>
        <span aria-hidden="true">&middot;</span>
        <a
          class="lt-link lt-link--quiet"
          href="https://github.com/alfathony"
          target="_blank"
          rel="noopener"
        >GitHub</a>
      </p>
      <p class="lt-close__copyright">Set in Fraunces and Newsreader. Jakarta, 2026.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const selectedProjects = [
  {
    name: 'FiqApp',
    category: 'Fintech',
    year: '2024',
    desc: 'End-to-end redesign of a digital wallet — onboarding through checkout, rebuilt around the moments where transactions actually fail.',
    tags: ['UX research', 'Mobile', 'Prototyping']
  },
  {
    name: 'TradeFlow',
    category: 'B2B marketplace',
    year: '2024',
    desc: 'Procurement platform for suppliers and buyers across Southeast Asia. The work was mostly about trust signals and shortening the path to a first order.',
    tags: ['Web', 'Conversion', 'Brand identity']
  },
  {
    name: 'ServeEase',
    category: 'Service platform',
    year: '2023',
    desc: 'On-demand household services. Booking a stranger into your home is a trust problem before it is a scheduling problem.',
    tags: ['Product design', 'UX strategy', 'Design system']
  },
  {
    name: 'OpsCenter',
    category: 'Internal tool',
    year: '2023',
    desc: 'Operations dashboard for a team handling high daily transaction volume. Unglamorous, heavily used, and the project I am most proud of.',
    tags: ['Dashboard', 'Enterprise UX', 'Data viz']
  }
]

const sideProjects = [
  { name: 'Prayer Time', desc: 'Daily prayer times with notifications that respect the quiet hours.' },
  { name: 'Weather Hub', desc: 'Seven-day forecast, no ads, no permission requests it does not need.' },
  { name: 'Tax ID', desc: 'Indonesian tax calculation, explained while it calculates.' },
  { name: 'YT Saver', desc: 'Download videos in the format you actually wanted.' },
  { name: 'Habit Tracker', desc: 'One day at a time, without the streak guilt.' },
  { name: 'Focus Timer', desc: 'Pomodoro, made quiet enough to leave on screen.' },
  { name: 'Quote Day', desc: 'One line a day. No feed, no scroll.' },
  { name: 'BudgetWise', desc: 'Expense tracking for people who dislike expense tracking.' }
]

const journal = [
  {
    title: 'Why good UX starts with empathy',
    date: '2024',
    excerpt: 'Empathy is not a buzzword — it is the cheapest research method available.',
    category: 'UX design'
  },
  {
    title: 'Designing with humour in a serious industry',
    date: '2024',
    excerpt: 'What a little lightness does to the way people move through a product.',
    category: 'Design thinking'
  },
  {
    title: 'From drumsticks to design systems',
    date: '2023',
    excerpt: 'Music taught me rhythm before any design book did.',
    category: 'Personal'
  }
]

const testimonials = [
  { text: 'He finds the solution before we know there is a problem.', author: 'Collaborator' },
  { text: 'His energy makes every project feel lighter than it is.', author: 'Team member' },
  { text: 'Thoughtful in every detail — he considers things we would never think of.', author: 'Client' },
  { text: 'Sometimes funny, always reliable. That is rare.', author: 'Friend' }
]
</script>

<style>
/* Page-edge clipping — gate 34. `clip`, not `hidden`: preserves sticky/fixed. */
html,
body {
  overflow-x: clip;
}
</style>

<style scoped>
/* Hallmark · genre: editorial · macrostructure: Letter · theme: Atelier (warm-oat)
 * nav: N9 edge-aligned · footer: Ft6 letter-close · enrichment: none (typography only)
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * contrast: pass (40–41) · slop: pass (42–45) · honest: pass (46) · chrome: pass (47)
 * tokens: pass (48) · responsive: pass (49) · mobile: pass (34, 49, 50–57)
 *
 * Two isolation decisions, both deliberate:
 *  1. Tokens are scoped to .letter, not :root — this app is SPA (ssr: false),
 *     and a global :root block would leak this palette onto /minimal,
 *     /creative and /brutalism after client-side navigation.
 *  2. Every class is `lt-` prefixed and the element-level rules from the
 *     legacy global assets/css/main.css (`section`, `footer`, `.hero`) are
 *     neutralised below. main.css still styles the other routes; it must not
 *     reach into this page.
 */

.letter {
  /* Colour — warm oat paper, anchor hue 85. No pure black, no pure white. */
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

  /* Type — 2 families. Display roman; italic is body emphasis only. */
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

  /* Space — 4pt scale, named by role */
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
  --shell: 60rem; /* the page block — centred, symmetric margins */
  --rail: 11rem; /* hanging-header rail in the left margin */

  /* Motion — three named easings, three durations. No browser defaults. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;

  /* Depth — six named levels, no freestyle numbers */
  --z-base: 1;
  --z-raised: 10;
  --z-sticky: 200;

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
 * `section { min-height: 100vh }`, `footer { text-align: center }` and
 * `.hero { display: flex; align-items: center }` no longer reach in. */
.letter :where(section, footer, header, main, div, ul, li, figure, blockquote) {
  min-height: 0;
  max-height: none;
  padding: 0;
  margin: 0;
  display: block;
  text-align: left;
  background: none;
  border: 0;
}

.letter *,
.letter *::before,
.letter *::after {
  box-sizing: border-box;
}

/* ── Focus: instant, never transitioned (gate 15) ─────────────────── */
.letter :focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ── Nav · N9 — the empty middle is the design ────────────────────── */
.lt-nav {
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.lt-nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-lg) var(--page-gutter);
}

.lt-nav__wordmark {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--color-ink);
  text-decoration: none;
  line-height: 1;
}

.lt-nav__cta {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: none;
  white-space: nowrap;
  line-height: 1;
  padding-bottom: var(--space-xs);
  border-bottom: var(--rule-hair) solid var(--color-ink);
  transition: color var(--dur-micro) var(--ease-out),
    border-color var(--dur-micro) var(--ease-out);
}

.lt-nav__wordmark:hover,
.lt-nav__cta:hover {
  color: var(--color-accent);
}

.lt-nav__cta:hover {
  border-color: var(--color-accent);
}

.lt-nav__wordmark:active,
.lt-nav__cta:active {
  color: var(--color-muted);
}

/* ── Hero · H5 Letter — left-biased, no buttons in the fold ───────── */
/* The hero is the one deliberate grid-break: it ignores the rail and runs
 * the full shell width. Everything below it respects the rail. */
.lt-hero {
  /* bottom padding 1.5× top — the hero sits into the page (gate 44a) */
  padding: var(--space-2xl) var(--page-gutter) var(--space-3xl);
  max-width: var(--shell);
  margin-inline: auto;
}

.lt-hero__salutation {
  font-size: var(--text-md);
  font-style: italic;
  color: var(--color-muted);
  margin-bottom: var(--space-md);
}

.lt-hero__display {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-style: normal; /* headers are roman — gate 38a */
  font-weight: 300;
  line-height: 1.06;
  letter-spacing: -0.025em;
  overflow-wrap: anywhere; /* gate 51 */
  min-width: 0;
  max-width: 21ch; /* wraps to 2 lines at desktop, deliberately */
  margin-bottom: var(--space-lg);
}

.lt-hero__lede {
  font-size: var(--text-md);
  line-height: 1.55;
  color: var(--color-muted);
  max-width: var(--measure);
  margin-bottom: var(--space-xl);
}

.lt-hero__dateline {
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-neutral);
}

/* ── The letter body — single narrow column, S4 inline heads ──────── */
.lt-prose {
  padding: 0 var(--page-gutter) var(--space-3xl);
  max-width: var(--shell);
  margin-inline: auto;
}

.lt-prose p {
  max-width: var(--measure);
}

.lt-prose p + p {
  margin-top: var(--space-lg);
}

.lt-prose__head {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.06em;
  font-weight: 600;
  color: var(--color-ink);
}

/* Highlighter band sits behind the x-height, not on the baseline (gate 35) */
.lt-prose mark {
  background: linear-gradient(
    180deg,
    transparent 38%,
    var(--color-highlight) 38%,
    var(--color-highlight) 92%,
    transparent 92%
  );
  color: inherit;
}

/* ── Index sections — one rule across the top, title hangs in the rail ─ */
.lt-index,
.lt-quotes {
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-xl) var(--page-gutter) var(--space-3xl);
  border-top: var(--rule-hair) solid var(--color-ink);
}

/* Uneven rhythm — the rules must not be evenly spaced (anti-pattern:
 * every section padded the same). */
.lt-index + .lt-index {
  padding-block: var(--space-lg) var(--space-2xl);
}

.lt-quotes {
  padding-bottom: var(--space-2xl);
}

/* Section head hangs in the left rail. No eyebrow / number sits beside the
 * heading — the rail carries the heading itself, which is what keeps this
 * clear of gate 54. */
.lt-index__title {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
  min-width: 0;
  margin-bottom: var(--space-lg);
}

.lt-index__note {
  max-width: var(--measure);
  color: var(--color-muted);
  margin-bottom: var(--space-lg);
}

.lt-index__list {
  list-style: none;
}

.lt-row {
  padding-block: var(--space-xl);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  max-width: var(--measure);
}

.lt-row--tight {
  padding-block: var(--space-lg);
}

/* First row aligns its baseline with the hanging title in the rail */
.lt-row:first-child {
  padding-top: 0;
}

.lt-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.lt-row__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  min-width: 0;
  margin-bottom: var(--space-xs);
}

.lt-row__name--sm {
  font-size: var(--text-md);
}

.lt-row__desc {
  color: var(--color-muted);
  line-height: 1.6;
}

.lt-row__meta {
  margin-top: var(--space-sm);
  font-size: var(--text-sm);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-neutral);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  line-height: 1;
}

.lt-row__year {
  font-variant-numeric: tabular-nums lining-nums;
}

.lt-row__dot {
  opacity: 0.6;
}

.lt-row__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  font-size: var(--text-sm);
  color: var(--color-neutral);
}

.lt-row__tags li::after {
  content: ' /';
  opacity: 0.5;
}

.lt-row__tags li:last-child::after {
  content: '';
}

/* ── Quotes — indented rule, no cards ─────────────────────────────── */
.lt-quote {
  max-width: var(--measure);
  padding-left: var(--space-lg);
  border-left: var(--rule-hair) solid var(--color-rule);
}

.lt-quote + .lt-quote {
  margin-top: var(--space-xl);
}

.lt-quote__text {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 300;
  font-style: normal;
  line-height: 1.45;
}

.lt-quote__author {
  margin-top: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--color-neutral);
}

/* ── Footer · Ft6 Letter close ────────────────────────────────────── */
.lt-close {
  border-top: var(--rule-hair) solid var(--color-ink);
}

.lt-close__inner {
  max-width: var(--shell);
  margin-inline: auto;
  padding: var(--space-2xl) var(--page-gutter) var(--space-2xl);
}

.lt-close__sign {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
}

.lt-close__name {
  font-style: normal;
  font-weight: 500;
}

.lt-close__ps {
  margin-top: var(--space-lg);
  color: var(--color-muted);
  max-width: var(--measure);
}

.lt-close__colophon {
  margin-top: var(--space-xl);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--color-neutral);
  line-height: 1;
}

.lt-close__copyright {
  margin-top: var(--space-lg);
  font-size: var(--text-sm);
  color: var(--color-neutral);
}

/* ── Links — one signal, all states ───────────────────────────────── */
.lt-link {
  color: var(--color-ink);
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: var(--color-rule);
  white-space: nowrap;
  transition: color var(--dur-micro) var(--ease-out),
    text-decoration-color var(--dur-micro) var(--ease-out);
}

.lt-link:hover {
  color: var(--color-accent);
  text-decoration-color: var(--color-accent);
}

.lt-link:active {
  color: var(--color-muted);
}

.lt-link--quiet {
  color: var(--color-neutral);
}

.lt-link[aria-disabled='true'] {
  color: var(--color-neutral);
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Reduced motion — non-optional (gate 27) ──────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .letter *,
  .letter *::before,
  .letter *::after {
    animation-duration: 150ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 150ms !important;
  }
}

/* ── Desktop — hanging headers in the left rail ───────────────────────
 * Opt-in editorial layout (layout-and-space.md § Asymmetry techniques).
 * The rail carries the section HEADING, never an eyebrow / number / kicker
 * beside a heading — that pattern is gate-54-banned and is not used here. */
@media (min-width: 62rem) {
  .lt-prose,
  .lt-index,
  .lt-quotes {
    display: grid;
    grid-template-columns: minmax(0, var(--rail)) minmax(0, 1fr);
    column-gap: var(--space-2xl);
    align-items: start;
  }

  .lt-index__title {
    grid-column: 1;
    grid-row: 1;
    margin-bottom: 0;
    color: var(--color-muted);
  }

  .lt-index__note,
  .lt-index__list,
  .lt-quote,
  .lt-prose p {
    grid-column: 2;
  }

  /* The letter body keeps the rail empty — the prose is the whole point */
  .lt-prose p:first-child {
    grid-row: 1;
  }
}

/* ── Mobile — verified at 320 / 375 / 414 / 768 ───────────────────── */
@media (max-width: 48rem) {
  .lt-hero__display {
    max-width: none;
  }

  .lt-row__tags {
    gap: var(--space-xs);
  }
}
</style>
