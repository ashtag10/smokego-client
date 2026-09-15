import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'

import { formatPrice } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/helpers'
import type { CartItem as CartItemType } from '@/lib/types/order'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const product = item.product
  
 
  if (!product) return null

  const imageUrl = product.images?.[0]

  const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : Number(item.unitPrice) || Number(product.price) || 0
  const quantity = item.quantity || 0
  const totalPrice = typeof item.totalPrice === 'number' ? item.totalPrice : Number(item.totalPrice) || (unitPrice * quantity)

  return (
    <div
      className="
        group
        flex
        gap-3
        border-b
        border-[#D4AF37]/10
        py-4
        transition-all
        duration-300
        last:border-0
        sm:gap-4
      "
    >
      {/* =========================
          IMAGE
      ========================== */}
      <div
        className="
          relative
          h-20
          w-20
          shrink-0
          overflow-hidden
          rounded-xl
          border
          border-[#D4AF37]/15
          bg-grey-50
          shadow-sm
          sm:h-24
          sm:w-24
        "
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            sizes="96px"
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              text-grey-400
            "
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="mt-1 text-[10px]">Pas d'image</span>
          </div>
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            ring-1
            ring-inset
            ring-[#D4AF37]/10
          "
        />
      </div>

      {/* =========================
          INFORMATIONS
      ========================== */}
      <div className="min-w-0 flex-1">
        <h4
          className="
            line-clamp-1
            text-sm
            font-semibold
            text-black-main
            transition-colors
            duration-200
            group-hover:text-[#B8860B]
            sm:text-base
          "
        >
          {product.name}
        </h4>

        {item.variant && (
          <p className="mt-1 line-clamp-1 text-xs text-grey-500 sm:text-sm">
            Variante : {item.variant.name}
          </p>
        )}

        {/* ✅ Prix unitaire */}
        <p className="mt-1 text-xs text-grey-400">
          {formatPrice(unitPrice)} / unité
        </p>

        {/* ✅ Prix total */}
        <p
          className="
            mt-1
            text-base
            font-bold
            text-[#B8860B]
            sm:text-lg
          "
        >
          {formatPrice(totalPrice)}
        </p>
      </div>

      {/* =========================
          ACTIONS
      ========================== */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        {/* Supprimer */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Supprimer ${product.name}`}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-grey-400
            transition-all
            duration-200
            hover:bg-red-50
            hover:text-red-500
            active:scale-95
          "
        >
          <X className="h-4 w-4" />
        </button>

        {/* Quantité */}
        <div
          className="
            flex
            items-center
            overflow-hidden
            rounded-lg
            border
            border-[#D4AF37]/20
            bg-white
            shadow-[0_2px_8px_rgba(0,0,0,0.04)]
          "
        >
          <button
            type="button"
            onClick={() =>
              onUpdateQuantity(
                item.id,
                Math.max(1, quantity - 1)
              )
            }
            disabled={quantity <= 1}
            aria-label="Diminuer la quantité"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              text-grey-600
              transition-all
              duration-200
              hover:bg-[#D4AF37]/10
              hover:text-[#B8860B]
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <span
            className="
              flex
              h-8
              min-w-8
              items-center
              justify-center
              border-x
              border-[#D4AF37]/10
              px-1
              text-xs
              font-semibold
              text-black-main
            "
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              onUpdateQuantity(
                item.id,
                quantity + 1
              )
            }
            aria-label="Augmenter la quantité"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              text-grey-600
              transition-all
              duration-200
              hover:bg-[#D4AF37]/10
              hover:text-[#B8860B]
              active:scale-95
            "
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}