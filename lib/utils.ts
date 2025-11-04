
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date for display
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('pt-BR')
    case 'long':
      return dateObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'time':
      return dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    default:
      return dateObj.toLocaleDateString('pt-BR')
  }
}

// Calculate hydration goal based on user profile
export function calculateHydrationGoal(
  weight?: number | null,
  age?: number | null,
  activityLevel?: string | null
): number {
  const baseAmount = weight ? weight * 35 : 2000
  
  let multiplier = 1.2 // Default moderate
  switch (activityLevel) {
    case 'low':
      multiplier = 1
      break
    case 'moderate':
      multiplier = 1.2
      break
    case 'high':
      multiplier = 1.5
      break
  }
  
  let ageMultiplier = 1
  if (age && age > 60) {
    ageMultiplier = 1.1
  }
  
  return Math.round(baseAmount * multiplier * ageMultiplier)
}

// Get progress color based on percentage
export function getProgressColor(progress: number): string {
  if (progress < 30) return 'text-red-600'
  if (progress < 60) return 'text-yellow-600'
  if (progress < 90) return 'text-blue-600'
  return 'text-green-600'
}

// Get progress status message
export function getProgressStatus(progress: number): string {
  if (progress < 30) return 'Muito baixo'
  if (progress < 60) return 'Baixo'
  if (progress < 90) return 'Bom'
  if (progress < 100) return 'Muito bom'
  return 'Excelente'
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Format volume with appropriate unit
export function formatVolume(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`
  }
  return `${ml}ml`
}

// Get activity level display name
export function getActivityLevelName(level: string): string {
  switch (level) {
    case 'low':
      return 'Sedentário'
    case 'moderate':
      return 'Moderado'
    case 'high':
      return 'Ativo'
    default:
      return 'Moderado'
  }
}

// Generate chart colors
export const chartColors = [
  '#60B5FF', // Blue
  '#FF9149', // Orange
  '#FF9898', // Pink
  '#FF90BB', // Light Pink
  '#FF6363', // Red
  '#80D8C3', // Teal
  '#A19AD3', // Purple
  '#72BF78', // Green
]

// Safe JSON parsing
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T
  } catch {
    return fallback
  }
}
