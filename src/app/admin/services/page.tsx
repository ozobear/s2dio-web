'use client'

import { useState, useEffect } from 'react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar el servicio "${title}"?`)) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setServices(services.filter(s => s.id !== id))
        alert('Servicio eliminado correctamente')
      } else {
        alert('Error al eliminar el servicio')
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Error al eliminar el servicio')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleSave = async (formData: Partial<Service>) => {
    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services'
      const method = editingService ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const savedService = await response.json()
        
        if (editingService) {
          setServices(services.map(s => s.id === savedService.id ? savedService : s))
        } else {
          setServices([...services, savedService])
        }
        
        setShowForm(false)
        setEditingService(null)
        alert('Servicio guardado correctamente')
      } else {
        const errorData = await response.json()
        alert(`Error al guardar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error al guardar el servicio')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestionar Servicios</h1>
        <button 
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Nuevo Servicio
        </button>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingService(null)
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
                    Imagen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
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
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {service.icon ? (
                          <img 
                            src={service.icon} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <span className="text-lg text-gray-400" style={{ display: service.icon ? 'none' : 'flex' }}>
                          🔧
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {service.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id, service.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay servicios disponibles</p>
                <button 
                  onClick={() => {
                    setEditingService(null)
                    setShowForm(true)
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Crear Primer Servicio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente del formulario de servicios
function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: Service | null
  onSave: (data: Partial<Service>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || '',
    isActive: service?.isActive ?? true,
    order: service?.order || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Eliminar iconos comunes ya que ahora usamos imágenes
  // const commonIcons = [...]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {service ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Desarrollo Web, Diseño UX/UI, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción detallada del servicio..."
              required
            />
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen URL *
              </label>
              <input
                type="url"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
              {formData.icon && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                  {formData.icon.startsWith('http') ? (
                    <img 
                      src={formData.icon} 
                      alt="Vista previa" 
                      className="w-16 h-16 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const errorMsg = e.currentTarget.nextElementSibling as HTMLElement
                        if (errorMsg) errorMsg.style.display = 'block'
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded border flex items-center justify-center">
                      <span className="text-2xl text-white">{formData.icon}</span>
                    </div>
                  )}
                  <p className="text-xs text-red-500 mt-1" style={{ display: 'none' }}>
                    Error al cargar la imagen. Verifica la URL.
                  </p>
                </div>
              )}
            </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Activo</span>
              </label>
            </div>
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
              {service ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}