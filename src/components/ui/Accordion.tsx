'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type AccordionItem = {
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

type AccordionProps = {
  items: AccordionItem[]
  className?: string
}

function AccordionPanel({
  title,
  content,
  defaultOpen = false,
}: AccordionItem) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium tracking-tight transition-colors duration-200 hover:text-neutral-600"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className={cn(
            'shrink-0 text-neutral-500 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-neutral-600">{content}</div>
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionPanel key={index} {...item} />
      ))}
    </div>
  )
}
