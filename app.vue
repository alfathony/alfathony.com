<template>
  <div class="portfolio">
    <ClientOnly>
      <CustomCursor />
    </ClientOnly>
    
    <!-- Splash Screen -->
    <div v-if="showSplash" class="splash-screen" :class="{ hidden: splashHidden }">
      <div class="splash-content">
        <img src="/logo-alfathony.png" alt="Alfathony" class="splash-logo" />
        <div class="splash-line"></div>
      </div>
    </div>
    
    <!-- Hero Section -->
    <section id="home" class="hero" ref="heroSection" @mousemove="onHeroMouseMove" @mouseenter="onHeroEnter" @mouseleave="onHeroLeave">
      <canvas ref="mouseCanvas" class="mouse-canvas"></canvas>
      
      <div class="hero-grain"></div>
      
      <div class="hero-orb orb-1" :style="{ '--mx': orbitalMouse.x + '%', '--my': orbitalMouse.y + '%' }"></div>
      <div class="hero-orb orb-2" :style="{ '--mx': orbitalMouse.x + '%', '--my': orbitalMouse.y + '%' }"></div>
      <div class="hero-orb orb-3" :style="{ '--mx': orbitalMouse.x + '%', '--my': orbitalMouse.y + '%' }"></div>
      
      <div class="hero-curtain">
        <div class="curtain-left" :style="{ '--ty': isHovering ? '-100%' : '0%' }"></div>
        <div class="curtain-right" :style="{ '--ty': isHovering ? '100%' : '0%' }"></div>
      </div>
      
      <div class="hero-content" ref="heroContent">
        <div class="hero-label">Jakarta-based</div>
        
        <h1 class="hero-title" ref="heroTitle">
          <span class="title-line">
            The best of humans are those who 
            <span 
              class="highlight" 
              @mouseenter="distortOn" 
              @mouseleave="distortOff"
              ref="othersWord"
            >bring value</span>
          </span>
          <span class="title-line">to others.</span>
        </h1>
        
        <p class="hero-subtitle" ref="heroSubtitle">
          <span class="subtitle-word">human.</span>
          <span class="subtitle-divider">•</span>
          <span class="subtitle-word">designer.</span>
          <span class="subtitle-divider">•</span>
          <span class="subtitle-word">creator.</span>
        </p>
        
        <div class="hero-actions" ref="heroActions">
          <a href="#work" class="hero-btn hero-btn-primary" data-cursor="Explore">
            View Work
          </a>
          <a href="mailto:hello@alfathony.com" class="hero-btn hero-btn-secondary" data-cursor="Say Hi">
            Say Hello
          </a>
        </div>
        
        <div class="hero-meta">
          <div class="meta-stat">
            <span class="meta-number">8+</span>
            <span class="meta-label">Years Experience</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-stat">
            <span class="meta-number">50+</span>
            <span class="meta-label">Projects</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-stat">
            <span class="meta-number">20+</span>
            <span class="meta-label">Happy Clients</span>
          </div>
        </div>
      </div>
      
      <div class="hero-scroll-indicator">
        <span class="scroll-label">Scroll to explore</span>
        <div class="scroll-line">
          <div class="scroll-dot"></div>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section id="about" class="intro">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-image" data-cursor="Look">
            <div class="image-placeholder">
              <span class="image-text">Alfathony</span>
            </div>
          </div>
          <div class="intro-content">
            <h2 class="intro-title">Hi, I'm Alfathony.</h2>
            <div class="intro-text">
              <p>A UI/UX Designer based in Jakarta.</p>
              <p>I design digital products that focus on clarity, empathy, and usefulness.</p>
              <p>I enjoy turning complex problems into simple experiences — while keeping things human.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beyond Design Section -->
    <section id="about" class="beyond">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Beyond Design</h2>
          <p class="section-subtitle">Design isn't just something I do at work — it's how I observe the world.</p>
        </div>
        
        <div class="cards-grid">
          <div 
            v-for="(card, index) in beyondCards" 
            :key="index" 
            class="card"
            :data-cursor="'View'"
          >
            <div class="card-icon">{{ card.icon }}</div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-micro">{{ card.microcopy }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Side Projects Section -->
    <section class="side-projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Side Projects</h2>
          <p class="section-subtitle">Little experiments I built for fun — and maybe for you too.</p>
        </div>
        
        <div class="carousel-wrapper">
          <button class="carousel-nav carousel-prev" @click="scrollCarousel(-1)" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <div class="carousel" ref="carouselRef" @wheel="onCarouselWheel">
            <div 
              v-for="(app, index) in sideProjects" 
              :key="index" 
              class="app-card"
              :data-cursor="'Open'"
              :style="{ '--app-color': app.color }"
            >
              <div class="app-icon">
                <span>{{ app.icon }}</span>
              </div>
              <div class="app-glow"></div>
              <div class="app-info">
                <h3 class="app-name">{{ app.name }}</h3>
                <p class="app-desc">{{ app.desc }}</p>
              </div>
              <a :href="app.url" class="app-cta" target="_blank" rel="noopener">
                <span>Get</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </div>
          
          <button class="carousel-nav carousel-next" @click="scrollCarousel(1)" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <div class="carousel-indicators">
          <button 
            v-for="(_, index) in sideProjects.length" 
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section id="work" class="selected" data-theme="dark">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Featured Work</span>
          <h2 class="section-title">Selected Projects</h2>
          <p class="section-subtitle">Strategic design solutions that drive measurable business outcomes.</p>
        </div>
        
        <div class="projects-showcase">
          <div 
            v-for="(project, index) in selectedProjects" 
            :key="index" 
            class="project-card"
            :data-cursor="'View'"
            :style="{ '--accent': project.color }"
          >
            <div class="project-frame">
              <div class="frame-browser">
                <span class="frame-dot"></span>
                <span class="frame-dot"></span>
                <span class="frame-dot"></span>
              </div>
              <div class="project-screen" :style="{ '--bg': project.bg }">
                <div class="screen-content">
                  <span class="screen-icon">{{ project.icon }}</span>
                </div>
                <div class="screen-overlay"></div>
              </div>
            </div>
            
            <div class="project-overlay">
              <div class="overlay-content">
                <span class="overlay-number">0{{ index + 1 }}</span>
                <h3 class="overlay-title">{{ project.name }}</h3>
              </div>
            </div>
            
            <div class="project-details">
              <div class="details-main">
                <div class="details-header">
                  <span class="details-category">{{ project.category }}</span>
                  <span class="details-year">{{ project.year }}</span>
                </div>
                
                <h3 class="project-name">{{ project.name }}</h3>
                <p class="project-desc">{{ project.desc }}</p>
                
                <div class="project-impact">
                  <span class="impact-label">Impact</span>
                  <div class="impact-list">
                    <div v-for="impact in project.impacts" :key="impact.label" class="impact-item">
                      <span class="impact-value">{{ impact.value }}</span>
                      <span class="impact-label-text">{{ impact.label }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
                </div>
              </div>
              
              <div class="details-action">
                <span class="action-text">View Case Study</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </div>
            </div>
            
            <div class="project-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Journal Section -->
    <section id="journal" class="journal">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Journal</h2>
          <p class="section-subtitle">Thoughts on design, technology, and everything in between.</p>
        </div>
        
        <div class="journal-list">
          <article 
            v-for="(article, index) in journal" 
            :key="index" 
            class="journal-card"
            :data-cursor="'Read'"
          >
            <div class="card-content">
              <span class="card-number">0{{ index + 1 }}</span>
              <div class="card-main">
                <span class="card-category">{{ article.category }}</span>
                <h3 class="card-title">{{ article.title }}</h3>
                <p class="card-excerpt">{{ article.excerpt }}</p>
              </div>
              <div class="card-meta">
                <span class="card-date">{{ article.date }}</span>
                <span class="card-divider">·</span>
                <span class="card-read">{{ article.readTime }}</span>
              </div>
            </div>
            <div class="card-action">
              <div class="card-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">Testimonials</h2>
        
        <div class="testimonials-grid">
          <div 
            v-for="(quote, index) in testimonials" 
            :key="index" 
            class="testimonial-card"
          >
            <p class="testimonial-text">"{{ quote.text }}"</p>
            <p class="testimonial-author">— {{ quote.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section id="contact" class="final-cta">
      <div class="container">
        <p class="cta-text">
          If my work — or my personality — resonates with you,<br>
          let's build something meaningful.
        </p>
        <a href="mailto:hello@alfathony.com" class="cta-button" data-cursor="Let's talk">
          Let's talk
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="footer-main">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <img src="/logo-alfathony.png" alt="Alfathony" class="footer-logo" />
              <p class="footer-tagline">Designing experiences that matter.</p>
              <div class="footer-social">
                <a href="https://linkedin.com/in/alfathony" target="_blank" class="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.104 10.088H3.555V9h2.886v8.521zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0h.003z"/></svg>
                </a>
                <a href="https://dribbble.com/alfathony" target="_blank" class="social-link" aria-label="Dribbble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-1.173-3.117-2.517-5.304-2.105-2.313.435-3.645 2.181-4.24 3.22 2.62.544 4.618 1.513 5.99 3.02.93-1.438 2.29-2.663 3.554-4.135zM12 2.588c1.821 0 3.41.663 4.667 1.728-1.29 1.69-2.885 2.732-4.667 3.34-1.782-.608-3.378-1.65-4.668-3.34 1.258-1.065 2.846-1.728 4.668-1.728zm-4.59 4.153c1.59.768 3.227 1.52 4.59 2.17-.65 1.8-1.583 3.443-2.778 4.825-1.34-1.016-2.612-1.93-3.77-2.93-.16.71-.27 1.43-.33 2.152-2.413-.473-4.227-1.35-4.84-2.05 1.733-1.05 4.73-1.76 7.228-2.167zm-3.92 8.255c.67.74 1.488 1.402 2.427 1.977-1.063 1.512-1.698 3.08-1.967 4.598-2.58 1.06-5.686 1.64-5.686 1.64s2.77-1.31 5.226-3.215zM6.49 12.252c.38-.88.92-1.72 1.62-2.49 1.37.928 2.93 1.68 4.49 2.19V12.2c-.36-.38-.63-.82-.84-1.32-.3-.73-.5-1.52-.5-2.38 0-2.1 1.13-3.93 2.83-5.1-1.17-.06-2.27-.11-2.97-.11-3.65 0-5.84 1.89-5.84 5.08 0 .76.16 1.5.48 2.22-.16.25-.27.52-.34.8-.32 1.08-.49 2.27-.49 3.52 0 .08.002.16.004.24l-.22.22z"/></svg>
                </a>
                <a href="https://github.com/alfathony" target="_blank" class="social-link" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.797 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.983-.4 3.003-.404 1.02.004 2.043.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.09 24 18.597 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>
            </div>
            
            <div class="footer-links">
              <div class="footer-col">
                <h4>Menu</h4>
                <a href="#about" @click.prevent="scrollToSection('about')">About</a>
                <a href="#work" @click.prevent="scrollToSection('work')">Work</a>
                <a href="#journal" @click.prevent="scrollToSection('journal')">Journal</a>
              </div>
              <div class="footer-col">
                <h4>Contact</h4>
                <a href="mailto:hello@alfathony.com">hello@alfathony.com</a>
                <a href="https://wa.me/6281234567890" target="_blank">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <p>© 2026 Alfathony. Crafted with care.</p>
        </div>
      </div>
    </footer>

    <!-- Navigation Menu -->
    <nav class="nav-menu" :class="{ visible: showNav }">
      <a href="#home" class="nav-logo" @click.prevent="scrollToSection('home')">
        <img src="/logo-alfathony.png" alt="Alfathony" />
      </a>
      
      <div class="nav-items">
        <a 
          v-for="item in navItems" 
          :key="item.id"
          :href="'#' + item.id"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.label }}
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroCanvas = ref(null)
const mouseCanvas = ref(null)
const othersWord = ref(null)
const floatingContainer = ref(null)
const heroContent = ref(null)
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroActions = ref(null)
const mousePos = ref({ x: 0, y: 0 })
const orbitalMouse = ref({ x: 50, y: 50 })
const isHovering = ref(false)
const isIn = ref(false)
const carouselRef = ref(null)
const currentSlide = ref(0)

const designNodes = ref([
  { x: 15, y: 20, connected: true },
  { x: 25, y: 45, connected: false },
  { x: 40, y: 30, connected: true },
  { x: 55, y: 60, connected: false },
  { x: 70, y: 25, connected: true },
  { x: 80, y: 50, connected: false },
  { x: 90, y: 35, connected: true }
])

const designLines = computed(() => [
  { x1: 15, y1: 20, x2: 40, y2: 30 },
  { x1: 40, y1: 30, x2: 70, y2: 25 },
  { x1: 70, y1: 25, x2: 90, y2: 35 },
  { x1: 25, y1: 45, x2: 40, y2: 30 },
  { x1: 40, y1: 30, x2: 55, y2: 60 }
])

let animationId = null
let canvasCtx = null
let dots = []

const initCanvas = () => {
  if (!mouseCanvas.value) return
  
  const canvas = mouseCanvas.value
  const rect = canvas.parentElement.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  
  canvasCtx = canvas.getContext('2d')
  
  dots = []
  const spacing = 60
  for (let x = 0; x < rect.width; x += spacing) {
    for (let y = 0; y < rect.height; y += spacing) {
      dots.push({
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0
      })
    }
  }
  
  animateCanvas()
}

const animateCanvas = () => {
  if (!canvasCtx) return
  
  const canvas = mouseCanvas.value
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
  
  const mouse = {
    x: (orbitalMouse.value.x / 100) * canvas.width,
    y: (orbitalMouse.value.y / 100) * canvas.height
  }
  
  dots.forEach(dot => {
    const dx = mouse.x - dot.x
    const dy = mouse.y - dot.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 150
    
    if (dist < maxDist) {
      const force = (maxDist - dist) / maxDist
      const angle = Math.atan2(dy, dx)
      dot.vx = -Math.cos(angle) * force * 3
      dot.vy = -Math.sin(angle) * force * 3
    }
    
    dot.vx *= 0.9
    dot.vy *= 0.9
    dot.x += dot.vx
    dot.y += dot.vy
    
    dot.x += (dot.baseX - dot.x) * 0.05
    dot.y += (dot.baseY - dot.y) * 0.05
    
    const currentDist = Math.sqrt(dx * dx + dy * dy)
    const opacity = currentDist < maxDist ? (1 - currentDist / maxDist) * 0.6 : 0.1
    
    canvasCtx.beginPath()
    canvasCtx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
    canvasCtx.fillStyle = `rgba(245, 213, 71, ${opacity})`
    canvasCtx.fill()
  })
  
  animationId = requestAnimationFrame(animateCanvas)
}

const onHeroMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  mousePos.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100
  }
  orbitalMouse.value = { ...mousePos.value }
}

