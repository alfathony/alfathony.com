<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showSplash = ref(true)
const splashProgress = ref(0)
const splashLoaded = ref(false)

onMounted(() => {
  const interval = setInterval(() => {
    splashProgress.value += Math.random() * 30
    if (splashProgress.value >= 100) {
      splashProgress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        splashLoaded.value = true
        setTimeout(() => {
          showSplash.value = false
        }, 800)
      }, 400)
    }
  }, 150)
})

const activeSection = ref('hero')
const scrollY = ref(0)

onMounted(() => {
  const handleScroll = () => {
    scrollY.value = window.scrollY
    const sections = ['hero', 'about', 'works', 'journal', 'contact']
    for (const section of sections) {
      const el = document.getElementById(section)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
          activeSection.value = section
          break
        }
      }
    }
  }
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const works = ref([
  { id: 1, title: 'Fintech Dashboard', category: 'Product Design', year: '2025', impact: '+40% user retention', desc: 'Redesigned investment platform with intuitive UX' },
  { id: 2, title: 'Health App', category: 'Mobile App', year: '2025', impact: '98% patient satisfaction', desc: 'Healthcare app with seamless booking' },
  { id: 3, title: 'E-commerce Platform', category: 'Design System', year: '2024', impact: '$2M+ revenue growth', desc: 'Built comprehensive design system' },
])

const journals = ref([
  { id: 1, title: 'Designing for Accessibility in 2026', date: 'Jan 2026', category: 'Thought' },
  { id: 2, title: 'The Rise of Neo-Brutalism', date: 'Dec 2025', category: 'Design' },
  { id: 3, title: 'How I Landed My Dream Job', date: 'Nov 2025', category: 'Career' },
])
</script>

