<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isLoaded = ref(false)
const cursorPos = ref({ x: 0, y: 0 })
const activeProject = ref(null)
const cursorSize = ref(20)
const isMenuOpen = ref(false)
const scrollY = ref(0)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScrollNav = () => {
  scrollY.value = window.scrollY
}

const projects = [
  {
    name: 'FiqApp Digital Wallet',
    category: 'Fintech Mobile',
    year: '2024',
    color: '#F5D547',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    description: 'End-to-end mobile app redesign for Indonesia\'s fastest-growing digital wallet.'
  },
  {
    name: 'TradeFlow B2B Platform',
    category: 'SaaS Web',
    year: '2024',
    color: '#64B5F6',
    gradient: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)',
    description: 'Strategic redesign of a B2B marketplace serving 50K+ suppliers across Southeast Asia.'
  },
  {
    name: 'ServeEase Marketplace',
    category: 'Service Platform',
    year: '2023',
    color: '#81C784',
    gradient: 'linear-gradient(135deg, #134e5e 0%, #1a1a2e 50%, #0f0f0f 100%)',
    description: 'Full-product design for on-demand household services platform.'
  },
  {
    name: 'OpsCenter Dashboard',
    category: 'Enterprise Tool',
    year: '2023',
    color: '#FF8A65',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 50%, #0a0a0a 100%)',
    description: 'Internal operations dashboard for managing 10K+ daily transactions.'
  },
  {
    name: 'HealthApp',
    category: 'Healthcare',
    year: '2024',
    color: '#4DD0E1',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #1a1a2e 100%)',
    description: 'Telemedicine platform connecting patients with doctors seamlessly.'
  },
  {
    name: 'EduLearn',
    category: 'EdTech',
    year: '2023',
    color: '#BA68C8',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 50%, #1a1a2e 100%)',
    description: 'Online learning platform with interactive video courses.'
  }
]

const services = [
  { title: 'UI Design', desc: 'Interfaces that feel like magic', icon: 'pen-tool' },
  { title: 'UX Strategy', desc: 'User journeys that convert', icon: 'compass' },
  { title: 'Design Systems', desc: 'Scalable design languages', icon: 'layers' },
  { title: 'Prototyping', desc: 'Interactions that impress', icon: 'zap' }
]

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' }
]

const testimonials = [
  { text: 'Incredibly useful. He always finds the solution before we even know there\'s a problem.', author: 'Collaborator' },
  { text: 'Fun to work with. His positive energy makes every project feel lighter.', author: 'Team Member' },
  { text: 'Thoughtful in every detail. He considers things we\'d never even think of.', author: 'Client' },
  { text: 'Sometimes funny, always reliable. That\'s rare.', author: 'Friend' }
]

const handleMouseMove = (e) => {
  cursorPos.value = { x: e.clientX, y: e.clientY }
}

const handleMouseEnter = () => {
  cursorSize.value = 60
}

const handleMouseLeave = () => {
  cursorSize.value = 20
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
    initAnimations()
  }, 100)
  
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScrollNav)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScrollNav)
  ScrollTrigger.getAll().forEach(t => t.kill())
})

