/**
 * Chapter 05 — "Some things I've had my hands on."
 *
 * PLACEHOLDER STATE (2026-08-14): the project NAMES are real and were supplied
 * by Alfathony. Nothing else about them has been. Every `context` line below is
 * deliberately written as a non-claim — it describes the placeholder itself, not
 * the project — so the page can ship without inventing roles, clients, dates,
 * metrics or outcomes.
 *
 * TO REPLACE: fill `context` with one real line, add `year`, and drop a real
 * image path into `image`. Nothing else on the page needs to change.
 */

export interface Project {
  /** Real project name. Do not invent additions to this list. */
  name: string
  /** One short line of real context. Empty string renders the awaiting-copy state. */
  context: string
  /** e.g. '2023'. Empty string hides the year. */
  year: string
  /** Path under /public. Empty string falls back to the generated plate. */
  image: string
  /** Destination for the VIEW cursor. Empty string renders the plate as inert. */
  href: string
  /**
   * Plate tint used by the generated fallback artwork, as an index into the
   * press palette. Purely presentational.
   */
  plate: 'yellow' | 'blue' | 'magenta' | 'ink'
}

export const projects: Project[] = [
  { name: 'Pestapora',   context: '', year: '', image: '', href: '', plate: 'yellow'  },
  { name: 'Eventversity', context: '', year: '', image: '', href: '', plate: 'ink'     },
  { name: 'Kardoos',      context: '', year: '', image: '', href: '', plate: 'magenta' },
  { name: 'Infopensi',    context: '', year: '', image: '', href: '', plate: 'blue'    },
  { name: 'UPN Connect',  context: '', year: '', image: '', href: '', plate: 'ink'     },
]

/** Shown in place of `context` until a real line is written. */
export const awaitingCopy = 'awaiting copy'
