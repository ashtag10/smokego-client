'use client'

import { useEffect, useState } from 'react'
import { reviewsApi } from '@/lib/api/reviews'
import { Heading } from '@/components/ui/Typography/Heading'
import { Paragraph } from '@/components/ui/Typography/Paragraph'
import { formatDate } from '@/lib/utils/formatters'
import { GoldDivider } from '@/components/ui/Divider/GoldDivider'
import { cn, getInitials } from '@/lib/utils/helpers'
import type { Review } from '@/lib/types/review'

interface ReviewListProps {
  productId: string
}

export const ReviewList = ({ productId }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsApi.getProductReviews(productId)

        if (response.success && response.data) {
          const data = response.data
          const reviewsData = Array.isArray(data) ? data : data.data || []

          setReviews(reviewsData)

          if (reviewsData.length > 0) {
            const avg =
              reviewsData.reduce((acc, review) => acc + review.rating, 0) /
              reviewsData.length

            setAverageRating(avg || 0)
          }
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  /* ─────────────────────────────────────────────
     Loading
  ───────────────────────────────────────────── */

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Résumé */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-24 h-20 bg-grey-100 animate-pulse rounded-2xl" />

          <div className="space-y-3">
            <div className="w-36 h-6 bg-grey-100 animate-pulse rounded" />
            <div className="w-24 h-4 bg-grey-100 animate-pulse rounded" />
          </div>
        </div>

        <GoldDivider />

        {/* Reviews */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-grey-100 bg-grey-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-grey-200 animate-pulse" />

                <div className="space-y-2">
                  <div className="w-28 h-4 bg-grey-200 animate-pulse rounded" />
                  <div className="w-36 h-3 bg-grey-200 animate-pulse rounded" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="w-full h-3 bg-grey-200 animate-pulse rounded" />
                <div className="w-4/5 h-3 bg-grey-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* ─────────────────────────────────────────────
     Empty state
  ───────────────────────────────────────────── */

  if (reviews.length === 0) {
    return (
      <div className="py-12 px-6 text-center rounded-2xl border border-dashed border-grey-200 bg-grey-50/50">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-main/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-gold-main"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.5a.6.6 0 011.04 0l2.12 4.3a.6.6 0 00.45.33l4.74.69a.6.6 0 01.33 1.02l-3.43 3.35a.6.6 0 00-.17.53l.81 4.73a.6.6 0 01-.87.63l-4.24-2.23a.6.6 0 00-.56 0l-4.24 2.23a.6.6 0 01-.87-.63l.81-4.73a.6.6 0 00-.17-.53L2.8 9.84a.6.6 0 01.33-1.02l4.74-.69a.6.6 0 00.45-.33l2.12-4.3z"
            />
          </svg>
        </div>

        <Heading level="h5" className="mb-2">
          Aucun avis pour le moment
        </Heading>

        <Paragraph muted>
          Soyez le premier à partager votre expérience avec ce produit.
        </Paragraph>
      </div>
    )
  }

  /* ─────────────────────────────────────────────
     Review summary
  ───────────────────────────────────────────── */

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Note */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gold-main/10 border border-gold-main/20">
            <span className="text-3xl font-bold text-gold-main">
              {averageRating.toFixed(1)}
            </span>
          </div>

          <div>
            {/* Étoiles */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index < Math.round(averageRating)

                return (
                  <svg
                    key={index}
                    className={cn(
                      'w-5 h-5 transition-colors',
                      filled ? 'text-gold-main' : 'text-grey-200'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )
              })}
            </div>

            <p className="text-sm text-grey-500 mt-1">
              Basé sur {reviews.length} avis
            </p>
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* Liste */}
      <div className="space-y-4">
        {reviews.map((review) => {
          const userName = review.user?.name || 'Utilisateur'
          const initials = getInitials(userName)

          return (
            <article
              key={review.id}
              className={cn(
                'group relative p-5 md:p-6 rounded-2xl',
                'border border-grey-100 bg-white',
                'transition-all duration-300',
                'hover:border-gold-main/20 hover:shadow-sm'
              )}
            >
              {/* Accent doré */}
              <div
                className="
                  absolute left-0 top-6 bottom-6
                  w-0.5 rounded-full
                  bg-gold-main/0
                  group-hover:bg-gold-main
                  transition-all duration-300
                "
              />

              {/* Header avis */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-main to-gold-dark text-white flex items-center justify-center font-semibold text-sm shadow-sm flex-shrink-0">
                    {initials}
                  </div>

                  <div>
                    <p className="font-semibold text-black-main">
                      {userName}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={cn(
                              'w-3.5 h-3.5',
                              index < review.rating
                                ? 'text-gold-main'
                                : 'text-grey-200'
                            )}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <span className="w-1 h-1 rounded-full bg-grey-300" />

                      <span className="text-xs text-grey-400">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge vérifié */}
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-grey-400">
                  <svg
                    className="w-3.5 h-3.5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Avis client
                </span>
              </div>

              {/* Contenu */}
              <div className="mt-4 pl-0 sm:pl-14">
                <Paragraph className="text-grey-600 leading-7">
                  {review.content}
                </Paragraph>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}