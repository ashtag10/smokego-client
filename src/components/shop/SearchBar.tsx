'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface SearchBarProps {
  fullWidth?: boolean
  className?: string
}

export const SearchBar = ({
  fullWidth = false,
  className,
}: SearchBarProps) => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      router.push(`/shop/search?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative group',
        fullWidth ? 'w-full' : 'w-full sm:w-64 lg:w-72',
        className
      )}
    >
      {/* Input */}
      <div
        className={cn(
          'relative flex items-center',
          'h-11',
          'rounded-full',
          'bg-grey-50',
          'border border-grey-200',
          'transition-all duration-200',
          'group-hover:border-grey-300',
          'focus-within:border-gold-main',
          'focus-within:bg-white',
          'focus-within:ring-4 focus-within:ring-gold-main/10'
        )}
      >
        {/* Search icon */}
        <div className="absolute left-4 flex items-center pointer-events-none">
          <Search
            className={cn(
              'w-[18px] h-[18px]',
              'text-grey-400',
              'transition-colors duration-200',
              'group-focus-within:text-gold-main'
            )}
            strokeWidth={2}
          />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit..."
          aria-label="Rechercher un produit"
          className="
            w-full
            h-full
            pl-11
            pr-20
            bg-transparent
            border-none
            outline-none
            text-sm
            text-black-main
            placeholder:text-grey-400
            focus:ring-0
          "
        />

        {/* Actions */}
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Effacer la recherche"
              className="
                w-7
                h-7
                rounded-full
                flex
                items-center
                justify-center
                text-grey-400
                hover:text-black-main
                hover:bg-grey-100
                transition-all
                duration-200
              "
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          )}

          <button
            type="submit"
            aria-label="Rechercher"
            className="
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              bg-gold-main
              text-white
              shadow-sm
              hover:bg-gold-dark
              hover:shadow-md
              active:scale-95
              transition-all
              duration-200
            "
          >
            <Search className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </form>
  )
}