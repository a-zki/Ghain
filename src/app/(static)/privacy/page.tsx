import type { Metadata } from 'next'
import { PageContainer } from '@/components/layout/PageContainer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <PageContainer className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-light tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          Last updated: March 1, 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-neutral-600">
          {/* Introduction */}
          <div>
            <p>
              At Ghain, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase. Please
              read this policy carefully. If you do not agree with the terms of
              this policy, please do not access the site.
            </p>
          </div>

          {/* Information We Collect */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Information We Collect
            </h2>
            <p className="mb-3">
              We may collect information about you in a variety of ways. The
              information we may collect on the site includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-black">Personal Data:</strong> Name,
                email address, shipping address, phone number, and payment
                information that you voluntarily provide when placing an order or
                creating an account.
              </li>
              <li>
                <strong className="text-black">Order Information:</strong>{' '}
                Details about purchases you make, including product selections,
                quantities, and transaction history.
              </li>
              <li>
                <strong className="text-black">Device Data:</strong> Information
                about your device, including IP address, browser type, operating
                system, and referring URLs, collected automatically when you
                access our site.
              </li>
              <li>
                <strong className="text-black">Usage Data:</strong> Information
                about how you interact with our site, such as pages visited, time
                spent on pages, and navigation patterns.
              </li>
            </ul>
          </section>

          {/* How We Use It */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                To process and fulfill your orders, including shipping and
                handling returns or exchanges.
              </li>
              <li>
                To communicate with you about your orders, respond to inquiries,
                and provide customer support.
              </li>
              <li>
                To send you marketing communications, such as newsletters and
                promotions, if you have opted in to receive them.
              </li>
              <li>
                To improve our website, products, and services by analyzing usage
                patterns and customer feedback.
              </li>
              <li>
                To detect and prevent fraud, unauthorized transactions, and other
                illegal activities.
              </li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Third-Party Services
            </h2>
            <p className="mb-3">
              We may share your information with third-party service providers
              that perform services on our behalf, including:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-black">Payment processors</strong> to
                securely handle credit card and other payment transactions.
              </li>
              <li>
                <strong className="text-black">Shipping carriers</strong> to
                deliver your orders and provide tracking information.
              </li>
              <li>
                <strong className="text-black">Analytics providers</strong> to
                help us understand how visitors use our site.
              </li>
              <li>
                <strong className="text-black">Email platforms</strong> to
                deliver transactional and marketing communications.
              </li>
            </ul>
            <p className="mt-3">
              These third parties have access to your personal information only
              to perform their specific tasks and are obligated not to disclose
              or use it for any other purpose.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Cookies
            </h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to improve your
              browsing experience, analyze site traffic, and understand where our
              visitors are coming from. Cookies are small data files stored on
              your device.
            </p>
            <p className="mb-3">
              You can set your browser to refuse all or some cookies, or to
              alert you when cookies are being sent. If you disable or refuse
              cookies, some parts of our site may become inaccessible or not
              function properly.
            </p>
            <p>
              We use essential cookies required for the operation of the site
              (such as session and cart cookies) and optional analytics cookies
              to understand usage patterns. You may opt out of non-essential
              cookies at any time through your browser settings.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Your Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-black">Access:</strong> Request a copy
                of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-black">Correction:</strong> Request that
                we correct any inaccurate or incomplete information.
              </li>
              <li>
                <strong className="text-black">Deletion:</strong> Request that
                we delete your personal data, subject to certain legal
                obligations.
              </li>
              <li>
                <strong className="text-black">Opt-out:</strong> Unsubscribe
                from marketing communications at any time by clicking the
                &ldquo;unsubscribe&rdquo; link in any email or contacting us
                directly.
              </li>
              <li>
                <strong className="text-black">Data portability:</strong>{' '}
                Request your data in a structured, commonly used, and
                machine-readable format.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the
              details below. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-display text-lg font-bold tracking-tight text-black mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us at:
            </p>
            <p className="mt-3">
              <strong className="text-black">Email:</strong>{' '}
              <a
                href="mailto:support@ghain.com"
                className="underline hover:text-black transition-colors"
              >
                support@ghain.com
              </a>
            </p>
            <p className="mt-6 text-xs text-neutral-400">
              This privacy policy is provided for informational purposes and
              does not constitute legal advice. We reserve the right to update
              this policy at any time. Changes will be posted on this page with
              an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  )
}
