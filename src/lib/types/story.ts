export type MediaType = 'IMAGE' | 'VIDEO'

export interface StoryItem {
  id: string
  storyId: string
  mediaUrl: string
  mediaType: MediaType
  linkUrl?: string | null
  duration: number
  position: number
  expiresAt?: string | null
}

export interface Story {
  id: string
  title: string
  coverUrl: string
  isActive: boolean
  position: number
  items: StoryItem[]
}