const onHeroEnter = () => {
  isIn.value = true
  isHovering.value = true
}

const onHeroLeave = () => {
  isIn.value = false
  setTimeout(() => {
    if (!isIn.value) isHovering.value = false
  }, 300)
  orbitalMouse.value = { x: 50, y: 50 }
}

const scrollCarousel = (direction) => {
  if (!carouselRef.value) return
  const cardWidth = 260 + 24
  const maxSlide = sideProjects.length - 1
  
  currentSlide.value = Math.max(0, Math.min(maxSlide, currentSlide.value + direction))
  
  const scrollTo = currentSlide.value * cardWidth
  carouselRef.value.scrollTo({ left: scrollTo, behavior: 'smooth' })
}

const goToSlide = (index) => {
  if (!carouselRef.value) return
  const cardWidth = 260 + 24
  currentSlide.value = index
  const scrollTo = index * cardWidth
  carouselRef.value.scrollTo({ left: scrollTo, behavior: 'smooth' })
}

const onCarouselWheel = (e) => {
  if (!carouselRef.value) return
  const rect = carouselRef.value.getBoundingClientRect()
  if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
    e.preventDefault()
    if (e.deltaY > 5) scrollCarousel(1)
    else if (e.deltaY < -5) scrollCarousel(-1)
  }
}

