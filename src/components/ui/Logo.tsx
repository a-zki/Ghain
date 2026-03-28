import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

const sizeMap = {
  sm: { text: 'text-lg', icon: 24 },
  md: { text: 'text-2xl', icon: 32 },
  lg: { text: 'text-4xl', icon: 48 },
} as const

type LogoProps = {
  size?: keyof typeof sizeMap
  className?: string
  iconOnly?: boolean
}

export function Logo({ size = 'md', className, iconOnly }: LogoProps) {
  const { text, icon } = sizeMap[size]

  if (iconOnly) {
    return (
      <Image
        src="/images/logo.png"
        alt="Ghain"
        width={icon}
        height={icon}
        className={cn('object-contain', className)}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-display font-bold tracking-[0.2em] uppercase select-none',
        text,
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={icon}
        height={icon}
        className="object-contain"
      />
      GHAIN
    </span>
  )
}
