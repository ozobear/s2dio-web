'use client'

import { usePathname } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // No aplicar el AdminLayout a la página de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  return <AdminLayout>{children}</AdminLayout>
}