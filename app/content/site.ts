/**
 * Site-level configuration: the primary navigation, per-route metadata, and the
 * placeholder pages.
 *
 * This is the one place that knows the site's shape. Pages read from it; no
 * page hard-codes a route, a title, or a nav label of its own.
 */
import type { RibbonColor } from '~/content/narrative'

export interface NavItem {
  /** Editorial index shown beside the label. */
  index: string
  label: string
  to: string
}

/** Order is the order shown in the panel. */
export const navigation: NavItem[] = [
  { index: '01', label: 'Home', to: '/' },
  { index: '02', label: 'About', to: '/about' },
  { index: '03', label: 'Work', to: '/work' },
  { index: '04', label: 'Library', to: '/library' },
  { index: '05', label: 'Journal', to: '/journal' },
  { index: '06', label: 'Contact', to: '/contact' }
]

/**
 * A nav item is current when the route matches it, or sits beneath it — so a
 * case study at `/work/kredivo-checkout` still marks Work as the current page.
 * `/` only ever matches itself, or it would match everything.
 */
export function isCurrentRoute(path: string, to: string): boolean {
  if (to === '/') return path === '/'
  return path === to || path.startsWith(`${to}/`)
}

/**
 * The placeholder sentence, exactly as supplied. It lives here as a single
 * constant so it cannot drift between the five pages that show it, and so
 * nobody is tempted to "correct" one copy of it.
 */
export const PLACEHOLDER_SENTENCE = 'Kalo jodoh, kamu pasti kesini lagi. Working on progress'

export interface PlaceholderRibbon {
  id: string
  /** Geometry from the Hi-Fi, reused rather than invented. */
  d: string
  color: RibbonColor
}

export interface PlaceholderPageConfig {
  /** Nav label, shown as the small identifying kicker. */
  eyebrow: string
  title: string
  description: string
  ribbon: PlaceholderRibbon
}

/**
 * One restrained gesture per page.
 *
 * Every path is real Hi-Fi geometry, and every one was chosen because it clears
 * both the header chrome and the headline's column on the 1440x900 canvas — the
 * ribbon is a signature here, not a background, and it never sits under type.
 * Colour follows the palette's own semantics: Cobalt is the primary voice,
 * Green is progress, Yellow is discovery, Red is change.
 */
export const placeholderPages: Record<string, PlaceholderPageConfig> = {
  '/': {
    eyebrow: 'Home',
    title: 'Alfathony — Designer',
    description:
      'Portfolio of Alfathony. Why I make, who I make for, what I make, and the work that proves it.',
    ribbon: {
      id: 'placeholder-home',
      color: 'cobalt',
      d: 'M1160 -120V510C1160 650 1230 720 1370 720H1580'
    }
  },
  '/work': {
    eyebrow: 'Work',
    title: 'Work — Alfathony',
    description: 'Selected product design work by Alfathony.',
    ribbon: {
      id: 'placeholder-work',
      color: 'green',
      d: 'M1120 -120V500C1120 650 1195 725 1345 725H1560'
    }
  },
  '/library': {
    eyebrow: 'Library',
    title: 'Library — Alfathony',
    description: 'References, tools and things worth keeping, collected by Alfathony.',
    ribbon: {
      id: 'placeholder-library',
      color: 'yellow',
      d: 'M-140 260H1090C1230 260 1300 330 1300 470V1040'
    }
  },
  '/journal': {
    eyebrow: 'Journal',
    title: 'Journal — Alfathony',
    description: 'Notes and thinking in progress from Alfathony.',
    ribbon: {
      id: 'placeholder-journal',
      color: 'cobalt-deep',
      d: 'M900 -120V230C900 340 955 395 1065 395H1540M900 1020V670C900 560 955 505 1065 505H1540'
    }
  },
  '/contact': {
    eyebrow: 'Contact',
    title: 'Contact — Alfathony',
    description: 'Get in touch with Alfathony.',
    ribbon: {
      id: 'placeholder-contact',
      color: 'red',
      d: 'M970 450V560C970 640 1010 680 1090 680H1540'
    }
  }
}