const beyondCards = [
  { icon: '🎵', title: 'Music', microcopy: 'Usually ends at 2 AM' },
  { icon: '📷', title: 'Travel', microcopy: 'Always with a camera' },
  { icon: '⛳', title: 'Golf', microcopy: 'Still chasing par' }
]

const sideProjects = [
  { 
    name: 'Prayer Time', 
    desc: 'Daily prayer times with smart notifications',
    icon: '🕌',
    color: '#F5D547',
    url: '#'
  },
  { 
    name: 'Weather Hub', 
    desc: 'Real-time weather with 7-day forecast',
    icon: '🌤️',
    color: '#64B5F6',
    url: '#'
  },
  { 
    name: 'Tax ID', 
    desc: 'Indonesian tax calculation made simple',
    icon: '🧮',
    color: '#81C784',
    url: '#'
  },
  { 
    name: 'YT Saver', 
    desc: 'Download videos in multiple formats',
    icon: '⬇️',
    color: '#FF8A65',
    url: '#'
  },
  { 
    name: 'Habit Tracker', 
    desc: 'Build better habits, one day at a time',
    icon: '✅',
    color: '#BA68C8',
    url: '#'
  },
  { 
    name: 'Focus Timer', 
    desc: 'Pomodoro technique made beautiful',
    icon: '🍅',
    color: '#EF5350',
    url: '#'
  },
  { 
    name: 'Quote Day', 
    desc: 'Daily inspiration in your pocket',
    icon: '💬',
    color: '#4DD0E1',
    url: '#'
  },
  { 
    name: 'BudgetWise', 
    desc: 'Simple expense tracker for everyone',
    icon: '💰',
    color: '#FFB74D',
    url: '#'
  }
]

