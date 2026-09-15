import { cn } from '@/lib/utils/helpers'

interface SkeletonProps {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export const Skeleton = ({ className, rounded = 'md' }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'bg-grey-100 animate-pulse',
        roundedClasses[rounded],
        className
      )}
    />
  )
}

// Skeleton composés
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-grey-100">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  )
}

export const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-grey-100 p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-48" />
      <div className="flex gap-3">
        <Skeleton className="h-16 w-16 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  )
}