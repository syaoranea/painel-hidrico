
import { User as PrismaUser } from '@prisma/client'
import { DefaultSession } from 'next-auth'

export interface User extends PrismaUser {}

export interface ExtendedUser {
  id: string
  firstName?: string | null
  lastName?: string | null
  weight?: number | null
  age?: number | null
  height?: number | null
  activityLevel?: string | null
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstName?: string | null
      lastName?: string | null
      weight?: number | null
      age?: number | null
      height?: number | null
      activityLevel?: string | null
    } & DefaultSession['user']
  }

  interface User extends ExtendedUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    firstName?: string | null
    lastName?: string | null
    weight?: number | null
    age?: number | null
    height?: number | null
    activityLevel?: string | null
  }
}

export interface WaterIntakeData {
  id: string
  amount: number
  timestamp: Date
  source: string
  notes?: string | null
}

export interface UrineRecordData {
  id: string
  volume?: number | null
  frequency: number
  timestamp: Date
  source: string
  notes?: string | null
}

export interface DailyGoalData {
  id: string
  date: Date
  goalMl: number
  type: string
}

export interface DashboardStats {
  todayWater: number
  todayUrine: number
  dailyGoal: number
  progress: number
  streak: number
}

export interface ChartDataPoint {
  date: string
  water: number
  urine: number
  goal: number
}

export interface AlexaRequest {
  version: string
  session: {
    sessionId: string
    user: {
      userId: string
    }
  }
  request: {
    type: string
    requestId: string
    intent?: {
      name: string
      slots?: {
        [key: string]: {
          value: string
        }
      }
    }
  }
}

export interface AlexaResponse {
  version: string
  response: {
    outputSpeech: {
      type: string
      text: string
    }
    shouldEndSession: boolean
  }
}

export type ActivityLevel = 'low' | 'moderate' | 'high'
