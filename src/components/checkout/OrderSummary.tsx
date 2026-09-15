import { MapPin, Package, User } from 'lucide-react'

import { formatPrice } from '@/lib/utils/formatters'
import { GoldDivider } from '@/components/ui/Divider/GoldDivider'
import type { Order } from '@/lib/types/order'

interface OrderSummaryProps {
  order: Order
}

export const OrderSummary = ({ order }: OrderSummaryProps) => {

  if (!order) return null

// ✅ AJOUTE CES LOGS
  console.log('📊 OrderSummary - RAW ORDER:', JSON.stringify(order, null, 2))
  console.log('📊 OrderSummary - ITEMS:', order.items.map(item => ({
    name: item.product?.name,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
  })))
  console.log('📊 OrderSummary - totalAmount:', order.totalAmount)
  const items = order.items || []
  
  
  const calculatedSubtotal = items.reduce((sum, item) => {
    const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : Number(item.unitPrice) || 0
    const quantity = item.quantity || 0
    const totalPrice = typeof item.totalPrice === 'number' ? item.totalPrice : Number(item.totalPrice) || (unitPrice * quantity)
    return sum + totalPrice
  }, 0)
  
  
  const subtotal = typeof order.totalAmount === 'number' ? order.totalAmount : Number(order.totalAmount) || calculatedSubtotal || 0
  const deliveryFee = typeof order.deliveryFee === 'number' ? order.deliveryFee : Number(order.deliveryFee) || 0
  const discount = typeof order.discountAmount === 'number' ? order.discountAmount : Number(order.discountAmount) || 0
  const total = typeof order.finalAmount === 'number' ? order.finalAmount : Number(order.finalAmount) || (subtotal + deliveryFee - discount) || 0

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

      {/* HEADER */}
      <div
        className="
          mb-5
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#FFF9E8]
            to-[#F5E8BD]
          "
        >
          <Package
            className="h-4.5 w-4.5 text-[#B8860B]"
            strokeWidth={1.8}
          />
        </div>

        <h3
          className="
            font-serif
            text-xl
            font-semibold
            text-black-main
          "
        >
          Récapitulatif de la commande
        </h3>
      </div>

      {/* ARTICLES */}
      <div className="space-y-3">
        {items.map((item) => {
          
          const unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : Number(item.unitPrice) || 0
          const quantity = item.quantity || 0
          const itemPrice = typeof item.totalPrice === 'number' ? item.totalPrice : Number(item.totalPrice) || (unitPrice * quantity)
          
          return (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-[#D4AF37]/8
                bg-[#FFFCF7]
                px-3.5
                py-3
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    line-clamp-1
                    text-sm
                    font-medium
                    text-black-main
                  "
                >
                  <span className="mr-1.5 font-semibold text-[#B8860B]">
                    {quantity || 0}x
                  </span>
                  {item.product?.name || 'Produit'}
                </p>
              </div>

              <span
                className="
                  shrink-0
                  text-sm
                  font-semibold
                  text-black-main
                "
              >
                {formatPrice(itemPrice)}
              </span>
            </div>
          )
        })}
      </div>

      {/* PRIX */}
      <div className="mt-5 space-y-3">
        <GoldDivider />

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-grey-600">Sous-total</span>
          <span className="font-medium text-black-main">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-grey-600">Livraison</span>
          <span className="font-medium text-black-main">
            {formatPrice(deliveryFee)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-grey-600">Réduction</span>
            <span className="font-semibold text-red-500">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <GoldDivider />

        {/* TOTAL */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-grey-600">Total</span>
            <p className="mt-0.5 text-[11px] text-grey-400">TTC</p>
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

      {/* LIVRAISON */}
      {order.deliveryAddress && (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-[#D4AF37]/10
            bg-[#FFFCF7]
            p-4
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <MapPin
              className="h-4 w-4 text-[#B8860B]"
              strokeWidth={1.8}
            />
            <p className="text-sm font-semibold text-black-main">
              Adresse de livraison
            </p>
          </div>

          <div className="space-y-1 pl-6 text-sm text-grey-600">
            <p>{order.deliveryAddress.detailedAddress || 'Adresse non spécifiée'}</p>
            <p>
              {order.deliveryAddress.district || ''}
              {order.deliveryAddress.district && order.deliveryAddress.city && ', '}
              {order.deliveryAddress.city || ''}
            </p>
          </div>

          {order.deliveryAddress.recipientName && (
            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                border-t
                border-[#D4AF37]/10
                pt-3
                pl-6
              "
            >
              <User
                className="h-3.5 w-3.5 text-[#B8860B]"
                strokeWidth={1.8}
              />
              <span className="text-xs text-grey-500">Destinataire :</span>
              <span className="text-xs font-medium text-black-main">
                {order.deliveryAddress.recipientName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}