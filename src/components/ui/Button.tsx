'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Spinner } from './Spinner'

const variantStyles = {
  primary:
    'bg-black text-white hover:bg-neutral-900 active:bg-neutral-800',
  secondary:
    'bg-white text-black border border-black hover:bg-neutral-100 active:bg-neutral-200',
  ghost:
    'bg-transparent text-black hover:bg-neutral-100 active:bg-neutral-200',
  link: 'bg-transparent text-black underline hover:text-neutral-700 px-0',
  icon: 'bg-transparent text-black p-2 hover:bg-neutral-100 active:bg-neutral-200',
} as const

const sizeStyles = {
  sm: 'h-8 px-3 text-[11px]',
  md: 'h-12 px-6 text-xs',
  lg: 'h-14 px-8 text-sm',
} as const

type ButtonProps = {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  isLoading?: boolean
  fullWidth?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center uppercase tracking-widest font-medium transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          variant !== 'link' && variant !== 'icon' && sizeStyles[size],
          variant === 'icon' && 'h-auto',
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner
              size={size === 'sm' ? 'sm' : 'md'}
              className="mr-2"
            />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
