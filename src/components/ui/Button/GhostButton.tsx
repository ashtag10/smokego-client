import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const GhostButton = ({
  children,
  className,
  ...props
}: GhostButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 text-gold-main hover:text-gold-dark font-medium',
        'hover:bg-gold-light/20 rounded-lg transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-gold-main',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}