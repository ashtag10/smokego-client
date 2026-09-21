'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSlides } from '@/lib/hooks/useSlides'
import { PrimaryButton } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { cn } from '@/lib/utils/helpers'
import { siteConfig } from '@/lib/config/site'

// Les images viennent du backend NestJS (dossier /uploads), pas de /public du frontend
const mediaUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteConfig.apiUrl.replace('/api', '')}${path}`

export const HeroCarousel = () => {
  const { slides, isLoading } = useSlides()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((i) => (slides.length ? (i + 1) % slides.length : 0))
  }, [slides.length])

  const prev = () => {
    setCurrent((i) => (slides.length ? (i - 1 + slides.length) % slides.length : 0))
  }

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [slides.length, next])

  if (isLoading || slides.length === 0) {
    return <div className="h-[420px] w-full animate-pulse bg-grey-100 md:h-[520px]" />
  }

  const slide = slides[current]

  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <Image
            src={mediaUrl(s.imageUrl)}
            alt={s.title ?? 'OusmanHOOKAH'}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-4">
        <div className="max-w-lg space-y-5 text-white">
          {slide.title && (
            <Heading level="h1" className="text-3xl leading-tight text-white md:text-5xl">
              {slide.title}
            </Heading>
          )}
          {slide.subtitle && (
            <Paragraph className="text-base text-white/85 md:text-lg">{slide.subtitle}</Paragraph>
          )}
          {slide.linkUrl && (
            <Link href={slide.linkUrl}>
              <PrimaryButton className="px-7 py-3.5 text-base">Découvrir</PrimaryButton>
            </Link>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Précédent"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black-main hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Suivant"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black-main hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Aller à la diapositive ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === current ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/60'
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}