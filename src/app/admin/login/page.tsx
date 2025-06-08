'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@s2dio.com')
  const [password, setPassword] = useState('admin123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('🔐 Intentando login con:', email)
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      console.log('📊 Resultado del login:', result)

      if (result?.error) {
        setError('❌ Credenciales inválidas')
        console.error('Error de login:', result.error)
      } else if (result?.ok) {
        console.log('✅ Login exitoso, redirigiendo...')
        // Forzar redirect
        window.location.href = '/admin'
      }
    } catch (error) {
      console.error('💥 Error en login:', error)
      setError('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-md w-full">
        {/* Card principal */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <span className="text-2xl font-bold text-white">S2</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              S2dio Admin
            </h1>
            <p className="text-gray-600">
              Panel de Administración
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin@s2dio.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                '🚀 Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Credenciales de prueba */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-800 mb-2">
                🔑 Credenciales de Prueba
              </p>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Email:</strong> admin@s2dio.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              S2dio Admin Panel v1.0 • Modo Brutal
            </p>
          </div>
        </div>

        {/* Debug info (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-gray-800 text-green-400 rounded-lg text-xs font-mono">
            <p>🐛 Debug Info:</p>
            <p>• URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
            <p>• NextAuth: {typeof signIn !== 'undefined' ? '✅ Loaded' : '❌ Not loaded'}</p>
            <p>• Router: {typeof router !== 'undefined' ? '✅ Ready' : '❌ Not ready'}</p>
          </div>
        )}
      </div>
    </div>
  )
}