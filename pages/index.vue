<template>
  <div class="relative">
    <!-- Dark Mode Toggle -->
    <button
      @click="toggleDarkMode"
      class="fixed top-8 right-8 z-50 w-12 h-12 rounded-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
      aria-label="Toggle dark mode"
    >
      <svg
        v-if="isDark"
        class="w-5 h-5 text-primary-accent"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-else
        class="w-5 h-5 text-text-muted"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    </button>

    <!-- Three.js Background Canvas -->
    <div ref="canvasContainer" class="fixed inset-0 -z-10 opacity-30 dark:opacity-20"></div>

    <!-- Hero Section -->
    <section
      ref="heroSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h1
          ref="heroTitle"
          class="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 text-text-dark dark:text-text-light leading-tight"
        >
          The best of humans are those who bring value to others.
        </h1>
        <p
          ref="heroSubtext"
          class="text-xl md:text-2xl text-text-muted dark:text-text-muted-dark mb-12 font-light"
        >
          I design digital experiences that are useful, simple, and human.
        </p>
        <button
          ref="heroCTA"
          @click="scrollToAbout"
          class="group flex items-center justify-center gap-2 text-text-dark dark:text-text-light hover:text-primary-accent transition-colors duration-300 transform hover:-translate-y-1"
        >
          <span class="text-lg">See my story</span>
          <svg
            class="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- About Section -->
    <section
      ref="aboutSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-3xl mx-auto">
        <h2
          ref="aboutTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-8 text-text-dark dark:text-text-light"
        >
          Hi, I'm Alfathony — a UI/UX Designer based in Jakarta.
        </h2>
        <p
          ref="aboutText1"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-6 leading-relaxed"
        >
          I design digital products that balance clarity, empathy, and business goals.
        </p>
        <p
          ref="aboutText2"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark leading-relaxed"
        >
          I enjoy solving complex problems, simplifying flows, and occasionally adding a bit of humor where it fits.
        </p>
      </div>
    </section>

    <!-- Beyond Design Section -->
    <section
      ref="beyondSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-3xl mx-auto">
        <h2
          ref="beyondTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-8 text-text-dark dark:text-text-light"
        >
          Beyond Design
        </h2>
        <p
          ref="beyondText1"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-6 leading-relaxed"
        >
          Design isn\'t just something I do at work — it\'s how I observe the world.
        </p>
        <div ref="beyondList" class="space-y-4 mb-8">
          <p class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark">
            <span class="text-primary-accent font-semibold">Music</span> teaches me rhythm in user flows.
          </p>
          <p class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark">
            <span class="text-primary-accent font-semibold">Travel</span> reminds me to design for real people, not assumptions.
          </p>
          <p class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark">
            <span class="text-primary-accent font-semibold">Golf</span> teaches focus, timing, and humility.
          </p>
        </div>
        <p
          ref="beyondText2"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-4 leading-relaxed"
        >
          Good design doesn\'t start with pixels.
        </p>
        <p
          ref="beyondText3"
          class="text-lg md:text-xl font-serif font-bold text-text-dark dark:text-text-light"
        >
          It starts with people.
        </p>
      </div>
    </section>

    <!-- Side Projects Section -->
    <section
      ref="projectsSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-4xl mx-auto w-full">
        <h2
          ref="projectsTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-4 text-text-dark dark:text-text-light"
        >
          Side Projects
        </h2>
        <p
          ref="projectsIntro"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-12 leading-relaxed"
        >
          I'm always happy when I can be useful — even in small ways.
        </p>
        <p
          ref="projectsSubtext"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed"
        >
          That's why I enjoy building small side projects to solve everyday problems:
        </p>
        <div ref="projectsList" class="grid md:grid-cols-2 gap-6 mb-8">
          <div
            v-for="(project, index) in sideProjects"
            :key="index"
            class="p-6 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark hover:border-primary-accent transition-all duration-300 hover:shadow-lg group transform hover:scale-[1.02]"
          >
            <h3 class="text-xl font-serif font-bold mb-2 text-text-dark dark:text-text-light group-hover:text-primary-accent transition-colors">
              {{ project.name }}
            </h3>
            <p class="text-text-muted dark:text-text-muted-dark">{{ project.description }}</p>
          </div>
        </div>
        <p
          ref="projectsClosing"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark leading-relaxed"
        >
          These projects keep me curious, sharp, and learning.
        </p>
      </div>
    </section>

    <!-- Selected Projects Section -->
    <section
      ref="selectedSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-5xl mx-auto w-full">
        <h2
          ref="selectedTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-4 text-text-dark dark:text-text-light"
        >
          Selected Projects
        </h2>
        <p
          ref="selectedIntro"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-12 leading-relaxed"
        >
          Here are some projects that shaped how I think and grow as a designer:
        </p>
        <div ref="selectedList" class="grid md:grid-cols-2 gap-8 mb-12">
          <div
            v-for="(project, index) in selectedProjects"
            :key="index"
            class="group cursor-pointer"
          >
            <div class="aspect-video bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div class="text-center p-8">
                <div class="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary-accent opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <p class="text-sm text-text-muted dark:text-text-muted-dark">Display UI</p>
              </div>
            </div>
            <h3 class="text-xl font-serif font-bold text-text-dark dark:text-text-light group-hover:text-primary-accent transition-colors">
              {{ project }}
            </h3>
          </div>
        </div>
        <p
          ref="selectedText"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed"
        >
          Each project is a story — about users, constraints, collaboration, and impact.
        </p>
        <button
          ref="selectedCTA"
          class="group inline-flex items-center gap-2 px-6 py-3 border-2 border-text-dark dark:border-text-light text-text-dark dark:text-text-light hover:bg-primary-accent hover:border-primary-accent hover:text-text-dark transition-all duration-300 font-semibold transform hover:-translate-y-1"
        >
          See full case studies
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- Journal Section -->
    <section
      ref="journalSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-3xl mx-auto">
        <h2
          ref="journalTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-4 text-text-dark dark:text-text-light"
        >
          Journal
        </h2>
        <p
          ref="journalIntro"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-12 leading-relaxed"
        >
          Sometimes I design.
        </p>
        <p
          ref="journalSubtext"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-8 leading-relaxed"
        >
          Sometimes I write — to reflect, to learn, and to share.
        </p>
        <p
          ref="journalRecent"
          class="text-lg md:text-xl font-semibold text-text-dark dark:text-text-light mb-6"
        >
          Recent thoughts:
        </p>
        <div ref="journalList" class="space-y-4 mb-12">
          <div
            v-for="(article, index) in journalArticles"
            :key="index"
            class="p-4 border-l-4 border-primary-accent pl-6 hover:bg-gray-50 dark:hover:bg-background-dark transition-colors cursor-pointer group transform hover:translate-x-2"
          >
            <h3 class="text-xl font-serif font-bold text-text-dark dark:text-text-light group-hover:text-primary-accent transition-colors">
              {{ article }}
            </h3>
          </div>
        </div>
        <button
          ref="journalCTA"
          class="group inline-flex items-center gap-2 px-6 py-3 border-2 border-text-dark dark:border-text-light text-text-dark dark:text-text-light hover:bg-primary-accent hover:border-primary-accent hover:text-text-dark transition-all duration-300 font-semibold"
        >
          Read my journal
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section
      ref="testimonialsSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-4xl mx-auto">
        <h2
          ref="testimonialsTitle"
          class="text-4xl md:text-5xl font-serif font-bold mb-4 text-text-dark dark:text-text-light"
        >
          Testimonials
        </h2>
        <p
          ref="testimonialsIntro"
          class="text-lg md:text-xl text-text-muted dark:text-text-muted-dark mb-12 leading-relaxed"
        >
          I'm lucky to work with people who know me beyond the screen.
        </p>
        <div ref="testimonialsList" class="space-y-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="p-8 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark hover:border-primary-accent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <p class="text-xl md:text-2xl text-text-dark dark:text-text-light mb-6 leading-relaxed font-serif italic">
              "{{ testimonial.quote }}"
            </p>
            <p class="text-text-muted dark:text-text-muted-dark font-semibold">
              — {{ testimonial.author }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section
      ref="contactSection"
      class="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
    >
      <div class="max-w-3xl mx-auto text-center">
        <p
          ref="contactText"
          class="text-2xl md:text-3xl text-text-muted dark:text-text-muted-dark mb-12 leading-relaxed"
        >
          If my work — or my personality — resonates with you,
        </p>
        <p
          ref="contactSubtext"
          class="text-2xl md:text-3xl font-serif font-bold text-text-dark dark:text-text-light mb-12"
        >
          let\'s build something meaningful.
        </p>
        <button
          ref="contactCTA"
          class="group inline-flex items-center gap-2 px-8 py-4 bg-primary-accent text-text-dark font-bold text-lg hover:bg-[#d4a836] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
        >
          Let\'s talk
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
declare const process: any;
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { PropType } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

// Register ScrollTrigger plugin
if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Dark mode state
const { isDark, toggleDarkMode } = defineProps<{ isDark: boolean, toggleDarkMode: () => void }>()

const canvasContainer = ref<HTMLElement | null>(null)

// Manually define tailwind colors for Three.js
const tailwindColors = {
  primary_accent: '#f5c842',
  text_dark: '#2c2c2c',
  text_light: '#e5e5e5',
}

// Refs for animations
const heroSection = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)
const heroSubtext = ref<HTMLElement | null>(null)
const heroCTA = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const aboutTitle = ref<HTMLElement | null>(null)
const aboutText1 = ref<HTMLElement | null>(null)
const aboutText2 = ref<HTMLElement | null>(null)
const beyondSection = ref<HTMLElement | null>(null)
const beyondTitle = ref<HTMLElement | null>(null)
const beyondText1 = ref<HTMLElement | null>(null)
const beyondList = ref<HTMLElement | null>(null)
const beyondText2 = ref<HTMLElement | null>(null)
const beyondText3 = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const projectsTitle = ref<HTMLElement | null>(null)
const projectsIntro = ref<HTMLElement | null>(null)
const projectsSubtext = ref<HTMLElement | null>(null)
const projectsList = ref<HTMLElement | null>(null)
const projectsClosing = ref<HTMLElement | null>(null)
const selectedSection = ref<HTMLElement | null>(null)
const selectedTitle = ref<HTMLElement | null>(null)
const selectedIntro = ref<HTMLElement | null>(null)
const selectedList = ref<HTMLElement | null>(null)
const selectedText = ref<HTMLElement | null>(null)
const selectedCTA = ref<HTMLElement | null>(null)
const journalSection = ref<HTMLElement | null>(null)
const journalTitle = ref<HTMLElement | null>(null)
const journalIntro = ref<HTMLElement | null>(null)
const journalSubtext = ref<HTMLElement | null>(null)
const journalRecent = ref<HTMLElement | null>(null)
const journalList = ref<HTMLElement | null>(null)
const journalCTA = ref<HTMLElement | null>(null)
const testimonialsSection = ref<HTMLElement | null>(null)
const testimonialsTitle = ref<HTMLElement | null>(null)
const testimonialsIntro = ref<HTMLElement | null>(null)
const testimonialsList = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)
const contactText = ref<HTMLElement | null>(null)
const contactSubtext = ref<HTMLElement | null>(null)
const contactCTA = ref<HTMLElement | null>(null)