const initAnimations = () => {
  // Hero animations
  gsap.from('.hero-title .word', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  })
  
  gsap.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out'
  })
  
  gsap.from('.hero-actions', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: 'power3.out'
  })
  
  gsap.from('.hero-stats .stat-item', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 1,
    ease: 'power3.out'
  })

  // Hero orbs parallax
  gsap.to('.orb-1', {
    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })

  gsap.to('.orb-2', {
    y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  })

  // Work section
  gsap.from('.work-header', {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.work-header',
      start: 'top 80%'
    }
  })

  gsap.utils.toArray('.project').forEach((el, i) => {
    gsap.from(el, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
    
    gsap.to(el.querySelector('.visual-accent'), {
      rotation: 15,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  })

  // Services
  gsap.from('.services-header', {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.services-header',
      start: 'top 80%'
    }
  })

  gsap.utils.toArray('.service').forEach((el, i) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    })
  })

  // About section
  gsap.from('.about-image', {
    x: -80,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%'
    }
  })

  gsap.from('.about-content > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 70%'
    }
  })

  // Testimonials parallax
  gsap.to('.testimonials-track', {
    x: -1200,
    ease: 'none',
    scrollTrigger: {
      trigger: '.testimonials',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  })

  // Contact section
  gsap.from('.contact-content > *', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%'
    }
  })

  gsap.to('.shape-1', {
    y: -100,
    scrollTrigger: {
      trigger: '.contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  })

  gsap.to('.shape-2', {
    y: 100,
    scrollTrigger: {
      trigger: '.contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  })
}
</script>

<template>
  <div class="creative-page" :class="{ loaded: isLoaded }">
    <!-- Custom Cursor -->
    <div 
      class="cursor" 
      :style="{ 
        '--x': cursorPos.x + 'px', 
        '--y': cursorPos.y + 'px',
        '--size': cursorSize + 'px'
      }"
    ></div>
    
    <!-- Grain -->
    <div class="grain"></div>

    <!-- Navigation -->
    <nav class="nav" :class="{ scrolled: scrollY > 50 }">
      <a href="/" class="nav-logo">
        <img src="/logo-alfathony.png" alt="Alfathony" />
      </a>
      
      <button class="burger" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="menu-overlay" :class="{ open: isMenuOpen }" @click="closeMenu">
        <div class="menu-popup" :class="{ open: isMenuOpen }">
          <div class="menu-header">
            <span class="menu-label">Menu</span>
          </div>
          
          <div class="menu-links">
            <a href="#work" class="menu-link" @click="closeMenu">
              <span class="link-num">01</span>
              <span class="link-text">Work</span>
            </a>
            <a href="#services" class="menu-link" @click="closeMenu">
              <span class="link-num">02</span>
              <span class="link-text">Services</span>
            </a>
            <a href="#about" class="menu-link" @click="closeMenu">
              <span class="link-num">03</span>
              <span class="link-text">About</span>
            </a>
            <a href="#contact" class="menu-link" @click="closeMenu">
              <span class="link-num">04</span>
              <span class="link-text">Contact</span>
            </a>
          </div>
          
          <div class="menu-footer">
            <div class="menu-contact">
              <span class="contact-label">Let's talk</span>
              <a href="mailto:hello@alfathony.com" class="contact-email">hello@alfathony.com</a>
            </div>
            <div class="menu-social">
              <a href="https://linkedin.com/in/alfathony" target="_blank">LinkedIn</a>
              <a href="https://dribbble.com/alfathony" target="_blank">Dribbble</a>
              <a href="https://github.com/alfathony" target="_blank">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="orb orb-1" :style="{ '--x': cursorPos.x + 'px', '--y': cursorPos.y + 'px' }"></div>
        <div class="orb orb-2" :style="{ '--x': cursorPos.x + 'px', '--y': cursorPos.y + 'px' }"></div>
        <div class="grid-pattern"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="line">
            <span class="word">Crafting</span>
            <span class="word highlight">digital experiences</span>
          </span>
          <span class="line">
            <span class="word">that connect &amp; convert.</span>
          </span>
        </h1>
        
        <p class="hero-subtitle">
          UI/UX Designer &amp; Creative Problem Solver with 8+ years of turning complex challenges into elegant solutions.
        </p>
        
        <div class="hero-actions">
          <a href="#work" class="btn-primary" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <span>Explore Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="mailto:hello@alfathony.com" class="btn-secondary">Let's Talk</a>
        </div>
      </div>

      <div class="hero-stats">
        <div v-for="(stat, index) in stats" :key="index" class="stat-item">
          <span class="stat-num">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <div class="scroll-indicator">
        <span>Scroll</span>
        <div class="scroll-mouse">
          <div class="mouse-wheel"></div>
        </div>
      </div>
    </section>

    <!-- Selected Work -->
    <section id="work" class="work">
      <div class="work-header">
        <span class="header-label">Portfolio</span>
        <h2 class="header-title">Selected Projects</h2>
        <p class="header-desc">A curated collection of work that spans fintech, SaaS, and enterprise solutions.</p>
      </div>

      <div class="projects-showcase">
        <div class="projects-row">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="project-card"
          >
            <div class="card-image" :style="{ background: project.gradient }">
              <div class="card-icon" :style="{ '--icon-color': project.color }">
                <svg v-if="index === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M12 12h.01"/>
                </svg>
                <svg v-else-if="index === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <svg v-else-if="index === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <svg v-else-if="index === 3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <svg v-else-if="index === 4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
              </div>
              <div class="card-overlay">
                <span class="card-rank">#{{ index + 1 }}</span>
              </div>
            </div>
            <div class="card-info">
              <h3 class="card-title">{{ project.name }}</h3>
              <span class="card-category">{{ project.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="services">
      <div class="services-header">
        <span class="section-label">Expertise</span>
        <h2 class="section-title">What I Do Best</h2>
      </div>

      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service"
        >
          <div class="service-icon">
            <svg v-if="service.icon === 'pen-tool'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
              <path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
            <svg v-if="service.icon === 'compass'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
            <svg v-if="service.icon === 'layers'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
            <svg v-if="service.icon === 'zap'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.desc }}</p>
          <div class="service-index">0{{ index + 1 }}</div>
          <div class="service-hover-bg"></div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="about">
      <div class="about-container">
        <div class="about-image">
          <div class="image-wrapper">
            <div class="image-placeholder">
              <span>AF</span>
              <div class="image-shine"></div>
            </div>
            <div class="image-frame"></div>
          </div>
          <div class="about-decor">
            <span class="decor-dot"></span>
            <span class="decor-line"></span>
            <span class="decor-text">UI/UX Designer</span>
          </div>
        </div>
        
        <div class="about-content">
          <span class="about-label">About</span>
          <h2 class="about-title">
            Designer, thinker, and builder of digital experiences.
          </h2>
          <p class="about-text">
            I'm Alfathony — a UI/UX Designer based in Jakarta with a passion for creating 
            digital products that are both beautiful and functional. With 8+ years of experience, 
            I've worked with startups and enterprises to transform their digital presence.
          </p>
          <p class="about-text">
            My approach combines strategic thinking with hands-on design, ensuring every 
            pixel serves a purpose and every interaction tells a story.
          </p>
          
          <div class="about-cta">
            <a href="mailto:hello@alfathony.com" class="btn-text">
              <span>Let's work together</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
      <div class="testimonials-header">
        <span class="section-label">Testimonials</span>
        <h2 class="section-title">Kind Words</h2>
      </div>
      
      <div class="testimonials-track">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <div class="quote-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <span class="testimonial-author">{{ testimonial.author }}</span>
        </div>
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="'dup-' + index">
          <div class="quote-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <span class="testimonial-author">{{ testimonial.author }}</span>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section id="contact" class="contact">
      <div class="contact-bg">
        <div class="contact-shape shape-1"></div>
        <div class="contact-shape shape-2"></div>
        <div class="contact-grid"></div>
      </div>
      
      <div class="contact-content">
        <span class="contact-label">What's Next?</span>
        <h2 class="contact-title">Let's create something amazing together.</h2>
        <p class="contact-text">
          I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a href="mailto:hello@alfathony.com" class="contact-btn">
          <span>Start a Conversation</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-top">
        <a href="/" class="footer-logo">
          <img src="/logo-alfathony.png" alt="Alfathony" />
        </a>
        
        <div class="footer-social">
          <a href="https://linkedin.com/in/alfathony" target="_blank" class="social-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.104 10.088H3.555V9h2.886v8.521zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href="https://dribbble.com/alfathony" target="_blank" class="social-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-1.173-3.117-2.517-5.304-2.105-2.313.435-3.645 2.181-4.24 3.22 2.62.544 4.618 1.513 5.99 3.02.93-1.438 2.29-2.663 3.554-4.135zM12 2.588c1.821 0 3.41.663 4.667 1.728-1.29 1.69-2.885 2.732-4.667 3.34-1.782-.608-3.378-1.65-4.668-3.34 1.258-1.065 2.846-1.728 4.668-1.728z"/>
            </svg>
            <span>Dribbble</span>
          </a>
          <a href="https://github.com/alfathony" target="_blank" class="social-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.797 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.983-.4 3.003-.404 1.02.004 2.043.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.09 24 18.597 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Alfathony. Crafted with care.</p>
        <a href="mailto:hello@alfathony.com" class="footer-email">hello@alfathony.com</a>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.creative-page {
  --bg: #FAFAFA;
  --bg-card: #FFFFFF;
  --bg-dark: #F5F5F5;
  --text: #0A0A0A;
  --text-secondary: #1A1A1A;
  --text-muted: #6B6B6B;
  --accent: #F5D547;
  --accent-dark: #E8C83E;
  --border: #E5E5E5;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  cursor: none;
}

.creative-page.loaded {
  cursor: auto;
}

/* Custom Cursor */
.cursor {
  position: fixed;
  width: var(--size, 20px);
  height: var(--size, 20px);
  border: 2px solid var(--accent-dark);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
  mix-blend-mode: difference;
}

.creative-page.loaded .cursor {
  animation: cursorPulse 0.3s ease;
}

@keyframes cursorPulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

/* Grain */
.grain {
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 999;
}

/* Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  z-index: 1000;
  background: transparent;
  transition: all 0.4s ease;
}

.nav.scrolled {
  padding: 16px 48px;
  background: rgba(250, 250, 250, 0.9);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0,0,0,0.03);
}

.nav-logo img {
  height: 36px;
  width: auto;
  transition: height 0.3s ease;
}

.nav.scrolled .nav-logo img {
  height: 28px;
}

/* Burger Menu */
.burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1001;
}

.burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.burger.active {
  z-index: 1004;
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger.active span:nth-child(2) {
  width: 0;
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 1002;
  pointer-events: none;
  opacity: 0;
  transition: all 0.4s ease;
}

.menu-overlay.open {
  pointer-events: auto;
  opacity: 1;
  background: rgba(0, 0, 0, 0.5);
}

/* Menu Popup */
.menu-popup {
  position: absolute;
  top: 0;
  right: 0;
  width: 480px;
  max-width: 90vw;
  height: 100vh;
  background: var(--bg-card);
  padding: 48px;
  z-index: 1003;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(0,0,0,0.1);
}

.menu-popup.open {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.menu-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--text-muted);
}

.menu-close {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  transition: color 0.3s ease;
}

.menu-close:hover {
  color: var(--accent-dark);
}

.menu-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu-link {
  display: flex;
  align-items: baseline;
  gap: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.menu-link:hover .link-text {
  color: var(--accent-dark);
  transform: translateX(10px);
}

.link-num {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  color: var(--accent-dark);
  opacity: 0.5;
}

.link-text {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  color: var(--text);
  transition: all 0.3s ease;
}

.menu-footer {
  margin-top: auto;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

.menu-contact {
  margin-bottom: 24px;
}

.menu-contact .contact-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.contact-email {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-email:hover {
  color: var(--accent-dark);
}

.menu-social {
  display: flex;
  gap: 24px;
}

.menu-social a {
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.3s ease;
}

.menu-social a:hover {
  color: var(--accent-dark);
}

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 120px 48px 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  transition: all 0.5s ease;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(245, 213, 71, 0.25) 0%, transparent 70%);
  top: calc(var(--y) * 1px - 300px);
  left: calc(var(--x) * 1px - 300px);
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(100, 181, 246, 0.15) 0%, transparent 70%);
  top: calc(var(--y) * 1px - 200px + 150px);
  left: calc(var(--x) * 1px - 200px + 200px);
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 80px);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
}

.hero-title .line {
  display: block;
  overflow: hidden;
}

.hero-title .word {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: slideUp 0.8s ease forwards;
}

.creative-page.loaded .word:nth-child(1) { animation-delay: 0.1s; }

.hero-title .highlight {
  color: var(--accent-dark);
  position: relative;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 40px;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.4s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.5s forwards;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--accent);
  color: var(--text);
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(245, 213, 71, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn-primary:hover::before {
  transform: translateX(100%);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(245, 213, 71, 0.4);
}

.btn-primary svg {
  transition: transform 0.3s ease;
}

.btn-primary:hover svg {
  transform: translate(4px, -4px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
  border: 1px solid var(--border);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-card);
  border-color: var(--text-secondary);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-num {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 600;
  color: var(--accent-dark);
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.scroll-indicator span {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  writing-mode: vertical-rl;
}

.scroll-mouse {
  width: 24px;
  height: 40px;
  border: 2px solid var(--border);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.mouse-wheel {
  width: 4px;
  height: 8px;
  background: var(--accent-dark);
  border-radius: 2px;
  animation: scrollWheel 1.5s ease-in-out infinite;
}

@keyframes scrollWheel {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.3; }
}

/* Work Section */
.work {
  padding: 120px 48px;
  background: var(--bg-dark);
}

.work-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent-dark);
  margin-bottom: 16px;
}

.header-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 600;
  margin-bottom: 16px;
}

.header-desc {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 500px;
  margin: 0 auto;
}

.projects-showcase {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}

.projects-row {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.projects-row::-webkit-scrollbar {
  display: none;
}

.project-card {
  flex-shrink: 0;
  width: 280px;
  cursor: pointer;
  scroll-snap-align: start;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: scale(1.05);
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 16px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.card-icon svg {
  width: 32px;
  height: 32px;
  color: var(--icon-color);
}

.project-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: 12px;
}

.card-rank {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.card-info {
  padding: 12px 4px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-category {
  font-size: 12px;
  color: var(--text-muted);
}

/* Services */
.services {
  padding: 120px 48px;
  background: var(--bg);
}

.services-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent-dark);
  margin-bottom: 16px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.service {
  position: relative;
  padding: 48px 32px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  transition: all 0.4s ease;
  overflow: hidden;
  cursor: pointer;
}

.service:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
}

.service-hover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(245, 213, 71, 0.05) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service:hover .service-hover-bg {
  opacity: 1;
}

.service-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  border-radius: 16px;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}

.service:hover .service-icon {
  transform: scale(1.1) rotate(5deg);
}

.service-icon svg {
  width: 28px;
  height: 28px;
  color: var(--text);
}

.service-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
}

.service-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

.service-index {
  position: absolute;
  top: 20px;
  right: 24px;
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  color: var(--border);
  opacity: 0.3;
}

/* About */
.about {
  padding: 120px 48px;
  background: var(--bg-dark);
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 100px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 32px 64px rgba(245, 213, 71, 0.3);
  position: relative;
  overflow: hidden;
}

.image-placeholder span {
  font-family: var(--font-display);
  font-size: 80px;
  font-weight: 700;
  color: var(--text);
  z-index: 1;
}

.image-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

.image-frame {
  position: absolute;
  inset: 20px;
  border: 2px solid var(--accent-dark);
  border-radius: 24px;
  opacity: 0.3;
}

.about-decor {
  position: absolute;
  bottom: -30px;
  left: -40px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: var(--bg-card);
  border-radius: 50px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

.decor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-dark);
  border-radius: 50%;
}

.decor-line {
  width: 20px;
  height: 2px;
  background: var(--border);
}

.decor-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}

.about-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent-dark);
  margin-bottom: 16px;
}

