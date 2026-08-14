# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built homepage, not from intention. Every value below is what
`app/assets/css/tokens.css`, `app/assets/css/base.css`, and the chapter
components actually ship.

## The world

A white gallery hung with black-and-white wave canvases.

The governing law: **contrast is generated optically, by line frequency, never by
mixing greys.** There is no `#888` in this system. Where the design wants a
lighter tone it uses a finer or thinner wave, not an opacity and not a grey. Two
violations of this law were caught in review and removed — a shader that washed
its ground toward `#F0F0F0`, and a closing field rendered at `opacity: 0.14`,
which is the same mistake wearing a different hat: fading black lines makes grey.

Consequences that are easy to undo by accident:

- Never lower the opacity of a wave field to make it quieter. Lower its `duty`.
- Never set a headline in `--ink-soft` to make it secondary. Drop its weight.
- Never ramp a gradient between ink and paper. Hard stops only.

## Material

| Token | Value | Role |
|---|---|---|
| `--gallery` | `#ffffff` | Canvases. Pure white, only inside a hung frame. |
| `--wall` | `#fafaf8` | The room. Every chapter ground. |
| `--ink` | `#000000` | All artwork, all display type. |
| `--ink-soft` | `#4a4a48` | Caption-scale metadata only (~8.6:1 on wall). |
| `--ink-faint` | `#6b6a63` | Quietest captions (~5.1:1 on wall). |
| `--rule` | `#cfcdc5` | Hairline dividers. |
| `--accent` | `#ffc400` | The tightest wave band. Never a fill. |

The wall is a **cited deviation** from the direction contract's "pure #000 on
#FFF": the QUALITY BAR card names MATTE PAPER as a material and its own grounds
sample 250–254. `#FFF` is the canvas; matte paper is the room. Holding the wall
one step off white is what lets a hung canvas read as an object on a wall instead
of dissolving into it.

**The accent is a frequency, not a colour.** It appears only as the tightest
stripe band — under a wall label rule, under the Chapter 09 placeholder tag, on
nav hover. A solid yellow fill behind content is out of system; it was shipped
once and removed in review.

## Type

One family, `Archivo` (variable, `wght 100..900`, `wdth 62..125`), self-hosted
via `@nuxtjs/google-fonts` with `download: true`.

A second `@font-face`, **`Archivo Pinned`**, points at the same variable file
with `font-stretch: 66%` baked into the descriptor. It exists because Canvas 2D
cannot request a variable-font axis — `ctx.fontStretch` takes only keywords and
does not move `wdth`, and a percentage in the font shorthand is rejected outright,
silently leaving the context on `10px sans-serif`. The pinned family has exactly
one width, so asking for it by name is enough. **The hero mask depends on this.**

| Class | Setting | Use |
|---|---|---|
| `.display` | wdth 66, wght 800, lh 0.86, tracking −0.025em, word-spacing 0.1em | Architectural voice |
| `.statement` | wdth 82, wght 600, lh 0.96, always `--ink` | Chapter sentences |
| `.lead` | wdth 96, wght 300, always `--ink` | The rank below a statement |
| `.caption` | wdth 87, wght 600, 0.7rem, +0.16em, uppercase | Wall labels, metadata |

`word-spacing` on `.display` is load-bearing, not polish: condensed width plus
negative tracking closes word gaps entirely, and "I SPEND A LOT" sets as
"ISPENDALOT" without it. The same correction exists in the canvas mask via
`MaskSpec.wordSpacing`.

Rank is carried by **weight and width, never by colour**. Greys at headline scale
were shipped once and removed in review.

### The cut

`.cut` is the world's signature device: display lettering solid across its upper
~60% and eroded into the line field below, so type and artwork read as one
material. Implemented with `background-clip: text` over hard-stop stripes — one
hue, no ramp.

Two rules, both learned the hard way:

1. **Apply per line.** `background-size` resolves against the whole element box,
   so on a multi-line heading the solid band covers the first lines and the last
   line lands entirely inside the striped zone and is destroyed. Multi-line
   headings wrap each line in its own `.cut cut-line` span.
