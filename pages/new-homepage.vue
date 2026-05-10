<template>
  <div class="nh" :data-theme="theme">
    <a class="skip" href="#content">Skip to content</a>

    <header class="header">
      <div class="container header__inner">
        <NuxtLink class="brand" to="/new-homepage" aria-label="Home">
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__text">Alfathony</span>
        </NuxtLink>

        <nav class="nav" aria-label="Primary">
          <a class="nav__link" href="#work">Work</a>
          <a class="nav__link" href="#about">About</a>
          <a class="nav__link" href="#journal">Journal</a>
          <a class="nav__link" href="#contact">Contact</a>
        </nav>

        <div class="header__actions">
          <button
            class="toggle"
            type="button"
            @click="toggleTheme"
            :aria-pressed="theme === 'dark'"
          >
            <span class="toggle__dot" aria-hidden="true" />
            <span class="toggle__text">{{
              theme === "dark" ? "Dark" : "Light"
            }}</span>
          </button>

          <a class="cta" href="#contact">
            Let’s build
            <span class="cta__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>

    <main id="content">
      <section class="hero" aria-labelledby="hero-title">
        <div class="container hero__grid">
          <div class="hero__copy">
            <p class="kicker">UI/UX • Product • Systems</p>
            <h1 id="hero-title" class="title">
              Brutal clarity.<br />
              Playful precision.
            </h1>
            <p class="lede">
              I design interfaces that feel obvious in the best way — with sharp
              hierarchy, fast comprehension, and a little personality that makes
              people smile.
            </p>

            <div class="hero__buttons">
              <a class="btn btn--primary" href="#work">
                View selected work
                <span aria-hidden="true">↘</span>
              </a>
              <a class="btn btn--ghost" href="#contact">Start a project</a>
            </div>

            <dl class="stats" aria-label="Highlights">
              <div class="stat">
                <dt class="stat__k">Experience</dt>
                <dd class="stat__v">8+ yrs</dd>
              </div>
              <div class="stat">
                <dt class="stat__k">Projects</dt>
                <dd class="stat__v">50+</dd>
              </div>
              <div class="stat">
                <dt class="stat__k">Focus</dt>
                <dd class="stat__v">Product UX</dd>
              </div>
            </dl>
          </div>

          <div class="hero__panel" aria-label="Preview panels">
            <div class="panel panel--a">
              <div class="panel__top">
                <span class="chip">Case study</span>
                <span class="muted">Conversion</span>
              </div>
              <p class="panel__title">Checkout flow redesign</p>
              <p class="panel__body">
                Less friction. More “yes”. Clear next step at every moment.
              </p>
              <div class="panel__metric">
                <span class="metric__v">+34%</span>
                <span class="metric__k">success rate</span>
              </div>
            </div>

            <div class="panel panel--b">
              <div class="panel__top">
                <span class="chip chip--outline">System</span>
                <span class="muted">Design tokens</span>
              </div>
              <p class="panel__title">Scaled component library</p>
              <p class="panel__body">
                Faster shipping with consistent UI and less debate.
              </p>
              <div class="panel__metric">
                <span class="metric__v">2–3×</span>
                <span class="metric__k">delivery speed</span>
              </div>
            </div>

            <div class="hero__gridlines" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section class="logos" aria-label="Social proof">
        <div class="container logos__row">
          <p class="logos__label">Trusted by teams who care about craft</p>
          <div class="logos__list" aria-hidden="true">
            <span class="logo">Fintech</span>
            <span class="logo">SaaS</span>
            <span class="logo">Marketplace</span>
            <span class="logo">Enterprise</span>
          </div>
        </div>
      </section>

      <section id="work" class="work" aria-labelledby="work-title">
        <div class="container">
          <div class="sectionHead">
            <h2 id="work-title" class="h2">Selected work</h2>
            <p class="sub">
              Big tiles, brutal hierarchy, playful micro-details — tuned for
              speed of understanding.
            </p>
          </div>

          <div class="grid" role="list">
            <article
              v-for="(p, i) in projects"
              :key="p.name"
              class="card"
              role="listitem"
            >
              <div class="card__media" :style="{ '--accent': p.accent }">
                <div class="card__frame" aria-hidden="true">
                  <span class="dot dot--r" />
                  <span class="dot dot--y" />
                  <span class="dot dot--g" />
                </div>
                <div class="card__glyph" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M7 7h10v10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div class="card__body">
                <div class="card__meta">
                  <span class="tag">{{ p.category }}</span>
                  <span class="muted">{{ p.year }}</span>
                </div>
                <h3 class="card__title">
                  <span class="num" aria-hidden="true">{{
                    String(i + 1).padStart(2, "0")
                  }}</span>
                  {{ p.name }}
                </h3>
                <p class="card__desc">{{ p.desc }}</p>

                <ul class="pillRow" aria-label="Highlights">
                  <li v-for="pill in p.pills" :key="pill" class="pill">
                    {{ pill }}
                  </li>
                </ul>

                <a
                  class="card__link"
                  :href="p.url"
                  target="_blank"
                  rel="noopener"
                >
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" class="about" aria-labelledby="about-title">
        <div class="container about__grid">
          <div>
            <h2 id="about-title" class="h2">About</h2>
            <p class="sub">
              I’m a Jakarta-based UI/UX designer. I obsess over: hierarchy,
              helpful defaults, and interfaces that feel effortless under
              pressure.
            </p>
          </div>

          <div class="about__cards">
            <div class="mini">
              <p class="mini__k">Principle</p>
              <p class="mini__v">Make the next step impossible to miss.</p>
            </div>
            <div class="mini">
              <p class="mini__k">Method</p>
              <p class="mini__v">Prototype fast → validate → systemize.</p>
            </div>
            <div class="mini">
              <p class="mini__k">Style</p>
              <p class="mini__v">Bold blocks, crisp type, playful accents.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" class="journal" aria-labelledby="journal-title">
        <div class="container">
          <div class="sectionHead">
            <h2 id="journal-title" class="h2">Journal</h2>
            <p class="sub">
              Short reads about UX, product thinking, and building useful
              things.
            </p>
          </div>

          <div class="list">
            <article v-for="a in articles" :key="a.title" class="row">
              <div class="row__left">
                <p class="row__cat">{{ a.category }}</p>
                <h3 class="row__title">{{ a.title }}</h3>
                <p class="row__excerpt">{{ a.excerpt }}</p>
              </div>
              <div class="row__right">
                <span class="muted">{{ a.date }}</span>
                <span class="sep" aria-hidden="true">·</span>
                <span class="muted">{{ a.readTime }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="testimonials" aria-labelledby="t-title">
        <div class="container">
          <div class="sectionHead">
            <h2 id="t-title" class="h2">Testimonials</h2>
            <p class="sub">Kind words, sharp teams.</p>
          </div>

          <div class="tgrid" role="list">
            <figure
              v-for="t in testimonials"
              :key="t.text"
              class="quote"
              role="listitem"
            >
              <blockquote class="quote__text">“{{ t.text }}”</blockquote>
              <figcaption class="quote__by">— {{ t.author }}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="contact" class="contact" aria-labelledby="c-title">
        <div class="container contact__grid">
          <div>
            <h2 id="c-title" class="h2">Contact</h2>
            <p class="sub">
              Tell me what you’re building. I’ll respond with a clear next step.
            </p>

            <div class="contact__links" aria-label="Direct contact">
              <a class="link" href="mailto:hello@alfathony.com"
                >hello@alfathony.com</a
              >
              <a
                class="link"
                href="https://linkedin.com/in/alfathony"
                target="_blank"
                rel="noopener"
                >LinkedIn</a
              >
              <a
                class="link"
                href="https://github.com/alfathony"
                target="_blank"
                rel="noopener"
                >GitHub</a
              >
            </div>
          </div>

          <form
            class="form"
            @submit.prevent="onSubmit"
            aria-label="Project inquiry"
          >
            <label class="field">
              <span class="field__label">Name</span>
              <input
                v-model="form.name"
                class="input"
                type="text"
                name="name"
                autocomplete="name"
                required
              />
            </label>

            <label class="field">
              <span class="field__label">Email</span>
              <input
                v-model="form.email"
                class="input"
                type="email"
                name="email"
                autocomplete="email"
                required
              />
            </label>

            <label class="field field--full">
              <span class="field__label">What are you building?</span>
              <textarea
                v-model="form.message"
                class="input input--area"
                name="message"
                rows="5"
                required
              />
            </label>

            <button class="btn btn--primary btn--full" type="submit">
              Send message
              <span aria-hidden="true">→</span>
            </button>

            <p class="fine muted">
              This is a design-first prototype: submission is currently
              non-functional.
            </p>
          </form>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <p class="muted">© 2026 Alfathony. Experimental homepage.</p>
        <NuxtLink class="muted footer__link" to="/"
          >Back to current homepage</NuxtLink
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
useHead({
  title: "New Homepage Experiment — Alfathony",
  meta: [
    {
      name: "description",
      content:
        "Experimental homepage concept: brutal-clean layout with playful accents, light-first with optional dark mode.",
    },
  ],
});

const theme = ref("light");

onMounted(() => {
  const saved = localStorage.getItem("nh_theme");
  theme.value = saved === "dark" ? "dark" : "light";
});

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("nh_theme", theme.value);
};

