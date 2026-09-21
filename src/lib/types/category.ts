export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
  icon?: string | null
  position: number
  isActive: boolean
  parentId?: string | null
}

export interface CategoryMenuNode extends Category {
  children: Category[]
}