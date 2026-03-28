'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1)
  }

  const increment = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div
      className={cn('inline-flex h-8 items-center border border-neutral-300', className)}
    >
      <button
        onClick={decrement}
        disabled={value <= min}
        className="flex h-full w-8 items-center justify-center text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="flex h-full w-10 items-center justify-center border-x border-neutral-300 text-xs font-medium tabular-nums">
        {value}
      </span>
      <button
        onClick={increment}
        disabled={value >= max}
        className="flex h-full w-8 items-center justify-center text-neutral-500 transition-colors duration-200 hover:bg-neutral-100 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
