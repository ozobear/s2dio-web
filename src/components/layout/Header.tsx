'use client'

import { useState } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'NOSOTROS', href: '#nosotros' },
  { name: 'PROYECTOS', href: '#proyectos' },
  { name: 'SERVICIOS', href: '#servicios' },
  { name: 'EQUIPO', href: '#equipo' }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-s2dio-yellow border-b-8 border-black sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="brutal-hover">
            <div className="bg-black text-s2dio-yellow px-4 py-2 border-4 border-black brutal-shadow-orange rotate-brutal">
              <span className="font-display text-3xl font-black">S2DIO</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`brutal-button ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                style={{
                  backgroundColor: [
                    '#FF6B35', '#00FF88', '#0099FF', '#CC00FF', '#FFE066'
                  ][index % 5]
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className="bg-s2dio-red text-white brutal-button animate-bounce-hard">
              ¡ÉCHANOS UN CABLE!
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black text-s2dio-yellow px-4 py-2 border-4 border-black font-mono font-bold"
            >
              {isOpen ? '[X]' : '[=]'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="brutal-card p-4 rotate-brutal-alt">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block brutal-button mb-2 text-center"
                  onClick={() => setIsOpen(false)}
                  style={{
                    backgroundColor: [
                      '#FF6B35', '#00FF88', '#0099FF', '#CC00FF', '#FFE066'
                    ][index % 5]
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <button className="brutal-button bg-s2dio-red text-white w-full mt-2">
                ¡CONTACTA YA!
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}