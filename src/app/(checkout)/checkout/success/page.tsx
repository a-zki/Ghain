import { redirect } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ClearCartOnMount } from '@/components/checkout/ClearCartOnMount'

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    redirect('/')
  }

  return (
    <>
      <ClearCartOnMount />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-3xl font-bold tracking-wide uppercase mt-8">
          Order Confirmed
        </h1>

        <p className="text-neutral-600 mt-3 text-lg">
          Thank you for your purchase
        </p>

        <p className="text-sm text-neutral-500 mt-6 max-w-sm">
          You will receive a confirmation email shortly with your order details
          and tracking information.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="secondary" size="md">
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