<template>
  <div class="brutal-page">
    <div class="grain"></div>
    
    <Transition name="splash">
      <div v-if="showSplash" class="splash-screen">
        <div class="splash-grid"></div>
        <div class="splash-content" :class="{ loaded: splashLoaded }">
          <img src="/logo-alfathony.png" alt="A" class="splash-logo" />
          <div class="splash-text">
            <span class="splash-name">ALFATHONY</span>
            <span class="splash-tagline">Product Designer</span>
          </div>
          <div class="splash-progress">
            <div class="splash-bar" :style="{ width: splashProgress + '%' }"></div>
          </div>
          <span class="splash-percent">{{ Math.round(splashProgress) }}%</span>
        </div>
      </div>
    </Transition>
    
    <nav class="nav" :class="{ visible: !showSplash }">
      <div class="nav-left">
        <img src="/logo-alfathony.png" alt="A" class="nav-logo" />
        <span class="nav-name">ALFATHONY</span>
      </div>
      <div class="nav-links">
        <a href="#hero" class="nav-link" :class="{ active: activeSection === 'hero' }">Home</a>
        <a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }">About</a>
        <a href="#works" class="nav-link" :class="{ active: activeSection === 'works' }">Works</a>
        <a href="#journal" class="nav-link" :class="{ active: activeSection === 'journal' }">Journal</a>
        <a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }">Contact</a>
      </div>
    </nav>
    
    <section id="hero" class="hero">
      <div class="hero-shapes">
        <div class="shape s1"></div>
        <div class="shape s2"></div>
        <div class="shape s3"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">I design products that <span class="highlight">work magic</span>.</h1>
        <p class="hero-subtitle">Product Designer in Jakarta. Turning complex problems into simple, beautiful solutions.</p>
        <div class="hero-cta">
          <a href="#works" class="btn btn-primary">View Works <span>→</span></a>
          <a href="#contact" class="btn btn-secondary">Let's Talk</a>
        </div>
      </div>
      <div class="hero-marquee">
        <div class="marquee-track">
          <span v-for="i in 8" :key="i">PRODUCT DESIGNER ✦ JAKARTA ✦ DIGITAL EXPERIENCES ✦</span>
        </div>
      </div>
    </section>
    
    <section id="about" class="about">
      <div class="about-decor">
        <div class="ad-box ad-1"></div>
        <div class="ad-box ad-2"></div>
        <div class="ad-line"></div>
      </div>
      <div class="container">
        <div class="about-header">
          <div class="section-badge"><span class="section-num">01</span><span class="section-label">About</span></div>
          <h2 class="about-title"><span class="word">Product</span> <span class="word">Designer</span> <span class="word highlight">in</span> <span class="word">Jakarta</span><span class="dot">.</span></h2>
        </div>
        <div class="about-body">
          <div class="about-left">
            <div class="stat-grid">
              <div class="stat-box">
                <span class="stat-num">5+</span>
                <span class="stat-label">Years</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">40+</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">20+</span>
                <span class="stat-label">Clients</span>
              </div>
            </div>
          </div>
          <div class="about-right">
            <div class="about-intro">
              <span class="intro-label">Approach</span>
              <h3>User-Centric + Business-Aware</h3>
              <p>Design backed by research, validated by testing, aligned with goals.</p>
            </div>
            <div class="skills-stack">
              <div class="skill-tag">Product Design</div>
              <div class="skill-tag">UI/UX</div>
              <div class="skill-tag">Design Systems</div>
              <div class="skill-tag">User Research</div>
              <div class="skill-tag">Prototyping</div>
              <div class="skill-tag">Figma</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="works" class="works">
      <div class="works-marquee">
        <div class="marquee-track">
          <span v-for="i in 8" :key="i">SELECTED WORKS ✦ IMPACT-DRIVEN DESIGN ✦</span>
        </div>
      </div>
      <div class="container">
        <div class="works-header">
          <span class="section-num">02</span>
          <h2 class="works-title">Selected Works</h2>
        </div>
        <div class="works-list">
          <div v-for="work in works" :key="work.id" class="work-item">
            <div class="work-num">{{ work.id }}</div>
            <div class="work-content">
              <div class="work-meta"><span>{{ work.category }}</span><span>{{ work.year }}</span></div>
              <h3>{{ work.title }}</h3>
              <p>{{ work.desc }}</p>
              <span class="work-impact">{{ work.impact }}</span>
            </div>
            <div class="work-arrow">↗</div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="journal" class="journal">
      <div class="journal-bg">
        <div class="jb-line jl-1"></div>
        <div class="jb-line jl-2"></div>
        <div class="jb-dot"></div>
      </div>
      <div class="container">
        <div class="journal-header">
          <div class="section-badge"><span class="section-num">03</span><span class="section-label">Journal</span></div>
          <h2 class="journal-title">What I'm <span class="highlight">Thinking</span></h2>
        </div>
        <div class="journal-grid">
          <div v-for="(entry, index) in journals" :key="entry.id" class="journal-card" :style="{ '--i': index }">
            <div class="card-num">0{{ index + 1 }}</div>
            <div class="card-content">
              <span class="card-cat">{{ entry.category }}</span>
              <h3>{{ entry.title }}</h3>
              <span class="card-date">{{ entry.date }}</span>
            </div>
            <div class="card-action">
              <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="contact" class="contact">
      <div class="contact-shapes">
        <div class="cs cs-1"></div>
        <div class="cs cs-2"></div>
      </div>
      <div class="container">
        <div class="contact-header">
          <span class="section-num">04</span>
          <h2 class="contact-title">Let's make <span class="highlight">something great</span></h2>
        </div>
        <p class="contact-text">Have a project in mind? Let's talk.</p>
        <a href="mailto:hello@alfathony.com" class="contact-email">hello@alfathony.com <span>→</span></a>
        <div class="social-links">
          <a href="#" class="social-link">LinkedIn</a>
          <a href="#" class="social-link">Dribbble</a>
          <a href="#" class="social-link">Twitter</a>
        </div>
      </div>
    </section>
    
    <footer class="footer">
      <div class="container">
        <div class="footer-brand">
          <img src="/logo-alfathony.png" alt="A" class="footer-logo" />
          <span>ALFATHONY</span>
        </div>
        <p class="footer-copy">© 2026 Alfathony. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800;900&display=swap');

