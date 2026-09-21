'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export const WishlistIcon = () => {
  return (
    <Link
      href="/profile/favorites"
      aria-label="Mes favoris"
      className="flex h-10 w-10 items-center justify-center text-black transition-colors hover:text-gold-main"
    >
      <Heart
        className="h-[20px] w-[20px]"
        strokeWidth={1.5}
      />
    </Link>
  )
}