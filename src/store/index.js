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
    saveMovieToState: (state, addedItem) => {
      // 1. Validamos que el objeto tenga lo necesario para no corromper el estado
      if (!addedItem) return;

      // 2. Insertamos en la colección
      state.movieCollection.push(addedItem);

      // 3. Sumamos al total gastado
      // Usamos Number() o el prefijo + para asegurar que no se concatene como string
      const cost = Number(addedItem.cost) || 0;
      state.totalSpent += cost;
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
    async addMoviesBatch({ commit }, data) {
        try {
            // Enviamos el array (lote de 100 o el resto)
            const response = await addToDB(data); 
            // Normalizamos la respuesta por si el server devuelve un objeto o array
            const addedItems = Array.isArray(response) ? response : [response];
            
            // Hacemos el commit para cada item o para el bloque
            addedItems.forEach(item => {
                commit('saveMovieToState', item);
            });
            
            return addedItems;
        } catch (error) {
            console.error("Error en el lote:", error);
            throw error;
        }
    }
  },
  modules: {
  },
  plugins: []
})