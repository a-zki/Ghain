import { cn } from '@/lib/utils/cn'

type PageContainerProps = {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12', className)}>
      {children}
    </div>
  )
}
