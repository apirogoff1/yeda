'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().regex(/^\+7\d{10}$/, 'Phone must be +7XXXXXXXXXX'),
  customerAddress: z.string().min(10, 'Address must be at least 10 characters'),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface DeliveryOrderFormProps {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  totalPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeliveryOrderForm({ items, totalPrice, onClose, onSuccess }: DeliveryOrderFormProps) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/delivery/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items,
          totalPrice,
        }),
      });

      if (!res.ok) throw new Error('Failed to create order');

      const result = await res.json();
      setOrderId(result.orderId);
      onSuccess();
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Order Placed!</h2>
          <p className="text-gray-600 mb-2">Your order number:</p>
          <p className="text-xl font-bold mb-6">{orderId}</p>
          <button
            onClick={onClose}
            className="bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register('customerName')}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="John Doe"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              {...register('customerPhone')}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="+79991234567"
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Address</label>
            <textarea
              {...register('customerAddress')}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              placeholder="Street, building, apartment"
            />
            {errors.customerAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.customerAddress.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#f97316] hover:bg-orange-600 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}