const selectedProjects = [
  { 
    name: 'FiqApp Digital Wallet', 
    category: 'Fintech Mobile',
    year: '2024',
    desc: 'End-to-end mobile app redesign for Indonesia\'s fastest-growing digital wallet. Reimagined the entire transaction flow from onboarding to checkout.',
    tags: ['UX Research', 'Mobile Design', 'Prototyping'],
    icon: '💳',
    color: '#F5D547',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    impacts: [
      { value: '+34%', label: 'Transaction Success Rate' },
      { value: '2.1M', label: 'Monthly Active Users' },
      { value: '4.8★', label: 'App Store Rating' }
    ]
  },
  { 
    name: 'TradeFlow B2B Platform', 
    category: 'SaaS Web',
    year: '2024',
    desc: 'Strategic redesign of a B2B marketplace serving 50K+ suppliers and buyers across Southeast Asia. Focused on trust signals and streamlined procurement.',
    tags: ['Web Design', 'Conversion', 'Brand Identity'],
    icon: '🏢',
    color: '#64B5F6',
    bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)',
    impacts: [
      { value: '+52%', label: 'Lead Conversion' },
      { value: '$12M', label: 'Monthly GMV' },
      { value: '68%', label: 'Time-to-First-Action' }
    ]
  },
  { 
    name: 'ServeEase Marketplace', 
    category: 'Service Platform',
    year: '2023',
    desc: 'Full-product design for on-demand household services. Created trust-first experiences for booking cleaners, technicians, and helpers.',
    tags: ['Product Design', 'UX Strategy', 'Design System'],
    icon: '🏠',
    color: '#81C784',
    bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    impacts: [
      { value: '85%', label: 'Booking Completion' },
      { value: '12K+', label: 'Service Providers' },
      { value: '4.9★', label: 'User Satisfaction' }
    ]
  },
  { 
    name: 'OpsCenter Dashboard', 
    category: 'Enterprise Tool',
    year: '2023',
    desc: 'Internal operations dashboard for managing 10K+ daily transactions. Reduced support tickets by 40% through intuitive workflows and smart alerts.',
    tags: ['Dashboard', 'Enterprise UX', 'Data Viz'],
    icon: '📊',
    color: '#FF8A65',
    bg: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    impacts: [
      { value: '-40%', label: 'Support Tickets' },
      { value: '10K+', label: 'Daily Transactions' },
      { value: '3s', label: 'Avg. Task Time' }
    ]
  }
]