:root {
  --yellow: #FACC15;
  --black: #0A0A0A;
  --black-light: #1A1A1A;
  --white: #FAFAFA;
  --gray: #71717A;
  --gray-dark: #27272A;
  --font-primary: 'Syne', sans-serif;
  --font-secondary: 'Space Grotesk', sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

.brutal-page {
  font-family: var(--font-primary);
  background: var(--black);
  color: var(--white);
  overflow-x: hidden;
}

.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Splash */
.splash-screen {
  position: fixed;
  inset: 0;
  background: var(--black);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.splash-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--gray-dark) 1px, transparent 1px), linear-gradient(90deg, var(--gray-dark) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}
.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  transform: scale(0.9);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.splash-content.loaded { transform: scale(1); opacity: 1; }
.splash-logo { width: 80px; height: 80px; object-fit: contain; border: 3px solid var(--white); }
.splash-name { font-family: var(--font-secondary); font-size: 2rem; font-weight: 800; letter-spacing: 0.3em; }
.splash-tagline { font-family: var(--font-secondary); font-size: 0.875rem; color: var(--gray); }
.splash-progress { width: 200px; height: 4px; background: var(--gray-dark); border-radius: 2px; overflow: hidden; }
.splash-bar { height: 100%; background: var(--yellow); transition: width 0.2s; }
.splash-percent { font-family: var(--font-secondary); font-size: 0.75rem; color: var(--gray); }
.splash-leave-to { opacity: 0; transform: scale(1.1); }

