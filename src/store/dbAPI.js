const API_BASE_URL = 'https://pelis-api-hazel.vercel.app/api'

const API_REQUEST_HEADERS = {
    'Content-Type': 'application/json'
}

export const addToAPI = async data => {
  const nuevaPelicula = data;
  const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: API_REQUEST_HEADERS,
      body: JSON.stringify(nuevaPelicula)
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

export const getFromAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'GET',
      headers: API_REQUEST_HEADERS
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json();
}

export const getDetailFromAPI = async id => {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'GET',
      headers: API_REQUEST_HEADERS
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json();
}

export const removeFromAPI = async id => {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: API_REQUEST_HEADERS
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.status === 204
}

export const updateInAPI = async (id, data) => {
  if (data.id) delete data.id;
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'PUT',
      headers: API_REQUEST_HEADERS,
      body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.status === 200
}

export const clearCollectionInAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/movies/`, {
      method: 'DELETE',
      headers: API_REQUEST_HEADERS
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.status === 200
}