const journal = [
  { 
    title: 'Why Good UX Starts with Empathy', 
    date: '2024',
    readTime: '5 min read',
    excerpt: 'Empathy is not just a buzzword — it\'s the foundation of every great product.',
    category: 'UX Design'
  },
  { 
    title: 'Designing with Humor in a Serious Industry', 
    date: '2024',
    readTime: '4 min read',
    excerpt: 'How a little laughter can make big impacts on user engagement.',
    category: 'Design Thinking'
  },
  { 
    title: 'From Drumsticks to Design Systems', 
    date: '2023',
    readTime: '6 min read',
    excerpt: 'My journey from music to design — finding rhythm in pixels.',
    category: 'My Story'
  }
]

const testimonials = [
  { text: 'Incredibly useful. He always finds the solution before we even know there\'s a problem.', author: 'Collaborator' },
  { text: 'Fun to work with. His positive energy makes every project feel lighter.', author: 'Team Member' },
  { text: 'Thoughtful in every detail. He considers things we\'d never even think of.', author: 'Client' },
  { text: 'Sometimes funny, always reliable. That\'s rare.', author: 'Friend' }
]

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' }
]

const showNav = ref(false)
const activeSection = ref('home')
const splashHidden = ref(false)
const showSplash = ref(false)

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

const updateActiveSection = () => {
  const sections = ['home', 'about', 'work', 'journal', 'contact']
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 200 && rect.bottom >= 200) {
        activeSection.value = id
        break
      }
    }
  }
}

const distortOn = (e) => {
  e.target.style.filter = 'url(#distort)'
}

const distortOff = (e) => {
  e.target.style.filter = 'none'
}

onMounted(() => {
  const hasVisited = typeof window !== 'undefined' && localStorage.getItem('alfathony_visited')
  
  if (!hasVisited) {
    showSplash.value = true
    if (typeof window !== 'undefined') {
      localStorage.setItem('alfathony_visited', 'true')
    }
    setTimeout(() => {
      splashHidden.value = true
    }, 2500)
  } else {
    splashHidden.value = true
  }
  
  setTimeout(() => {
    initCanvas()
  }, 100)
  
  window.addEventListener('scroll', () => {
    showNav.value = window.scrollY > 400
    updateActiveSection()
  })
  
  gsap.from('.hero-label', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  })
  
  gsap.from('.title-line', {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.15,
    delay: 0.4
  })
  
  gsap.from('.subtitle-word, .subtitle-divider', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 1
  })
  
  gsap.from('.hero-actions', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.3
  })
  
  gsap.from('.hero-meta', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.5
  })
  
  gsap.from('.hero-scroll-indicator', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.8
  })

  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%'
      }
    })
  })

  gsap.utils.toArray('.section-subtitle').forEach(el => {
    gsap.from(el, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%'
      }
    })
  })

  gsap.utils.toArray('.intro-title').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%'
      }
    })
  })

  gsap.utils.toArray('.intro-text p').forEach((el, i) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })

  gsap.utils.toArray('.card').forEach((el, i) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })

  gsap.utils.toArray('.project-item').forEach((el, i) => {
    gsap.from(el, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%'
      }
    })
  })

  gsap.utils.toArray('.project-card').forEach((el, i) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })

  gsap.utils.toArray('.journal-item').forEach((el, i) => {
    gsap.from(el, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%'
      }
    })
  })

  gsap.utils.toArray('.testimonial-card').forEach((el, i) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })

  gsap.from('.cta-text', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta-text',
      start: 'top 80%'
    }
  })

  gsap.from('.cta-button', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.cta-button',
      start: 'top 90%'
    }
  })
})
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #020202;
  --bg-dark: #010101;
  --text: #E5E5E5;
  --text-light: #E5E5E5;
  --text-muted: #9CA3AF;
  --accent: #E8C83E;
  --accent-dark: #B89F2F;
  --card-bg: #0A0A0A;
  --border: #1F1F1F;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-hand: 'Caveat', cursive;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  font-size: 18px;
  overflow-x: hidden;
  cursor: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.mouse-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  transition: transform 0.3s var(--ease);
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(245, 213, 71, 0.2) 0%, transparent 60%);
  top: calc(var(--my) * 1% - 300px);
  left: calc(var(--mx) * 1% - 300px);
  transform: translate(0, 0);
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(245, 180, 50, 0.15) 0%, transparent 60%);
  top: calc(var(--my) * 1% - 200px);
  left: calc(var(--mx) * 1% - 200px + 150px);
  transform: translate(0, 0);
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(230, 200, 80, 0.1) 0%, transparent 60%);
  top: calc(var(--my) * 1% - 125px);
  left: calc(var(--mx) * 1% - 125px - 100px);
}

