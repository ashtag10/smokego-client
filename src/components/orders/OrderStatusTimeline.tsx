import { cn } from '@/lib/utils/helpers'
import { formatDate } from '@/lib/utils/formatters'
import { ORDER_STATUS_LABELS } from '@/lib/utils/constants'
import {
  Clock,
  CheckCircle,
  Wrench,
  Package,
  Truck,
  XCircle,
} from 'lucide-react'
import { OrderStatus } from '@/lib/types/order'

interface OrderStatusTimelineProps {
  statusHistory: Array<{
    status: OrderStatus
    at: string
  }>
  currentStatus: OrderStatus
}

// =====================================================
// ORDRE DES STATUTS
// =====================================================

const statusOrder: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.ACCEPTED,
  OrderStatus.PREPARING,
  OrderStatus.PICKED_UP,
  OrderStatus.IN_TRANSIT,
  OrderStatus.DELIVERED,
]

// =====================================================
// ICÔNES PAR STATUT
// =====================================================

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  [OrderStatus.PENDING]: (
    <Clock className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),

  [OrderStatus.ACCEPTED]: (
    <CheckCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),

  [OrderStatus.PREPARING]: (
    <Wrench className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),

  [OrderStatus.PICKED_UP]: (
    <Package className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),

  [OrderStatus.IN_TRANSIT]: (
    <Truck className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),

  [OrderStatus.DELIVERED]: (
    <CheckCircle className="h-[18px] w-[18px]" strokeWidth={2} />
  ),

  [OrderStatus.CANCELLED]: (
    <XCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
  ),
}

// =====================================================
// COMPONENT
// =====================================================

export const OrderStatusTimeline = ({
  statusHistory,
  currentStatus,
}: OrderStatusTimelineProps) => {

  // ===================================================
  // COMMANDE ANNULÉE
  // ===================================================

  if (currentStatus === OrderStatus.CANCELLED) {
    const cancelledEntry = statusHistory.find(
      (item) => item.status === OrderStatus.CANCELLED
    )

    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-red-100
          bg-gradient-to-br
          from-red-50
          via-white
          to-red-50/40
          p-6
          text-center
        "
      >
        {/* Accent */}
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-[3px]
            bg-gradient-to-b
            from-red-400
            to-red-600
          "
        />

        <div
          className="
            mx-auto
            mb-3
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-red-100
          "
        >
          <XCircle
            className="h-7 w-7 text-red-500"
            strokeWidth={1.7}
          />
        </div>

        <p className="font-semibold text-red-600">
          Commande annulée
        </p>

        {cancelledEntry && (
          <p className="mt-1 text-sm text-red-400">
            {formatDate(cancelledEntry.at)}
          </p>
        )}
      </div>
    )
  }

  // ===================================================
  // INDEX DU STATUT ACTUEL
  // ===================================================

  const currentIndex = statusOrder.indexOf(currentStatus)

  const safeCurrentIndex =
    currentIndex >= 0 ? currentIndex : 0

  const progressPercentage =
    statusOrder.length > 1
      ? Math.min(
          (safeCurrentIndex / (statusOrder.length - 1)) * 100,
          100
        )
      : 0

  return (
    <div className="relative">

      {/* =================================================
          LIGNE DE PROGRESSION
      ================================================== */}

      <div
        className="
          absolute
          left-[19px]
          top-5
          bottom-5
          w-[2px]
          overflow-hidden
          rounded-full
          bg-grey-100
        "
      >
        <div
          className="
            absolute
            left-0
            top-0
            w-full
            rounded-full
            bg-gradient-to-b
            from-[#C9A94E]
            via-[#D4AF37]
            to-[#B8963E]
            transition-all
            duration-700
            ease-out
          "
          style={{
            height: `${progressPercentage}%`,
          }}
        />
      </div>

      {/* =================================================
          ÉTAPES
      ================================================== */}

      <div className="space-y-7">
        {statusOrder.map((status, index) => {
          const isCompleted = index < safeCurrentIndex
          const isCurrent = index === safeCurrentIndex
          const isPending = index > safeCurrentIndex

          const historyEntry = statusHistory.find(
            (item) => item.status === status
          )

          return (
            <div
              key={status}
              className="relative flex items-start gap-4"
            >

              {/* =========================================
                  ICÔNE
              ========================================== */}

              <div className="relative z-10 shrink-0">

                {/* Halo étape actuelle */}
                {isCurrent && (
                  <div
                    className="
                      absolute
                      -inset-1.5
                      rounded-full
                      bg-[#D4AF37]/15
                      animate-pulse
                    "
                  />
                )}

                <div
                  className={cn(
                    `
                      relative
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-500
                    `,

                    isCompleted &&
                      `
                        border-[#D4AF37]
                        bg-gradient-to-br
                        from-[#C9A94E]
                        via-[#D4AF37]
                        to-[#B8963E]
                        text-white
                        shadow-[0_5px_15px_rgba(212,175,55,0.20)]
                      `,

                    isCurrent &&
                      `
                        border-[#D4AF37]
                        bg-white
                        text-[#B8860B]
                        shadow-[0_5px_20px_rgba(212,175,55,0.22)]
                      `,

                    isPending &&
                      `
                        border-grey-200
                        bg-white
                        text-grey-300
                      `
                  )}
                >
                  {statusIcons[status]}
                </div>
              </div>

              {/* =========================================
                  CONTENU
              ========================================== */}

              <div className="min-w-0 flex-1 pt-0.5">

                {/* Titre + badge */}
                <div className="flex flex-wrap items-center gap-2">

                  <p
                    className={cn(
                      'text-sm font-semibold transition-colors duration-300',

                      isCompleted &&
                        'text-black-main',

                      isCurrent &&
                        'text-[#A67C00]',

                      isPending &&
                        'text-grey-400'
                    )}
                  >
                    {ORDER_STATUS_LABELS[status]}
                  </p>

                  {isCurrent && (
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-[#D4AF37]/20
                        bg-[#FFF9E8]
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-[#A67C00]
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#D4AF37]
                          animate-pulse
                        "
                      />

                      En cours
                    </span>
                  )}

                  {isCompleted && (
                    <span
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-wide
                        text-[#B8860B]/70
                      "
                    >
                      Terminé
                    </span>
                  )}
                </div>

                {/* Date */}
                {historyEntry && (
                  <p
                    className={cn(
                      'mt-1 text-xs',

                      isCurrent
                        ? 'text-[#B8860B]'
                        : 'text-grey-500'
                    )}
                  >
                    {formatDate(historyEntry.at)}
                  </p>
                )}

                {/* Statut actuel sans historique */}
                {isCurrent && !historyEntry && (
                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-[#B8860B]
                      animate-pulse
                    "
                  >
                    Mise à jour en cours...
                  </p>
                )}

                {/* Étape future */}
                {isPending && (
                  <p className="mt-1 text-xs text-grey-400">
                    En attente
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}