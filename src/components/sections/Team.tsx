// src/components/Team.tsx
'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { isValidImageUrl } from '@/utils/imageUtils'

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
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
    <section id="equipo" className="py-20 lg:py-32 bg-s2dio-blue relative overflow-hidden">
      {/* Formas geométricas decorativas dispersas */}
      <div className="absolute top-10 left-20 w-24 h-24 bg-s2dio-purple/40 transform rotate-45"></div>
      <div className="absolute top-32 right-16 w-32 h-32 bg-s2dio-orange/30 rounded-full"></div>
      <div className="absolute bottom-40 left-12 w-20 h-20 bg-s2dio-blue/50 transform -rotate-12"></div>
      <div className="absolute bottom-20 right-32 w-28 h-28 bg-s2dio-green/35 rounded-full"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-s2dio-purple/25 transform rotate-45"></div>
      <div className="absolute top-20 left-1/2 w-12 h-12 bg-s2dio-orange/40 transform -rotate-45"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Título con letras individuales coloridas */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-4 relative z-10 transform -rotate-1">
            <span className="brutal-title text-white uppercase glitch-text tracking-tighter">
              {title}
            </span>
          </h2>
          
          {subtitle && (
            <div className="relative inline-block">
              <div className="bg-s2dio-purple text-white px-8 py-3 transform -rotate-1 hover:rotate-1 transition-transform duration-300 border-4 border-black">
                <p className="text-xl md:text-2xl font-black uppercase tracking-wide">
                  {subtitle}
                </p>
              </div>
              <div className="absolute inset-0 bg-s2dio-orange transform translate-x-3 translate-y-3 -z-10 border-4 border-black"></div>
            </div>
          )}
        </div>

        {/* Layout libre para los miembros del equipo */}
        <div className="relative">
          {/* Layout para móvil - Grid simple */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:hidden">
            {team.map((member, index) => (
              <TeamMemberMobile key={member.id} member={member} index={index} />
            ))}
          </div>

          {/* Layout para desktop - Posicionamiento libre */}
          <div className="hidden lg:block relative min-h-[800px]">
            {team.map((member, index) => {
              const positions = [
                'absolute top-0 left-16',
                'absolute top-16 right-20',
                'absolute top-40 left-1/2 -translate-x-1/2',
                'absolute bottom-40 left-20',
                'absolute bottom-0 right-16',
                'absolute top-1/2 right-8 -translate-y-1/2'
              ]
              
              return (
                <div key={member.id} className={positions[index] || positions[0]}>
                  <TeamMemberDesktop member={member} index={index} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente para móvil
function TeamMemberMobile({ member, index }: { member: TeamMember; index: number }) {
  const colors = [
    { bg: 'bg-s2dio-orange', accent: 'bg-s2dio-yellow', text: 'text-black' },
    { bg: 'bg-s2dio-purple', accent: 'bg-s2dio-turquoise', text: 'text-white' },
    { bg: 'bg-s2dio-blue', accent: 'bg-s2dio-orange', text: 'text-white' },
    { bg: 'bg-s2dio-green', accent: 'bg-s2dio-purple', text: 'text-white' },
    { bg: 'bg-s2dio-turquoise', accent: 'bg-s2dio-yellow', text: 'text-black' },
    { bg: 'bg-s2dio-yellow', accent: 'bg-s2dio-blue', text: 'text-black' }
  ]
  
  const colorScheme = colors[index % colors.length]
  
  return (
    <div className="group text-center transform hover:scale-105 transition-all duration-300">
      {/* Foto */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className={`absolute inset-0 ${colorScheme.bg} transform rotate-6 group-hover:rotate-12 transition-transform duration-300`}></div>
        <div className="relative w-full h-full bg-white transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 overflow-hidden border-4 border-black">
          {member.image && isValidImageUrl(member.image) ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className={`w-full h-full ${colorScheme.bg} flex items-center justify-center text-white text-3xl font-black`}>
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
      
      {/* Información */}
      <div className="space-y-3">
        <h3 className={`text-2xl font-black ${colorScheme.text} uppercase`}>
          {member.name}
        </h3>
        <div className={`inline-block ${colorScheme.accent} px-4 py-2 transform -rotate-1 border-2 border-black`}>
          <p className="font-bold uppercase text-sm text-black">
            {member.role}
          </p>
        </div>
        {member.bio && (
          <p className="text-gray-700 font-medium max-w-xs mx-auto">
            {member.bio}
          </p>
        )}
        
        {/* Enlaces sociales */}
        <div className="flex justify-center gap-3 mt-4">
          {member.github && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" 
               className="w-10 h-10 bg-black hover:bg-gray-700 flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
              <Github size={20} className="text-white" />
            </a>
          )}
          {member.linkedIn && (
            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer"
               className={`w-10 h-10 ${colorScheme.bg} hover:opacity-80 flex items-center justify-center transform hover:rotate-12 transition-all duration-300`}>
              <Linkedin size={20} className="text-white" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`}
               className={`w-10 h-10 ${colorScheme.accent} hover:opacity-80 flex items-center justify-center transform hover:rotate-12 transition-all duration-300`}>
              <Mail size={20} className="text-black" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente para desktop
function TeamMemberDesktop({ member, index }: { member: TeamMember; index: number }) {
  const styles = [
    {
      photoSize: 'w-40 h-40',
      rotation: 'transform rotate-6 hover:rotate-12',
      photoRotation: 'transform -rotate-12 hover:-rotate-6',
      bgColor: 'bg-s2dio-orange',
      nameColor: 'bg-s2dio-purple',
      roleColor: 'bg-s2dio-yellow',
      textColor: 'text-white'
    },
    {
      photoSize: 'w-36 h-36',
      rotation: 'transform -rotate-3 hover:-rotate-8',
      photoRotation: 'transform rotate-8 hover:rotate-3',
      bgColor: 'bg-s2dio-purple',
      nameColor: 'bg-s2dio-turquoise',
      roleColor: 'bg-s2dio-orange',
      textColor: 'text-black'
    },
    {
      photoSize: 'w-48 h-48',
      rotation: 'transform rotate-2 hover:rotate-6',
      photoRotation: 'transform -rotate-6 hover:-rotate-12',
      bgColor: 'bg-s2dio-blue',
      nameColor: 'bg-s2dio-yellow',
      roleColor: 'bg-s2dio-green',
      textColor: 'text-black'
    },
    {
      photoSize: 'w-32 h-32',
      rotation: 'transform -rotate-8 hover:-rotate-12',
      photoRotation: 'transform rotate-12 hover:rotate-6',
      bgColor: 'bg-s2dio-green',
      nameColor: 'bg-s2dio-purple',
      roleColor: 'bg-s2dio-turquoise',
      textColor: 'text-white'
    },
    {
      photoSize: 'w-44 h-44',
      rotation: 'transform rotate-4 hover:rotate-10',
      photoRotation: 'transform -rotate-10 hover:-rotate-4',
      bgColor: 'bg-s2dio-turquoise',
      nameColor: 'bg-s2dio-orange',
      roleColor: 'bg-s2dio-purple',
      textColor: 'text-black'
    },
    {
      photoSize: 'w-28 h-28',
      rotation: 'transform -rotate-2 hover:-rotate-6',
      photoRotation: 'transform rotate-6 hover:rotate-12',
      bgColor: 'bg-s2dio-yellow',
      nameColor: 'bg-s2dio-blue',
      roleColor: 'bg-s2dio-green',
      textColor: 'text-white'
    }
  ]
  
  const style = styles[index % styles.length]
  
  return (
    <div className={`group ${style.rotation} transition-all duration-500 relative`}>      
      {/* Foto principal */}
      <div className={`${style.photoSize} mx-auto mb-6 relative group-hover:scale-110 transition-all duration-300`}>
        <div className={`absolute inset-0 ${style.bgColor} ${style.photoRotation} transition-all duration-300`}></div>
        <div className="absolute inset-0 bg-white transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
        
        <div className="relative w-full h-full bg-gray-100 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 overflow-hidden border-4 border-black">
          {member.image && isValidImageUrl(member.image) ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          ) : (
            <div className={`w-full h-full ${style.bgColor} flex items-center justify-center text-white text-4xl font-black`}>
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Decoraciones de esquina */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-s2dio-purple transform rotate-45"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-s2dio-orange transform rotate-45"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-s2dio-turquoise transform rotate-45"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-s2dio-yellow transform rotate-45"></div>
      </div>
      
      {/* Información flotante */}
      <div className="text-center space-y-4 max-w-xs">
        {/* Nombre */}
        <div className="relative">
          <h3 className={`text-xl font-black ${style.textColor} uppercase px-4 py-2 ${style.nameColor} transform -rotate-1 group-hover:rotate-1 transition-transform duration-300 border-4 border-black`}>
            {member.name}
          </h3>
          <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2 -z-10 border-4 border-black"></div>
        </div>
        
        {/* Rol */}
        <div className="relative">
          <p className={`font-bold uppercase text-sm px-3 py-2 ${style.roleColor} text-black transform rotate-2 group-hover:-rotate-2 transition-transform duration-300 border-2 border-black`}>
            {member.role}
          </p>
        </div>
        
        {/* Bio */}
        {member.bio && (
          <p className="text-gray-700 font-medium text-sm bg-white/80 px-3 py-2 transform rotate-1 border-2 border-gray-300">
            {member.bio}
          </p>
        )}
        
        {/* Enlaces sociales */}
        <div className="flex justify-center gap-3">
          {member.github && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" 
               className="w-8 h-8 bg-black hover:bg-gray-700 flex items-center justify-center transform hover:rotate-45 transition-all duration-300">
              <Github size={16} className="text-white" />
            </a>
          )}
          {member.linkedIn && (
            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-blue-600 hover:bg-blue-700 flex items-center justify-center rounded-full transform hover:scale-125 transition-all duration-300">
              <Linkedin size={16} className="text-white" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`}
               className={`w-8 h-8 ${style.bgColor} hover:opacity-80 flex items-center justify-center transform hover:rotate-45 transition-all duration-300`}>
              <Mail size={16} className="text-white" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}