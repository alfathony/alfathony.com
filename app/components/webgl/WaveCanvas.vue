<script setup lang="ts">
/**
 * The wave canvas — Chapter 01, and the piece the whole site is built around.
 *
 * A field of black lines on white, waving the way a Riley canvas waves. The
 * opening sentence is already in the field from the first frame, drawn at the
 * same line frequency and the same phase as everything around it, which makes it
 * perfectly invisible. Nothing is hidden and nothing fades in.
 *
 * Scrolling shifts the phase of the lines *inside* the letterforms until they
 * fall out of step with the lines around them. At half a period of separation
 * the sentence is unmistakable. Past that the ground calms toward white and the
 * letters resolve to solid ink.
 *
 * So the visitor does not watch text appear. They watch information that was
 * always present become legible — which is the thing the site is about, and the
 * reason this is a shader and not a fade.
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useThreeStage } from '~/composables/useThreeStage'
import { drawTypeMask, typeFontReady } from '~/utils/typeMask'

const props = withDefaults(
  defineProps<{
    lines: string[]
    /**
     * Line breaks for portrait viewports. Required whenever `lines` would not
     * fit a narrow canvas: canvas text does not wrap, so a landscape break set
     * simply runs off the right edge and gets clipped.
     */
    portraitLines?: string[]
    trigger?: HTMLElement | null
    /** Fraction of the trigger's scroll used to resolve the type. */
    resolveAt?: number
  }>(),
  { portraitLines: undefined, trigger: null, resolveAt: 1 },
)

const stage = ref<HTMLElement | null>(null)
const drawn = ref(false)

const CAMERA_Z = 2
const FOV = 45

let maskCanvas: HTMLCanvasElement | null = null
let maskTexture: THREE.CanvasTexture | null = null
let material: THREE.ShaderMaterial | null = null
let plane: THREE.Mesh | null = null
let scrollTrigger: ScrollTrigger | null = null

const state = { progress: 0, px: 0, py: 0, tx: 0, ty: 0 }

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uMask;
  uniform float uTime;
  uniform float uFreq;        // line frequency, cycles across the field
  uniform float uSeparation;  // phase offset inside letterforms, 0..1 of a half period
  uniform float uThin;        // ground's ink duty shrinks — lighter, never greyer
  uniform float uSolidify;    // letterforms settle toward flat ink
  uniform float uAmp;         // wave amplitude
  uniform vec2  uPointer;
  uniform vec3  uInk;
  uniform vec3  uPaper;

  varying vec2 vUv;

  const float TAU = 6.28318530718;

  void main() {
    vec2 uv = vUv;

    // Riley's wave: a horizontal sine whose amplitude is itself modulated
    // vertically, so the field swells and flattens in bands rather than
    // rippling uniformly.
    float amp = uAmp * (1.0 + uPointer.y * 0.35);
    float w = sin(uv.x * TAU * 1.35 + uTime * 0.11) * amp;
    w *= 0.55 + 0.45 * sin(uv.y * TAU * 0.7 - uTime * 0.06);
    w += sin(uv.x * TAU * 3.1 - uTime * 0.05) * amp * 0.22;

    float y = uv.y + w;

    float mask = texture2D(uMask, uv).a;

    // The whole trick, in one line: inside the letters the wave is pushed out
    // of step with the wave outside them.
    float phase = mask * uSeparation * 3.14159265;

    // Pointer nudges the frequency a little. The canvas does not move; the
    // visitor's position changes what it looks like.
    float freq = uFreq * (1.0 + uPointer.x * 0.05);

    float s = sin(y * freq * TAU + phase);

    // Screen-space antialiasing. Without this, a 150-cycle field aliases into
    // moire garbage the moment the display is not exactly 1:1.
    float aa = fwidth(s) * 1.1 + 0.001;

    // The ground lightens by DUTY, not by colour: pushing the threshold shrinks
    // the ink band and widens the paper band, so the field goes from half-black
    // to fine hairlines while every pixel stays either #000 or #FFF. Mixing the
    // ground toward grey would read as lighter too, and would break the one law
    // this world has.
    float ground = smoothstep(-aa, aa, s + uThin);

    // Inside the letterforms the duty is held, so the type keeps its full ink
    // as the ground thins — which is what separates figure from ground once the
    // sentence has resolved.
    float inked = smoothstep(-aa, aa, s);

    vec3 groundColor = mix(uInk, uPaper, ground);
    vec3 letterColor = mix(mix(uInk, uPaper, inked), uInk, uSolidify);

    gl_FragColor = vec4(mix(groundColor, letterColor, mask), 1.0);
  }