const projects = [
  {
    name: "FiqApp Digital Wallet",
    category: "Fintech",
    year: "2024",
    desc: "Rebuilt core flows with ruthless clarity. Reduced ambiguity, improved speed, and made key actions loud.",
    pills: ["UX research", "Mobile UI", "Prototyping"],
    accent: "#2563EB",
    url: "#",
  },
  {
    name: "TradeFlow B2B Platform",
    category: "SaaS",
    year: "2024",
    desc: "A block-based redesign that surfaces trust signals and compresses procurement into fewer decisions.",
    pills: ["Web UI", "Conversion", "Design system"],
    accent: "#18181B",
    url: "#",
  },
  {
    name: "ServeEase Marketplace",
    category: "Marketplace",
    year: "2023",
    desc: "Trust-first booking with clean steps and playful touches where it helps: empty states and microcopy.",
    pills: ["Product UX", "Flows", "IA"],
    accent: "#3F3F46",
    url: "#",
  },
  {
    name: "OpsCenter Dashboard",
    category: "Enterprise",
    year: "2023",
    desc: "Dense data made readable with grid discipline and a predictable visual language.",
    pills: ["Dashboard UX", "Data viz", "Workflows"],
    accent: "#2563EB",
    url: "#",
  },
];

const articles = [
  {
    title: "Why Good UX Starts with Empathy",
    date: "2024",
    readTime: "5 min",
    excerpt:
      "Empathy is not a vibe — it’s a method for finding the right defaults.",
    category: "UX",
  },
  {
    title: "Designing with Humor in a Serious Industry",
    date: "2024",
    readTime: "4 min",
    excerpt:
      "Playful moments can increase trust when they’re placed with restraint.",
    category: "Product",
  },
  {
    title: "From Drumsticks to Design Systems",
    date: "2023",
    readTime: "6 min",
    excerpt: "Rhythm in music maps surprisingly well to rhythm in UI.",
    category: "Story",
  },
];

