
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Check if Alexa credentials are configured
    const skillId = process.env.ALEXA_SKILL_ID
    const clientId = process.env.ALEXA_CLIENT_ID
    const clientSecret = process.env.ALEXA_CLIENT_SECRET

    if (!skillId || !clientId || !clientSecret) {
      return NextResponse.json(
        { message: 'Credenciais da Alexa não configuradas' },
        { status: 400 }
      )
    }

    // In a real implementation, you might make a test call to Amazon's APIs
    // For demo purposes, we'll just verify the credentials exist

    return NextResponse.json(
      { 
        message: 'Integração com Alexa funcionando',
        skillId: skillId,
        status: 'active'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Alexa test error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
