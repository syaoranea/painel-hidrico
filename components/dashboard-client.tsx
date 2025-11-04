
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Droplet, 
  Target, 
  Plus,
  Minus,
  TrendingUp,
  Activity,
  Clock,
  Award
} from 'lucide-react'
import { toast } from 'sonner'
import { WaterIntakeForm } from '@/components/water-intake-form'
import { UrineRecordForm } from '@/components/urine-record-form'
import { DailyProgress } from '@/components/daily-progress'
import { RecentActivity } from '@/components/recent-activity'
import { DashboardStats as DashboardStatsType } from '@/lib/types'
import { useRouter } from 'next/navigation'


interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

function CountUp({ end, suffix = '', duration = 1000 }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span className="count-up">{count}{suffix}</span>
}

export function DashboardClient() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [showWaterForm, setShowWaterForm] = useState(false)
  const [showUrineForm, setShowUrineForm] = useState(false)

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(session)
    if (status === 'unauthenticated') {
      router.replace('/login') // Redireciona para página inicial
    }
    fetchStats()
  }, [status, router])
const quickAddWater = async (amount: number) => {
   try {
      const response = await fetch('/api/water-intake', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoLiquidoId: 1,
          quantidadeLiquidoMl: Number(amount),
          usuarioId: session?.user.id 
        }),
      })

       if (response.ok) {
      toast.success(`${amount}ml de água adicionados! 💧`)
      fetchStats() // Atualiza o dashboard
    } else {
      toast.error('Erro ao registrar água')
    }
  } catch (error) {
    console.error('Erro ao registrar água:', error)
    toast.error('Erro ao registrar água')
  }

}


  const userName = session?.user?.firstName || session?.user?.name?.split(' ')?.[0] || 'Usuário'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {userName}! 👋
          </h1>
          <p className="text-gray-600">
            Como está sua hidratação hoje?
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Água Hoje</CardTitle>
            <Droplet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              <CountUp end={stats?.todayWater || 0} suffix="ml" />
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.progress || 0}% da meta diária
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Diária</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <CountUp end={stats?.dailyGoal || 0} suffix="ml" />
            </div>
            <p className="text-xs text-muted-foreground">
              Personalizada para você
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eliminação</CardTitle>
            <Activity className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              <CountUp end={stats?.todayUrine || 0} />x
            </div>
            <p className="text-xs text-muted-foreground">
              Registros hoje
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              <CountUp end={stats?.streak || 0} />
            </div>
            <p className="text-xs text-muted-foreground">
              Dias consecutivos
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Registre rapidamente sua hidratação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[150, 250, 300, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => quickAddWater(amount)}
                  className="h-16 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300"
                >
                  <Droplet className="h-5 w-5 text-blue-600 mb-1" />
                  <span className="text-sm font-medium">{amount}ml</span>
                </Button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowWaterForm(true)}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Registrar Água Personalizado
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUrineForm(true)}
                className="flex-1"
              >
                <Activity className="h-4 w-4 mr-2" />
                Registrar Eliminação
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress and Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <DailyProgress 
          current={stats?.todayWater || 0}
          goal={stats?.dailyGoal || 0}
          progress={stats?.progress || 0}
        />
        <RecentActivity onRefresh={fetchStats} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Registro de Hidratação por Hora
            </CardTitle>
            <CardDescription>
              Quantidade de água planejada ao longo do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm text-gray-700">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 border">Hora</th>
                    <th className="px-4 py-2 border">Quantidade (ml)</th>
                    <th className="px-4 py-2 border">Nome Validado</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 20 }, (_, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 border text-center">{i + 5}</td>
                      <td className="px-4 py-2 border text-center">150</td>
                      <td className="px-4 py-2 border text-center">Validado</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Forms */}
      {showWaterForm && (
        <WaterIntakeForm
          onClose={() => setShowWaterForm(false)}
          onSuccess={() => {
            fetchStats()
            setShowWaterForm(false)
          }}
        />
      )}

      {showUrineForm && (
        <UrineRecordForm
          onClose={() => setShowUrineForm(false)}
          onSuccess={() => {
            fetchStats()
            setShowUrineForm(false)
          }}
        />
      )}
    </div>
  )
}