const testimonials = [
  {
    text: "He makes messy problems feel clean and solvable.",
    author: "Collaborator",
  },
  {
    text: "Strong taste, strong reasoning. Rare combo.",
    author: "Team Member",
  },
  {
    text: "Thoughtful in every detail — especially the “boring” ones.",
    author: "Client",
  },
  { text: "Fast, kind, and consistently reliable.", author: "Friend" },
];

const form = ref({ name: "", email: "", message: "" });
const onSubmit = () => {
  // Design-first prototype (no backend yet).
};
</script>

<style scoped>
.nh {
  --bg: #fafafa;
  --panel: #ffffff;
  --text: #09090b;
  --muted: #52525b;
  --border: #e4e4e7;
  --shadow: 0 18px 40px rgba(9, 9, 11, 0.08);
  --accent: #2563eb;
  --accent-ink: #0b1220;
  --radius: 20px;
  --radius2: 28px;
  --fontDisplay:
    "Space Grotesk", system-ui, -apple-system, Segoe UI, Roboto, Arial,
    sans-serif;
  --fontBody:
    "Archivo", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-family: var(--fontBody);
  line-height: 1.6;
}

.nh[data-theme="dark"] {
  --bg: #0a0a0b;
  --panel: #0f0f12;
  --text: #f4f4f5;
  --muted: #a1a1aa;
  --border: #242428;
  --shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  --accent: #60a5fa;
  --accent-ink: #06080f;
}

