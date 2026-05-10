<template>
  <div class="minimal-page" :class="{ 'reduce-motion': reduceMotion }">
    <!-- Header -->
    <header class="header">
      <div class="header__inner">
        <NuxtLink to="/minimal" class="logo">
          <img src="/logo-alfathony.png" alt="Alfathony" class="logo__img" />
        </NuxtLink>
        
        <nav class="nav">
          <a href="#work" class="nav__link">Work</a>
          <a href="#about" class="nav__link">About</a>
          <a href="#contact" class="nav__link">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" @mousemove="handleHeroMouseMove" ref="heroSection">
      <div class="hero__bg">
        <svg 
          class="hero__wave" 
          viewBox="0 0 1920 1080" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          :style="{ '--mx': mousePos.x + '%', '--my': mousePos.y + '%' }"
        >
          <!-- Wave Line 1 -->
          <path 
            class="wave-line wave-animate-1" 
            d="M0 360 C 320 340, 640 380, 960 360 S 1600 340, 1920 360" 
            stroke="currentColor" 
            stroke-width="2" 
            fill="none" 
            opacity="0.35"
          />
          
          <!-- Wave Line 2 -->
          <path 
            class="wave-line wave-animate-2" 
            d="M0 420 C 320 400, 640 440, 960 420 S 1600 400, 1920 420" 
            stroke="currentColor" 
            stroke-width="1.8" 
            fill="none" 
            opacity="0.28"
          />
          
          <!-- Wave Line 3 -->
          <path 
            class="wave-line wave-animate-3" 
            d="M0 480 C 320 460, 640 500, 960 480 S 1600 460, 1920 480" 
            stroke="currentColor" 
            stroke-width="1.6" 
            fill="none" 
            opacity="0.22"
          />
          
          <!-- Wave Line 4 -->
          <path 
            class="wave-line wave-animate-4" 
            d="M0 540 C 320 520, 640 560, 960 540 S 1600 520, 1920 540" 
            stroke="currentColor" 
            stroke-width="1.4" 
            fill="none" 
            opacity="0.18"
          />
          
          <!-- Wave Line 5 -->
          <path 
            class="wave-line wave-animate-5" 
            d="M0 600 C 320 580, 640 620, 960 600 S 1600 580, 1920 600" 
            stroke="currentColor" 
            stroke-width="1.2" 
            fill="none" 
            opacity="0.14"
          />
          
          <!-- Wave Line 6 -->
          <path 
            class="wave-line wave-animate-6" 
            d="M0 660 C 320 640, 640 680, 960 660 S 1600 640, 1920 660" 
            stroke="currentColor" 
            stroke-width="1" 
            fill="none" 
            opacity="0.1"
          />
          
          <!-- Wave Line 7 -->
          <path 
            class="wave-line wave-animate-7" 
            d="M0 720 C 320 700, 640 740, 960 720 S 1600 700, 1920 720" 
            stroke="currentColor" 
            stroke-width="1" 
            fill="none" 
            opacity="0.06"
          />
        </svg>
      </div>
      
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__word">Alfathony</span>
        </h1>
        <p class="hero__subtitle">
          <span class="hero__word">UI/UX Designer</span>
          <span class="hero__divider">•</span>
          <span class="hero__word">Jakarta</span>
        </p>
      </div>
      
      <div class="scroll-indicator">
        <span class="scroll-indicator__text">Scroll</span>
        <div class="scroll-indicator__line"></div>
      </div>
    </section>

    <!-- Work / Projects -->
    <section id="work" class="projects">
      <div class="container">
        <h2 class="section-title">Selected Work</h2>
        
        <div class="projects__grid">
          <article 
            v-for="(project, index) in projects" 
            :key="index"
            class="project-card"
          >
            <div class="project-card__image-wrap">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="project-card__image"
                loading="lazy"
              />
              <div class="project-card__overlay">
                <span class="project-card__category">{{ project.category }}</span>
              </div>
            </div>
            <div class="project-card__info">
              <h3 class="project-card__title">{{ project.title }}</h3>
              <p class="project-card__desc">{{ project.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">About</h2>
        <div class="about__content">
          <h3 class="about__heading">Designer, thinker, and builder of digital experiences.</h3>
          <p class="about__text">
            I'm Alfathony — a UI/UX Designer based in Jakarta with a passion for creating 
            digital products that are both beautiful and functional. With 8+ years of experience, 
            I've worked with startups and enterprises to transform their digital presence.
          </p>
          <p class="about__text">
            My approach combines strategic thinking with hands-on design, ensuring every 
            pixel serves a purpose and every interaction tells a story.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title">Get in Touch</h2>
        <div class="contact__content">
          <p class="contact__text">
            Have a project in mind? Let's create something amazing together.
          </p>
          <a href="mailto:hello@alfathony.com" class="contact__email">
            hello@alfathony.com
          </a>
          
          <div class="contact__socials">
            <a href="#" class="social-link" target="_blank" rel="noopener">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zm4.615 8.462h-2.154v5.077h-1.077V10.54h-2.154v-1.077h2.154V6.36h1.077v3.103h2.154v1.077z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href="#" class="social-link" target="_blank" rel="noopener">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="#" class="social-link" target="_blank" rel="noopener">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p class="footer__text">© {{ new Date().getFullYear() }} Alfathony. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const reduceMotion = ref(false)
const heroSection = ref(null)
const mousePos = ref({ x: 50, y: 50 })

const handleHeroMouseMove = (e) => {
  if (!heroSection.value) return
  const rect = heroSection.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  mousePos.value = { x, y }
}

const projects = ref([
  {
    title: 'Fintech Dashboard',
    category: 'UI/UX Design',
    description: 'Modern banking experience for digital natives',
    image: 'https://images.unsplash.com/photo-1460925895918-826b8b5202a2?w=800&q=80'
  },
  {
    title: 'E-commerce App',
    category: 'Product Design',
    description: 'Seamless shopping experience mobile platform',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
  },
  {
    title: 'Healthcare Platform',
    category: 'UX Research',
    description: 'Patient-first digital health solutions',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  },
  {
    title: 'Design System',
    category: 'UI Systems',
    description: 'Scalable component library for enterprise',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80'
  },
  {
    title: 'SaaS Landing',
    category: 'Web Design',
    description: 'Conversion-focused landing page design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80'
  },
  {
    title: 'Team Collaboration',
    category: 'Product Design',
    description: 'Remote team productivity tool',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
  }
])

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mediaQuery.matches
  
  mediaQuery.addEventListener('change', (e) => {
    reduceMotion.value = e.matches
  })

  setTimeout(() => {
    initScrollAnimations()
  }, 100)
})

