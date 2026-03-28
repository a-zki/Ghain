import { Resend } from 'resend'
import { OrderConfirmation } from '@/emails/OrderConfirmation'
import type { OrderConfirmationProps } from '@/emails/OrderConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

const fromAddress =
  process.env.NODE_ENV === 'production'
    ? 'Ghain <orders@ghain.com>'
    : 'Ghain <onboarding@resend.dev>'

export async function sendOrderConfirmation(
  to: string,
  data: OrderConfirmationProps,
) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject: `Order Confirmed — #${data.orderNumber}`,
      react: OrderConfirmation(data),
    })

    if (error) {
      console.error('[email] Failed to send order confirmation:', error)
      return { success: false, error }
    }

    return { success: true, id: result?.id }
  } catch (err) {
    console.error('[email] Unexpected error sending order confirmation:', err)
    return { success: false, error: err }
  }
}
