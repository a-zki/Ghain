'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import type { Address } from '@/types/user'

type AddressFormData = {
  firstName: string
  lastName: string
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

type AddressFormProps = {
  address?: Address
  onSubmit: (data: AddressFormData) => void
  onCancel: () => void
}

type FormErrors = Partial<Record<keyof AddressFormData, string>>

const countries = [
  { value: '', label: 'Select country' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'QA', label: 'Qatar' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'OM', label: 'Oman' },
  { value: 'JO', label: 'Jordan' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'EG', label: 'Egypt' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'AU', label: 'Australia' },
  { value: 'JP', label: 'Japan' },
]

export function AddressForm({ address, onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: address?.firstName ?? '',
    lastName: address?.lastName ?? '',
    line1: address?.line1 ?? '',
    line2: address?.line2 ?? '',
    city: address?.city ?? '',
    state: address?.state ?? '',
    postalCode: address?.postalCode ?? '',
    country: address?.country ?? '',
    phone: address?.phone ?? '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function updateField(field: keyof AddressFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.line1.trim()) newErrors.line1 = 'Street address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'ZIP / Postal code is required'
    if (!formData.country) newErrors.country = 'Country is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          error={errors.firstName}
          placeholder="First name"
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          error={errors.lastName}
          placeholder="Last name"
          autoComplete="family-name"
        />
      </div>

      <Input
        label="Street Address"
        value={formData.line1}
        onChange={(e) => updateField('line1', e.target.value)}
        error={errors.line1}
        placeholder="Street address"
        autoComplete="address-line1"
      />

      <Input
        label="Apartment / Suite (Optional)"
        value={formData.line2}
        onChange={(e) => updateField('line2', e.target.value)}
        placeholder="Apt, suite, unit, etc."
        autoComplete="address-line2"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value)}
          error={errors.city}
          placeholder="City"
          autoComplete="address-level2"
        />
        <Input
          label="State / Province"
          value={formData.state}
          onChange={(e) => updateField('state', e.target.value)}
          error={errors.state}
          placeholder="State"
          autoComplete="address-level1"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="ZIP / Postal Code"
          value={formData.postalCode}
          onChange={(e) => updateField('postalCode', e.target.value)}
          error={errors.postalCode}
          placeholder="ZIP code"
          autoComplete="postal-code"
        />
        <Select
          label="Country"
          value={formData.country}
          onChange={(e) => updateField('country', e.target.value)}
          error={errors.country}
          autoComplete="country"
        >
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <Input
        label="Phone (Optional)"
        type="tel"
        value={formData.phone}
        onChange={(e) => updateField('phone', e.target.value)}
        placeholder="Phone number"
        autoComplete="tel"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" fullWidth>
          {address ? 'Save Address' : 'Add Address'}
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
