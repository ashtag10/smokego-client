import { useEffect } from 'react'
import { useCartStore } from '@/lib/stores/cartStore'
import { useAuthStore } from '@/lib/stores/authStore'

export const useCart = () => {
  const { isAuthenticated } = useAuthStore()
  const {
    cart,
    isLoading,
    itemCount,
    fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore()

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated])

 
  const safeCart = cart ? {
    ...cart,
    total: cart.total || (cart.subtotal || 0) + (cart.deliveryFee || 0) - (cart.discount || 0),
  } : null

  return {
    cart: safeCart,
    isLoading,
    itemCount,
    fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isEmpty: !cart || cart.items.length === 0,
    total: safeCart?.total || 0,
    subtotal: safeCart?.subtotal || 0,
    deliveryFee: safeCart?.deliveryFee || 0,
  }
}