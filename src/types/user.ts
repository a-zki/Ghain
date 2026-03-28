export type UserRole = 'customer' | 'admin'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: string
}

export type Address = {
  id: string
  userId: string
  firstName: string
  lastName: string
  line1: string
  line2: string | null
  city: string
  state: string
  postalCode: string
  country: string
  phone: string | null
  isDefault: boolean
}
