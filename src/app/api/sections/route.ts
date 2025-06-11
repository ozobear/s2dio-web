import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json({ error: 'Error al cargar secciones' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, subtitle, content, videoUrl, order, isActive } = body

    // Validaciones básicas
    if (!name || !title) {
      return NextResponse.json(
        { error: 'Nombre y título son requeridos' },
        { status: 400 }
      )
    }

    const section = await prisma.section.create({
      data: {
        name,
        title,
        subtitle: subtitle || null,
        content: content || null,
        videoUrl: videoUrl || null,
        order: order || 1,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json(
      { error: 'Error al crear sección' },
      { status: 500 }
    )
  }
}