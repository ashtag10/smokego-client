import { cn } from '@/lib/utils/helpers'
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from '@/lib/utils/constants'
import type { OrderStatus } from '@/lib/types/order'

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export const OrderStatusBadge = ({
  status,
  className,
}: OrderStatusBadgeProps) => {
  const label = ORDER_STATUS_LABELS[status] || status

  const colorClass =
    ORDER_STATUS_COLORS[status] ||
    'bg-grey-100 text-grey-700 border-grey-200'

  return (
    <span
      className={cn(
        `
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          px-3
          py-1.5
          text-[11px]
          font-semibold
          tracking-wide
          transition-all
          duration-200
        `,
        colorClass,
        className
      )}
    >
      {/* Indicateur d'état */}
      <span
        className="
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          bg-current
          opacity-80
        "
      />

      {label}
    </span>
  )
}