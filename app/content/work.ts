/**
 * THE PROJECT SOURCE.
 *
 * One dataset, consumed by every surface that talks about a project: the
 * Selected Work conclusion inside /about, the project index at /work when it is
 * built, and the case-study routes. Nothing restates a role, a year or an
 * impact line in a component.
 *
 * The content is LOCKED by the developer handoff and reproduced verbatim from
 * Figma node `32:10`. Do not paraphrase it, and do not add a fourth project
 * without a handoff update.
 *
 * `slug` is the identity. `href` is derived from it so a route can never drift
 * from the record it points at.
 */

export interface Project {
  /** Identity. The case-study route is derived from this. */
  slug: string
  /** Two-digit index as shown in the row. */
  number: string
  name: string
  role: string
  year: string
  impact: string
  /**
   * Accent for the dummy thumbnail. Figma marks the preview "Hover Thumbnail /
   * Dummy"; it stays a drawn placeholder until verified project imagery
   * arrives, and it is decorative in the accessibility tree throughout.
   */
  thumbnail: { accent: 'yellow' | 'paper' | 'green' }
  /** Shown in the Selected Work conclusion on /about. */
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'kredivo-checkout',
    number: '01',
    name: 'Kredivo Checkout',
    role: 'Senior UX Designer',
    year: '2022–Present',
    impact: '+4% settlement rate through an end-to-end checkout redesign.',
    thumbnail: { accent: 'yellow' },
    featured: true
  },
  {
    slug: 'bhinneka-custom-page',
    number: '02',
    name: 'Bhinneka Custom Page',
    role: 'Product Designer',
    year: '2019',
    impact:
      'Enabled marketing to manage modular homepage content independently, supporting year-over-year revenue growth.',
    thumbnail: { accent: 'paper' },
    featured: true
  },
  {
    slug: 'logee-trucker',
    number: '03',
    name: 'Logee Trucker',
    role: 'Product Designer',
    year: '2021',
    impact:
      'Enabled operators to detect one-hour driver stops and contact drivers directly from trip history.',
    thumbnail: { accent: 'green' },
    featured: true
  }
]

/** The one place a project route is spelled. */
export function projectHref(project: Project): string {
  return `/work/${project.slug}`
}

/** The Selected Work conclusion on /about. */
export const featuredProjects: Project[] = projects.filter((project) => project.featured)

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Every case-study route, for the prerender manifest. */
export const projectRoutes: string[] = projects.map(projectHref)