.hero-curtain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.curtain-left,
.curtain-right {
  position: absolute;
  width: 50%;
  height: 100%;
  background: var(--bg);
  transition: transform 0.8s var(--ease);
}

.curtain-left {
  left: 0;
  transform: translateY(var(--ty, 0%));
}

.curtain-right {
  right: 0;
  transform: translateY(var(--ty, 0%));
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
  max-width: 900px;
}

.hero-label {
  display: inline-block;
  padding: 8px 20px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent);
  background: rgba(245, 213, 71, 0.1);
  border: 1px solid rgba(245, 213, 71, 0.2);
  border-radius: 50px;
  margin-bottom: 32px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.title-line {
  display: block;
}

.hero-title .highlight {
  display: inline-block;
  transition: filter 0.4s var(--ease);
  cursor: default;
}

.hero-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 40px;
}

.subtitle-word {
  opacity: 0.7;
}

.subtitle-divider {
  opacity: 0.3;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 60px;
}

.hero-btn {
  padding: 16px 36px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 50px;
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), background 0.3s var(--ease);
}

.hero-btn-primary {
  background: var(--accent);
  color: #000000;
}

.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(245, 213, 71, 0.35);
}

.hero-btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--text-muted);
}

.hero-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 40px;
}

.meta-stat {
  text-align: center;
}

.meta-number {
  display: block;
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 4px;
}

.meta-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.meta-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.scroll-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: var(--border);
  position: relative;
  overflow: hidden;
}

.scroll-dot {
  width: 3px;
  height: 3px;
  background: var(--accent);
  border-radius: 50%;
  position: absolute;
  left: -1px;
  animation: scrollDot 2s ease-in-out infinite;
}

@keyframes scrollDot {
  0% { top: 0; opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.filters {
  position: absolute;
  width: 0;
  height: 0;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 500;
  line-height: 1.15;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

/* Intro */
.intro {
  padding: 120px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.intro-image .image-placeholder {
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, #0A0A0A 0%, #050505 100%);
  border: 1px solid var(--border);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.intro-image .image-placeholder::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 40%, rgba(245, 213, 71, 0.15) 50%, transparent 60%);
  background-size: 200% 200%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.image-text {
  font-family: var(--font-display);
  font-size: 36px;
  color: var(--text);
  opacity: 0.6;
}

.intro-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 500;
  margin-bottom: 32px;
  letter-spacing: -0.01em;
}

.intro-text p {
  color: var(--text-muted);
  margin-bottom: 16px;
  font-size: 18px;
}

.intro-text p:last-child {
  margin-bottom: 0;
}

/* Sections */
.section-header {
  text-align: center;
  margin-bottom: 64px;
  padding: 0 40px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 500;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 500px;
  margin: 0 auto;
}

/* Beyond */
.beyond {
  padding: 120px 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 32px;
  text-align: center;
  transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.08);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
}

.card-micro {
  font-family: var(--font-hand);
  font-size: 20px;
  color: var(--text-muted);
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s var(--ease);
}

.card:hover .card-micro {
  opacity: 1;
  transform: translateY(0);
}

/* Side Projects - Carousel */
.side-projects {
  padding: 120px 0;
  overflow: visible;
}

.side-projects .container {
  padding: 0;
  max-width: 100%;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

.carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 20px 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--text);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s var(--ease);
  flex-shrink: 0;
}

.carousel-nav:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
  transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
  left: -60px;
}

.carousel-next {
  right: -60px;
}

.app-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 260px;
  padding: 28px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: center;
  transition: transform 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.app-card:hover {
  border-color: var(--app-color);
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.app-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--app-color) 0%, transparent 60%);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
  pointer-events: none;
}

.app-card:hover .app-glow {
  opacity: 0.08;
  transform: scale(1);
}

.app-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--app-color) 0%, color-mix(in srgb, var(--app-color) 70%, #000) 100%);
  border-radius: 16px;
  font-size: 32px;
}

.app-info {
  flex: 1;
}

.app-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text);
}

.app-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.app-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--bg);
  background: var(--app-color);
  border: none;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.app-cta:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--app-color) 50%, transparent);
}

.app-cta svg {
  transition: transform 0.3s var(--ease);
}

