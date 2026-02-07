import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const API_BASE = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com'

export async function GET() {
  console.log('entrou')
  try {
    
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const userId = session.user.id
    console.log(userId)
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    // 1️⃣ Buscar registros de ingestão de água (tabela controle_hidrico)
    console.log("🔍 Chamando Lambda CONTROLES...");
    const controleResponse = await fetch(`https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario/${userId}?limit=135`)
    const [metasRes] = await Promise.all([
      fetch(`${API_BASE}/metas/${userId}`)
    ])

    console.log('STATUS:',
      metasRes.status
    )

    if (!metasRes.ok) {
      return NextResponse.json(
        { message: 'Erro ao buscar dados no servidor' },
        { status: 500 }
      )
    }

    const metasResponse = await metasRes.json()
    const metas = metasResponse.items?.[0] ?? {}
    
    if (!controleResponse.ok) {
      const errorText = await controleResponse.text()
      console.error('Erro ao buscar dados de controle hídrico:', errorText)
      throw new Error('Erro ao buscar dados de controle hídrico')
    }

    // 🔹 Obter dados do controle
const controles = await controleResponse.json()
const controleItems = Array.isArray(controles)
  ? controles
  : controles.items || controles.content || []

// 🔹 Define o "hoje" local
const now = new Date()
const todayStart = new Date(now)
todayStart.setHours(0, 0, 0, 0)



const todayEnd = new Date(now)
todayEnd.setHours(23, 59, 59, 999)

// 🔹 Filtra os registros dentro do intervalo local
const todayControls = controleItems.filter((c: any) => {
  const registroDate = new Date(c.timestamp)
  return registroDate >= todayStart && registroDate <= todayEnd
})

// 🔹 Soma a quantidade ingerida
const todayWater = todayControls.reduce((total: number, c: any) => {
  return total + (c.quantidadeLiquidoMl || 0)
}, 0)

console.log('💧 Água ingerida hoje (ml):', todayWater)



  // 2️⃣ Buscar registros de urina
  const urinaResponse = await fetch(`https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario/${userId}/urina`)
  
    if (!urinaResponse.ok) {
  const errorText = await urinaResponse.text()
  console.error('Erro ao buscar dados de urina:', errorText)
  throw new Error('Erro ao buscar dados de urina')
  }

  const urinas = await urinaResponse.json()

  // Normaliza dia atual para 'YYYY-MM-DD'
  //const todayUrinehoje = new Date().toISOString().split('T')[0]

  // Conta registros de urina só do dia atual
  const todayUrine = urinas.items?.filter((u: any) => {
    const registroDate = new Date(u.timestamp)
    return registroDate >= todayStart && registroDate <= todayEnd
  })?.length ?? 0

  console.log('Micções hoje:', todayUrine)
    // 3️⃣ Buscar dados do usuário (para meta diária)
    const userResponse = await fetch(`https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/usuarios/${userId}`)
  
    if(!userResponse.ok){
      console.error('Erro ao buscar dados de controle hídrico:', )
      throw new Error('Erro ao buscar dados de controle hídrico')
    }
    const user = userResponse.ok ? await userResponse.json() : null
    session.user.height = user.height

    // 4️⃣ Calcular meta diária automática
    console.log('www'+user?.weight)

    const dailyGoal = calculateDailyGoal(user?.weight, user?.age, user?.activityLevel)

    // 5️⃣ Calcular progresso e sequência
    const progress = dailyGoal > 0 ? Math.round((todayWater / dailyGoal) * 100) : 0
    const streak = metas.currentStreak



    return NextResponse.json({
      todayWater,
      todayUrine,
      dailyGoal,
      progress,
      streak,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar dados do servidor ' },
      { status: 500 }
    )
  }
}

// Função auxiliar (mantém igual)
function calculateDailyGoal(weight?: number | null, age?: number | null, activityLevel?: string | null): number {
  console.log('entrou')
  const baseAmount = weight ? weight * 35 : 2000
  let multiplier = 1
  switch (activityLevel) {
    case 'low': multiplier = 1; break
    case 'moderate': multiplier = 1.2; break
    case 'high': multiplier = 1.5; break
    default: multiplier = 1.2
  }
  if (age && age > 60) multiplier *= 1.1
  return Math.round(baseAmount * multiplier)
}