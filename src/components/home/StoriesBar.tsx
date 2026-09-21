'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Play } from 'lucide-react'

import { useStories } from '@/lib/hooks/useStories'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils/helpers'
import { StoryViewer } from './StoryViewer'

const mediaUrl = (path: string) =>
  path.startsWith('http')
    ? path
    : `${siteConfig.apiUrl.replace('/api', '')}${path}`

export const StoriesBar = () => {
  const { stories, isLoading } = useStories()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (isLoading || stories.length === 0) {
    return null
  }

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return

    const card = el.querySelector<HTMLElement>('[data-story-card]')
    const step = card ? card.offsetWidth + 16 : 300

    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section className="relative mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
      {/* Piste défilante */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            data-story-card
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[9/16] w-[150px] shrink-0 overflow-hidden rounded-xl bg-gray-200 sm:w-[180px]"
          >
            <Image
              src={mediaUrl(story.coverUrl)}
              alt={story.title}
              fill
              sizes="(min-width: 640px) 180px, 150px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />

            {/* Léger voile pour faire ressortir le bouton play */}
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

            {/* Bouton play centré, blanc plein */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md sm:h-12 sm:w-12">
                <Play
                  className="ml-0.5 h-4 w-4 fill-black text-black"
                  strokeWidth={0}
                />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Flèche de défilement, à cheval sur le bord droit */}
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Voir plus de stories"
        className={cn(
          'absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center',
          'rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-transform hover:scale-105',
        )}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>

      {openIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}