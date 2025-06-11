'use client'

import { useState } from 'react'
import { isValidImageUrl } from '@/utils/imageUtils'

interface ImagePreviewProps {
  src: string
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
  placeholder?: string
}

export default function ImagePreview({ 
  src, 
  alt, 
  className = "w-16 h-16 object-cover rounded", 
  fallbackIcon,
  placeholder 
}: ImagePreviewProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  if (!src || !isValidImageUrl(src) || imageError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300`}>
        {fallbackIcon || (
          <span className="text-gray-400 text-xs text-center px-1">
            {placeholder || 'Sin imagen'}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`${className} bg-gray-100 flex items-center justify-center border animate-pulse`}>
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} border transition-opacity duration-300 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true)
          setImageLoading(false)
        }}
      />
    </div>
  )
}