.skip {
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 10px 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 999px;
  transform: translateY(-200%);
  transition: transform 0.2s ease;
  z-index: 999;
}
.skip:focus {
  transform: translateY(0);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.header__inner {
  height: 72px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.brand__mark {
  width: 14px;
  height: 14px;
  background: var(--accent);
  border-radius: 4px;
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 15%, transparent);
}
.brand__text {
  font-family: var(--fontDisplay);
  letter-spacing: -0.02em;
  font-weight: 600;
}

.nav {
  display: none;
  gap: 18px;
}
.nav__link {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
  padding: 10px 10px;
  border-radius: 999px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}
.nav__link:hover {
  background: color-mix(in srgb, var(--panel) 70%, transparent);
  color: var(--text);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle {
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--text);
  height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.toggle:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}
.toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.toggle__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--accent);
}
.toggle__text {
  font-size: 13px;
  color: var(--muted);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  text-decoration: none;
  color: var(--accent-ink);
  background: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 75%, #000);
  font-weight: 600;
  font-size: 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--accent) 28%, transparent);
}
.cta:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.cta__arrow {
  transform: translateY(-1px);
}

.hero {
  padding: 72px 0 48px;
}
.hero__grid {
  display: grid;
  gap: 26px;
}
.kicker {
  display: inline-flex;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--panel) 85%, transparent);
}
.title {
  margin-top: 18px;
  font-family: var(--fontDisplay);
  letter-spacing: -0.04em;
  font-weight: 600;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.02;
}
.lede {
  margin-top: 14px;
  color: var(--muted);
  max-width: 56ch;
  font-size: 16px;
}

.hero__buttons {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid var(--border);
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btn--primary {
  background: var(--text);
  color: var(--bg);
  border-color: color-mix(in srgb, var(--text) 75%, transparent);
}
.nh[data-theme="dark"] .btn--primary {
  background: var(--accent);
  color: var(--accent-ink);
  border-color: color-mix(in srgb, var(--accent) 75%, transparent);
}
.btn--ghost {
  background: var(--panel);
  color: var(--text);
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}
.btn--full {
  width: 100%;
}

.stats {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.stat {
  border: 1px solid var(--border);
  background: var(--panel);
  border-radius: 16px;
  padding: 14px;
}
.stat__k {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.stat__v {
  margin-top: 6px;
  font-family: var(--fontDisplay);
  font-size: 18px;
  letter-spacing: -0.02em;
}

.hero__panel {
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  background: var(--panel);
  box-shadow: var(--shadow);
  padding: 18px;
  overflow: hidden;
  min-height: 340px;
  display: grid;
  gap: 14px;
}

.panel {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
  background: color-mix(in srgb, var(--panel) 92%, var(--accent) 8%);
}
.panel--b {
  background: color-mix(in srgb, var(--panel) 94%, transparent);
}
.panel__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.chip {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-ink);
}
.chip--outline {
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
  color: var(--text);
}
.panel__title {
  margin-top: 10px;
  font-family: var(--fontDisplay);
  letter-spacing: -0.02em;
  font-size: 18px;
  font-weight: 600;
}
.panel__body {
  margin-top: 6px;
  color: var(--muted);
  font-size: 14px;
  max-width: 48ch;
}
.panel__metric {
  margin-top: 14px;
  display: inline-flex;
  gap: 10px;
  align-items: baseline;
}
.metric__v {
  font-family: var(--fontDisplay);
  letter-spacing: -0.03em;
  font-weight: 700;
  font-size: 22px;
  color: var(--accent);
}
.metric__k {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
}

.hero__gridlines {
  position: absolute;
  inset: -1px;
  background:
    linear-gradient(
        to right,
        color-mix(in srgb, var(--border) 70%, transparent) 1px,
        transparent 1px
      )
      0 0 / 34px 34px,
    linear-gradient(
        to bottom,
        color-mix(in srgb, var(--border) 70%, transparent) 1px,
        transparent 1px
      )
      0 0 / 34px 34px;
  mask-image: radial-gradient(
    circle at 70% 30%,
    rgba(0, 0, 0, 0.65),
    transparent 60%
  );
  opacity: 0.5;
  pointer-events: none;
}

.logos {
  padding: 14px 0 0;
}
.logos__row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--border);
}
.logos__label {
  color: var(--muted);
  font-size: 13px;
}
.logos__list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.logo {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--muted);
  font-size: 13px;
}

.sectionHead {
  display: grid;
  gap: 10px;
  margin-bottom: 22px;
}
.h2 {
  font-family: var(--fontDisplay);
  letter-spacing: -0.03em;
  font-size: 28px;
  font-weight: 650;
}
.sub {
  color: var(--muted);
  max-width: 70ch;
}

.work {
  padding: 54px 0 20px;
}
.grid {
  display: grid;
  gap: 16px;
}
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  background: var(--panel);
  overflow: hidden;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}
