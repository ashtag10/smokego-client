import { useEffect, useState } from 'react'
import { storiesApi } from '@/lib/api/stories'
import type { Story } from '@/lib/types/story'

export function useStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    storiesApi.getActive().then((res) => {
      if (!mounted) return
      if (res.success && res.data) setStories(res.data)
      setIsLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return { stories, isLoading }
}