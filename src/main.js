import { createApp } from 'vue'
import App from './App.vue'
import { initTheme } from './composables/useTheme'
import { vRipple } from './directives/ripple'
import '@/styles/index.css'

// Apply the stored colour scheme before the first paint. index.html already sets
// the class inline so there is no light flash while the bundle loads; this call
// re-applies it and starts following the OS setting.
initTheme()

createApp(App).directive('ripple', vRipple).mount('#app')