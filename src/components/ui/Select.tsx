'use client'

import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type SelectProps = {
  label?: string
  error?: string
  hint?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className, id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs uppercase tracking-widest text-neutral-500 mb-1.5 font-medium"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'h-12 w-full appearance-none border border-neutral-200 bg-white px-4 pr-10 text-sm text-black',
              'focus:border-black focus:outline-none',
              'transition-colors duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
              error && 'border-red-600 focus:border-red-600',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
            }
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
            size={16}
          />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-xs text-red-600 mt-1" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="text-xs text-neutral-400 mt-1">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'

export { Select }
export type { SelectProps }
