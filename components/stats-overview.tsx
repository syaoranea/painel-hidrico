
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplet, TrendingUp, TrendingDown, Target, Award, Activity } from 'lucide-react'

interface StatsOverviewProps {
  data: {
    totalWater?: number
    averageDaily?: number
    goalAchievement?: number
    longestStreak?: number
    currentStreak?: number
    totalUrineRecords?: number
    averageUrineFrequency?: number
    improvementTrend?: number
  }
  period: string
}

export function StatsOverview({ data, period }: StatsOverviewProps) {
  const stats = [
    {
      title: 'Total Consumido',
      value: `${data?.totalWater || 0}ml`,
      subtitle: `Período de ${period.replace('days', ' dias')}`,
      icon: Droplet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Média Diária',
      value: `${data?.averageDaily || 0}ml`,
      subtitle: 'Por dia no período',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Metas Atingidas',
      value: `${data?.goalAchievement || 0}%`,
      subtitle: 'Dos dias no período',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Melhor Sequência',
      value: `${data?.longestStreak || 0}`,
      subtitle: 'Dias consecutivos',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Sequência Atual',
      value: `${data?.currentStreak || 0}`,
      subtitle: 'Dias seguidos',
      icon: Award,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Eliminações',
      value: `${data?.totalUrineRecords || 0}`,
      subtitle: 'Total de registros',
      icon: Activity,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ]

  const getTrendIcon = (trend?: number) => {
    if (!trend) return null
    return trend > 0 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const getTrendText = (trend?: number) => {
    if (!trend) return ''
    const percentage = Math.abs(trend)
    const direction = trend > 0 ? 'aumento' : 'diminuição'
    return `${percentage}% ${direction} vs período anterior`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {stat.subtitle}
              </p>
              {data?.improvementTrend !== undefined && index === 0 && (
                <div className="flex items-center gap-1 text-xs">
                  {getTrendIcon(data.improvementTrend)}
                  <span className={data.improvementTrend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {getTrendText(data.improvementTrend)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