.app-cta:hover svg {
  transform: translate(2px, -2px);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.indicator {
  width: 8px;
  height: 8px;
  background: var(--border);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s var(--ease);
}

.indicator:hover {
  background: var(--text-muted);
}

.indicator.active {
  background: var(--accent);
  width: 24px;
  border-radius: 4px;
}

/* Selected */
.selected {
  padding: 120px 0;
  background: var(--bg-dark);
  color: var(--text-light);
}

.section-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 12px;
}

.selected .section-title {
  color: var(--text-light);
  margin-bottom: 8px;
}

.selected .section-subtitle {
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
}

.projects-showcase {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 64px;
}

.project-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 32px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s var(--ease);
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
}

.project-card:hover .project-glow {
  opacity: 0.3;
}

.project-card:hover .project-frame {
  transform: scale(1.02);
}

.project-card:hover .overlay-content {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover .details-action {
  color: var(--accent);
}

.project-card:hover .details-action svg {
  transform: translate(4px, -4px);
}

.project-frame {
  position: relative;
  padding: 20px 20px 0 20px;
  background: var(--bg-dark);
  transition: transform 0.5s var(--ease);
}

.frame-browser {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.frame-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.frame-dot:first-child {
  background: #FF5F57;
}

.frame-dot:nth-child(2) {
  background: #FEBC2E;
}

.frame-dot:nth-child(3) {
  background: #28C840;
}

.project-screen {
  position: relative;
  aspect-ratio: 16/10;
  background: var(--bg);
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--bg);
}

.screen-icon {
  font-size: clamp(48px, 8vw, 80px);
}

.screen-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%);
  pointer-events: none;
}

.project-overlay {
  position: absolute;
  top: 48px;
  left: 48px;
  z-index: 10;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s var(--ease);
}

.overlay-number {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.15);
  line-height: 1;
  pointer-events: none;
}

.overlay-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  color: white;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.project-glow {
  position: absolute;
  width: 60%;
  height: 60%;
  top: -20%;
  left: -10%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s var(--ease);
  pointer-events: none;
}

.project-details {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid var(--border);
}

.details-main {
  flex: 1;
}

.details-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.details-category {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
}

.details-year {
  font-size: 12px;
  color: var(--text-muted);
}

.project-details .project-name {
  font-family: var(--font-display);
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 500;
  margin-bottom: 12px;
  transition: color 0.3s var(--ease);
}

.project-card:hover .project-details .project-name {
  color: white;
}

.project-details .project-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 28px;
}

.project-impact {
  margin-bottom: 24px;
}

.project-impact .impact-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.impact-list {
  display: flex;
  gap: 24px;
}

.impact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.impact-value {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.impact-item .impact-value {
  color: var(--accent);
}

.impact-label-text {
  font-size: 12px;
  color: var(--text-muted);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-tag {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  transition: all 0.3s var(--ease);
}

.project-card:hover .project-tag {
  border-color: rgba(255, 255, 255, 0.2);
}

.details-action {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 24px;
  transition: color 0.3s var(--ease);
}

.details-action svg {
  transition: transform 0.3s var(--ease);
}

/* Journal - Vertical List */
.journal {
  padding: 0;
  padding-right: 0;
  padding-left: 0;
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

.journal .container {
  padding: 0;
  width: 100%;
  max-width: none;
}

.journal .section-header {
  padding: 0 8.33%;
  padding-right: 8.33%;
}

.journal::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(245, 213, 71, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.journal-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 56px;
}

.journal-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px 56px;
  padding-right: 8.33%;
  padding-left: 8.33%;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.5s var(--ease);
}

.journal-card:hover {
  border-color: var(--accent);
  transform: translateX(12px);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, var(--card-bg) 0%, rgba(245, 213, 71, 0.03) 100%);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 48px;
  flex: 1;
}

.card-number {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 300;
  color: var(--accent);
  opacity: 0.12;
  line-height: 1;
  min-width: 100px;
}

.card-main {
  flex: 1;
  max-width: 600px;
}

.card-category {
  display: inline-block;
  padding: 6px 14px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  background: rgba(245, 213, 71, 0.1);
  border-radius: 50px;
  margin-bottom: 16px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 12px;
  color: var(--text);
  transition: color 0.3s var(--ease);
}

.journal-card:hover .card-title {
  color: var(--accent);
}

.card-excerpt {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.6;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted);
  min-width: 140px;
  justify-content: flex-end;
}

.card-date {
  font-weight: 500;
}

.card-divider {
  opacity: 0.4;
}

.card-read {
  opacity: 0.8;
}

.card-action {
  margin-left: 32px;
}

.card-circle {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  border-radius: 50%;
  color: var(--bg);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s var(--ease);
}

.journal-card:hover .card-circle {
  opacity: 1;
  transform: scale(1);
}

/* Testimonials */
.testimonials {
  padding: 120px 0;
  text-align: center;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.testimonial-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: left;
}