/* Nav */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  z-index: 100;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav.visible { opacity: 1; transform: translateY(0); }
.nav-left { display: flex; align-items: center; gap: 1rem; }
.nav-logo { width: 36px; height: 36px; }
.nav-name { font-family: var(--font-secondary); font-weight: 800; font-size: 0.875rem; letter-spacing: 0.25em; }
.nav-links { display: flex; gap: 2.5rem; }
.nav-link { font-family: var(--font-secondary); font-weight: 600; font-size: 0.875rem; color: var(--white); text-decoration: none; opacity: 0.6; transition: 0.3s; }
.nav-link:hover, .nav-link.active { opacity: 1; }
.nav-link::after { content: ''; position: absolute; bottom: -6px; left: 0; width: 100%; height: 2px; background: var(--yellow); transform: scaleX(0); transition: transform 0.4s; }
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}
.hero-shapes { position: absolute; inset: 0; pointer-events: none; opacity: 0.1; }
.shape { position: absolute; }
.s1 { width: 200px; height: 200px; top: 10%; right: 5%; border: 2px solid var(--yellow); border-radius: 50%; }
.s2 { width: 80px; height: 80px; bottom: 20%; left: 10%; background: var(--yellow); }
.s3 { width: 40px; height: 40px; top: 40%; right: 20%; border: 2px solid var(--white); }
.hero-content { display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 2; }
.hero-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 900; line-height: 1.05; margin-bottom: 1.5rem; }
.highlight { color: var(--yellow); }
.hero-subtitle { font-family: var(--font-secondary); font-size: 1.25rem; color: var(--gray); max-width: 480px; margin-bottom: 2.5rem; }
.hero-cta { display: flex; gap: 1.5rem; }
.btn { font-family: var(--font-secondary); font-weight: 700; padding: 1rem 2rem; border: 2px solid var(--white); text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; transition: 0.3s; cursor: pointer; }
.btn-primary { background: var(--white); color: var(--black); }
.btn-primary:hover { background: var(--yellow); border-color: var(--yellow); transform: translate(-4px, -4px); box-shadow: 6px 6px 0 var(--gray); }
.btn-secondary { background: transparent; color: var(--white); }
.btn-secondary:hover { background: var(--white); color: var(--black); }
.hero-marquee { margin-top: 4rem; padding: 1.5rem 0; background: var(--yellow); position: relative; overflow: hidden; transform: rotate(-2deg) scale(1.02); }
.hero-marquee::before, .hero-marquee::after { content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2; }
.hero-marquee::before { left: 0; background: linear-gradient(90deg, var(--yellow), transparent); }
.hero-marquee::after { right: 0; background: linear-gradient(270deg, var(--yellow), transparent); }
.marquee-track { display: flex; gap: 4rem; animation: marquee 15s linear infinite; white-space: nowrap; }
.hero-marquee:hover .marquee-track { animation-play-state: paused; }
.hero-marquee .marquee-track span { font-family: var(--font-secondary); font-size: 1rem; font-weight: 800; letter-spacing: 0.2em; color: var(--black); text-transform: uppercase; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* About */
.about { padding: 8rem 0; background: var(--black); position: relative; overflow: hidden; }
.about-decor { position: absolute; inset: 0; pointer-events: none; }
.ad-box { position: absolute; border: 2px solid var(--yellow); }
.ad-1 { width: 300px; height: 300px; top: -100px; right: -50px; border-radius: 50%; opacity: 0.05; }
.ad-2 { width: 150px; height: 150px; bottom: 20%; left: -30px; border-color: var(--white); opacity: 0.1; }
.ad-line { position: absolute; top: 30%; left: 0; width: 100%; height: 1px; background: var(--gray-dark); }
.section-badge { display: inline-flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.section-num { font-family: var(--font-secondary); font-size: 0.875rem; font-weight: 800; color: var(--yellow); }
.section-label { font-family: var(--font-secondary); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.5rem 1rem; background: var(--white); color: var(--black); }
.about-header { margin-bottom: 4rem; }
.about-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 900; line-height: 1; }
.about-title .word { display: inline-block; }
.about-title .highlight { color: var(--yellow); }
.about-title .dot { color: var(--yellow); }
.about-body { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
.stat-grid { display: flex; gap: 1rem; }
.stat-box { flex: 1; padding: 1.5rem; border: 2px solid var(--gray-dark); text-align: center; transition: 0.3s; }
.stat-box:hover { border-color: var(--yellow); transform: translateY(-4px); }
.stat-box .stat-num { display: block; font-size: 2rem; font-weight: 900; color: var(--yellow); }
.stat-box .stat-label { font-family: var(--font-secondary); font-size: 0.625rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.15em; }
.about-intro { margin-bottom: 2rem; }
.intro-label { display: inline-block; font-family: var(--font-secondary); font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--yellow); margin-bottom: 0.75rem; border-bottom: 1px solid var(--yellow); padding-bottom: 0.25rem; }
.about-intro h3 { font-family: var(--font-primary); font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; }
.about-intro p { font-family: var(--font-secondary); font-size: 1rem; line-height: 1.7; color: var(--gray); max-width: 500px; }
.skills-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skill-tag { font-family: var(--font-secondary); font-size: 0.875rem; font-weight: 600; padding: 0.75rem 1.25rem; border: 1px solid var(--gray-dark); transition: 0.3s; }
.skill-tag:hover { border-color: var(--yellow); color: var(--yellow); background: var(--black-light); }

/* Works */
.works { padding: 8rem 0; background: var(--black-light); position: relative; overflow: hidden; }
.works-marquee { position: absolute; top: 0; left: 0; right: 0; padding: 0.75rem 0; background: var(--black); border-top: 1px solid var(--gray-dark); z-index: 0; }
.works-marquee .marquee-item { color: var(--gray); }
.works-marquee .marquee-item span { color: var(--yellow); }
.works-header { margin-bottom: 4rem; }
.works-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; }
.works-list { display: flex; flex-direction: column; gap: 1.5rem; }
.work-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 2rem; align-items: center; padding: 2rem; border: 1px solid var(--gray-dark); background: var(--black); transition: 0.3s; cursor: pointer; }
.work-item:hover { border-color: var(--yellow); }
.work-num { font-size: 2rem; font-weight: 900; color: var(--gray-dark); }
.work-meta { display: flex; gap: 1.5rem; font-family: var(--font-secondary); font-size: 0.75rem; color: var(--gray); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.5rem; }
.work-item h3 { font-family: var(--font-secondary); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
.work-item p { font-family: var(--font-secondary); font-size: 1rem; color: var(--gray); margin-bottom: 1rem; }
.work-impact { font-family: var(--font-secondary); font-size: 0.875rem; font-weight: 600; color: var(--yellow); }
.work-arrow { font-size: 1.5rem; opacity: 0.5; }

/* Journal */
.journal { padding: 8rem 0; background: var(--black); position: relative; overflow: hidden; }
.journal-bg { position: absolute; inset: 0; pointer-events: none; }
.jb-line { position: absolute; background: var(--gray-dark); }
.jl-1 { top: 20%; left: 0; width: 100%; height: 1px; }
.jl-2 { bottom: 30%; right: 0; width: 50%; height: 1px; }
.jb-dot { position: absolute; top: 40%; left: 10%; width: 20px; height: 20px; background: var(--yellow); border-radius: 50%; opacity: 0.1; }
.journal-header { margin-bottom: 4rem; }
.journal-title { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 900; }
.journal-grid { display: flex; flex-direction: column; gap: 1.5rem; }
.journal-card { display: grid; grid-template-columns: 80px 1fr auto; gap: 2rem; align-items: center; padding: 2rem; border: 1px solid var(--gray-dark); background: var(--black); position: relative; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.journal-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--yellow); transform: scaleY(0); transition: transform 0.4s; }
.journal-card:hover { border-color: var(--yellow); background: var(--black-light); transform: translateX(8px); }
.journal-card:hover::before { transform: scaleY(1); }
.card-num { font-family: var(--font-primary); font-size: 2rem; font-weight: 900; color: var(--gray-dark); transition: 0.3s; }
.journal-card:hover .card-num { color: var(--yellow); }
.card-content { display: flex; flex-direction: column; gap: 0.5rem; }
.card-cat { font-family: var(--font-secondary); font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--yellow); }
.journal-card h3 { font-family: var(--font-secondary); font-size: 1.25rem; font-weight: 700; line-height: 1.4; transition: 0.3s; }
.journal-card:hover h3 { color: var(--yellow); }
.card-date { font-family: var(--font-secondary); font-size: 0.875rem; color: var(--gray); }
.card-action { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--gray-dark); transition: 0.3s; }
.card-action .arrow { font-size: 1.25rem; color: var(--white); transition: 0.3s; }
.journal-card:hover .card-action { border-color: var(--yellow); background: var(--yellow); }
.journal-card:hover .card-action .arrow { color: var(--black); transform: translateX(4px); }

