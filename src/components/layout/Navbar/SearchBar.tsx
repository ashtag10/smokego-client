'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/helpers'

interface SearchBarProps {
  fullWidth?: boolean
}

export const SearchBar = ({ fullWidth = false }: SearchBarProps) => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      router.push(`/shop/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative',
        fullWidth ? 'w-full' : 'w-64'
      )}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un produit..."
        className={cn(
          'w-full rounded-full border px-4 py-2 pr-10',
          'bg-white text-black-main',
          'placeholder:text-grey-400',

          // Bordure dorée
          'border-[#D4AF37]/60',

          // Transition
          'transition-all duration-300',

          // Hover
          'hover:border-[#D4AF37]',

          // Focus premium
          'focus:border-[#B8860B]',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-[#D4AF37]/20',
          'focus:shadow-[0_0_12px_rgba(212,175,55,0.12)]'
        )}
      />

      <button
        type="submit"
        aria-label="Rechercher"
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-[#B8860B]
          transition-all
          duration-300
          hover:scale-110
          hover:text-[#D4AF37]
        "
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  )
}