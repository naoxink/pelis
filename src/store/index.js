import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

const inCollection = (state, id) => {
  return !!state.movieCollection[id]
}

const recalculateTotalSpent = state => {
  let total = 0
  for(let id in state.movieCollection){
    total += +state.movieCollection[id].cost
  }
  return total
}

export default new Vuex.Store({
  state: {
    movieCollection: {},
    totalSpent: 0
  },
  mutations: {
    addMovie(state, data){
      if(!inCollection(state, data.id)){
        state.movieCollection[data.id] = data
        state.movieCollection[data.id].addDate = Date.now()
        state.totalSpent += +data.cost
      }
    },
    clearCollection(state){
      state.movieCollection = {}
      state.totalSpent = 0
    },
    removeMovie(state, id){
      if(!inCollection(state, id)) return false
      Vue.delete(state.movieCollection, id)
      state.totalSpent = recalculateTotalSpent(state)
    },
    importCollection(state, data){
      state.movieCollection = data.movieCollection
      state.totalSpent = data.totalSpent
    },
    editMovie(state, data){
      const updatedItem = Object.assign({}, state.movieCollection[data.id], data)
      Vue.set(state.movieCollection, data.id, updatedItem)
      state.totalSpent = recalculateTotalSpent(state)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
