'use client'

import { FormEvent, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SearchBar = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = query.trim()

    if (!value) {
      router.push('/shop')
      return
    }

    router.push(`/shop/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        flex
        h-10
        w-full
        items-center
        rounded-full
        border
        border-gray-400
        bg-white
        transition-colors
        focus-within:border-black
      "
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Entrez un mot-clé ou un n° d'article"
        aria-label="Rechercher un produit"
        className="
          h-full
          min-w-0
          flex-1
          rounded-full
          bg-transparent
          pl-4
          pr-12
          text-[13px]
          text-gray-700
          outline-none
          placeholder:text-gray-500
        "
      />

      <button
        type="submit"
        aria-label="Rechercher"
        className="
          absolute
          right-1.5
          top-1/2
          flex
          h-8
          w-8
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          text-black
          transition-colors
          hover:bg-gray-100
        "
      >
        <Search
          className="h-[17px] w-[17px]"
          strokeWidth={1.8}
        />
      </button>
    </form>
  )
}