/**
 * v-ripple — MD3 ripple that expands from the pointer and clips to the host
 * shape. Ported from official-site/src/directives/ripple.ts.
 *
 * Adds .md-ripple-host (position: relative + overflow: hidden, base.css) so it
 * can sit on any element, including ones whose radius comes from other classes.
 */
function isDisabled(el) {
  return (
    el.hasAttribute('disabled') ||
    el.getAttribute('aria-disabled') === 'true' ||
    el.classList.contains('md-disabled')
  )
}

function spawnRipple(el, event) {
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  const size = Math.max(rect.width, rect.height) * 2
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const ripple = document.createElement('span')
  ripple.className = 'md-ripple'
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x - size / 2 + 'px'
  ripple.style.top = y - size / 2 + 'px'
  ripple.addEventListener('animationend', () => ripple.remove())
  // Guard against the animation never firing (reduced motion / hidden tab).
  window.setTimeout(() => ripple.remove(), 1000)
  el.appendChild(ripple)
}

export const vRipple = {
  mounted(el) {
    el.classList.add('md-ripple-host')
    const handler = (event) => {
      if (isDisabled(el)) return
      spawnRipple(el, event)
    }
    el.__mdRippleHandler = handler
    el.addEventListener('pointerdown', handler)
  },
  unmounted(el) {
    if (!el.__mdRippleHandler) return
    el.removeEventListener('pointerdown', el.__mdRippleHandler)
    delete el.__mdRippleHandler
  },
}