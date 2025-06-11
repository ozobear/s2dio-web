import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json({ error: 'Error al cargar miembros del equipo' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, bio, image, linkedIn, github, email, order, isActive } = body

    // Validaciones básicas
    if (!name || !role) {
      return NextResponse.json(
        { error: 'Nombre y rol son requeridos' },
        { status: 400 }
      )
    }

    const teamMember = await prisma.teamMember.create({
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

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Error al crear miembro del equipo' },
      { status: 500 }
    )
  }
}