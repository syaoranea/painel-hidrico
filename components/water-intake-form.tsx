
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Droplet, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { tiposLiquido } from '@/lib/tiposLiquido'
import { useSession } from 'next-auth/react'
import { API_BASE_URL } from '@/lib/api'

interface WaterIntakeFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function WaterIntakeForm({ onClose, onSuccess }: WaterIntakeFormProps) {
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [tipoId, setTipoId] = useState("")
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/water-intake', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoLiquidoId: Number(tipoId),
          quantidadeLiquidoMl: Number(amount),
          observacoes: notes,
          usuarioId: session?.user.id 
        }),
      })

      if (response.ok) {
        toast.success("Registro salvo com sucesso!")
        onSuccess()
      } else {
        toast.error("Erro ao salvar registro")
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor")
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
                <Droplet className="h-5 w-5 text-blue-600" />
                Registrar Água
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
                  <Label htmlFor="amount">Quantidade (ml)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="250"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    max="10000"
                    step="1"
                    required
                  />
                </div>
                
                 <div className="space-y-2">
                    <Label htmlFor="tipoLiquido">Tipo de Líquido</Label>
                    <select
                      id="tipoLiquido"
                      className="w-full border rounded-md p-2"
                      value={tipoId}
                      onChange={(e) => setTipoId(e.target.value)}
                      required
                    >
                      <option value="">Selecione...</option>
                      {tiposLiquido.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Input
                    id="notes"
                    type="text"
                    placeholder="Ex: Após exercício"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[150, 250, 300, 500].map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                      disabled={isLoading}
                    >
                      {preset}ml
                    </Button>
                  ))}
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
