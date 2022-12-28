import Vue from 'vue'
import Vuex from 'vuex'
import {
  recalculateTotalSpent,
  random,
  isToday,
  addToDB,
  getFromDB,
  removeFromDB,
  updateFromDB,
  getAllFromDB,
  clearDB,
  getList,
  createList,
  editList,
  deleteList,
  addMovieToList,
  deleteMovieFromList,
  getFromLocalStorage,
  setToLocalStorage
} from './db.js'


Vue.use(Vuex)

const baseState = {
  movieCollection: {},
  totalSpent: 0,
  suggestedToday: {
    date: null,
    id: ''
  },
  stores: {
    'amazon': 'Amazon',
    'elcorteingles': 'El corte Inglés',
    'fnac': 'Fnac',
    'cex': 'Cex',
    'carrefour': 'Carrefour',
    'selectavision': 'Selecta Visión',
    'mediamarkt': 'Mediamarkt',
    'game': 'Game'
  }
}

export default new Vuex.Store({
  state: baseState,
  mutations: {
    setCollection(state, collection) {
      state.movieCollection = collection
    },
    addMovie: async (state, data) => {
      if (!data.addDate) {
        data.addDate = Date.now()
      }
      addToDB(data).then(() => {
        state.movieCollection.push(data)
        state.totalSpent += +data.cost
      })
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
        addToDB(data.movieCollection).then(e => {
          state.movieCollection = data.movieCollection
          state.totalSpent = data.totalSpent
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