.about-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 24px;
}

.about-text {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 16px;
}

.about-cta {
  margin-top: 32px;
}

.btn-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--accent);
  transition: all 0.3s ease;
}

.btn-text:hover {
  gap: 12px;
  color: var(--accent-dark);
}

/* Testimonials */
.testimonials {
  padding: 120px 0;
  background: var(--bg);
  overflow: hidden;
}

.testimonials-header {
  text-align: center;
  padding: 0 48px;
  margin-bottom: 64px;
}

.testimonials-track {
  display: flex;
  gap: 32px;
  animation: slideTrack 40s linear infinite;
}

.testimonial-card {
  flex-shrink: 0;
  width: 400px;
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.08);
}

.quote-icon {
  color: var(--accent);
  margin-bottom: 20px;
  opacity: 0.5;
}

.testimonial-text {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.testimonial-author {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-dark);
}

@keyframes slideTrack {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Contact */
.contact {
  position: relative;
  padding: 160px 48px;
  background: var(--text);
  color: white;
  overflow: hidden;
}

.contact-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.contact-shape {
  position: absolute;
  border-radius: 50%;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: var(--accent);
  opacity: 0.1;
  top: -200px;
  right: -100px;
  filter: blur(60px);
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: var(--accent-dark);
  opacity: 0.1;
  bottom: -100px;
  left: -50px;
  filter: blur(40px);
}

.contact-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.contact-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.contact-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent);
  margin-bottom: 24px;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
  margin-bottom: 20px;
}

