/**
 * Chapter 07 — "When I'm not making things make sense..."
 *
 * The brief is explicit: no descriptions, no explanations, no copy. These three
 * carry themselves on footage alone.
 *
 * PLACEHOLDER STATE (2026-08-14): no footage exists yet. Each entry therefore
 * renders as an authored wave field tuned to that subject's motion rather than
 * as an empty box or a stock clip. Drop a file into /public and set `video` —
 * the chapter swaps to real footage with no other change.
 */

import type { WaveField } from './fields'

export interface LifeSubject {
  label: string
  /** Path under /public, e.g. '/life/music.mp4'. Empty renders the wave field. */
  video: string
  /** Poster frame for the video. */
  poster: string
  /**
   * Wave signature standing in for the footage, tuned per subject. Stays here
   * rather than in `fields.ts` because a field that substitutes for missing
   * footage belongs beside the thing it substitutes for.
   */
  field: WaveField
}

export const life: LifeSubject[] = [
  {
    // Dense, high-amplitude, reads as a waveform.
    label: 'Music',
    video: '',
    poster: '',
    field: { frequency: 54, amplitude: 0.26, cycles: 4.2, duty: 0.4 },
  },
  {
    // Wide, slow, horizon-like.
    label: 'Travel',
    video: '',
    poster: '',
    field: { frequency: 15, amplitude: 0.13, cycles: 0.8, duty: 0.48 },
  },
  {
    // Few lines, one long arc — a trajectory.
    label: 'Golf',
    video: '',
    poster: '',
    field: { frequency: 8, amplitude: 0.3, cycles: 0.5, duty: 0.5 },
  },
]
