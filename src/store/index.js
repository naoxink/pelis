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
        state.movieCollection.push(addedItem);
        state.totalSpent += Number(addedItem.cost) || 0;
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
        // La data aquí es el array de 100 (o el resto de 5)
        const response = await addToDB(data); 
        const addedItems = Array.isArray(response) ? response : [response];
        
        addedItems.forEach(item => {
            commit('saveMovieToState', item);
        });
    }
  },
  modules: {
  },
  plugins: []
})