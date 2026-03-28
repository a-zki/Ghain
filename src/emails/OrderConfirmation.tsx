import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Img,
  Link,
  Preview,
} from '@react-email/components'

export type OrderConfirmationProps = {
  orderNumber: string
  items: {
    name: string
    size: string
    color: string
    quantity: number
    price: number
  }[]
  subtotal: number
  shipping: number
  total: number
  customerName: string
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function OrderConfirmation({
  orderNumber = 'GH-100001',
  items = [
    {
      name: 'Essential Oversized Tee',
      size: 'M',
      color: 'Black',
      quantity: 1,
      price: 65,
    },
  ],
  subtotal = 65,
  shipping = 0,
  total = 65,
  customerName = 'Customer',
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Ghain order #{orderNumber} is confirmed</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={logoText}>GHAIN</Text>
          </Section>

          {/* Order Confirmed Heading */}
          <Section style={mainSection}>
            <Text style={heading}>Order Confirmed</Text>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Thank you for your order. Here are the details:
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Order Number */}
          <Section style={mainSection}>
            <Text style={orderLabel}>Order Number</Text>
            <Text style={orderValue}>#{orderNumber}</Text>
          </Section>

          <Hr style={divider} />

          {/* Items */}
          <Section style={mainSection}>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemDetails}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemMeta}>
                    {item.size} / {item.color} &mdash; Qty: {item.quantity}
                  </Text>
                </Column>
                <Column style={itemPriceColumn}>
                  <Text style={itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Summary */}
          <Section style={mainSection}>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>
                <Text style={summaryText}>Subtotal</Text>
              </Column>
              <Column style={summaryValue}>
                <Text style={summaryText}>{formatPrice(subtotal)}</Text>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>
                <Text style={summaryText}>Shipping</Text>
              </Column>
              <Column style={summaryValue}>
                <Text style={summaryText}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </Text>
              </Column>
            </Row>
            <Row style={summaryRow}>
              <Column style={summaryLabel}>
                <Text style={totalText}>Total</Text>
              </Column>
              <Column style={summaryValue}>
                <Text style={totalText}>{formatPrice(total)}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Support */}
          <Section style={mainSection}>
            <Text style={paragraph}>
              If you have any questions, reply to this email.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              &copy; 2026 Ghain. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderConfirmation

// --- Styles ---

const body: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: '0',
  padding: '0',
}

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
}

const headerSection: React.CSSProperties = {
  padding: '40px 40px 20px',
  textAlign: 'center' as const,
}

const logoText: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  letterSpacing: '6px',
  color: '#000000',
  margin: '0',
}

const mainSection: React.CSSProperties = {
  padding: '0 40px',
}

const heading: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '300',
  color: '#000000',
  margin: '24px 0 16px',
  letterSpacing: '-0.02em',
}

const paragraph: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#333333',
  margin: '0 0 12px',
}

const divider: React.CSSProperties = {
  borderColor: '#e5e5e5',
  borderWidth: '1px 0 0 0',
  margin: '20px 40px',
}

const orderLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  color: '#737373',
  margin: '0 0 4px',
}

const orderValue: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#000000',
  margin: '0',
}

const itemRow: React.CSSProperties = {
  marginBottom: '12px',
}

const itemDetails: React.CSSProperties = {
  verticalAlign: 'top' as const,
}

const itemName: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#000000',
  margin: '0 0 2px',
}

const itemMeta: React.CSSProperties = {
  fontSize: '12px',
  color: '#737373',
  margin: '0',
}

const itemPriceColumn: React.CSSProperties = {
  verticalAlign: 'top' as const,
  textAlign: 'right' as const,
  width: '100px',
}

const itemPrice: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#000000',
  margin: '0',
}

const summaryRow: React.CSSProperties = {
  marginBottom: '4px',
}

const summaryLabel: React.CSSProperties = {
  verticalAlign: 'top' as const,
}

const summaryValue: React.CSSProperties = {
  verticalAlign: 'top' as const,
  textAlign: 'right' as const,
  width: '120px',
}

const summaryText: React.CSSProperties = {
  fontSize: '14px',
  color: '#333333',
  margin: '0 0 8px',
}

const totalText: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#000000',
  margin: '0 0 8px',
}

const footerSection: React.CSSProperties = {
  padding: '0 40px 40px',
  textAlign: 'center' as const,
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#a3a3a3',
  margin: '0',
}
