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
       
        'bg-white',
       
        !noPadding && 'p-0',
        className
      )}
    >
      {children}
    </div>
  )
}