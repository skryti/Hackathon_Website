import { cn } from '../../lib/cn'
import { GoogleText } from './GoogleText'

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
        <span className="text-gray-900 dark:text-white font-black">{children}</span>
      </h2>
    )
  }

  const cleanChildren = children.replace(/&amp;/g, '&')
  const words = cleanChildren.split(' ')
  const segments: { text: string; isGradient: boolean }[] = []

  let currentWords: string[] = []
  let currentIsGrad: boolean | null = null

  for (const word of words) {
    const bare = word.replace(/[.,!?:;]/g, '')
    const isGrad = gradientWords.includes(bare) || gradientWords.includes(word)

    if (currentIsGrad === null) {
      currentIsGrad = isGrad
      currentWords.push(word)
    } else if (currentIsGrad === isGrad) {
      currentWords.push(word)
    } else {
      segments.push({ text: currentWords.join(' '), isGradient: currentIsGrad })
      currentIsGrad = isGrad
      currentWords = [word]
    }
  }

  if (currentWords.length > 0 && currentIsGrad !== null) {
    segments.push({ text: currentWords.join(' '), isGradient: currentIsGrad })
  }

  return (
    <h2 id={id} className={cn('font-display text-3xl sm:text-4xl md:text-5xl font-black text-center mx-auto tracking-tight leading-[1.15]', className)}>
      {segments.map((segment, idx) => (
        <span key={idx}>
          {segment.isGradient ? (
            <GoogleText text={segment.text} className="font-black" />
          ) : (
            <span className="text-gray-900 dark:text-white font-black">
              {segment.text}
            </span>
          )}
          {idx < segments.length - 1 ? ' ' : ''}
        </span>
      ))}
    </h2>
  )
}

