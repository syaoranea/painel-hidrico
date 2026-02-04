
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { tiposLiquido } from '@/lib/tiposLiquido'

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
          fetch(`${API_CONTROLE_URL}/${userId}/ingestao/hoje`),
          fetch(`${API_URINA_URL}/${userId}/urina/hoje`)
        ])
    
        if (!controleRes.ok || !urinaRes.ok) {
          return NextResponse.json(
            { message: 'Erro ao buscar dados no servidor ' },
            { status: 500 }
          )
        }
    
        const controleData = await controleRes.json()
        const urinaData = await urinaRes.json()
    
       
        const waterIntakes = controleData.items || []   // ingestão
        const urineRecords = urinaData.items || []   
        console.log(waterIntakes, 'recebida')
        console.log(urinaData, 'recebida')
    // 🔹 Unifica e formata exatamente como antes
    const activities = [
    ...waterIntakes.map((intake: any) => {
      // Busca o tipo de líquido pelo ID armazenado no DynamoDB
      const tipo = tiposLiquido.find(
        (t) => t.id === intake.tipoLiquidoId
      ) || { nome: 'Desconhecido', categoria: 'Outro' };

      return {
        id: intake.SK,
        type: 'water' as const,
        amount: intake.quantidadeLiquidoMl,
        timestamp: intake.timestamp,
        notes: intake.observacoes || '',
        tipoLiquido: tipo.nome,        // ✅ Nome do tipo de líquido
        categoriaLiquido: tipo.categoria, // ✅ Categoria (Água, Chá, etc.)
      };
    }),
      ...urineRecords.map((record: any) => ({
        id: record.SK,
        type: 'urine' as const,
        volume: record.quantidadeUrinaMl,
        timestamp: record.timestamp,
        notes: record.observacoes || '',
      })),
    ]

  console.log(activities, 'activities')

    // 🔹 Retorna só os 15 mais recentes
    return NextResponse.json(activities.slice(0, 15))

  } catch (error) {
    console.error('Recent activities error:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type') // "water" ou "urine"
    const userId = session.user.id

    if (!id || !type) {
      return NextResponse.json(
        { message: 'Parâmetros "id" e "type" são obrigatórios' },
        { status: 400 }
      )
    }

    // 🔗 Monta a URL do endpoint da Lambda (deleteRecord)
    const deleteUrl = `${API_CONTROLE_URL}/${userId}/${type}/${encodeURIComponent(id)}`

    console.log('🗑️ Excluindo registro via Lambda:', deleteUrl)

    const deleteResponse = await fetch(deleteUrl, { method: 'DELETE' })

    if (!deleteResponse.ok) {
      const errorText = await deleteResponse.text()
      console.error('Erro ao excluir registro:', errorText)
      return NextResponse.json(
        { message: 'Erro ao excluir registro' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: `Registro de ${type} excluído com sucesso` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro na exclusão de registro:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
