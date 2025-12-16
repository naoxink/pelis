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

const HASHED_STRING = '5105d8f593cc9aa310d7d9052f26cb7b069233328b7eeaae5cb82dc904b94fa2';

// 1. Envolver la lógica principal en una función asíncrona (IIFE)
(async function checkAuth() {
    // Si ya está autenticado o tiene la clave, salimos
    if (window.auth || localStorage.getItem('ak')) {
        return; 
    }

    // 2. Pedir la entrada (Esto es síncrono y bloquea la ejecución, lo cual está bien aquí)
    const psst = window.prompt('psst!');

    // 3. Comprobar si el usuario canceló (psst será null)
    if (psst === null || psst.trim() === '') {
        console.log('Autenticación cancelada o vacía.');
        return;
    }

    try {
        // 4. Calcular el hash de forma ASÍNCRONA
        const hashed = await hashString(psst, 'SHA-256'); // Asegúrate de usar el mismo algoritmo que generó HASHED_STRING

        // 5. Comprobar la coincidencia
        if (hashed === HASHED_STRING) {
            localStorage.setItem('ak', HASHED_STRING);
            console.log('¡Autenticación exitosa!');
        } else {
            console.log('Hash incorrecto.');
        }
    } catch (error) {
        console.error('Error al calcular el hash o falta la función hashString:', error);
    }
})(); // Auto-invocación inmediata

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')