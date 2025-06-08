const GIPHY_API_KEY = process.env.GIPHY_API_KEY || 'demo_api_key'
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'

interface GiphyGif {
  id: string
  title: string
  images: {
    original: {
      url: string
    }
    fixed_height: {
      url: string
    }
  }
}

interface GiphyResponse {
  data: GiphyGif[]
}

export async function getRandomVibingGif(): Promise<{
  id: string
  title: string
  url: string
  thumbnail: string
} | null> {
  try {
    // Buscar GIFs con el término "vibing"
    const response = await fetch(
      `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=vibing&limit=50&rating=g&lang=en`
    )
    
    if (!response.ok) {
      console.error('Error fetching from Giphy API')
      return null
    }
    
    const data: GiphyResponse = await response.json()
    
    if (data.data.length === 0) {
      return null
    }
    
    // Usar la fecha actual como seed para obtener el mismo GIF todo el día
    const today = new Date().toDateString()
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const randomIndex = seed % data.data.length
    
    const gif = data.data[randomIndex]
    
    return {
      id: gif.id,
      title: gif.title || 'Vibing GIF del día',
      url: gif.images.original.url,
      thumbnail: gif.images.fixed_height.url
    }
  } catch (error) {
    console.error('Error fetching random vibing GIF:', error)
    return null
  }
}

// Función para obtener GIF trending si el de vibing falla
export async function getTrendingGif(): Promise<{
  id: string
  title: string
  url: string
  thumbnail: string
} | null> {
  try {
    const response = await fetch(
      `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=25&rating=g`
    )
    
    if (!response.ok) {
      return null
    }
    
    const data: GiphyResponse = await response.json()
    
    if (data.data.length === 0) {
      return null
    }
    
    // Usar la fecha como seed
    const today = new Date().toDateString()
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const randomIndex = seed % data.data.length
    
    const gif = data.data[randomIndex]
    
    return {
      id: gif.id,
      title: gif.title || 'GIF trending del día',
      url: gif.images.original.url,
      thumbnail: gif.images.fixed_height.url
    }
  } catch (error) {
    console.error('Error fetching trending GIF:', error)
    return null
  }
}