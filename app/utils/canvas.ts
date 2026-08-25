/**
 * The Hi-Fi design canvas.
 *
 * Every scene in the Figma file is a 1440x900 frame with absolutely positioned
 * copy. Desktop reproduces that frame as a percentage-positioned stage, so a
 * coordinate read out of Figma can be used verbatim and still hold at any
 * desktop width. This turns those pixels into the custom properties
 * `.scene__item` consumes.
 */
export const CANVAS_WIDTH = 1440
export const CANVAS_HEIGHT = 900

export function placeOnCanvas(x: number, y: number, w: number) {
  return {
    '--x': ((x / CANVAS_WIDTH) * 100).toFixed(4),
    '--y': ((y / CANVAS_HEIGHT) * 100).toFixed(4),
    '--w': ((w / CANVAS_WIDTH) * 100).toFixed(4)
  }
}
