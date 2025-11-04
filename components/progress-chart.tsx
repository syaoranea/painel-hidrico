
'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ProgressChartProps {
  data: Array<{
    date: string
    progress: number
    streak: number
  }>
}

export function ProgressChart({ data }: ProgressChartProps) {
  if (!data?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
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
            value: 'Progresso (%)', 
            angle: -90, 
            position: 'insideLeft', 
            style: { textAnchor: 'middle', fontSize: 11 } 
          }}
        />
        
        <Tooltip 
          labelFormatter={(value) => format(new Date(value), "dd 'de' MMMM", { locale: ptBR })}
          formatter={(value: number, name: string) => [
            name === 'progress' ? `${value}%` : `${value} dias`,
            name === 'progress' ? 'Progresso' : 'Sequência'
          ]}
          contentStyle={{ fontSize: 11 }}
        />
        
        <Legend 
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
        
        <ReferenceLine 
          y={100} 
          stroke="#72BF78" 
          strokeDasharray="5 5"
          label={{ value: "Meta 100%", position: "insideTopRight", fontSize: 10 }}
        />
        
        <Line
          type="monotone"
          dataKey="progress"
          stroke="#60B5FF"
          strokeWidth={3}
          dot={{ fill: '#60B5FF', strokeWidth: 2, r: 4 }}
          name="Progresso"
        />
        
        <Line
          type="monotone"
          dataKey="streak"
          stroke="#A19AD3"
          strokeWidth={2}
          dot={{ fill: '#A19AD3', strokeWidth: 2, r: 3 }}
          name="Sequência"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
