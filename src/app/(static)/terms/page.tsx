import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
}

export default function TermsPage() {
  return (
    <PageContainer className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-light tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          Last updated: March 1, 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-neutral-600">
          {/* Acceptance */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using the Ghain website, you accept and agree to
              be bound by these Terms and Conditions. If you do not agree to
              these terms, you must not use our site or services. We reserve the
              right to modify these terms at any time without prior notice. Your
              continued use of the site after changes are posted constitutes
              acceptance of the updated terms.
            </p>
          </section>

          {/* Account */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Account Registration
            </h2>
            <p className="mb-3">
              To access certain features of our site, you may be required to
              create an account. You agree to provide accurate, current, and
              complete information during registration and to update such
              information as necessary.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account. We reserve the right to suspend or terminate
              accounts at our discretion.
            </p>
          </section>

          {/* Orders */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Orders &amp; Purchases
            </h2>
            <p className="mb-3">
              All orders placed through our site are subject to acceptance and
              availability. We reserve the right to refuse or cancel any order
              for any reason, including but not limited to product availability,
              errors in pricing or product information, or suspected fraudulent
              activity.
            </p>
            <p>
              Once an order is placed, you will receive a confirmation email. This
              confirmation does not constitute acceptance of your order. Acceptance
              occurs when we ship the products and send you a shipping confirmation
              email.
            </p>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Pricing
            </h2>
            <p className="mb-3">
              All prices displayed on our site are in US Dollars (USD) unless
              otherwise stated. Prices do not include applicable taxes, shipping,
              or handling charges, which will be calculated and displayed at
              checkout.
            </p>
            <p>
              We make every effort to ensure that pricing on our site is
              accurate. However, errors may occur. If we discover a pricing
              error after you have placed an order, we will notify you and give
              you the option to confirm or cancel your order at the correct
              price.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Shipping
            </h2>
            <p className="mb-3">
              We ship to addresses within the regions listed on our Shipping
              page. Delivery times are estimates and are not guaranteed. We are
              not responsible for delays caused by carriers, customs processing,
              or circumstances beyond our control.
            </p>
            <p>
              Risk of loss and title for items purchased from our site pass to
              you upon delivery of the items to the carrier. We recommend
              purchasing shipping insurance for high-value orders.
            </p>
          </section>

          {/* Returns */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Returns &amp; Exchanges
            </h2>
            <p className="mb-3">
              We accept returns of unworn, unwashed, and undamaged items within
              14 days of delivery. Items must be returned in their original
              packaging with all tags attached. Sale items and accessories
              marked as final sale are not eligible for return.
            </p>
            <p>
              Refunds will be issued to the original payment method within 5 to
              10 business days of receiving the returned items. Shipping costs
              are non-refundable unless the return is due to a defect or error
              on our part.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Intellectual Property
            </h2>
            <p className="mb-3">
              All content on this site, including but not limited to text,
              graphics, logos, images, product designs, and software, is the
              property of Ghain or its content suppliers and is protected by
              international copyright and trademark laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or exploit any content from this site without
              our prior written consent. Unauthorized use of our intellectual
              property may result in legal action.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Limitation of Liability
            </h2>
            <p className="mb-3">
              To the fullest extent permitted by law, Ghain shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of the site or
              purchase of products.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to
              these terms or your use of the site shall not exceed the amount
              you paid for the specific product or service giving rise to the
              claim. This limitation applies regardless of the legal theory on
              which the claim is based.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Governing Law
            </h2>
            <p className="mb-3">
              These Terms and Conditions shall be governed by and construed in
              accordance with applicable law, without regard to conflict of law
              principles. Any disputes arising under or in connection with these
              terms shall be subject to the exclusive jurisdiction of the
              competent courts.
            </p>
            <p className="mt-6 text-xs text-neutral-400">
              These terms are provided for informational purposes and do not
              constitute legal advice. If you have any questions about these
              terms, please contact us at{' '}
              <a
                href="mailto:support@ghain.com"
                className="underline hover:text-neutral-600 transition-colors"
              >
                support@ghain.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  )
}
