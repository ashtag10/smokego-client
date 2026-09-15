import { cn } from '@/lib/utils/helpers'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'border-gold-main border-t-transparent rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
    />
  )
}