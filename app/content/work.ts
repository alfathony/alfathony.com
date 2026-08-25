/**
 * CH04 — the selected project index.
 *
 * This content is LOCKED by the developer handoff. Names, roles, years and
 * impact lines are reproduced verbatim from Figma node `32:10`; do not
 * paraphrase them, and do not add a fourth project without a handoff update.
 *
 * `preview` describes the dummy thumbnail only. Figma marks it "Hover Thumbnail
 * / Dummy" and the handoff says thumbnails stay placeholders until verified
 * project imagery is supplied — so it is drawn, not photographed, and it is
 * decorative in the accessibility tree.
 */

export interface Project {
  /** Two-digit index as shown in the row. */
  number: string
  name: string
  role: string
  year: string
  impact: string
  /** Case study route. The pages are stubs until Phase 2 builds them out. */
  href: string
  /** Accent used by the dummy thumbnail graphic. */
  preview: 'yellow' | 'paper' | 'green'
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Kredivo Checkout',
    role: 'Senior UX Designer',
    year: '2022–Present',
    impact: '+4% settlement rate through an end-to-end checkout redesign.',
    href: '/work/kredivo-checkout',
    preview: 'yellow'
  },
  {
    number: '02',
    name: 'Bhinneka Custom Page',
    role: 'Product Designer',
    year: '2019',
    impact:
      'Enabled marketing to manage modular homepage content independently, supporting year-over-year revenue growth.',
    href: '/work/bhinneka-custom-page',
    preview: 'paper'
  },
  {
    number: '03',
    name: 'Logee Trucker',
    role: 'Product Designer',
    year: '2021',
    impact:
      'Enabled operators to detect one-hour driver stops and contact drivers directly from trip history.',
    href: '/work/logee-trucker',
    preview: 'green'
  }
]

export function projectByHref(href: string): Project | undefined {
  return projects.find((project) => project.href === href)
}
