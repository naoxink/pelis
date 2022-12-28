class MyIndexedDB {

  constructor(dbName, storeName = null, indexKey = null) {
    this.dbName = dbName
    this.storeName = storeName
    this.indexKey = indexKey
    this.indexedDB = indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    this.transaction = null
    this.db = null
  }

  connectDB() {
    const _this = this
    return new Promise((res, rej) => {
      const requestDB = this.indexedDB.open(this.dbName, 1)

      requestDB.onerror = rej

      requestDB.onupgradeneeded = e => {
        _this.db = e.target.result

        if (this.storeName) {
          this.createStore(this.storeName, this.indexKey)
        }
        return res()
      }

      requestDB.onsuccess = e => {
        _this.db = e.target.result
        return res()
      }
    })
  }

  createStore(storeName, indexKey) {
    this.storeName = storeName
    this.indexKey = indexKey || 'id'
    const storeObj = this.getStoreObject(this.storeName, { keyPath: this.indexKey })
    this.createIndex(storeObj, this.indexKey, { unique: true })
  }

  getStoreObject(storeName, options = {}) {
    return this.db.createObjectStore(storeName, options)
  }

  createIndex(storeObject, key, options = {}) {
    storeObject.createIndex(key, key, options)
  }

  insert(storeName, object) {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const storeObj = transaction.objectStore(storeName)
      if (Array.isArray(object)) {
        data.forEach(obj => storeObj.add(obj))
      } else {
        storeObj.add(obj)
      }
      transaction.onerror = rej
      transaction.oncomplete = res
    })
  }

  findByIndex(storeName, value) {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const storeObj = transaction.objectStore(storeName)
      storeObj.get(value).onsuccess = e => res(e.target.result)
    })
  }

  findAll(storeName) {
    return new Promise((res, rej) => {
      const transaction = db.transaction([storeName], 'readonly')
      const objStore = transaction.objectStore(storeName)
      objStore.getAll().onsuccess = e => res(e.target.result)
    })
  }

  removeByIndex(storeName, value) {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const storeObj = transaction.objectStore(storeName)
      storeObj.delete(value).onsuccess = e => res(e)
    })
  }

  removeAll(storeName) {
    return new Promise((res, rej) => {
      const transaction = db.transaction([storeName], 'readwrite')
      const objStore = transaction.objectStore(storeName)
      objStore.clear().onsuccess = e => res(e)
    })
  }

  updateByIndex(storeName, value, data) {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const storeObj = transaction.objectStore(storeName)
      storeObj.get(value).onsuccess = e => {
        const item = e.target.result
        const updateData = Object.assign({}, item, data)
        storeObj.put(updateData).onsuccess = e => {
          this.findByIndex(item[this.indexKey]).then(res)
        }
      }
    })
  }

}