
'use client'

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface WaterChartProps {
  data: Array<{
    date: string
    water: number
    goal: number
  }>
}

export function WaterChart({ data }: WaterChartProps) {
  if (!data?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60B5FF" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#60B5FF" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#72BF78" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#72BF78" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        
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
            value: 'Volume (ml)', 
            angle: -90, 
            position: 'insideLeft', 
            style: { textAnchor: 'middle', fontSize: 11 } 
          }}
        />
        
        <Tooltip 
          labelFormatter={(value) => format(new Date(value), "dd 'de' MMMM", { locale: ptBR })}
          formatter={(value: number, name: string) => [
            `${value}ml`, 
            name === 'water' ? 'Consumido' : 'Meta'
          ]}
          contentStyle={{ fontSize: 11 }}
        />
        
        <Legend 
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
        
        <Area
          type="monotone"
          dataKey="goal"
          stroke="#72BF78"
          strokeWidth={2}
          fill="url(#goalGradient)"
          name="Meta"
        />
        
        <Area
          type="monotone"
          dataKey="water"
          stroke="#60B5FF"
          strokeWidth={2}
          fill="url(#waterGradient)"
          name="Consumido"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
