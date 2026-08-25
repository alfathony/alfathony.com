/**
 * Shared open/closed state for the primary navigation.
 *
 * `useState` rather than a module-scope `ref`: a module-scope ref is created
 * once per server process and would be shared between concurrent requests, so
 * one visitor opening the menu could serve an open menu to another.
 *
 * The state is shared because two places outside the panel need it — the header
 * flips the trigger to its on-colour variant, and the shell marks the page
 * content `inert` so nothing behind the overlay is reachable.
 */
export function useNavigation() {
  const open = useState<boolean>('navigation-open', () => false)

  return {
    open,
    openNav: () => { open.value = true },
    closeNav: () => { open.value = false },
    toggleNav: () => { open.value = !open.value }
  }
}