// Data
const sideProjects = [
  { name: 'Prayer Time App', description: 'Simple, clean, and distraction-free' },
  { name: 'Weather App', description: 'Because checking the forecast shouldn\'t be confusing' },
  { name: 'Tax Calculator', description: 'Built for freelancers like me' },
  { name: 'YouTube Downloader', description: 'Mostly for drum references' },
]

const selectedProjects = [
  'Fintech Mobile App Redesign',
  'B2B Company Profile Website',
  'Household Service Platform',
  'Internal CMS & Dashboard System',
]

const journalArticles = [
  'Why Good UX Starts with Empathy',
  'Designing with Humor in a Serious Industry',
  'From Drumsticks to Design Systems',
]

const testimonials = [
  {
    quote: 'Alfathony turns complex problems into clear solutions — and somehow makes meetings fun.',
    author: 'Developer',
  },
  {
    quote: 'He brings empathy, humor, and structure into every project.',
    author: 'Product Manager',
  },
  {
    quote: 'You\'ll laugh, then realize the design actually makes a lot of sense.',
    author: 'UX Researcher',
  },
]

// Three.js scene
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let particles: THREE.Points | null = null
let animationId: number | null = null
let cleanupThreeJS: (() => void) | null = null


// Scroll to about
const scrollToAbout = () => {
  if (aboutSection.value) {
    aboutSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// Initialize Three.js
const initThreeJS = () => {
  if (!process.client || !canvasContainer.value) return

  const container = canvasContainer.value
  const width = window.innerWidth
  const height = window.innerHeight

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 100
  const positions = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    color: isDark ? new THREE.Color(tailwindColors.primary_accent) : new THREE.Color(tailwindColors.text_dark),
    size: 0.05,
    opacity: 0.5,
    transparent: true,
  })

  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  // Animation
  let time = 0
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    time += 0.01

    if (particles && particles.geometry.attributes.position && particles.material) {
      particles.rotation.x += 0.0005
      particles.rotation.y += 0.001

      const positions = particles.geometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
          if (positions[i3] !== undefined) {
            positions[i3 + 1] = (Math.sin(time + i * 0.1) * 0.5) + (Math.sin(positions[i3] * 0.5 + time) * 0.2)
            // Subtle z movement based on x for more depth
            positions[i3 + 2] = (Math.cos(time + i * 0.05) * 0.3) + (Math.sin(positions[i3] * 0.3 + time) * 0.1)
          }
      }
      if (particles.geometry.attributes.position) {
        particles.geometry.attributes.position.needsUpdate = true
      }

      // Subtle opacity variation
      if (particles.material instanceof THREE.PointsMaterial) {
        particles.material.opacity = 0.4 + Math.sin(time * 0.5) * 0.1 // oscillate between 0.3 and 0.5
      }
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  // Handle resize
  const handleResize = () => {
    if (!camera || !renderer) return
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight

    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
    renderer.setSize(newWidth, newHeight)
  }

  window.addEventListener('resize', handleResize)

  cleanupThreeJS = () => {
    window.removeEventListener('resize', handleResize)
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    if (renderer && canvasContainer.value && renderer.domElement.parentNode) {
      canvasContainer.value.removeChild(renderer.domElement)
      renderer.dispose()
    }
    if (particles) {
      particles.geometry.dispose()
      if (particles.material instanceof THREE.Material) {
        particles.material.dispose()
      }
    }
    scene = null
    camera = null
    renderer = null
    particles = null
  }
}

