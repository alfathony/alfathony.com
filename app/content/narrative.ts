/**
 * THE NARRATIVE — CH01 to CH03, scene by scene.
 *
 * Every number and every string in this file was read out of Figma
 * (`1qSu3POZTcOKZ0IzyYlCyC`, Hi-Fi canvas `8:2`), not estimated from a
 * screenshot. Ribbon `d` strings are the exported vector geometry verbatim.
 *
 * COORDINATE SYSTEM
 * Figma draws every scene as a 1440x900 frame. `x`, `y` and `w` below are that
 * frame's pixels. The desktop rendering turns them into percentages of the
 * stage, so the composition is exact at the 1440 reference frame. Tablet and
 * mobile ignore them entirely and read the scene as a vertical path.
 *
 * DOM ORDER
 * `texts` is authored in READING order, which is not always Figma's visual
 * order — CH01 scene 07 paints "A product." top-right while it is the third
 * beat of problem → idea → product. Desktop places it visually; every other
 * breakpoint, and every screen reader, gets the narrative order.
 *
 * PHASE 2
 * `keyStates` maps the four registered morph states per chapter onto the scene
 * that holds that geometry. Nothing here animates; the names exist so the
 * choreography has something to address.
 */

export type RibbonColor = 'cobalt' | 'cobalt-deep' | 'red' | 'yellow' | 'green'

export interface RibbonPath {
  /** Stable id — Phase 2 addresses paths by this, never by DOM position. */
  id: string
  /** Figma vector geometry, unmodified. */
  d: string
  color: RibbonColor
  /** Figma frame offset inside the scene, when the ribbon frame is not at 0,0. */
  dx?: number
  dy?: number
}

export type TextKind =
  | 'display-xl'   // UI/Display/XL  112/108
  | 'display'      // UI/Display/L    88/88
  | 'heading'      // UI/Heading/L    54/60
  | 'body'         // UI/Body/L       24/34
  | 'label'        // UI/Label/Small  13/18, uppercase

export interface SceneText {
  id: string
  kind: TextKind
  text: string
  /** Figma canvas coordinates, 1440x900. */
  x: number
  y: number
  w: number
  /** Figma's 390x844 frame hides the scroll cue. */
  hideOnMobile?: boolean
}

export interface Scene {
  /** `ch01.s01` — also the value of `data-scene`. */
  id: string
  ribbons: RibbonPath[]
  texts: SceneText[]
}

export interface Chapter {
  /** Landmark id from the agreed document structure. */
  id: string
  /** Accessible name for the section landmark and its heading. */
  title: string
  scenes: Scene[]
}

/* ------------------------------------------------------------------ CH01 --- */

