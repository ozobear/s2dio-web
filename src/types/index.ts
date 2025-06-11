export interface Service {
  id: string
  title: string
  description: string
  icon: string // URL de la imagen
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string // URL de la imagen
  linkedIn?: string
  github?: string
  email?: string
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image?: string
  technologies: string // JSON array as string
  githubUrl?: string
  liveUrl?: string
  order: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Section {
  id: string
  name: string
  title: string
  subtitle?: string
  content?: string
  isActive: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}