import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account',
}

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-light tracking-tight mb-2 text-center">
        Create Account
      </h1>
      <p className="text-sm text-neutral-500 mb-8 text-center">
        Join Ghain for a personalized experience
      </p>
      <RegisterForm />
    </>
  )
}
