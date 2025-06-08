// src/components/sections/Hero.tsx (CORREGIDO)
'use client'

interface HeroProps {
  title: string
  subtitle?: string
  content?: string
}

export default function Hero({ title, subtitle, content }: HeroProps) {
  return (
    <section className="min-h-screen bg-white py-20 px-4 overflow-hidden relative">
      {/* Chaotic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-s2dio-orange rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-s2dio-green rounded-full animate-bounce-hard"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-6 bg-s2dio-blue skew-brutal animate-shake"></div>
        <div className="absolute top-1/2 right-10 w-8 h-32 bg-s2dio-purple rotate-12"></div>
        <div className="absolute bottom-20 right-1/3 text-6xl animate-blink">★</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Glitch badge */}
        <div className="mb-8 inline-block">
          <div className="bg-black text-s2dio-lime px-6 py-2 border-4 border-s2dio-lime font-mono font-bold uppercase animate-glitch">
            [SE PRONUNCIA "ESTUDIO"]
          </div>
        </div>

        {/* Main title with brutal styling - CORREGIDO */}
        <div className="mb-8 space-y-4">
          <h1 className="brutal-title">
            <div className="block text-s2dio-orange drop-shadow-brutal-lg mb-2">LE HACEMOS</div>
            <div className="block text-s2dio-green rotate-brutal -ml-4 mb-2">A LA</div>
            <div className="block text-s2dio-blue -rotate-1 ml-8">TECNOLOGÍA</div>
          </h1>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <div className="mb-12 max-w-4xl">
            <p className="brutal-text text-2xl bg-s2dio-yellow p-4 border-4 border-black brutal-shadow-orange rotate-brutal-alt inline-block">
              {subtitle.toUpperCase()}
            </p>
          </div>
        )}
        
        {/* Content */}
        {content && (
          <div className="mb-16 max-w-2xl">
            <p className="brutal-text text-lg bg-white p-6 border-4 border-black brutal-shadow-green skew-brutal">
              {content}
            </p>
          </div>
        )}
        
        {/* CTA Buttons in brutal style */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <button className="brutal-button bg-s2dio-red text-white text-xl px-8 py-4 animate-bounce-hard">
            VER PROYECTOS →
          </button>
          
          <button className="brutal-button-alt bg-s2dio-purple text-white text-xl px-8 py-4 rotate-1">
            CONOCER EQUIPO ★
          </button>
          
          <div className="bg-s2dio-lime text-black p-4 border-4 border-black font-mono font-bold -rotate-2 animate-shake">
            ¡LLAMA YA!<br/>
            +52 555 0123
          </div>
        </div>

        {/* Chaotic text elements */}
        <div className="absolute top-32 right-10 bg-black text-s2dio-yellow p-2 font-mono rotate-12 hidden lg:block">
          &lt;COMPREN COMPREN COMPREN/&gt;
        </div>
        <div className="absolute bottom-40 left-20 bg-s2dio-pink text-black p-2 font-mono -rotate-12 hidden lg:block">
          ERROR_404_BORING
        </div>
      </div>
    </section>
  )
}