// GSAP Animations
const initAnimations = () => {
  if (!process.client || !gsap || !ScrollTrigger) return

  // Hero animations
  const heroTimeline = gsap.timeline()
  
  if (heroTitle.value) {
    heroTimeline.from(heroTitle.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    })
  }

  if (heroSubtext.value) {
    heroTimeline.from(heroSubtext.value, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.7')
  }

  if (heroCTA.value) {
    heroTimeline.from(heroCTA.value, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.7')
  }

  // Scroll-triggered animations with better performance
  const animateSection = (section: HTMLElement | null, elements: Array<HTMLElement | null>) => {
    if (!section) return

    gsap.from(section, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom center',
        scrub: true,
      },
    })

    elements.forEach((element, index) => {
      if (element) {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        })
      }
    })
  }

  // Animate each section
  animateSection(aboutSection.value, [aboutTitle.value, aboutText1.value, aboutText2.value])
  animateSection(beyondSection.value, [beyondTitle.value, beyondText1.value, beyondList.value, beyondText2.value, beyondText3.value])
  animateSection(projectsSection.value, [projectsTitle.value, projectsIntro.value, projectsSubtext.value, projectsList.value, projectsClosing.value])
  animateSection(selectedSection.value, [selectedTitle.value, selectedIntro.value, selectedList.value, selectedText.value, selectedCTA.value])
  animateSection(journalSection.value, [journalTitle.value, journalIntro.value, journalSubtext.value, journalRecent.value, journalList.value, journalCTA.value])
  animateSection(testimonialsSection.value, [testimonialsTitle.value, testimonialsIntro.value, testimonialsList.value])
  animateSection(contactSection.value, [contactText.value, contactSubtext.value, contactCTA.value])
}

onMounted(() => {
  if (process.client) {
    // Initialize Three.js and animations
    setTimeout(() => {
      initThreeJS()
      initAnimations()
    }, 100)
  }
})

watch(() => isDark, () => {
  if (particles && particles.material instanceof THREE.PointsMaterial) {
    particles.material.color.set(isDark ? new THREE.Color(tailwindColors.primary_accent) : new THREE.Color(tailwindColors.text_dark))
  }
})

onUnmounted(() => {
  if (cleanupThreeJS) {
    cleanupThreeJS()
  }
  if (process.client && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
})
</script>
