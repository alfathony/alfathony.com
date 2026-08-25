/**
 * Whether the header should be showing its full or compact form.
 *
 * Driven by an IntersectionObserver on a sentinel at the very top of the
 * document rather than by a scroll listener — there is nothing to throttle, no
 * scroll position to read, and the browser does the work off the main thread.
 *
 * The sentinel's height is the threshold: once it has scrolled out of view, the
 * opening scene is behind us and the header contracts to the trigger alone.
 */
export function useHeaderState(sentinel: Ref<HTMLElement | null>) {
  const compact = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const node = sentinel.value
    if (!node) return
    observer = new IntersectionObserver(
      ([entry]) => {
        compact.value = !entry?.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(node)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { compact }
}
