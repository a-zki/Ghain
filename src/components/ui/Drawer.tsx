'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right'
  title?: string
  children: React.ReactNode
}

export function Drawer({ isOpen, onClose, side = 'right', title, children }: DrawerProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true)
        })
      })
    } else {
      setVisible(false)
    }
  }, [isOpen])

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!mounted || !isOpen) return null

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'transition-opacity duration-300 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={cn(
          'fixed top-0 h-full w-full max-w-sm bg-white flex flex-col',
          'transition-transform duration-300 ease-out',
          side === 'right' && 'right-0',
          side === 'left' && 'left-0',
          side === 'right' && (visible ? 'translate-x-0' : 'translate-x-full'),
          side === 'left' && (visible ? 'translate-x-0' : '-translate-x-full'),
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          {title && (
            <h2 className="font-display text-sm font-bold tracking-widest uppercase">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-1 text-neutral-500 hover:text-black transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