.contact-text {
  font-size: 18px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 40px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 20px 40px;
  background: var(--accent);
  color: var(--text);
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 48px rgba(245, 213, 71, 0.3);
}

.contact-btn svg {
  transition: transform 0.3s ease;
}

.contact-btn:hover svg {
  transform: translate(4px, -4px);
}

/* Footer */
.footer {
  padding: 40px 48px;
  background: var(--text);
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.footer-logo img {
  height: 28px;
}

.footer-social {
  display: flex;
  gap: 24px;
}

.social-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.social-item:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.footer-bottom p {
  color: rgba(255,255,255,0.4);
  font-size: 14px;
}

.footer-email {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-email:hover {
  color: var(--accent);
}

/* Responsive */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .about-image {
    order: -1;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .project {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .project.reverse {
    direction: ltr;
  }
}

@media (max-width: 768px) {
  .nav {
    padding: 16px 24px;
  }
  
  .nav.scrolled {
    padding: 12px 24px;
  }
  
  .menu-popup {
    padding: 32px 24px;
  }
  
  .hero {
    padding: 100px 24px 60px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 32px;
  }
  
  .scroll-indicator {
    display: none;
  }
  
  .work, .services, .about {
    padding: 80px 24px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonial-card {
    width: 300px;
  }
  
  .contact {
    padding: 100px 24px;
  }
  
  .footer-top, .footer-bottom {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
}
</style>