.testimonial-text {
  font-size: 15px;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 16px;
}

.testimonial-author {
  font-size: 13px;
  color: var(--text-muted);
}

/* Final CTA */
.final-cta {
  padding: 120px 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cta-text {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 40px;
}

.cta-button {
  display: inline-block;
  padding: 18px 48px;
  font-size: 16px;
  font-weight: 500;
  background: var(--accent);
  color: #000000;
  text-decoration: none;
  border-radius: 50px;
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

.cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(245, 213, 71, 0.4);
}

/* Splash Screen */
.splash-screen {
  position: fixed;
  inset: 0;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.8s var(--ease), visibility 0.8s var(--ease);
}

.splash-screen.hidden {
  opacity: 0;
  visibility: hidden;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.splash-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  animation: splashIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.splash-line {
  width: 80px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  transform: scaleX(0);
  animation: splashLine 1s ease-in-out 0.4s forwards;
}

@keyframes splashIn {
  0% { 
    transform: scale(0.5); 
    opacity: 0; 
  }
  60% { 
    transform: scale(1.1); 
    opacity: 1; 
  }
  100% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

@keyframes splashLine {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

/* Navigation Menu */
.nav-menu {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  background: rgba(8, 8, 8, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 60px;
  z-index: 100;
  opacity: 0;
  transition: all 0.4s var(--ease);
}

.nav-menu.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.nav-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--bg);
}

.nav-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s var(--ease);
  cursor: pointer;
}

.nav-item:hover {
  color: var(--text);
}

.nav-item.active {
  color: var(--accent);
  background: rgba(245, 213, 71, 0.1);
}

.nav-item.active {
  background: rgba(245, 213, 71, 0.1);
}

/* Footer */
footer {
  background: var(--bg-dark);
  border-top: 1px solid var(--border);
}

.footer-main {
  padding: 80px 0;
}

.footer-content {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: start;
  gap: 80px;
}

.footer-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.footer-tagline {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  transition: all 0.3s var(--ease);
}

.social-link:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-3px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  align-items: start;
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.footer-col h4 {
  display: block;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 16px;
}

.footer-col a {
  display: block;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.3s var(--ease);
}

.footer-col a {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s var(--ease);
}

.footer-col a:hover {
  color: var(--accent);
}

.footer-bottom {
  padding: 24px 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-bottom p {
  font-size: 14px;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin: 0 auto;
  }
  
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .journal-card {
    padding: 36px 40px;
  }
  
  .card-content {
    gap: 24px;
  }
  
  .card-number {
    font-size: 56px;
    min-width: 60px;
  }
  
  .card-title {
    font-size: 24px;
  }
  
  .card-meta {
    min-width: auto;
  }
}

@media (max-width: 1024px) {
  .projects-showcase {
    gap: 32px;
  }
  
  .project-card {
    grid-template-columns: 1fr;
  }
  
  .project-frame {
    aspect-ratio: 16/9;
  }
  
  .project-screen {
    aspect-ratio: 16/9;
  }
  
  .project-details {
    padding: 32px;
  }
}

@media (max-width: 768px) {
  .carousel-prev,
  .carousel-next {
    display: none;
  }
  
  .container {
    padding: 0 24px;
  }
  
  .journal-card {
    padding: 28px 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  
  .card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .card-number {
    font-size: 48px;
    min-width: auto;
  }
  
  .card-title {
    font-size: 22px;
  }
  
  .card-meta {
    justify-content: flex-start;
  }
  
  .card-action {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .intro-image .image-placeholder {
    aspect-ratio: 1;
  }
  
  .project-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .project-desc {
    opacity: 1;
    transform: none;
    font-size: 14px;
  }
  
  .selected-list:hover .selected-item:not(:hover) {
    opacity: 0.6;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .custom-cursor {
    display: none;
  }
  
  body {
    cursor: auto;
  }
  
  .projects-showcase {
    gap: 24px;
    margin-top: 48px;
  }
  
  .project-card {
    border-radius: 24px;
  }
  
  .project-frame {
    padding: 16px 16px 0 16px;
  }
  
  .project-screen {
    aspect-ratio: 4/3;
  }
  
  .project-overlay {
    top: 24px;
    left: 24px;
  }
  
  .overlay-number {
    font-size: 48px;
  }
  
  .project-details {
    padding: 24px;
    border-left: none;
    border-top: 1px solid var(--border);
  }
  
  .project-details .project-name {
    font-size: 22px;
  }
  
  .impact-list {
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .impact-value {
    font-size: 20px;
  }
  
  .nav-menu {
    bottom: 20px;
    padding: 10px 16px;
    gap: 12px;
  }
  
  .nav-logo {
    width: 32px;
    height: 32px;
  }
  
  .nav-item {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  
  .footer-links {
    gap: 32px;
  }
  
  .footer-col h4 {
    margin-bottom: 12px;
  }
  
  .footer-logo {
    width: 48px;
    height: 48px;
  }
}
</style>