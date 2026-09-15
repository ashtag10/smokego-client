import { formatPrice } from '@/lib/utils/formatters'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { GoldDivider } from '@/components/ui/Divider/GoldDivider'

interface CartSummaryProps {
  subtotal: number
  deliveryFee: number
  discount?: number
  total: number
  itemCount: number
  onCheckout: () => void
  isLoading?: boolean
}

export const CartSummary = ({
  subtotal,
  deliveryFee,
  discount = 0,
  total,
  itemCount,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) => {

const safeTotal = total > 0 ? total : subtotal + deliveryFee - discount
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#D4AF37]/20
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        sm:p-6
      "
    >
      {/* Accent doré supérieur */}
      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-[#D4AF37]
          to-transparent
        "
      />

      {/* =========================
          HEADER
      ========================== */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="
            h-8
            w-1
            rounded-full
            bg-gradient-to-b
            from-[#C89B3C]
            via-[#D4AF37]
            to-[#B8860B]
          "
        />

        <h3
          className="
            font-serif
            text-xl
            font-semibold
            text-black-main
          "
        >
          Récapitulatif
        </h3>
      </div>

      {/* =========================
          DETAILS
      ========================== */}
      <div className="space-y-3.5">

        {/* Sous-total */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-grey-600">
            Sous-total ({itemCount} articles)
          </span>

          <span className="font-medium text-black-main">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Livraison */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-grey-600">
            Livraison
          </span>

          <span className="font-medium text-black-main">
            {formatPrice(deliveryFee)}
          </span>
        </div>

        {/* Réduction */}
        {discount > 0 && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-grey-600">
              Réduction
            </span>

            <span className="font-semibold text-red-500">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="py-1">
          <GoldDivider />
        </div>

        {/* =========================
            TOTAL
        ========================== */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-grey-600">
              Total
            </span>

            <p className="mt-0.5 text-xs text-grey-400">
              TTC
            </p>
          </div>

          <span
            className="
              bg-gradient-to-r
              from-[#B8860B]
              via-[#D4AF37]
              to-[#C89B3C]
              bg-clip-text
              text-xl
              font-bold
              text-transparent
              sm:text-2xl
            "
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* =========================
          CHECKOUT
      ========================== */}
      <PrimaryButton
        onClick={onCheckout}
        isLoading={isLoading}
        disabled={itemCount === 0}
        fullWidth
        className="
          mt-6
          py-3.5
          text-base
          transition-all
          duration-300

          hover:scale-[1.01]

          hover:bg-gradient-to-r
          hover:from-[#C9A94E]
          hover:via-[#D4AF37]
          hover:to-[#B8963E]

          hover:text-white

          hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)]

          active:scale-[0.99]

          disabled:cursor-not-allowed
          disabled:hover:scale-100
          disabled:hover:shadow-none
        "
      >
        Procéder au paiement
      </PrimaryButton>

      {/* Petite mention */}
      <p className="mt-3 text-center text-[11px] text-grey-400">
        Paiement sécurisé • OusmanHOOKAH 
      </p>
    </div>
  )
}