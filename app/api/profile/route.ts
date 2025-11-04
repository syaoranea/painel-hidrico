
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'


const API_URL = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/usuarios'

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
    const { firstName, lastName, email, weight, age, height, activityLevel } = body

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: 'Nome e sobrenome são obrigatórios' },
        { status: 400 }
      )
    }

    
    // 🔹 Envia os dados para o backend Java
    const res = await fetch(`${API_URL}/${session.user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        weight,
        age,
        height,
        activityLevel
      }),
    })

    if (!res.ok) {
      const backendError = await res.text()
      console.error('Erro backend:', backendError)
      return NextResponse.json(
        { message: 'Erro ao atualizar no servidor Java', backendError },
        { status: 500 }
      )
    }

    const user = await res.json()
    

    return NextResponse.json(
      {
        message: 'Perfil atualizado com sucesso',
        user
      },
      { status: 200 }
    )



  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    // 🔹 Busca o usuário pelo ID no Java
    const res = await fetch(`${API_URL}/${session.user.id}`)

    if (!res.ok) {
      const backendError = await res.text()
      console.error('Erro backend:', backendError)
      return NextResponse.json(
        { message: 'Erro ao buscar no servidor Java', backendError },
        { status: 500 }
      )
    }

    const user = await res.json()

    return NextResponse.json(user)

  } catch (error) {
    console.error('Profile get error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
