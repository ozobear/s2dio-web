'use client'

interface Project {
  id: string
  title: string
  description: string
  technologies: string
  githubUrl?: string
  liveUrl?: string
}

interface ProjectsProps {
  title: string
  subtitle?: string
  projects: Project[]
}

export default function Projects({ title, subtitle, projects }: ProjectsProps) {
  const colors = ['bg-s2dio-orange', 'bg-s2dio-green', 'bg-s2dio-blue', 'bg-s2dio-purple', 'bg-s2dio-pink', 'bg-s2dio-lime']
  const shadows = ['brutal-shadow-orange', 'brutal-shadow-green', 'brutal-shadow-blue', 'brutal-shadow-purple']

  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="brutal-title text-s2dio-blue mb-8 glitch-text" data-text={title}>
            {title.toUpperCase()}
          </h2>
          {subtitle && (
            <div className="bg-s2dio-yellow p-6 border-4 border-black brutal-shadow-green rotate-brutal inline-block">
              <p className="brutal-text text-xl font-bold text-black">
                {subtitle.toUpperCase()}
              </p>
            </div>
          )}
        </div>

        <div className="brutal-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${colors[index % colors.length]} p-6 border-4 border-black ${
                shadows[index % shadows.length]
              } ${index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-2'} brutal-hover`}
            >
              <h3 className="font-display text-2xl font-black mb-4 text-black uppercase">
                [{project.title}]
              </h3>
              
              <p className="brutal-text mb-4 text-black font-bold">
                {project.description.toUpperCase()}
              </p>
              
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {JSON.parse(project.technologies).map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="bg-black text-white px-2 py-1 font-mono text-sm font-bold border-2 border-black"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-3 flex-wrap">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-4 py-2 border-4 border-black brutal-shadow-orange font-mono font-bold uppercase hover:bg-s2dio-red transition-all duration-75"
                  >
                    [CODE]
                  </a>
                )}
                
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-s2dio-red text-white px-4 py-2 border-4 border-black shadow-brutal font-mono font-bold uppercase hover:bg-black transition-all duration-75"
                  >
                    [DEMO]
                  </a>
                )}
              </div>

              {/* Random chaotic element */}
              {index % 2 === 0 && (
                <div className="absolute -top-2 -right-2 bg-s2dio-pink text-black p-1 font-mono text-xs font-bold rotate-12">
                  NEW!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chaotic footer element */}
        <div className="text-center mt-16">
          <div className="bg-black text-s2dio-lime p-4 border-4 border-s2dio-lime inline-block font-mono font-bold animate-shake">
            &lt;!-- MÁS PROYECTOS EN CONSTRUCCIÓN --&gt;
          </div>
        </div>
      </div>
    </section>
  )
}