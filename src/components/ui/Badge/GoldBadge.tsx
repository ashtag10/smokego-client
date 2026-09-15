import { ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface GoldBadgeProps {
  children: ReactNode
  className?: string
}

export const GoldBadge = ({ children, className }: GoldBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium',
        'bg-gold-light text-gold-dark rounded-full',
        'border border-gold-main/20',
        className
      )}
    >
      <span className="w-2 h-2 bg-gold-main rounded-full animate-pulse" />
      {children}
    </span>
  )
}