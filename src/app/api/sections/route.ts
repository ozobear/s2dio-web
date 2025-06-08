import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const sectionSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().positive()
})

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json({ error: 'Error fetching sections' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = sectionSchema.parse(body)

    // Verificar que no exista otra sección con el mismo nombre
    const existingSection = await prisma.section.findUnique({
      where: { name: validatedData.name }
    })

    if (existingSection) {
      return NextResponse.json({ error: 'Ya existe una sección con ese nombre' }, { status: 400 })
    }

    const section = await prisma.section.create({
      data: validatedData
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Error creating section' }, { status: 500 })
  }
}