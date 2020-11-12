import Vue from 'vue'
import Vuex from 'vuex'

const requestDB = window.indexedDB.open('pelisDB', 1)
let db = null

requestDB.onerror = function(e){
  throw new Error(e.target.errorCode)
}

requestDB.onupgradeneeded = function(e){
  db = e.target.result
  const objStore = db.createObjectStore('collection', { keyPath: 'id' })
  objStore.createIndex('id', 'id', { unique: true })
}

requestDB.onsuccess = function(e){
  db = e.target.result
  getAllFromDB().then((collection) => {
    baseState.movieCollection = collection
    // No pelis, no party
    if(!collection.length) return false
    // Miramos si la que hay guardada en el localStorage es la sugerida de hoy
    const suggestedFromLocal = getFromLocalStorage('config.suggestedToday')
    if(suggestedFromLocal && isToday(suggestedFromLocal.date)){
      getFromDB(suggestedFromLocal.id).then(item => {
        if(item){
          baseState.suggestedToday = {
            date: item.date,
            id: item.id
          }
        }else{
          const suggestedTodayNew = {
            date: Date.now(),
            id: collection[random(0, collection.length - 1)].id
          }
          baseState.suggestedToday = suggestedTodayNew
          setToLocalStorage('config.suggestedToday', suggestedTodayNew)
        }
      })
      
    }else{
      const suggestedTodayNew = {
        date: Date.now(),
        id: collection[random(0, collection.length - 1)].id
      }
      baseState.suggestedToday = suggestedTodayNew
      setToLocalStorage('config.suggestedToday', suggestedTodayNew)
    }
  })
}

Vue.use(Vuex)

const recalculateTotalSpent = state => {
  return state.movieCollection.reduce((acc, item) => {
    acc += +item.cost
    return acc
  }, 0)
  let total = 0
  for(let id in state.movieCollection){
    total += +state.movieCollection[id].cost
  }
  return total
}

const random = (min, max) => {
  return Math.round(min + Math.random() * (max - min))
}

const isToday = time => {
  const date = new Date(+time).toLocaleString().split(' ').shift()
  const today = new Date().toLocaleString().split(' ').shift()
  return date === today
}

const addToDB = data => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  if(Array.isArray(data)){
    data.forEach(item => objStore.add(item))
  }else{
    objStore.add(data)
  }
  transaction.onerror = e => reject(e)
  transaction.oncomplete = e => resolve(true)
})

const getFromDB = id => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readonly')
  const objStore = transaction.objectStore('collection')
  objStore.get(id).onsuccess = e => resolve(e.target.result)
})

const removeFromDB = id => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  objStore.delete(id).onsuccess = e => resolve(e)
})

const updateFromDB = (id, data) => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  objStore.get(id).onsuccess = e => {
    const item = e.target.result
    const updatedData = Object.assign({}, item, data)
    objStore.put(updatedData).onsuccess = e => {
      getFromDB(updatedData.id).then(e => resolve(e))
    }
  }
})

const getAllFromDB = () => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readonly')
  const objStore = transaction.objectStore('collection')
  objStore.getAll().onsuccess = e => {
    e.target.result.sort((a, b) => +a.addDate - +b.addDate)
    resolve(e.target.result)
  }
})

const clearDB = () => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  objStore.clear().onsuccess = e => {
    resolve(e)
  }
})

const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key))

const setToLocalStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data))

const baseState = {
  movieCollection: {},
  totalSpent: 0,
  suggestedToday: {
    date: null,
    id: ''
  }
}

export default new Vuex.Store({
  state: baseState,
  mutations: {
    setCollection(state, collection){
      state.movieCollection = collection
    },
    addMovie(state, data){
      data.addDate = Date.now()
      addToDB(data).then(() => {
        state.movieCollection.push(data)
        state.totalSpent += +data.cost
      })
    },
    clearCollection(state){
      clearDB().then(() => {
        state.movieCollection = []
        state.totalSpent = 0
      })
    },
    removeMovie(state, id){
      removeFromDB(id).then(() => {
        const index = state.movieCollection.findIndex(m => m.id === id)
        Vue.delete(state.movieCollection, index)
        state.totalSpent = recalculateTotalSpent(state)  
      })
    },
    importCollection(state, data){
      clearDB().then((e) => {
        addToDB(data.movieCollection).then(e => {
          state.movieCollection = data.movieCollection
          state.totalSpent = data.totalSpent
        })
      })
    },
    editMovie(state, data){
      updateFromDB(data.id, data).then(updatedMovie => {
        const index = state.movieCollection.findIndex(item => item.id === data.id)
        Vue.set(state.movieCollection, index, updatedMovie)
        state.totalSpent = recalculateTotalSpent(state)  
      })
    }
  },
  actions: {
    getMovie({ commit, state }, data){
      return getFromDB(data.id)
    }
  },
  modules: {
  },
  plugins: []
})