2. **Derive the period, then clamp it.** `--cut-period` is computed in CSS from
   the adjacent canvas's own geometry (Ch05 from plate width and its 18-line
   field, Ch07 from frame width and its 54-line field, Ch10 from the closing
   field's height and its 10 lines), then wrapped in `clamp(4px, …, 10px)`. An
   erosion band is about a third the height of a plate, so at the plate's full
   period the glyph takes one or two cuts and reads amputated. The card's own
   letter erosion is visibly finer than its canvases.

The design detector reports this rule as `gradient-text`. It is a syntactic match
on `background-clip: text`, not a colour ramp, and the form is documented on the
QUALITY BAR card itself. It stays **conditional on** the stops remaining hard and
the period remaining derived.

## Components

- **`WaveBlock`** — canvas-2D wave field. Ink coverage is set by `duty` (fraction
  of line spacing), never by a pixel `weight`: a fixed 2px stroke turns into grey
  haze as the block grows. `reactive` makes the field recalculate under the
  pointer — the world's native interaction, where the canvas holds still and the
  viewer moves.
- **`WaveCanvas`** — the one WebGL piece. See below.
- **`WallLabel`** — the only metadata component. Hairline rule, title, term/value
  rows. Renders an explicit awaiting state rather than disappearing.
- **`ChapterMark`** — the chapter numeral as a corner placard. Never stacked above
  a headline: a tracked label sitting on top of a heading in the same column is an
  eyebrow, which the craft floor refuses.
- **`CustomCursor`** — ink square at rest, labelled disc on interactive targets.
  Hidden until the pointer first moves, and never rendered for coarse pointers or
  reduced motion.

## The hero shader

`app/components/webgl/WaveCanvas.vue`. The opening sentence is drawn into the
wave field at the same frequency and phase as its surroundings, which makes it
genuinely invisible — nothing is hidden and nothing fades in. Scroll shifts the
**phase inside the letterforms** until they fall out of step with the ground.

Uniform timeline over scroll progress:

- `uSeparation` 0→1 over the first 42%: the phase offset inside the mask.
- `uSolidify` 0→1 over the rest: letterforms settle to flat ink.
- `uThin` 0→0.74: the ground's ink **duty** shrinks, so the field goes from
  half-black to fine hairlines while every pixel stays `#000` or `#FFF`.
- `uFreq` 150→32: the field opens as it resolves.

`uThin` replaced an earlier `uCalm` that mixed the ground toward white. Both read
as "lighter"; only one obeys the law.

## Motion

Riley's canvases do not move — the viewer does. Nothing bounces or overshoots.

- Lenis smooth scroll, driven from GSAP's ticker so scroll and ScrollTrigger share
  one clock. Never started under reduced motion.
- `v-reveal` applies its hidden state **in JS, never in CSS**. If JavaScript
  fails, GSAP never loads, or the visitor asked for less motion, the markup is
  simply visible. Nothing on this page is gated behind an animation that might
  not run.
- `useThreeStage` pauses rendering off-screen and on tab hide, caps DPR, and flips
  `failed` on context loss so callers show real markup instead of a hole.

## Accessibility

- SSR is on and the route is prerendered: all narrative copy is in the static
  HTML, which is what a screen reader, a crawler, and a dead WebGL context get.
- Reduced motion is a designed state, not a broken one. WebGL never initialises;
  the DOM headline is sized to sit inside the canvas frame (at full display scale
  it overflowed and collided with the wall label), and the static field is thinned
  to 2px/15px so the headline reads against it.
- Focus is never suppressed. With `cursor: none` in play the focus ring is the
  only thing telling a keyboard visitor where they are.
- Both type greys clear 4.5:1 on the wall. `--ink-faint` shipped once at 2.5:1 and
  was corrected.

## Content boundary

Projects, voices, life subjects, and "now" entries are data in `app/content/`.
Project **names** are real and user-supplied; nothing else about them is. Every
unknown renders a visible awaiting state, and Chapter 06 ships an empty hung wall
rather than invented quotes. Do not seed those files to "preview" a layout — the
empty rendering is the truthful one.
