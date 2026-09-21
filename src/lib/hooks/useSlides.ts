import { useEffect, useState } from 'react'
import { slidesApi } from '@/lib/api/slides'
import type { Slide } from '@/lib/types/slide'

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    slidesApi.getActive().then((res) => {
      if (!mounted) return
      if (res.success && res.data) setSlides(res.data)
      setIsLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return { slides, isLoading }
}