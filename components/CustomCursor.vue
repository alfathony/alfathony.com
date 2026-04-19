<template>
  <div 
    ref="cursorRef"
    class="custom-cursor"
    :class="{ hovering: isHovering }"
  >
    <span v-if="cursorText" class="cursor-text">{{ cursorText }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)
const cursorText = ref('')
const isHovering = ref(false)
const currentX = ref(0)
const currentY = ref(0)
const targetX = ref(0)
const targetY = ref(0)

let cursorElement = null
let animationFrame = null

const cursorTargets = {
  'View': ['.project-item', '.selected-item', '.beyond-card'],
  'Open': ['a[href^="http"]', 'a[href^="mailto"]'],
  'Look': ['.intro-image img', '.intro-image .placeholder', 'img'],
  'Scroll': ['.hero-cta'],
  'Read': ['.journal-item'],
  "Let's talk": ['.final-cta-btn']
}

const getCursorText = (el) => {
  if (!el) return ''
  
  for (const [text, selectors] of Object.entries(cursorTargets)) {
    for (const selector of selectors) {
      if (el.closest(selector)) {
        return el.closest(selector).getAttribute('data-cursor') || text
      }
    }
  }
  
  const dataCursor = el.getAttribute('data-cursor')
  return dataCursor || ''
}

const lerp = (start, end, factor) => {
  return start + (end - start) * factor
}

const animate = () => {
  currentX.value = lerp(currentX.value, targetX.value, 0.15)
  currentY.value = lerp(currentY.value, targetY.value, 0.15)
  
  if (cursorElement) {
    cursorElement.style.left = currentX.value + 'px'
    cursorElement.style.top = currentY.value + 'px'
  }
  
  animationFrame = requestAnimationFrame(animate)
}

const onMouseMove = (e) => {
  targetX.value = e.clientX
  targetY.value = e.clientY
  
  if (!cursorElement) return
  
  const el = e.target
  const text = getCursorText(el)
  
  if (text !== cursorText.value) {
    cursorText.value = text
    isHovering.value = text.length > 0
  }
}

const onMouseEnter = () => {
  if (cursorElement) {
    cursorElement.classList.remove('hidden')
  }
}

const onMouseLeave = () => {
  if (cursorElement) {
    cursorElement.classList.add('hidden')
  }
}

onMounted(() => {
  cursorElement = cursorRef.value
  
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseenter', onMouseEnter)
  document.addEventListener('mouseleave', onMouseLeave)
  
  targetX.value = window.innerWidth / 2
  targetY.value = window.innerHeight / 2
  currentX.value = window.innerWidth / 2
  currentY.value = window.innerHeight / 2
  
  animate()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('mouseleave', onMouseLeave)
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.cursor-text {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
}
</style>