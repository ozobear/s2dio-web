import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, title, subtitle, content, videoUrl, order, isActive } = body

    // Validaciones básicas
    if (!name || !title) {
      return NextResponse.json(
        { error: 'Nombre y título son requeridos' },
        { status: 400 }
      )
    }

    const section = await prisma.section.update({
      where: { id },
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

    return NextResponse.json(section)
  } catch (error) {
    console.error('Error updating section:', error)
    return NextResponse.json(
      { error: 'Error al actualizar sección' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.section.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Sección eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting section:', error)
    return NextResponse.json(
      { error: 'Error al eliminar sección' },
      { status: 500 }
    )
  }
}