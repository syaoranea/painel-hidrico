
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download,
  Activity,
  Droplet
} from 'lucide-react'
import { toast } from 'sonner'
import { WaterChart } from '@/components/water-chart'
import { UrineChart } from '@/components/urine-chart'
import { ProgressChart } from '@/components/progress-chart'
import { StatsOverview } from '@/components/stats-overview'

type PeriodType = '7days' | '30days' | '90days'

export function ReportsClient() {
  const [period, setPeriod] = useState<PeriodType>('7days')
  const [loading, setLoading] = useState(true)
  const [reportData, setReportData] = useState<any>(null)

  const fetchReportData = async (selectedPeriod: PeriodType) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/reports?period=${selectedPeriod}`)
      if (response.ok) {
        const data = await response.json()
        setReportData(data)
      } else {
        toast.error('Erro ao carregar relatórios')
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      toast.error('Erro ao carregar relatórios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReportData(period)
  }, [period])

  const handleExport = async (format: 'pdf' | 'csv') => {
    try {
      const response = await fetch(`/api/reports/export?format=${format}&period=${period}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `relatorio-hidratacao-${period}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        toast.success(`Relatório ${format.toUpperCase()} baixado com sucesso!`)
      } else {
        toast.error('Erro ao exportar relatório')
      }
    } catch (error) {
      toast.error('Erro ao exportar relatório')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatórios de Hidratação
          </h1>
          <p className="text-gray-600">
            Analise seus padrões de hidratação e acompanhe seu progresso
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={(value: PeriodType) => setPeriod(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <StatsOverview data={reportData?.overview || {}} period={period} />
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-600" />
              Consumo de Água
            </CardTitle>
            <CardDescription>
              Histórico diário de consumo de água
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WaterChart data={reportData?.waterData || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-amber-600" />
              Frequência de Eliminação
            </CardTitle>
            <CardDescription>
              Registros diários de eliminação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UrineChart data={reportData?.urineData || []} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Progresso da Meta Diária
            </CardTitle>
            <CardDescription>
              Acompanhe o cumprimento das suas metas ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart data={reportData?.progressData || []} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      {reportData?.insights && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Insights e Recomendações
              </CardTitle>
              <CardDescription>
                Análises baseadas nos seus dados de hidratação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportData.insights.map((insight: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-blue-50 border border-blue-200"
                  >
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {insight.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
