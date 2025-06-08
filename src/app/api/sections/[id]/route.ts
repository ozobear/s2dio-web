// src/app/api/sections/[id]/route.ts (CORREGIDO para Next.js 15)
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const sectionSchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().positive()
})

// GET - Obtener una sección específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const section = await prisma.section.findUnique({
      where: { id }
    })

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    return NextResponse.json(section)
  } catch (error) {
    console.error('Error fetching section:', error)
    return NextResponse.json({ error: 'Error fetching section' }, { status: 500 })
  }
}

// PUT - Actualizar una sección
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = sectionSchema.parse(body)

    // Verificar que la sección existe
    const existingSection = await prisma.section.findUnique({
      where: { id }
    })

    if (!existingSection) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    // Si se está cambiando el nombre, verificar que no exista otra sección con ese nombre
    if (validatedData.name && validatedData.name !== existingSection.name) {
      const duplicateSection = await prisma.section.findUnique({
        where: { name: validatedData.name }
      })

      if (duplicateSection) {
        return NextResponse.json({ error: 'Ya existe una sección con ese nombre' }, { status: 400 })
      }
    }

    const updatedSection = await prisma.section.update({
      where: { id },
      data: validatedData
    })

    return NextResponse.json(updatedSection)
  } catch (error) {
    console.error('Error updating section:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error updating section' }, { status: 500 })
  }
}

// DELETE - Eliminar una sección
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Verificar que la sección existe
    const existingSection = await prisma.section.findUnique({
      where: { id }
    })

    if (!existingSection) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    await prisma.section.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Section deleted successfully' })
  } catch (error) {
    console.error('Error deleting section:', error)
    return NextResponse.json({ error: 'Error deleting section' }, { status: 500 })
  }
}