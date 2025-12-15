const requestDB = window.indexedDB.open('pelisDB', 1)
const API_BASE_URL = 'https://pelis-api-hazel.vercel.app/api';
let db = null

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

requestDB.onerror = function (e) {
  throw new Error(e.target.errorCode)
}

requestDB.onupgradeneeded = function (e) {
  db = e.target.result
  const objStore = db.createObjectStore('collection', { keyPath: 'id' })
  objStore.createIndex('id', 'id', { unique: true })
  const objStorelists = db.createObjectStore('lists', { keyPath: 'id' })
  objStorelists.createIndex('id', 'id', { unique: true })
}

requestDB.onsuccess = function (e) {
  db = e.target.result
  getAllFromDB().then((collection) => {
    baseState.movieCollection = collection
    // No pelis, no party
    if (!collection.length) return false
    // Calcular el total invertido
    baseState.totalSpent = recalculateTotalSpent(baseState)
    // Miramos si la que hay guardada en el localStorage es la sugerida de hoy
    const suggestedFromLocal = getFromLocalStorage('config.suggestedToday')
    if (suggestedFromLocal && isToday(suggestedFromLocal.date)) {
      getFromDB(suggestedFromLocal.id).then(item => {
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
      })

    } else {
      const suggestedTodayNew = {
        date: Date.now(),
        id: collection[random(0, collection.length - 1)].id
      }
      baseState.suggestedToday = suggestedTodayNew
      setToLocalStorage('config.suggestedToday', suggestedTodayNew)
    }
  })
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
  addToAPI(data)
  .then(resolve)
  .catch(reject)
/*   const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  if (Array.isArray(data)) {
    data.forEach(item => objStore.add(item))
  } else {
    objStore.add(data)
  }
  transaction.onerror = e => reject(e)
  transaction.oncomplete = e => resolve(true) */
})

export const addToAPI = async data => {
  const nuevaPelicula = data;
  const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaPelicula)
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json();
}

export const getFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  response = await response.json();
  return response;
}

export const getFromDB = id => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readonly')
  const objStore = transaction.objectStore('collection')
  objStore.get(id).onsuccess = e => resolve(e.target.result)
})

export const removeFromDB = id => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  objStore.delete(id).onsuccess = e => resolve(e)
})

export const updateFromDB = (id, data) => new Promise((resolve, reject) => {
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

export const getAllFromDB = () => new Promise((resolve, reject) => {
  getFromAPI().then(resolve).catch(reject)
/*   const transaction = db.transaction(['collection'], 'readonly')
  const objStore = transaction.objectStore('collection')
  objStore.getAll().onsuccess = e => {
    const results = e.target.result.map(m => {
      m.addDate = new Date(m.addDate)
      return m
    })
    resolve(results)
  } */
})

export const clearDB = () => new Promise((resolve, reject) => {
  const transaction = db.transaction(['collection'], 'readwrite')
  const objStore = transaction.objectStore('collection')
  objStore.clear().onsuccess = e => {
    resolve(e)
  }
})

////////////////////////
// vvv  LISTAS  vvv   //
////////////////////////
export const getList = (listId) => new Promise((resolve, reject) => {
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
})
////////////////////////
// ^^^  LISTAS  ^^^   //
////////////////////////

export const getFromLocalStorage = key => JSON.parse(window.localStorage.getItem(key))

export const setToLocalStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data))

export const DBBaseState = baseState
