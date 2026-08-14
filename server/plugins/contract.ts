/**
 * Stamps the direction contract into the emitted HTML.
 *
 * It goes in through a Nitro hook rather than a Vue template because Vue's
 * compiler strips comments in production builds — a contract the build erases is
 * a contract nobody can audit.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.bodyPrepend.push(`
<!--
  THESIS: Information that was always present becoming legible, rather than
  information being revealed. Refuses the portfolio arrangement of hero, about,
  skills, project grid, contact.

  OWN-WORLD: A white gallery hung with black-and-white wave canvases. Pure
  #000 on #FFF, contrast generated optically by line frequency and never by
  mixing greys. One family, Archivo, condensed to 66 for display and neutral for
  text. Hairline-ruled wall labels carry all metadata. The accent is a
  frequency — the tightest band — and that band alone is painted #FFC400.

  STORY: A stranger meets an idea before they meet a person, watches it hold
  across people, products and the space between them, sees what he has made and
  who he is away from it, and leaves curious rather than informed.

  FIRST VIEWPORT: A full-bleed wave field inset in white wall. The opening
  sentence is already in the field at the same frequency and phase as its
  surroundings, therefore invisible. Chapter mark top left, wall label bottom
  left, scroll cue bottom right. Scroll shifts the phase inside the letterforms
  until the sentence separates from the ground.

  FORM: White gallery hung with black-and-white wave canvases; challenger card
  chosen by the user over the assigned direction; seed key fe31d2da.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and DESIGN.md
-->
`)
  })
})
