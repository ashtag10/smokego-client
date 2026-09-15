import { ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  children: ReactNode
  level?: HeadingLevel
  className?: string
  gold?: boolean
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg md:text-xl lg:text-2xl',
  h6: 'text-base md:text-lg lg:text-xl',
}

export const Heading = ({
  children,
  level = 'h2',
  className,
  gold = false,
}: HeadingProps) => {
  const Component = level
  const styles = cn(
    'font-serif font-bold leading-tight',
    gold ? 'text-gold-main' : 'text-black-main',
    headingStyles[level],
    className
  )

  return <Component className={styles}>{children}</Component>
}