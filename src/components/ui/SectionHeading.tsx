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
      <h2 id={id} className={cn('font-display text-3xl sm:text-4xl md:text-5xl font-black text-center mx-auto tracking-tight leading-[1.15]', className)}>
        <span className="text-gray-900 dark:text-white">{children}</span>
      </h2>
    )
  }

  const words = children.split(' ')
  return (
    <h2 id={id} className={cn('font-display text-3xl sm:text-4xl md:text-5xl font-black text-center mx-auto tracking-tight leading-[1.15]', className)}>
      {words.map((word, i) => {
        const bare = word.replace(/[.,!?:;&]/g, '')
        const isGradient = gradientWords.includes(bare)
        return (
          <span
            key={i}
            className={
              isGradient
                ? 'bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] bg-clip-text text-transparent font-black inline-block'
                : 'text-gray-900 dark:text-white font-black'
            }
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </h2>
  )
}
