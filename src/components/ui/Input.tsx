'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

type InputProps = {
  label?: string
  error?: string
  hint?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5 font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-12 w-full border border-neutral-200 bg-white px-4 text-sm text-black',
            'placeholder:text-neutral-400',
            'focus:border-black focus:outline-none',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
            error && 'border-red-600 focus:border-red-600',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 mt-1" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-400 mt-1">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
