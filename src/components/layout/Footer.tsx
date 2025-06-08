'use client'

import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-black to-gray-900/50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="text-3xl font-black mb-4">
              <span className="gradient-text neon-text">S2dio</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transformamos ideas en experiencias digitales excepcionales. 
              Especializados en desarrollo web y software de vanguardia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-s2dio-blue transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-s2dio-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hola@s2dio.com" className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-s2dio-blue transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Enlaces</h3>
            <ul className="space-y-3">
              <li><a href="#nosotros" className="text-gray-300 hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#proyectos" className="text-gray-300 hover:text-white transition-colors">Proyectos</a></li>
              <li><a href="#servicios" className="text-gray-300 hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#equipo" className="text-gray-300 hover:text-white transition-colors">Equipo</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} />
                <span>hola@s2dio.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} />
                <span>Ciudad de México</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 S2dio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}