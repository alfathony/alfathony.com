import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimationOptions {
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  stagger?: number
  speed?: number
  direction?: 'x' | 'y'
  from?: 'bottom' | 'top' | 'left' | 'right'
}

export function useScrollAnimation() {
  function fadeInUp(element: HTMLElement, options: AnimationOptions = {}) {
    const { delay = 0, duration = 1, y = 60 } = options
    
    gsap.fromTo(element, 
      { y: y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function fadeInLeft(element: HTMLElement, options: AnimationOptions = {}) {
    const { delay = 0, duration = 1, x = -60 } = options
    
    gsap.fromTo(element,
      { x: x, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function fadeInRight(element: HTMLElement, options: AnimationOptions = {}) {
    const { delay = 0, duration = 1, x = 60 } = options
    
    gsap.fromTo(element,
      { x: x, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function staggerFadeIn(elements: HTMLElement[], options: AnimationOptions = {}) {
    const { stagger = 0.15, delay = 0, duration = 0.8, y = 40 } = options
    
    gsap.fromTo(elements,
      { y: y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function parallax(element: HTMLElement, options: AnimationOptions = {}) {
    const { speed = 0.5, direction = 'y' } = options
    
    gsap.to(element, {
      [direction]: speed! * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }
  
  function scaleIn(element: HTMLElement, options: AnimationOptions = {}) {
    const { delay = 0, duration = 1, scale = 0.9 } = options
    
    gsap.fromTo(element,
      { scale: scale, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function textReveal(element: HTMLElement, options: AnimationOptions = {}) {
    const { delay = 0, duration = 0.8, from = 'bottom' } = options
    
    const fromValues: Record<string, { y?: number; x?: number }>  = {
      bottom: { y: 40 },
      top: { y: -40 },
      left: { x: -40 },
      right: { x: 40 }
    }
    
    gsap.fromTo(element,
      { ...fromValues[from]!, opacity: 0 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }
  
  function refresh() {
    ScrollTrigger.refresh()
  }
  
  function killAll() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
  
  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    staggerFadeIn,
    parallax,
    scaleIn,
    textReveal,
    refresh,
    killAll
  }
}