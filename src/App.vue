<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTheme } from './composables/useTheme'
import M3Button from './components/m3/M3Button.vue'
import M3Icon from './components/m3/M3Icon.vue'
import M3IconButton from './components/m3/M3IconButton.vue'
import {
  IconArrowOutward,
  IconCheck,
  IconContentCopy,
  IconDarkMode,
  IconDomain,
  IconForum,
  IconGithub,
  IconLightMode,
  IconMail,
  IconShield,
} from './icons'

const officialSite = 'https://www.cldery.com'
const githubOrg = 'https://github.com/ClouderyStudio'
const qqGroup = 'https://qm.qq.com/q/Fg3aqm6ccW'
const contactEmail = 'admin@cldery.com'

const { isDark, toggle } = useTheme()

const hostname = ref('')
// 'idle' | 'copied' | 'failed' — the failure branch tells the visitor to select the
// hostname by hand instead of silently doing nothing.
const copyState = ref('idle')
const year = new Date().getFullYear()
let copyTimer = 0

const copyStatusText = computed(() => {
  if (copyState.value === 'copied') return '域名已复制到剪贴板'
  if (copyState.value === 'failed') return '复制失败，请手动选中域名复制'
  return '这个域名并不是我们的官网地址，请通过下面的按钮前往官网。'
})

onMounted(() => {
  // window.location.hostname is empty for file:// and some intranet hosts.
  hostname.value = window.location.hostname || window.location.host || ''
  if (hostname.value) document.title = hostname.value + ' · 云术工作室'
})

/**
 * Copy the hostname. The async Clipboard API needs a secure context, so a
 * localhost / http preview falls back to the legacy selection copy.
 */
async function copyDomain() {
  const value = hostname.value
  if (!value) return

  let done = false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      done = true
    }
  } catch (error) {
    done = false
  }

  if (!done) {
    try {
      const field = document.createElement('textarea')
      field.value = value
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.top = '-1000px'
      document.body.appendChild(field)
      field.select()
      done = document.execCommand('copy')
      field.remove()
    } catch (error) {
      done = false
    }
  }

  copyState.value = done ? 'copied' : 'failed'
  window.clearTimeout(copyTimer)
  copyTimer = window.setTimeout(() => {
    copyState.value = 'idle'
  }, 2400)
}
</script>

<template>
  <div class="page">
    <div class="page__glow page__glow--primary" aria-hidden="true"></div>
    <div class="page__glow page__glow--tertiary" aria-hidden="true"></div>

    <div class="page__bar">
      <M3IconButton
        :icon="isDark ? IconLightMode : IconDarkMode"
        :label="isDark ? '切换到浅色主题' : '切换到深色主题'"
        @click="toggle"
      />
    </div>

    <main class="page__main">
      <section class="visit">
        <div class="visit__brand">
          <img
            class="visit__logo"
            src="/logo.webp"
            alt="云术工作室 Cloudery Studio"
            width="1000"
            height="366"
            decoding="async"
            draggable="false"
          />
        </div>

        <h1 class="visit__title md-typescale-headline-small">这个域名属于云术工作室</h1>

        <p class="visit__text md-typescale-body-medium">
          您正在访问的域名由云术工作室持有。它可能是我们某个项目的入口域名、一项服务的子域，或者一个已经停止维护的旧域名。
        </p>

        <div class="domain">
          <M3Icon :icon="IconDomain" :size="20" class="domain__icon" />
          <span class="domain__value">{{ hostname }}</span>
          <M3IconButton
            class="domain__copy"
            size="sm"
            :icon="copyState === 'copied' ? IconCheck : IconContentCopy"
            :label="copyState === 'copied' ? '已复制域名' : '复制域名'"
            @click="copyDomain"
          />
        </div>

        <p class="visit__status md-typescale-body-small" aria-live="polite">
          {{ copyStatusText }}
        </p>

        <div class="visit__actions">
          <M3Button
            variant="filled"
            size="lg"
            block
            :href="officialSite"
            :trailing-icon="IconArrowOutward"
          >
            进入云术工作室官网
          </M3Button>
          <span class="visit__url md-typescale-body-small">www.cldery.com</span>
        </div>

        <ul class="links">
          <li>
            <a class="link" :href="'mailto:' + contactEmail">
              <M3Icon :icon="IconMail" :size="18" />
              <span>邮箱</span>
            </a>
          </li>
          <li>
            <a class="link" :href="githubOrg" target="_blank" rel="noopener">
              <M3Icon :icon="IconGithub" :size="18" />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a class="link" :href="qqGroup" target="_blank" rel="noopener">
              <M3Icon :icon="IconForum" :size="18" />
              <span>QQ 群</span>
            </a>
          </li>
        </ul>

        <p class="visit__privacy md-typescale-body-small">
          <M3Icon :icon="IconShield" :size="16" />
          <span>本页面仅用于说明域名归属，不会收集或上传任何信息。</span>
        </p>
      </section>
    </main>

    <p class="page__footer md-typescale-label-small">© {{ year }} 云术工作室 Cloudery Studio</p>
  </div>
</template>

<style scoped>
/* ---------- Shell ---------- */
.page {
  --rise-step: 70ms;
  --rise-travel: 10px;
  position: relative;
  z-index: 0;
  min-block-size: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: calc(28px + env(safe-area-inset-top)) 20px calc(28px + env(safe-area-inset-bottom));
  overflow: hidden;
  background-color: var(--md-sys-color-surface);
}

/* Two brand glows replace the old flat purple gradient: one primary, one
   tertiary, drifting slowly. Decorative only, so they stop under reduced motion. */
