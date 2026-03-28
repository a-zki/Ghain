'use client'

import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const messages = [
  'Free shipping on orders over $200',
  'New collection now live',
]

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const cycle = useCallback(() => {
    setVisible(false)
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
      setVisible(true)
    }, 300)
    return timeout
  }, [])

  useEffect(() => {
    if (dismissed) return

    const interval = setInterval(() => {
      cycle()
    }, 4000)

    return () => clearInterval(interval)
  }, [dismissed, cycle])

  if (dismissed) return null

  return (
    <div className="relative bg-black text-white text-[10px] uppercase tracking-widest text-center py-2 px-8">
      <span
        className={cn(
          'inline-block transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {messages[currentIndex]}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  )
}
