import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export const SecondaryButton = ({
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: SecondaryButtonProps) => {
  return (
    <button
      className={cn(
        'px-6 py-3 bg-transparent text-gold-main font-medium rounded-full',
        'border-2 border-gold-main',
        'hover:bg-gold-light transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-gold-main focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-gold-main border-t-transparent rounded-full animate-spin" />
          <span>Chargement...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}