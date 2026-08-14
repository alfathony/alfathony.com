# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Nuxt 4 + Vue 3 + TypeScript, confirmed by the user over the brief's stated Next.js
preference. The repository was deliberately rescaffolded on fresh Nuxt 4 on
2026-08-14 with GSAP already installed. Three.js (vanilla, not React Three Fiber)
and Lenis are added for the WebGL and smooth-scroll layers. Deployment target not
yet decided — currently `ssr: false`, so a static/SPA host is viable.

## Users

A visitor who has landed on alfathony.com knowing little or nothing about
Alfathony — most often a recruiter, a founder scouting a design/product hire, a
potential collaborator, or a peer who followed a link. They arrive on a laptop,
with no specific task and low commitment, and they are deciding within seconds
whether this person is worth more of their attention. Their job is not "evaluate a
portfolio"; it is "work out who this is." Success is that they leave curious
rather than informed.

## Product Purpose

A personal site that lets a stranger discover Alfathony through an experience
rather than a bio. It exists so that the impressions — he understands products not
just UI, he works across disciplines, he is interesting — arrive as conclusions the
visitor reaches, never as claims the site makes. Success is measured by curiosity
at the end, not by comprehension of a résumé.

## Positioning

Alfathony works in the overlap of design, product, technology, business, and user
experience, with real experience across web development, product management,
product design, and design leadership. The durable line is his own:

> "I spend a lot of time making things make sense."

That sentence is the narrative thread of the whole homepage and the one claim no
neighboring portfolio can truthfully copy, because it describes a disposition
rather than a service. Motivations, in his words: fun, problem solving, curiosity.
His stated personal principle: "The best of humans are those who bring value to
others."

## Operating Context

The homepage is a single continuous scroll narrative in ten chapters, not a stack
of labeled sections:

1. Making things make sense
2. For people
3. For products
4. Somewhere between
5. Things I've had my hands on
6. People I've worked with
7. Life outside work
8. Why I make things
9. What I'm making now
10. Everything in between

Chapter copy is fixed by the brief and is product truth, not placeholder. The
signature closing line is "Things I make, things I think about, and everything in
between." Terminal navigation is Work / Journal / Experiments / About / Say hi.

## Capabilities and Constraints

- One continuous narrative. No Hero/About/Skills/Projects/Contact scaffolding, and
  no obvious section separators.
- Every WebGL and motion moment must carry a reason: discovery, transformation,
  curiosity, clarity, connection, or playfulness. Decoration for its own sake is
  out of scope.
- The experience arc is ambiguity → clarity, mirroring the core sentence.
- Contrast is required: roughly 70–80% calm/editorial/premium, 20–30% playful and
  unexpected. Not every chapter may be spectacular; Chapter 08 must be among the
  quietest moments on the page.
- Content must be separated from presentation so projects, testimonials, journal
  entries, and "what I'm making now" can change without rewriting the page.
- Chapter 09 must be built to age well — it is the anti-staleness mechanism.
- Performance, responsive behavior, accessibility, and `prefers-reduced-motion`
  support are not tradeable against WebGL ambition. Mobile is intentionally
  designed, not a degraded desktop.
- Banned language (generic portfolio register): "multidisciplinary,"
  "passionate UX designer," "I solve complex problems," "I create meaningful
  experiences," and closing CTAs in the "let's build something meaningful
  together" family.
- Chapter 06 must not read as a corporate testimonial carousel and must not be
  titled "Testimonials."

## Brand Commitments

- Name: Alfathony. Existing logo at `public/logo-alfathony.png`.
- Visual language pinned by the brief: white-dominant, warm yellow as an accent
  only (never a dominant background), editorial typography, generous whitespace,
  minimal UI chrome, subtle imperfection and human detail.
- Explicitly ruled out: glassmorphism, heavy gradients, cyberpunk, glowing 3D
  objects, particle excess, neon, futuristic UI, rounded-card templates.
- A custom cursor is part of the site's personality, with states: default,
  magnetic/interactive, VIEW, LOOK, OPEN, PLAY. It must not be constantly
  animated or annoying.
- Voice: first person, dry, understated, lightly self-deprecating. Confident
  without arrogance.

## Evidence on Hand

- Real projects, named by the user, to be referenced by name only: Pestapora,
  Eventversity, Kardoos, Infopensi, UPN Connect. **No descriptions, metrics,
  roles, dates, or outcomes for these have been supplied.** These must not be
  invented.
- No project imagery exists yet.
- No hobby video exists yet for MUSIC / TRAVEL / GOLF.
- No real testimonial quotes exist yet.
- Confirmed with the user (2026-08-14): every one of the above ships as authored,
  clearly-labeled placeholder content driven by editable content files, to be
  swapped for real material later. Placeholders may not be phrased as factual
  claims about clients, results, or relationships.
- Assets present in `public/`: `logo-alfathony.png`, `wave-line.svg`,
  `wave-line.png`, `favicon.ico`.

## Product Principles

1. **Discovery over declaration.** The visitor infers who Alfathony is; the site
   never tells them what to think of him.
2. **Every effect argues something.** Motion and WebGL exist to move the visitor
   from ambiguity toward clarity, which is the subject of the site.
3. **Earn the loud moments with quiet ones.** Restraint is the majority state;
   spectacle is rationed and therefore lands.
4. **Content outlives layout.** Projects, quotes, and current work are data, so
   the site stays true a year after launch.
5. **Never fabricate the record.** Where real material is missing, ship an honest
   placeholder rather than a plausible invention.

## Accessibility & Inclusion

`prefers-reduced-motion` must yield a genuinely designed static reading of the
narrative, not a broken one — all copy reachable, no content gated behind scroll
animation. Keyboard navigation and focus visibility are required despite the
custom cursor. WebGL must degrade to a designed static state on failure or on
low-power devices.
