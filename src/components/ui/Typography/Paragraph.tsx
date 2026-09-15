import { ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

interface ParagraphProps {
  children: ReactNode
  className?: string
  muted?: boolean
  small?: boolean
}

export const Paragraph = ({
  children,
  className,
  muted = false,
  small = false,
}: ParagraphProps) => {
  return (
    <p
      className={cn(
        'font-sans leading-relaxed',
        muted ? 'text-grey-600' : 'text-black-main',
        small ? 'text-sm' : 'text-base',
        className
      )}
    >
      {children}
    </p>
  )
}