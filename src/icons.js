/**
 * Icon registry.
 *
 * Inline SVG path data, extracted from @iconify-json/material-symbols (Google's
 * Material Symbols, the MD3 icon set) and @iconify-json/simple-icons (brand
 * marks), then inlined here with plain render functions — the page ships ten
 * glyphs, which does not justify an icon plugin or a runtime icon fetch.
 * The full registry with the same names lives in
 * E:\\.Cloudery\\Website\\official-site\\src\\icons.ts.
 *
 * Usage: <M3Icon :icon="IconDomain" :size="20" />
 */
import { h } from 'vue'

/** Build an icon component from raw SVG body markup. */
function defineIcon(name, body) {
  return {
    name,
    // Attributes are merged by hand so the caller's class lands on the <svg> itself.
    inheritAttrs: false,
    setup(_props, { attrs }) {
      return () =>
        h('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: '1em',
          height: '1em',
          fill: 'currentColor',
          focusable: 'false',
          'aria-hidden': 'true',
          ...attrs,
          // Vue writes this through innerHTML, so the glyph needs no v-html in a template.
          innerHTML: body,
        })
    },
  }
}
export const IconDarkMode = defineIcon("IconDarkMode", "<path fill=\"currentColor\" d=\"M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21\"/>")
export const IconLightMode = defineIcon("IconLightMode", "<path fill=\"currentColor\" d=\"M8.463 15.538Q7 14.075 7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17t-3.537-1.463M5 13H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525z\"/>")
export const IconDomain = defineIcon("IconDomain", "<path fill=\"currentColor\" d=\"M2 21V3h10v4h10v14zm2-2h2v-2H4zm0-4h2v-2H4zm0-4h2V9H4zm0-4h2V5H4zm4 12h2v-2H8zm0-4h2v-2H8zm0-4h2V9H8zm0-4h2V5H8zm4 12h8V9h-8v2h2v2h-2v2h2v2h-2zm4-6v-2h2v2zm0 4v-2h2v2z\"/>")
export const IconContentCopy = defineIcon("IconContentCopy", "<path fill=\"currentColor\" d=\"M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z\"/>")
export const IconCheck = defineIcon("IconCheck", "<path fill=\"currentColor\" d=\"m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z\"/>")
export const IconArrowOutward = defineIcon("IconArrowOutward", "<path fill=\"currentColor\" d=\"M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z\"/>")
export const IconShield = defineIcon("IconShield", "<path fill=\"currentColor\" d=\"M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22\"/>")
export const IconMail = defineIcon("IconMail", "<path fill=\"currentColor\" d=\"M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z\"/>")
export const IconForum = defineIcon("IconForum", "<path fill=\"currentColor\" d=\"M7 18q-.425 0-.712-.288T6 17v-2h13V6h2q.425 0 .713.288T22 7v15l-4-4zm-5-1V3q0-.425.288-.712T3 2h13q.425 0 .713.288T17 3v9q0 .425-.288.713T16 13H6z\"/>")
export const IconGithub = defineIcon("IconGithub", "<path fill=\"currentColor\" d=\"M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/>")
