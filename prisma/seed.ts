import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear usuario admin
  console.log('👤 Creando usuario administrador...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@s2dio.com' },
    update: {},
    create: {
      email: 'admin@s2dio.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN'
    }
  })

  // Crear secciones por defecto
  console.log('📝 Creando secciones...')
  const sections = [
    {
      name: 'hero',
      title: 'Construimos el futuro digital',
      subtitle: 'Somos un estudio especializado en desarrollo web y software',
      content: 'Transformamos ideas en experiencias digitales excepcionales con tecnología de vanguardia.',
      order: 1
    },
    {
      name: 'about',
      title: 'Nosotros',
      subtitle: 'Un equipo apasionado por la tecnología',
      content: '<p>En <strong>S2dio</strong> combinamos creatividad y tecnología para crear soluciones digitales que impulsan el crecimiento de nuestros clientes.</p><p>Desde 2020, hemos trabajado con empresas de diversos sectores, ayudándolas a transformar sus procesos y alcanzar sus objetivos a través de la innovación tecnológica.</p>',
      order: 2
    },
    {
      name: 'projects',
      title: 'Nuestros Proyectos',
      subtitle: 'Explora algunos de nuestros trabajos más destacados',
      content: 'Cada proyecto es único y refleja nuestro compromiso con la excelencia y la innovación.',
      order: 3
    },
    {
      name: 'services',
      title: 'Qué Hacemos',
      subtitle: 'Servicios especializados para impulsar tu negocio',
      content: 'Ofrecemos una gama completa de servicios tecnológicos adaptados a las necesidades específicas de cada cliente.',
      order: 4
    },
    {
      name: 'team',
      title: 'Nuestro Equipo',
      subtitle: 'Conoce a las personas detrás de S2dio',
      content: 'Un grupo diverso de profesionales unidos por la pasión por la tecnología y la innovación.',
      order: 5
    },
    {
      name: 'gif',
      title: 'GIF del Día',
      subtitle: 'Un toque de diversión para alegrar tu día',
      content: 'Porque el desarrollo también puede ser divertido.',
      order: 6
    }
  ]

  for (const section of sections) {
    await prisma.section.upsert({
      where: { name: section.name },
      update: {
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        order: section.order
      },
      create: section
    })
  }

  // Crear proyectos de ejemplo (usando deleteMany + createMany en lugar de upsert)
  console.log('🚀 Creando proyectos...')
  
  // Primero eliminar proyectos existentes para evitar duplicados
  await prisma.project.deleteMany({})
  
  const projects = [
    {
      title: 'E-commerce Moderno',
      description: 'Plataforma de comercio electrónico con React y Node.js',
      longDescription: 'Una solución completa de e-commerce con carrito de compras, pagos seguros y panel de administración.',
      technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Stripe']),
      githubUrl: 'https://github.com/s2dio/ecommerce',
      liveUrl: 'https://demo-ecommerce.s2dio.com',
      order: 1,
      isActive: true
    },
    {
      title: 'App de Gestión',
      description: 'Aplicación web para gestión empresarial',
      longDescription: 'Sistema integral de gestión con módulos de inventario, ventas y reportes.',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma']),
      githubUrl: 'https://github.com/s2dio/management-app',
      liveUrl: 'https://demo-management.s2dio.com',
      order: 2,
      isActive: true
    },
    {
      title: 'Portfolio Creativo',
      description: 'Sitio web portfolio con animaciones avanzadas',
      longDescription: 'Portfolio interactivo con animaciones 3D y efectos visuales impresionantes.',
      technologies: JSON.stringify(['Three.js', 'GSAP', 'Vue.js', 'Nuxt.js']),
      githubUrl: 'https://github.com/s2dio/creative-portfolio',
      liveUrl: 'https://demo-portfolio.s2dio.com',
      order: 3,
      isActive: true
    },
    {
      title: 'Dashboard Analítico',
      description: 'Panel de control con métricas en tiempo real',
      longDescription: 'Dashboard avanzado con visualizaciones de datos y métricas empresariales.',
      technologies: JSON.stringify(['React', 'D3.js', 'Python', 'FastAPI']),
      githubUrl: 'https://github.com/s2dio/analytics-dashboard',
      liveUrl: 'https://demo-analytics.s2dio.com',
      order: 4,
      isActive: true
    },
    {
      title: 'App Móvil Fitness',
      description: 'Aplicación móvil para seguimiento de ejercicios',
      longDescription: 'App nativa con seguimiento de rutinas, métricas de progreso y gamificación.',
      technologies: JSON.stringify(['React Native', 'Firebase', 'Redux', 'Node.js']),
      githubUrl: 'https://github.com/s2dio/fitness-app',
      liveUrl: 'https://demo-fitness.s2dio.com',
      order: 5,
      isActive: true
    },
    {
      title: 'Plataforma Educativa',
      description: 'Sistema de gestión de aprendizaje online',
      longDescription: 'LMS completo con cursos, evaluaciones y seguimiento de progreso.',
      technologies: JSON.stringify(['Laravel', 'Vue.js', 'MySQL', 'Redis']),
      githubUrl: 'https://github.com/s2dio/education-platform',
      liveUrl: 'https://demo-education.s2dio.com',
      order: 6,
      isActive: true
    }
  ]

  await prisma.project.createMany({
    data: projects
  })

  // Crear servicios de ejemplo
  console.log('⚙️ Creando servicios...')
  
  // Eliminar servicios existentes
  await prisma.service.deleteMany({})
  
  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos sitios web modernos, responsivos y optimizados para SEO que convierten visitantes en clientes.',
      icon: 'globe',
      order: 1,
      isActive: true
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Desarrollamos apps nativas e híbridas para iOS y Android con experiencias de usuario excepcionales.',
      icon: 'smartphone',
      order: 2,
      isActive: true
    },
    {
      title: 'Desarrollo Backend',
      description: 'APIs robustas y escalables con las mejores prácticas de seguridad y rendimiento.',
      icon: 'database',
      order: 3,
      isActive: true
    },
    {
      title: 'UI/UX Design',
      description: 'Diseños intuitivos y atractivos que mejoran la experiencia del usuario y aumentan las conversiones.',
      icon: 'palette',
      order: 4,
      isActive: true
    },
    {
      title: 'Consultoría Tech',
      description: 'Asesoramiento estratégico para optimizar procesos y adoptar las mejores tecnologías.',
      icon: 'zap',
      order: 5,
      isActive: true
    },
    {
      title: 'Desarrollo Custom',
      description: 'Soluciones a medida que se adaptan perfectamente a las necesidades específicas de tu negocio.',
      icon: 'code',
      order: 6,
      isActive: true
    }
  ]

  await prisma.service.createMany({
    data: services
  })

  // Crear miembros del equipo
  console.log('👥 Creando equipo...')
  
  // Eliminar miembros existentes
  await prisma.teamMember.deleteMany({})
  
  const teamMembers = [
    {
      name: 'Alex Rivera',
      role: 'Full Stack Developer',
      bio: 'Especialista en React y Node.js con 5+ años de experiencia en desarrollo web.',
      github: 'https://github.com/alexrivera',
      linkedIn: 'https://linkedin.com/in/alexrivera',
      email: 'alex@s2dio.com',
      order: 1,
      isActive: true
    },
    {
      name: 'Sofia Chen',
      role: 'UI/UX Designer',
      bio: 'Diseñadora creativa apasionada por crear experiencias digitales memorables.',
      github: 'https://github.com/sofiachen',
      linkedIn: 'https://linkedin.com/in/sofiachen',
      email: 'sofia@s2dio.com',
      order: 2,
      isActive: true
    },
    {
      name: 'Mario Gonzalez',
      role: 'Backend Developer',
      bio: 'Experto en arquitecturas escalables y optimización de bases de datos.',
      github: 'https://github.com/mariogonzalez',
      linkedIn: 'https://linkedin.com/in/mariogonzalez',
      email: 'mario@s2dio.com',
      order: 3,
      isActive: true
    },
    {
      name: 'Luna Torres',
      role: 'Project Manager',
      bio: 'Coordinadora de proyectos con enfoque en metodologías ágiles y entrega de calidad.',
      linkedIn: 'https://linkedin.com/in/lunatorres',
      email: 'luna@s2dio.com',
      order: 4,
      isActive: true
    },
    {
      name: 'Diego Morales',
      role: 'DevOps Engineer',
      bio: 'Especialista en infraestructura cloud y automatización de despliegues.',
      github: 'https://github.com/diegomorales',
      linkedIn: 'https://linkedin.com/in/diegomorales',
      email: 'diego@s2dio.com',
      order: 5,
      isActive: true
    },
    {
      name: 'Carmen Ruiz',
      role: 'QA Engineer',
      bio: 'Especialista en testing automatizado y aseguramiento de calidad.',
      github: 'https://github.com/carmenruiz',
      linkedIn: 'https://linkedin.com/in/carmenruiz',
      email: 'carmen@s2dio.com',
      order: 6,
      isActive: true
    }
  ]

  await prisma.teamMember.createMany({
    data: teamMembers
  })

  // Crear un GIF del día de ejemplo (opcional, ya que ahora es automático)
  console.log('🎭 Creando GIF del día...')
  try {
    await prisma.gifOfTheDay.upsert({
      where: { 
        date: new Date(new Date().toDateString()) // Solo la fecha sin hora
      },
      update: {},
      create: {
        title: '¡Viernes de Deploy!',
        url: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
        alt: 'Gato programador trabajando en código',
        date: new Date(new Date().toDateString()),
        isActive: true
      }
    })
  } catch (error) {
    console.log('⚠️ No se pudo crear GIF del día (probablemente ya existe)')
  }

  console.log('✅ Seed completed successfully!')
  console.log('📧 Admin email: admin@s2dio.com')
  console.log('🔐 Admin password: admin123')
  console.log(`📊 Creados: ${projects.length} proyectos, ${services.length} servicios, ${teamMembers.length} miembros del equipo`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })