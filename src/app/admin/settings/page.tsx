'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('Ghain')
  const [storeEmail, setStoreEmail] = useState('hello@ghain.com')
  const [currency, setCurrency] = useState('USD')
  const [shippingRate, setShippingRate] = useState('10.00')
  const [notifyNewOrder, setNotifyNewOrder] = useState(true)
  const [notifyLowStock, setNotifyLowStock] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would persist to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-light">Settings</h2>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Store Info */}
        <section className="bg-white border border-neutral-200 p-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-6">
            Store Information
          </h3>
          <div className="space-y-4">
            <Input
              label="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Your store name"
            />
            <Input
              label="Store Email"
              type="email"
              value={storeEmail}
              onChange={(e) => setStoreEmail(e.target.value)}
              placeholder="contact@example.com"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (&#8364;)</option>
                <option value="GBP">GBP (&#163;)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </Select>
              <Input
                label="Shipping Rate"
                type="number"
                value={shippingRate}
                onChange={(e) => setShippingRate(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                hint="Flat rate per order"
              />
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white border border-neutral-200 p-6">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium mb-6">
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyNewOrder}
                onChange={(e) => setNotifyNewOrder(e.target.checked)}
                className="w-4 h-4 mt-0.5 border-neutral-300 text-black focus:ring-black"
              />
              <div>
                <span className="text-sm font-medium block">
                  New order notifications
                </span>
                <span className="text-xs text-neutral-500">
                  Receive an email when a new order is placed.
                </span>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyLowStock}
                onChange={(e) => setNotifyLowStock(e.target.checked)}
                className="w-4 h-4 mt-0.5 border-neutral-300 text-black focus:ring-black"
              />
              <div>
                <span className="text-sm font-medium block">
                  Low stock alerts
                </span>
                <span className="text-xs text-neutral-500">
                  Receive an email when product stock falls below 5 units.
                </span>
              </div>
            </label>
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-4">
          <Button onClick={handleSave}>Save Settings</Button>
          {saved && (
            <span className="text-sm text-green-700 font-medium">
              Settings saved.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
