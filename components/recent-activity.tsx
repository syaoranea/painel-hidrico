
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Droplet, Activity, Trash2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ActivityRecord {
  id: string
  type: 'water' | 'urine'
  amount?: number
  frequency?: number
  volume?: number
  timestamp: string
  notes?: string | null
}

interface RecentActivityProps {
  onRefresh?: () => void
}

export function RecentActivity({ onRefresh }: RecentActivityProps) {
  const [activities, setActivities] = useState<ActivityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities/recent')
      if (response.ok) {
        const data = await response.json()
        setActivities(data)
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
      toast.error('Erro ao carregar atividades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const handleDelete = async (id: string, type: 'water' | 'urine') => {
    setDeletingId(id)
    
    try {
      const endpoint = type === 'water' ? '/api/water-intake' : '/api/urine-record'
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setActivities(activities?.filter(activity => activity.id !== id) || [])
        toast.success('Registro excluído com sucesso!')
        onRefresh?.()
      } else {
        toast.error('Erro ao excluir registro')
      }
    } catch (error) {
      toast.error('Erro ao excluir registro')
    } finally {
      setDeletingId(null)
    }
  }

  const formatActivity = (activity: ActivityRecord) => {
    if (activity.type === 'water') {
      return {
        icon: <Droplet className="h-4 w-4 text-blue-600" />,
        title: `${activity.amount}ml de água`,
        subtitle: activity.notes || 'Consumo de água',
        color: 'text-blue-600'
      }
    } else {
      return {
        icon: <Activity className="h-4 w-4 text-amber-600" />,
        title: `${activity.frequency || 1}x eliminação`,
        subtitle: activity.volume ? `Volume: ${activity.volume}ml` : activity.notes || 'Registro de eliminação',
        color: 'text-amber-600'
      }
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Atividade Recente
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchActivities}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activities?.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade registrada hoje
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <AnimatePresence>
              {activities?.map((activity, index) => {
                const formatted = formatActivity(activity)
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {formatted.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {formatted.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {formatted.subtitle}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(activity.timestamp), 'HH:mm', { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(activity.id, activity.type)}
                      disabled={deletingId === activity.id}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className={`h-4 w-4 ${deletingId === activity.id ? 'animate-spin' : ''}`} />
                    </Button>
                  </motion.div>
                )
              }) || []}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
