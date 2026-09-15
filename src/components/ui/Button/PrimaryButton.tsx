import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  fullWidth?: boolean
}

export const PrimaryButton = ({
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  type = 'button',
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        // === NOIR + DORÉ ===
        'px-6 py-3 bg-black text-white font-medium rounded-full',

        // Bordure dorée
        'border border-gold-main',

        // Hover premium
        'hover:bg-gold-main hover:text-black',
        'hover:shadow-lg hover:shadow-gold-main/20',

        // Animation
        'transition-all duration-300',

        // Focus
        'focus:outline-none',
        'focus:ring-2 focus:ring-gold-main',
        'focus:ring-offset-2',
        'focus:ring-offset-black',

        // Disabled
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',

        // Largeur
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