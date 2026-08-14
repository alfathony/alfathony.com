/**
 * Cursor state bus.
 *
 * The brief pins the cursor as part of the site's personality, with a short set
 * of states and one rule: it must not be constantly animated. So this holds only
 * *state*; the component decides how each state looks, and nothing animates
 * unless the state actually changes.
 *
 * Any element can claim a state declaratively via the `v-cursor` directive
 * (see plugins/cursor.client.ts), which keeps chapter markup free of listeners.
 */
import { ref, readonly } from 'vue'

export type CursorState =
  | 'default'   // small mark, resting
  | 'view'      // a project — leads somewhere
  | 'look'      // an image or video
  | 'open'      // external link
  | 'play'      // an experiment
  | 'drag'      // something the visitor can move
  | 'hidden'    // over a text input, or off-window

/** Label rendered inside the cursor. Empty means the bare mark. */
const LABELS: Record<CursorState, string> = {
  default: '',
  view: 'VIEW',
  look: 'LOOK',
  open: 'OPEN',
  play: 'PLAY',
  drag: 'DRAG',
  hidden: '',
}

const state = ref<CursorState>('default')
const label = ref('')
/** Element the cursor should magnetise toward, if any. */
const magnet = ref<HTMLElement | null>(null)

export function useCursor() {
  function set(next: CursorState, customLabel?: string) {
    state.value = next
    label.value = customLabel ?? LABELS[next]
  }

  function reset() {
    state.value = 'default'
    label.value = ''
    magnet.value = null
  }

  function attract(el: HTMLElement | null) {
    magnet.value = el
  }

  return {
    state: readonly(state),
    label: readonly(label),
    magnet: readonly(magnet),
    set,
    reset,
    attract,
  }
}
