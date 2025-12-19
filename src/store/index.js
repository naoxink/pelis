import Vue from 'vue'
import Vuex from 'vuex'
import {
  DBBaseState,
  recalculateTotalSpent,
  addToDB,
  getFromDB,
  removeFromDB,
  updateFromDB,
  clearDB,
} from './db.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: DBBaseState,
  mutations: {
    setCollection(state, collection) {
      state.movieCollection = collection
    },
    addMovie: async (state, data) => {
      // 1. Normalizamos la entrada: nos aseguramos de que data sea un array para procesarlo igual
      const itemsToAdd = Array.isArray(data) ? data : [data];

      // 2. Añadimos la fecha por defecto a cada película si no la tiene
      itemsToAdd.forEach(item => {
        if (!item.addDate) {
          item.addDate = Date.now();
        }
      });

      // 3. Enviamos a la DB (si data era array, enviamos array; si no, el objeto)
      // Nota: Si addToDB no maneja arrays, pásale 'itemsToAdd' directamente
      addToDB(data).then((response) => {
        // 4. Normalizamos la respuesta del servidor
        // El backend ahora puede devolver un objeto o un array de objetos guardados
        const addedItems = Array.isArray(response) ? response : [response];

        addedItems.forEach((addedItem) => {
          state.movieCollection.push(addedItem);
          state.totalSpent += +addedItem.cost;
        });
      }).catch(error => {
        console.error("Error al añadir película(s):", error);
      });
    },
    clearCollection(state) {
      clearDB().then(() => {
        location.reload()
        state.movieCollection = {}
        state.totalSpent = 0
      })
    },
    removeMovie(state, id) {
      removeFromDB(id).then(() => {
        const index = state.movieCollection.findIndex(m => m.id === id)
        Vue.delete(state.movieCollection, index)
        state.totalSpent = recalculateTotalSpent(state)
      })
    },
    importCollection(state, data) {
      clearDB().then((e) => {
        addToDB(data).then(e => {
          state.movieCollection = data
          state.totalSpent = recalculateTotalSpent(state)
        })
      })
    },
    editMovie(state, data) {
      updateFromDB(data.id, data).then(updatedMovie => {
        const index = state.movieCollection.findIndex(item => item.id === data.id)
        Vue.set(state.movieCollection, index, updatedMovie)
        state.totalSpent = recalculateTotalSpent(state)
      })
    },
    forceRecalcTotalSpent(state) {
      state.totalSpent = recalculateTotalSpent(state)
    }
  },
  actions: {
    getMovie({ commit, state }, data) {
      return getFromDB(data.id)
    },
  },
  modules: {
  },
  plugins: []
})