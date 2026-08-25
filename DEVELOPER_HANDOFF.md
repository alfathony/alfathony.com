# Alfathony Portfolio — Developer Handoff

## Source of truth

- Figma file: `1qSu3POZTcOKZ0IzyYlCyC`
- Hi-Fi canvas: `8:2`
- CH01: `8:3`
- CH02: `16:3`
- CH03: `17:10`
- CH04: `19:36`
- Motion storyboard: `40:10`
- Responsive direction: `43:22`

The interactive Figma prototype was intentionally skipped. Implement from the Hi-Fi, motion storyboard, responsive rules, and this document.

## Experience thesis

This is one continuous scroll-led story, not a collection of disconnected pages. A broad abstract ribbon is the main visual actor. The ribbon evolves with the narrative while typography remains calm, readable, and semantic.

Do not introduce literal people, objects, decorative illustrations, gradients, glass effects, or card-heavy layouts.

## Content order

Use one semantic `<main>` with four ordered chapter `<section>` elements.

1. CH01 — Why I Make
2. CH02 — Who I Make For
3. CH03 — What I Make
4. CH04 — Selected Work

Text must remain live HTML. Never convert copy to SVG paths or raster images.

### CH04 locked content

Opening:

> Ideas become real through the work.

Supporting copy:

> Here are three projects where clarity turned into measurable progress.

Projects:

1. **Kredivo Checkout**
   - Role: Senior UX Designer
   - Year: 2022–Present
   - Impact: +4% settlement rate through an end-to-end checkout redesign.
2. **Bhinneka Custom Page**
   - Role: Product Designer
   - Year: 2019
   - Impact: Enabled marketing to manage modular homepage content independently, supporting year-over-year revenue growth.
3. **Logee Trucker**
   - Role: Product Designer
   - Year: 2021
   - Impact: Enabled operators to detect one-hour driver stops and contact drivers directly from trip history.

Thumbnails are placeholders until verified project imagery is provided.

## Design tokens

### Color

| Token                |     Value | Usage                                                               |
| -------------------- | --------: | ------------------------------------------------------------------- |
| `--color-white`      | `#FFFFFF` | Every scene background                                              |
| `--color-ink`        | `#0D0D0D` | Primary text, navigation, dividers                                  |
| `--color-cobalt-500` | `#302DE8` | Primary ribbon                                                      |
| `--color-cobalt-700` | `#1F1FB8` | Deep cobalt accents only                                            |
| `--color-red`        | `#F12F25` | Friction and change                                                 |
| `--color-yellow`     | `#F7D22C` | Discovery and realization                                           |
| `--color-green`      | `#18A957` | Resolution and progress                                             |
| `--color-paper`      | `#ECE6D3` | On-color foreground only; never use for a ribbon or page background |

No gradients. Use solid colors only.

### Typography

- Font family: `Instrument Sans`
- Load Regular, Medium, SemiBold, and Bold.
- Desktop display: `96px`
- Tablet display: `64px / 68px`
- Mobile display: `44px / 48px`
- Desktop body: `24px`
- Tablet body: `20px / 30px`
- Mobile body: `18px / 26px`
- Minimum tracking: `-0.04em`; use approximately `-0.02em` for display text.
- Preserve the line breaks shown in Figma when they carry composition. Allow natural wrapping for project impact copy.

### Layout

| Viewport            | Horizontal margin | Ribbon width |
| ------------------- | ----------------: | -----------: |
| Desktop `>=1200px`  |            `64px` |      `150px` |
| Tablet `768–1199px` |            `48px` |       `96px` |
| Mobile `<768px`     |            `32px` |       `64px` |

Minimum interactive target: `48 × 48px`.

## Responsive behavior

Do not proportionally shrink the desktop composition.

- Desktop uses asymmetric horizontal tension.
- Tablet shifts to a vertical reading path.
- Mobile presents one narrative beat per viewport.
- CH01: keep complex loops outside the text column. Copy enters after the ribbon creates space.
- CH02: stack Habits → Expectations → Assumptions around a vertical path. Pointer attraction becomes touch feedback.
- CH03: use one tension/release gesture per viewport; remove simultaneous competing gestures.
- CH04 desktop: project, role/year, and impact use three columns.
- CH04 tablet: project and role/year appear above impact.
- CH04 mobile: use a vertical list with full-width dividers. Do not introduce cards.

## Ribbon implementation

- Render the narrative ribbon as SVG geometry, not raster imagery.
- Prefer one persistent, viewport-level SVG actor whose path morphs between registered key states.
- Temporary secondary paths are allowed only for the CH01 peak-complexity beat.
- Keep stroke caps and joins rounded.
- Keep paths editable and defined as named states per chapter.
- Text and controls must remain above the decorative SVG in the DOM stacking order.
- Set decorative ribbon SVGs to `aria-hidden="true"` and `pointer-events: none`.

