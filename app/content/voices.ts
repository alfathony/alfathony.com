/**
 * Chapter 06 — "Apparently, people don't hate working with me."
 *
 * PLACEHOLDER STATE (2026-08-14): no real quotes have been supplied. The brief
 * forbids fabricating testimonials, so this file ships EMPTY of quotes and the
 * chapter renders its own awaiting-state instead: the layout is fully built, the
 * slots are visibly blank proof slots, and nothing on screen claims that a real
 * person said a real thing.
 *
 * TO REPLACE: push real entries into `voices`. The chapter switches out of its
 * awaiting-state automatically once the array is non-empty. Keep quotes short —
 * one or two sentences — or the marginalia layout loses its handwritten feel.
 */

export interface Voice {
  quote: string
  name: string
  role: string
  company: string
}

/**
 * Intentionally empty. Do not seed this with invented quotes to "preview" the
 * layout — `slotCount` below already drives a truthful empty rendering.
 */
export const voices: Voice[] = []

/** How many blank proof slots the awaiting-state draws. */
export const slotCount = 5

export const awaitingNote = 'quote pending approval'
