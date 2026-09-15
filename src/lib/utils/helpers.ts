import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


/**
 * Combine et fusionne les classes Tailwind
 * Utilisation: cn('bg-red-500', isActive && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Retarde l'exécution (pour polling)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Génère un ID unique
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

/**
 * Vérifie si une valeur est vide
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Calcule le pourcentage de progression
 */
export const calculateProgress = (current: number, target: number): number => {
  if (target <= 0) return 0
  const progress = (current / target) * 100
  return Math.min(Math.max(progress, 0), 100)
}

/**
 * Groupe un tableau par clé
 */
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key])
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

/**
 * Extrait les initiales d'un nom
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

/**
 * Génère une couleur aléatoire
 */
export const getRandomColor = (): string => {
  const colors = [
    '#C9A94E', // Or
    '#B8943E', // Or foncé
    '#8B7332', // Or profond
    '#1A1A1A', // Noir
    '#6B6B6B', // Gris
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}