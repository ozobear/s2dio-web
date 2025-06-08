'use client'

interface AboutProps {
  title: string
  subtitle?: string
  content?: string
}

export default function About({ title, subtitle, content }: AboutProps) {
  const features = [
    {
      title: 'INNOVACIÓN',
      description: 'ROMPEMOS LAS REGLAS PARA CREAR ALGO NUEVO',
      color: 'bg-s2dio-orange',
      shadow: 'brutal-shadow-green'
    },
    {
      title: 'PRECISIÓN',
      description: 'CADA PIXEL CUENTA, CADA LÍNEA IMPORTA',
      color: 'bg-s2dio-green',
      shadow: 'brutal-shadow-blue'
    },
    {
      title: 'VELOCIDAD',
      description: 'RÁPIDO COMO UN RAYO, BRUTAL COMO EL TRUENO',
      color: 'bg-s2dio-blue',
      shadow: 'brutal-shadow-purple'
    }
  ]

  return (
    <section id="nosotros" className="py-20 bg-s2dio-yellow relative overflow-hidden">
      {/* Brutal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-black rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-s2dio-red rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-64 bg-s2dio-purple -rotate-12 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <div>
            <h2 className="brutal-subtitle text-s2dio-red mb-8 rotate-brutal">
              {title.toUpperCase()}
            </h2>
            
            {subtitle && (
              <div className="mb-8">
                <p className="brutal-text text-xl bg-black text-s2dio-lime p-4 border-4 border-black brutal-shadow-orange -rotate-1">
                  {subtitle.toUpperCase()}
                </p>
              </div>
            )}

            {content && (
              <div className="mb-12">
                <div className="bg-white p-6 border-4 border-black brutal-shadow-blue skew-brutal">
                  <div className="brutal-text text-lg" dangerouslySetInnerHTML={{ __html: content.toUpperCase() }} />
                </div>
              </div>
            )}

            {/* Features in brutal style */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.color} p-6 border-4 border-black ${feature.shadow} ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  } brutal-hover`}
                >
                  <h3 className="font-display text-2xl font-black mb-3 text-black">
                    [{feature.title}]
                  </h3>
                  <p className="brutal-text text-black font-bold">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right stats - Brutalist style */}
          <div className="relative">
            <div className="bg-black text-s2dio-yellow p-8 border-8 border-s2dio-yellow brutal-shadow-orange rotate-brutal-alt">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center border-4 border-s2dio-yellow p-4 bg-s2dio-red">
                  <div className="font-display text-4xl font-black text-white drop-shadow-brutal">50+</div>
                  <div className="font-mono font-bold text-white">PROYECTOS</div>
                </div>
                <div className="text-center border-4 border-s2dio-yellow p-4 bg-s2dio-green">
                  <div className="font-display text-4xl font-black text-black drop-shadow-brutal">5+</div>
                  <div className="font-mono font-bold text-black">AÑOS</div>
                </div>
                <div className="text-center border-4 border-s2dio-yellow p-4 bg-s2dio-blue">
                  <div className="font-display text-4xl font-black text-white drop-shadow-brutal">100%</div>
                  <div className="font-mono font-bold text-white">BRUTAL</div>
                </div>
                <div className="text-center border-4 border-s2dio-yellow p-4 bg-s2dio-purple">
                  <div className="font-display text-4xl font-black text-white drop-shadow-brutal">24/7</div>
                  <div className="font-mono font-bold text-white">HARDCORE</div>
                </div>
              </div>

              {/* Chaotic elements */}
              <div className="absolute -top-6 -right-6 bg-s2dio-pink text-black p-2 font-mono font-bold rotate-12">
                ERROR!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-s2dio-lime text-black p-2 font-mono font-bold -rotate-12 animate-blink">
                &lt;/BRUTAL&gt;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}