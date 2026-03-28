import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-light tracking-tight mb-2 text-center">
        Reset Password
      </h1>
      <p className="text-sm text-neutral-500 mb-8 text-center">
        Enter your email and we&apos;ll send you a reset link
      </p>
      <ForgotPasswordForm />
    </>
  )
}
