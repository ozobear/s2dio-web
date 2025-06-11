import { prisma } from '@/lib/prisma'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Team from '@/components/sections/Team'
import GifOfTheDay from '@/components/sections/GifOfTheDay'

async function getPageData() {
  try {
    console.log('🔄 Obteniendo datos de la base de datos...')
    
    const sections = await prisma.section.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    const team = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    
    // const todayGif = await prisma.gifOfTheDay.findFirst({
    //   where: {
    //     isActive: true,
    //     date: {
    //       gte: new Date(new Date().toDateString())
    //     }
    //   },
    //   orderBy: { date: 'desc' }
    // })
    
    // Convertir array de secciones a objeto por nombre
    const sectionsMap = sections.reduce((acc, section) => {
      acc[section.name] = section
      return acc
    }, {} as Record<string, any>)
    
    console.log('✅ Datos obtenidos:', {
      sections: sections.length,
      projects: projects.length,
      team: team.length,
      services: services.length,
      // todayGif: !!todayGif
    })
    
    // Log específico para el video del Hero
    const heroSection = sectionsMap.hero
    if (heroSection?.videoUrl) {
      console.log('🎬 Video de Hero detectado:', heroSection.videoUrl)
    } else {
      console.log('⚪ No hay video configurado para Hero')
    }
    
    return {
      sections: sectionsMap,
      projects,
      team,
      services,
      // todayGif
    }
  } catch (error) {
    console.error('❌ Error obteniendo datos de la base de datos:', error)
    
    // SOLO usar datos mock si hay un error crítico
    console.log('🔄 Usando datos de respaldo...')
    return getMockData()
  }
}

// Datos mock solo como respaldo
function getMockData() {
  return {
    sections: {
      hero: {
        title: 'CONSTRUIMOS EL FUTURO DIGITAL',
        subtitle: 'SOMOS S2DIO, UN ESTUDIO QUE ROMPE LAS REGLAS DEL DISEÑO WEB',
        content: 'TRANSFORMAMOS IDEAS EN EXPERIENCIAS DIGITALES BRUTALES QUE IMPACTAN Y DESTRUYEN LO CONVENCIONAL',
        videoUrl: null // ← Agregado para mock data
      },
      about: {
        title: 'NOSOTROS',
        subtitle: 'UN EQUIPO OBSESIONADO CON ROMPER LAS REGLAS',
        content: '<p>EN <strong>S2DIO</strong> NO SEGUIMOS TENDENCIAS, LAS CREAMOS. DESARROLLAMOS SOFTWARE QUE DESAFÍA LO ESTABLECIDO.</p><p>DESDE 2020, HEMOS ESTADO DESTRUYENDO LAS EXPECTATIVAS Y RECONSTRUYENDO EL FUTURO DIGITAL.</p>'
      },
      projects: {
        title: 'NUESTROS PROYECTOS',
        subtitle: 'TRABAJOS QUE ROMPEN EL INTERNET'
      },
      services: {
        title: 'QUÉ HACEMOS',
        subtitle: 'SERVICIOS QUE DESTRUYEN LO CONVENCIONAL'
      },
      team: {
        title: 'NUESTRO EQUIPO',
        subtitle: 'DESARROLLADORES BRUTALES EN ACCIÓN'
      },
      gif: {
        title: 'GIF DEL DÍA',
        subtitle: 'MOMENTO BRUTAL DIARIO'
      }
    },
    projects: [],
    team: [],
    services: [],
    todayGif: null
  }
}

