
'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface UrineChartProps {
  data: Array<{
    date: string
    frequency: number
    volume: number
  }>
}

export function UrineChart({ data }: UrineChartProps) {
  if (!data?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => format(new Date(value), 'dd/MM', { locale: ptBR })}
          tick={{ fontSize: 10 }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        
        <YAxis 
          tick={{ fontSize: 10 }}
          tickLine={false}
          label={{ 
            value: 'Frequência', 
            angle: -90, 
            position: 'insideLeft', 
            style: { textAnchor: 'middle', fontSize: 11 } 
          }}
        />
        
        <Tooltip 
          labelFormatter={(value) => format(new Date(value), "dd 'de' MMMM", { locale: ptBR })}
          formatter={(value: number, name: string) => [
            name === 'frequency' ? `${value} vezes` : `${value}ml`,
            name === 'frequency' ? 'Frequência' : 'Volume Médio'
          ]}
          contentStyle={{ fontSize: 11 }}
        />
        
        <Legend 
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
        
        <Bar
          dataKey="frequency"
          fill="#FF9149"
          name="Frequência"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
