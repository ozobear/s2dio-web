'use client'

import { Code, Smartphone, Globe, Database, Palette, Zap } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

interface ServicesProps {
  title: string
  subtitle?: string
  services: Service[]
}

const iconMap = {
  code: Code,
  smartphone: Smartphone,
  globe: Globe,
  database: Database,
  palette: Palette,
  zap: Zap
}

export default function Services({ title, subtitle, services }: ServicesProps) {
  return (
    <section id="servicios" className="py-20 lg:py-32 bg-gradient-to-b from-gray-900/30 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="gradient-text">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code
            
            return (
              <div key={service.id} className="glass-card p-8 card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-s2dio-blue to-s2dio-purple rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}