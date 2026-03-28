'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { AddressForm } from '@/components/account/AddressForm'
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

const mockAddresses: Address[] = []

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined)

  function handleAdd() {
    setEditingAddress(undefined)
    setIsModalOpen(true)
  }

  function handleEdit(address: Address) {
    setEditingAddress(address)
    setIsModalOpen(true)
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    toast.success('Address deleted')
  }

  function handleSubmit(data: AddressFormData) {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id
            ? { ...a, ...data, line2: data.line2 || null, phone: data.phone || null }
            : a,
        ),
      )
      toast.success('Address updated')
    } else {
      const newAddress: Address = {
        id: crypto.randomUUID(),
        userId: '',
        ...data,
        line2: data.line2 || null,
        phone: data.phone || null,
        isDefault: addresses.length === 0,
      }
      setAddresses((prev) => [...prev, newAddress])
      toast.success('Address added')
    }
    setIsModalOpen(false)
    setEditingAddress(undefined)
  }

  function handleCancel() {
    setIsModalOpen(false)
    setEditingAddress(undefined)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-medium tracking-tight uppercase">
          Addresses
        </h2>
        <Button size="sm" onClick={handleAdd}>
          <Plus size={14} className="mr-1.5" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          icon={<MapPin size={48} strokeWidth={1} />}
          title="No addresses saved"
          description="Add a shipping address to speed up your checkout."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-neutral-200 p-5 relative group"
            >
              {address.isDefault && (
                <Badge className="mb-3">Default</Badge>
              )}
              <address className="text-sm not-italic leading-relaxed text-neutral-700">
                <span className="font-medium text-black">
                  {address.firstName} {address.lastName}
                </span>
                <br />
                {address.line1}
                <br />
                {address.line2 && (
                  <>
                    {address.line2}
                    <br />
                  </>
                )}
                {address.city}, {address.state} {address.postalCode}
                <br />
                {address.country}
                {address.phone && (
                  <>
                    <br />
                    {address.phone}
                  </>
                )}
              </address>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black transition-colors duration-200"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <span className="text-neutral-200">|</span>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingAddress ? 'Edit Address' : 'Add Address'}
        size="md"
      >
        <AddressForm
          address={editingAddress}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  )
}
