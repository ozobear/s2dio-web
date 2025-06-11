'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
  projects: number
  services: number
  teamMembers: number
  sections: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    teamMembers: 0,
    sections: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projectsRes, servicesRes, teamRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/services'),
        fetch('/api/team')
      ])

      const [projects, services, team] = await Promise.all([
        projectsRes.json(),
        servicesRes.json(),
        teamRes.json()
      ])

      setStats({
        projects: projects.length || 0,
        services: services.length || 0,
        teamMembers: team.length || 0,
        sections: 5 // Número fijo o puedes hacer una API para sections también
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: 'Proyectos',
      value: stats.projects,
      icon: '💼',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      href: '/admin/projects',
      description: 'Proyectos activos'
    },
    {
      title: 'Servicios',
      value: stats.services,
      icon: '🔧',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      href: '/admin/services',
      description: 'Servicios disponibles'
    },
    {
      title: 'Equipo',
      value: stats.teamMembers,
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      href: '/admin/team',
      description: 'Miembros del equipo'
    },
    {
      title: 'Secciones',
      value: stats.sections,
      icon: '📄',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      href: '/admin/sections',
      description: 'Secciones del sitio'
    }
  ]

  const quickActions = [
    {
      title: 'Nuevo Proyecto',
      description: 'Agregar un nuevo proyecto al portafolio',
      icon: '➕',
      href: '/admin/projects',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Nuevo Servicio',
      description: 'Agregar un nuevo servicio',
      icon: '🛠️',
      href: '/admin/services',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Nuevo Miembro',
      description: 'Agregar miembro al equipo',
      icon: '👤',
      href: '/admin/team',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Ver Sitio',
      description: 'Visitar el sitio web público',
      icon: '🌐',
      href: '/',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ¡Bienvenido de vuelta! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Panel de administración de S2dio
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-medium">Dashboard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className="group transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} rounded-xl p-3 transition-transform duration-300 group-hover:scale-110`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{card.description}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-blue-600 font-medium">Ver más →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Acciones rápidas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-2 mr-3">
                <span className="text-white text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Acciones Rápidas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${action.color} rounded-lg p-2 text-white transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Estado del sitio */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2 mr-3">
                <span className="text-white text-lg">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Estado del Sitio</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Proyectos Activos</span>
                </div>
                <span className="text-sm font-bold text-green-600">
                  {stats.projects}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Servicios</span>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {stats.services}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Equipo</span>
                </div>
                <span className="text-sm font-bold text-purple-600">
                  {stats.teamMembers} miembros
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700">Última Actualización</span>
                </div>
                <span className="text-sm font-bold text-gray-600">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Tips rápidos */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">💡</span>
              <h3 className="text-lg font-bold">Tip del día</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Mantén tu portafolio actualizado agregando nuevos proyectos regularmente. 
              Esto ayuda a mostrar tu evolución y habilidades más recientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}