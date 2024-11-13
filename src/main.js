import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import router from './router'
import i18n from './i18n'
import { clickOutside } from './clickOutside'

createApp(App)
  .use(router)
  .use(i18n)
  .directive('click-outside', clickOutside)
  .mount('#app')
