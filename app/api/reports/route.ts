import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const API_BASE = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7days'

    const userId = session.user.id
    const now = new Date()

    let days = 7
    let limit = 200

    switch (period) {
      case '30days':
        days = 30
        limit = 550
        break
      case '90days':
        days = 90
        limit = 1500
        break
      default:
        days = 7
    }

    // 🔹 Data inicial EXATA do período
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)
    startDate.setDate(startDate.getDate() - (days - 1))

    // 🔹 Busca paralela
    const [controleRes, urinaRes, userRes, metasRes] = await Promise.all([
      fetch(`${API_BASE}/controles/usuario/${userId}?limit=${limit}`),
      fetch(`${API_BASE}/controles/usuario/${userId}/urina?limit=${limit}`),
      fetch(`${API_BASE}/usuarios/${userId}`),
      fetch(`${API_BASE}/metas/${userId}`)
    ])

    console.log('STATUS:',
      controleRes.status,
      urinaRes.status,
      userRes.status,
      metasRes.status
    )

    if (!controleRes.ok || !urinaRes.ok || !userRes.ok || !metasRes.ok) {
      return NextResponse.json(
        { message: 'Erro ao buscar dados no servidor' },
        { status: 500 }
      )
    }

    const controleData = await controleRes.json()
    const urinaData = await urinaRes.json()
    const user = await userRes.json()
    const metasResponse = await metasRes.json()
    const metas = metasResponse.items?.[0] ?? {}

    const waterIntakes = controleData.items || []
    const urineRecords = urinaData.items || []

    // 🔹 Filtrar registros dentro do período
    const filteredWater = waterIntakes.filter((i: any) => {
      const d = new Date(i.timestamp)
      return d >= startDate && d <= now
    })

    const filteredUrine = urineRecords.filter((i: any) => {
      const d = new Date(i.timestamp)
      return d >= startDate && d <= now
    })

    const waterData = []
    const urineDataProcessed = []
    const progressData = []

    const dailyGoal = calculateDailyGoal(user?.weight, user?.age, user?.activityLevel)

    // 🔹 Loop de dias
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const nextDay = new Date(date)
      nextDay.setDate(date.getDate() + 1)

      const dateStr = date.toISOString().split('T')[0]

      // 💧 Água do dia
      const dayWater = filteredWater
        .filter((w: any) => {
          const d = new Date(w.timestamp)
          return d >= date && d < nextDay
        })
        .reduce((s: number, w: any) => s + (w.quantidadeLiquidoMl || 0), 0)

      // 🚽 Urina do dia
      const dayUrineRecords = filteredUrine.filter((u: any) => {
        const d = new Date(u.timestamp)
        return d >= date && d < nextDay
      })

      const dayUrineVolume = dayUrineRecords.reduce(
        (s: number, u: any) => s + (u.quantidadeUrinaMl || 0),
        0
      )

      const dayUrineFrequency = dayUrineRecords.length

      const progress =
        dailyGoal > 0 ? Math.round((dayWater / dailyGoal) * 100) : 0

      waterData.push({ date: dateStr, water: dayWater, goal: dailyGoal })
      urineDataProcessed.push({
        date: dateStr,
        frequency: dayUrineFrequency,
        volume: dayUrineVolume
      })
      progressData.push({
        date: dateStr,
        progress: Math.min(progress, 150),
        streak: 0
      })
    }

    // 🔹 Streaks
    let currentStreak = metas.currentStreak
    let longestStreak = metas.longestStreak
    let currentStreakData = metas.currentStreakData
    let longestStreakData = metas.longestStreakData
    console.log(metas)

    // 🔹 Estatísticas corretas do período
    const totalWater = filteredWater.reduce(
      (s: number, w: any) => s + (w.quantidadeLiquidoMl || 0),
      0
    )

    const averageDaily = Math.round(totalWater / days)

    const goalsAchieved = progressData.filter(d => d.progress >= 100).length
    const goalAchievement = Math.round((goalsAchieved / days) * 100)

    const totalUrineRecords = filteredUrine.length
    const averageUrineFrequency = Math.round(totalUrineRecords / days)

    const insights = []

    if (averageDaily < dailyGoal) {
      insights.push({
        title: 'Hidratação Insuficiente',
        description: `Sua média diária de ${averageDaily}ml está abaixo da recomendação mínima.`
      })
    }

    if (goalAchievement < 70) {
      insights.push({
        title: 'Foque nas Metas',
        description: `Você atingiu apenas ${goalAchievement}% das metas.`
      })
    }

    if (currentStreak >= 7) {
      insights.push({
        title: 'Excelente Consistência!',
        description: `Você mantém uma sequência de ${currentStreak} dias.`
      })
    }

    if (averageUrineFrequency < 4) {
      insights.push({
        title: 'Frequência Baixa',
        description:
          'Sua frequência de eliminação parece baixa — pode indicar desidratação.'
      })
    }

    return NextResponse.json({
      overview: {
        totalWater,
        averageDaily,
        goalAchievement,
        longestStreak,
        currentStreak,
        currentStreakData,
        longestStreakData,
        totalUrineRecords,
        averageUrineFrequency
      },
      waterData,
      urineData: urineDataProcessed,
      progressData,
      insights
    })
  } catch (error) {
    console.error('Reports error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

function calculateDailyGoal(
  weight?: number | null,
  age?: number | null,
  activityLevel?: string | null
): number {
  const base = weight ? weight * 35 : 2000

  let mult = 1.2
  if (activityLevel === 'high') mult = 1.5
  if (activityLevel === 'low') mult = 1

  if (age && age > 60) mult *= 1.1

  return Math.round(base * mult)
}
