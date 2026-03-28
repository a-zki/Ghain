'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

type TextareaProps = {
  label?: string
  error?: string
  hint?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5 font-medium"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[120px] w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-black resize-y',
            'placeholder:text-neutral-400',
            'focus:border-black focus:outline-none',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
            error && 'border-red-600 focus:border-red-600',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-red-600 mt-1" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-xs text-neutral-400 mt-1">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
export type { TextareaProps }
