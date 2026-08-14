/**
 * Renders lines of display type into an offscreen canvas as an alpha mask.
 *
 * The mask is not drawn to the screen. It is handed to the wave shader, which
 * uses it to shift the *phase* of the line field inside the letterforms. That is
 * how the words appear: not by fading in, but by the stripes inside them falling
 * out of step with the stripes around them, exactly the way figure separates
 * from ground in an op-art canvas.
 *
 * Consequence: the type must be set here as carefully as it would be in CSS,
 * because this canvas is the actual typography the visitor reads.
 */

export interface MaskSpec {
  lines: string[]
  /** Cap height as a fraction of canvas height, per line. */
  sizeRatio: number
  /** Line height as a multiple of font size. */
  leading: number
  /** Left inset as a fraction of canvas width. */
  left: number
  /** Baseline of the first line as a fraction of canvas height. */
  top: number
  /** Tracking as a fraction of font size. Negative tightens. */
  tracking?: number
  /**
   * Extra word space as a fraction of font size. Canvas applies `letterSpacing`
   * to the space character too, so tight display tracking closes word gaps
   * entirely — "I SPEND A LOT" sets as "ISPENDALOT" without this.
   */
  wordSpacing?: number
  weight?: number
}

const MAX_EDGE = 2600

/**
 * Canvas 2D cannot take `font-variation-settings`, so the width axis is
 * requested through the two channels that do exist. Where neither is supported
 * the type simply renders at normal width — less condensed than intended, still
 * correctly set. It is never allowed to fall back to a different family.
 */
/**
 * The width axis is carried by the FAMILY, not by a canvas property.
 *
 * Canvas 2D cannot request a variable-font axis: `ctx.fontStretch` accepts only
 * keywords and does not move Archivo's wdth axis, and a percentage in the font
 * shorthand is rejected outright, silently leaving the context on
 * `10px sans-serif`. So 'Archivo Pinned' is declared in base.css over the same
 * font file with `font-stretch: 66%` baked into the @font-face descriptor —
 * that family has exactly one width, and asking for it by name is enough.
 */
const PINNED_FAMILY = "'Archivo Pinned', 'Archivo', sans-serif"

function applyFont(ctx: CanvasRenderingContext2D, size: number, weight: number) {
  ctx.font = `${weight} ${size}px ${PINNED_FAMILY}`
}

export function drawTypeMask(
  canvas: HTMLCanvasElement,
  aspect: number,
  spec: MaskSpec,
): void {
  const width = aspect >= 1 ? MAX_EDGE : Math.round(MAX_EDGE * aspect)
  const height = aspect >= 1 ? Math.round(MAX_EDGE / aspect) : MAX_EDGE
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  const size = height * spec.sizeRatio
  applyFont(ctx, size, spec.weight ?? 800)

  const c = ctx as CanvasRenderingContext2D & {
    letterSpacing?: string
    wordSpacing?: string
  }
  if ('letterSpacing' in c) {
    c.letterSpacing = `${size * (spec.tracking ?? -0.025)}px`
  }
  if ('wordSpacing' in c) {
    c.wordSpacing = `${size * (spec.wordSpacing ?? 0.12)}px`
  }

  // Opaque white: only the alpha channel is read downstream.
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  const x = width * spec.left
  let y = height * spec.top

  for (const line of spec.lines) {
    ctx.fillText(line, x, y)
    y += size * spec.leading
  }
}

/**
 * Canvas text silently falls back to a system face if the webfont has not landed
 * yet, which would set the headline in the wrong typeface. Resolves either way,
 * so a font failure delays the mask but never blocks the scene.
 */
export async function typeFontReady(): Promise<void> {
  if (typeof document === 'undefined' || !('fonts' in document)) return
  try {
    await Promise.all([
      document.fonts.load("800 200px 'Archivo Pinned'"),
      document.fonts.load('800 200px Archivo'),
    ])
    await document.fonts.ready
  } catch {
    /* proceed with whatever is resident */
  }
}
