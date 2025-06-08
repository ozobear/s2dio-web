import { NextResponse } from 'next/server'
import { getRandomVibingGif, getTrendingGif } from '@/lib/giphy'

export async function GET() {
  try {
    // Primero intenta obtener un GIF de "vibing"
    let gif = await getRandomVibingGif()
    
    // Si falla, intenta con trending
    if (!gif) {
      gif = await getTrendingGif()
    }
    
    // Si ambos fallan, devuelve un GIF de fallback
    if (!gif) {
      return NextResponse.json({
        id: 'fallback',
        title: 'MODO BRUTAL ACTIVADO',
        url: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
        thumbnail: 'https://media.giphy.com/media/13HgwGsXF0aiGY/200.gif'
      })
    }
    
    return NextResponse.json(gif)
  } catch (error) {
    console.error('Error in gif-of-the-day API:', error)
    
    // Fallback en caso de error
    return NextResponse.json({
      id: 'error-fallback',
      title: 'ERROR BRUTAL PERO DIVERTIDO',
      url: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
      thumbnail: 'https://media.giphy.com/media/13HgwGsXF0aiGY/200.gif'
    })
  }
}