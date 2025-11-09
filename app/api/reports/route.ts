import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const API_CONTROLE_URL = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario'
const API_URINA_URL = 'https://m1f21fnc50.execute-api.us-east-1.amazonaws.com/controles/usuario'

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
    
    let startDate = new Date(now)
    switch (period) {
      case '7days':
        startDate.setDate(now.getDate() - 7)
        break
      case '30days':
        startDate.setDate(now.getDate() - 30)
        break
      case '90days':
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }
    startDate.setHours(0, 0, 0, 0)

    // 🔹 Busca os dados no backend Java
    const [controleRes, urinaRes] = await Promise.all([
      fetch(`${API_CONTROLE_URL}/${userId}?limit=200`),
      fetch(`${API_URINA_URL}/${userId}/urina?limit=100`)
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

    // 🔹 Processa por dia
    const days = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const waterData = []
    const urineDataProcessed = []
    const progressData = []

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]

      const nextDay = new Date(date)
      nextDay.setDate(date.getDate() + 1)

      // 💧 Água
      const dayWaterIntakes = waterIntakes.filter((intake: any) => {
        const intakeDate = new Date(intake.timestamp)
        return intakeDate >= date && intakeDate < nextDay
      })

      const dayWaterTotal = dayWaterIntakes.reduce(
        (sum: number, intake: any) => sum + (intake.quantidadeLiquidoMl || 0),
        0
      )

      // 🚽 Urina
      const dayUrineRecords = urineRecords.filter((record: any) => {
        const recordDate = new Date(record.timestamp)
        return recordDate >= date && recordDate < nextDay
      })

      const dayUrineVolume = dayUrineRecords.reduce(
        (sum: number, record: any) => sum + (record.quantidadeUrinaMl || 0),
        0
      )
      const dayUrineFrequency = dayUrineRecords.length


      const goalMl = 2000
      const progress = goalMl > 0 ? Math.round((dayWaterTotal / goalMl) * 100) : 0

      waterData.push({
        date: dateStr,
        water: dayWaterTotal,
        goal: goalMl,
      })

      urineDataProcessed.push({
        date: dateStr,
        frequency: dayUrineFrequency,
        volume: dayUrineVolume,
      })

      progressData.push({
        date: dateStr,
        progress: Math.min(progress, 150),
        streak: 0,
      })
    }

    // 🔹 Calcula streaks
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    for (let i = progressData.length - 1; i >= 0; i--) {
      if (progressData[i].progress >= 80) {
        tempStreak++
        if (i === progressData.length - 1) currentStreak = tempStreak
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 0
      }
      progressData[i].streak = tempStreak
    }
    longestStreak = Math.max(longestStreak, tempStreak)

    // 🔹 Estatísticas gerais
    const totalWater = waterIntakes.reduce(
      (sum: number, intake: any) => sum + (intake.quantidadeLiquidoMl || 0),
      0
    )
    const averageDaily = Math.round(totalWater / Math.max(days, 1))
    const goalsAchieved = progressData.filter(day => day.progress >= 100).length
    const goalAchievement = Math.round((goalsAchieved / days) * 100)
    const totalUrineRecords = urineRecords.length
    const averageUrineFrequency = Math.round(totalUrineRecords / Math.max(days, 1))

    // 🔹 Gera insights
    const insights = []

    if (averageDaily < 2000) {
      insights.push({
        title: 'Hidratação Insuficiente',
        description: `Sua média diária de ${averageDaily}ml está abaixo da recomendação mínima.`,
      })
    }

    if (goalAchievement < 70) {
      insights.push({
        title: 'Foque nas Metas',
        description: `Você atingiu apenas ${goalAchievement}% das metas.`,
      })
    }

    if (currentStreak >= 7) {
      insights.push({
        title: 'Excelente Consistência!',
        description: `Você mantém uma sequência de ${currentStreak} dias.`,
      })
    }

    if (averageUrineFrequency < 4) {
      insights.push({
        title: 'Frequência Baixa',
        description: 'Sua frequência de eliminação parece baixa — pode indicar desidratação.',
      })
    }

    const overview = {
      totalWater,
      averageDaily,
      goalAchievement,
      longestStreak,
      currentStreak,
      totalUrineRecords,
      averageUrineFrequency,
    }

    return NextResponse.json({
      overview,
      waterData,
      urineData: urineDataProcessed,
      progressData,
      insights,
    })

  } catch (error) {
    console.error('Reports error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