const ch01: Chapter = {
  id: 'why-i-make',
  title: 'Why I Make',
  scenes: [
    {
      id: 'ch01.s01',
      ribbons: [
        {
          id: 'ch01-s01-hero',
          color: 'cobalt',
          d: 'M1180 -160C1170 110 1190 190 1030 290C880 385 820 440 960 520C1120 610 1320 650 1120 790C980 890 930 990 930 1080'
        }
      ],
      texts: [
        { id: 'ch01-s01-display', kind: 'display', text: 'Everything starts with a reason.', x: 64, y: 560, w: 720 },
        { id: 'ch01-s01-cue', kind: 'label', text: 'Scroll to follow the line', x: 64, y: 825, w: 320, hideOnMobile: true }
      ]
    },
    {
      id: 'ch01.s02',
      ribbons: [
        { id: 'ch01-s02-obvious', color: 'green', d: 'M-140 260H1090C1230 260 1300 330 1300 470V1040' }
      ],
      texts: [
        { id: 'ch01-s02-display', kind: 'display-xl', text: 'Some are obvious.', x: 64, y: 650, w: 1040 },
        { id: 'ch01-s02-label', kind: 'label', text: 'The shortest way through', x: 64, y: 815, w: 330 }
      ]
    },
    {
      id: 'ch01.s03',
      ribbons: [
        {
          id: 'ch01-s03-longer',
          color: 'yellow',
          dy: 240,
          d: 'M-150 690C150 690 180 250 470 250C760 250 750 690 500 690C250 690 340 390 680 390C1020 390 980 760 760 760C540 760 690 160 1060 160C1280 160 1320 340 1520 340'
        }
      ],
      texts: [
        { id: 'ch01-s03-display', kind: 'display', text: 'Some take a little longer to find.', x: 64, y: 28, w: 760 },
        { id: 'ch01-s03-label', kind: 'label', text: 'Keep following', x: 1160, y: 820, w: 220 }
      ]
    },
    {
      /* PEAK COMPLEXITY — the one beat where three paths are alive at once.
         Cobalt, Red and Yellow simultaneously, and no copy: the ribbon is the
         whole statement here. */
      id: 'ch01.s04',
      ribbons: [
        {
          id: 'ch01-s04-cobalt',
          color: 'cobalt',
          d: 'M-170 710C90 710 90 170 430 170C760 170 690 710 420 710C150 710 270 360 650 360C1030 360 980 780 730 780'
        },
        {
          id: 'ch01-s04-red',
          color: 'red',
          d: 'M460 -120C460 170 850 130 850 420C850 700 560 720 560 460C560 210 1080 220 1080 560C1080 790 1280 820 1540 690'
        },
        {
          id: 'ch01-s04-yellow',
          color: 'yellow',
          d: 'M920 -100C920 170 1220 170 1220 420C1220 670 980 670 980 470C980 260 1320 300 1520 300'
        }
      ],
      texts: []
    },
    {
      id: 'ch01.s05',
      ribbons: [
        { id: 'ch01-s05-resolving', color: 'cobalt', d: 'M-180 170C160 170 130 500 410 500C700 500 650 720 920 720H1540' }
      ],
      texts: [
        { id: 'ch01-s05-display', kind: 'display-xl', text: 'I love making things simple.', x: 650, y: 105, w: 760 },
        { id: 'ch01-s05-label', kind: 'label', text: 'Less noise. Clearer direction.', x: 64, y: 820, w: 380 }
      ]
    },
    {
      id: 'ch01.s06',
      ribbons: [
        { id: 'ch01-s06-resolved', color: 'green', d: 'M-120 150H1080C1240 150 1320 230 1320 390V1000' }
      ],
      texts: [
        { id: 'ch01-s06-display', kind: 'display-xl', text: 'I like making things make sense.', x: 96, y: 380, w: 1160 },
        { id: 'ch01-s06-label', kind: 'label', text: 'Why I make', x: 96, y: 800, w: 160 }
      ]
    },
    {
      /* problem → idea → product. See DEVELOPER_HANDOFF report note: the third
         path is named "mint" in Figma but exports Red; it is drawn Green here,
         which is the colour its own layer name and the palette semantics
         (Green = resolution and progress) both call for. */
      id: 'ch01.s07',
      ribbons: [
        { id: 'ch01-s07-problem', color: 'red', d: 'M-100 680H300C380 680 420 640 420 560V450' },
        { id: 'ch01-s07-idea', color: 'cobalt', d: 'M420 450V320C420 240 460 200 540 200H850C930 200 970 240 970 320V450' },
        { id: 'ch01-s07-product', color: 'green', d: 'M970 450V560C970 640 1010 680 1090 680H1540' }
      ],
      texts: [
        { id: 'ch01-s07-a-term', kind: 'heading', text: 'A problem.', x: 64, y: 82, w: 340 },
        { id: 'ch01-s07-a-body', kind: 'body', text: 'Something needs to change.', x: 64, y: 160, w: 330 },
        { id: 'ch01-s07-b-term', kind: 'heading', text: 'An idea.', x: 550, y: 475, w: 340 },
        { id: 'ch01-s07-b-body', kind: 'body', text: 'So you imagine what could be different.', x: 550, y: 553, w: 330 },
        { id: 'ch01-s07-c-term', kind: 'heading', text: 'A product.', x: 1060, y: 82, w: 340 },
        { id: 'ch01-s07-c-body', kind: 'body', text: 'Then you make it real.', x: 1060, y: 160, w: 330 }
      ]
    },
    {
      id: 'ch01.s08',
      ribbons: [
        { id: 'ch01-s08-threshold', color: 'green', d: 'M-120 710H220C320 710 370 660 370 560V280C370 170 430 120 540 120H1540' }
      ],
      texts: [
        { id: 'ch01-s08-lead', kind: 'body', text: 'But making something isn’t enough.', x: 470, y: 235, w: 600 },
        { id: 'ch01-s08-display', kind: 'display-xl', text: 'It has to make sense.', x: 470, y: 330, w: 900 },
        { id: 'ch01-s08-close', kind: 'body', text: 'Simple enough to understand. Useful enough to matter.', x: 850, y: 730, w: 500 }
      ]
    },
    {
      id: 'ch01.s09',
      ribbons: [
        { id: 'ch01-s09-exit', color: 'yellow', d: 'M1160 -120V510C1160 650 1230 720 1370 720H1580' }
      ],
      texts: [
        { id: 'ch01-s09-lead', kind: 'body', text: 'Ideas are easy to have. Making them useful is the interesting part.', x: 64, y: 92, w: 720 },
        { id: 'ch01-s09-display', kind: 'display-xl', text: 'Useful to whom?', x: 64, y: 350, w: 900 },
        { id: 'ch01-s09-next', kind: 'label', text: 'Next — People', x: 64, y: 820, w: 240 }
      ]
    }
  ]
}

