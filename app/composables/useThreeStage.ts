/**
 * Lifecycle for one WebGL stage.
 *
 * Every WebGL moment on this page goes through here so they all share the same
 * rules, which are mostly rules about *not* rendering:
 *
 *   - nothing renders while the canvas is off screen (IntersectionObserver)
 *   - nothing renders while the tab is hidden (visibilitychange)
 *   - nothing renders at all under prefers-reduced-motion; the caller draws its
 *     static composition instead
 *   - device pixel ratio is capped, because a 3x retina fullscreen canvas is
 *     the single fastest way to make a laptop fan audible
 *   - if the context is lost or WebGL is unavailable, `failed` flips and the
 *     caller shows real markup rather than a blank hole
 *
 * The render callback is driven by GSAP's ticker, not its own rAF, so WebGL and
 * scroll choreography stay on one clock.
 */
import { ref, shallowRef, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { prefersReducedMotion } from './useReducedMotion'

export interface StageContext {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  /** CSS pixel size of the canvas. */
  size: { width: number; height: number }
}

export interface StageOptions {
  /** Vertical field of view in degrees. */
  fov?: number
  /** Called once, after the renderer exists. Build the scene here. */
  setup: (ctx: StageContext) => void
  /** Called every frame while visible. `t` is elapsed seconds. */
  frame?: (ctx: StageContext, t: number, dt: number) => void
  /** Called on every resize, after the camera has been updated. */
  resize?: (ctx: StageContext) => void
  /** Called on teardown. Dispose anything `setup` created. */
  dispose?: (ctx: StageContext) => void
  /** Max device pixel ratio. Fullscreen stages should stay at or below 1.75. */
  maxDpr?: number
  /** Render even when reduced motion is requested (a single static frame). */
  staticFrameOnReducedMotion?: boolean
}

export function useThreeStage(
  container: Ref<HTMLElement | null>,
  options: StageOptions,
) {
  const failed = ref(false)
  const ready = ref(false)
  const ctx = shallowRef<StageContext | null>(null)

  let observer: IntersectionObserver | null = null
  let resizeObserver: ResizeObserver | null = null
  let onVisibility: (() => void) | null = null
  let visible = false
  let tabVisible = true
  const clock = new THREE.Clock()
  let running = false

  const tick = () => {
    const c = ctx.value
    if (!c || !running) return
    const dt = clock.getDelta()
    options.frame?.(c, clock.elapsedTime, dt)
    c.renderer.render(c.scene, c.camera)
  }

  const evaluateRunning = () => {
    const next = visible && tabVisible && !failed.value
    if (next === running) return
    running = next
    if (running) {
      // Reset delta so a long pause does not produce one enormous first step.
      clock.getDelta()
      gsap.ticker.add(tick)
    } else {
      gsap.ticker.remove(tick)
    }
  }

  const applySize = () => {
    const c = ctx.value
    const el = container.value
    if (!c || !el) return
    const width = el.clientWidth
    const height = el.clientHeight
    if (width === 0 || height === 0) return

    c.size.width = width
    c.size.height = height
    c.camera.aspect = width / height
    c.camera.updateProjectionMatrix()
    c.renderer.setSize(width, height, false)
    options.resize?.(c)

    // A paused stage still needs to repaint after a resize, or it shows a
    // stretched frame from before the viewport changed.
    if (!running) c.renderer.render(c.scene, c.camera)
  }

  onMounted(() => {
    const el = container.value
    if (!el) return

    const reduced = prefersReducedMotion()
    if (reduced && !options.staticFrameOnReducedMotion) {
      // Caller renders its static composition; no context is ever created.
      failed.value = true
      return
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      failed.value = true
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, options.maxDpr ?? 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearAlpha(0)

    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    el.appendChild(canvas)

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      failed.value = true
      evaluateRunning()
    })

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(options.fov ?? 45, 1, 0.1, 200)

    const context: StageContext = {
      renderer,
      scene,
      camera,
      size: { width: el.clientWidth, height: el.clientHeight },
    }
    ctx.value = context

    options.setup(context)
    applySize()
    ready.value = true

    if (reduced) {
      // One frame, then never again.
      renderer.render(scene, camera)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        evaluateRunning()
      },
      // Start a beat before it scrolls into view so the first frame is not blank.
      { rootMargin: '15% 0px 15% 0px' },
    )
    observer.observe(el)

    resizeObserver = new ResizeObserver(applySize)
    resizeObserver.observe(el)

    onVisibility = () => {
      tabVisible = document.visibilityState === 'visible'
      evaluateRunning()
    }
    document.addEventListener('visibilitychange', onVisibility)
  })

  onBeforeUnmount(() => {
    running = false
    gsap.ticker.remove(tick)
    observer?.disconnect()
    resizeObserver?.disconnect()
    if (onVisibility) document.removeEventListener('visibilitychange', onVisibility)

    const c = ctx.value
    if (!c) return
    options.dispose?.(c)
    c.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      mesh.geometry?.dispose?.()
      const mat = mesh.material
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat?.dispose?.()
    })
    c.renderer.dispose()
    c.renderer.domElement.remove()
    ctx.value = null
  })

  return { failed, ready, ctx }
}
