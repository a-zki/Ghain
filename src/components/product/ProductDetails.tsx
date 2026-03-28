import { Accordion } from '@/components/ui/Accordion'
import type { ProductDetail } from '@/types/product'

type ProductDetailsProps = {
  details: ProductDetail[]
}

export function ProductDetails({ details }: ProductDetailsProps) {
  const items = details.map((detail, index) => ({
    title: detail.title,
    content: (
      <p className="whitespace-pre-line">{detail.content}</p>
    ),
    defaultOpen: index === 0,
  }))

  return <Accordion items={items} />
}
