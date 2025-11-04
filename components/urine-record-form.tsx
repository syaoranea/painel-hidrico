
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Activity, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { tiposUrina } from '@/lib/tiposLiquido'
interface UrineRecordFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function UrineRecordForm({ onClose, onSuccess }: UrineRecordFormProps) {
  const [volume, setVolume] = useState('')
  const [urineType, setUrineType] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch('/api/urine-record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantidadeUrinaMl: Number(volume),
          urineType: urineType,
          observacoes: notes,
          usuarioId: session?.user.id     
        }),
      })

      if (response.ok) {
        toast.success('Eliminação registrada com sucesso!')
        onSuccess()
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao registrar eliminação')
      }
    } catch (error) {
      toast.error('Erro ao registrar eliminação')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-amber-600" />
                Registrar Eliminação
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume aproximado (ml) - Opcional</Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="200"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    min="1"
                    max="2000"
                    step="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Volume estimado por vez, se souber
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urineType">método de eliminação urinária</Label>
                  <select
                    id="urineType"
                    className="w-full border rounded-md p-2"
                    value={urineType}
                    onChange={(e) => setUrineType(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {tiposUrina.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcionals)</Label>
                  <Input
                    id="notes"
                    type="text"
                    placeholder="Ex: Cor, urgência, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Registrar'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
