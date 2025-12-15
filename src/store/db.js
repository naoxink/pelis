import {
  addToAPI,
  getDetailFromAPI,
  getFromAPI,
  removeFromAPI,
  updateInAPI,
  clearCollectionInAPI
} from './dbAPI.js'

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
    'game': 'Game',
    'centromail': 'Centro Mail'
  },
  formats: {
    'br': 'Bluray',
    'dvd': 'DVD'
  }
}

const init = function (e) {
  getAllFromDB().then((collection) => {
    baseState.movieCollection = collection
    // No pelis, no party
    if (!collection.length) return false
    // Calcular el total invertido
    baseState.totalSpent = recalculateTotalSpent(baseState)
    // Miramos si la que hay guardada en el localStorage es la sugerida de hoy
    const suggestedFromLocal = getFromLocalStorage('config.suggestedToday')

    if (suggestedFromLocal && suggestedFromLocal.id && isToday(suggestedFromLocal.date)) {

      // Antes de pedir detalle a la API vamos a comprobar que existe en la colección
      if (!collection.some(movie => movie.id === suggestedFromLocal.id)) {
        // Si no existe generamos una nueva
        const suggestedTodayNew = {
          date: Date.now(),
          id: collection[random(0, collection.length - 1)].id
        }
        baseState.suggestedToday = suggestedTodayNew
        setToLocalStorage('config.suggestedToday', suggestedTodayNew)
        return;
      }

      getFromDB(suggestedFromLocal.id)
        .then(item => {
          if (item) {
            baseState.suggestedToday = {
              date: item.date,
              id: item.id
            }
          } else {
            const suggestedTodayNew = {
              date: Date.now(),
              id: collection[random(0, collection.length - 1)].id
            }
            baseState.suggestedToday = suggestedTodayNew
            setToLocalStorage('config.suggestedToday', suggestedTodayNew)
          }
        }
      )
      .catch(e => {
        const suggestedTodayNew = {
          date: Date.now(),
          id: collection[random(0, collection.length - 1)].id
        }
        baseState.suggestedToday = suggestedTodayNew
        setToLocalStorage('config.suggestedToday', suggestedTodayNew)
      })

    } else {
      const suggestedTodayNew = {
        date: Date.now(),
        id: collection[random(0, collection.length - 1)].id
      }
      baseState.suggestedToday = suggestedTodayNew
      setToLocalStorage('config.suggestedToday', suggestedTodayNew)
    }

  }).catch(console.error)
}

export const recalculateTotalSpent = state => {
  return state.movieCollection.reduce((acc, item) => {
    acc += +item.cost
    return acc
  }, 0)
}

export const random = (min, max) => {
  return Math.round(min + Math.random() * (max - min))
}

export const isToday = time => {
  const date = new Date(+time).toLocaleString().split(' ').shift()
  const today = new Date().toLocaleString().split(' ').shift()
  return date === today
}

export const addToDB = data => new Promise((resolve, reject) => {
  if (Array.isArray(data)) {
    data.forEach(async (item) => {
      try {
        await addToAPI(item)
      } catch(error) {
        reject(error)
      }
    })
    resolve(data)
  } else {
    addToAPI(data)
      .then(resolve)
      .catch(reject)
  }
})

export const getFromDB = id => new Promise((resolve, reject) => {
  getDetailFromAPI(id)
  .then(resolve)
  .catch(reject)
})

export const removeFromDB = id => new Promise((resolve, reject) => {
  removeFromAPI(id)
  .then(resolve)
  .catch(reject)
})

export const updateFromDB = (id, data) => new Promise((resolve, reject) => {
  updateInAPI(id, data)
  .then(resolve)
  .catch(reject)
})

export const getAllFromDB = () => new Promise((resolve, reject) => {
  getFromAPI().then(list => {
    list = list.map(m => {
      m.addDate = new Date(m.addDate)
      return m
    })
    resolve(list)
  }).catch(reject)
})

export const clearDB = () => new Promise((resolve, reject) => {
  clearCollectionInAPI()
  .then(resolve)
  .catch(reject)
})

////////////////////////
// vvv  LISTAS  vvv   //
////////////////////////
/* export const getList = (listId) => new Promise((resolve, reject) => {
  const objStore = db.transaction(['lists'], 'readonly').objectStore('lists')
  objStore.get(listId).onsuccess = e => resolve(e.target.result)
})

export const createList = (listName) => new Promise((resolve, reject) => {
  const listId = Math.random().toString().substring(2) + new Date().getTime()
  const objStore = db.transaction(['lists'], 'readwrite').objectStore('lists')
  objStore.put({
    id: listId,
    name: listName,
    movies: []
  }).onsuccess = e => resolve()
})

export const editList = (listId, data) => new Promise((resolve, reject) => {
  const objStore = db.transaction(['lists'], 'readwrite').objectStore('lists')
  objStore.get(listId).onsuccess = e => {
    const item = e.target.result
    const updatedData = Object.assign({}, item, data)
    objStore.put(updatedData).onsuccess = e => {
      getList(updatedData.id).then(e => resolve(e))
    }
  }
})

export const deleteList = (listId) => new Promise((resolve, reject) => {
  const objStore = db.transaction(['lists'], 'readwrite').objectStore('lists')
  objStore.delete(id).onsuccess = e => resolve(e)
})

export const addMovieToList = (listId, movie) => new Promise((resolve, reject) => {
  const objStore = db.transaction(['lists'], 'readwrite').objectStore('lists')
  objStore.get(listId).onsuccess = e => {
    const listData = e.target.result
    const exists = listData.movies.findIndex(mid => mid === movie.id)
    if(exists === -1){
      return resolve()
    }
    listData.movies.push(movie.id)
    objStore.put(listData).onsuccess = e => resolve(listData)
  } // Fin get
})

export const deleteMovieFromList = (listId, movie) => new Promise((resolve, reject) => {
  const objStore = db.transaction(['lists'], 'readwrite').objectStore('lists')
  objStore.get(listId).onsuccess = e => {
    const listData = e.target.result
    const exists = listData.movies.findIndex(mid => mid === movie.id)
    if(exists !== -1){
      return resolve()
    }
    listData.movies = listData.movies.filter(mid => mid !== movie.id)
    objStore.put(listData).onsuccess = e => resolve(listData)
  } // Fin get
}) */
////////////////////////
// ^^^  LISTAS  ^^^   //
////////////////////////

export const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key))

export const setToLocalStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data))

export const DBBaseState = baseState

init();