export default async function HomePage() {
  const data = await getPageData()
  
  console.log('🎯 Datos del Hero:', {
    title: data.sections.hero?.title,
    subtitle: data.sections.hero?.subtitle,
    videoUrl: data.sections.hero?.videoUrl // ← Agregado para debugging
  })
  
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      <Hero
        title={data.sections.hero?.title || 'CONSTRUIMOS EL FUTURO DIGITAL'}
        subtitle={data.sections.hero?.subtitle || 'SOMOS S2DIO, UN ESTUDIO QUE ROMPE LAS REGLAS DEL DISEÑO WEB'}
        content={data.sections.hero?.content || 'TRANSFORMAMOS IDEAS EN EXPERIENCIAS DIGITALES BRUTALES'}
        videoUrl={data.sections.hero?.videoUrl} // ← AGREGADO: Video desde la base de datos
      />
      
      <About
        title={data.sections.about?.title || 'NOSOTROS'}
        subtitle={data.sections.about?.subtitle || 'UN EQUIPO OBSESIONADO CON ROMPER LAS REGLAS'}
        content={data.sections.about?.content || '<p>EN <strong>S2DIO</strong> NO SEGUIMOS TENDENCIAS, LAS CREAMOS.</p>'}
      />
      
      <Projects
        title={data.sections.projects?.title || 'NUESTROS PROYECTOS'}
        subtitle={data.sections.projects?.subtitle || 'TRABAJOS QUE ROMPEN EL INTERNET'}
        projects={data.projects}
      />
      
      <Services
        title={data.sections.services?.title || 'QUÉ HACEMOS'}
        subtitle={data.sections.services?.subtitle || 'SERVICIOS QUE DESTRUYEN LO CONVENCIONAL'}
        services={data.services}
      />
      
      <Team
        title={data.sections.team?.title || 'NUESTRO EQUIPO'}
        subtitle={data.sections.team?.subtitle || 'DESARROLLADORES BRUTALES EN ACCIÓN'}
        team={data.team}
      />
      
      <GifOfTheDay
        title={data.sections.gif?.title || 'GIF DEL DÍA'}
        subtitle={data.sections.gif?.subtitle || 'VIBES AUTOMÁTICOS DESDE GIPHY'}
      />
      
      {/* Footer brutal completo */}
      <footer className="bg-black text-s2dio-yellow py-16 border-t-8 border-s2dio-yellow relative overflow-hidden">
        {/* Elementos caóticos de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-16 h-16 bg-s2dio-red rotate-45 animate-spin-slow"></div>
          <div className="absolute top-20 right-20 w-8 h-32 bg-s2dio-green -rotate-12 animate-bounce-hard"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-s2dio-blue rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 text-6xl text-s2dio-purple/20 animate-blink">◆</div>
          <div className="absolute bottom-10 right-10 text-4xl text-s2dio-orange/30 animate-shake">★</div>
          <div className="absolute top-32 left-1/2 w-20 h-4 bg-s2dio-pink skew-brutal animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Logo principal brutal */}
          <div className="text-center mb-12">
            <div className="bg-s2dio-red text-white p-8 border-8 border-white brutal-shadow-orange rotate-brutal inline-block relative">
              <h3 className="font-display text-4xl font-black mb-2 drop-shadow-brutal">S2DIO</h3>
              <p className="font-mono font-bold text-lg">DIGITAL BRUTALISM STUDIO</p>
              <div className="mt-3 font-mono text-sm uppercase tracking-wider">
                EST. 2020 - DESTRUYENDO DESDE ENTONCES
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 bg-s2dio-yellow text-black p-2 font-mono text-xs font-bold rotate-12 animate-blink">
                BRUTAL!
              </div>
              <div className="absolute -bottom-3 -left-3 bg-s2dio-green text-black p-1 font-mono text-xs font-bold -rotate-12">
                100%
              </div>
            </div>
          </div>

          {/* Información de contacto en grid brutal */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-s2dio-green text-black p-6 border-4 border-black brutal-shadow-orange font-mono font-bold text-center rotate-1 brutal-hover">
              <div className="text-2xl mb-2">📧</div>
              <div className="text-lg font-black mb-1">EMAIL BRUTAL:</div>
              <div className="break-all">HOLA@S2DIO.COM</div>
              <div className="text-xs mt-2 opacity-75">RESPUESTA EN &lt; 24H</div>
            </div>
            
            <div className="bg-s2dio-blue text-white p-6 border-4 border-black brutal-shadow-green font-mono font-bold text-center -rotate-1 brutal-hover">
              <div className="text-2xl mb-2">📞</div>
              <div className="text-lg font-black mb-1">TELÉFONO HARDCORE:</div>
              <div>+52 555 BRUTAL</div>
              <div className="text-xs mt-2 opacity-75">LLAMADAS 24/7</div>
            </div>
            
            <div className="bg-s2dio-purple text-white p-6 border-4 border-black brutal-shadow-blue font-mono font-bold text-center rotate-2 brutal-hover">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-lg font-black mb-1">UBICACIÓN EXTREMA:</div>
              <div>CIUDAD DE MÉXICO</div>
              <div className="text-xs mt-2 opacity-75">ZONA BRUTAL</div>
            </div>
          </div>

          {/* Links sociales brutal */}
          <div className="flex justify-center gap-6 mb-12">
            <a 
              href="https://github.com/s2dio" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-4 border-s2dio-yellow px-6 py-3 hover:bg-s2dio-red transition-all duration-75 brutal-hover group"
            >
              <span className="font-mono font-bold text-s2dio-yellow group-hover:text-white text-lg">
                [GITHUB]
              </span>
            </a>
            
            <a 
              href="https://linkedin.com/company/s2dio" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-4 border-s2dio-green px-6 py-3 hover:bg-s2dio-blue transition-all duration-75 brutal-hover group"
            >
              <span className="font-mono font-bold text-s2dio-green group-hover:text-white text-lg">
                [LINKEDIN]
              </span>
            </a>
            
            <a 
              href="https://twitter.com/s2dio_brutal" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-4 border-s2dio-orange px-6 py-3 hover:bg-s2dio-purple transition-all duration-75 brutal-hover group"
            >
              <span className="font-mono font-bold text-s2dio-orange group-hover:text-white text-lg">
                [TWITTER]
              </span>
            </a>

            <a 
              href="https://instagram.com/s2dio.brutal" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-4 border-s2dio-pink px-6 py-3 hover:bg-s2dio-lime transition-all duration-75 brutal-hover group"
            >
              <span className="font-mono font-bold text-s2dio-pink group-hover:text-black text-lg">
                [INSTAGRAM]
              </span>
            </a>
          </div>

          {/* Call to action final */}
          <div className="text-center mb-12">
            <div className="bg-s2dio-orange text-black p-8 border-8 border-black brutal-shadow-green skew-brutal inline-block">
              <h4 className="font-display text-3xl font-black mb-4 uppercase">
                ¿LISTO PARA LA REVOLUCIÓN DIGITAL?
              </h4>
              <p className="font-mono font-bold mb-6 text-lg">
                ÚNETE AL MOVIMIENTO BRUTALIST
              </p>
              <button className="bg-black text-s2dio-yellow border-4 border-s2dio-yellow px-8 py-4 font-mono font-bold uppercase hover:bg-s2dio-red hover:text-white hover:border-white transition-all duration-75 animate-shake text-xl">
                [CONTÁCTANOS AHORA]
              </button>
            </div>
          </div>
          
          {/* Copyright y disclaimer brutal */}
          <div className="text-center space-y-4">
            <div className="bg-s2dio-yellow text-black p-4 border-4 border-black font-mono font-bold animate-blink inline-block skew-brutal">
              © 2025 S2DIO - TODOS LOS DERECHOS BRUTALES RESERVADOS
            </div>
            
            <div className="font-mono text-s2dio-yellow/80 text-sm max-w-2xl mx-auto leading-relaxed">
              SITIO WEB DESARROLLADO CON MÁXIMA BRUTALIDAD DIGITAL • 
              DISEÑO ANTI-CONVENCIONAL • CÓDIGO HARDCORE • 
              EXPERIENCIA DE USUARIO REVOLUCIONARIA
            </div>
            
            <div className="font-mono text-s2dio-yellow/60 text-xs">
              WARNING: ESTE SITIO PUEDE CAUSAR SHOCK VISUAL Y ADICCIÓN AL BUEN DISEÑO
            </div>
          </div>

          {/* Easter eggs finales */}
          <div className="absolute bottom-4 right-4 bg-s2dio-pink text-black p-2 font-mono text-xs font-bold rotate-12 animate-shake">
            KONAMI_CODE_READY
          </div>
          
          <div className="absolute bottom-4 left-4 bg-s2dio-lime text-black p-2 font-mono text-xs font-bold -rotate-12 animate-pulse">
            BRUTAL_MODE_ON
          </div>

          {/* Elemento final caótico */}
          <div className="absolute top-8 right-8 bg-black text-s2dio-red border-2 border-s2dio-red p-2 font-mono text-xs font-bold rotate-45 animate-blink">
            &lt;/CHAOS&gt;
          </div>
        </div>
      </footer>
    </main>
  )
}