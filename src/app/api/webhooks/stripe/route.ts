import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import type Stripe from 'stripe'

type WebhookOrderItem = {
  productId: string
  variantId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
}

function generateOrderNumber(): string {
  return `GHN-${Date.now()}`
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const rawItems = session.metadata?.items
  if (!rawItems) {
    console.error('[webhook] No items metadata found on session', session.id)
    return
  }

  let items: WebhookOrderItem[]
  try {
    items = JSON.parse(rawItems) as WebhookOrderItem[]
  } catch {
    console.error('[webhook] Failed to parse items metadata for session', session.id)
    return
  }

  const orderNumber = generateOrderNumber()
  const customerEmail = session.customer_details?.email

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = (session.shipping_cost?.amount_total ?? 0) / 100
  const total = (session.amount_total ?? 0) / 100

  // --- Supabase order creation ---
  // When Supabase is connected, replace the console.log block below with:
  //
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // )
  //
  // const { data: order, error: orderError } = await supabase
  //   .from('orders')
  //   .insert({
  //     id: orderNumber,
  //     user_id: session.client_reference_id || null,
  //     status: 'confirmed',
  //     stripe_payment_intent_id: session.payment_intent as string,
  //     customer_email: customerEmail,
  //     subtotal,
  //     shipping_cost: shippingCost,
  //     tax: 0,
  //     total,
  //     currency: session.currency || 'usd',
  //     shipping_address: session.collected_information?.shipping_details?.address
  //       ? {
  //           firstName: session.collected_information.shipping_details.name?.split(' ')[0] || '',
  //           lastName: session.collected_information.shipping_details.name?.split(' ').slice(1).join(' ') || '',
  //           line1: session.collected_information.shipping_details.address.line1 || '',
  //           line2: session.collected_information.shipping_details.address.line2 || null,
  //           city: session.collected_information.shipping_details.address.city || '',
  //           state: session.collected_information.shipping_details.address.state || '',
  //           postalCode: session.collected_information.shipping_details.address.postal_code || '',
  //           country: session.collected_information.shipping_details.address.country || '',
  //           phone: session.customer_details?.phone || null,
  //         }
  //       : null,
  //   })
  //   .select()
  //   .single()
  //
  // if (orderError) {
  //   console.error('[webhook] Failed to create order:', orderError)
  //   return
  // }
  //
  // const orderItems = items.map((item) => ({
  //   order_id: order.id,
  //   product_id: item.productId,
  //   variant_id: item.variantId,
  //   product_name: item.name,
  //   size: item.size,
  //   color: item.color,
  //   quantity: item.quantity,
  //   unit_price: item.price,
  //   total_price: item.price * item.quantity,
  // }))
  //
  // const { error: itemsError } = await supabase
  //   .from('order_items')
  //   .insert(orderItems)
  //
  // if (itemsError) {
  //   console.error('[webhook] Failed to create order items:', itemsError)
  // }
  //
  // --- Decrement stock for each variant ---
  // for (const item of items) {
  //   await supabase.rpc('decrement_stock', {
  //     p_variant_id: item.variantId,
  //     p_quantity: item.quantity,
  //   })
  // }
  //
  // --- Send confirmation email ---
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Ghain <orders@ghain.com>',
  //   to: customerEmail!,
  //   subject: `Order Confirmed - ${orderNumber}`,
  //   react: OrderConfirmationEmail({ orderNumber, items, total }),
  // })

  console.log('[webhook] Order created successfully:', {
    orderNumber,
    sessionId: session.id,
    customerEmail,
    itemCount: items.length,
    subtotal,
    shippingCost,
    total,
    paymentIntent: session.payment_intent,
    shippingAddress: session.collected_information?.shipping_details?.address,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 },
    )
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[webhook] Signature verification failed:', message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 },
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break
    }
    default: {
      console.log(`[webhook] Unhandled event type: ${event.type}`)
    }
  }

  return NextResponse.json({ received: true })
}
