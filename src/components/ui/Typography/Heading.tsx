import { ReactNode } from 'react'
import { cn } from '@/lib/utils/helpers'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps {
  children: ReactNode
  level?: HeadingLevel
  className?: string
  gold?: boolean
}

// Tailles RÉDUITES et sans-serif pour coller à El-Badia
const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-[18px] sm:text-[20px]',
  h2: 'text-[15px] sm:text-[16px]',
  h3: 'text-[14px] sm:text-[15px]',
  h4: 'text-[13px] sm:text-[14px]',
  h5: 'text-[12px] sm:text-[13px]',
  h6: 'text-[11px] sm:text-[12px]',
}

export const Heading = ({
  children,
  level = 'h2',
  className,
  gold = false,
}: HeadingProps) => {
  const Component = level
  const styles = cn(
    // Police sans-serif (comme El-Badia) au lieu de serif
    'font-sans font-bold leading-tight',
    gold ? 'text-gold-main' : 'text-black',
    headingStyles[level],
    className
  )

  return <Component className={styles}>{children}</Component>
}