/* ------------------------------------------------------------------ CH02 --- */

const ch02: Chapter = {
  id: 'who-i-make-for',
  title: 'Who I Make For',
  scenes: [
    {
      id: 'ch02.s01',
      ribbons: [
        { id: 'ch02-s01-answer', color: 'yellow', d: 'M1160 -120V500C1160 650 1085 725 935 725H-120' }
      ],
      texts: [
        { id: 'ch02-s01-display', kind: 'display-xl', text: 'People.', x: 64, y: 430, w: 900 },
        { id: 'ch02-s01-label', kind: 'label', text: 'Who I make for', x: 64, y: 820, w: 240 }
      ]
    },
    {
      id: 'ch02.s02',
      ribbons: [
        {
          id: 'ch02-s02-complicated',
          color: 'green',
          d: 'M-120 650C160 650 150 220 430 220C710 220 670 650 430 650C190 650 300 360 700 360C1080 360 1020 730 780 730C540 730 720 180 1060 180C1300 180 1340 360 1540 360'
        }
      ],
      texts: [
        { id: 'ch02-s02-display', kind: 'display-xl', text: 'And people are complicated.', x: 64, y: 64, w: 860 }
      ]
    },
    {
      /* Content order is fixed by the responsive rules: Habits → Expectations
         → Assumptions, whatever the composition does with them. */
      id: 'ch02.s03',
      ribbons: [
        {
          id: 'ch02-s03-repeated',
          color: 'cobalt',
          d: 'M-100 660C120 660 140 260 360 260C580 260 600 660 800 660C1000 660 1020 260 1240 260C1420 260 1450 500 1540 500'
        }
      ],
      texts: [
        { id: 'ch02-s03-a', kind: 'heading', text: 'Habits.', x: 64, y: 90, w: 430 },
        { id: 'ch02-s03-b', kind: 'heading', text: 'Expectations.', x: 500, y: 390, w: 430 },
        { id: 'ch02-s03-c', kind: 'heading', text: 'Assumptions.', x: 930, y: 90, w: 430 }
      ]
    },
    {
      id: 'ch02.s04',
      ribbons: [
        {
          id: 'ch02-s04-uncertainty',
          color: 'green',
          dy: 400,
          d: 'M-120 700C180 700 150 170 500 170C850 170 790 700 480 700C170 700 300 360 760 360C1180 360 1090 760 860 760C630 760 800 160 1540 240'
        }
      ],
      texts: [
        { id: 'ch02-s04-display', kind: 'display', text: 'Sometimes, they don’t even know what they want.', x: 64, y: 48, w: 880 }
      ]
    },
    {
      id: 'ch02.s05',
      ribbons: [
        {
          id: 'ch02-s05-attention',
          color: 'cobalt',
          d: 'M900 -120V230C900 340 955 395 1065 395H1540M900 1020V670C900 560 955 505 1065 505H1540'
        }
      ],
      texts: [
        { id: 'ch02-s05-display', kind: 'display-xl', text: 'So I pay attention.', x: 64, y: 300, w: 760 }
      ]
    },
    {
      id: 'ch02.s06',
      ribbons: [
        {
          id: 'ch02-s06-observed',
          color: 'red',
          d: 'M-120 210H300C390 210 435 255 435 345V555C435 645 480 690 570 690H870C960 690 1005 645 1005 555V345C1005 255 1050 210 1140 210H1560'
        }
      ],
      texts: [
        { id: 'ch02-s06-a', kind: 'heading', text: 'What they do.', x: 64, y: 62, w: 560 },
        { id: 'ch02-s06-b', kind: 'heading', text: 'What they avoid.', x: 64, y: 710, w: 560 },
        { id: 'ch02-s06-c', kind: 'heading', text: 'What they expect.', x: 820, y: 62, w: 560 },
        { id: 'ch02-s06-d', kind: 'heading', text: 'What surprises them.', x: 820, y: 710, w: 560 }
      ]
    },
    {
      id: 'ch02.s07',
      ribbons: [
        {
          id: 'ch02-s07-good-idea',
          color: 'green',
          dy: 360,
          d: 'M-120 700H280C390 700 445 645 445 535V365C445 255 500 200 610 200H1560'
        }
      ],
      texts: [
        { id: 'ch02-s07-display', kind: 'display-xl', text: 'A good idea can solve a problem.', x: 64, y: 48, w: 900 }
      ]
    },
    {
      id: 'ch02.s08',
      ribbons: [
        {
          id: 'ch02-s08-matters',
          color: 'green',
          d: 'M1120 -120V260C1120 370 1065 425 955 425H760C650 425 595 480 595 590V1020'
        }
      ],
      texts: [
        { id: 'ch02-s08-display', kind: 'display', text: 'Understanding people tells you which problem actually matters.', x: 64, y: 80, w: 980 }
      ]
    },
    {
      id: 'ch02.s09',
      ribbons: [
        {
          id: 'ch02-s09-start',
          color: 'cobalt',
          dx: 180,
          dy: 330,
          d: 'M-120 460H430C540 460 595 515 595 625V1020M595 460V250C595 140 650 85 760 85H1560'
        }
      ],
      texts: [
        { id: 'ch02-s09-a', kind: 'display-xl', text: 'That’s where I start.', x: 64, y: 64, w: 700 },
        { id: 'ch02-s09-b', kind: 'display-xl', text: 'With people.', x: 760, y: 660, w: 620 },
        { id: 'ch02-s09-next', kind: 'label', text: 'Next — Making', x: 64, y: 820, w: 240 }
      ]
    }
  ]
}

