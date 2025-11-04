
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Target, 
  Bell, 
  Smartphone,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface SettingsData {
  customGoal: string
  useAutoGoal: boolean
  enableReminders: boolean
  reminderInterval: string
  alexaEnabled: boolean
}

export function SettingsClient() {
  const [settings, setSettings] = useState<SettingsData>({
    customGoal: '2000',
    useAutoGoal: true,
    enableReminders: false,
    reminderInterval: '60',
    alexaEnabled: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [testingAlexa, setTestingAlexa] = useState(false)

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings({
          customGoal: data.customGoal?.toString() || '2000',
          useAutoGoal: data.useAutoGoal ?? true,
          enableReminders: data.enableReminders ?? false,
          reminderInterval: data.reminderInterval?.toString() || '60',
          alexaEnabled: data.alexaEnabled ?? true,
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSettingChange = <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customGoal: parseInt(settings.customGoal) || 2000,
          useAutoGoal: settings.useAutoGoal,
          enableReminders: settings.enableReminders,
          reminderInterval: parseInt(settings.reminderInterval) || 60,
          alexaEnabled: settings.alexaEnabled,
        }),
      })

      if (response.ok) {
        toast.success('Configurações salvas com sucesso!')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao salvar configurações')
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const testAlexaIntegration = async () => {
    setTestingAlexa(true)
    try {
      const response = await fetch('/api/alexa/test', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Integração com Alexa funcionando!')
      } else {
        toast.error('Erro na integração com Alexa')
      }
    } catch (error) {
      toast.error('Erro ao testar Alexa')
    } finally {
      setTestingAlexa(false)
    }
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
            Configurações
          </h1>
          <p className="text-gray-600">
            Personalize sua experiência de controle hídrico
          </p>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Metas de Hidratação
                </CardTitle>
                <CardDescription>
                  Configure como sua meta diária é calculada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Meta Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Calcular meta baseada no seu perfil (peso, idade, atividade)
                    </p>
                  </div>
                  <Switch
                    checked={settings.useAutoGoal}
                    onCheckedChange={(checked) => handleSettingChange('useAutoGoal', checked)}
                  />
                </div>

                {!settings.useAutoGoal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="customGoal">Meta Personalizada (ml/dia)</Label>
                    <Input
                      id="customGoal"
                      type="number"
                      placeholder="2000"
                      value={settings.customGoal}
                      onChange={(e) => handleSettingChange('customGoal', e.target.value)}
                      min="500"
                      max="10000"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recomendação mínima: 2000ml por dia
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Lembretes
                </CardTitle>
                <CardDescription>
                  Configure lembretes para manter sua hidratação em dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Ativar Lembretes</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba lembretes regulares para beber água
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableReminders}
                    onCheckedChange={(checked) => handleSettingChange('enableReminders', checked)}
                  />
                </div>

                {settings.enableReminders && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="reminderInterval">Intervalo dos Lembretes (minutos)</Label>
                    <Input
                      id="reminderInterval"
                      type="number"
                      placeholder="60"
                      value={settings.reminderInterval}
                      onChange={(e) => handleSettingChange('reminderInterval', e.target.value)}
                      min="15"
                      max="480"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recomendado: entre 30 e 120 minutos
                    </p>
                  </motion.div>
                )}

                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">Permissão necessária</h4>
                      <p className="text-sm text-orange-800">
                        Para receber lembretes, permita notificações do navegador quando solicitado.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alexa Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Integração Alexa
                </CardTitle>
                <CardDescription>
                  Configure a integração com Amazon Alexa para comandos de voz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Alexa Habilitada</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir registros através de comandos de voz
                    </p>
                  </div>
                  <Switch
                    checked={settings.alexaEnabled}
                    onCheckedChange={(checked) => handleSettingChange('alexaEnabled', checked)}
                  />
                </div>

                {settings.alexaEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">Comandos disponíveis:</h4>
                          <ul className="text-sm text-green-800 mt-2 space-y-1">
                            <li>• "Alexa, registrar 250 mililitros de água"</li>
                            <li>• "Alexa, registrar eliminação"</li>
                            <li>• "Alexa, verificar meu progresso de hidratação"</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={testAlexaIntegration}
                      disabled={testingAlexa}
                      className="w-full"
                    >
                      {testingAlexa ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testando...
                        </>
                      ) : (
                        'Testar Integração'
                      )}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
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
                  Salvar Configurações
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
