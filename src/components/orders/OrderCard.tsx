import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Package,
  RotateCcw,
} from 'lucide-react'

import { formatPrice, formatDate } from '@/lib/utils/formatters'
import { StatusBadge } from '@/components/ui/Badge/StatusBadge'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { ORDER_STATUS_LABELS } from '@/lib/utils/constants'
import type { Order } from '@/lib/types/order'

interface OrderCardProps {
  order: Order
  onRepeat?: (orderId: string) => void
}

export const OrderCard = ({ order, onRepeat }: OrderCardProps) => {
  const statusLabel =
    ORDER_STATUS_LABELS[order.orderStatus] || order.orderStatus

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-grey-100
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-[2px]
        hover:border-[#D4AF37]/30
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]
      "
    >
      {/* Accent doré */}
      <div
        className="
          absolute
          left-0
          top-0
          h-full
          w-[3px]
          bg-gradient-to-b
          from-[#C9A94E]
          via-[#D4AF37]
          to-[#B8963E]
          opacity-70
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="p-5 sm:p-6">

        {/* =========================
            HEADER
        ========================== */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          {/* Informations commande */}
          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#FFF9E8]
                "
              >
                <Package
                  className="h-4 w-4 text-[#B8860B]"
                  strokeWidth={1.8}
                />
              </div>

              <span className="text-sm font-semibold text-black-main">
                Commande
              </span>

              <span className="rounded-md bg-grey-50 px-2 py-1 font-mono text-xs text-grey-500">
                #{order.id.slice(0, 8)}
              </span>

              <StatusBadge status={statusLabel} />
            </div>

            {/* Date */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-grey-500">
              <CalendarDays className="h-3.5 w-3.5 text-[#B8860B]" />
              <span>{formatDate(order.createdAt)}</span>
            </div>
          </div>

          {/* =========================
              MONTANT
          ========================== */}
          <div className="sm:text-right">

            <p
              className="
                bg-gradient-to-r
                from-[#B8860B]
                via-[#D4AF37]
                to-[#C9A94E]
                bg-clip-text
                text-xl
                font-bold
                text-transparent
              "
            >
              {formatPrice(order.finalAmount)}
            </p>

            <p className="mt-0.5 text-xs text-grey-500">
              {order.items.length} article
              {order.items.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* =========================
            PRODUITS
        ========================== */}
        <div
          className="
            mt-5
            border-t
            border-grey-100
            pt-5
          "
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-grey-400">
            Articles commandés
          </p>

          <div className="flex flex-wrap gap-2">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-grey-100
                  bg-grey-50/70
                  px-3
                  py-1.5
                  text-xs
                  transition-all
                  duration-200
                  group-hover:border-[#D4AF37]/15
                "
              >
                <span className="font-semibold text-[#B8860B]">
                  {item.quantity}x
                </span>

                <span className="max-w-[180px] truncate text-grey-600">
                  {item.product.name}
                </span>
              </div>
            ))}

            {order.items.length > 3 && (
              <span
                className="
                  flex
                  items-center
                  rounded-full
                  bg-[#FFF9E8]
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-[#B8860B]
                "
              >
                +{order.items.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* =========================
            ACTIONS
        ========================== */}
        <div
          className="
            mt-5
            flex
            flex-col-reverse
            gap-3
            border-t
            border-grey-100
            pt-5
            sm:flex-row
            sm:items-center
          "
        >
          <Link
            href={`/orders/${order.id}`}
            className="w-full sm:w-auto"
          >
            <PrimaryButton
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                text-sm
                transition-all
                duration-300
                hover:bg-gradient-to-r
                hover:from-[#C9A94E]
                hover:via-[#D4AF37]
                hover:to-[#B8963E]
                hover:text-white
                hover:shadow-[0_8px_22px_rgba(212,175,55,0.24)]
                hover:scale-[1.01]
                sm:w-auto
              "
            >
              Voir les détails

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              />
            </PrimaryButton>
          </Link>

          {order.orderStatus === 'DELIVERED' && onRepeat && (
            <button
              type="button"
              onClick={() => onRepeat(order.id)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#D4AF37]/50
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#B8860B]
                transition-all
                duration-300
                hover:border-[#D4AF37]
                hover:bg-[#FFF9E8]
                hover:shadow-[0_5px_18px_rgba(212,175,55,0.12)]
                sm:w-auto
              "
            >
              <RotateCcw className="h-4 w-4" />
              Recommander
            </button>
          )}
        </div>
      </div>
    </div>
  )
}