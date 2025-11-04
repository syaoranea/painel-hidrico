
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// For now, we'll store settings in the user table
// In a real app, you might create a separate UserSettings table

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    // For demo purposes, return default settings
    // In a real app, you'd query from a settings table
    const defaultSettings = {
      customGoal: 2000,
      useAutoGoal: true,
      enableReminders: false,
      reminderInterval: 60,
      alexaEnabled: true,
    }

    return NextResponse.json(defaultSettings)

  } catch (error) {
    console.error('Settings get error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { customGoal, useAutoGoal, enableReminders, reminderInterval, alexaEnabled } = body

    // Validate inputs
    if (customGoal && (customGoal < 500 || customGoal > 10000)) {
      return NextResponse.json(
        { message: 'Meta personalizada deve estar entre 500ml e 10L' },
        { status: 400 }
      )
    }

    if (reminderInterval && (reminderInterval < 15 || reminderInterval > 480)) {
      return NextResponse.json(
        { message: 'Intervalo de lembretes deve estar entre 15 e 480 minutos' },
        { status: 400 }
      )
    }

    // In a real app, you'd save these to a settings table
    // For demo purposes, we'll just return success
    const settings = {
      customGoal: customGoal || 2000,
      useAutoGoal: useAutoGoal ?? true,
      enableReminders: enableReminders ?? false,
      reminderInterval: reminderInterval || 60,
      alexaEnabled: alexaEnabled ?? true,
    }

    return NextResponse.json(
      { 
        message: 'Configurações salvas com sucesso',
        settings
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
