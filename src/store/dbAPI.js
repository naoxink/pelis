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
  return await response.json();
}