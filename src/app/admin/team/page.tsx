'use client'

import { useState, useEffect } from 'react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  linkedIn?: string
  github?: string
  email?: string
  order: number
  isActive: boolean
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      }
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar a "${name}"?`)) return

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTeamMembers(teamMembers.filter(m => m.id !== id))
        alert('Miembro del equipo eliminado correctamente')
      } else {
        alert('Error al eliminar el miembro del equipo')
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
      alert('Error al eliminar el miembro del equipo')
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleSave = async (formData: Partial<TeamMember>) => {
    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : '/api/team'
      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const savedMember = await response.json()
        
        if (editingMember) {
          setTeamMembers(teamMembers.map(m => m.id === savedMember.id ? savedMember : m))
        } else {
          setTeamMembers([...teamMembers, savedMember])
        }
        
        setShowForm(false)
        setEditingMember(null)
        alert('Miembro del equipo guardado correctamente')
      } else {
        const errorData = await response.json()
        alert(`Error al guardar: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error saving team member:', error)
      alert('Error al guardar el miembro del equipo')
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
        <h1 className="text-2xl font-bold">Gestionar Equipo</h1>
        <button 
          onClick={() => {
            setEditingMember(null)
            setShowForm(true)
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Nuevo Miembro
        </button>
      </div>

      {showForm && (
        <TeamMemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingMember(null)
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
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enlaces
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
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {member.image && (
                          <img 
                            className="h-10 w-10 rounded-full mr-3 object-cover" 
                            src={member.image} 
                            alt={member.name}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        {!member.image && (
                          <div className="h-10 w-10 rounded-full mr-3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {member.linkedIn && (
                          <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                            LinkedIn
                          </a>
                        )}
                        {member.github && (
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                            GitHub
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id, member.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {teamMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay miembros del equipo disponibles</p>
                <button 
                  onClick={() => {
                    setEditingMember(null)
                    setShowForm(true)
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Agregar Primer Miembro
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente del formulario de miembros del equipo
function TeamMemberForm({ 
  member, 
  onSave, 
  onCancel 
}: { 
  member: TeamMember | null
  onSave: (data: Partial<TeamMember>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    role: member?.role || '',
    bio: member?.bio || '',
    image: member?.image || '',
    linkedIn: member?.linkedIn || '',
    github: member?.github || '',
    email: member?.email || '',
    isActive: member?.isActive ?? true,
    order: member?.order || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {member ? 'Editar Miembro' : 'Nuevo Miembro'}
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Frontend Developer, Designer, etc."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biografía
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción breve del miembro del equipo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/foto.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
                  {formData.image.startsWith('http') ? (
                    <img 
                      src={formData.image} 
                      alt="Vista previa" 
                      className="w-16 h-16 object-cover rounded-full border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const errorMsg = e.currentTarget.nextElementSibling as HTMLElement
                        if (errorMsg) errorMsg.style.display = 'block'
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border flex items-center justify-center">
                      <span className="text-xl text-white font-bold">
                        {formData.name.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-red-500 mt-1" style={{ display: 'none' }}>
                    Error al cargar la imagen. Verifica la URL.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@ejemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedIn}
                onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({...formData, github: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/..."
              />
            </div>
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
              {member ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}