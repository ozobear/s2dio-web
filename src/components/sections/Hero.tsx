'use client'

import { useState } from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  content?: string
  videoUrl?: string // URL del video desde la base de datos
}

export default function Hero({ title, subtitle, content, videoUrl }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
  }

  const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null
  const hasVideo = !!videoId

  return (
    <section className={`min-h-screen py-20 px-4 overflow-hidden relative ${hasVideo ? 'bg-black' : 'bg-white'}`}>
      {/* Video de YouTube como background (solo si hay videoUrl) */}
      {hasVideo && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Overlay para oscurecer el video */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          
          {/* Video de YouTube embebido */}
          <iframe
            className={`absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&autohide=1`}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            onLoad={() => setVideoLoaded(true)}
          ></iframe>
          
          {/* Fallback mientras carga el video */}
          {!videoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-s2dio-orange to-s2dio-purple animate-pulse"></div>
          )}
        </div>
      )}

      {/* Elementos decorativos caóticos */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className={`absolute top-20 left-10 w-20 h-20 bg-s2dio-orange${hasVideo ? '/80' : ''} rotate-45 animate-spin-slow`}></div>
        <div className={`absolute top-40 right-20 w-16 h-16 bg-s2dio-green${hasVideo ? '/80' : ''} rounded-full animate-bounce-hard`}></div>
        <div className={`absolute bottom-32 left-1/4 w-24 h-6 bg-s2dio-blue${hasVideo ? '/80' : ''} skew-brutal animate-shake`}></div>
        <div className={`absolute top-1/2 right-10 w-8 h-32 bg-s2dio-purple${hasVideo ? '/80' : ''} rotate-12`}></div>
        <div className={`absolute bottom-20 right-1/3 text-6xl animate-blink ${hasVideo ? 'text-s2dio-yellow drop-shadow-lg' : 'text-s2dio-orange'}`}>★</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
        {/* Glitch badge */}
        <div className="mb-8 inline-block">
          <div className="bg-black text-s2dio-lime px-6 py-2 border-4 border-s2dio-lime font-mono font-bold uppercase animate-glitch">
            [SE PRONUNCIA "ESTUDIO"]
          </div>
        </div>

        {/* Main title con fondo condicional para legibilidad */}
        <div className="mb-8 space-y-4">
          <h1 className="brutal-title">
            <div className={`block text-s2dio-orange drop-shadow-brutal-lg mb-2 ${hasVideo ? 'bg-black/20 backdrop-blur-sm px-4 py-2' : ''} inline-block`}>
              LE HACEMOS
            </div>
            <div className={`block text-s2dio-green rotate-brutal -ml-4 mb-2 ${hasVideo ? 'bg-black/20 backdrop-blur-sm px-4 py-2' : ''} inline-block`}>
              A LA 📻 📺 💾
            </div>
            <div className={`block text-s2dio-blue -rotate-1 ml-8 ${hasVideo ? 'bg-black/20 backdrop-blur-sm px-4 py-2' : ''} inline-block`}>
              TECNOLOGÍA
            </div>
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
        
        {/* Content con fondo condicional */}
        {content && (
          <div className="mb-16 max-w-2xl">
            <p className={`brutal-text text-lg ${hasVideo ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'} p-6 border-4 border-black brutal-shadow-green skew-brutal`}>
              {content}
            </p>
          </div>
        )}
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <button className="brutal-button bg-s2dio-red text-white text-xl px-8 py-4 animate-bounce-hard hover:scale-110 transition-transform duration-200">
            VER PROYECTOS →
          </button>
          
          <button className="brutal-button-alt bg-s2dio-purple text-white text-xl px-8 py-4 rotate-1 hover:scale-110 transition-transform duration-200">
            CONOCER EQUIPO ★
          </button>
          
          <div className="bg-s2dio-lime text-black p-4 border-4 border-black font-mono font-bold -rotate-2 animate-shake hover:scale-110 transition-transform duration-200 cursor-pointer">
            ¡LLAMA YA!<br/>
            +52 555 0123
          </div>
        </div>

        {/* Elementos de texto caóticos */}
        <div className="absolute top-32 right-10 bg-black text-s2dio-yellow p-2 font-mono rotate-12 hidden lg:block border-2 border-s2dio-yellow">
          &lt;COMPREN COMPREN COMPREN/&gt;
        </div>
        <div className="absolute bottom-40 left-20 bg-s2dio-pink text-black p-2 font-mono -rotate-12 hidden lg:block border-2 border-black">
          ERROR_404_BORING
        </div>
      </div>

      {/* Control de video (solo se muestra si hay video) */}
      {hasVideo && (
        <div className="absolute bottom-4 right-4 z-40">
          <div className="bg-black/50 text-white p-2 rounded text-xs font-mono">
            VIDEO: ON
          </div>
        </div>
      )}
    </section>
  )
}