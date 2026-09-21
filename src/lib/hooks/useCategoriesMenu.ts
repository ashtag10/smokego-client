import { useEffect, useState } from 'react'
import { categoriesApi } from '@/lib/api/categories'
import type { CategoryMenuNode } from '@/lib/types/category'

export function useCategoriesMenu() {
  const [categories, setCategories] = useState<CategoryMenuNode[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    categoriesApi.getMenu().then((res) => {
      if (!mounted) return
      if (res.success && res.data) setCategories(res.data)
      setIsLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return { categories, isLoading }
}