/* Contact */
.contact { padding: 8rem 0; background: var(--black); position: relative; overflow: hidden; }
.contact-shapes { position: absolute; inset: 0; pointer-events: none; }
.cs { position: absolute; }
.cs-1 { width: 400px; height: 400px; top: -150px; right: -100px; background: var(--yellow); transform: rotate(-15deg); opacity: 0.08; }
.cs-2 { width: 200px; height: 200px; bottom: 10%; left: 5%; border: 3px solid var(--white); opacity: 0.1; transform: rotate(30deg); }
.contact-header { margin-bottom: 2rem; }
.contact-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 900; line-height: 1.1; }
.contact-text { font-family: var(--font-secondary); font-size: 1.5rem; color: var(--gray); margin-bottom: 2rem; }
.contact-email { display: inline-flex; align-items: center; gap: 1rem; font-family: var(--font-primary); font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; color: var(--white); text-decoration: none; cursor: pointer; transition: 0.3s; }
.contact-email:hover { color: var(--yellow); }
.contact-email span { transition: 0.3s; }
.contact-email:hover span { transform: translateX(8px); }
.social-links { display: flex; gap: 1rem; margin-top: 3rem; }
.social-link { padding: 1rem 1.5rem; border: 1px solid var(--gray-dark); font-family: var(--font-secondary); font-weight: 600; text-decoration: none; color: var(--white); transition: 0.3s; }
.social-link:hover { border-color: var(--yellow); background: var(--black-light); }

/* Footer */
.footer { padding: 4rem 0; background: var(--black); border-top: 1px solid var(--gray-dark); text-align: center; }
.footer-brand { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem; }
.footer-logo { width: 40px; height: 40px; }
.footer-brand span { font-family: var(--font-secondary); font-size: 1.25rem; font-weight: 800; letter-spacing: 0.2em; }
.footer-copy { font-family: var(--font-secondary); font-size: 0.75rem; color: var(--gray); }

/* Responsive */
@media (max-width: 1024px) {
  .about-body { grid-template-columns: 1fr; gap: 2rem; }
  .stat-grid { margin-bottom: 2rem; }
  .work-item { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero-cta { flex-direction: column; }
  .journal-card { grid-template-columns: 60px 1fr auto; gap: 1.5rem; padding: 1.5rem; }
  .social-links { flex-direction: column; }
}
</style>