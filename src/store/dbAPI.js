const API_BASE_URL = 'https://pelis-api-hazel.vercel.app/api'

const API_REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

export const addToAPI = async data => {
  const response = await callAPI('POST', '/movies', data)
  return await response.json()
}

export const getFromAPI = async () => {
  const response = await callAPI('GET', '/movies')
  return await response.json();
}

export const getDetailFromAPI = async id => {
  const response = await callAPI('GET', `/movies/${id}`)
  return await response.json();
}

export const removeFromAPI = async id => {
  const response = await callAPI('DELETE', `/movies/${id}`)
  return response.status === 204
}

export const updateInAPI = async (id, data) => {
  if (data.id) delete data.id;
  const response = await callAPI('PUT', `/movies/${id}`, data)
  return response.status === 200
}

export const clearCollectionInAPI = async () => {
  const response = await callAPI('DELETE', '/movies/')
  return response.status === 200
}

export const callAPI = async (method, path, data) => {
  if (!localStorage.getItem('ak')) {
    throw new Error('Error! Invalid auth.')
  }

  const payload = {
    method,
    headers: API_REQUEST_HEADERS
  }

  if (data) {
    payload.body = JSON.stringify(data)
  }
  const response = await fetch(`${API_BASE_URL}${path}`, payload)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response
}