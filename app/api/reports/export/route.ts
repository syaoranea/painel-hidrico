
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
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

    // Get all data
    const [waterIntakes, urineRecords, dailyGoals, user] = await Promise.all([
      prisma.waterIntake.findMany({
        where: {
          userId,
          timestamp: {
            gte: startDate,
            lte: now,
          }
        },
        orderBy: {
          timestamp: 'asc',
        }
      }),
      prisma.urineRecord.findMany({
        where: {
          userId,
          timestamp: {
            gte: startDate,
            lte: now,
          }
        },
        orderBy: {
          timestamp: 'asc',
        }
      }),
      prisma.dailyGoal.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: now,
          }
        },
        orderBy: {
          date: 'asc',
        }
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          firstName: true,
          lastName: true,
          email: true,
        }
      })
    ])

    if (format === 'csv') {
      // Generate CSV content
      let csvContent = 'Data,Tipo,Quantidade/Frequencia,Volume,Observacoes,Origem\n'
      
      // Add water intakes
      for (const intake of waterIntakes || []) {
        const date = intake.timestamp.toLocaleDateString('pt-BR')
        const time = intake.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        csvContent += `${date} ${time},Agua,${intake.amount}ml,,${intake.notes || ''},${intake.source}\n`
      }
      
      // Add urine records
      for (const record of urineRecords || []) {
        const date = record.timestamp.toLocaleDateString('pt-BR')
        const time = record.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        csvContent += `${date} ${time},Urina,${record.frequency}x,${record.volume || ''}ml,${record.notes || ''},${record.source}\n`
      }

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename=relatorio-hidratacao-${period}.csv`,
        },
      })
    }

    if (format === 'pdf') {
      // For PDF, return a simplified JSON that could be used by a frontend PDF generator
      // In a real app, you'd use a PDF library like jsPDF or Puppeteer
      const totalWater = waterIntakes?.reduce((sum, intake) => sum + intake.amount, 0) || 0
      const totalUrine = urineRecords?.reduce((sum, record) => sum + record.frequency, 0) || 0
      const days = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      
      const reportData = {
        user: {
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Usuário',
          email: user?.email,
        },
        period,
        dateRange: {
          start: startDate.toLocaleDateString('pt-BR'),
          end: now.toLocaleDateString('pt-BR'),
        },
        summary: {
          totalWater: `${totalWater}ml`,
          averageDaily: `${Math.round(totalWater / Math.max(days, 1))}ml`,
          totalUrineRecords: totalUrine,
          averageUrineDaily: Math.round(totalUrine / Math.max(days, 1)),
        },
        waterIntakes: waterIntakes?.map(intake => ({
          date: intake.timestamp.toLocaleDateString('pt-BR'),
          time: intake.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          amount: `${intake.amount}ml`,
          notes: intake.notes,
          source: intake.source,
        })),
        urineRecords: urineRecords?.map(record => ({
          date: record.timestamp.toLocaleDateString('pt-BR'),
          time: record.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          frequency: record.frequency,
          volume: record.volume ? `${record.volume}ml` : '',
          notes: record.notes,
          source: record.source,
        })),
      }

      return NextResponse.json(reportData, {
        headers: {
          'Content-Disposition': `attachment; filename=relatorio-hidratacao-${period}.json`,
        },
      })
    }

    return NextResponse.json(
      { message: 'Formato não suportado' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
