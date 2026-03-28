'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type FilterGroupProps = {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            'text-neutral-500 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  )
}
