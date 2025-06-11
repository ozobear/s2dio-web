// src/app/admin/sections/page.tsx
'use client'

import { useState, useEffect } from 'react'

interface Section {
  id: string
  name: string
  title: string
  subtitle?: string
  content?: string
  videoUrl?: string
  isActive: boolean
  order: number
}

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/sections')
      if (response.ok) {
        const data = await response.json()
        setSections(data)
      }
    } catch (error) {
      console.error('Error loading sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar la sección "${name}"?`)) return

    try {
      const response = await fetch(`/api/sections/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSections(sections.filter(s => s.id !== id))
        alert('Sección eliminada correctamente')
      } else {
        alert('Error al eliminar la sección')
      }
    } catch (error) {
      console.error('Error deleting section:', error)
      alert('Error al eliminar la sección')
    }
  }

  const handleEdit = (section: Section) => {
    setEditingSection(section)
    setShowForm(true)
  }

  const handleSave = async (formData: Partial<Section>) => {
    try {
      const url = editingSection ? `/api/sections/${editingSection.id}` : '/api/sections'
      const method = editingSection ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const savedSection = await response.json()
        
        if (editingSection) {
          setSections(sections.map(s => s.id === savedSection.id ? savedSection : s))
        } else {
          setSections([...sections, savedSection])
        }
        
        setShowForm(false)
        setEditingSection(null)
        alert('Sección guardada correctamente')
      } else {
        const errorData = await response.json()
        alert(`Error al guardar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error saving section:', error)
      alert('Error al guardar la sección')
    }
  }

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestionar Secciones</h1>
        <button 
          onClick={() => {
            setEditingSection(null)
            setShowForm(true)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Nueva Sección
        </button>
      </div>

      {showForm && (
        <SectionForm
          section={editingSection}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingSection(null)
          }}
        />
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sections.map((section) => (
                  <tr key={section.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {section.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {section.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.videoUrl ? (
                        <div className="flex items-center">
                          <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mr-2">
                            ✓ Video
                          </span>
                          {getYouTubeVideoId(section.videoUrl) && (
                            <img 
                              src={`https://img.youtube.com/vi/${getYouTubeVideoId(section.videoUrl)}/mqdefault.jpg`}
                              alt="Video thumbnail"
                              className="w-12 h-8 object-cover rounded border"
                            />
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          Sin video
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        section.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {section.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(section)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(section.id, section.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {sections.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay secciones disponibles</p>
                <button 
                  onClick={() => {
                    setEditingSection(null)
                    setShowForm(true)
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Crear Primera Sección
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente del formulario de secciones
function SectionForm({ 
  section, 
  onSave, 
  onCancel 
}: { 
  section: Section | null
  onSave: (data: Partial<Section>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: section?.name || '',
    title: section?.title || '',
    subtitle: section?.subtitle || '',
    content: section?.content || '',
    videoUrl: section?.videoUrl || '',
    isActive: section?.isActive ?? true,
    order: section?.order || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
  }

  const videoId = getYouTubeVideoId(formData.videoUrl)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {section ? 'Editar Sección' : 'Nueva Sección'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="hero, about, services, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Orden
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Subtítulo opcional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contenido de la sección..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video de YouTube (Opcional)
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Solo para la sección Hero. El video se reproducirá automáticamente sin sonido como fondo.
            </p>
            
            {formData.videoUrl && videoId && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Vista previa del video:</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt="Video preview"
                    className="w-32 h-18 object-cover rounded border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="text-sm">
                    <p className="font-medium text-green-600">✓ Video válido detectado</p>
                    <p className="text-gray-500">ID: {videoId}</p>
                  </div>
                </div>
              </div>
            )}
            
            {formData.videoUrl && !videoId && (
              <div className="mt-2">
                <p className="text-xs text-red-500">
                  ⚠️ URL de YouTube no válida. Verifica el enlace.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Sección activa
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {section ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}