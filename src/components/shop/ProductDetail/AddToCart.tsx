'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '@/components/ui/Button/PrimaryButton'
import { useCart } from '@/lib/hooks/useCart'

interface AddToCartProps {
  productId: string
  stock: number
}

export const AddToCart = ({
  productId,
  stock,
}: AddToCartProps) => {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const isOutOfStock = stock <= 0
  const isMinQuantity = quantity <= 1
  const isMaxQuantity = quantity >= stock

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  const handleIncrease = () => {
    setQuantity((current) => Math.min(stock, current + 1))
  }

  const handleAddToCart = async () => {
    if (isOutOfStock || isLoading) return

    setIsLoading(true)

    try {
      await addItem(productId, quantity)
      
      // ✅ Message de succès
      toast.success(`${quantity} article${quantity > 1 ? 's' : ''} ajouté au panier !`)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      
      // ✅ Message d'erreur
      toast.error('Erreur lors de l\'ajout au panier')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Stock */}
      {!isOutOfStock && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-grey-400">
            Quantité
          </span>

          <span className="text-xs text-grey-500">
            {stock} disponible{stock > 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Quantity selector */}
        <div
          className="
            h-12
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-grey-200
            bg-grey-50
            overflow-hidden
            sm:w-[140px]
            shrink-0
          "
        >
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isMinQuantity || isOutOfStock}
            aria-label="Diminuer la quantité"
            className="
              h-full
              w-11
              flex
              items-center
              justify-center
              text-grey-500
              hover:text-black-main
              hover:bg-white
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition-all
            "
          >
            <Minus className="w-4 h-4" strokeWidth={2} />
          </button>

          <span
            className="
              min-w-[40px]
              text-center
              text-sm
              font-semibold
              text-black-main
            "
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={isMaxQuantity || isOutOfStock}
            aria-label="Augmenter la quantité"
            className="
              h-full
              w-11
              flex
              items-center
              justify-center
              text-grey-500
              hover:text-black-main
              hover:bg-white
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition-all
            "
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Add to cart */}
        <PrimaryButton
          onClick={handleAddToCart}
          isLoading={isLoading}
          disabled={isOutOfStock}
          className="
            flex-1
            h-12
            rounded-xl
            !px-6
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {!isLoading && !isOutOfStock && (
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
          )}

          {isOutOfStock
            ? 'Rupture de stock'
            : isLoading
            ? 'Ajout en cours...'
            : 'Ajouter au panier'}
        </PrimaryButton>
      </div>

      {/* Stock warning */}
      {!isOutOfStock && stock <= 5 && (
        <p className="text-xs text-gold-dark text-center sm:text-left">
          Plus que {stock} article{stock > 1 ? 's' : ''} en stock
        </p>
      )}

      {isOutOfStock && (
        <p className="text-xs text-red-500 text-center sm:text-left">
          Ce produit est actuellement indisponible.
        </p>
      )}
    </div>
  )
}