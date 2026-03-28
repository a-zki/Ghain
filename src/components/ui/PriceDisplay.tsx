import { cn } from '@/lib/utils/cn'
import { formatCurrency } from '@/lib/utils/formatCurrency'

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const

type PriceDisplayProps = {
  price: number
  compareAtPrice?: number
  size?: keyof typeof sizeStyles
  currency?: string
  className?: string
}

export function PriceDisplay({
  price,
  compareAtPrice,
  size = 'md',
  currency = 'USD',
  className,
}: PriceDisplayProps) {
  const isOnSale = compareAtPrice != null && compareAtPrice > price

  return (
    <div className={cn('inline-flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-medium tracking-tight',
          sizeStyles[size],
          isOnSale && 'text-black',
        )}
      >
        {formatCurrency(price, currency)}
      </span>
      {isOnSale && (
        <span
          className={cn(
            'text-neutral-400 line-through',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base',
          )}
        >
          {formatCurrency(compareAtPrice, currency)}
        </span>
      )}
    </div>
  )
}
