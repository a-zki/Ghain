import { cn } from '@/lib/utils/cn'

const sizeMap = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const

type LogoProps = {
  size?: keyof typeof sizeMap
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-display font-bold tracking-[0.2em] uppercase select-none',
        sizeMap[size],
        className,
      )}
    >
      GHAIN
    </span>
  )
}
