import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-light tracking-tight mb-2 text-center">
        Welcome Back
      </h1>
      <p className="text-sm text-neutral-500 mb-8 text-center">
        Sign in to your account
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  )
}