function initScrollAnimations() {
  if (reduceMotion.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.project-card, .about__content, .about__heading, .contact__content').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.1}s`)
    observer.observe(el)
  })
}
</script>

<style scoped>
.minimal-page {
  --bg: #FAFAFA;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --accent: #F5D547;
  --font-heading: 'Archivo', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  min-height: 100vh;
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-secondary);
  margin-bottom: 48px;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 24px;
  background: rgba(250, 250, 250, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo__img {
  height: 32px;
  width: auto;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav__link {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  transition: color 0.3s var(--ease-out);
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s var(--ease-out);
}

.nav__link:hover {
  color: var(--text-primary);
}

.nav__link:hover::after {
  width: 100%;
}

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 24px;
  position: relative;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.12;
}

.hero__wave {
  width: 100%;
  height: 100%;
  color: var(--text-primary);
  transform: translate(calc((50 - var(--mx)) * 0.04), calc((50 - var(--my)) * 0.04));
  transition: transform 0.3s var(--ease-out);
}

.wave-line {
  animation: waveMove 8s ease-in-out infinite;
}

.wave-animate-1 { animation-delay: 0s; }
.wave-animate-2 { animation-delay: 0.5s; }
.wave-animate-3 { animation-delay: 1s; }
.wave-animate-4 { animation-delay: 1.5s; }
.wave-animate-5 { animation-delay: 2s; }
.wave-animate-6 { animation-delay: 2.5s; }
.wave-animate-7 { animation-delay: 3s; }

@keyframes waveMove {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}

.hero__content {
  text-align: center;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  overflow: hidden;
}

.hero__word {
  display: inline-block;
  animation: heroReveal 0.8s var(--ease-out) forwards;
  opacity: 0;
  transform: translateY(40px);
}

.hero__title .hero__word {
  animation-delay: 0.1s;
}

.hero__subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: clamp(18px, 3vw, 24px);
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.hero__subtitle .hero__word {
  animation-delay: 0.3s;
}

.hero__divider {
  font-size: 12px;
  color: var(--accent);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.scroll-indicator__text {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.scroll-indicator__line {
  width: 1px;
  height: 40px;
  background: var(--text-secondary);
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes heroReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollBounce {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.5; }
}

/* Projects */
.projects {
  padding: 120px 0;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.project-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.project-card__image-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f0f0f0;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.project-card:hover .project-card__image {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.3s var(--ease-out);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
  transform: translateY(0);
}

.project-card__category {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;
  background: var(--text-primary);
  padding: 6px 12px;
}

.project-card__info {
  padding: 16px 0;
}

.project-card__title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.3s var(--ease-out);
}

.project-card:hover .project-card__title {
  color: var(--accent);
}

.project-card__desc {
  font-size: 14px;
  color: var(--text-secondary);
}

/* About */
.about {
  padding: 120px 0;
}

.about__content {
  max-width: 640px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s var(--ease-out);
}

.about__content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.about__text {
  font-size: clamp(18px, 2.5vw, 22px);
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 640px;
}

.about__text:last-child {
  margin-bottom: 0;
}

.about__heading {
  font-family: var(--font-heading);
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 32px;
}

/* Contact */
.contact {
  padding: 120px 0;
}

.contact__content {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s var(--ease-out);
}

.contact__content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.contact__text {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.contact__email {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  position: relative;
  transition: color 0.3s var(--ease-out);
}

.contact__email::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.contact__email:hover {
  color: var(--text-primary);
}

.contact__email:hover::after {
  transform: scaleX(1);
}

.contact__socials {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s var(--ease-out);
}

.social-link:hover {
  color: var(--text-primary);
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Footer */
.footer {
  padding: 32px 0;
  border-top: 1px solid #e5e5e5;
}

.footer__text {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .header {
    padding: 16px 20px;
  }
  
  .logo__img {
    height: 24px;
  }
  
  .nav {
    gap: 20px;
  }
  
  .nav__link {
    font-size: 13px;
  }
  
  .projects__grid {
    grid-template-columns: 1fr;
  }
  
  .hero {
    padding: 100px 20px;
  }
  
  .scroll-indicator {
    display: none;
  }
}

/* Reduced Motion */
.reduce-motion .hero__word,
.reduce-motion .project-card,
.reduce-motion .about__content,
.reduce-motion .contact__content {
  opacity: 1;
  transform: none;
  animation: none;
}

.reduce-motion .scroll-indicator__line {
  animation: none;
}

.reduce-motion .project-card__image,
.reduce-motion .project-card__title,
.reduce-motion .contact__email::after {
  transition: none;
}
</style>