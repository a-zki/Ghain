'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isFetchingProfile, setIsFetchingProfile] = useState(true)
  const [profileErrors, setProfileErrors] = useState<{
    firstName?: string
    lastName?: string
  }>({})

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          setEmail(user.email ?? '')
          setFirstName(user.user_metadata?.first_name ?? '')
          setLastName(user.user_metadata?.last_name ?? '')
        }
      } catch {
        toast.error('Failed to load profile')
      } finally {
        setIsFetchingProfile(false)
      }
    }

    loadProfile()
  }, [])

  function validateProfile(): boolean {
    const errors: { firstName?: string; lastName?: string } = {}
    if (!firstName.trim()) errors.firstName = 'First name is required'
    if (!lastName.trim()) errors.lastName = 'Last name is required'
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateProfile()) return

    setIsProfileLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Profile updated')
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setIsProfileLoading(false)
    }
  }

  function validatePassword(): boolean {
    const errors: {
      currentPassword?: string
      newPassword?: string
      confirmPassword?: string
    } = {}

    if (!currentPassword) errors.currentPassword = 'Current password is required'
    if (!newPassword) {
      errors.newPassword = 'New password is required'
    } else if (newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters'
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password'
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validatePassword()) return

    setIsPasswordLoading(true)
    try {
      const supabase = createClient()

      // Verify current password by re-authenticating
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      })

      if (signInError) {
        toast.error('Current password is incorrect')
        setIsPasswordLoading(false)
        return
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Password updated')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setIsPasswordLoading(false)
    }
  }

  if (isFetchingProfile) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-black" />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Profile Section */}
      <section>
        <h2 className="font-display text-xl font-medium tracking-tight mb-6 uppercase">
          Profile
        </h2>
        <form onSubmit={handleProfileSubmit} noValidate className="max-w-lg space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                if (profileErrors.firstName)
                  setProfileErrors((prev) => ({ ...prev, firstName: undefined }))
              }}
              error={profileErrors.firstName}
              placeholder="First name"
              autoComplete="given-name"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                if (profileErrors.lastName)
                  setProfileErrors((prev) => ({ ...prev, lastName: undefined }))
              }}
              error={profileErrors.lastName}
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={email}
            disabled
            hint="Email cannot be changed"
          />

          <Button type="submit" isLoading={isProfileLoading}>
            Save Changes
          </Button>
        </form>
      </section>

      <hr className="border-neutral-200" />

      {/* Change Password Section */}
      <section>
        <h2 className="font-display text-xl font-medium tracking-tight mb-6 uppercase">
          Change Password
        </h2>
        <form onSubmit={handlePasswordSubmit} noValidate className="max-w-lg space-y-4">
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value)
                if (passwordErrors.currentPassword)
                  setPasswordErrors((prev) => ({
                    ...prev,
                    currentPassword: undefined,
                  }))
              }}
              error={passwordErrors.currentPassword}
              placeholder="Enter current password"
              autoComplete="current-password"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
                if (passwordErrors.newPassword)
                  setPasswordErrors((prev) => ({
                    ...prev,
                    newPassword: undefined,
                  }))
              }}
              error={passwordErrors.newPassword}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (passwordErrors.confirmPassword)
                  setPasswordErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }))
              }}
              error={passwordErrors.confirmPassword}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[34px] text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" isLoading={isPasswordLoading}>
            Update Password
          </Button>
        </form>
      </section>
    </div>
  )
}
