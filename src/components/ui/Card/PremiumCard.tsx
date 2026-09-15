import { ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface PremiumCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  noPadding?: boolean
}

export const PremiumCard = ({
  children,
  className,
  hover = true,
  noPadding = false,
}: PremiumCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-grey-100',
        'shadow-md',
        hover && 'hover:shadow-xl hover:border-gold-main/30 transition-all duration-300',
        !noPadding && 'p-6',
        className
      )}
    >
      {children}
    </div>
  )
}