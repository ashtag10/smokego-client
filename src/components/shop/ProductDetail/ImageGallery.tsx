'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

interface ImageGalleryProps {
  images: string[]
  name: string
}

export const ImageGallery = ({
  images,
  name,
}: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div
        className="
          aspect-square
          rounded-2xl
          bg-grey-50
          border
          border-grey-100
          flex
          flex-col
          items-center
          justify-center
          gap-3
        "
      >
        <div className="w-14 h-14 rounded-full bg-grey-100 flex items-center justify-center">
          <ImageOff className="w-6 h-6 text-grey-400" />
        </div>

        <span className="text-sm text-grey-400">
          Pas d'image disponible
        </span>
      </div>
    )
  }

  const imageCount = images.length

  const goToPrevious = () => {
    setSelectedImage((current) =>
      current === 0 ? imageCount - 1 : current - 1
    )
  }

  const goToNext = () => {
    setSelectedImage((current) =>
      current === imageCount - 1 ? 0 : current + 1
    )
  }

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div
        className="
          relative
          aspect-square
          rounded-2xl
          overflow-hidden
          bg-grey-50
          border
          border-grey-100
          group
        "
      >
        <Image
          key={images[selectedImage]}
          src={images[selectedImage]}
          alt={`${name} - image ${selectedImage + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="
            object-cover
            transition-all
            duration-500
            group-hover:scale-[1.02]
          "
        />

        {/* Overlay léger */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            pointer-events-none
          "
        />

        {/* Compteur */}
        {imageCount > 1 && (
          <div
            className="
              absolute
              top-4
              right-4
              px-3
              py-1.5
              rounded-full
              bg-black/60
              backdrop-blur-md
              text-white
              text-xs
              font-medium
            "
          >
            {selectedImage + 1} / {imageCount}
          </div>
        )}

        {/* Navigation */}
        {imageCount > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Image précédente"
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                w-9
                h-9
                rounded-full
                bg-white/90
                backdrop-blur-sm
                flex
                items-center
                justify-center
                text-black-main
                shadow-sm
                opacity-0
                group-hover:opacity-100
                hover:bg-white
                hover:scale-105
                active:scale-95
                transition-all
                duration-200
              "
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Image suivante"
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                w-9
                h-9
                rounded-full
                bg-white/90
                backdrop-blur-sm
                flex
                items-center
                justify-center
                text-black-main
                shadow-sm
                opacity-0
                group-hover:opacity-100
                hover:bg-white
                hover:scale-105
                active:scale-95
                transition-all
                duration-200
              "
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniatures */}
      {imageCount > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((image, index) => {
            const isSelected = selectedImage === index

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`Afficher l'image ${index + 1}`}
                aria-current={isSelected}
                className={cn(
                  `
                    relative
                    w-[72px]
                    sm:w-20
                    aspect-square
                    rounded-xl
                    overflow-hidden
                    flex-shrink-0
                    bg-grey-50
                    border-2
                    transition-all
                    duration-200
                  `,
                  isSelected
                    ? `
                      border-gold-main
                      ring-2
                      ring-gold-main/20
                      scale-[1.02]
                    `
                    : `
                      border-transparent
                      opacity-70
                      hover:opacity-100
                      hover:border-gold-main/40
                    `
                )}
              >
                <Image
                  src={image}
                  alt={`${name} - miniature ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />

                {/* Overlay sur miniature non sélectionnée */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}