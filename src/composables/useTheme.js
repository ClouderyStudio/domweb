/**
 * Theme preference, ported from official-site/src/composables/useTheme.ts.
 *
 * 'system' follows the OS setting; an explicit light/dark choice wins and is
 * remembered under the same localStorage key the official site uses, so a
 * visitor who picked a scheme there keeps it on the domain pages too.
 */
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'cloudery-theme'

const preference = ref('system')
const systemDark = ref(false)
let initialized = false
let transitionTimer = 0

const isDark = computed(() => (preference.value === 'system' ? systemDark.value : preference.value === 'dark'))

/** Reflect the resolved scheme on <html>. `animate` wraps the change in
 *  .md-theme-transition (styles/motion.css) so every themed surface cross-fades
 *  instead of snapping; the first paint deliberately skips it. */
function apply(animate = true) {
  const root = document.documentElement

  if (animate) {
    root.classList.add('md-theme-transition')
    window.clearTimeout(transitionTimer)
    transitionTimer = window.setTimeout(() => root.classList.remove('md-theme-transition'), 400)
  }

  root.classList.toggle('dark', isDark.value)
  root.style.colorScheme = isDark.value ? 'dark' : 'light'
}

/** Initialise once: read the stored preference and follow the OS setting. */
export function initTheme() {
  if (initialized) return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') preference.value = stored

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = query.matches
  query.addEventListener('change', (event) => {
    systemDark.value = event.matches
    apply()
  })

  apply(false)
}

export function useTheme() {
  function setPreference(value) {
    preference.value = value
    localStorage.setItem(STORAGE_KEY, value)
    apply()
  }

  function toggle() {
    setPreference(isDark.value ? 'light' : 'dark')
  }

  watch(isDark, () => apply())

  return { preference, isDark, setPreference, toggle }
}