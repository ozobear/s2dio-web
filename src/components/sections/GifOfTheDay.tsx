'use client'

import { useEffect, useState } from 'react'

interface GifData {
  id: string
  title: string
  url: string
  thumbnail: string
}

interface GifOfTheDayProps {
  title: string
  subtitle?: string
}

export default function GifOfTheDay({ title, subtitle }: GifOfTheDayProps) {
  const [gif, setGif] = useState<GifData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchGif() {
      try {
        const response = await fetch('/api/gif-of-the-day')
        if (response.ok) {
          const data = await response.json()
          setGif(data)
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGif()
  }, [])

  return (
    <section id="vibe-del-dia" className="py-20 bg-s2dio-purple relative overflow-hidden">
      {/* Brutal chaos */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-s2dio-yellow rotate-45 animate-bounce-hard"></div>
        <div className="absolute bottom-20 right-10 w-20 h-4 bg-s2dio-green skew-brutal animate-shake"></div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-s2dio-yellow animate-blink">◆</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="brutal-title text-s2dio-yellow mb-8 glitch-text" data-text={title}>
            {title.toUpperCase()}
          </h2>
          {subtitle && (
            <div className="bg-black text-s2dio-lime p-6 border-4 border-s2dio-lime brutal-shadow-orange rotate-brutal inline-block">
              <p className="brutal-text text-xl font-bold">
                {subtitle.toUpperCase()}
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="bg-black text-s2dio-yellow p-12 border-8 border-s2dio-yellow brutal-shadow-orange skew-brutal text-center">
            <div className="text-8xl mb-4 animate-spin">⚡</div>
          </div>
        ) : error ? (
          <div className="bg-black text-s2dio-red p-12 border-8 border-s2dio-red brutal-shadow-orange skew-brutal text-center">
            <div className="text-8xl mb-4 animate-blink">🚫</div>
            <h3 className="font-display text-3xl font-black mb-4 uppercase">
              VALIÓ, NO HAY VIBES
            </h3>
            <p className="font-mono font-bold text-lg">
              NO PUDIMOS CARGAR LAS VIBES HOY
            </p>
            <p className="font-mono text-sm mt-2 opacity-75">
              PERO EL CAOS CONTINÚA...
            </p>
          </div>
        ) : gif ? (
          <div className="bg-white p-4 border-8 border-black brutal-shadow-orange rotate-brutal-alt brutal-hover">
            <div className="aspect-video relative border-4 border-black overflow-hidden">
              <img
                src={gif.url}
                alt={gif.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Glitch overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-s2dio-red/20 to-transparent animate-glitch pointer-events-none"></div>
            </div>
            {/* Chaos elements */}
            <div className="absolute -top-4 -left-4 bg-s2dio-red text-white p-2 font-mono font-bold rotate-12 animate-blink">
              VIBING!
            </div>
            <div className="absolute -bottom-4 -right-4 bg-s2dio-green text-black p-2 font-mono font-bold -rotate-12">
              RANDOM!
            </div>
          </div>
        ) : (
          <div className="bg-black text-s2dio-yellow p-12 border-8 border-s2dio-yellow brutal-shadow-orange skew-brutal text-center">
            <div className="text-8xl mb-4 animate-blink">🎭</div>
            <h3 className="font-display text-3xl font-black mb-4 uppercase">
              SIN VIBES HOY
            </h3>
            <p className="font-mono font-bold text-lg">
              PERO EL CAOS CONTINÚA...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}