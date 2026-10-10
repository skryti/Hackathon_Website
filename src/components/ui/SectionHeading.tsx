import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  children: string
  gradientWords?: string[]
  className?: string
  id?: string
}

export function SectionHeading({ children, gradientWords, className, id }: SectionHeadingProps) {
  if (!gradientWords?.length) {
    return (
      <h2 id={id} className={cn('font-display text-display-lg text-txt', className)}>
        {children}
      </h2>
    )
  }

  const words = children.split(' ')
  return (
    <h2 id={id} className={cn('font-display text-display-lg text-txt', className)}>
      {words.map((word, i) => {
        const bare = word.replace(/[.,]/g, '')
        const isGradient = gradientWords.includes(bare)
        return (
          <span key={i} className={isGradient ? 'grad-text' : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </h2>
  )
}
