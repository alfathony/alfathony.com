/**
 * Wave signatures — the gallery's visual vocabulary, in one place.
 *
 * Every wave canvas on this site is described by the same handful of numbers.
 * They used to sit as literals inside whichever chapter drew them, which meant
 * retuning the rhythm of the gallery was a six-file edit and no two chapters
 * could be compared without opening both. They live here now, so tuning is a
 * single-file job.
 *
 * This is a TUNING SURFACE, not a configuration system. Chapters still decide
 * what to hang and where; this file only says what each field looks like. If a
 * value is used exactly once and means nothing outside its chapter, it does not
 * need to move here.
 *
 * Chapter 07's signatures deliberately stay in `life.ts`, next to the subjects
 * they stand in for — a field that substitutes for missing footage belongs with
 * the thing it substitutes for. It uses the same `WaveField` type.
 */

/** The parameters `WaveBlock` draws from. Mirrors its prop names exactly. */
export interface WaveField {
  /** Lines across the block. Higher reads as further away, or as finer. */
  frequency: number
  /** Vertical swell, as a fraction of block height. */
  amplitude: number
  /** Horizontal cycles of the swell. */
  cycles: number
  /** Ink coverage as a fraction of the line spacing. */
  duty?: number
  /** Phase offset, so sibling fields are not identical. */
  phase?: number
  /** Vertical lines instead of horizontal. */
  vertical?: boolean
}

/* --------------------------------------------------------- chapter 02 --- */

/**
 * The five behaviours, each at its own frequency — a person hesitating and a
 * person dropping off are not the same signal, so they are not the same field.
 */
export interface Reading {
  label: string
  field: WaveField
}

export const readings: Reading[] = [
  { label: 'Hesitation', field: { frequency: 16, amplitude: 0.11, cycles: 0.9, duty: 0.4 } },
  { label: 'Confusion', field: { frequency: 46, amplitude: 0.16, cycles: 2.6, duty: 0.4 } },
  { label: 'Friction', field: { frequency: 28, amplitude: 0.05, cycles: 3.4, duty: 0.4 } },
  { label: 'The click', field: { frequency: 9, amplitude: 0.02, cycles: 0.6, duty: 0.4 } },
  { label: 'Drop-off', field: { frequency: 34, amplitude: 0.2, cycles: 1.1, duty: 0.4 } },
]

/* --------------------------------------------------------- chapter 03 --- */

/**
 * One work at four stages, left to right: a question (tight, unstable, high
 * swell) becoming a product (wide, calm, regular). The frequencies fall and the
 * duty rises across the set — that progression IS the argument, so keep the
 * four monotonic if you retune them.
 *
 * `phase` was previously derived as `index * 0.9` at the call site. It is
 * written out here so each stage can be nudged on its own.
 */
export interface Stage {
  term: string
  field: WaveField
}

export const stages: Stage[] = [
  { term: 'A question', field: { frequency: 62, amplitude: 0.22, cycles: 3.8, duty: 0.38, phase: 0 } },
  { term: 'A pattern', field: { frequency: 40, amplitude: 0.14, cycles: 2.4, duty: 0.42, phase: 0.9 } },
  { term: 'A structure', field: { frequency: 22, amplitude: 0.07, cycles: 1.5, duty: 0.46, phase: 1.8 } },
  { term: 'A product', field: { frequency: 12, amplitude: 0.02, cycles: 0.8, duty: 0.5, phase: 2.7 } },
]

/* --------------------------------------------------------- chapter 05 --- */

/**
 * Each project reads as a different work. These are deliberately unrelated to
 * one another — a wall of teasers should not look like a sequence.
 *
 * Assigned by position rather than by project name: the names are real and the
 * list will grow, and a project should not change appearance because someone
 * renamed it.
 */
export const workSignatures: WaveField[] = [
  { frequency: 18, amplitude: 0.14, cycles: 1.2, duty: 0.46 },
  { frequency: 44, amplitude: 0.06, cycles: 2.8, duty: 0.42 },
  { frequency: 27, amplitude: 0.19, cycles: 0.7, duty: 0.48 },
  { frequency: 60, amplitude: 0.09, cycles: 3.6, duty: 0.4 },
  { frequency: 12, amplitude: 0.03, cycles: 1.9, duty: 0.5 },
]

/** Wraps, so the wall keeps working past the fifth project. */
export function workSignature(index: number): WaveField {
  return workSignatures[index % workSignatures.length]!
}

/* --------------------------------------------------------- chapter 06 --- */

/**
 * The one field on the awaiting wall. Only the first slot carries a canvas, so
 * the chapter holds the same material as every other wall in the building
 * without pretending there are five quotes.
 */
export const voicesSlotField: WaveField = {
  frequency: 26,
  amplitude: 0.1,
  cycles: 1.6,
  duty: 0.45,
}

/* --------------------------------------------------------- chapter 10 --- */

/**
 * The bookend: Chapter 01's material at the far end of its range — wide, calm,
 * regular, already resolved.
 *
 * The very low duty is what makes it a hairline field rather than a heavy one.
 * It is full ink at a thin duty, NOT black lines at low opacity: fading black
 * produces grey, and grey is the one thing this world does not make.
 */
export const closingField: WaveField = {
  frequency: 10,
  amplitude: 0.04,
  cycles: 0.9,
  duty: 0.09,
}
