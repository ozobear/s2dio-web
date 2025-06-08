'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  github?: string
  linkedIn?: string
  email?: string
}

interface TeamProps {
  title: string
  subtitle?: string
  team: TeamMember[]
}

export default function Team({ title, subtitle, team }: TeamProps) {
  return (
    <section id="equipo" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="gradient-text-purple">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={member.id} className="glass-card p-6 text-center card-hover">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full bg-gradient-to-br from-s2dio-blue to-s2dio-purple rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-1 text-white">
                {member.name}
              </h3>
              
              <p className="text-s2dio-blue font-medium mb-3">
                {member.role}
              </p>
              
              {member.bio && (
                <p className="text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>
              )}
              
              <div className="flex justify-center gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-s2dio-blue transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-s2dio-blue transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 hover:text-s2dio-blue transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}