/* ------------------------------------------------------------------ CH03 --- */

const ch03: Chapter = {
  id: 'what-i-make',
  title: 'What I Make',
  scenes: [
    {
      id: 'ch03.s01',
      ribbons: [
        { id: 'ch03-s01-hard-part', color: 'green', d: 'M-120 700H430C540 700 595 645 595 535V-120' }
      ],
      texts: [
        { id: 'ch03-s01-a', kind: 'display-xl', text: 'Then comes the hard part.', x: 64, y: 70, w: 820 },
        { id: 'ch03-s01-b', kind: 'display', text: 'Making something.', x: 650, y: 700, w: 720 }
      ]
    },
    {
      id: 'ch03.s02',
      ribbons: [
        {
          id: 'ch03-s02-to-action',
          color: 'cobalt',
          dy: 170,
          d: 'M-120 240H480C590 240 645 295 645 405V495C645 605 700 660 810 660H1560'
        }
      ],
      texts: [
        { id: 'ch03-s02-a', kind: 'display', text: 'Understanding is one thing.', x: 64, y: 48, w: 1050 },
        { id: 'ch03-s02-b', kind: 'display', text: 'Doing something about it is another.', x: 650, y: 620, w: 760 }
      ]
    },
    {
      id: 'ch03.s03',
      ribbons: [
        {
          id: 'ch03-s03-possibility',
          color: 'red',
          d: 'M-120 650C190 650 170 220 480 220C790 220 730 650 480 650C230 650 360 390 760 390C1160 390 1100 690 1560 690'
        }
      ],
      texts: [
        { id: 'ch03-s03-a', kind: 'heading', text: 'A question.', x: 64, y: 70, w: 400 },
        { id: 'ch03-s03-b', kind: 'heading', text: 'An idea.', x: 540, y: 410, w: 340 },
        { id: 'ch03-s03-c', kind: 'heading', text: 'A possibility.', x: 980, y: 70, w: 400 }
      ]
    },
    {
      id: 'ch03.s04',
      ribbons: [
        {
          id: 'ch03-s04-becoming',
          color: 'green',
          d: 'M-120 700H360C470 700 525 645 525 535V365C525 255 580 200 690 200H1560'
        }
      ],
      texts: [
        { id: 'ch03-s04-display', kind: 'display-xl', text: 'What could this become?', x: 64, y: 70, w: 850 }
      ]
    },
    {
      /* The second and last beat where two paths run at once. Red is the
         friction crossing the cobalt line of the work. */
      id: 'ch03.s05',
      ribbons: [
        {
          id: 'ch03-s05-cobalt',
          color: 'cobalt',
          d: 'M-150 690C180 690 150 160 500 160C850 160 790 700 490 700C190 700 320 360 800 360'
        },
        {
          id: 'ch03-s05-red',
          color: 'red',
          d: 'M500 -120C500 170 900 140 900 430C900 720 620 720 620 470C620 220 1090 220 1090 570C1090 780 1300 800 1560 680'
        }
      ],
      texts: [
        { id: 'ch03-s05-display', kind: 'display-xl', text: 'Then things get messy.', x: 64, y: 60, w: 700 }
      ]
    },
    {
      id: 'ch03.s06',
      ribbons: [
        { id: 'ch03-s06-rebuild', color: 'red', d: 'M-120 450H270L430 250L600 650L790 250L980 650L1170 450H1560' }
      ],
      texts: [
        { id: 'ch03-s06-a', kind: 'heading', text: 'Ideas change.', x: 64, y: 60, w: 440 },
        { id: 'ch03-s06-b', kind: 'heading', text: 'Assumptions break.', x: 880, y: 60, w: 500 },
        { id: 'ch03-s06-c', kind: 'heading', text: 'Things get rebuilt.', x: 500, y: 740, w: 500 },
        { id: 'ch03-s06-d', kind: 'body', text: 'That’s part of it.', x: 64, y: 810, w: 360 }
      ]
    },
    {
      id: 'ch03.s07',
      ribbons: [
        {
          id: 'ch03-s07-becoming-real',
          color: 'cobalt',
          dy: 220,
          d: 'M-120 690C180 690 170 300 430 300C690 300 670 610 900 610H1560'
        }
      ],
      texts: [
        { id: 'ch03-s07-display', kind: 'display', text: 'Eventually, an idea has to become something real.', x: 650, y: 42, w: 720 }
      ]
    },
    {
      id: 'ch03.s08',
      ribbons: [
        {
          id: 'ch03-s08-works-to-sense',
          color: 'green',
          d: 'M-120 700H300C410 700 465 645 465 535V365C465 255 520 200 630 200H1560'
        }
      ],
      texts: [
        { id: 'ch03-s08-a', kind: 'display', text: 'Not just something that works.', x: 64, y: 70, w: 760 },
        { id: 'ch03-s08-b', kind: 'display-xl', text: 'Something that makes sense.', x: 620, y: 550, w: 760 }
      ]
    },
    {
      id: 'ch03.s09',
      ribbons: [
        { id: 'ch03-s09-exit', color: 'yellow', d: 'M1120 -120V500C1120 650 1195 725 1345 725H1560' }
      ],
      texts: [
        { id: 'ch03-s09-a', kind: 'display-xl', text: 'That’s the part I enjoy.', x: 64, y: 70, w: 720 },
        { id: 'ch03-s09-b', kind: 'body', text: 'Turning ideas into something people can actually use.', x: 64, y: 650, w: 720 },
        { id: 'ch03-s09-next', kind: 'label', text: 'Next — Proof', x: 64, y: 820, w: 220 }
      ]
    }
  ]
}

