import './globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'S2DIO - ESTUDIO BRUTAL DE DESARROLLO WEB',
  description: 'ESTUDIO DE DESARROLLO WEB Y SOFTWARE QUE ROMPE LAS REGLAS.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let session = null
  
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.log('Session error:', error)
  }

  return (
    <html lang="es">
      <body className="antialiased">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}