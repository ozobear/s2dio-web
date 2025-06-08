import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  const [sectionsCount, projectsCount, teamCount, servicesCount] = await Promise.all([
    prisma.section.count(),
    prisma.project.count(),
    prisma.teamMember.count(),
    prisma.service.count()
  ])

  return {
    sectionsCount,
    projectsCount,
    teamCount,
    servicesCount
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-s2dio-blue/10 rounded-lg">
              <div className="w-8 h-8 bg-s2dio-blue rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Secciones</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sectionsCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-s2dio-green/10 rounded-lg">
              <div className="w-8 h-8 bg-s2dio-green rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Proyectos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.projectsCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-s2dio-purple/10 rounded-lg">
              <div className="w-8 h-8 bg-s2dio-purple rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Equipo</p>
              <p className="text-2xl font-bold text-gray-900">{stats.teamCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-s2dio-orange/10 rounded-lg">
              <div className="w-8 h-8 bg-s2dio-orange rounded"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Servicios</p>
              <p className="text-2xl font-bold text-gray-900">{stats.servicesCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/sections" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900">Editar Contenido</h3>
            <p className="text-sm text-gray-600">Modificar secciones del sitio</p>
          </a>
          <a href="/admin/projects" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900">Gestionar Proyectos</h3>
            <p className="text-sm text-gray-600">Agregar o editar proyectos</p>
          </a>
          <a href="/admin/team" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900">Administrar Equipo</h3>
            <p className="text-sm text-gray-600">Gestionar miembros del equipo</p>
          </a>
        </div>
      </div>
    </div>
  )
}