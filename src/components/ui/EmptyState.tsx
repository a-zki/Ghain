import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && <div className="mb-4 text-neutral-300">{icon}</div>}
      <h3 className="font-display text-lg font-bold tracking-tight uppercase">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-neutral-500">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex h-12 items-center justify-center bg-black px-6 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-200 hover:bg-neutral-900"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
