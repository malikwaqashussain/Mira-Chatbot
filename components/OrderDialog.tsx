'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase, type Order, type OrderItem } from '@/lib/supabase'
import { Loader2, Check } from 'lucide-react'

interface OrderDialogProps {
  isOpen: boolean
  onClose: () => void
  items: OrderItem[]
  total: number
}

export default function OrderDialog({ isOpen, onClose, items, total }: OrderDialogProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerInfo.name.trim() || !customerInfo.email.trim()) return

    setIsSubmitting(true)

    try {
      const orderData: any = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        total_amount: total,
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) {
        throw error
      }

      setOrderId(data.id)
      setOrderSuccess(true)
      
      // Reset form after successful order
      setCustomerInfo({ name: '', email: '', phone: '', notes: '' })
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Sorry, there was an error placing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setOrderSuccess(false)
    setOrderId('')
    onClose()
  }

  if (orderSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl text-green-700">Order Placed Successfully!</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-2">Your order has been received and is being prepared.</p>
            <p className="text-sm text-gray-500 mb-6">Order ID: {orderId.slice(0, 8)}</p>
            <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Special Instructions</Label>
                <Textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requests or dietary requirements..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={isSubmitting || !customerInfo.name.trim() || !customerInfo.email.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}