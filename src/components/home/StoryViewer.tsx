'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import type { Story } from '@/lib/types/story'
import { siteConfig } from '@/lib/config/site'

const mediaUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteConfig.apiUrl.replace('/api', '')}${path}`

interface StoryViewerProps {
  stories: Story[]
  initialIndex: number
  onClose: () => void
}

export const StoryViewer = ({ stories, initialIndex, onClose }: StoryViewerProps) => {
  const [storyIndex, setStoryIndex] = useState(initialIndex)
  const [itemIndex, setItemIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const story = stories[storyIndex]
  const item = story?.items[itemIndex]

  const goNext = () => {
    if (!story) return

    setProgress(0)

    if (itemIndex < story.items.length - 1) {
      setItemIndex((i) => i + 1)
    } else if (storyIndex < stories.length - 1) {
      setStoryIndex((s) => s + 1)
      setItemIndex(0)
    } else {
      onClose()
    }
  }

  const goPrev = () => {
    setProgress(0)

    if (itemIndex > 0) {
      setItemIndex((i) => i - 1)
    } else if (storyIndex > 0) {
      setStoryIndex((s) => s - 1)
      setItemIndex(0)
    }
  }

  // Bloque le scroll de la page derrière
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Réinitialise à chaque changement d'item : lecture vidéo + progression
  useEffect(() => {
    if (!item) return

    setIsPaused(false)
    setProgress(0)

    if (item.mediaType === 'VIDEO') {
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => setIsPaused(true))
      }
      return
    }

    const durationMs = (item.duration || 5) * 1000
    const stepMs = 100
    let elapsed = 0

    intervalRef.current = setInterval(() => {
      elapsed += stepMs
      setProgress(Math.min((elapsed / durationMs) * 100, 100))

      if (elapsed >= durationMs) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        goNext()
      }
    }, stepMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex, itemIndex])

  // Pause / reprise (vidéo ou image)
  useEffect(() => {
    if (item?.mediaType === 'VIDEO') {
      const video = videoRef.current
      if (!video) return
      if (isPaused) video.pause()
      else video.play().catch(() => {})
      return
    }

    if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [isPaused, item])

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }

  const togglePause = () => setIsPaused((p) => !p)

  const toggleMute = () => {
    const video = videoRef.current
    if (video) video.muted = !video.muted
    setIsMuted((m) => !m)
  }

  if (!item) return null

  return (
    // Overlay de fond : occupe l'écran juste pour centrer le cadre et permettre de fermer au clic à l'extérieur,
    // mais reste semi-transparent (le reste de la page doit rester visible derrière)
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      {/* Le cadre réservé à la story : taille fixe, pas plein écran */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[9/16] w-[300px] max-h-[85vh] max-w-[85vw] overflow-hidden rounded-2xl bg-black shadow-2xl sm:w-[340px]"
      >
        {/* Barres de progression, une par item de la story courante */}
        <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-2">
          {story.items.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/30"
            >
              <div
                className="h-full bg-white transition-[width] duration-100 ease-linear"
                style={{
                  width:
                    i < itemIndex ? '100%' : i === itemIndex ? `${progress}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Média */}
        {item.mediaType === 'VIDEO' ? (
          <video
            ref={videoRef}
            src={mediaUrl(item.mediaUrl)}
            muted={isMuted}
            playsInline
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={goNext}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={mediaUrl(item.mediaUrl)}
            alt={story.title}
            fill
            className="object-cover"
          />
        )}

        {/* Zones de tap gauche / droite, contenues dans le cadre */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Précédent"
          className="absolute left-0 top-0 h-full w-1/3 cursor-default"
        />
        <button
          type="button"
          onClick={goNext}
          aria-label="Suivant"
          className="absolute right-0 top-0 h-full w-1/3 cursor-default"
        />

        {/* Colonne de contrôles, en haut à droite du cadre */}
        <div className="absolute right-2 top-6 z-20 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? 'Lecture' : 'Pause'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            {isPaused ? (
              <Play className="ml-0.5 h-3.5 w-3.5 fill-white" strokeWidth={0} />
            ) : (
              <Pause className="h-3.5 w-3.5 fill-white" strokeWidth={0} />
            )}
          </button>

          {item.mediaType === 'VIDEO' && (
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Volume2 className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          )}
        </div>

        {/* CTA bas, contenu dans le cadre */}
        {item.linkUrl && (
          <Link
            href={item.linkUrl}
            className="absolute bottom-4 left-1/2 z-20 flex w-[calc(100%-24px)] -translate-x-1/2 items-center justify-center rounded-lg bg-black/50 py-3 text-[13px] font-medium text-white backdrop-blur-sm"
          >
            Voir le(s) produit(s)
          </Link>
        )}
      </div>
    </div>
  )
}