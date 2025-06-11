'use client'

import { Code } from 'lucide-react'
import Image from 'next/image'
import { isValidImageUrl } from '@/utils/imageUtils'

interface Service {
  id: string
  title: string
  description: string
  icon: string // Ahora será la URL de la imagen
}

interface ServicesProps {
  title: string
  subtitle?: string
  services: Service[]
}

export default function Services({ title, subtitle, services }: ServicesProps) {
  // Colores brutalist para las tarjetas
  const cardColors = [
    {
      bg: 'bg-s2dio-orange',
      border: 'border-s2dio-yellow',
      shadow: 'shadow-s2dio-yellow/30',
      accent: 'bg-s2dio-yellow'
    },
    {
      bg: 'bg-s2dio-purple',
      border: 'border-s2dio-turquoise',
      shadow: 'shadow-s2dio-turquoise/30',
      accent: 'bg-s2dio-turquoise'
    },
    {
      bg: 'bg-s2dio-blue',
      border: 'border-s2dio-orange',
      shadow: 'shadow-s2dio-orange/30',
      accent: 'bg-s2dio-orange'
    },
    {
      bg: 'bg-s2dio-green',
      border: 'border-s2dio-purple',
      shadow: 'shadow-s2dio-purple/30',
      accent: 'bg-s2dio-purple'
    },
    {
      bg: 'bg-s2dio-turquoise',
      border: 'border-s2dio-yellow',
      shadow: 'shadow-s2dio-yellow/30',
      accent: 'bg-s2dio-yellow'
    },
    {
      bg: 'bg-s2dio-yellow',
      border: 'border-s2dio-blue',
      shadow: 'shadow-s2dio-blue/30',
      accent: 'bg-s2dio-blue'
    }
  ]

  return (
    <section id="servicios" className="py-20 lg:py-32 bg-[#00FF88] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-s2dio-orange/20 transform rotate-12"></div>
      <div className="absolute bottom-20 right-16 w-24 h-24 bg-s2dio-purple/20 transform -rotate-45"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-s2dio-turquoise/20 transform rotate-45"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header con estilo brutalist mejorado */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-4 relative z-10 transform -rotate-1">
              <span className="brutal-title text-white uppercase glitch-text tracking-tighter">
                {title}
              </span>
            </h2>
            {/* Elementos decorativos del título */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-s2dio-blue/30 transform rotate-2"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-s2dio-orange/20 transform -rotate-1"></div>
          </div>
          
          {subtitle && (
            <div className="relative inline-block">
              <div className="bg-s2dio-blue px-8 py-3 transform -rotate-1 border-4 border-black">
                <p className="text-xl md:text-2xl font-black text-black uppercase tracking-wide">
                  {subtitle}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Grid de servicios con diseño inspirado en la imagen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const colorScheme = cardColors[index % cardColors.length]
            
            return (
              <div 
                key={service.id} 
                className="group relative transform hover:-translate-y-4 hover:rotate-2 transition-all duration-300"
              > 
                {/* Tarjeta principal */}
                <div className={`${colorScheme.bg} border-8 border-black transform -rotate-1 group-hover:rotate-1 transition-all duration-300 relative`}>
                  {/* Sombra brutalist */}
                  <div className={`absolute inset-0 ${colorScheme.accent} transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300`}></div>
                  
                  <div className="p-8 relative">
                    {/* Ícono/Imagen del servicio */}
                    <div className="mb-6">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 bg-black transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                        <div className="relative w-full h-full bg-white transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 overflow-hidden border-4 border-black">
                          {service.icon && isValidImageUrl(service.icon) ? (
                            <Image
                              src={service.icon}
                              alt={service.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center">
                              {service.icon && !isValidImageUrl(service.icon) ? (
                                <span className="text-3xl">{service.icon}</span>
                              ) : (
                                <Code className="w-10 h-10 text-black" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Título del servicio */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-black text-black uppercase tracking-tight leading-tight text-center transform group-hover:scale-105 transition-transform duration-300">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Línea decorativa */}
                    <div className="w-16 h-1 bg-black mx-auto mb-6 transform group-hover:w-24 transition-all duration-300"></div>
                    
                    {/* Descripción */}
                    <p className="text-black font-bold text-center leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Elementos decorativos de la tarjeta */}
                    <div className="absolute top-4 left-4 w-4 h-4 bg-black transform rotate-45"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-black transform rotate-45"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 bg-black transform rotate-45"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 bg-black transform rotate-45"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Elemento inferior como en la imagen */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <div className="bg-black text-s2dio-yellow px-8 py-4 border-4 border-s2dio-yellow transform -rotate-1 hover:rotate-1 transition-transform duration-300">
              <p className="text-xl font-black uppercase tracking-wider">
                &lt;!-- MÁS SERVICIOS EN DESARROLLO --&gt;
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos adicionales */}
      <div className="absolute bottom-10 left-10">
        <div className="flex space-x-4">
          <div className="w-6 h-6 bg-s2dio-orange transform rotate-45"></div>
          <div className="w-6 h-6 bg-s2dio-purple transform rotate-45"></div>
          <div className="w-6 h-6 bg-s2dio-turquoise transform rotate-45"></div>
        </div>
      </div>
    </section>
  )
}