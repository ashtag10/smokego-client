import { create } from 'zustand'
import type { Cart, CartItem } from '@/lib/types/order'
import { cartApi } from '@/lib/api/cart'

interface CartState {
  cart: Cart | null
  isLoading: boolean
  itemCount: number

  // Actions
  fetchCart: () => Promise<void>
  addItem: (productId: string, quantity: number, variantId?: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  setCart: (cart: Cart) => void
  reset: () => void
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
  discount: 0,
}

// ✅ Fonction pour normaliser un item du panier
const normalizeCartItem = (item: any): CartItem => {
  const product = item?.product || {}
  const unitPrice = item?.unitPrice || product?.price || 0
  const quantity = item?.quantity || 1
  
  // ✅ LOG - Normalisation d'un item
  console.log('📦 normalizeCartItem - RAW:', {
    name: product?.name,
    rawUnitPrice: item?.unitPrice,
    productPrice: product?.price,
    unitPrice: unitPrice,
    quantity: quantity,
    totalPrice: item?.totalPrice || (unitPrice * quantity) || 0,
  })
  
  return {
    id: item?.id || '',
    productId: item?.productId || product?.id || '',
    product: product,
    variantId: item?.variantId,
    variant: item?.variant,
    quantity: quantity,
    unitPrice: unitPrice,
    totalPrice: item?.totalPrice || (unitPrice * quantity) || 0,
  }
}

const normalizeCart = (data: any): Cart => {
  const cart = data?.cart || data || {}
  const items = (cart?.items || []).map(normalizeCartItem)

  // ✅ LOG - Données brutes du panier
  console.log('📦 normalizeCart - RAW DATA:', JSON.stringify(cart, null, 2))
  console.log('📦 normalizeCart - ITEMS:', items.map((item: CartItem) => ({
    name: item.product?.name,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
  })))

  const subtotal = cart?.subtotal || items.reduce((total: number, item: CartItem) => {
    return total + (item?.totalPrice || 0)
  }, 0) || 0
  
  const deliveryFee = cart?.deliveryFee || 0
  const discount = cart?.discount || 0
  const total = cart?.total || (subtotal + deliveryFee - discount) || 0

  // ✅ LOG - Totaux calculés
  console.log('📦 normalizeCart - SUBTOTAL:', subtotal)
  console.log('📦 normalizeCart - DELIVERY_FEE:', deliveryFee)
  console.log('📦 normalizeCart - DISCOUNT:', discount)
  console.log('📦 normalizeCart - TOTAL:', total)

  return {
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  itemCount: 0,

  fetchCart: async () => {
    set({ isLoading: true })
    try {
      const response = await cartApi.getCart()
      console.log('📦 fetchCart - RESPONSE:', response)
      
      if (response.success && response.data) {
        const safeCart = normalizeCart(response.data)
        
        const itemCount = safeCart.items.reduce((total: number, item: CartItem) => {
          return total + (item?.quantity || 0)
        }, 0)
        
        console.log('📦 fetchCart - FINAL CART:', {
          items: safeCart.items.length,
          itemCount,
          subtotal: safeCart.subtotal,
          total: safeCart.total,
        })
        
        set({
          cart: safeCart,
          itemCount,
        })
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  addItem: async (productId, quantity, variantId) => {
    set({ isLoading: true })
    try {
      const response = await cartApi.addToCart(productId, quantity, variantId)
      console.log('📦 addItem - RESPONSE:', response)
      
      if (response.success && response.data) {
        const safeCart = normalizeCart(response.data)
        
        const itemCount = safeCart.items.reduce((total: number, item: CartItem) => {
          return total + (item?.quantity || 0)
        }, 0)
        
        console.log('📦 addItem - FINAL CART:', {
          items: safeCart.items.length,
          itemCount,
          subtotal: safeCart.subtotal,
          total: safeCart.total,
        })
        
        set({
          cart: safeCart,
          itemCount,
        })
      }
    } catch (error) {
      console.error('Failed to add item:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateQuantity: async (itemId, quantity) => {
    set({ isLoading: true })
    try {
      const response = await cartApi.updateQuantity(itemId, quantity)
      console.log('📦 updateQuantity - RESPONSE:', response)
      
      if (response.success && response.data) {
        const safeCart = normalizeCart(response.data)
        
        const itemCount = safeCart.items.reduce((total: number, item: CartItem) => {
          return total + (item?.quantity || 0)
        }, 0)
        
        console.log('📦 updateQuantity - FINAL CART:', {
          items: safeCart.items.length,
          itemCount,
          subtotal: safeCart.subtotal,
          total: safeCart.total,
        })
        
        set({
          cart: safeCart,
          itemCount,
        })
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  removeItem: async (itemId) => {
    set({ isLoading: true })
    try {
      const response = await cartApi.removeItem(itemId)
      console.log('📦 removeItem - RESPONSE:', response)
      
      if (response.success && response.data) {
        const safeCart = normalizeCart(response.data)
        
        const itemCount = safeCart.items.reduce((total: number, item: CartItem) => {
          return total + (item?.quantity || 0)
        }, 0)
        
        console.log('📦 removeItem - FINAL CART:', {
          items: safeCart.items.length,
          itemCount,
          subtotal: safeCart.subtotal,
          total: safeCart.total,
        })
        
        set({
          cart: safeCart,
          itemCount,
        })
      }
    } catch (error) {
      console.error('Failed to remove item:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  clearCart: async () => {
    set({ isLoading: true })
    try {
      await cartApi.clearCart()
      console.log('📦 clearCart - CART CLEARED')
      set({
        cart: initialCart,
        itemCount: 0,
      })
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  setCart: (cart) => {
    const safeCart = normalizeCart(cart)
    
    const itemCount = safeCart.items.reduce((total: number, item: CartItem) => {
      return total + (item?.quantity || 0)
    }, 0)
    
    console.log('📦 setCart - FINAL CART:', {
      items: safeCart.items.length,
      itemCount,
      subtotal: safeCart.subtotal,
      total: safeCart.total,
    })
    
    set({
      cart: safeCart,
      itemCount,
    })
  },

  reset: () => {
    console.log('📦 reset - CART RESET')
    set({
      cart: null,
      isLoading: false,
      itemCount: 0,
    })
  },
}))