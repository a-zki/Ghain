import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'

type CheckoutItem = {
  productId: string
  variantId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image?: string
}

function validateItems(items: unknown): items is CheckoutItem[] {
  if (!Array.isArray(items) || items.length === 0) return false

  return items.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.productId === 'string' &&
      typeof item.variantId === 'string' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      item.price > 0 &&
      typeof item.quantity === 'number' &&
      item.quantity > 0 &&
      Number.isInteger(item.quantity) &&
      typeof item.size === 'string' &&
      typeof item.color === 'string',
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!validateItems(items)) {
      return NextResponse.json(
        { error: 'Invalid cart items. Each item must have productId, variantId, name, price, quantity, size, and color.' },
        { status: 400 },
      )
    }

    // TODO: Replace with Supabase validation once connected
    // Validate that products exist and prices match the database
    // Validate that stock is available for each variant
    // For now, we trust the client-side data but cap quantity at a reasonable limit
    for (const item of items) {
      if (item.quantity > 10) {
        return NextResponse.json(
          { error: `Maximum quantity per item is 10. "${item.name}" exceeds this limit.` },
          { status: 400 },
        )
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item: CheckoutItem) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `Size: ${item.size} / Color: ${item.color}`,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
      shipping_address_collection: {
        allowed_countries: ['AE', 'US', 'GB', 'SA'],
      },
      metadata: {
        items: JSON.stringify(
          items.map((item: CheckoutItem) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        ),
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 },
      )
    }

    console.error('[checkout] Error creating session:', error)

    const message =
      error instanceof Error ? error.message : 'Failed to create checkout session'

    return NextResponse.json(
      { error: message },
      { status: 500 },
    )
  }
}
