// FILE: main.js

import {Workbox} from 'workbox-window';

import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import Blocksley from '@blocksley/blocksley'

import Blogsley from './plugin'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

import { router } from "./router"
import { store } from "./store"

import { keycloak } from './boot/keycloak'

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js', { type: import.meta.env.DEV ? 'module' : 'classic' });

  wb.register();
}

keycloak
  .init({ checkLoginIframe: false })
  .then(() => {
    const app = createApp(App)

    app.use(router)
    
    app.use(store)
    
    app.use(Blocksley)
    
    app.use(Blogsley)
    
    // Assumes you have a <div id="app"></div> in your index.html
    app.mount('#app')
  })
