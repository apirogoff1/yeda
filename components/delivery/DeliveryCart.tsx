'use client';

import { useState } from 'react';
import { useDeliveryStore } from '@/store/delivery';
import { DeliveryOrderForm } from './DeliveryOrderForm';
import { X, Plus, Minus } from 'lucide-react';

export function DeliveryCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { items, removeItem, updateQuantity, clearCart } = useDeliveryStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#f97316] hover:bg-orange-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        <span className="relative">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-[#f97316] font-bold">{item.price} RUB</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>{totalPrice} RUB</span>
                  </div>
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showOrderForm && (
        <DeliveryOrderForm
          items={items}
          totalPrice={totalPrice}
          onClose={() => {
            setShowOrderForm(false);
            setIsOpen(false);
          }}
          onSuccess={() => {
            clearCart();
            setShowOrderForm(false);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}