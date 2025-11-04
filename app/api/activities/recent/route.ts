
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

  const API_CONTROLE_URL = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario'
  const API_URINA_URL = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario'
export async function GET() {
  
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id

    const [controleRes, urinaRes] = await Promise.all([
          fetch(`${API_CONTROLE_URL}/${userId}?limit=2`),
          fetch(`${API_URINA_URL}/${userId}/urina?limit=1`)
        ])
    
        if (!controleRes.ok || !urinaRes.ok) {
          return NextResponse.json(
            { message: 'Erro ao buscar dados no servidor Java' },
            { status: 500 }
          )
        }
    
        const controleData = await controleRes.json()
        const urinaData = await urinaRes.json()
    
        // 🔹 Ajuste os dados recebidos (Spring retorna com "content" se for Page)
        const waterIntakes = controleData.items || []   // ingestão
        const urineRecords = urinaData.items || []   

    // 🔹 Unifica e formata exatamente como antes
    const activities = [
      ...waterIntakes.map((intake: any) => ({
        id: intake.SK,
        type: 'water' as const,
        amount: intake.quantidadeLiquidoMl,
        timestamp: intake.timestamp,
        notes: intake.observacoes || '',
      })),
      ...urineRecords.map((record: any) => ({
        id: record.SK,
        type: 'urine' as const,
        volume: record.quantidadeUrinaMl,
        timestamp: record.timestamp,
        notes: record.observacoes || '',
      })),
    ]

    // 🔹 Ordena por timestamp
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // 🔹 Retorna só os 15 mais recentes
    return NextResponse.json(activities.slice(0, 15))

  } catch (error) {
    console.error('Recent activities error:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
