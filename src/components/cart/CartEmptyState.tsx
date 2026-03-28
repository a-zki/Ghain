import { ShoppingBag } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'

export function CartEmptyState() {
  return (
    <EmptyState
      icon={<ShoppingBag size={48} strokeWidth={1} />}
      title="Your bag is empty"
      description="Looks like you haven't added anything to your bag yet."
      action={{ label: 'Start Shopping', href: '/shop' }}
    />
  )
}
