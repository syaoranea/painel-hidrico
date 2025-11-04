
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Droplet, TrendingUp } from 'lucide-react'

interface DailyProgressProps {
  current: number
  goal: number
  progress: number
}

export function DailyProgress({ current, goal, progress }: DailyProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 500)

    return () => clearTimeout(timer)
  }, [progress])

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'from-red-500 to-red-400'
    if (progress < 60) return 'from-yellow-500 to-yellow-400'
    if (progress < 90) return 'from-blue-500 to-blue-400'
    return 'from-green-500 to-green-400'
  }

  const getStatusMessage = (progress: number) => {
    if (progress < 30) return 'Você precisa beber mais água!'
    if (progress < 60) return 'Está indo bem, continue!'
    if (progress < 90) return 'Quase lá! Continue hidratando'
    if (progress < 100) return 'Quase atingindo sua meta!'
    return 'Parabéns! Meta atingida! 🎉'
  }

  const remaining = Math.max(goal - current, 0)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Progresso Diário
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Ring */}
        <div className="relative mx-auto w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 440" }}
              animate={{ 
                strokeDasharray: `${(animatedProgress * 440) / 100} 440`
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-blue-500" />
                <stop offset="100%" className="stop-green-500" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary">
                {Math.min(progress, 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {current}ml de {goal}ml
              </div>
            </motion.div>
          </div>
        </div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-gray-700">
            {getStatusMessage(progress)}
          </p>
          {remaining > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Faltam {remaining}ml para atingir sua meta
            </p>
          )}
        </motion.div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Droplet className="h-4 w-4" />
              <span className="text-xs font-medium">Consumido</span>
            </div>
            <div className="text-lg font-bold">{current}ml</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Meta</span>
            </div>
            <div className="text-lg font-bold">{goal}ml</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
