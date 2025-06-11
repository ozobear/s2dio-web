import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, role, bio, image, linkedIn, github, email, order, isActive } = body

    // Validaciones básicas
    if (!name || !role) {
      return NextResponse.json(
        { error: 'Nombre y rol son requeridos' },
        { status: 400 }
      )
    }

    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        bio: bio || null,
        image: image || null,
        linkedIn: linkedIn || null,
        github: github || null,
        email: email || null,
        order: order || 1,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Error al actualizar miembro del equipo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.teamMember.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Miembro del equipo eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Error al eliminar miembro del equipo' },
      { status: 500 }
    )
  }
}