Recommended state naming:

```text
ch01.enter → ch01.explore → ch01.peak → ch01.resolve
ch02.answer → ch02.observe → ch02.hesitate → ch02.focus
ch03.start → ch03.messy → ch03.rebuild → ch03.resolve
ch04.idle → ch04.row-focus → ch04.thumbnail → ch04.exit
```

## Motion choreography

Use GSAP ScrollTrigger or an equivalent scroll-scrubbing system with SVG path interpolation. Do not approximate the experience with independent fade-in animations.

### CH01

- `0–18%`: enter already in motion; never draw from an empty screen.
- `18–55%`: scrub the search path; cursor pull is capped at `12px`.
- `55–72%`: temporary three-path overlap; velocity rises to `1.15×`.
- `72–100%`: loops collapse; copy settles `80ms` after the ribbon.

### CH02

- `0–20%`: yellow handoff settles into “People.”
- `20–58%`: sine-wave breathing with maximum `8px` displacement.
- `58–76%`: decelerate and reverse no more than `6%` of path progress.
- `76–100%`: align the path; Green signals understanding.

### CH03

- `0–20%`: tension builds before the first directional change.
- `20–60%`: compress, stretch, and overshoot once per narrative beat.
- `60–82%`: sharp direction changes progressively smooth out.
- `82–100%`: stabilize the ribbon before CH04 enters.

### CH04

- Idle: project index remains still; the ribbon recedes.
- Row focus: non-active rows transition to `45%` opacity over `120ms`.
- Thumbnail: reveal over `160ms`, scale `0.96 → 1`, follow pointer with `120ms` lag.
- Click: expand the thumbnail toward the case-study hero over `420ms`.

Use exponential ease-out for settling. Scroll-scrubbed motion remains linear. A single `back.out` overshoot is allowed for the CH03 rebuild beat.

## Input behavior

### Pointer

- Project rows are links and remain fully clickable.
- Thumbnail follows the pointer but is clamped inside the viewport.
- Run pointer-follow calculations inside `requestAnimationFrame`.
- Do not let the preview intercept pointer events.
- Keyboard focus must produce the same visible row state as hover.

### Touch

- No cursor-following behavior.
- First tap may reveal a fixed `16:10` preview; the project must remain reachable without hover.
- If a two-tap interaction creates ambiguity, prioritize a single-tap navigation and show the preview on press/focus instead.

## Accessibility

- Ink on White contrast: approximately `19.44:1`.
- Paper on Cobalt contrast: approximately `6.31:1`.
- Preserve visible keyboard focus.
- Project links need descriptive accessible names.
- Menu control needs an accessible label such as `Open navigation`.
- Maintain logical DOM order even when desktop composition is visually asymmetric.
- Do not place essential information only inside hover thumbnails.
- Respect `prefers-reduced-motion: reduce`.

Reduced-motion behavior:

- Use static ribbon key states.
- Replace path morphs with `160ms` copy fades or immediate state changes.
- Disable cursor attraction and thumbnail following.
- Keep project previews fixed beside or beneath the active row.

## Performance constraints

- Target smooth 60fps motion on supported desktop devices.
- Animate SVG path data, transforms, opacity, and clip/mask properties only where necessary.
- Avoid layout reads and writes in the same pointer or scroll frame.
- Do not animate large CSS filters or background blurs.
- Lazy-load project thumbnails and case-study media.
- Pause scroll observers and pointer loops when their chapter is outside the active range.

## Acceptance checklist

- [ ] One continuous scroll narrative across CH01–CH04.
- [ ] All visible backgrounds are pure White.
- [ ] No Paper-colored ribbons.
- [ ] Ribbon widths are 150 / 96 / 64px by breakpoint.
- [ ] Instrument Sans is used everywhere.
- [ ] Copy and project facts match this document exactly.
- [ ] CH01 peak complexity shows Cobalt, Red, and Yellow simultaneously.
- [ ] CH04 displays one project-index scene, not separate project scenes.
- [ ] Hover, keyboard focus, touch, and reduced-motion paths all work.
- [ ] Menu targets are at least 48 × 48px.
- [ ] No text clipping at the three reference viewports.
- [ ] No essential copy is embedded inside images or SVG.
- [ ] Decorative SVG is excluded from the accessibility tree.
- [ ] Motion does not create horizontal page overflow.

## Verified design QA snapshot

- Hi-Fi scenes: 28
- Text layers audited: 80
- Ribbon vectors audited: 32
- Motion panels: 4
- Motion key states: 16
- Responsive reference frames: 3
- Structural or style issues at handoff: 0
