import { cn } from '@/lib/utils/cn'

const variantStyles = {
  default: 'bg-black text-white text-[10px] px-2 py-0.5 uppercase tracking-widest font-medium',
  outline:
    'border border-black text-black text-[10px] px-2 py-0.5 uppercase tracking-widest font-medium',
  'cart-count':
    'bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none',
} as const

type BadgeProps = {
  variant?: keyof typeof variantStyles
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center', variantStyles[variant], className)}>
      {children}
    </span>
  )
}
