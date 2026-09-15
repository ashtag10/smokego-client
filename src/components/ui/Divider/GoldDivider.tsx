import { cn } from '@/lib/utils/helpers'

interface GoldDividerProps {
  className?: string
  withText?: string
}

export const GoldDivider = ({ className, withText }: GoldDividerProps) => {
  if (withText) {
    return (
      <div className={cn('flex items-center gap-4 my-6', className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-main/50" />
        <span className="text-sm text-gold-main font-medium whitespace-nowrap">
          {withText}
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-main/50" />
      </div>
    )
  }

  return (
    <div className={cn('h-px bg-gradient-to-r from-transparent via-gold-main/50 to-transparent my-6', className)} />
  )
}