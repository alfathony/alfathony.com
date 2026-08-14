/**
 * Chapter 09 — "I'm still making things."
 *
 * This is the anti-staleness mechanism for the whole homepage. It is designed to
 * be edited often and by hand: add an entry to the top of `now`, redeploy, done.
 * The chapter reads as a live press docket, so a short list is normal and an
 * out-of-date list is the one thing that looks wrong.
 *
 * PLACEHOLDER STATE (2026-08-14): no real current work was supplied. The three
 * entries below are marked `placeholder: true`, which makes the page label them
 * on screen rather than passing them off as real. Delete them as real entries
 * arrive.
 */

export type NowKind = 'project' | 'experiment' | 'journal'

export interface NowEntry {
  kind: NowKind
  title: string
  /** One line. Present tense. What is actually happening with it right now. */
  note: string
  /** ISO date, used for the docket stamp and for sorting. */
  date: string
  /** Optional destination. Empty string renders the entry as text only. */
  href: string
  /** True until a real entry replaces it. Renders a visible placeholder tag. */
  placeholder?: boolean
}

export const now: NowEntry[] = [
  {
    kind: 'project',
    title: 'This site',
    note: 'Rebuilding it as one continuous scroll instead of a set of sections.',
    date: '2026-08-14',
    href: '',
    placeholder: true,
  },
  {
    kind: 'experiment',
    title: 'Registration study',
    note: 'Pulling three ink plates into alignment with a fragment shader.',
    date: '2026-08-14',
    href: '',
    placeholder: true,
  },
  {
    kind: 'journal',
    title: 'Untitled draft',
    note: 'Notes on why obvious things are only obvious afterwards.',
    date: '2026-08-14',
    href: '',
    placeholder: true,
  },
]

/** Chapter 10's terminal navigation. */
export const endNav = [
  { label: 'Work',        href: '/work'        },
  { label: 'Journal',     href: '/journal'     },
  { label: 'Experiments', href: '/experiments' },
  { label: 'About',       href: '/about'       },
  { label: 'Say hi',      href: 'mailto:email.alfathony@gmail.com', external: true },
]
