import { cn } from '@/lib/utils/helpers'

interface ProgressBarProps {
  value: number
  max: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  label?: string
}

export const ProgressBar = ({
  value,
  max,
  className,
  barClassName,
  showLabel = false,
  label,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-grey-600">{label || 'Progression'}</span>
          <span className="text-gold-main font-medium">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="relative w-full h-2 bg-grey-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full bg-gradient-to-r from-gold-main to-gold-dark rounded-full transition-all duration-500',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}