'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState<string | undefined>()

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address')
      return false
    }
    setEmailError(undefined)
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback`,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Check your email for reset instructions')
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (emailError) setEmailError(undefined)
        }}
        error={emailError}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <Button type="submit" fullWidth isLoading={isLoading}>
        Send Reset Link
      </Button>

      <div className="mt-6 text-center">
        <Link
          href="/auth/login"
          className="text-sm text-neutral-500 hover:text-black transition-colors duration-200"
        >
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}
