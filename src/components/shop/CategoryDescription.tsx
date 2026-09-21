'use client'

import { useState, useRef, useEffect } from 'react'

interface CategoryDescriptionProps {
  description: string
}

export const CategoryDescription = ({ description }: CategoryDescriptionProps) => {
  const [expanded, setExpanded] = useState(false)
  const [isTruncatable, setIsTruncatable] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setIsTruncatable(contentRef.current.scrollHeight > 180)
    }
  }, [description])

  return (
    <div className="mb-8">
      <div
        ref={contentRef}
        className={cn2(!expanded && isTruncatable ? 'max-h-[180px] overflow-hidden' : '')}
      >
        <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-grey-600">
          {description}
        </p>
      </div>

      {isTruncatable && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-[#B8860B] hover:underline"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </div>
  )
}

// petit helper local pour éviter d'importer cn juste pour une classe conditionnelle
function cn2(className: string) {
  return `relative transition-[max-height] duration-300 ${className}`
}
