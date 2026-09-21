'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { useCategoriesMenu } from '@/lib/hooks/useCategoriesMenu'
import { siteConfig } from '@/lib/config/site'

const mediaUrl = (path?: string | null) => {
  if (!path) return null

  if (path.startsWith('http')) {
    return path
  }

  return `${siteConfig.apiUrl.replace('/api', '')}${path}`
}

interface CategoryCardProps {
  category: any
  className?: string
  sizes?: string
}

const CategoryCard = ({
  category,
  className = '',
  sizes = '50vw',
}: CategoryCardProps) => {
  const image = mediaUrl(category.imageUrl)

  return (
    <Link
      href={`/shop/c/${category.slug}`}
      className={`
        group
        relative
        block
        min-h-0
        w-full
        max-w-full
        overflow-hidden
        bg-[#EAE7DF]
        ${className}
      `}
    >
      {/* IMAGE */}
      {image ? (
        <Image
          src={image}
          alt={category.name}
          fill
          sizes={sizes}
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#2D2D2D]
            via-[#1A1A1A]
            to-[#0A0A0A]
          "
        />
      )}

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          transition-opacity
          duration-500
          group-hover:from-black/90
        "
      />

      {/* GOLD LINE */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#C9A94E]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* CONTENT */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          min-w-0
          p-3
          sm:p-5
          lg:p-7
        "
      >
        <div
          className="
            flex
            min-w-0
            items-end
            justify-between
            gap-2
            sm:gap-3
          "
        >
          {/* TEXT */}
          <div className="min-w-0 flex-1">
            <h3
              className="
                line-clamp-2
                break-words
                font-serif
                text-lg
                font-medium
                leading-tight
                text-white
                sm:text-2xl
                lg:text-3xl
              "
            >
              {category.name}
            </h3>

            {category.children?.length > 0 && (
              <p
                className="
                  mt-1
                  truncate
                  text-[9px]
                  uppercase
                  tracking-[0.12em]
                  text-white/65
                  sm:mt-1.5
                  sm:text-[10px]
                  sm:tracking-[0.15em]
                "
              >
                {category.children.length}{' '}
                {category.children.length > 1
                  ? 'collections'
                  : 'collection'}
              </p>
            )}
          </div>

          {/* ARROW */}
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              border
              border-white/40
              text-white
              transition-all
              duration-300
              group-hover:border-[#C9A94E]
              group-hover:bg-[#C9A94E]
              group-hover:text-black
              sm:h-9
              sm:w-9
            "
          >
            <ArrowUpRight
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </Link>
  )
}

export const CategoryShowcase = () => {
  const { categories, isLoading } = useCategoriesMenu()

  if (isLoading) {
    return (
      <section
        className="
          w-full
          max-w-full
          overflow-hidden
          bg-white
          py-12
          sm:py-16
          md:py-20
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-3
            sm:px-6
            lg:px-10
          "
        >
          <div
            className="
              w-full
              min-w-0
              space-y-3
              sm:space-y-4
              lg:space-y-5
            "
          >
            {/* TOP */}
            <div
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-3
                sm:grid-cols-2
                sm:gap-4
                lg:gap-5
              "
            >
              <div
                className="
                  h-[300px]
                  w-full
                  animate-pulse
                  bg-[#F0F0F0]
                  sm:h-[420px]
                  md:h-[520px]
                  lg:h-[620px]
                "
              />

              <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-rows-2 sm:gap-4 lg:gap-5">
                <div className="h-[220px] w-full animate-pulse bg-[#F0F0F0] sm:h-auto" />
                <div className="h-[220px] w-full animate-pulse bg-[#F0F0F0] sm:h-auto" />
              </div>
            </div>

            {/* FULL WIDTH */}
            <div
              className="
                h-[180px]
                w-full
                animate-pulse
                bg-[#F0F0F0]
                sm:h-[220px]
                md:h-[260px]
                lg:h-[300px]
              "
            />

            {/* BOTTOM */}
            <div
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-3
                sm:grid-cols-3
                sm:gap-4
                lg:gap-5
              "
            >
              <div className="h-[220px] w-full animate-pulse bg-[#F0F0F0] sm:h-[240px]" />
              <div className="h-[220px] w-full animate-pulse bg-[#F0F0F0] sm:h-[240px]" />
              <div className="h-[220px] w-full animate-pulse bg-[#F0F0F0] sm:h-[240px]" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const visibleCategories = categories
    .filter((category) => category.isActive)
    .sort((a, b) => a.position - b.position)
    .slice(0, 7)

  if (visibleCategories.length === 0) {
    return null
  }

  const firstCategory = visibleCategories[0]
  const secondCategory = visibleCategories[1]
  const thirdCategory = visibleCategories[2]
  const fourthCategory = visibleCategories[3]
  const fifthCategory = visibleCategories[4]
  const sixthCategory = visibleCategories[5]
  const seventhCategory = visibleCategories[6]

  return (
    <section
      className="
        w-full
        max-w-full
        overflow-hidden
        bg-white
        py-12
        sm:py-16
        md:py-20
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          min-w-0
          px-3
          sm:px-6
          lg:px-10
        "
      >
        <div
          className="
            w-full
            min-w-0
            space-y-3
            sm:space-y-4
            lg:space-y-5
          "
        >
          {/* =====================================================
              TOP BLOCK
              GRANDE CARTE + 2 CARTES À DROITE
          ====================================================== */}

          <div
            className="
              grid
              w-full
              min-w-0
              grid-cols-1
              gap-3
              sm:grid-cols-2
              sm:gap-4
              lg:gap-5
            "
          >
            {/* GRANDE CARTE */}
            {firstCategory && (
              <CategoryCard
                category={firstCategory}
                className="
                  h-[320px]
                  sm:h-[420px]
                  md:h-[520px]
                  lg:h-[620px]
                "
                sizes="50vw"
              />
            )}

            {/* COLONNE DROITE */}
            {(secondCategory || thirdCategory) && (
              <div
                className="
                  grid
                  w-full
                  min-w-0
                  grid-cols-1
                  gap-3
                  sm:grid-rows-2
                  sm:gap-4
                  lg:gap-5
                "
              >
                {secondCategory && (
                  <CategoryCard
                    category={secondCategory}
                    className="
                      h-[240px]
                      sm:h-auto
                      sm:min-h-0
                    "
                    sizes="50vw"
                  />
                )}

                {thirdCategory && (
                  <CategoryCard
                    category={thirdCategory}
                    className="
                      h-[240px]
                      sm:h-auto
                      sm:min-h-0
                    "
                    sizes="50vw"
                  />
                )}
              </div>
            )}
          </div>

          {/* =====================================================
              FULL WIDTH
              ====================================================== */}

          {fourthCategory && (
            <CategoryCard
              category={fourthCategory}
              className="
                h-[180px]
                sm:h-[220px]
                md:h-[260px]
                lg:h-[300px]
              "
              sizes="100vw"
            />
          )}

          {/* =====================================================
              BOTTOM — 3 COLONNES
          ====================================================== */}

          {(fifthCategory ||
            sixthCategory ||
            seventhCategory) && (
            <div
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-3
                sm:grid-cols-3
                sm:gap-4
                lg:gap-5
              "
            >
              {fifthCategory && (
                <CategoryCard
                  category={fifthCategory}
                  className="
                    h-[220px]
                    sm:h-[240px]
                    md:h-[280px]
                    lg:h-[320px]
                  "
                  sizes="33vw"
                />
              )}

              {sixthCategory && (
                <CategoryCard
                  category={sixthCategory}
                  className="
                    h-[220px]
                    sm:h-[240px]
                    md:h-[280px]
                    lg:h-[320px]
                  "
                  sizes="33vw"
                />
              )}

              {seventhCategory && (
                <CategoryCard
                  category={seventhCategory}
                  className="
                    h-[220px]
                    sm:h-[240px]
                    md:h-[280px]
                    lg:h-[320px]
                  "
                  sizes="33vw"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