.page__glow {
  position: absolute;
  inline-size: min(58vw, 560px);
  block-size: min(58vw, 560px);
  border-radius: var(--md-sys-shape-corner-full);
  pointer-events: none;
  z-index: 0;
  animation: glow-drift 26s ease-in-out infinite alternate;
}
.page__glow--primary {
  top: min(-16vw, -110px);
  left: min(-14vw, -90px);
  background: radial-gradient(circle, color-mix(in srgb, var(--md-sys-color-primary) 26%, transparent) 0%, transparent 70%);
}
.page__glow--tertiary {
  right: min(-14vw, -90px);
  bottom: min(-18vw, -130px);
  background: radial-gradient(circle, color-mix(in srgb, var(--md-sys-color-tertiary) 24%, transparent) 0%, transparent 70%);
  animation-delay: -9s;
}

@keyframes glow-drift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(0, 26px, 0) scale(1.12);
  }
}

.page__bar {
  position: fixed;
  z-index: 2;
  top: calc(14px + env(safe-area-inset-top));
  right: calc(14px + env(safe-area-inset-right));
}

.page__main {
  position: relative;
  z-index: 1;
  inline-size: 100%;
  display: flex;
  justify-content: center;
}

.page__footer {
  position: relative;
  z-index: 1;
  color: var(--md-sys-color-on-surface-variant);
  text-align: center;
}

/* ---------- Card ---------- */
.visit {
  inline-size: 100%;
  max-inline-size: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 36px 32px 28px;
  border-radius: var(--md-sys-shape-corner-extra-large);
  background-color: var(--site-surface-raised);
  box-shadow: var(--md-sys-elevation-level2);
  text-align: center;
  animation: card-in var(--md-sys-motion-duration-extra-long1)
    var(--md-sys-motion-easing-emphasized-decelerate) both;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translate3d(0, calc(var(--rise-travel) + 6px), 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Children arrive just behind the card, one after another. */
.visit > * {
  animation: item-in var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized-decelerate)
    both;
  animation-delay: calc(140ms + var(--i, 0) * var(--rise-step));
}
.visit > :nth-child(1) { --i: 0; }
.visit > :nth-child(2) { --i: 1; }
.visit > :nth-child(3) { --i: 2; }
.visit > :nth-child(4) { --i: 3; }
.visit > :nth-child(5) { --i: 4; }
.visit > :nth-child(6) { --i: 5; }
.visit > :nth-child(7) { --i: 6; }
.visit > :nth-child(8) { --i: 7; }

@keyframes item-in {
  from {
    opacity: 0;
    transform: translate3d(0, var(--rise-travel), 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Brand ----------
   Local asset only (public/logo.webp, transcoded from the studio wordmark
   hosted at oss.cldery.com/web/site/logo.png). It already carries both
   "云术工作室" and "Cloudery Studio", so it replaces the old inline mark +
   text pair; the width/height attributes keep the 1200 x 439 ratio reserved
   before the image arrives. */
.visit__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  margin-block-end: 2px;
}

.visit__logo {
  inline-size: min(70%, 300px);
  block-size: auto;
  aspect-ratio: 1000 / 366;
  user-select: none;
  -webkit-user-drag: none;
}

/* ---------- Copy ---------- */
.visit__title {
  color: var(--md-sys-color-on-surface);
  text-wrap: balance;
}

.visit__text {
  max-inline-size: 42ch;
  color: var(--md-sys-color-on-surface-variant);
  text-wrap: pretty;
}

.domain {
  display: flex;
  align-items: center;
  gap: 10px;
  inline-size: 100%;
  padding: 8px 8px 8px 14px;
  border-radius: var(--md-sys-shape-corner-small);
  background-color: var(--md-sys-color-surface-container);
  box-shadow: inset 0 0 0 1px var(--md-sys-color-outline-variant);
}

.domain__icon {
  color: var(--md-sys-color-primary);
}

.domain__value {
  flex: 1;
  min-inline-size: 0;
  font-family: var(--md-ref-typeface-mono);
  font-size: var(--md-sys-typescale-title-medium-size);
  font-weight: var(--md-sys-typescale-title-medium-weight);
  line-height: 1.35;
  color: var(--md-sys-color-primary);
  text-align: left;
  overflow-wrap: anywhere;
}

.visit__status {
  min-block-size: 16px;
  color: var(--md-sys-color-on-surface-variant);
}

/* ---------- Actions ---------- */
.visit__actions {
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-block-start: 4px;
}

.visit__url {
  color: var(--md-sys-color-on-surface-variant);
  font-family: var(--md-ref-typeface-mono);
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 6px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--md-sys-typescale-label-large-size);
  font-weight: var(--md-sys-typescale-label-large-weight);
  line-height: 1;
  transition:
    background-color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard),
    color var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-standard);
}

@media (hover: hover) {
  .link:hover {
    background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
    color: var(--md-sys-color-on-surface);
  }
}

.visit__privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--md-sys-color-on-surface-variant);
  opacity: 0.85;
}

/* ---------- Responsive ---------- */
@media (max-width: 480px) {
  .visit {
    padding: 28px 22px 24px;
    gap: 14px;
  }

  .visit__logo {
    inline-size: min(84%, 240px);
  }

  .visit__title {
    font-size: var(--md-sys-typescale-title-large-size);
    line-height: var(--md-sys-typescale-title-large-line-height);
  }

  .domain__value {
    font-size: var(--md-sys-typescale-body-large-size);
  }
}

/* ---------- Reduced motion ----------
   Trim, never delete: the entrances still play, just shorter and tighter, and
   the looping background drift is switched off. */
@media (prefers-reduced-motion: reduce) {
  .page {
    --rise-step: 20ms;
    --rise-travel: 4px;
  }

  .page__glow {
    animation: none;
  }
}
</style>