export const chapters: Chapter[] = [ch01, ch02, ch03]

/* ------------------------------------------------------- Phase 2 states --- */

/**
 * The sixteen registered key states from the motion storyboard (`40:10`).
 *
 * CH01–CH03 name the scene whose ribbon geometry IS that state, so Phase 2 can
 * read `d` from `scenesById[keyStates['ch01.peak']]` and morph between them.
 *
 * CH04 maps to `null` on purpose and it is not an omission: the Hi-Fi gives
 * CH04 no ribbon at all — the ribbon recedes and the project index carries the
 * scene. Those four names are index/preview states, and the CH04 component
 * exposes them as `data-ch04-state` for the same reason.
 */
export const keyStates: Record<string, string | null> = {
  'ch01.enter': 'ch01.s01',
  'ch01.explore': 'ch01.s03',
  'ch01.peak': 'ch01.s04',
  'ch01.resolve': 'ch01.s05',

  'ch02.answer': 'ch02.s01',
  'ch02.observe': 'ch02.s03',
  'ch02.hesitate': 'ch02.s04',
  'ch02.focus': 'ch02.s09',

  'ch03.start': 'ch03.s01',
  'ch03.messy': 'ch03.s05',
  'ch03.rebuild': 'ch03.s06',
  'ch03.resolve': 'ch03.s09',

  'ch04.idle': null,
  'ch04.row-focus': null,
  'ch04.thumbnail': null,
  'ch04.exit': null
}

/** Flat lookup for the Phase 2 choreography. */
export const scenesById: Record<string, Scene> = Object.fromEntries(
  chapters.flatMap((chapter) => chapter.scenes.map((scene) => [scene.id, scene]))
)
