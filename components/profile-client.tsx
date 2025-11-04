
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  User, 
  Mail, 
  Weight, 
  Calendar, 
  Ruler, 
  Activity, 
  Save,
  Loader2 
} from 'lucide-react'
import { toast } from 'sonner'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  weight: string
  age: string
  height: string
  activityLevel: string
}

export function ProfileClient() {
  const { data: session, update } = useSession() || {}
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    weight: '',
    age: '',
    height: '',
    activityLevel: 'moderate',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    console.log(session)
    if (session?.user) {
      setProfileData({
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
        email: session.user.email || '',
        weight: session.user.weight?.toString() || '',
        age: session.user.age?.toString() || '',
        height: session.user.height?.toString() || '',
        activityLevel: session.user.activityLevel || 'moderate',
      })
      setIsInitialLoad(false)
    }
  }, [session])

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          weight: profileData.weight ? parseFloat(profileData.weight) : null,
          age: profileData.age ? parseInt(profileData.age) : null,
          height: profileData.height ? parseFloat(profileData.height) : null,
          activityLevel: profileData.activityLevel,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Perfil atualizado com sucesso!')
        
        // Update session
        await update({
        user: {
          ...session?.user,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          weight: data.user.weight,
          height: data.user.height,
          age: data.user.age,
          activityLevel: data.user.activityLevel,
        },
      })
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitialLoad) {
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
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600">
            Mantenha seus dados atualizados para metas mais precisas
          </p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Atualize suas informações para receber metas de hidratação personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="João"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Silva"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    className="pl-10 bg-muted"
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  O email não pode ser alterado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={profileData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="pl-10"
                      min="1"
                      max="300"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="age"
                      type="number"
                      placeholder="30"
                      value={profileData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="pl-10"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={profileData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="pl-10"
                      min="100"
                      max="250"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityLevel">Nível de Atividade</Label>
                <div className="relative">
                  <Activity className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select 
                    value={profileData.activityLevel} 
                    onValueChange={(value) => handleInputChange('activityLevel', value)}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Sedentário - Pouca ou nenhuma atividade</SelectItem>
                      <SelectItem value="moderate">Moderado - Exercícios leves ou moderados</SelectItem>
                      <SelectItem value="high">Ativo - Exercícios intensos ou trabalho físico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Isso ajuda a calcular sua meta de hidratação ideal
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hydration Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Como calculamos sua meta?</CardTitle>
            <CardDescription>
              Entenda como suas informações pessoais influenciam sua meta de hidratação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Cálculo Base</h4>
                <p className="text-blue-800 text-sm">
                  Começamos com 35ml por kg de peso corporal como base
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Nível de Atividade</h4>
                <p className="text-green-800 text-sm">
                  Ajustamos baseado no seu nível de atividade: sedentário (1x), moderado (1.2x), ativo (1.5x)
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Fator Idade</h4>
                <p className="text-purple-800 text-sm">
                  Pessoas acima de 60 anos recebem um pequeno ajuste adicional (+10%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