.card__media {
  height: 140px;
  background:
    radial-gradient(
      circle at 30% 40%,
      color-mix(in srgb, var(--accent) 25%, transparent),
      transparent 60%
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--accent) 22%, transparent),
      transparent 58%
    ),
    color-mix(in srgb, var(--panel) 70%, transparent);
  border-bottom: 1px solid var(--border);
  position: relative;
}
.card__frame {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border) 70%, transparent);
}
.dot--r {
  background: #ff5f57;
}
.dot--y {
  background: #febc2e;
}
.dot--g {
  background: #28c840;
}

.card__glyph {
  position: absolute;
  right: 16px;
  bottom: 14px;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--panel) 80%, transparent);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--text);
}
.card__glyph svg {
  width: 20px;
  height: 20px;
}

.card__body {
  padding: 16px 16px 18px;
}
.card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.tag {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
}
.num {
  font-variant-numeric: tabular-nums;
  opacity: 0.45;
  margin-right: 10px;
}
.card__title {
  margin-top: 8px;
  font-family: var(--fontDisplay);
  letter-spacing: -0.02em;
  font-size: 18px;
}
.card__desc {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
}
.pillRow {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
}
.pill {
  font-size: 12px;
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--panel) 90%, transparent);
  color: var(--muted);
}
.card__link {
  margin-top: 14px;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  color: var(--text);
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--panel) 70%, transparent);
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}
.card__link:hover {
  transform: translateY(-1px);
  background: color-mix(in srgb, var(--accent) 12%, var(--panel));
}
.card__link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.about {
  padding: 44px 0 10px;
}
.about__grid {
  display: grid;
  gap: 16px;
}
.about__cards {
  display: grid;
  gap: 12px;
}
.mini {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px 14px;
  background: var(--panel);
}
.mini__k {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
.mini__v {
  margin-top: 8px;
  font-family: var(--fontDisplay);
  letter-spacing: -0.02em;
  font-weight: 600;
}

.journal {
  padding: 44px 0 10px;
}
.list {
  display: grid;
  gap: 12px;
}
.row {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px;
  background: var(--panel);
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
}
.row__cat {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 700;
}
.row__title {
  margin-top: 6px;
  font-family: var(--fontDisplay);
  letter-spacing: -0.02em;
  font-size: 16px;
}
.row__excerpt {
  margin-top: 6px;
  color: var(--muted);
  font-size: 13px;
  max-width: 70ch;
}
.row__right {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
  padding-top: 2px;
}
.sep {
  opacity: 0.5;
}

.testimonials {
  padding: 44px 0 10px;
}
.tgrid {
  display: grid;
  gap: 12px;
}
.quote {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px;
  background: var(--panel);
}
.quote__text {
  color: var(--text);
  font-size: 14px;
}
.quote__by {
  margin-top: 10px;
  color: var(--muted);
  font-size: 13px;
}

.contact {
  padding: 54px 0 60px;
}
.contact__grid {
  display: grid;
  gap: 18px;
}
.contact__links {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.link {
  display: inline-flex;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  text-decoration: none;
  color: var(--text);
  font-weight: 700;
  font-size: 14px;
}
.link:hover {
  background: color-mix(in srgb, var(--accent) 10%, var(--panel));
}
.link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.form {
  border: 1px solid var(--border);
  border-radius: var(--radius2);
  padding: 16px;
  background: var(--panel);
  box-shadow: var(--shadow);
  display: grid;
  gap: 12px;
}
.field {
  display: grid;
  gap: 8px;
}
.field--full {
  grid-column: 1 / -1;
}
.field__label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}
.input {
  width: 100%;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--panel) 92%, transparent);
  color: var(--text);
  border-radius: 14px;
  padding: 12px 12px;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.input:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent);
}
.input--area {
  resize: vertical;
  min-height: 120px;
}
.fine {
  font-size: 12px;
  margin-top: 2px;
}

.muted {
  color: var(--muted);
}

.footer {
  border-top: 1px solid var(--border);
  padding: 22px 0;
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.footer__link {
  text-decoration: none;
}
.footer__link:hover {
  color: var(--text);
}

@media (min-width: 880px) {
  .nav {
    display: flex;
  }
  .hero__grid {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
    gap: 28px;
  }
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .about__grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 24px;
  }
  .about__cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .tgrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .contact__grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 24px;
  }
}
</style>
