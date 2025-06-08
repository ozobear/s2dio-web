import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Solo verificar sesión si NO estamos en la página de login
  const isLoginPage = false // Simplificado por ahora
  
  if (!isLoginPage) {
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        redirect('/admin/login')
      }
    } catch (error) {
      console.log('⚠️ Error verificando sesión:', error)
      // En desarrollo, permitir acceso si hay error de sesión
      if (process.env.NODE_ENV === 'production') {
        redirect('/admin/login')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}