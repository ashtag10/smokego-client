export interface Slide {
  id: string
  title?: string | null
  subtitle?: string | null
  imageUrl: string
  linkUrl?: string | null
  position: number
  isActive: boolean
  startsAt?: string | null
  endsAt?: string | null
}