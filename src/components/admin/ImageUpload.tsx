// src/components/admin/ImageUpload.tsx
'use client'

import { useState, useRef } from 'react'
import ImagePreview from './ImagePreview'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  placeholder?: string
  required?: boolean
  className?: string
  previewClassName?: string
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "https://ejemplo.com/imagen.jpg",
  required = false,
  className = "",
  previewClassName = "w-16 h-16 object-cover rounded"
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        // Aquí puedes implementar la subida a un servicio como Cloudinary, AWS S3, etc.
        // Por ahora, creamos una URL temporal para preview
        const tempUrl = URL.createObjectURL(file)
        onChange(tempUrl)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        // Implementar subida real aquí
        const tempUrl = URL.createObjectURL(file)
        onChange(tempUrl)
      }
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* URL Input */}
      <div className="space-y-2">
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
        />
        
        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-2">
            <div className="text-gray-600">
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-sm text-gray-600">
              Arrastra una imagen aquí o{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                selecciona un archivo
              </button>
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, GIF hasta 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      {value && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
          <ImagePreview
            src={value}
            alt="Vista previa"
            className={previewClassName}
            placeholder="Cargando..."
          />
        </div>
      )}
    </div>
  )
}