`

function maskSpec() {
  return {
    lines: props.lines,
    sizeRatio: 0.168,
    leading: 0.86,
    left: 0.055,
    top: 0.375,
    tracking: -0.022,
    wordSpacing: 0.16,
    weight: 800,
  }
}

function redraw(aspect: number) {
  if (!maskCanvas || !maskTexture) return
  const portrait = aspect < 0.85
  const spec = maskSpec()
  if (portrait) {
    spec.lines = props.portraitLines ?? props.lines
    spec.sizeRatio = 0.072
    spec.leading = 0.92
    spec.top = 0.3
    spec.left = 0.07
  }
  drawTypeMask(maskCanvas, aspect, spec)
  maskTexture.needsUpdate = true
  drawn.value = true
}

function fitPlane(aspect: number) {
  if (!plane) return
  const h = 2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z
  plane.scale.set(h * aspect, h, 1)
}

const { failed, ready } = useThreeStage(stage, {
  fov: FOV,
  maxDpr: 1.75,

  setup(ctx) {
    const aspect = Math.max(ctx.size.width / ctx.size.height, 0.3)

    maskCanvas = document.createElement('canvas')
    drawTypeMask(maskCanvas, aspect, maskSpec())

    maskTexture = new THREE.CanvasTexture(maskCanvas)
    maskTexture.minFilter = THREE.LinearFilter
    maskTexture.magFilter = THREE.LinearFilter
    maskTexture.generateMipmaps = false
    maskTexture.anisotropy = ctx.renderer.capabilities.getMaxAnisotropy()

    material = new THREE.ShaderMaterial({
      uniforms: {
        uMask: { value: maskTexture },
        uTime: { value: 0 },
        uFreq: { value: 150 },
        uSeparation: { value: 0 },
        uThin: { value: 0 },
        uSolidify: { value: 0 },
        uAmp: { value: 0.02 },
        uPointer: { value: new THREE.Vector2() },
        uInk: { value: new THREE.Color('#000000') },
        uPaper: { value: new THREE.Color('#ffffff') },
      },
      vertexShader,
      fragmentShader,
    })

    plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
    ctx.scene.add(plane)

    ctx.camera.position.z = CAMERA_Z
    fitPlane(aspect)

    typeFontReady().then(() => redraw(aspect))
  },

  resize(ctx) {
    const aspect = Math.max(ctx.size.width / ctx.size.height, 0.3)
    fitPlane(aspect)
    redraw(aspect)
  },

  frame(_ctx, t) {
    if (!material) return
    const u = material.uniforms
    const p = state.progress

    state.px += (state.tx - state.px) * 0.05
    state.py += (state.ty - state.py) * 0.05

    u.uTime.value = t
    u.uPointer.value.set(state.px, state.py)

    // Separation happens first and fast — the sentence has to become readable
    // early, or the visitor scrolls past a field of stripes wondering why.
    u.uSeparation.value = gsap.utils.clamp(0, 1, p / 0.42)

    // Then the letters solidify. The GROUND is never washed toward white:
    // greying the field is mixing a grey, which this world does not do. The
    // ground calms by opening its frequency instead — same ink, fewer lines.
    const settle = gsap.utils.clamp(0, 1, (p - 0.42) / 0.5)
    const eased = settle * settle * (3 - 2 * settle)
    // Ground thins to fine hairlines; letters keep full ink and go solid.
    u.uThin.value = eased * 0.74
    u.uSolidify.value = eased

    // Frequency opens from the tightest band toward the widest as it resolves,
    // which is the same move as stepping back from the canvas.
    u.uFreq.value = 150 - 118 * eased
    u.uAmp.value = 0.02 - 0.013 * eased
  },

  dispose() {
    maskTexture?.dispose()
    maskTexture = null
    maskCanvas = null
    material = null
    plane = null
  },
})

const active = computed(() => ready.value && !failed.value && drawn.value)

function onPointerMove(e: PointerEvent) {
  state.tx = (e.clientX / window.innerWidth) * 2 - 1
  state.ty = -((e.clientY / window.innerHeight) * 2 - 1)
}

onMounted(() => {
  if (failed.value) return
  gsap.registerPlugin(ScrollTrigger)
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  // The parent's template ref is still null while this child mounts, so a
  // `:trigger` binding cannot be relied on here. Resolve the scrolling ancestor
  // from the DOM instead — binding to our own container would attach the
  // trigger to the sticky element, whose progress never advances.
  const triggerEl =
    props.trigger ?? stage.value?.closest('section') ?? stage.value

  scrollTrigger = ScrollTrigger.create({
    trigger: triggerEl,
    start: 'top top',
    end: `bottom bottom`,
    scrub: true,
    onUpdate: (self) => {
      state.progress = gsap.utils.clamp(0, 1, self.progress / props.resolveAt)
    },
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  scrollTrigger?.kill()
  scrollTrigger = null
})

defineExpose({ active })
</script>

<template>
  <div class="wave" :class="{ 'is-live': active }">
    <div ref="stage" class="wave__stage" aria-hidden="true" />
    <!--
      The static canvas. Shown under reduced motion, on WebGL failure, and for
      the moment before the first frame. It is a real wave field made of a
      repeating gradient, not a grey placeholder, so the world is intact even
      when the shader never runs.
    -->
    <div class="wave__static" aria-hidden="true" />
  </div>
</template>

<style scoped>
.wave {
  position: absolute;
  inset: 0;
  background: var(--gallery);
  overflow: hidden;
}

.wave__stage {
  position: absolute;
  inset: 0;
}

.wave__static {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    180deg,
    var(--ink) 0 2px,
    var(--gallery) 2px 15px
  );
  transition: opacity 0.8s var(--ease-optical);
}

.is-live .wave__static {
  opacity: 0;
}
</style>
