
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'


export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { quantidadeUrinaMl, urineType, observacoes, usuarioId } = body

    if (!quantidadeUrinaMl || quantidadeUrinaMl <= 0) {
      return NextResponse.json({ message: 'Quantidade deve ser maior que zero' }, { status: 400 })
    }

    const response = await fetch('https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantidadeUrinaMl: quantidadeUrinaMl,
        urineType: urineType,
        observacoes: observacoes,
        usuarioId: usuarioId
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro ao salvar no backend:', errorText)
      return NextResponse.json(
        { message: 'Erro ao salvar no servidor Java', backendError: errorText },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json(
      { message: 'Urina registrada com sucesso', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Water intake error:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
