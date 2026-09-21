'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface CartIconProps {
  count: number
}

export const CartIcon = ({ count }: CartIconProps) => {
  return (
    <Link
      href="/cart"
      aria-label="Panier"
      className="relative flex h-10 w-10 items-center justify-center text-black transition-colors hover:text-gold-main"
    >
      <ShoppingCart
        className="h-[20px] w-[20px]"
        strokeWidth={1.5}
      />

      {count > 0 && (
        <span className="absolute right-[1px] top-[1px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}