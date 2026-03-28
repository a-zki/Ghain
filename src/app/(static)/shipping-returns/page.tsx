import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
}

const sections = [
  {
    id: 'shipping-policy',
    title: 'Shipping Policy',
    content: [
      'We offer worldwide shipping on all orders. Standard shipping is complimentary on orders over $200. For orders under $200, a flat rate of $12 applies for domestic shipping and $25 for international shipping.',
      'All orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has shipped.',
      'Please note that international orders may be subject to customs duties and import taxes, which are the responsibility of the recipient.',
    ],
  },
  {
    id: 'delivery-times',
    title: 'Delivery Times',
    content: [
      'Domestic (United States): 3-5 business days via standard shipping, 1-2 business days via express shipping ($15 surcharge).',
      'Canada and Mexico: 5-8 business days.',
      'Europe: 7-12 business days.',
      'Rest of World: 10-18 business days.',
      'Delivery times are estimates and may vary during peak periods or due to circumstances beyond our control.',
    ],
  },
  {
    id: 'returns-policy',
    title: 'Returns Policy',
    content: [
      'We accept returns on unworn, unwashed items in their original condition with tags attached within 30 days of delivery. Items must be returned in their original packaging.',
      'Sale items and accessories marked as final sale are not eligible for return. Gift cards are non-refundable.',
      'To initiate a return, contact us at hello@ghain.com with your order number and reason for return. We will provide a prepaid return label for domestic orders. International return shipping costs are the responsibility of the customer.',
      'Refunds are processed within 5-7 business days of receiving the returned item. The refund will be issued to the original payment method.',
    ],
  },
  {
    id: 'exchange-process',
    title: 'Exchange Process',
    content: [
      'We offer free exchanges on all full-price items for a different size or color, subject to availability. To request an exchange, email hello@ghain.com with your order number and the item you would like instead.',
      'For the fastest service, we recommend placing a new order for the desired item and returning the original for a refund.',
      'Exchanges are processed within 3-5 business days of receiving the original item. If the requested size or color is unavailable, we will issue a full refund.',
    ],
  },
]

export default function ShippingReturnsPage() {
  return (
    <PageContainer className="py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shipping & Returns' },
        ]}
      />

      <div className="mt-6 mb-12">
        <h1 className="font-display text-3xl font-light tracking-tight">
          Shipping &amp; Returns
        </h1>
      </div>

      <div className="max-w-3xl pb-16 space-y-0">
        {sections.map((section) => (
          <details
            key={section.id}
            className="group border-b border-neutral-200"
          >
            <summary className="flex cursor-pointer items-center justify-between py-5 text-sm font-medium transition-colors duration-200 hover:text-neutral-600 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-base font-medium tracking-tight">
                {section.title}
              </span>
              <span className="ml-4 flex-shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-45">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="8" y1="3" x2="8" y2="13" />
                  <line x1="3" y1="8" x2="13" y2="8" />
                </svg>
              </span>
            </summary>
            <div className="pb-6 space-y-4">
              {section.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-neutral-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </PageContainer>
  )
}
