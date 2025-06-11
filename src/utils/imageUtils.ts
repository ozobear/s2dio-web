/**
 * Verifica si una cadena es una URL válida de imagen
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false
  
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Verifica si una cadena es una URL de imagen basándose en la extensión
 */
export function isImageUrl(url: string): boolean {
  if (!isValidImageUrl(url)) return false
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']
  const urlLower = url.toLowerCase()
  
  return imageExtensions.some(ext => urlLower.includes(ext)) || 
         urlLower.includes('cloudinary') || 
         urlLower.includes('unsplash') ||
         urlLower.includes('amazonaws') ||
         urlLower.includes('googleusercontent') ||
         urlLower.includes('imgur')
}

/**
 * Obtiene las dimensiones de una imagen desde una URL
 */
export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = reject
    img.src = url
  })
}

/**
 * Valida el tamaño de un archivo de imagen
 */
export function validateImageSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

/**
 * Valida el tipo MIME de un archivo de imagen
 */
export function validateImageType(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return allowedTypes.includes(file.type)
}

/**
 * Genera un placeholder de imagen basado en el texto
 */
export function generateImagePlaceholder(text: string, size: number = 200): string {
  const firstLetter = text.charAt(0).toUpperCase()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  canvas.width = size
  canvas.height = size
  
  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#2196F3')
  gradient.addColorStop(1, '#9C27B0')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  // Texto
  ctx.fillStyle = 'white'
  ctx.font = `bold ${size * 0.4}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(firstLetter, size / 2, size / 2)
  
  return canvas.toDataURL()
}