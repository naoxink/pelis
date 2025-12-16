import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

async function hashString(str, algorithm = 'SHA-256') {
  // 1. Codificar el string a un ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // 2. Calcular el hash
  const hashBuffer = await crypto.subtle.digest(algorithm, data); // 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'

  // 3. Convertir el ArrayBuffer a una cadena hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const HASHED_STRING = '5105d8f593cc9aa310d7d9052f26cb7b069233328b7eeaae5cb82dc904b94fa2'
if (!window.auth && !localStorage.getItem('ak')) {
  const psst = prompt('psst!')
  (async () => {
    if (await hashString(psst) === HASHED_STRING) {
      window.auth = true
      localStorage.setItem('ak', HASHED_STRING)
    }
  })()
}

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')